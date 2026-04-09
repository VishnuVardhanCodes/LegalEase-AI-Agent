import React from 'react';
import { motion } from 'framer-motion';

const TrustScoreMeter = ({ score }) => {
  // Determine color based on score
  const getColor = (s) => {
    if (s <= 40) return '#ef4444'; // Red
    if (s <= 65) return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  const getLabel = (s) => {
    if (s <= 40) return 'RISKY';
    if (s <= 65) return 'MODERATE';
    return 'SAFE';
  };

  const color = getColor(score);
  const label = getLabel(score);
  
  // SVG constants
  const size = 200;
  const strokeWidth = 15;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Score Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold text-white tracking-tighter"
          >
            {score}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs font-bold tracking-[0.2em] mt-1"
            style={{ color }}
          >
            {label}
          </motion.span>
        </div>

        {/* Outer Glow */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 blur-2xl -z-10"
          style={{ backgroundColor: color }}
        />
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-widest">Document Trust Score</h3>
      </div>
    </div>
  );
};

export default TrustScoreMeter;
