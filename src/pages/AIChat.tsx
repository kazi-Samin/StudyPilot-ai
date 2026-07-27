import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { aiService } from '../services/aiService';
import { useAuth } from '../context/AuthContext';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const AIChat: React.FC = () => {
  const { user } = useAuth();
  // @ts-ignore
  const userId = user ? (user._id || user.id || user.email || 'user') : 'guest';
  const storageKey = `studyPilot_aiChat_${userId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing chat history:', e);
        setMessages([{ role: 'ai', content: 'Hello! I am your StudyPilot AI tutor. How can I help you with your studies today?' }]);
      }
    } else {
      setMessages([{ role: 'ai', content: 'Hello! I am your StudyPilot AI tutor. How can I help you with your studies today?' }]);
    }
    setIsLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey, isLoaded]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Keep only last few messages for context, and skip the initial AI greeting
      // Gemini requires the first message in history to be from 'user'
      const history = messages
        .filter((m, index) => index !== 0) // Skip the hardcoded greeting
        .slice(-6)
        .map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.content }] }));
        
      const response = await aiService.chat({ message: text, history });
      
      setMessages(prev => [...prev, { role: 'ai', content: response.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Explain quantum computing simply",
    "Create a 3-day exam review schedule",
    "How to stop procrastinating?"
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
                <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span> Online
              </div>
            </div>
            <button 
              onClick={() => {
                if(window.confirm('Are you sure you want to clear the chat history?')) {
                  setMessages([{ role: 'ai', content: 'Hello! I am your StudyPilot AI tutor. How can I help you with your studies today?' }]);
                }
              }}
              className="ml-auto flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
              title="Clear Chat"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-grow overflow-y-auto p-5 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-sm' 
                    : 'bg-surface-container text-on-surface rounded-tl-sm border border-outline-variant shadow-sm'
                }`}>
                  {msg.role === 'ai' ? (
                    <div className="markdown-body prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-container rounded-2xl p-4 rounded-tl-sm border border-outline-variant flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface border-t border-outline-variant">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
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
                className="flex-grow px-4 py-3 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:outline-none"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-xl hover:bg-primary-container disabled:opacity-50 transition-colors"
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
