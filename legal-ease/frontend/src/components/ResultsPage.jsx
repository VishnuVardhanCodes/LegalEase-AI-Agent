import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, CheckCircle, Info, Filter } from 'lucide-react';
import TrustScoreMeter from './TrustScoreMeter';
import ClauseCard from './ClauseCard';
import ChatPanel from './ChatPanel';
import ActionBar from './ActionBar';

const ResultsPage = ({ data, onReset }) => {
  const [filter, setFilter] = useState('ALL');
  
  const filteredClauses = filter === 'ALL' 
    ? data.clauses 
    : data.clauses.filter(c => c.risk_level === filter);

  const stats = [
    { label: 'Risky', count: data.risk_summary.risky, color: 'bg-red-500', type: 'RISKY', icon: <AlertTriangle size={14} /> },
    { label: 'Caution', count: data.risk_summary.caution, color: 'bg-amber-500', type: 'CAUTION', icon: <Info size={14} /> },
    { label: 'Safe', count: data.risk_summary.safe, color: 'bg-emerald-500', type: 'SAFE', icon: <CheckCircle size={14} /> },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Stats & Gauge */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-3xl p-8 flex flex-col items-center"
          >
             <div className="w-full flex justify-between items-center mb-10">
                <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-bold text-primary-light uppercase tracking-widest">
                  {data.document_type || "Legal Document"}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {data.total_clauses} Clauses Found
                </div>
             </div>
            
            <TrustScoreMeter score={data.trust_score} />
            
            <div className="w-full mt-10 space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Overall Summary</h4>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{data.overall_summary}"
              </p>
            </div>
          </motion.div>

          {/* Quick Stats / Filter */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter size={18} className="text-slate-400" />
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Filter by Risk</h4>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => setFilter('ALL')}
                className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all border ${filter === 'ALL' ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-transparent hover:border-white/10'}`}
              >
                <span className="text-sm font-medium">All Clauses</span>
                <span className="text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg">{data.clauses.length}</span>
              </button>
              
              {stats.map((stat, i) => (
                <button 
                  key={i}
                  onClick={() => setFilter(stat.type)}
                  className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all border ${filter === stat.type ? 'bg-white/10 border-white/20' : 'bg-white/5 border-transparent hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="text-xs font-bold">{stat.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Column: Clause Cards */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Document Breakdown</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          
          <div className="max-h-[800px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {filteredClauses.map((clause, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ClauseCard 
                  clause={clause} 
                  onAskAbout={(c) => { 
                    // This could trigger a specific question in the ChatPanel
                    console.log("Asking about clause:", c.title);
                  }} 
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Chat */}
        <div className="lg:col-span-4 h-[800px]">
           <ChatPanel documentContext={data} language="English" />
        </div>
      </div>

      <ActionBar summary={data.overall_summary} onReload={onReset} />
    </div>
  );
};

export default ResultsPage;
