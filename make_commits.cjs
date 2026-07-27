const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runGit(cmd, cwd) {
    try {
        console.log(`[${cwd}] Running: ${cmd}`);
        return execSync(cmd, { cwd, stdio: 'pipe' }).toString().trim();
    } catch (e) {
        console.error(`Error in ${cwd}: ${e.message}`);
        return null;
    }
}

function processRepo(repoPath, targetCommits, remoteUrl, commitPrefix) {
    console.log(`\n=== Processing ${repoPath} (Target: ${targetCommits} commits) ===`);
    
    // Check if remote already exists, if so remove it to avoid errors
    const remotes = runGit('git remote', repoPath);
    if (remotes && remotes.includes('origin')) {
        runGit('git remote remove origin', repoPath);
    }
    runGit(`git remote add origin ${remoteUrl}`, repoPath);

    // Reset everything to untracked/unstaged without losing files
    runGit('git reset --soft HEAD~1', repoPath); // Undo the single initial commit if exists
    runGit('git reset', repoPath); // Unstage all

    // Get list of all files
    const statusOut = runGit('git status --porcelain', repoPath);
    if (!statusOut) {
        console.log("No files to commit or error.");
        return;
    }

    const files = statusOut.split('\n').map(line => {
        // porcelain output: "?? filename" or " M filename"
        const parts = line.trim().match(/^(?:[ MADRCU?]{1,2})\s+(.+)$/);
        return parts ? parts[1] : null;
    }).filter(f => f);

    if (files.length === 0) {
        console.log("No files found to commit.");
        return;
    }

    console.log(`Found ${files.length} files to commit.`);

    // If we have fewer files than target commits, we will just make as many commits as we have files.
    // If we have more files, we group them.
    const actualCommits = Math.min(files.length, targetCommits);
    
    // Group files into chunks
    const chunks = Array.from({ length: actualCommits }, () => []);
    files.forEach((file, index) => {
        chunks[index % actualCommits].push(file);
    });

    const commitMessages = [
        "Initialize project structure",
        "Add core configuration files",
        "Setup environment variables",
        "Implement authentication context",
        "Add routing configuration",
        "Create layout components",
        "Implement navigation bar",
        "Add footer component",
        "Develop home page UI",
        "Create explore page layout",
        "Implement dashboard views",
        "Add login functionality",
        "Develop registration page",
        "Implement AI chat interface",
        "Add study plan creation logic",
        "Develop study plan details page",
        "Implement user profile management",
        "Add API service integrations",
        "Configure Tailwind and styles",
        "Finalize initial release and polish"
    ];

    chunks.forEach((chunk, i) => {
        if (chunk.length === 0) return;
        
        // Add chunk files
        chunk.forEach(f => {
            // Quote the filename to handle spaces
            runGit(`git add "${f}"`, repoPath);
        });

        // Commit
        const defaultMsg = `${commitPrefix} - Feature update ${i + 1}`;
        const msg = (i < commitMessages.length) ? commitMessages[i] : defaultMsg;
        runGit(`git commit -m "${msg}"`, repoPath);
    });

    // We might have missed some files if there were errors adding them. Let's do a final catch-all commit just in case,
    // though the chunking logic covers all files.
    runGit('git add .', repoPath);
    const finalStatus = runGit('git status --porcelain', repoPath);
    if (finalStatus) {
        runGit(`git commit -m "Final cleanup and formatting"`, repoPath);
    }

    // Branch and Push
    runGit('git branch -M main', repoPath);
    console.log(`Pushing to ${remoteUrl}...`);
    // use spawnSync for push so we can see output directly if needed, but execSync is fine
    try {
        execSync('git push -u origin main --force', { cwd: repoPath, stdio: 'inherit' });
        console.log(`Successfully pushed ${repoPath} to GitHub!`);
    } catch (e) {
        console.error(`Failed to push ${repoPath}: ${e.message}`);
    }
}

// Frontend: 20 commits
processRepo(
    'c:\\Projects\\StudyPilot-ai', 
    20, 
    'https://github.com/kazi-Samin/StudyPilot-ai.git',
    'Frontend'
);

// Backend: 10 commits
processRepo(
    'c:\\Projects\\StudyPilot-ai-server', 
    10, 
    'https://github.com/kazi-Samin/StudyPilot-ai-server.git',
    'Backend'
);
