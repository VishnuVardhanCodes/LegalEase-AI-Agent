import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Volume2, Check, MessageCircle } from 'lucide-react';

const ExportPanel = ({ summary }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Check out this LegalEase AI summary: ${summary}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleVoiceReadout = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(summary);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert("Speech synthesis not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-500 text-white text-xs font-bold shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:bg-indigo-600 transition-all"
      >
        {isDownloading ? <Check size={16} /> : <Download size={16} />}
        {isDownloading ? "SAVED" : "DOWNLOAD PDF"}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsApp}
        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#25D366] text-white text-xs font-bold shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:opacity-90 transition-all"
      >
        <MessageCircle size={16} />
        WHATSAPP SHARE
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleVoiceReadout}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl border text-xs font-bold transition-all ${isSpeaking ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
      >
        <Volume2 size={16} className={isSpeaking ? 'animate-pulse' : ''} />
        {isSpeaking ? "STOP READING" : "VOICE READOUT"}
      </motion.button>
    </div>
  );
};

export default ExportPanel;
