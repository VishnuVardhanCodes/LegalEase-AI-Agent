import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bot, ShieldCheck, FileSearch, Cpu, Zap, Network, Scale, Sparkles } from 'lucide-react';

const HeroBackground = () => {
  const icons = [
    { Icon: Bot, color: 'text-purple-500/20' },
    { Icon: ShieldCheck, color: 'text-blue-500/20' },
    { Icon: FileSearch, color: 'text-emerald-500/20' },
    { Icon: Cpu, color: 'text-amber-500/20' },
    { Icon: Zap, color: 'text-cyan-500/20' },
    { Icon: Network, color: 'text-indigo-500/20' },
    { Icon: Scale, color: 'text-slate-500/20' },
    { Icon: Sparkles, color: 'text-primary-light/20' },
  ];

  // Generate random positions for icons
  const backgroundIcons = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      data: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -20,
      size: 20 + Math.random() * 30,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Neural Mesh Background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-grid)" />
      </svg>

      {/* Floating Agent Nodes */}
      {backgroundIcons.map((item) => (
        <motion.div
          key={item.id}
          initial={{ x: `${item.x}%`, y: `${item.y}%`, opacity: 0, scale: 0.5 }}
          animate={{
            y: [`${item.y}%`, `${(item.y + 15) % 100}%`, `${item.y}%`],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          className={`absolute ${item.data.color}`}
          style={{ width: item.size, height: item.size }}
        >
          <item.data.Icon size={item.size} />
        </motion.div>
      ))}

      {/* Connecting Lines Overlay (Subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" viewBox="0 0 1000 1000">
        <motion.path
          d="M 100 100 Q 500 300 900 100 T 500 900 Q 100 500 100 100"
          stroke="white"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_var(--color-background)_80%]" />
    </div>
  );
};

export default HeroBackground;
