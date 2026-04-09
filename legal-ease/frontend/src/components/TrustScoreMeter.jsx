import React from 'react';
import { motion } from 'framer-motion';

const TrustScoreMeter = ({ score }) => {
  const getColor = (s) => {
    if (s <= 40) return '#ef4444'; // Red
    if (s <= 65) return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  const getLabel = (s) => {
    if (s <= 40) return 'CRITICAL RISK';
    if (s <= 65) return 'MODERATE CAUTION';
    return 'HIGHLY SECURE';
  };

  const color = getColor(score);
  const label = getLabel(score);
  
  const size = 260;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = (size - strokeWidth * 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        
        {/* Background Radial Glow */}
        <div 
          className="absolute inset-4 rounded-full opacity-10 blur-3xl transition-colors duration-1000"
          style={{ backgroundColor: color }}
        />

        {/* Circular SVG */}
        <svg width={size} height={size} className="transform -rotate-90 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress Segment */}
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
            transition={{ duration: 2, ease: "circOut" }}
            strokeLinecap="round"
            className="drop-shadow-lg"
            style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
          />
          
          {/* Knobs/Markers */}
          {[...Array(8)].map((_, i) => (
             <circle 
                key={i}
                cx={center + radius * Math.cos(i * 45 * Math.PI / 180)}
                cy={center + radius * Math.sin(i * 45 * Math.PI / 180)}
                r="1.5"
                fill="rgba(255,255,255,0.1)"
             />
          ))}
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="relative"
          >
            <span className="text-7xl font-black text-white tracking-tighter block leading-none">
              {score}
            </span>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 border border-white/5">
              / 100
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mt-4 px-3 py-1 bg-white/5 rounded-full border border-white/5"
            style={{ color }}
          >
            {label}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreMeter;
