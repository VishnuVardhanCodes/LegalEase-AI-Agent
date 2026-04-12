import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ChevronRight, FileCheck, Search, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import { InnovativeFeatures, RealWorldImpact, TechStackSection, FooterConnect, WorkflowSection } from '../components/LandingSections';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Simulate login by setting a dummy token
    localStorage.setItem('authToken', 'demo-token-12345');
    localStorage.setItem('userData', JSON.stringify({ name: 'Felix Anderson', role: 'Premium' }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 overflow-hidden font-['Inter',sans-serif]">
      {/* Hero Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none"></div>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-8 border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Shield className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase italic">
              Legal<span className="text-indigo-400">Ease</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            {['Features', 'Solutions', 'Community', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              Sign In
            </button>
            <button 
              onClick={handleGetStarted}
              className="px-6 py-2.5 bg-white text-black rounded-lg text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5 hover:shadow-indigo-500/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10 max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase"
            >
              <Shield className="h-3.5 w-3.5" /> LEGALEASE AI <span className="text-slate-500">•</span> PRODUCTION GRADE
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.2]"
            >
              <span className="block whitespace-nowrap">Understand Legal</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_20px_rgba(99,102,241,0.2)] block">Documents</span>
              <span className="block whitespace-nowrap">Before You Sign.</span>
            </motion.h1>

            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-400/90 font-medium leading-relaxed whitespace-nowrap"
              >
                Upload any legal agreement and get a <span className="text-white border-b-2 border-indigo-500/30">plain-language summary</span> instantly.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm md:text-base text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <div className="w-8 h-[1px] bg-slate-800"></div> AI-Driven Intelligence
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <button 
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                <Zap className="h-5 w-5 fill-white group-hover:animate-pulse" />
                Upload Document
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                See How It Works
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { name: 'Rental Agreement', icon: <FileCheck className="h-3.5 w-3.5" /> },
                { name: 'Job Offer', icon: <FileCheck className="h-3.5 w-3.5" /> },
                { name: 'Loan Agreement', icon: <FileCheck className="h-3.5 w-3.5" /> },
                { name: 'NDA', icon: <FileCheck className="h-3.5 w-3.5" /> },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer">
                  {doc.icon} {doc.name}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] w-full flex items-center justify-center p-4"
            >
              {/* Massive Backdrop Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"></div>
              
              <motion.img 
                src="https://file.aiquickdraw.com/imgcompressed/img/compressed_e8789e2659e72987c2525127f1cb0541.webp"
                alt="AI Legal Assistant"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(79,70,229,0.4)] transition-transform duration-700"
              />

              {/* Enhanced Labels */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 p-4 bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-3 shadow-2xl z-20"
              >
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
                Analyzing Clauses...
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 p-4 bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl text-[11px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-3 shadow-2xl z-20"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                98% Accuracy
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Workflow Section */}
      <WorkflowSection />

      {/* Professional Sections */}
      <div className="relative z-10 space-y-0">
        <InnovativeFeatures />
        <RealWorldImpact />
        <TechStackSection />
        <FooterConnect />
      </div>
    </div>
  );
};

export default LandingPage;
