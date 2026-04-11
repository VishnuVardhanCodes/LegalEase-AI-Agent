import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, CheckCircle2, AlertCircle, Globe, Scale, 
  Sparkles, ChevronRight, ChevronDown, Check, Play, Sun, Moon,
  FileSearch, ShieldCheck, Briefcase, Landmark, ScrollText
} from 'lucide-react';
import axios from 'axios';
import AgentWorkflow from './AgentWorkflow';
import HeroBackground from './HeroBackground';

const UploadPage = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('English');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const languages = ['English', 'Hindi', 'Telugu'];
  
  const docTags = [
    { name: 'Rental Agreement', icon: <Landmark size={14} /> },
    { name: 'Job Offer', icon: <Briefcase size={14} /> },
    { name: 'Loan Agreement', icon: <ScrollText size={14} /> },
    { name: 'NDA', icon: <ShieldCheck size={14} /> }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const handleAnalyze = async (mockData = null) => {
    if (!file && !mockData) {
      setError("Please select a document or use the demo document.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    // If it's a demo document, we simulate the whole process with mock data
    if (mockData) {
      // Step simulation is handled by the ProcessingScreen (to be added)
      // For now, we simulate a delay and then complete
      setTimeout(() => {
        onAnalysisComplete(mockData);
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append('document_file', file);
    formData.append('target_language', language);

    try {
      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onAnalysisComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to analyze document. Ensure the backend is running.");
      setIsAnalyzing(false);
    }
  };

  const handleDemo = () => {
    const mockAnalysis = {
      document_type: "Employment Agreement (Demo)",
      trust_score: 62,
      overall_summary: "This is a standard employment contract with several cautionary points regarding intellectual property ownership and a non-compete clause that might be overly restrictive in certain jurisdictions.",
      risk_summary: { risky: 2, caution: 3, safe: 5 },
      clauses: [
        {
          clause_number: "1.1",
          title: "Standard Compensation",
          risk_level: "SAFE",
          plain_english: "Your salary is $120,000 per year, paid monthly.",
          risk_reason: "Standard industry rate with clear payment terms.",
          original_text: "The Employee shall be entitled to an annual base salary of $120,000.00 USD, payable in accordance with the Company's standard payroll practices."
        },
        {
          clause_number: "4.2",
          title: "Non-Compete Clause",
          risk_level: "RISKY",
          plain_english: "You cannot work for any competitor anywhere in the world for 3 years after leaving.",
          risk_reason: "The 3-year duration and global scope are likely unenforceable and highly restrictive.",
          original_text: "For a period of thirty-six (36) months following termination, the Employee shall not engage in any business activity that competes with the Company, regardless of geographic location."
        },
        {
          clause_number: "5.1",
          title: "IP Assignment",
          risk_level: "CAUTION",
          plain_english: "Everything you create belongs to the company, even if done on your own time.",
          risk_reason: "Uses broad language that may capture personal projects created outside of work hours.",
          original_text: "All inventions, improvements, and works of authorship created by the Employee during the term of employment are the sole and exclusive property of the Company."
        }
      ]
    };
    handleAnalyze(mockAnalysis);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 pb-40">
      <HeroBackground />
      <div className="bg-grid opacity-30" />

      {/* Theme & Language Toggles */}
      <div className="fixed top-24 right-8 z-[110] flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-xl glass border border-white/10 text-white hover:bg-white/10 transition-all shadow-lg"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-400" />}
        </button>
      </div>

      {/* Hero Header */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
          }
        }}
        className="text-center z-10 mb-12 space-y-4 px-4 relative"
      >
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 bg-white/[0.02]"
        >
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-light">LegalEase AI</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10 mx-1" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Production Grade</span>
        </motion.div>
        
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-5xl md:text-8xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[0.95] md:leading-[1]"
        >
          Understand Legal Documents <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-primary-light animate-gradient-x contrast-125">Before You Sign.</span>
        </motion.h1>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed pt-4"
        >
          Upload any legal agreement and get a plain-language summary instantly. 
          <br className="hidden md:block"/> Empowering you with AI-driven document intelligence.
        </motion.p>
      </motion.div>

      {/* Document Tags */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 z-10 mb-12 max-w-2xl px-4"
      >
        {docTags.map((tag) => (
          <div 
            key={tag.name}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300 hover:text-white hover:border-primary/50 transition-all cursor-default"
          >
            {tag.icon}
            {tag.name}
          </div>
        ))}
      </motion.div>

      {/* Main Upload Area */}
      <div className="w-full max-w-3xl z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-[40px] p-2 overflow-hidden relative"
        >
          <div className="bg-[#0c0c12]/80 rounded-[38px] p-10 md:p-14 relative overflow-hidden">
            
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
                  {file ? file.name : "Drag and drop legal PDF"}
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready` : "Your data is encrypted and secure"}
                </p>
              </div>
            </div>

            {/* controls */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-3">
                  <div className="relative group">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-primary-light" />
                        <span>{language}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-30 glass-card rounded-2xl overflow-hidden p-1 border border-white/10 bg-[#0c0c12]/95"
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => { setLanguage(lang); setIsDropdownOpen(false); }}
                              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${language === lang ? 'bg-primary/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                              {lang}
                              {language === lang && <Check className="w-4 h-4 text-primary-light" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={handleDemo}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <Play size={14} className="text-primary-light" />
                    Try with Demo Document
                  </button>
               </div>

               <div className="flex items-start">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnalyze()}
                    disabled={isAnalyzing || !file}
                    className={`
                      w-full h-[60px] rounded-2xl font-bold uppercase tracking-[0.1em] text-sm flex items-center justify-center gap-3 transition-all
                      ${isAnalyzing || !file 
                        ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5' 
                        : 'bg-primary hover:bg-primary-dark text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] glow-pulse'
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

            <AnimatePresence>
               {error && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-medium"
                 >
                   <AlertCircle size={18} />
                   {error}
                 </motion.div>
               )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Agent Workflow Section - KEPT AS REQUESTED */}
      <div className="relative z-10 w-full mb-12">
        <AgentWorkflow />
      </div>
    </div>
  );
};

export default UploadPage;
