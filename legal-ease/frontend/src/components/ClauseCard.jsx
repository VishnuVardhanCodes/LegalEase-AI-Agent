import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const ClauseCard = ({ clause }) => {
  const [isOpen, setIsOpen] = useState(false);

  const riskStyles = {
    SAFE: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      text: 'text-green-500',
      icon: <CheckCircle2 className="h-4 w-4" />
    },
    CAUTION: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-500',
      icon: <AlertTriangle className="h-4 w-4" />
    },
    RISKY: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      text: 'text-red-500',
      icon: <AlertCircle className="h-4 w-4" />
    }
  };

  const style = riskStyles[clause.risk_level] || riskStyles.SAFE;

  return (
    <motion.div 
      layout
      className="bg-[#1E293B]/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-5">
           <div className={`p-3 rounded-2xl ${style.bg} ${style.text} border ${style.border}`}>
             <span className="text-xs font-black">#{clause.clause_number}</span>
           </div>
           <div>
              <div className="flex items-center gap-3 mb-1">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 ${style.bg} ${style.text} border ${style.border}`}>
                   {style.icon} {clause.risk_level}
                </span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Score: {clause.risk_score}/10</span>
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">{clause.title}</h4>
           </div>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="p-2 bg-white/5 rounded-xl text-slate-400"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5"
          >
            <div className="p-8 space-y-8 bg-gradient-to-b from-indigo-500/[0.03] to-transparent relative overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none"></div>
               
               <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-6 bg-indigo-500/40 rounded-full"></div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    Expert Legal Simplified
                  </span>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] shadow-inner">
                  <p className="text-slate-300 text-base leading-relaxed font-medium">
                    {clause.explanation}
                  </p>
                </div>
              </div>

              {clause.original_text && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-0.5 w-6 bg-slate-500/20 rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verbatim Clause Excerpt</span>
                  </div>
                  <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 relative group/quote">
                    <div className="absolute top-4 left-4 text-white/5 text-4xl font-serif">"</div>
                    <p className="text-[13px] text-slate-500 font-mono leading-relaxed italic pl-6">
                      {clause.original_text}
                    </p>
                    <div className="absolute bottom-4 right-4 text-white/5 text-4xl font-serif">"</div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3 text-green-500/50" /> Identity Verified Analysis
                </div>
                <button className="text-[9px] font-black text-indigo-400/60 uppercase tracking-widest hover:text-indigo-400 transition-colors">
                  Flag Error
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClauseCard;
