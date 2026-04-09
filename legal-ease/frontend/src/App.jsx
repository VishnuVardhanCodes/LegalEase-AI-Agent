import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadPage from './components/UploadPage';
import ResultsPage from './components/ResultsPage';
import { Scale, Shield, Globe, Award } from 'lucide-react';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisResult(data);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-200 selection:bg-primary selection:text-white">
      {/* Dynamic Background Mesh */}
      <div className="bg-mesh" />

      {/* Global Navigation Dock */}
      <nav className="fixed top-6 left-0 right-0 z-[100] px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between glass h-16 px-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-2xl bg-black/40">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={handleReset}
          >
            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <Scale className="text-primary-light w-5 h-5 group-hover:text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-widest text-white uppercase text-xs leading-none">LegalEase AI</span>
              <span className="text-[8px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">Agent Interface</span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
             <div className="flex items-center gap-2 group cursor-help">
                <Shield size={14} className="text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">Encrypted</span>
             </div>
             <div className="flex items-center gap-2 group cursor-help">
                <Globe size={14} className="text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">Multi-Agent</span>
             </div>
             <div className="w-px h-6 bg-white/5" />
             <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all text-slate-300">
               Hackathon Build v4
             </button>
          </div>

          <div className="md:hidden">
             <Scale className="text-primary-light w-6 h-6" />
          </div>
        </div>
      </nav>

      <main className="pt-24 flex-grow">
        <AnimatePresence mode="wait">
          {!analysisResult ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <UploadPage onAnalysisComplete={handleAnalysisComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <ResultsPage data={analysisResult} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Status Footer */}
      {!analysisResult && (
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 z-10 select-none pointer-events-none mt-auto"
        >
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/5 bg-white/[0.02] backdrop-blur-md">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Built For</span>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2">
                   <span className="text-sm">🏆</span>
                   <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] text-glow">
                     CodeQuest AI — Final Round Hackathon
                   </span>
                </div>
             </div>
             <div className="w-60 h-[1px] bg-gradient-to-r from-transparent via-primary-light/50 to-transparent" />
          </div>
        </motion.footer>
      )}

      {/* Aesthetic Overlays */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-[9999]"></div>
    </div>
  );
}

export default App;
