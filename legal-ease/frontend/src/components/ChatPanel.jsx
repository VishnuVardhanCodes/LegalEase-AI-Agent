import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageSquare, Zap, Target } from 'lucide-react';
import axios from 'axios';

const ChatPanel = ({ documentContext, language }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Doc Intelligence active. I\'ve analyzed the agreement metrics. How can I assist with specific clauses or risk mitigation?' }
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
      setMessages(prev => [...prev, { role: 'assistant', content: "System offline. Failed to reach doc-intelligence agent." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    "What is the biggest risk?",
    "Explain Clause 5",
    "Is this safe to sign?"
  ];

  return (
    <div className="glass-card rounded-[40px] h-full flex flex-col overflow-hidden relative border border-white/10 shadow-2xl">
      {/* Dynamic Header */}
      <div className="p-8 border-b border-white/5 bg-white/[0.02] relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 animate-pulse" />
             <div className="w-14 h-14 rounded-2xl bg-[#0c0c12] border border-emerald-500/20 flex items-center justify-center relative z-10">
                <Bot className="text-emerald-400" size={28} />
             </div>
          </div>
          <div>
            <h3 className="font-black text-white text-lg tracking-tight">Legal AI Agent</h3>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Neural Link Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth z-10 custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-4 max-w-[90%]">
               {msg.role === 'assistant' && (
                 <div className="w-8 h-8 rounded-[10px] bg-white/5 border border-white/5 flex items-center justify-center shrink-0 mt-1">
                    <Zap size={14} className="text-primary-light" />
                 </div>
               )}
               
               <div className={`
                p-5 rounded-[28px] relative
                ${msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none shadow-[0_10px_20px_rgba(139,92,246,0.3)]' 
                  : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none font-medium'
                }
              `}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                {msg.role === 'user' && (
                   <div className="mt-2 text-[8px] font-black text-white/40 uppercase tracking-widest text-right">User Identity Verified</div>
                )}
              </div>

               {msg.role === 'user' && (
                 <div className="w-8 h-8 rounded-[10px] bg-primary-light/20 border border-primary-light/20 flex items-center justify-center shrink-0 mt-1">
                    <User size={14} className="text-white" />
                 </div>
               )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start gap-4">
            <div className="w-8 h-8 rounded-[10px] bg-white/5 shrink-0" />
            <div className="bg-white/5 px-6 py-4 rounded-[28px] rounded-tl-none border border-white/5">
              <div className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-primary-light rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary-light rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-primary-light rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 bg-black/20 border-t border-white/5 z-10 backdrop-blur-md">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {suggestedQuestions.map((q, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setInput(q); }}
              className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2.5 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all shadow-sm"
            >
              {q}
            </motion.button>
          ))}
        </div>
        
        <form onSubmit={handleSend} className="relative group">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-light to-transparent opacity-30 group-focus-within:opacity-100 transition-opacity" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query the AI Agent..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-[28px] px-8 py-5 text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-all pr-16 placeholder:text-slate-600 shadow-inner group-hover:bg-white/[0.05]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-50 shadow-lg text-white group-hover:scale-105"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* Decorative Grid In Chat */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
    </div>
  );
};

export default ChatPanel;
