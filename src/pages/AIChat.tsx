import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../context/AuthContext';

interface Message {
  role: 'user' | 'ai';
  content: string;
  isStreaming?: boolean;
}

const AIChat: React.FC = () => {
  const { user } = useAuth();
  // @ts-ignore
  const userId = user ? (user._id || user.id || user.email || 'user') : 'guest';
  const storageKey = `studyPilot_aiChat_${userId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isStreamingRef = useRef(false);

  // Fetch API key from backend
  useEffect(() => {
    const fetchKey = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/ai/key`);
        const data = await res.json();
        if (data.key) setApiKey(data.key);
      } catch (e) {
        console.error('Failed to fetch API key');
      }
    };
    fetchKey();
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up any leftover streaming states from previous session
        setMessages(parsed.map((m: Message) => ({ ...m, isStreaming: false })));
      } catch (e) {
        setMessages([{ role: 'ai', content: 'Hello! I am your StudyPilot AI Tutor. How can I help you today?' }]);
      }
    } else {
      setMessages([{ role: 'ai', content: 'Hello! I am your StudyPilot AI Tutor. How can I help you today?' }]);
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save to localStorage (only stable, non-streaming messages)
  useEffect(() => {
    if (isLoaded && messages.length > 0 && !isStreamingRef.current) {
      const toSave = messages.map(m => ({ role: m.role, content: m.content }));
      localStorage.setItem(storageKey, JSON.stringify(toSave));
    }
  }, [messages, storageKey, isLoaded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    isStreamingRef.current = true;

    try {
      if (!apiKey) {
        throw new Error('API key not loaded yet. Please try again.');
      }

      // Build chat history (skip the first greeting message)
      const history = messages
        .filter((_, index) => index !== 0)
        .slice(-8)
        .map(m => ({
          role: m.role === 'ai' ? 'model' as const : 'user' as const,
          parts: [{ text: m.content }],
        }));

      // Initialize Gemini SDK directly
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: 'You are a helpful, knowledgeable AI study tutor called "Cognitive AI Tutor" by StudyPilot. Help students understand concepts, create study plans, explain topics clearly, and motivate them to learn. Be concise yet thorough.'
      });

      const chat = model.startChat({ history });

      // Add empty placeholder bubble
      setMessages(prev => [...prev, { role: 'ai', content: '', isStreaming: true }]);
      setIsLoading(false); // Hide loading dots since streaming bubble is shown

      // Stream the response
      const result = await chat.sendMessageStream(text);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: newMessages[lastIndex].content + chunkText,
              isStreaming: true,
            };
            return newMessages;
          });
        }
      }

      // Mark streaming as complete
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        newMessages[lastIndex] = { ...newMessages[lastIndex], isStreaming: false };
        return newMessages;
      });

    } catch (error: any) {
      console.error('AI Chat Error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        // If the last message is an empty AI placeholder, update it
        if (lastIndex >= 0 && newMessages[lastIndex].role === 'ai' && newMessages[lastIndex].content === '') {
          newMessages[lastIndex] = { role: 'ai', content: `Sorry, I encountered an error: ${error.message || 'Please try again.'}`, isStreaming: false };
        } else {
          newMessages.push({ role: 'ai', content: `Sorry, I encountered an error: ${error.message || 'Please try again.'}` });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      isStreamingRef.current = false;
    }
  };

  const suggestions = [
    "Explain quantum computing simply",
    "Create a 3-day exam review schedule",
    "How to stop procrastinating?",
  ];

  return (
    <div className="h-[calc(100vh-72px)] bg-surface-container-low flex flex-col">
      <div className="max-w-[1000px] w-full mx-auto flex-grow flex flex-col p-5 min-h-0">
        <div className="bg-surface border border-outline-variant rounded-2xl flex-grow flex flex-col min-h-0 overflow-hidden shadow-sm">

          {/* Header */}
          <div className="p-4 border-b border-outline-variant bg-surface-container flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h2 className="font-bold">Cognitive AI Tutor</h2>
              <div className="text-xs text-secondary font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span> Online
              </div>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear the chat history?')) {
                  const greeting = { role: 'ai' as const, content: 'Hello! I am your StudyPilot AI Tutor. How can I help you today?' };
                  setMessages([greeting]);
                  localStorage.setItem(storageKey, JSON.stringify([greeting]));
                }
              }}
              className="ml-auto flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
              title="Clear Chat"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center mr-2 mt-1 flex-shrink-0">
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        // Streaming typing indicator while content is empty
                        <div className="flex gap-1 py-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                        </div>
                      )}
                      {/* Blinking cursor while streaming */}
                      {msg.isStreaming && msg.content && (
                        <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle"></span>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading dots - shown only while fetching (before stream starts) */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div className="bg-surface-container rounded-2xl px-4 py-3 rounded-tl-sm border border-outline-variant flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
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
                disabled={isLoading || isStreamingRef.current}
                className="flex-grow px-4 py-3 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:outline-none text-sm disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
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
