import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';

const ChatPanel = ({ documentContext, language }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'ve analyzed your document. Ask me anything about specific clauses or general risks.' }
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
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the AI service. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    "What is the biggest risk?",
    "Explain the termination clause",
    "Is this safe to sign?"
  ];

  return (
    <div className="glass-card rounded-3xl h-full flex flex-col overflow-hidden border border-white/10 shadow-2xl">
      <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="text-primary-light" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">AI Assistant</h3>
            <p className="text-[10px] text-primary-light font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Online • Ready to help
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] p-4 rounded-2xl relative
              ${msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
              }
            `}>
               {msg.role === 'assistant' && (
                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                  <Sparkles size={12} className="text-primary-light" />
                </div>
              )}
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary-light rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary-light rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-primary-light rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/5 border-t border-white/10">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => { setInput(q); }}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-primary-light transition-all"
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
            placeholder="Ask anything about this document..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-colors pr-14 placeholder:text-slate-600"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <Send size={18} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
