import React from 'react';
import { Volume2, Share2, Copy, RefreshCw, Smartphone, Check, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionBar = ({ summary, onReload }) => {
  const [copied, setCopied] = React.useState(false);

  const handleReadAloud = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`⚖️ LegalEase AI Analysis Summary:\n\n${summary}\n\nProcessed by Next-Gen AI Agents.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const items = [
    { icon: <Volume2 size={24} />, label: 'Read Aloud', onClick: handleReadAloud, color: 'text-amber-400', bg: 'hover:bg-amber-400/10' },
    { icon: <Smartphone size={24} />, label: 'WhatsApp', onClick: handleWhatsApp, color: 'text-emerald-400', bg: 'hover:bg-emerald-400/10' },
  ];

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-3xl px-6">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="glass rounded-[32px] p-2 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 group"
      >
        <div className="bg-[#0c0c12]/90 backdrop-blur-3xl rounded-[28px] px-6 py-4 flex items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Action Slots */}
          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={item.onClick}
                className={`p-4 rounded-2xl transition-all duration-300 ${item.color} ${item.bg} relative group/btn`}
              >
                 {item.icon}
                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                   {item.label}
                 </span>
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className={`p-4 rounded-2xl transition-all duration-300 relative group/btn ${copied ? 'text-emerald-400 bg-emerald-400/10' : 'text-primary-light hover:bg-primary/10'}`}
            >
               <AnimatePresence mode="wait">
                 {copied ? (
                   <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                     <Check size={24} />
                   </motion.div>
                 ) : (
                   <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                     <Copy size={24} />
                   </motion.div>
                 )}
               </AnimatePresence>
               <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                 {copied ? 'Copied!' : 'Copy Summary'}
               </span>
            </motion.button>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-white/10 hidden md:block" />

          {/* Primary Action */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReload}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(139,92,246,0.5)] transition-all hover:bg-primary-dark group-hover:glow-pulse"
          >
            <RefreshCw size={18} className=" group-hover:rotate-180 transition-transform duration-700" />
            New Document
          </motion.button>
        </div>
        
        {/* Subtle Bottom Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-[34px] -z-10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </div>
  );
};

export default ActionBar;
