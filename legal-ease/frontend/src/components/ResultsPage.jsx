import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Shield, AlertTriangle, CheckCircle, Info, 
  Filter, ArrowLeft, Download, Share2, LayoutDashboard, 
  MessageCircle, Activity, BarChart3, Fingerprint
} from 'lucide-react';
import TrustScoreMeter from './TrustScoreMeter';
import ClauseCard from './ClauseCard';
import ChatPanel from './ChatPanel';
import ExportPanel from './ExportPanel';

const ResultsPage = ({ data, onReset }) => {
  const [filter, setFilter] = useState('ALL');
  
  const filteredClauses = filter === 'ALL' 
    ? data.clauses 
    : data.clauses.filter(c => c.risk_level === filter);

  const stats = [
    { label: 'Risky', count: data.risk_summary.risky, color: 'text-red-400', bg: 'bg-red-500/10', type: 'RISKY', icon: <AlertTriangle size={14} /> },
    { label: 'Caution', count: data.risk_summary.caution, color: 'text-amber-400', bg: 'bg-amber-500/10', type: 'CAUTION', icon: <Info size={14} /> },
    { label: 'Safe', count: data.risk_summary.safe, color: 'text-emerald-400', bg: 'bg-emerald-500/10', type: 'SAFE', icon: <CheckCircle size={14} /> },
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] p-4 md:p-8 lg:p-12 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="glow-orb top-[-10%] right-[-10%] opacity-10" />
      <div className="bg-grid" />

      {/* Top Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12 relative z-10">
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
            onClick={onReset}
            className="p-3 rounded-2xl border border-white/5 bg-white/[0.02] text-slate-400"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white tracking-tight uppercase italic flex items-center gap-3">
                <Fingerprint className="text-indigo-500" />
                {data.document_type || "Analysis Report"}
              </h1>
              <span className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest whitespace-nowrap">
                SECURE SCAN • VERIFIED
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Activity size={14} className="text-emerald-500" />
              Agent Analysis complete • High Fidelity Evaluation
            </p>
          </div>
        </div>

        <ExportPanel summary={data.overall_summary} />
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column (4 cols) */}
        <div className="xl:col-span-4 space-y-8">
           {/* Trust Score Gauge */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-card rounded-[40px] p-10 flex flex-col items-center border border-white/5 bg-white/[0.01]"
           >
              <TrustScoreMeter score={data.trust_score} />
              
              <div className="w-full mt-10">
                 <div className="flex items-center gap-2 mb-4 justify-center">
                    <BarChart3 size={14} className="text-indigo-400" />
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Risk Heatmap</h4>
                 </div>
                 
                 {/* Visual Risk Heatmap Grid */}
                 <div className="grid grid-cols-5 gap-2 p-4 bg-black/20 rounded-2xl border border-white/5">
                    {data.clauses.map((clause, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`aspect-square rounded-md shadow-sm transition-all duration-300 ${
                                clause.risk_level === 'RISKY' ? 'bg-red-500/40 border border-red-500/20' :
                                clause.risk_level === 'CAUTION' ? 'bg-amber-500/40 border border-amber-500/20' :
                                'bg-emerald-500/40 border border-emerald-500/20'
                            }`}
                            title={`Clause ${clause.clause_number}: ${clause.risk_level}`}
                        />
                    ))}
                 </div>
                 <div className="flex justify-between mt-3 px-1">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">START OF DOC</span>
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">END OF DOC</span>
                 </div>
              </div>

              {/* Executive Summary Snippet */}
              <div className="w-full mt-8 p-6 bg-indigo-500/5 rounded-[30px] border border-indigo-500/10 relative">
                <Shield className="absolute -top-3 -right-3 text-indigo-400 opacity-20" size={40} />
                <p className="text-sm text-slate-300 leading-relaxed font-medium italic text-center">
                  "{data.overall_summary}"
                </p>
              </div>
           </motion.div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <button 
                  key={i}
                  onClick={() => setFilter(stat.type)}
                  className={`flex flex-col gap-4 p-6 rounded-[32px] border transition-all ${filter === stat.type ? 'bg-white/10 border-white/20 scale-[1.02]' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}
                >
                   <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                     {stat.icon}
                   </div>
                   <div className="text-left">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                      <h5 className="text-2xl font-black text-white leading-none mt-1">{stat.count}</h5>
                   </div>
                </button>
              ))}
              
              <button 
                onClick={() => setFilter('ALL')}
                className={`flex flex-col gap-4 p-6 rounded-[32px] border transition-all ${filter === 'ALL' ? 'bg-indigo-500/10 border-indigo-500/20 scale-[1.02]' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}
              >
                 <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                   <LayoutDashboard size={14} />
                 </div>
                 <div className="text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total</span>
                    <h5 className="text-2xl font-black text-white leading-none mt-1">{data.clauses.length}</h5>
                 </div>
              </button>
           </div>
        </div>

        {/* Right Column (8 cols) */}
        <div className="xl:col-span-8 grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
           
           {/* Clause List Section (7 cols) */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="lg:col-span-7 space-y-6"
           >
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                   <span className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                     <FileText size={18} />
                   </span>
                   Clause Analysis
                </h3>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                   {filter === 'ALL' ? 'Complete View' : `${filter} Filtered`}
                </div>
              </div>

              <div className="space-y-4 max-h-[800px] pr-4 overflow-y-auto custom-scrollbar">
                {filteredClauses.map((clause, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ClauseCard clause={clause} />
                  </motion.div>
                ))}
              </div>
           </motion.div>

           {/* Agent Chat Section (5 cols) */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="lg:col-span-5 h-full mt-12 lg:mt-0"
           >
              <div className="flex items-center gap-3 mb-6 px-2">
                 <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-40 animate-pulse" />
                        <span className="relative w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <MessageCircle size={18} />
                        </span>
                    </div>
                    Agent Consultation
                 </h3>
              </div>
              <div className="h-[750px] shadow-2xl rounded-[40px] overflow-hidden border border-white/5">
                <ChatPanel documentContext={data} language="English" />
              </div>
           </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
