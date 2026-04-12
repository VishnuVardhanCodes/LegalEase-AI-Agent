import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, ShieldCheck, Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeDocument } from '../api';

const UploadSection = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(10);

    try {
      setUploadProgress(30);
      const data = await analyzeDocument(selectedFile);
      setUploadProgress(80);
      setUploadProgress(100);
      
      setTimeout(() => {
        onUploadSuccess(data);
        setIsUploading(false);
      }, 800);

    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      onUploadSuccess({ error: error.message || 'Analysis failed', details: error.toString() });
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-4">
          <Sparkles className="h-3 w-3" /> AI Legal Intelligence
        </div>
        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
          Analyze Documents with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Expert Precision.</span>
        </h1>
        <p className="text-slate-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
          Upload any legal PDF and our agentic engine will extract, simplify, and audit every clause for total transparency.
        </p>
      </motion.div>

      <div 
        {...getRootProps()} 
        className={`relative group cursor-pointer overflow-hidden rounded-[2.5rem] border-2 border-dashed transition-all duration-500 p-16
          ${isDragActive ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_0_50px_rgba(99,102,241,0.1)]' : 'border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-white/10'}
          ${isUploading ? 'pointer-events-none opacity-80' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-8 relative z-10">
          {!isUploading ? (
            <>
              <div className="bg-indigo-600 p-6 rounded-3xl shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-transform duration-500">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-2xl font-black text-white">
                  {isDragActive ? 'Release to Begin Audit' : 'Drop Legal PDF Here'}
                </p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                  Secure processing • Local extraction • GPT-4o Class Intelligence
                </p>
              </div>
              <div className="pt-4">
                <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-slate-300 uppercase tracking-widest group-hover:bg-white/10 transition-all">
                  Browse Files
                </button>
              </div>
            </>
          ) : (
            <div className="w-full max-w-sm space-y-10">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center overflow-hidden">
                    <FileText className="h-12 w-12 text-indigo-400" />
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-green-500 p-2 rounded-2xl text-white border-4 border-[#0F172A] shadow-xl"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </motion.div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-black text-white italic">Processing "{file?.name}"</p>
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] animate-pulse">Running Neural Audit Engine...</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                  <span>Extracting Logic</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="bg-indigo-500 h-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-10">
        {[
          { icon: <ShieldCheck />, label: 'Standard Privacy' },
          { icon: <Shield />, label: 'Agentic Workflow' },
          { icon: <Sparkles />, label: 'Direct Insights' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <div className="text-green-500 h-4 w-4">{item.icon}</div>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadSection;
