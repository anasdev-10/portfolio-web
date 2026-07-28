'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Minimize2, Maximize2, Send, MessageCircle, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface HistoryEntry {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  initialMessage?: string;
}

const QUICK_REPLIES = [
  'Tell me about Findify',
  'What are your main skills?',
  'How can we collaborate?',
  'Describe your ML internship',
  "What's the ShopScout project?",
];

const WELCOME_MESSAGE =
  "Hey! I'm Anas Assistant — I can tell you about Muhammad Anas's work, projects, skills, and how you might work together. What would you like to know?";

export default function ChatAssistant({ isOpen, onOpen, onClose, initialMessage }: ChatAssistantProps) {
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: WELCOME_MESSAGE, sender: 'assistant', timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<HistoryEntry[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, minimized]);

  // Handle initial message from "Ask Assistant" on project cards
  useEffect(() => {
    if (initialMessage && isOpen) {
      handleSendMessage(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = {
        id: Date.now(),
        text: text.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            history: chatHistory,
          }),
        });

        const data = await res.json();
        const responseText = data.response || "I'm having a moment — try asking me again!";

        const assistantMsg: Message = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'assistant',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setChatHistory((prev) => [
          ...prev,
          { role: 'user', content: text.trim() },
          { role: 'assistant', content: responseText },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Sorry, I'm having trouble connecting right now. Please try reaching out via email at miananas.info@gmail.com",
            sender: 'assistant',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, chatHistory]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!isOpen) {
    return (
      <button
        onClick={onOpen}
        id="chat-open-btn"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open Anas Assistant"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-cyan-500/40 ping-slow" />
        <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover:shadow-cyan-500/50 group-hover:scale-110 transition-all duration-300">
          <MessageCircle size={24} className="text-white" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
            Chat with Anas Assistant
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] flex flex-col bg-[#0d1117] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 transition-all duration-300 ${
        minimized ? 'h-[60px]' : 'h-[540px] max-h-[calc(100vh-80px)]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-600/90 to-pink-600/90 rounded-t-2xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-[#0d1117] rounded-full" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Anas Assistant</p>
            <p className="text-white/70 text-xs">Powered by Gemini · Always here</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/15 rounded-lg transition-all"
            aria-label={minimized ? 'Expand chat' : 'Minimize chat'}
          >
            {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/15 rounded-lg transition-all"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600'
                      : 'bg-gradient-to-br from-pink-600 to-violet-600'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-br-sm'
                        : 'bg-slate-800/90 text-slate-100 border border-slate-700/50 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-slate-600 text-[10px] px-1">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={12} />
                </div>
                <div className="px-4 py-3 bg-slate-800/90 border border-slate-700/50 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        style={{ animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick replies — shown when only welcome message */}
          {messages.length === 1 && !loading && (
            <div className="px-4 pb-2 border-t border-slate-800/50">
              <p className="text-slate-600 text-xs mt-2 mb-2">Quick questions:</p>
              <div className="flex flex-col gap-1.5">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-left text-xs px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-cyan-500/40 rounded-xl text-slate-300 hover:text-white transition-all duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-slate-800/50 flex-shrink-0">
            <div className="flex gap-2 items-center bg-slate-800/80 border border-slate-700/50 focus-within:border-cyan-500/50 rounded-xl px-3 py-2 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={loading || !inputValue.trim()}
                className="p-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:opacity-50 rounded-lg transition-all duration-200 flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            <p className="text-slate-700 text-[10px] text-center mt-1.5">
              AI responses · Verify important details
            </p>
          </div>
        </>
      )}
    </div>
  );
}
