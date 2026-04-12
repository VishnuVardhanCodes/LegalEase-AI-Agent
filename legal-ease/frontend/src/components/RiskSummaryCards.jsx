import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RiskSummaryCards = ({ summary = {}, clauses = [] }) => {
  const [expandedRisk, setExpandedRisk] = useState(null);

  const cards = [
    {
      type: 'SAFE',
      title: 'SAFE',
      count: summary?.safe || 0,
      color: '#22C55E',
      icon: <CheckCircle2 className="h-5 w-5" />,
      label: 'SAFE CLAUSES',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      type: 'CAUTION',
      title: 'CAUTION',
      count: summary?.caution || 0,
      color: '#F59E0B',
      icon: <AlertTriangle className="h-5 w-5" />,
      label: 'CAUTION ITEMS',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      type: 'RISKY',
      title: 'RISKY',
      count: summary?.risky || 0,
      color: '#EF4444',
      icon: <AlertCircle className="h-5 w-5" />,
      label: 'HIGH RISK',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ];

  const toggleExpand = (type) => {
    if (expandedRisk === type) {
      setExpandedRisk(null);
    } else {
      setExpandedRisk(type);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card, idx) => {
        const isExpanded = expandedRisk === card.type;
        const filteredClauses = clauses.filter(c => c.risk_level === card.type);

        return (
          <div key={idx} className="space-y-3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ x: 5 }}
              onClick={() => toggleExpand(card.type)}
              className={`cursor-pointer bg-white/5 border rounded-2xl p-5 flex items-center justify-between group transition-all ${isExpanded ? 'border-white/20 bg-white/10' : 'border-white/5 hover:bg-white/10'}`}
            >
              <div className="flex items-center gap-5">
                <div 
                  className="p-3.5 rounded-2xl border transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${card.color}15`, borderColor: `${card.color}25`, color: card.color }}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-0.5">
                    {card.label}
                  </p>
                  <h4 className="text-xl font-black text-white flex items-center gap-2">
                    {card.title}
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </h4>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-white tabular-nums tracking-tighter">{card.count}</span>
                <div className="h-1.5 w-16 bg-white/5 rounded-full mt-2 overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: card.count > 0 ? '100%' : '0%' }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: card.color }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="overflow-hidden px-2"
                >
                  <div className={`rounded-3xl border ${card.borderColor} ${card.bgColor} p-6 space-y-4 shadow-2xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Detailed Breakdown</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/10 text-white/80">{filteredClauses.length} detected</span>
                    </div>
                    {filteredClauses.length > 0 ? (
                      <div className="space-y-4">
                        {filteredClauses.map((clause, cIdx) => (
                          <div key={cIdx} className="group/item">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 transition-all">
                              <div className="shrink-0 w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-white/40">
                                {clause.clause_number}
                              </div>
                              <div className="flex-1 space-y-2">
                                <h5 className="text-sm font-bold text-white group-hover/item:text-indigo-400 transition-colors flex items-center gap-2">
                                  {clause.title}
                                  <ArrowRight className="h-3 w-3 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                                </h5>
                                <p className="text-xs text-slate-400 leading-relaxed italic">
                                  {clause.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest">No {card.type.toLowerCase()} clauses identified</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default RiskSummaryCards;
