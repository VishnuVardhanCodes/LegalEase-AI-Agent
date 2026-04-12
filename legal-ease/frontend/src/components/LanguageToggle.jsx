import React from 'react';
import { motion } from 'framer-motion';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'HI', label: 'Hindi' },
    { code: 'TE', label: 'Telugu' }
  ];

  return (
    <div className="glass-card bg-[#0c0c12]/90 border border-white/10 rounded-3xl p-4 flex items-center justify-between">
      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Multilingual Output</h3>
      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`relative px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeLang"
                  className="absolute inset-0 bg-indigo-500 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{lang.code}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageToggle;
