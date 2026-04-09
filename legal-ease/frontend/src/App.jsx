import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadPage from './components/UploadPage';
import ResultsPage from './components/ResultsPage';
import { Scale } from 'lucide-react';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisResult(data);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen text-slate-200">
      {/* Background Mesh */}
      <div className="bg-mesh" />

      {/* Persistent Nav */}
      <nav className="p-6 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Scale className="text-primary-light w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-white uppercase text-sm">LegalEase AI</span>
        </div>
        
        <div className="flex items-center gap-6">
           <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Documentation</a>
           <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Pricing</a>
           <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
             Contact Sales
           </button>
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {!analysisResult ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <UploadPage onAnalysisComplete={handleAnalysisComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsPage data={analysisResult} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      {!analysisResult && (
        <footer className="py-12 text-center opacity-30 select-none">
          <p className="text-xs font-bold uppercase tracking-[0.4em]">Proprietary AI Engine v2.4.1</p>
        </footer>
      )}
    </div>
  );
}

export default App;
