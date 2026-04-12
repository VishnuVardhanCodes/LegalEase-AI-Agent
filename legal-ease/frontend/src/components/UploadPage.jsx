import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Shield, Zap, X, Globe, ChevronDown, Check } from 'lucide-react';
import AgentWorkflow from './AgentWorkflow';
import { InnovativeFeatures, RealWorldImpact, TechStackSection, FooterConnect } from './LandingSections';

const UploadPage = ({ onAnalysisComplete }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Language Selection State
  const [language, setLanguage] = useState("English");
  const languages = ['English', 'Hindi', 'Telugu'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async (mockData = null) => {
    if (!selectedFile && !mockData) {
      return;
    }
    
    // Instead of analyzing here, we just pass control instantly to the dashboard
    if (mockData) {
      onAnalysisComplete({ data: mockData, file: null, language });
    } else {
      onAnalysisComplete({ data: null, file: selectedFile, language });
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      setShowUploadModal(false);
      handleAnalyze();
    }
  };

  return (
    <div className="landing-page" data-testid="landing-page">
      {/* Animated World Map Background */}
      <div className="world-map-container">
        <div className="hero-glow-orb" style={{ top: '-10%', left: '-10%' }}></div>
        <div className="hero-glow-orb" style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)', animationDelay: '-4s' }}></div>
        <div className="world-map-overlay"></div>
        <svg className="world-map" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
          {/* Animated connection lines */}
          <g className="connection-lines">
            <line x1="200" y1="150" x2="500" y2="200" className="animated-line" />
            <line x1="500" y1="200" x2="800" y2="180" className="animated-line line-delay-1" />
            <line x1="300" y1="300" x2="600" y2="350" className="animated-line line-delay-2" />
            <line x1="700" y1="250" x2="950" y2="280" className="animated-line line-delay-3" />
            <line x1="150" y1="400" x2="400" y2="420" className="animated-line line-delay-1" />
            <line x1="600" y1="400" x2="900" y2="380" className="animated-line line-delay-2" />
          </g>
          
          {/* Animated dots representing cities/nodes */}
          <g className="map-nodes">
            <circle cx="200" cy="150" r="4" className="node-pulse" />
            <circle cx="500" cy="200" r="4" className="node-pulse pulse-delay-1" />
            <circle cx="800" cy="180" r="4" className="node-pulse pulse-delay-2" />
            <circle cx="300" cy="300" r="4" className="node-pulse pulse-delay-3" />
            <circle cx="600" cy="350" r="4" className="node-pulse pulse-delay-1" />
            <circle cx="950" cy="280" r="4" className="node-pulse pulse-delay-2" />
            <circle cx="150" cy="400" r="4" className="node-pulse" />
            <circle cx="400" cy="420" r="4" className="node-pulse pulse-delay-3" />
            <circle cx="900" cy="380" r="4" className="node-pulse pulse-delay-1" />
          </g>

          {/* Simplified world map outline */}
          <g className="map-outline" opacity="0.15">
            {/* North America */}
            <path d="M150,120 L180,100 L220,110 L250,140 L230,180 L200,190 L170,170 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Europe */}
            <path d="M480,140 L520,130 L550,150 L540,180 L510,185 L485,170 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Asia */}
            <path d="M650,120 L750,110 L850,130 L880,160 L860,200 L800,210 L720,190 L680,170 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Africa */}
            <path d="M450,280 L500,270 L540,290 L550,340 L520,380 L480,390 L460,350 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* South America */}
            <path d="M280,340 L320,330 L350,360 L340,420 L310,450 L285,430 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Australia */}
            <path d="M850,380 L900,375 L930,400 L920,430 L880,435 L860,410 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* Main Content */}
      <div className="hero-container" data-testid="hero-section">
        <div className="hero-content">
          {/* Left Side - Text Content */}
          <div className="hero-left" data-testid="hero-text-section">
            <div className="brand-badge" data-testid="brand-badge">
              <Shield className="w-4 h-4" />
              <span>LEGALEASE AI</span>
              <span className="badge-separator">•</span>
              <span>PRODUCTION GRADE</span>
            </div>

            <h1 className="hero-title" data-testid="hero-title">
              <span className="title-line-1">Understand Legal</span>
              <span className="title-line-2">Documents</span>
              <span className="title-line-3">Before You Sign.</span>
            </h1>

            <p className="hero-description" data-testid="hero-description">
              Upload any legal agreement and get a plain-language summary instantly.
            </p>

            <p className="hero-subtext" data-testid="hero-subtext">
              Empowering you with AI-driven document intelligence.
            </p>

            <div className="cta-buttons" data-testid="cta-buttons">
              <button 
                className="btn-primary" 
                onClick={() => setShowUploadModal(true)}
                data-testid="upload-document-btn"
              >
                <Upload className="w-5 h-5" />
                Upload Document
              </button>
              <button className="btn-secondary" data-testid="learn-more-btn">
                <Zap className="w-5 h-5" />
                See How It Works
              </button>
              

            </div>

            {/* Feature Pills */}
            <div className="feature-pills" data-testid="feature-pills">
              <div className="pill">
                <FileText className="w-4 h-4" />
                <span>Rental Agreement</span>
              </div>
              <div className="pill">
                <FileText className="w-4 h-4" />
                <span>Job Offer</span>
              </div>
              <div className="pill">
                <FileText className="w-4 h-4" />
                <span>Loan Agreement</span>
              </div>
              <div className="pill">
                <FileText className="w-4 h-4" />
                <span>NDA</span>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Robot Scanner */}
          <div className="hero-right" data-testid="robot-section">
            <div className="robot-container">
              <svg className="robot-svg" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                <g className="robot-body">
                  <rect x="150" y="80" width="100" height="80" rx="10" className="robot-part robot-head" />
                  <circle cx="175" cy="110" r="8" className="robot-eye eye-left" />
                  <circle cx="225" cy="110" r="8" className="robot-eye eye-right" />
                  <line x1="200" y1="80" x2="200" y2="50" className="robot-antenna" />
                  <circle cx="200" cy="45" r="6" className="antenna-tip" />
                  <rect x="140" y="170" width="120" height="140" rx="15" className="robot-part robot-torso" />
                  <rect x="160" y="200" width="80" height="60" rx="5" className="chest-display" />
                  <rect x="100" y="180" width="30" height="100" rx="15" className="robot-part robot-arm-left" />
                  <rect x="270" y="180" width="30" height="100" rx="15" className="robot-part robot-arm-right" />
                  <circle cx="115" cy="290" r="15" className="robot-hand hand-left" />
                  <circle cx="285" cy="290" r="15" className="robot-hand hand-right" />
                  <rect x="155" y="320" width="35" height="100" rx="10" className="robot-part robot-leg-left" />
                  <rect x="210" y="320" width="35" height="100" rx="10" className="robot-part robot-leg-right" />
                  <ellipse cx="172" cy="430" rx="20" ry="10" className="robot-foot" />
                  <ellipse cx="227" cy="430" rx="20" ry="10" className="robot-foot" />
                </g>

                <g className="scanning-document">
                  <rect x="60" y="240" width="70" height="90" rx="5" className="document" />
                  <line x1="70" y1="255" x2="120" y2="255" className="doc-line" />
                  <line x1="70" y1="270" x2="120" y2="270" className="doc-line" />
                  <line x1="70" y1="285" x2="115" y2="285" className="doc-line" />
                  <line x1="70" y1="300" x2="120" y2="300" className="doc-line" />
                  <line x1="70" y1="315" x2="110" y2="315" className="doc-line" />
                  <rect x="55" y="240" width="80" height="3" className="scan-beam" />
                </g>

                <g className="data-particles">
                  <circle cx="150" cy="250" r="3" className="particle p1" />
                  <circle cx="160" cy="270" r="2" className="particle p2" />
                  <circle cx="145" cy="290" r="2.5" className="particle p3" />
                  <circle cx="155" cy="310" r="2" className="particle p4" />
                  <circle cx="150" cy="265" r="2" className="particle p5" />
                  <circle cx="158" cy="285" r="3" className="particle p6" />
                </g>

                <g className="analysis-circles">
                  <circle cx="200" cy="260" r="40" className="analysis-ring ring-1" />
                  <circle cx="200" cy="260" r="60" className="analysis-ring ring-2" />
                  <circle cx="200" cy="260" r="80" className="analysis-ring ring-3" />
                </g>
              </svg>

              <div className="status-indicators">
                <div className="status-card status-1" data-testid="status-analyzing">
                  <div className="status-icon">🔍</div>
                  <div className="status-text">Analyzing...</div>
                </div>
                <div className="status-card status-2" data-testid="status-extracting">
                  <div className="status-icon">📄</div>
                  <div className="status-text">Extracting Text</div>
                </div>
                <div className="status-card status-3" data-testid="status-processing">
                  <div className="status-text">⚡ AI Processing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Workflow Section - Kept as the transition between Hero and Details */}
      <div className="relative z-10 w-full mt-24">
         <AgentWorkflow />
      </div>

      <InnovativeFeatures />
      <RealWorldImpact />
      <TechStackSection />
      <FooterConnect />

      {/* --- Existing Upload Modal Code Below --- */}
      {showUploadModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowUploadModal(false)} 
          data-testid="upload-modal"
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close" 
              onClick={() => setShowUploadModal(false)}
              data-testid="modal-close-btn"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="modal-title">Upload Legal Document</h2>
            <p className="modal-description">
              Upload your legal document and get an AI-powered summary in plain language
            </p>

            <div className="upload-area" data-testid="file-upload-area">
              <input
                type="file"
                id="file-upload"
                className="file-input"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="upload-label">
                <Upload className="w-12 h-12 mb-4" />
                <span className="upload-text">
                  {selectedFile ? selectedFile.name : "Click to browse or drag and drop"}
                </span>
                <span className="upload-subtext">PDF, DOC, DOCX, TXT (Max 10MB)</span>
              </label>
            </div>

            {/* Language Selection inside Modal */}
            <div className="mt-6 mb-4">
              <label className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                Select Output Language
              </label>
              <div className="grid grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                      language === lang 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200 hover:border-white/20'
                    }`}
                  >
                    {language === lang && <Check className="w-4 h-4" />}
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="btn-upload" 
              onClick={handleUpload}
              disabled={!selectedFile}
              data-testid="confirm-upload-btn"
            >
              <Upload className="w-5 h-5" />
              Analyze Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
