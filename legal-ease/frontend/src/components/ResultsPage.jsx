import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, AlertTriangle, CheckCircle, Info, Filter, ArrowLeft, Download, Share2, LayoutDashboard, MessageCircle } from 'lucide-react';
import TrustScoreMeter from './TrustScoreMeter';
import ClauseCard from './ClauseCard';
import ChatPanel from './ChatPanel';
import ActionBar from './ActionBar';

const ResultsPage = ({ data, onReset }) => {
  const [filter, setFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('CLAUSES'); // 'CLAUSES' or 'CHAT'
  
  const filteredClauses = filter === 'ALL' 
    ? data.clauses 
    : data.clauses.filter(c => c.risk_level === filter);

  const stats = [
    { label: 'Critical Risks', count: data.risk_summary.risky, color: 'text-risk-high', bg: 'bg-risk-high/10', border: 'border-risk-high/20', type: 'RISKY', icon: <AlertTriangle size={14} /> },
    { label: 'Caution Area', count: data.risk_summary.caution, color: 'text-risk-medium', bg: 'bg-risk-medium/10', border: 'border-risk-medium/20', type: 'CAUTION', icon: <Info size={14} /> },
    { label: 'Safe Points', count: data.risk_summary.safe, color: 'text-risk-low', bg: 'bg-risk-low/10', border: 'border-risk-low/20', type: 'SAFE', icon: <CheckCircle size={14} /> },
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] p-4 md:p-8 lg:p-12 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="glow-orb top-[-10%] right-[-10%] opacity-10" />
      <div className="bg-grid" />

      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
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
              <h1 className="text-3xl font-bold text-white tracking-tight">{data.document_type || "Analysis Report"}</h1>
              <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-bold text-primary-light uppercase tracking-widest">
                v1.0 • AI Analyzed
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Document processed in 4.2 seconds • 99% Confidence</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/[0.08] transition-all">
             <Download size={16} /> PDF Export
           </button>
           <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)]">
             <Share2 size={16} /> Share Report
           </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Col: Analytics & Trust (4 cols) */}
        <div className="xl:col-span-4 space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-card rounded-[40px] p-10 flex flex-col items-center"
           >
              <TrustScoreMeter score={data.trust_score} />
              
              <div className="w-full mt-10">
                 <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">Executive Summary</h4>
                 <div className="p-6 bg-white/[0.02] rounded-[30px] border border-white/5 relative group">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-primary-light">
                      <Shield size={14} />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed italic text-center">
                      "{data.overall_summary}"
                    </p>
                 </div>
              </div>
           </motion.div>

           {/* Metrics Grid */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4"
           >
              {stats.map((stat, i) => (
                <button 
                  key={i}
                  onClick={() => setFilter(stat.type)}
                  className={`flex items-center justify-between p-6 rounded-[30px] border transition-all ${filter === stat.type ? 'bg-white/10 border-white/20 scale-[1.02]' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                        {stat.icon}
                      </div>
                      <div className="text-left">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
                         <h5 className="text-lg font-bold text-white leading-none mt-1">{stat.count}</h5>
                      </div>
                   </div>
                   {filter === stat.type && <div className="w-1.5 h-1.5 rounded-full bg-primary-light shadow-[0_0_10px_rgba(167,139,250,1)]" />}
                </button>
              ))}
              
              <button 
                onClick={() => setFilter('ALL')}
                className={`flex items-center justify-between p-6 rounded-[30px] border transition-all ${filter === 'ALL' ? 'bg-primary/10 border-primary/20 scale-[1.02]' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                      <LayoutDashboard size={14} />
                    </div>
                    <div className="text-left">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Full Report</span>
                       <h5 className="text-lg font-bold text-white leading-none mt-1">{data.clauses.length} Clauses</h5>
                    </div>
                 </div>
                 {filter === 'ALL' && <div className="w-1.5 h-1.5 rounded-full bg-primary-light shadow-[0_0_10px_rgba(167,139,250,1)]" />}
              </button>
           </motion.div>
        </div>

        {/* Right Content Area: Tabs for Mobile / Desktop side-by-side (8 cols) */}
        <div className="xl:col-span-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-8 min-h-[850px]">
           
           {/* Section 1: Clause List */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-6"
           >
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                   <span className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary-light">
                     <FileText size={16} />
                   </span>
                   Document Details
                </h3>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                   Viewing {filter === 'ALL' ? 'Entire Agreement' : `${filter} Clauses`}
                </div>
              </div>

              <div className="space-y-4 max-h-[750px] pr-4 overflow-y-auto custom-scrollbar">
                {filteredClauses.length > 0 ? (
                  filteredClauses.map((clause, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ClauseCard clause={clause} />
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center opacity-30">
                     <FileText size={48} className="mx-auto mb-4" />
                     <p className="text-sm font-bold uppercase tracking-widest">No clauses match this filter</p>
                  </div>
                )}
              </div>
           </motion.div>

           {/* Section 2: AI Chat (Hidden on small laptop/tablet maybe, but visible on Desktop) */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="h-full mt-12 lg:mt-0"
           >
              <div className="flex items-center gap-3 mb-6 px-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                   <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                     <MessageCircle size={16} />
                   </span>
                   Agent Chat
                </h3>
              </div>
              <ChatPanel documentContext={data} language="English" />
           </motion.div>

        </div>
      </div>

      <ActionBar summary={data.overall_summary} onReload={onReset} />
    </div>
  );
};

export default ResultsPage;
