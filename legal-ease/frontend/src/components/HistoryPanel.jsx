import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, ChevronRight, AlertCircle, CheckCircle2, AlertTriangle, Shield, Trash2 } from 'lucide-react';

const HistoryPanel = ({ history, onSelect, onDelete }) => {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-[#1E293B]/20 rounded-[3rem] border border-dashed border-white/5">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10 opacity-30">
          <Clock className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">No Vault History</h3>
        <p className="text-slate-500 font-medium max-w-sm mx-auto">
          Your analyzed document records will appear here for secure architectural lookup.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
            <Clock className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Audit Trail</h3>
            <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Secure Architectural Vault</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-white/5 rounded-lg text-slate-500 text-[10px] font-black uppercase tracking-widest border border-white/5">
          {history.length} Entities
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative"
          >
            <div 
              onClick={() => onSelect(item)}
              className="cursor-pointer bg-[#1E293B]/40 hover:bg-[#1E293B]/60 border border-white/5 hover:border-indigo-500/30 rounded-[2.5rem] p-8 transition-all relative overflow-hidden h-full shadow-xl hover:shadow-indigo-500/10"
            >
              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex flex-col h-full space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                      <FileText className="h-6 w-6 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{item.document_type || 'Legal Document'}</h4>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="20" strokeWidth="3" fill="transparent" className="text-white/5 stroke-current" />
                            <circle cx="24" cy="24" r="20" strokeWidth="3" fill="transparent" strokeDasharray="125.6" strokeDashoffset={125.6 - (item.trust_score / 100) * 125.6} className="text-indigo-500 stroke-current" strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{item.trust_score}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Safe', count: item.risk_summary?.safe || 0, color: 'text-emerald-400', icon: <CheckCircle2 size={10} /> },
                    { label: 'Caution', count: item.risk_summary?.caution || 0, color: 'text-amber-400', icon: <AlertTriangle size={10} /> },
                    { label: 'Risky', count: item.risk_summary?.risky || 0, color: 'text-red-400', icon: <AlertCircle size={10} /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/20 rounded-2xl p-3 border border-white/5 flex flex-col items-center gap-1">
                      <span className={`text-[10px] font-black uppercase ${stat.color} flex items-center gap-1`}>
                        {stat.icon} {stat.label}
                      </span>
                      <span className="text-xl font-black text-white">{stat.count}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                    <Shield className="h-3 w-3 text-emerald-500" /> Verified Analysis
                  </span>
                  <div className="flex items-center gap-3">
                     <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(idx); }}
                        className="p-2 rounded-xl bg-red-500/0 hover:bg-red-500/10 text-slate-600 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all"
                        title="Delete from Vault"
                     >
                       <Trash2 size={16} />
                     </button>
                     <ChevronRight className="h-5 w-5 text-slate-700 group-hover:text-indigo-400 transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
