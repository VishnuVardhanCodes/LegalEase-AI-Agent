import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

const steps = [
  "Extracting Text from PDF",
  "Detecting Document Type",
  "Extracting Clauses",
  "Performing Risk Analysis",
  "Generating Plain Language Summary",
  "Calculating Trust Score",
  "Translating Content",
  "Preparing Final Report"
];

const ExecutionTimeline = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      // Simulate varied delay per step
      const delay = Math.random() * 800 + 400; 
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Finished all steps
      if (onComplete) {
        setTimeout(() => onComplete(), 500);
      }
    }
  }, [currentStep, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card bg-[#0c0c12]/90 border border-white/10 rounded-[30px] p-8 md:p-12 shadow-2xl overflow-hidden relative max-w-xl mx-auto w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 opacity-80 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Loader2 className="animate-spin text-indigo-400 w-5 h-5" />
          </div>
          Processing Document
        </h2>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-indigo-500/50 before:via-white/10 before:to-transparent">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;
            const isPending = currentStep < index;

            return (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Desktop timeline dot marker */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-[#0c0c12] absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 transition-colors duration-300 ${isCompleted ? 'border-emerald-500' : isCurrent ? 'border-indigo-500' : 'border-slate-700'}" style={{ borderColor: isCompleted ? '#10b981' : isCurrent ? '#6366f1' : '#334155' }}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                  ) : (
                    <Circle className="w-2 h-2 text-slate-700 fill-slate-700" />
                  )}
                </div>

                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-[calc(50%-2rem)] md:group-odd:text-right">
                  <div className={`p-4 rounded-2xl border transition-all duration-300 ${isCompleted ? 'bg-emerald-500/5 border-emerald-500/20' : isCurrent ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-white/[0.02] border-white/5 opacity-50'}`}>
                    <span className={`text-sm font-bold ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-indigo-400' : 'text-slate-500'}`}>
                      {step}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ExecutionTimeline;
