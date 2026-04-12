import React from 'react';
import { FileText } from 'lucide-react';

const SummaryCard = ({ docType, summary }) => {
  return (
    <div className="glass-card bg-[#0c0c12]/90 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-indigo-400" size={24} />
          <h3 className="text-white font-bold tracking-widest text-sm uppercase">Document Summary</h3>
        </div>
        
        <div className="mb-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Document Type</span>
          <p className="text-lg font-black text-indigo-300 mt-1">{docType}</p>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Summary Advice</span>
          <p className="text-sm text-slate-300 font-medium italic mt-2 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
            "{summary}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
