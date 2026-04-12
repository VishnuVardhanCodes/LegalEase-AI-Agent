import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatAssistant = ({ documentContext }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "I've analyzed your document. How can I help you understand the legal details?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Get preferred language from storage
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      
      const response = await fetch('http://localhost:8000/api/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage,
          document_context: JSON.stringify(documentContext),
          language: preferredLanguage
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Expert analysis encountered an issue. Please rephrase." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Encryption/Network bridge failed. Verify connectivity." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1E293B]/60 border border-white/5 rounded-3xl overflow-hidden flex flex-col h-[650px] shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="bg-white/5 p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-wide">Legal Intelligence Bot</h3>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Agent Active</span>
            </div>
          </div>
        </div>
        <Sparkles className="h-5 w-5 text-indigo-400 opacity-50" />
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border ${m.role === 'user' ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/10 rounded-tr-none' : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'}`}>
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3">
                <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
                <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Agent Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white/5 border-t border-white/5">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Interrogate document text..."
            className="w-full bg-[#0F172A] border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-white placeholder-slate-600"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 transition-all shadow-lg shadow-indigo-500/20"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center mt-4">
          LegalEase AI Intelligence Engine v1.0
        </p>
      </div>
    </div>
  );
};

export default ChatAssistant;
