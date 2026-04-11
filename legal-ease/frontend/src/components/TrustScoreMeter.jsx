import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';

const TrustScoreMeter = ({ score }) => {
  const getScoreColor = (s) => {
    if (s >= 75) return { color: '#10b981', text: 'HIGH TRUST', icon: <CheckCircle className="w-6 h-6" /> };
    if (s >= 40) return { color: '#f59e0b', text: 'MODERATE RISK', icon: <AlertCircle className="w-6 h-6" /> };
    return { color: '#ef4444', text: 'HIGH RISK', icon: <Shield className="w-6 h-6" /> };
  };

  const { color, text, icon } = getScoreColor(score);
  const percentage = score;
  const strokeDasharray = 251.2; // 2 * PI * 40
  const offset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r="80"
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-black text-white"
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Trust Score</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]"
      >
        <div style={{ color }}>{icon}</div>
        <span className="text-sm font-black tracking-widest" style={{ color }}>{text}</span>
      </motion.div>
    </div>
  );
};

export default TrustScoreMeter;
