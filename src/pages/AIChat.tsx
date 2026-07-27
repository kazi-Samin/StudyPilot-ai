import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../context/AuthContext';

interface Message {
  role: 'user' | 'ai';
  content: string;
  isTyping?: boolean;
}

const TYPING_SPEED = 8; // ms per character — faster = lower number

const AIChat: React.FC = () => {
  const { user } = useAuth();
  // @ts-ignore
  const userId = user ? (user._id || user.id || user.email || 'user') : 'guest';
  const storageKey = `studyPilot_aiChat_${userId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load chat history
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: Message) => ({ ...m, isTyping: false })));
      } catch {
        setMessages([{ role: 'ai', content: 'Hello! I am your StudyPilot AI Tutor. How can I help you today?' }]);
      }
    } else {
      setMessages([{ role: 'ai', content: 'Hello! I am your StudyPilot AI Tutor. How can I help you today?' }]);
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save to localStorage (skip while typing)
  useEffect(() => {
    if (isLoaded && messages.length > 0 && !isTyping) {
      const toSave = messages.map(m => ({ role: m.role, content: m.content }));
      localStorage.setItem(storageKey, JSON.stringify(toSave));
    }
  }, [messages, storageKey, isLoaded, isTyping]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Typewriter effect: reveals text character by character
  const typewriterEffect = useCallback((fullText: string) => {
    setIsTyping(true);
    let index = 0;

    // Add empty AI bubble
    setMessages(prev => [...prev, { role: 'ai', content: '', isTyping: true }]);

    const type = () => {
      if (index < fullText.length) {
        const chunk = fullText.slice(0, index + 1);
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = { role: 'ai', content: chunk, isTyping: true };
          return newMessages;
        });
        index++;
        // Variable speed: faster for spaces, slower for punctuation
        const char = fullText[index - 1];
        const delay = '.!?'.includes(char) ? TYPING_SPEED * 8 : char === ',' ? TYPING_SPEED * 3 : TYPING_SPEED;
        typingTimeoutRef.current = setTimeout(type, delay);
      } else {
        // Done typing
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = { role: 'ai', content: fullText, isTyping: false };
          return newMessages;
        });
        setIsTyping(false);
      }
    };

    typingTimeoutRef.current = setTimeout(type, TYPING_SPEED);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading || isTyping) return;

    // Stop any current typewriter
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .filter((_, index) => index !== 0)
        .slice(-8)
        .map(m => ({
          role: m.role === 'ai' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Request failed');
      }

      const data = await response.json();
      const fullText = data.response || '';

      setIsLoading(false);
      typewriterEffect(fullText);

    } catch (error: any) {
      setIsLoading(false);
      setMessages(prev => [
        ...prev,
        { role: 'ai', content: `⚠️ ${error.message || 'Something went wrong. Please try again.'}` }
      ]);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      setIsTyping(false);
      const greeting = { role: 'ai' as const, content: 'Hello! I am your StudyPilot AI Tutor. How can I help you today?' };
      setMessages([greeting]);
      localStorage.setItem(storageKey, JSON.stringify([greeting]));
    }
  };

  const suggestions = [
    'Explain quantum computing simply',
    'Create a 3-day exam review schedule',
    'How to stop procrastinating?',
  ];

  return (
    <div className="h-[calc(100vh-72px)] bg-surface-container-low flex flex-col">
      <div className="max-w-[1000px] w-full mx-auto flex-grow flex flex-col p-5 min-h-0">
        <div className="bg-surface border border-outline-variant rounded-2xl flex-grow flex flex-col min-h-0 overflow-hidden shadow-sm">

          {/* Header */}
          <div className="p-4 border-b border-outline-variant bg-surface-container flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h2 className="font-bold">Cognitive AI Tutor</h2>
              <div className="text-xs text-secondary font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span>
                {isTyping ? 'Typing...' : 'Online'}
              </div>
            </div>
            <button
              onClick={handleClearChat}
              className="ml-auto flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
              title="Clear Chat"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}>
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                  </div>
                )}
                <div className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-surface-container text-on-surface rounded-tl-sm border border-outline-variant shadow-sm'
                }`}>
                  {msg.role === 'ai' ? (
                    <div className="markdown-body prose prose-sm max-w-none">
                      {msg.content ? (
                        <>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                          {msg.isTyping && (
                            <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                          )}
                        </>
                      ) : (
                        <div className="flex gap-1.5 py-1 items-center">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading dots while fetching */}
            {isLoading && (
              <div className="flex justify-start items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div className="bg-surface-container rounded-2xl px-4 py-3 rounded-tl-sm border border-outline-variant flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface border-t border-outline-variant">
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-full text-sm text-on-surface-variant transition-colors border border-outline-variant"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything about your studies..."
                disabled={isLoading || isTyping}
                className="flex-grow px-4 py-3 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:outline-none text-sm disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isTyping}
                className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIChat;
