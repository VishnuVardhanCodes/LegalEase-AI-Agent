import React from 'react';
import { Volume2, Share2, Copy, RefreshCw, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const ActionBar = ({ summary, onReload }) => {
  const handleReadAloud = () => {
    const utterance = new SpeechSynthesisUtterance(summary);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`LegalEase AI Analysis Summary:\n\n${summary}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const actions = [
    { icon: <Volume2 size={20} />, label: 'Read Aloud', onClick: handleReadAloud, color: 'hover:text-amber-400' },
    { icon: <Copy size={20} />, label: 'Copy Summary', onClick: handleCopy, color: 'hover:text-blue-400' },
    { icon: <Smartphone size={20} />, label: 'WhatsApp Share', onClick: handleWhatsApp, color: 'hover:text-green-400' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass rounded-2xl p-4 flex items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
      >
        <div className="flex items-center gap-2">
          {actions.map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className={`flex flex-col md:flex-row items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-300 ${action.color}`}
            >
              {action.icon}
              <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="h-8 w-px bg-white/10 hidden md:block"></div>

        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          onClick={onReload}
          className="bg-primary hover:bg-primary-dark text-white p-4 rounded-xl shadow-lg flex items-center gap-2"
        >
          <RefreshCw size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Analyze Another</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ActionBar;
