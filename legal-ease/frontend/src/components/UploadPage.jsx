import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Globe, Scale, Sparkles, ChevronRight } from 'lucide-react';
import axios from 'axios';
import AgentWorkflow from './AgentWorkflow';

const UploadPage = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('English');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a document to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('document_file', file);
    formData.append('target_language', language);

    try {
      // Simulate slight delay for the "wow" scanning animation
      await new Promise(r => setTimeout(r, 1500));
      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onAnalysisComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to analyze document. Ensure the backend is running.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 pb-40">
      {/* Decorative Orbs */}
      <div className="glow-orb top-[-10%] left-[-10%] opacity-20" />
      <div className="glow-orb bottom-[-10%] right-[-10%] opacity-20" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' }} />
      <div className="bg-grid" />

      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-16 space-y-4 px-4"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary-light" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-light">Next-Gen Legal Analysis</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Legal clarity for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-primary-light animate-gradient-x">everyone.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Upload any legal agreement and get a plain-language summary in <span className="text-white font-medium">10 seconds</span>. 
          Powered by advanced AI agents.
        </p>
      </motion.div>

      {/* Agent Workflow Section */}
      <div className="relative z-10 w-full mb-12">
        <AgentWorkflow />
      </div>

      {/* Main Upload Area */}
      <div className="w-full max-w-3xl z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-[40px] p-2 overflow-hidden relative"
        >
          <div className="bg-[#0c0c12]/80 rounded-[38px] p-10 md:p-14 relative overflow-hidden">
            
            {/* Animated Scanning Beam */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div 
                   initial={{ top: '-100%' }}
                   animate={{ top: '100%' }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent z-20 pointer-events-none"
                >
                  <div className="h-[2px] w-full bg-primary-light shadow-[0_0_20px_rgba(167,139,250,1)]" />
                </motion.div>
              )}
            </AnimatePresence>

            <div 
              {...getRootProps()} 
              className={`
                relative group flex flex-col items-center justify-center border-2 border-dashed rounded-[30px] p-12 transition-all duration-500
                ${isDragActive ? 'border-primary bg-primary/5 scale-[0.98]' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'}
                ${file ? 'border-emerald-500/30 bg-emerald-500/5' : ''}
              `}
            >
              <input {...getInputProps()} />
              
              <div className="mb-6 relative">
                 <div className="absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse" />
                 <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${file ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary/20 text-primary-light group-hover:scale-110'}`}>
                   {file ? <FileText size={32} /> : <Upload size={32} />}
                 </div>
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold text-white mb-2">
                  {file ? file.name : "Select your Legal PDF"}
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis` : "Drag and drop or click to browse files"}
                </p>
              </div>
            </div>

            {/* controls */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Language</span>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-light z-10" />
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-12 py-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer appearance-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                    </select>
                  </div>
               </div>

               <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !file}
                    className={`
                      w-full h-[60px] rounded-2xl font-bold uppercase tracking-[0.1em] text-sm flex items-center justify-center gap-3 transition-all
                      ${isAnalyzing || !file 
                        ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5' 
                        : 'bg-primary hover:bg-primary-dark text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] glow-pulse'
                      }
                    `}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Document
                        <ChevronRight size={18} />
                      </>
                    )}
                  </motion.button>
               </div>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
               {error && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className="mt-8 p-4 bg-risk-high/10 border border-risk-high/20 rounded-2xl flex items-center gap-3 text-risk-high text-sm font-medium"
                 >
                   <AlertCircle size={18} />
                   {error}
                 </motion.div>
               )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* trust indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
           <div className="flex items-center gap-2">
             <Scale size={20} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Legally Secure</span>
           </div>
           <div className="flex items-center gap-2">
             <CheckCircle2 size={20} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Privacy Protected</span>
           </div>
           <div className="flex items-center gap-2">
             <sparkles size={20} />
             <span className="text-[10px] font-bold uppercase tracking-widest">AI Agent Powered</span>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;
