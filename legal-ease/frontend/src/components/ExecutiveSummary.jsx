import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const ExecutiveSummary = ({ summary }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-indigo-500/10 border-l-4 border-indigo-500 rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Info className="w-32 h-32 text-white" />
      </div>
      
      <div className="flex items-start gap-6 relative z-10">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-500/20">
          <ShieldCheck className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white mb-2 tracking-tight">Executive Intelligence Summary</h3>
          <p className="text-slate-300 leading-relaxed font-medium text-lg italic">
            "{summary || "Initial document analysis complete. No specific patterns detected for summary generation."}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExecutiveSummary;
