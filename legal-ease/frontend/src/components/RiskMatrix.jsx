import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const RiskMatrix = ({ riskSummary }) => {
  const total = (riskSummary?.safe || 0) + (riskSummary?.caution || 0) + (riskSummary?.risky || 0);

  return (
    <div className="glass-card bg-[#0c0c12]/90 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold tracking-widest text-sm uppercase">Risk Matrix</h3>
        <span className="text-xs font-black text-slate-500 bg-white/5 px-3 py-1 rounded-full">{total} Clauses Total</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Safe */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
          <CheckCircle className="text-emerald-500" size={24} />
          <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-widest">Safe</span>
          <span className="text-2xl font-black text-emerald-400">{riskSummary?.safe || 0}</span>
        </motion.div>

        {/* Caution */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
          <AlertCircle className="text-yellow-500" size={24} />
          <span className="text-[10px] font-bold text-yellow-400/70 uppercase tracking-widest">Caution</span>
          <span className="text-2xl font-black text-yellow-400">{riskSummary?.caution || 0}</span>
        </motion.div>

        {/* Risky */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
          <XCircle className="text-red-500" size={24} />
          <span className="text-[10px] font-bold text-red-400/70 uppercase tracking-widest">Risky</span>
          <span className="text-2xl font-black text-red-400">{riskSummary?.risky || 0}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default RiskMatrix;
