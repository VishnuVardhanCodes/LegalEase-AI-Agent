import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustScoreCard = ({ score, assessment }) => {
  const getColors = (s) => {
    if (s >= 80) return { color: '#10b981', pathClass: 'text-emerald-500', text: 'text-emerald-400' };
    if (s >= 50) return { color: '#f59e0b', pathClass: 'text-yellow-500', text: 'text-yellow-400' };
    return { color: '#ef4444', pathClass: 'text-red-500', text: 'text-red-400' };
  };

  const { color, pathClass, text } = getColors(score);
  const strokeDasharray = 251.2;
  const offset = strokeDasharray - (score / 100) * strokeDasharray;

  return (
    <div className="glass-card bg-[#0c0c12]/90 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 right-4 text-white/5">
        <ShieldCheck size={80} />
      </div>
      
      <div className="flex items-center gap-3 mb-6 w-full justify-start z-10">
        <ShieldCheck className={text} size={24} />
        <h3 className="text-white font-bold tracking-widest text-sm uppercase">Trust Score</h3>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center z-10 mb-4">
        <svg className="w-full h-full -rotate-90">
          <circle cx="80" cy="80" r="60" strokeWidth="12" fill="transparent" className="text-white/5 stroke-current" />
          <motion.circle
            cx="80" cy="80" r="60"
            stroke={color} strokeWidth="12" fill="transparent"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black text-white">{score}</span>
        </div>
      </div>
      
      <div className={`px-4 py-1.5 rounded-full border border-white/10 bg-white/5 font-black uppercase text-xs tracking-widest ${text} z-10`}>
        {assessment || "MODERATE RISK"}
      </div>
    </div>
  );
};

export default TrustScoreCard;
