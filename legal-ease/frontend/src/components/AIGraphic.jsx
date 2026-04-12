import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Zap, Loader2 } from 'lucide-react';

const AIGraphic = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute w-[400px] h-[400px] border border-blue-500/10 rounded-full animate-ping-slow"></div>
        <div className="absolute w-[500px] h-[500px] border border-blue-500/5 rounded-full rotate-45"></div>
        <div className="absolute w-[600px] h-[600px] border border-blue-500/5 rounded-full -rotate-12"></div>
      </div>

      {/* Main Robot Group */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Robot Head */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 border-2 border-blue-500/40 rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl relative flex flex-col items-center justify-center gap-4"
        >
          {/* Antenna */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-blue-500/40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)] animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)] animate-pulse delay-75"></div>
          </div>
        </motion.div>

        {/* Neck */}
        <div className="w-4 h-3 bg-blue-500/20"></div>

        {/* Robot Body */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="w-40 h-48 border-2 border-blue-500/40 rounded-3xl bg-[#0F172A]/80 backdrop-blur-xl relative flex items-center justify-center"
        >
          {/* Internal Screen */}
          <div className="w-28 h-20 border border-blue-500/30 rounded-lg bg-blue-500/5 flex flex-col gap-2 p-3 overflow-hidden">
             <motion.div 
               animate={{ x: [-20, 80] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="h-full w-4 bg-blue-500/10 -skew-x-12"
             ></motion.div>
             <div className="absolute inset-0 flex flex-col gap-1.5 p-3">
               <div className="h-1 w-full bg-blue-400/20 rounded-full"></div>
               <div className="h-1 w-4/5 bg-blue-400/20 rounded-full"></div>
               <div className="h-1 w-full bg-blue-400/20 rounded-full"></div>
             </div>
          </div>

          {/* Arms (Shoulders) */}
          <div className="absolute -left-10 top-8 w-8 h-24 border-2 border-blue-500/40 rounded-full bg-[#0F172A]/80"></div>
          <div className="absolute -right-10 top-8 w-8 h-24 border-2 border-blue-500/40 rounded-full bg-[#0F172A]/80"></div>
        </motion.div>

        {/* Legs/Base */}
        <div className="flex gap-10 -mt-2">
          <div className="w-8 h-12 border-2 border-blue-500/40 rounded-full bg-[#0F172A]/80"></div>
          <div className="w-8 h-12 border-2 border-blue-500/40 rounded-full bg-[#0F172A]/80"></div>
        </div>
      </div>

      {/* Floating Status Cards */}
      
      {/* Analyzing Card */}
      <motion.div 
        animate={{ x: [0, 10, 0], y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-[15%] p-3 px-4 bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl flex items-center gap-3 shadow-2xl"
      >
        <Search className="w-4 h-4 text-blue-400" />
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Analyzing...</span>
        <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
      </motion.div>

      {/* Extracting Text Card */}
      <motion.div 
        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-[10%] p-3 px-4 bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl flex items-center gap-3 shadow-2xl"
      >
        <div className="w-8 h-10 border border-blue-500/30 rounded flex items-center justify-center bg-blue-500/5">
          <FileText className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Extracting Text</span>
          <div className="w-16 h-1 bg-blue-500/20 rounded-full mt-1 overflow-hidden">
            <motion.div 
              animate={{ x: [-64, 64] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-blue-400"
            ></motion.div>
          </div>
        </div>
      </motion.div>

      {/* AI Processing Card */}
      <motion.div 
        animate={{ x: [0, 15, 0], y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-20 right-[20%] p-3 px-4 bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl flex items-center gap-3 shadow-2xl"
      >
        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
          <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
        </div>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">AI Processing</span>
      </motion.div>
    </div>
  );
};

export default AIGraphic;
