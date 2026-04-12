import React, { useState, useEffect } from 'react';
import TrustScoreGauge from '../components/TrustScoreGauge';
import RiskSummaryCards from '../components/RiskSummaryCards';
import ClauseCard from '../components/ClauseCard';
import ExecutiveSummary from '../components/ExecutiveSummary';
import ChatAssistant from '../components/ChatAssistant';
import UploadSection from '../components/UploadSection';
import HistoryPanel from '../components/HistoryPanel';
import { FileText, LayoutDashboard, History, Settings, LogOut, ChevronRight, AlertCircle, Shield, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Load history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('legalEaseHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleUploadSuccess = (data) => {
    // Add to history
    const historyItem = {
      ...data,
      timestamp: new Date().toLocaleString(),
      id: Date.now()
    };
    
    const newHistory = [historyItem, ...history].slice(0, 20); // Keep last 20
    setHistory(newHistory);
    localStorage.setItem('legalEaseHistory', JSON.stringify(newHistory));
    
    setAnalysisResult(data);
    setActiveTab('dashboard');
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setActiveTab('dashboard');
  };

  const handleDeleteHistory = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    localStorage.setItem('legalEaseHistory', JSON.stringify(newHistory));
  };

  const handleSelectHistory = (item) => {
    setAnalysisResult(item);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    navigate('/', { replace: true });
  };

  const shareOnWhatsApp = () => {
    if (!analysisResult) return;
    
    const text = `🔍 *LegalEase AI Analysis Report*\n\n` +
      `📄 *Document:* ${analysisResult.document_type || 'Legal Document'}\n` +
      `🎯 *Trust Score:* ${analysisResult.trust_score}%\n` +
      `⚠️ *Risk Summary:* ${analysisResult.risk_summary?.safe} Safe, ${analysisResult.risk_summary?.caution} Caution, ${analysisResult.risk_summary?.risky} Risky\n\n` +
      `💡 *Summary:* ${analysisResult.executive_summary?.slice(0, 150)}...\n\n` +
      `Analyzed with LegalEase AI ✨`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex font-['Inter',sans-serif] text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B]/50 backdrop-blur-xl border-r border-white/5 flex-col hidden md:flex">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="text-white h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">LegalEase <span className="text-indigo-400">AI</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
            { id: 'history', label: 'History', icon: <History className="h-5 w-5" /> },
            { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
            <span>Pages</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-bold capitalize tracking-wide">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-white">Vishnu Vardhan</span>
              <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">Premium Plan</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px] shadow-lg shadow-indigo-500/10 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-full h-full rounded-[10px] bg-slate-900 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver" alt="User Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'history' ? (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <HistoryPanel 
                  history={history} 
                  onSelect={handleSelectHistory} 
                  onDelete={handleDeleteHistory}
                />
              </motion.div>
            ) : !analysisResult ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-[#1E293B]/40 border border-white/10 rounded-[2.5rem] p-12 overflow-hidden relative shadow-2xl backdrop-blur-sm">
                   <div className="absolute -top-24 -right-24 p-12 opacity-10 pointer-events-none">
                     <Shield className="w-96 h-96 text-indigo-500" />
                   </div>
                   <UploadSection onUploadSuccess={handleUploadSuccess} />
                </div>
              </motion.div>
            ) : analysisResult.error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1E293B]/40 border border-red-500/20 rounded-[2.5rem] p-16 text-center backdrop-blur-sm"
              >
                <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/5 border border-red-500/20">
                  <AlertCircle className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Analysis Interrupted</h3>
                <p className="text-slate-400 mb-12 max-w-md mx-auto font-medium text-lg leading-relaxed">
                  {analysisResult.details || "We encountered an unexpected issue while analyzing your document."}
                </p>
                <button 
                  onClick={handleReset}
                  className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-indigo-500/40 hover:bg-indigo-500 transition-all hover:-translate-y-1 active:scale-95 text-lg"
                >
                  Try Another Document
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10 pb-20"
              >
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 mb-4">
                       <span className="px-5 py-2 bg-indigo-500/20 text-indigo-400 rounded-2xl text-xs font-black tracking-[0.2em] uppercase border border-indigo-500/30">
                         🏠 {analysisResult?.document_type || 'Legal Document'}
                       </span>
                       <div className="flex items-center gap-2">
                         <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                         <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Analysis Live</span>
                       </div>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tight">Legal <span className="text-indigo-500">Intelligence</span> Report</h2>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={shareOnWhatsApp}
                      className="group px-6 py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-2xl text-sm font-black shadow-xl hover:bg-[#25D366]/20 transition-all flex items-center gap-3"
                    >
                      <Share2 className="w-5 h-5" />
                      Share to WhatsApp
                    </button>
                    
                    <button 
                      onClick={handleReset}
                      className="group px-8 py-4 bg-[#1E293B] text-white border border-white/10 rounded-2xl text-sm font-black shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3"
                    >
                      Analyze New Document
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-8 space-y-10">
                    <div className="bg-[#1E293B]/40 rounded-[2.5rem] border border-white/5 shadow-2xl p-10 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                        <TrustScoreGauge score={analysisResult?.trust_score || 0} />
                        <div className="space-y-6">
                           <h3 className="text-2xl font-black text-white mb-6">Risk Architecture</h3>
                           <RiskSummaryCards 
                             summary={analysisResult?.risk_summary || {}} 
                             clauses={analysisResult?.clauses || []} 
                           />
                        </div>
                      </div>
                    </div>

                    <ExecutiveSummary summary={analysisResult?.executive_summary} />

                    <div className="space-y-6">
                      <div className="flex items-center justify-between px-2">
                        <h3 className="text-2xl font-black text-white flex items-center gap-3">
                          Critical Clauses 
                          <span className="px-3 py-1 bg-white/5 rounded-lg text-slate-400 text-xs font-black">
                            {analysisResult?.clauses?.length || 0}
                          </span>
                        </h3>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sorted by Risk Priority</div>
                      </div>
                      
                      <div className="space-y-6">
                        {(analysisResult?.clauses || []).map((clause, idx) => (
                          <ClauseCard key={idx} clause={clause} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 sticky top-28 h-fit">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative">
                        <ChatAssistant documentContext={analysisResult || {}} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
