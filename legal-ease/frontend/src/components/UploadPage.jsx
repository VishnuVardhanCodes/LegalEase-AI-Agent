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

  // Classification State
  const [textToClassify, setTextToClassify] = useState('');
  const [classificationResult, setClassificationResult] = useState(null);
  const [extractedClauses, setExtractedClauses] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const handleClassifyText = async () => {
    if (!textToClassify.trim()) return;
    setIsClassifying(true);
    setClassificationResult(null);
    setExtractedClauses(null);
    try {
      // 1. Classify
      const classRes = await axios.post('http://localhost:8000/api/classify', {
        text: textToClassify
      });
      setClassificationResult(classRes.data);
      
      // 2. Extract Clauses
      const extractRes = await axios.post('http://localhost:8000/api/extract', {
        document_type: classRes.data.document_type,
        text: textToClassify
      });
      const basicClauses = extractRes.data.clauses;

      // 3. Risk Analysis
      const riskRes = await axios.post('http://localhost:8000/api/analyze_risk', {
        document_type: classRes.data.document_type,
        clauses: basicClauses
      });
      const riskMapped = riskRes.data.risk_analysis || [];

      // Merge early for simplication
      const combinedForSimplify = basicClauses.map(c => {
         const r = riskMapped.find(rk => rk.clause_number === c.clause_number);
         return { ...c, risk_level: r ? r.risk_level : "SAFE" };
      });

      // 4. Simplify
      const simpRes = await axios.post('http://localhost:8000/api/simplify_clauses', {
        clauses: combinedForSimplify
      });
      const simpMapped = simpRes.data.simplified_clauses || [];

      // Combine all data
      const richClauses = basicClauses.map(c => {
         const r = riskMapped.find(rk => rk.clause_number === c.clause_number);
         const s = simpMapped.find(sm => sm.clause_number === c.clause_number);
         return { 
           ...c, 
           risk_level: r?.risk_level || "SAFE", 
           risk_reason: r?.risk_reason || "", 
           plain_explanation: s?.plain_explanation || "", 
           suggested_action: s?.suggested_action || "" 
         };
      });

      setExtractedClauses(richClauses);
    } catch (err) {
      setError("Classification failed. Make sure backend is running.");
    } finally {
      setIsClassifying(false);
    }
  };
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

      {/* Quick Text Classification */}
      <div className="w-full max-w-3xl z-10 px-4 mt-8">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[40px] p-8 border border-white/5 bg-white/[0.01]"
         >
            <div className="flex items-center gap-3 mb-6">
                <FileSearch className="text-indigo-400" size={20} />
                <h3 className="text-lg font-bold text-white tracking-tight">Quick Document Classification</h3>
            </div>
            <textarea
                value={textToClassify}
                onChange={(e) => setTextToClassify(e.target.value)}
                placeholder="Paste legal text here to instantly identify the document type (e.g. Landlord/Tenant, Employer, etc.)..."
                className="w-full h-32 bg-[#0c0c12]/50 border border-white/10 rounded-2xl p-4 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner custom-scrollbar"
            />
            <div className="flex justify-between items-center mt-4">
                <button
                   onClick={handleClassifyText}
                   disabled={isClassifying || !textToClassify.trim()}
                   className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-50 flex items-center gap-2"
                >
                   {isClassifying ? "CLASSIFYING..." : "CLASSIFY TEXT"}
                </button>
                {classificationResult && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="flex flex-col text-right"
                   >
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type Detected</span>
                     <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-bold text-emerald-400">{classificationResult.document_type}</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-500 text-[10px] font-black">{Math.round(classificationResult.confidence * 100)}%</span>
                     </div>
                   </motion.div>
                )}
            </div>

            <AnimatePresence>
              {extractedClauses && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 pt-8 border-t border-white/5 space-y-6"
                >
                   <div className="flex items-center gap-3 mb-2">
                     <ShieldCheck className="text-emerald-400 w-5 h-5" />
                     <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Deep Scan Complete • {extractedClauses.length} Clauses Analyzed</h4>
                   </div>
                   
                   <div className="max-h-[600px] overflow-y-auto pr-4 custom-scrollbar space-y-4">
                      {extractedClauses.map((c, i) => {
                        const getRiskColor = (level) => {
                          switch (level) {
                            case 'SAFE': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
                            case 'CAUTION': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                            case 'RISKY': return 'text-red-400 bg-red-500/10 border-red-500/20';
                            default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
                          }
                        };

                        return (
                        <div key={i} className="p-6 rounded-3xl bg-[#0c0c12]/80 border border-white/5 space-y-5 shadow-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                           {/* Glow Effect */}
                           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
                           
                           {/* Header */}
                           <div className="flex items-center justify-between relative z-10">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-black border border-indigo-500/20">
                                 {c.clause_number}
                               </div>
                               <span className="font-black text-white text-base tracking-tight">{c.clause_title}</span>
                             </div>
                             <div className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest ${getRiskColor(c.risk_level)}`}>
                               {c.risk_level}
                             </div>
                           </div>
                           
                           {/* Content Grid */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                              {/* Simplification */}
                              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                 <div className="flex items-center gap-2 text-indigo-400">
                                   <Sparkles size={14} />
                                   <span className="text-[10px] font-bold uppercase tracking-widest">Plain English Overview</span>
                                 </div>
                                 <p className="text-sm text-slate-300 font-medium leading-relaxed">
                                   {c.plain_explanation}
                                 </p>
                                 {c.risk_reason && (
                                   <div className="pt-3 mt-3 border-t border-white/5">
                                     <p className="text-xs text-slate-400 leading-relaxed">
                                       <span className="font-bold text-slate-300">Why it matters: </span>
                                       {c.risk_reason}
                                     </p>
                                     <p className="text-xs text-slate-400 leading-relaxed mt-1">
                                       <span className="font-bold text-indigo-300">Action: </span>
                                       {c.suggested_action}
                                     </p>
                                   </div>
                                 )}
                              </div>
                              
                              {/* Original Text */}
                              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                                 <div className="flex items-center gap-2 text-slate-500">
                                   <FileText size={14} />
                                   <span className="text-[10px] font-bold uppercase tracking-widest">Original Reference</span>
                                 </div>
                                 <p className="text-[11px] text-slate-500 leading-relaxed font-mono overflow-y-auto max-h-32 custom-scrollbar pr-2">
                                   {c.clause_text}
                                 </p>
                              </div>
                           </div>
                        </div>
                      )})}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
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
