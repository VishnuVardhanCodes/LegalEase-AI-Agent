import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, AlertTriangle, AlertCircle, CheckCircle, 
  MessageSquare, Info, ShieldAlert, Zap, Lightbulb
} from 'lucide-react';

const ClauseCard = ({ clause }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskStyles = (level) => {
    switch(level.toUpperCase()) {
      case 'RISKY':
        return { 
          border: 'border-l-red-500', 
          bg: 'bg-red-500/10', 
          text: 'text-red-400', 
          badge: 'bg-red-500/20 text-red-500',
          icon: <ShieldAlert className="w-4 h-4 text-red-500" /> 
        };
      case 'CAUTION':
        return { 
          border: 'border-l-amber-500', 
          bg: 'bg-amber-500/10', 
          text: 'text-amber-400', 
          badge: 'bg-amber-500/20 text-amber-500',
          icon: <AlertCircle className="w-4 h-4 text-amber-500" /> 
        };
      case 'SAFE':
      default:
        return { 
          border: 'border-l-emerald-500', 
          bg: 'bg-emerald-500/10', 
          text: 'text-emerald-400', 
          badge: 'bg-emerald-500/20 text-emerald-500',
          icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> 
        };
    }
  };

  const styles = getRiskStyles(clause.risk_level);

  return (
    <motion.div 
      layout
      className={`glass-card rounded-[24px] border-l-[4px] ${styles.border} mb-4 overflow-hidden group transition-all duration-300`}
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
            <div className={`flex items-center gap-2 mt-1 py-1 px-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] w-fit ${styles.badge}`}>
              {clause.risk_level}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Plain Language Summary */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                          <MessageSquare size={16} />
                       </div>
                       <p className="text-[10px] text-white uppercase tracking-widest font-black">Plain Language Summary</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {clause.plain_english}
                      </p>
                    </div>
                 </div>

                 {/* Why It Matters */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                          <Info size={16} />
                       </div>
                       <p className="text-[10px] text-white uppercase tracking-widest font-black">Why It Matters</p>
                    </div>
                    <div className={`p-6 rounded-3xl ${styles.bg} border border-white/5`}>
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        {clause.risk_reason || "No significant issues found."}
                      </p>
                    </div>
                 </div>
              </div>

              {/* Suggested Action */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500 text-white shadow-lg">
                        <Zap size={16} />
                    </div>
                    <p className="text-[10px] text-white uppercase tracking-widest font-black">Suggested Action</p>
                </div>
                <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 relative group">
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-500 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                        AI Recommended
                    </div>
                    <p className="text-xs text-indigo-200 font-bold leading-relaxed">
                        {clause.risk_level === 'RISKY' 
                          ? "Negotiate to reduce scope or remove this clause entirely before signing."
                          : clause.risk_level === 'CAUTION'
                          ? "Review this section with legal counsel to clarify exact implications."
                          : "This clause is standard. Proceed with confidence."}
                    </p>
                </div>
              </div>

              {/* Original Text Snippet */}
              {clause.original_text && (
                 <div className="relative p-5 rounded-2xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2 mb-3 opacity-30">
                       <ScrollText size={12} />
                       <span className="text-[8px] font-bold uppercase tracking-widest">Original Legal Text</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                      {clause.original_text}
                    </p>
                 </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClauseCard;
