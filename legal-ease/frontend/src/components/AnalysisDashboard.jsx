import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ChevronRight, CheckCircle, Loader2, ArrowLeft, 
  MessageCircle, Globe, Shield, Activity, FileText
} from 'lucide-react';
import { analyzeDocument } from '../api';
import TrustScoreCard from './TrustScoreCard';
import ChatPanel from './ChatPanel';

// Format timestamps
const formatTime = () => {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
};

const AnalysisDashboard = ({ initialData, initialFile, onReset }) => {
  const [data, setData] = useState(initialData);
  const [file, setFile] = useState(initialFile);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [expandedStep, setExpandedStep] = useState(null);
  const [startTime] = useState(formatTime());

  // Wait for data if not present
  useEffect(() => {
    if (!initialData && file) {
      analyzeDocument(file, "EN").then(res => setData(res)).catch(console.error);
    }
  }, [file]);

  // Advance timeline every 1.5 seconds if data is available
  useEffect(() => {
    if (data && currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data, currentStepIndex]);

  const steps = [
    {
      id: 0,
      title: "Workflow Execution Started",
      desc: "Initializes the AI agent pipeline for document processing.",
      component: () => <div className="p-4 text-sm text-slate-600">Workflow initialized securely.</div>
    },
    {
      id: 1,
      title: "Extract Text from PDF",
      desc: "Extracts all text from the uploaded PDF document exactly as written, preserving its structure and clauses.",
      component: () => (
        <div className="p-4 text-sm text-slate-600 bg-slate-50 border-t border-slate-100">
          <strong>Extracted Text Length: </strong> {data?.clauses ? data.clauses.reduce((acc, c) => acc + c.original_text.length, 0) : 0} characters.
        </div>
      )
    },
    {
      id: 2,
      title: "Comprehensive AI Analysis",
      desc: "Analyzes the extracted text to detect document type, assess risks, calculate a trust score, and provide plain language explanations.",
      component: () => (
        <div className="p-8 bg-white border-t border-slate-100 flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="flex flex-col items-center p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Overall Trust Score</span>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="50" strokeWidth="8" fill="transparent" className="text-slate-100 stroke-current" />
                  <circle cx="64" cy="64" r="50" strokeWidth="8" fill="transparent" strokeDasharray="314" strokeDashoffset={314 - (data?.trust_score / 100) * 314} className="text-emerald-500 stroke-current" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black text-slate-800">{data?.trust_score}%</span>
                </div>
              </div>
              <span className="mt-4 text-xs font-bold text-slate-600">Standard Compliance Rating</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Classification</span>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-sm">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                MODERATE RISK
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white">Analysis Markers</span>
              {data?.clauses?.slice(0,2).map((c, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-700">
                  <Activity size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                  <p>{c.risk_reason}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-2/3 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-indigo-100 bg-indigo-50/50">
               <div className="flex items-center gap-2 mb-4 text-indigo-700 font-bold">
                 <Shield size={18} />
                 <span>What does this mean for you?</span>
               </div>
               <p className="text-sm text-slate-700 leading-relaxed italic">{data?.overall_summary}</p>
            </div>
            <div className="p-6">
               <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
                 <FileText size={18} />
                 <span>Document Executive Summary</span>
               </div>
               <p className="text-sm text-slate-600 leading-relaxed">
                 This is a {data?.document_type} consisting of {data?.risk_summary?.safe} safe clauses, {data?.risk_summary?.caution} cautionary clauses, and {data?.risk_summary?.risky} risky clauses. The agent algorithm has executed a complete fidelity review resulting in a final trust score of {data?.trust_score}/100.
               </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Clause Extraction",
      desc: "Extracts original text into logical clauses, assigning numbers, titles, and categorizing them based on legal topics.",
      component: () => (
        <div className="p-6 text-sm text-slate-600 border-t border-slate-100">
          <div className="space-y-4">
            {data?.clauses?.map((c, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl bg-white">
                <span className="font-bold text-slate-800">#{c.clause_number} {c.title}</span>
                <p className="mt-2 text-slate-600 bg-slate-50 p-3 rounded-lg text-xs font-mono">{c.original_text}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Detailed Risk Analysis",
      desc: "Analyzes each extracted clause to assign a risk level, calculate a risk score, and provide a brief explanation.",
      component: () => (
        <div className="p-6 border-t border-slate-100 grid grid-cols-3 gap-4">
           {data?.clauses?.map((c, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl bg-white flex flex-col gap-2 shadow-sm">
                <span className="font-bold text-slate-800 text-xs">#{c.clause_number}</span>
                <span className={`px-2 py-1 rounded inline-block w-max text-[10px] font-bold uppercase ${c.risk_level==='SAFE'?'bg-emerald-100 text-emerald-700':c.risk_level==='CAUTION'?'bg-amber-100 text-amber-700':'bg-red-100 text-red-700'}`}>
                  {c.risk_level}
                </span>
                <p className="text-xs text-slate-600 mt-2">{c.risk_reason}</p>
              </div>
           ))}
        </div>
      )
    },
    {
      id: 5,
      title: "Plain Language Explanation",
      desc: "Converts complex legal jargon into simple, 10th-grade level English.",
      component: () => (
        <div className="p-6 border-t border-slate-100 space-y-4">
           {data?.clauses?.map((c, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col gap-2">
                <span className="font-bold text-slate-800">#{c.clause_number} {c.title}</span>
                <p className="text-sm text-indigo-700 italic font-medium">{c.plain_english}</p>
              </div>
           ))}
        </div>
      )
    },
    {
      id: 6,
      title: "Multilingual Legal Translation",
      desc: "Translates the simplified explanations and risk suggestions into the selected target language.",
      component: () => (
        <div className="border-t border-slate-100">
           <div className="bg-[#4F46E5] p-8 text-white">
             <span className="text-[10px] font-black tracking-[0.2em] opacity-80 uppercase mb-2 block">Multilingual Module</span>
             <h2 className="text-3xl font-light mb-1">Local Language Translation</h2>
             <p className="opacity-80 font-medium">The analysis has been localized for better clarity.</p>
           </div>
           <div className="p-0 bg-white">
             {data?.clauses?.map((c, i) => (
               <div key={i} className="flex flex-col md:flex-row border-b border-slate-100 p-6">
                 <div className="md:w-1/3 pr-6 mb-4 md:mb-0">
                    <span className="font-bold text-slate-800 text-sm">#{c.clause_number} {c.title}</span>
                    <br/><br/>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded border border-emerald-100">{c.risk_level}</span>
                 </div>
                 <div className="md:w-2/3 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Explanation</span>
                      <p className="text-sm text-slate-700 font-medium">{c.plain_english}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Risk Insight</span>
                      <p className="text-sm text-slate-500 italic">{c.risk_reason}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Follow-up Question Support",
      desc: "Prompts the user to ask any follow-up questions about the document through an AI Agent.",
      component: () => (
        <div className="p-6 border-t border-slate-100">
          <div className="h-[600px] border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
            <ChatPanel documentContext={data} language="EN" />
          </div>
        </div>
      )
    }
  ];

  const handleToggle = (id) => {
    if (expandedStep === id) setExpandedStep(null);
    else setExpandedStep(id);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans p-4 md:p-8">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
          <Activity size={24} className="text-indigo-600" /> Activity Timeline
        </h1>
        <button onClick={onReset} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} /> Exit full page
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-8">
           
           {steps.map((step, index) => {
             const status = index < currentStepIndex ? 'completed' : index === currentStepIndex ? 'running' : 'pending';
             const isClickable = status === 'completed';
             
             return (
               <div key={step.id} className="relative pl-8">
                 
                 {/* Timeline Node */}
                 <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center transition-colors duration-500 ${status === 'completed' ? 'bg-emerald-500' : status === 'running' ? 'bg-indigo-500 outline outline-4 outline-indigo-100' : 'bg-slate-300'}`}>
                   {status === 'running' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                 </div>

                 {/* Content Wrapper */}
                 <div className="w-full">
                    <div className="flex flex-col mb-3 opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className={`font-bold text-[15px] ${status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>{step.title}</h2>
                        {status === 'completed' && <span className="px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">Completed</span>}
                        {status === 'running' && <span className="px-2 py-0.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> Running</span>}
                      </div>
                      <p className={`text-xs ${status === 'pending' ? 'text-slate-400' : 'text-slate-500'} mb-2`}>{step.desc}</p>
                      
                      {status !== 'pending' && (
                        <div className="text-[10px] font-medium text-slate-400 mt-1">
                          Started at: {startTime}
                          {status === 'completed' && <><br/>Completed at: {startTime}</>}
                        </div>
                      )}
                    </div>

                    {/* Accordion Button */}
                    <button 
                      disabled={!isClickable}
                      onClick={() => handleToggle(step.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${isClickable ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer text-slate-700' : 'bg-slate-50/50 border-slate-100 text-slate-400 cursor-not-allowed opacity-60'}`}
                    >
                      <span className="font-bold text-xs uppercase tracking-widest pl-2">Outputs</span>
                      {expandedStep === step.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {expandedStep === step.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-2 border border-slate-200 rounded-xl shadow-lg bg-white z-10 relative"
                        >
                          <step.component />
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               </div>
             );
           })}

        </div>

      </div>
    </div>
  );
};

export default AnalysisDashboard;
