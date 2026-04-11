import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Activity, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

const ProcessingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Extracting Text', icon: <FileSearch className="w-6 h-6" />, duration: 800 },
    { label: 'Detecting Document Type', icon: <Activity className="w-6 h-6" />, duration: 1000 },
    { label: 'Analyzing Clauses', icon: <Cpu className="w-6 h-6" />, duration: 1200 },
    { label: 'Risk Evaluation', icon: <ShieldAlert className="w-6 h-6" />, duration: 1000 },
    { label: 'Generating Summary', icon: <CheckCircle className="w-6 h-6" />, duration: 800 }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [currentStep]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050508]/90 backdrop-blur-xl">
      <div className="w-full max-w-xl p-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block mb-12"
        >
          {/* Animated Glow Rings */}
          <div className="absolute inset-x-[-40px] inset-y-[-40px] bg-primary/20 blur-3xl animate-pulse rounded-full" />
          <div className="relative w-24 h-24 rounded-[30px] bg-primary flex items-center justify-center text-white shadow-[0_0_50px_rgba(99,102,241,0.5)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep >= steps.length ? steps.length - 1 : currentStep].icon}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <h2 className="text-3xl font-black text-white mb-8 tracking-tight">
          {currentStep < steps.length ? "AI Agent Working..." : "Analysis Complete!"}
        </h2>

        <div className="space-y-4 text-left">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0.2, x: -10 }}
              animate={{ 
                opacity: currentStep >= idx ? 1 : 0.2,
                x: currentStep >= idx ? 0 : -10,
                color: currentStep === idx ? '#6366F1' : (currentStep > idx ? '#10b981' : '#64748b')
              }}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentStep > idx ? 'bg-emerald-500/20 text-emerald-400' : (currentStep === idx ? 'bg-primary/20 text-primary-light' : 'bg-white/5 text-slate-600')}`}>
                  {currentStep > idx ? <CheckCircle className="w-4 h-4" /> : step.icon}
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">{step.label}</span>
              </div>
              
              {currentStep === idx && (
                <div className="flex gap-1">
                  <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 h-1 bg-primary rounded-full" />
                  <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 h-1 bg-primary rounded-full" />
                  <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 h-1 bg-primary rounded-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
