import React from 'react';
import { motion } from 'framer-motion';

const TrustScoreGauge = ({ score }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return '#22C55E'; // Green
    if (s >= 50) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const status = score >= 80 ? 'SAFE' : score >= 50 ? 'CAUTION' : 'RISKY';
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-56 h-56 transform -rotate-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.02)]">
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="#1E293B"
            strokeWidth="16"
            fill="transparent"
          />
          {/* Progress Circle with Glow */}
          <motion.circle
            cx="112"
            cy="112"
            r={radius}
            stroke={color}
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
          />
        </svg>
        
        {/* Score Text */}
        <div className="absolute flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-6xl font-black text-white tracking-tighter">
              {score}
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase mt-2">
              Trust Logic
            </span>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="px-6 py-2 rounded-2xl text-[10px] font-black tracking-[0.2em] text-white shadow-2xl border"
          style={{ 
            backgroundColor: `${color}15`, 
            borderColor: `${color}30`,
            color: color,
            boxShadow: `0 0 20px ${color}10`
          }}
        >
          {status} DOCUMENT
        </motion.div>
      </div>
    </div>
  );
};

export default TrustScoreGauge;
