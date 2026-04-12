import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const RiskSummaryCards = ({ summary = {} }) => {
  const cards = [
    {
      title: 'SAFE',
      count: summary?.safe || 0,
      color: '#22C55E',
      icon: <CheckCircle2 className="h-5 w-5" />,
      label: 'SAFE CLAUSES'
    },
    {
      title: 'CAUTION',
      count: summary?.caution || 0,
      color: '#F59E0B',
      icon: <AlertTriangle className="h-5 w-5" />,
      label: 'CAUTION ITEMS'
    },
    {
      title: 'RISKY',
      count: summary?.risky || 0,
      color: '#EF4444',
      icon: <AlertCircle className="h-5 w-5" />,
      label: 'HIGH RISK'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * idx }}
          whileHover={{ x: 5 }}
          className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-xl border"
              style={{ backgroundColor: `${card.color}10`, borderColor: `${card.color}20`, color: card.color }}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                {card.label}
              </p>
              <h4 className="text-xl font-black text-white">
                {card.title}
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-3xl font-black text-white">{card.count}</span>
             <div className="h-1 w-12 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ backgroundColor: card.color, width: card.count > 0 ? '100%' : '0%' }}
                ></div>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RiskSummaryCards;
