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
        className="text-center mb-20 space-y-6"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-md shadow-xl">
          <Sparkles className="h-4 w-4 animate-pulse" /> Agentic Neural Analysis
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-white px-2 tracking-tighter leading-[1.1]">
          Analyze Documents <br/>
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_10px_30px_rgba(99,102,241,0.4)]">
              with Expert Precision.
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-indigo-500/20 blur-[8px] rounded-full"></div>
          </span>
        </h1>
        <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto leading-relaxed tracking-tight">
          Upload any legal PDF and our <span className="text-slate-300">agentic intelligence</span> will extract, simplify, and audit every clause for <span className="text-indigo-400/80 italic">total legal transparency.</span>
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
