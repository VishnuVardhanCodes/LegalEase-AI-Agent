import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';

const ClauseCard = ({ clause, onAskAbout }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskStyles = (level) => {
    switch(level.toUpperCase()) {
      case 'RISKY':
        return { 
          border: 'border-l-red-500', 
          bg: 'bg-red-500/10', 
          text: 'text-red-400', 
          icon: <AlertTriangle className="w-4 h-4 text-red-500" /> 
        };
      case 'CAUTION':
        return { 
          border: 'border-l-amber-500', 
          bg: 'bg-amber-500/10', 
          text: 'text-amber-400', 
          icon: <AlertCircle className="w-4 h-4 text-amber-500" /> 
        };
      case 'SAFE':
        default:
        return { 
          border: 'border-l-emerald-500', 
          bg: 'bg-emerald-500/10', 
          text: 'text-emerald-400', 
          icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> 
        };
    }
  };

  const styles = getRiskStyles(clause.risk_level);

  return (
    <motion.div 
      layout
      className={`glass-card rounded-2xl border-l-[6px] ${styles.border} mb-4 overflow-hidden`}
    >
      <div 
        className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-500 w-6">
            {clause.clause_number.toString().padStart(2, '0')}
          </span>
          <div>
            <h4 className="font-semibold text-slate-200">{clause.title}</h4>
            <div className={`flex items-center gap-1.5 mt-0.5 text-[10px] font-bold uppercase tracking-wider ${styles.text}`}>
              {styles.icon}
              {clause.risk_level}
            </div>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-slate-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 border-t border-white/5 mt-2 pt-4">
              <div className="space-y-4">
                {/* Original Text Snippet */}
                {clause.original_text && (
                   <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Original Text</p>
                    <p className="text-sm text-slate-400 italic line-clamp-3">"{clause.original_text}"</p>
                  </div>
                )}
                
                {/* Plain English Explanation */}
                <div>
                  <p className="text-[10px] text-primary-light uppercase tracking-widest font-bold mb-2 text-glow">Plain English Explanation</p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {clause.plain_english}
                  </p>
                </div>

                {/* Risk Reason */}
                <div className={`p-3 rounded-xl ${styles.bg} border border-white/5`}>
                  <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${styles.text}`}>Risk Factor</p>
                  <p className="text-sm text-slate-300">
                    {clause.risk_reason}
                  </p>
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAskAbout(clause);
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-primary-light hover:text-white transition-colors pt-2"
                >
                  <MessageSquare size={14} />
                  ASK ABOUT THIS CLAUSE
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
