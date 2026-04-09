import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, AlertCircle, CheckCircle, MessageSquare, Info, ShieldAlert } from 'lucide-react';

const ClauseCard = ({ clause, onAskAbout }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskStyles = (level) => {
    switch(level.toUpperCase()) {
      case 'RISKY':
        return { 
          border: 'border-l-risk-high', 
          bg: 'bg-risk-high/10', 
          text: 'text-risk-high', 
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.2)]',
          icon: <ShieldAlert className="w-4 h-4 text-risk-high" /> 
        };
      case 'CAUTION':
        return { 
          border: 'border-l-risk-medium', 
          bg: 'bg-risk-medium/10', 
          text: 'text-risk-medium', 
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]',
          icon: <AlertCircle className="w-4 h-4 text-risk-medium" /> 
        };
      case 'SAFE':
        default:
        return { 
          border: 'border-l-risk-low', 
          bg: 'bg-risk-low/10', 
          text: 'text-risk-low', 
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
          icon: <CheckCircle className="w-4 h-4 text-risk-low" /> 
        };
    }
  };

  const styles = getRiskStyles(clause.risk_level);

  return (
    <motion.div 
      layout
      className={`glass-card rounded-[24px] border-l-[4px] ${styles.border} ${styles.glow} mb-4 overflow-hidden group transition-all duration-300 hover:border-l-[8px]`}
    >
      <div 
        className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-500">
            SEC
            <span className="text-white text-xs">{clause.clause_number}</span>
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-base group-hover:text-white transition-colors">{clause.title}</h4>
            <div className={`flex items-center gap-2 mt-1 text-[9px] font-black uppercase tracking-[0.2em] ${styles.text}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {clause.risk_level} ASSESSMENT
            </div>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="p-2 rounded-lg bg-white/5 text-slate-500"
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-6 pb-6 pt-2 space-y-6">
              <div className="h-px w-full bg-white/5" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Plain English Explanation */}
                 <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <MessageSquare className="w-3 h-3 text-primary-light" />
                       <p className="text-[10px] text-primary-light uppercase tracking-widest font-black">Plain Language Summary</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10">
                      <p className="text-sm text-slate-200 leading-relaxed font-medium">
                        {clause.plain_english}
                      </p>
                    </div>
                 </div>

                 {/* Risk Reason */}
                 <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <Info className="w-3 h-3 text-slate-400" />
                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Why the assessment?</p>
                    </div>
                    <div className={`p-5 rounded-3xl ${styles.bg} border border-white/5`}>
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        {clause.risk_reason}
                      </p>
                    </div>
                 </div>
              </div>

              {/* Original Text Snippet */}
              {clause.original_text && (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative p-5 rounded-2xl bg-[#000]/40 border border-white/5"
                 >
                    <div className="absolute top-3 right-4 flex items-center gap-2 opacity-30">
                       <span className="text-[8px] font-bold uppercase tracking-widest">Legal Source</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                      {clause.original_text}
                    </p>
                 </motion.div>
              )}

              <div className="flex justify-end pt-2">
                 <motion.button
                   whileHover={{ scale: 1.05, x: 5 }}
                   whileTap={{ scale: 0.95 }}
                   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-primary-light uppercase tracking-widest hover:text-white hover:bg-primary transition-all shadow-sm"
                 >
                   Deep Dive Assistant
                   <ChevronDown size={12} className="-rotate-90" />
                 </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClauseCard;
