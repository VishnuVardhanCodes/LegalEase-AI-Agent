import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageSquare, Zap, Target, Mic, Shield } from 'lucide-react';
import axios from 'axios';

const ChatPanel = ({ documentContext, language }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Agent Intelligence active. How can I help you analyze this legal agreement?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:8000/api/followup', {
        question: userMessage,
        document_context: JSON.stringify(documentContext),
        language: language
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Failed to connect to AI agent. Please ensure the backend is active." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    "Identify red flags",
    "Explain Clause 5",
    "Summary in 2 sentences"
  ];

  return (
    <div className="bg-[#0c0c12]/80 h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                 <Bot size={24} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-white uppercase tracking-widest">Legal AI</h4>
                 <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                 </div>
              </div>
           </div>
           <div className="p-2 rounded-xl bg-white/5 text-slate-500">
              <Shield size={16} />
           </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' 
                  : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/10'
                }
              `}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-[#0c0c12] border-t border-white/5">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 whitespace-nowrap hover:bg-white/10 hover:text-white transition-all"
            >
              {q}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about the agreement..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-600 transition-all disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
