import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSearch, ShieldAlert, MessageSquareText, TrendingUp, Bot, Sparkles } from 'lucide-react';

const AgentWorkflow = () => {
  const steps = [
    {
      id: 1,
      title: 'Ingest',
      desc: 'Secure PDF upload to isolated cloud vault.',
      icon: <Upload size={24} />,
      color: 'from-orange-500 to-red-500',
      shadow: 'shadow-orange-500/20'
    },
    {
      id: 2,
      title: 'Structural Parse',
      desc: 'AI detects clauses, headers, and parties.',
      icon: <FileSearch size={24} />,
      color: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/20'
    },
    {
      id: 3,
      title: 'Risk Scanning',
      desc: 'Agent identifies 50+ legal red flags.',
      icon: <ShieldAlert size={24} />,
      color: 'from-yellow-400 to-amber-500',
      shadow: 'shadow-yellow-500/20'
    },
    {
      id: 4,
      title: 'Simplification',
      desc: 'Legalese translated to plain human language.',
      icon: <MessageSquareText size={24} />,
      color: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-500/20'
    },
    {
      id: 5,
      title: 'Trust Scoring',
      desc: 'Safety metrics and risk ratings calculated.',
      icon: <TrendingUp size={24} />,
      color: 'from-blue-400 to-indigo-500',
      shadow: 'shadow-blue-500/20'
    },
    {
      id: 6,
      title: 'Consultation',
      desc: 'Interactive AI follow-up for deep clarity.',
      icon: <Bot size={24} />,
      color: 'from-purple-400 to-fuchsia-500',
      shadow: 'shadow-purple-500/20'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-4 relative overflow-hidden">
      
      {/* Header Section */}
      <div className="text-center mb-24 space-y-4">
         <motion.h2 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="text-3xl md:text-5xl font-black text-white tracking-tight"
         >
           How Our <span className="text-primary-light">Doc Intelligence</span> Works
         </motion.h2>
         <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
           A multi-stage agentic workflow designed to turn complex legal text into actionable clarity.
         </p>
      </div>

      {/* Desktop Workflow (S-Curve) */}
      <div className="hidden lg:block relative min-h-[500px]">
        {/* Animated SVG S-Curve Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" fill="none">
          <motion.path
            d="M 83 100 C 166 100, 166 300, 250 300 C 333 300, 333 100, 416 100 C 500 100, 500 300, 583 300 C 666 300, 666 100, 750 100 C 833 100, 833 300, 916 300"
            stroke="url(#gradient-path)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            style={{ 
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
            }}
          />
          <defs>
            <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="25%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="75%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Workflow Nodes */}
        <div className="relative z-10 grid grid-cols-6 gap-0">
           {steps.map((step, index) => {
             // Path hits y=100 for indices 0, 2, 4
             // Path hits y=300 for indices 1, 3, 5
             const isTop = index % 2 === 0;
             return (
               <motion.div
                 key={step.id}
                 initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.15 }}
                 className={`flex flex-col items-center text-center space-y-6 ${
                   isTop ? 'pt-[68px]' : 'pt-[268px]'
                 }`}
               >
                  {/* Node Orb */}
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] ${step.shadow} shadow-2xl z-20`}
                  >
                     <div className="w-full h-full bg-[#050508] rounded-[15px] flex items-center justify-center text-white relative overflow-hidden group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                        {step.icon}
                     </div>
                     
                     {/* Connection Glow */}
                     <div className={`absolute -inset-4 bg-gradient-to-br ${step.color} blur-2xl opacity-30`} />
                  </motion.div>

                  {/* Content */}
                  <div className={`space-y-2 px-2 absolute ${isTop ? 'top-[150px]' : 'top-[350px]'} w-full`}>
                     <h4 className="text-white font-black text-[12px] uppercase tracking-[0.2em]">{step.title}</h4>
                     <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-[140px] mx-auto opacity-70">
                        {step.desc}
                     </p>
                  </div>
               </motion.div>
             );
           })}
        </div>
      </div>

      {/* Mobile/Tablet Workflow (Simplified) */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 relative">
         {/* Vertical Connection Line */}
         <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-emerald-500 to-purple-500 opacity-10" />
         
         {steps.map((step, index) => (
           <motion.div
             key={step.id}
             initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="glass-card p-8 rounded-[30px] flex items-start gap-6 border border-white/5 relative z-10"
           >
              <div className={`w-14 h-14 rounded-2xl shrink-0 bg-gradient-to-br ${step.color} p-[1px]`}>
                 <div className="w-full h-full bg-[#050508] rounded-[15px] flex items-center justify-center text-white">
                    {step.icon}
                 </div>
              </div>
              <div>
                 <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">{step.title}</h4>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">{step.desc}</p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Floating Sparkle for extra flair */}
      <motion.div 
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 right-10 text-primary-light/30"
      >
        <Sparkles size={40} />
      </motion.div>
    </div>
  );
};

export default AgentWorkflow;
