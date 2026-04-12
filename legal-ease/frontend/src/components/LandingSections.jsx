import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Activity, AlertTriangle, Globe, Building, Briefcase, FileSignature, Home, Zap, Shield, Search } from 'lucide-react';
import { FaReact, FaPython, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiFastapi, SiGithub, SiVercel, SiRender } from 'react-icons/si';
import LogoLoop from './LogoLoop';

// Animation variants for floating from left to right (Workflow steps/features)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariantsLeftToRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const InnovativeFeatures = () => {
  const features = [
    {
      title: "Clause Intelligence Engine ",
      icon: <Handshake className="w-8 h-8 text-blue-400" />,
      description: "Suggests safer alternatives for risky clauses so users know what to ",
      borderColor: "border-blue-500/30",
      bgGradient: "from-blue-500/10 to-transparent"
    },
    {
      title: "Trust Score Risk Engine",
      icon: <Activity className="w-8 h-8 text-emerald-400" />,
      description: "Gives a risk score to the document.",
      borderColor: "border-emerald-500/30",
      bgGradient: "from-emerald-500/10 to-transparent"
    },
    {
      title: "Interactive Legal Assistant",
      icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
      description: "Ask questions about the document and get instant answers.",
      borderColor: "border-red-500/30",
      bgGradient: "from-red-500/10 to-transparent"
    },
    {
      title: "Multilingual AI",
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      description: "Explains legal documents in English, Hindi, and Telugu.",
      borderColor: "border-cyan-500/30",
      bgGradient: "from-cyan-500/10 to-transparent"
    }
  ];

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Innovative Features That Make LegalEase Unique
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 font-medium"
          >
            Beyond simple document analysis.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariantsLeftToRight}
              whileHover={{ scale: 1.05 }}
              className={`p-8 rounded-2xl bg-[#0c0c16]/80 backdrop-blur-sm border ${f.borderColor} hover:shadow-[0_0_30px_rgba(74,158,255,0.1)] transition-all duration-300 relative overflow-hidden group`}
            >
              <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${f.bgGradient} opacity-50 pointer-events-none`} />
              <div className="relative z-10 flex flex-col gap-5">
                <div className="p-3 bg-white/5 rounded-xl w-fit border border-white/10">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">{f.title}</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const RealWorldImpact = () => {
  const useCases = [
    {
      title: "Tenant",
      icon: <Home className="w-5 h-5" />,
      example: "A tenant avoided sudden eviction after identifying a risky termination clause."
    },
    {
      title: "Job Seeker",
      icon: <Briefcase className="w-5 h-5" />,
      example: "A candidate negotiated a better non-compete limit before signing their tech contract."
    },
    {
      title: "Business Owner",
      icon: <Building className="w-5 h-5" />,
      example: "A startup founder spotted toxic IP ownership clauses in an early client NDA."
    },
    {
      title: "Loan Applicant",
      icon: <FileSignature className="w-5 h-5" />,
      example: "A borrower caught hidden compound interest penalties hidden in fine print."
    }
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-gradient-to-b from-transparent to-[#0a0a0f]/80">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
          >
            Designed for Real People
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 font-medium"
          >
            Helping users avoid risky legal mistakes.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {useCases.map((u, i) => (
            <motion.div
              key={i}
              variants={itemVariantsLeftToRight}
              whileHover={{ y: -10 }}
              className="p-6 rounded-xl bg-gradient-to-b from-[#1a1a2e] to-[#0c0c16] border border-slate-700/50 hover:border-emerald-500/50 transition-all flex flex-col gap-4 group hover:shadow-[0_10px_40px_rgba(16,185,129,0.15)]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  {u.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{u.title}</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-emerald-500/30 pl-3 py-1 group-hover:border-emerald-400">
                "{u.example}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const TechStackSection = () => {
  const techLogos = [
    { node: <FaReact className="text-cyan-400 text-6xl hover:scale-125 transition-transform" />, title: "React", ariaLabel: "React" },
    { node: <SiTailwindcss className="text-teal-400 text-6xl hover:scale-125 transition-transform" />, title: "Tailwind CSS", ariaLabel: "Tailwind CSS" },
    { node: <SiVite className="text-purple-400 text-6xl hover:scale-125 transition-transform" />, title: "Vite", ariaLabel: "Vite" },
    { node: <FaPython className="text-yellow-400 text-6xl hover:scale-125 transition-transform" />, title: "Python", ariaLabel: "Python" },
    { node: <SiFastapi className="text-green-400 text-6xl hover:scale-125 transition-transform" />, title: "FastAPI", ariaLabel: "FastAPI" },
    { node: <div className="text-orange-400 text-5xl font-black tracking-tighter hover:scale-125 transition-transform bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-xl">GQ</div>, title: "Groq", ariaLabel: "Groq API" },
    { node: <div className="text-blue-400 text-5xl font-black tracking-tighter hover:scale-125 transition-transform bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-xl">GM</div>, title: "Gemini", ariaLabel: "Gemini API" },
    { node: <div className="text-indigo-400 text-5xl font-black tracking-tighter hover:scale-125 transition-transform bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-xl">SV</div>, title: "Supervity", ariaLabel: "Supervity Agents" },
    { node: <SiGithub className="text-gray-300 text-6xl hover:scale-125 transition-transform" />, title: "GitHub", ariaLabel: "GitHub" },
    { node: <SiVercel className="text-white text-6xl hover:scale-125 transition-transform" />, title: "Vercel", ariaLabel: "Vercel" },
    { node: <SiRender className="text-emerald-400 text-6xl hover:scale-125 transition-transform" />, title: "Render", ariaLabel: "Render" }
  ];

  return (
    <section className="tech-stack-section relative py-20 px-6 overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#050508] border-y border-white/5" data-testid="tech-stack-section">
      {/* Glowing Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4a9eff] to-cyan-400 mb-6 tracking-tight drop-shadow-sm" data-testid="tech-stack-title"
          >
            Our Technology Stack
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg" data-testid="tech-stack-subtitle"
          >
            Built with modern, scalable, and reliable technologies.
          </motion.p>
        </div>

        {/* Continuous Looping Logo Components Container */}
        <div className="relative w-full overflow-hidden mx-auto py-10 flex border-y border-white/5 bg-black/20" style={{ height: '200px' }}>
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={70}
            gap={100}
            hoverSpeed={10}
            fadeOut={true}
            fadeOutColor="#0a0a0f"
            ariaLabel="Technology stack logos"
          />
        </div>
      </div>
    </section>
  );
};

export const FooterConnect = () => {
  return (
    <footer className="bg-[#050508] border-t border-white/5 py-24 relative overflow-hidden z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4a9eff] to-cyan-400 mb-6 tracking-tight drop-shadow-sm">Connect With Us</h2>
          <p className="text-slate-400">Have questions or want to collaborate? Reach out.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Follow Us */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8 tracking-wide">Follow Us</h3>

            <a href="https://www.linkedin.com/in/polla-vishnu-vardhan/" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#4a9eff]/10 hover:border-[#4a9eff]/30 hover:text-[#4a9eff] text-slate-300 transition-all font-medium group">
              <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>

            <a href="https://github.com/VishnuVardhanCodes" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#4a9eff]/10 hover:border-[#4a9eff]/30 hover:text-[#4a9eff] text-slate-300 transition-all font-medium group">
              <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>

            <a href="vishnumaxpolla32@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#4a9eff]/10 hover:border-[#4a9eff]/30 hover:text-[#4a9eff] text-slate-300 transition-all font-medium group">
              <FaEnvelope className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Email Us</span>
            </a>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8 tracking-wide">Send Us a Message</h3>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#4a9eff]/50 focus:bg-[#4a9eff]/5 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#4a9eff]/50 focus:bg-[#4a9eff]/5 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#4a9eff]/50 focus:bg-[#4a9eff]/5 text-white outline-none transition-all placeholder:text-slate-600 font-medium resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-lg shadow-indigo-600/20"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
            © 2026 LegalEase AI <span className="text-[#4a9eff] mx-2 px-2 border-x border-white/10">—</span> Built for safer legal decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};
export const WorkflowSection = () => {
  const steps = [
    { title: "INGEST", desc: "Secure PDF upload to isolated cloud vault.", icon: <Zap className="w-6 h-6" />, color: "from-orange-500 to-red-500", shadow: "shadow-orange-500/20" },
    { title: "STRUCTURAL PARSE", desc: "AI detects clauses, headers, and parties.", icon: <Search className="w-6 h-6" />, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" },
    { title: "RISK SCANNING", icon: <Shield className="w-6 h-6" />, desc: "Agent identifies 50+ legal red flags.", color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
    { title: "SIMPLIFICATION", desc: "Legalese translated to plain human language.", icon: <FileSignature className="w-6 h-6" />, color: "from-cyan-500 to-blue-500", shadow: "shadow-cyan-500/20" },
    { title: "TRUST SCORING", desc: "Safety metrics and risk ratings calculated.", icon: <Activity className="w-6 h-6" />, color: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/20" },
    { title: "CONSULTATION", desc: "Interactive AI follow-up for deep clarity.", icon: <Handshake className="w-6 h-6" />, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#050508]/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-white"
          >
            How Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Doc Intelligence</span> Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            A multi-stage agentic workflow designed to turn complex legal text into actionable clarity.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Connecting S-Curve Path */}
          <svg className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 hidden lg:block opacity-20" viewBox="0 0 1200 100" fill="none">
            <motion.path
              d="M0,50 C100,50 200,10 300,10 C400,10 500,90 600,90 C700,90 800,10 900,10 C1000,10 1100,50 1200,50"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="10 10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-6 shadow-2xl ${step.shadow} group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full bg-[#0F172A] rounded-2xl flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xs font-black text-white tracking-widest mb-2 uppercase">{step.title}</h3>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed px-2 transition-colors group-hover:text-slate-300">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
