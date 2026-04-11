import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadPage from './components/UploadPage';
import ResultsPage from './components/ResultsPage';
import ProcessingScreen from './components/ProcessingScreen';
import { Scale, Shield, Globe, Award, Sparkles, Settings, Type, Contrast } from 'lucide-react';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingResult, setPendingResult] = useState(null);
  
  // Accessibility States
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`);
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, isHighContrast]);

  const handleAnalysisComplete = (data) => {
    setPendingResult(data);
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    setAnalysisResult(pendingResult);
    setIsProcessing(false);
    setPendingResult(null);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setPendingResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-200 selection:bg-indigo-500 selection:text-white">
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
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
              <Scale className="text-indigo-400 w-5 h-5 group-hover:text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black tracking-widest text-white uppercase text-xs leading-none">LegalEase AI</span>
              <span className="text-[8px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">Next-Gen Intelligence</span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
             <div className="flex items-center gap-2 group cursor-help">
                <Shield size={14} className="text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">Safe Vault</span>
             </div>
             <div className="flex items-center gap-2 group cursor-help">
                <Globe size={14} className="text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">Global Laws</span>
             </div>
             <div className="w-px h-6 bg-white/5" />
             <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all text-slate-300">
               Hackathon Master Build
             </button>
          </div>

          <div className="md:hidden">
             <Scale className="text-indigo-400 w-6 h-6" />
          </div>
        </div>
      </nav>

      <main className="pt-24 flex-grow">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProcessingScreen onComplete={handleProcessingComplete} />
            </motion.div>
          ) : !analysisResult ? (
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

      {/* Accessibility Toolbar */}
      <div className="fixed bottom-8 right-8 z-[120]">
        <AnimatePresence>
          {showAccessMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 p-4 glass rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-indigo-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Font Size</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white">-</button>
                  <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <Contrast size={16} className="text-indigo-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Contrast</span>
                </div>
                <button 
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isHighContrast ? 'bg-indigo-500' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isHighContrast ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setShowAccessMenu(!showAccessMenu)}
          className="w-14 h-14 rounded-2xl bg-indigo-500 text-white shadow-xl flex items-center justify-center hover:bg-indigo-600 transition-all border border-indigo-400/20"
        >
          <Settings size={24} className={showAccessMenu ? 'rotate-90 transition-transform' : ''} />
        </button>
      </div>

      {/* Global Status Footer */}
      {!analysisResult && !isProcessing && (
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 z-10 select-none pointer-events-none mt-auto"
        >
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/5 bg-white/[0.02] backdrop-blur-md">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Built For</span>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2">
                   <Sparkles className="w-3 h-3 text-indigo-400" />
                   <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] text-glow">
                     CodeQuest AI 2026
                   </span>
                </div>
             </div>
          </div>
        </motion.footer>
      )}

      {/* Aesthetic Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
}

export default App;
