"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, Lock, ArrowRight, Activity, TrendingUp, AlertTriangle, 
  Terminal, Server, Code, Smartphone, Wifi, Cpu, Layers, Database 
} from "lucide-react";

// Realistic-sounding "hacker" logs
const REALISTIC_LOGS = [
  "[init] Resolving DNS for target host...",
  "[net] Handshaking with SSL certificate (TLS 1.3)...",
  "[http] GET / index.html (Status: 200 OK, 45ms)",
  "[parser] Parsing DOM tree (1,240 nodes found)...",
  "[seo] Analyzing <meta> tags for Open Graph compliance...",
  "[audit] Checking contrast ratios on button elements...",
  "[js] Hydrating React components...",
  "[warn] Found 3 render-blocking scripts in <head>",
  "[perf] LCP (Largest Contentful Paint): 2.4s (Needs Improvement)",
  "[security] Scanning for exposed API keys in bundle.js...",
  "[mobile] Simulating iPhone 14 Pro viewport (393x852)...",
  "[a11y] Checking ARIA labels on interactive elements...",
  "[done] Generating optimization report..."
];

const AnalysisDemoModal = ({ isOpen, onClose, url }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [logs, setLogs] = useState([]);
  
  // Fake telemetry state
  const [requests, setRequests] = useState(0);
  const [latency, setLatency] = useState(12);
  const [domNodes, setDomNodes] = useState(0);

  // Clean the URL for display
  const displayUrl = url ? url.replace(/(^\w+:|^)\/\//, '').replace('www.', '') : "website.com";
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Reset State
      setIsFinished(false);
      setLogs([]);
      setRequests(0);
      setLatency(12);
      setDomNodes(0);
      
      let logIndex = 0;

      // 1. FAST LOG GENERATOR
      const logInterval = setInterval(() => {
        if (logIndex >= REALISTIC_LOGS.length) {
          clearInterval(logInterval);
          setTimeout(() => setIsFinished(true), 800);
          return;
        }
        setLogs(prev => [...prev, REALISTIC_LOGS[logIndex]]);
        
        // Auto-scroll logs
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
        
        logIndex++;
      }, 300); // Speed of logs

      // 2. FAKE METRICS GENERATOR
      const metricsInterval = setInterval(() => {
        setRequests(prev => prev + Math.floor(Math.random() * 3));
        setLatency(prev => 10 + Math.floor(Math.random() * 40));
        setDomNodes(prev => prev + Math.floor(Math.random() * 50));
      }, 100);

      return () => {
        clearInterval(logInterval);
        clearInterval(metricsInterval);
      };
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white dark:bg-[#0B1120] border-slate-200 dark:border-slate-800 gap-0 shadow-2xl">
        
        {/* HEADER: Browser-style bar */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] flex justify-between items-center">
            <div className="flex items-center gap-3 w-full">
                {/* Traffic Lights */}
                <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                
                {/* URL Bar */}
                <div className="flex-1 max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md py-1 px-3 flex items-center gap-2 mx-auto">
                    {!isFinished ? <Activity className="w-3 h-3 text-brand-500 animate-pulse" /> : <Lock className="w-3 h-3 text-green-500" />}
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate">
                        https://{displayUrl}/analyze
                    </span>
                </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
                 <div className="px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20 text-[10px] font-bold text-brand-500 uppercase tracking-wider">
                    {isFinished ? "REPORT READY" : "SCANNING"}
                 </div>
            </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="min-h-[500px] flex flex-col relative font-sans">
            
            {!isFinished ? (
                // PHASE 1: THE HACKER SCANNER
                <div className="flex-1 flex flex-col p-6 bg-slate-50 dark:bg-[#0B1120]">
                    
                    {/* Top: Live Telemetry Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <TelemetryCard icon={<Wifi className="w-4 h-4 text-blue-500"/>} label="Latency" value={`${latency}ms`} />
                        <TelemetryCard icon={<ArrowRight className="w-4 h-4 text-green-500"/>} label="Requests" value={requests} />
                        <TelemetryCard icon={<Code className="w-4 h-4 text-purple-500"/>} label="DOM Nodes" value={domNodes} />
                        <TelemetryCard icon={<Cpu className="w-4 h-4 text-orange-500"/>} label="CPU Load" value="14%" />
                    </div>

                    {/* Center: The Radar & Status */}
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] relative">
                         {/* Spinning Radar Layers */}
                         <div className="absolute w-64 h-64 rounded-full border border-brand-500/10 animate-[spin_8s_linear_infinite]" />
                         <div className="absolute w-48 h-48 rounded-full border border-brand-500/20 animate-[spin_4s_linear_infinite_reverse]" />
                         <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute inset-0 bg-brand-500/10 rounded-full animate-ping" />
                            <div className="bg-white dark:bg-slate-900 rounded-full p-4 border border-brand-500/30 shadow-2xl shadow-brand-500/20 z-10">
                                <Server className="w-10 h-10 text-brand-600 dark:text-brand-400" />
                            </div>
                         </div>
                         <p className="mt-8 text-sm font-mono text-slate-500 animate-pulse">
                            Extracting website DNA...
                         </p>
                    </div>

                    {/* Bottom: The Terminal Log */}
                    <div className="mt-6 h-32 bg-slate-900 rounded-lg border border-slate-700 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
                        <div className="flex items-center gap-2 text-slate-500 border-b border-slate-800 pb-2 mb-2">
                            <Terminal className="w-3 h-3" /> 
                            <span>agent_logs.txt</span>
                        </div>
                        <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                            {logs.map((log, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-green-400/90"
                                >
                                    <span className="text-slate-600 mr-2">{new Date().toISOString().split('T')[1].split('.')[0]}</span>
                                    {log}
                                </motion.div>
                            ))}
                            <div className="w-2 h-4 bg-green-500 animate-pulse inline-block align-middle" />
                        </div>
                    </div>
                </div>
            ) : (
                // PHASE 2: THE HIGH-FIDELITY REPORT
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col bg-slate-50 dark:bg-[#0B1120]"
                >
                    {/* 1. Tech Stack Detection Bar (Instant Trust) */}
                    <div className="px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                         <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Layers className="w-3 h-3 text-blue-500" /> Stack Detected:
                            </span>
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Next.js</span>
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">React</span>
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Vercel</span>
                         </div>
                         <div className="text-xs font-mono text-slate-400">Scan ID: #8X29-A</div>
                    </div>

                    <div className="p-8 flex flex-col md:flex-row gap-8">
                        
                        {/* LEFT: The Big Score */}
                        <div className="w-full md:w-1/3 flex flex-col gap-4">
                             <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
                                
                                {/* Score Circle */}
                                <div className="relative w-40 h-40 my-4">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                        <motion.circle 
                                            initial={{ strokeDasharray: 440, strokeDashoffset: 440 }}
                                            animate={{ strokeDashoffset: 440 - (440 * 0.72) }} 
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                            cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-yellow-500" strokeLinecap="round" 
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">72</span>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Grade B-</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Needs Optimization</h3>
                                <p className="text-xs text-slate-500 mt-1">You are outranking 45% of competitors.</p>
                             </div>

                             {/* Categories Grid */}
                             <div className="grid grid-cols-2 gap-2">
                                <CategoryScore label="Performance" score={65} color="text-red-500" />
                                <CategoryScore label="SEO" score={88} color="text-green-500" />
                                <CategoryScore label="Best Practices" score={92} color="text-green-500" />
                                <CategoryScore label="Accessibility" score={71} color="text-yellow-500" />
                             </div>
                        </div>

                        {/* RIGHT: The Critical Issues (Blurred Lock) */}
                        <div className="w-full md:w-2/3 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-500" /> Critical Issues Found
                                </h4>
                                <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-600 rounded-full">3 High Priority</span>
                            </div>

                            <div className="relative flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                {/* Blurred Fake Code Snippets */}
                                <div className="p-6 space-y-6 filter blur-[5px] select-none opacity-50">
                                     {/* Fake Issue 1 */}
                                     <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0" />
                                        <div className="space-y-2 w-full">
                                            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                                            <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded" />
                                            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 rounded font-mono text-xs">
                                                &lt;img src="hero.jpg" /&gt; {/* Missing alt */}
                                            </div>
                                        </div>
                                     </div>
                                     {/* Fake Issue 2 */}
                                     <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0" />
                                        <div className="space-y-2 w-full">
                                            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
                                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded" />
                                        </div>
                                     </div>
                                     {/* Fake Issue 3 */}
                                     <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0" />
                                        <div className="space-y-2 w-full">
                                            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                                            <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-800 rounded" />
                                        </div>
                                     </div>
                                </div>

                                {/* UNLOCK OVERLAY (The Hook) */}
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-950/60 backdrop-blur-[2px]">
                                     <div className="text-center mb-6 max-w-xs">
                                        <Lock className="w-10 h-10 text-brand-500 mx-auto mb-3 bg-brand-100 p-2 rounded-full" />
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">Unlock Technical Details</h3>
                                        <p className="text-sm text-slate-500 mt-2">Create a free account to view the specific code lines causing these errors.</p>
                                     </div>
                                     <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-500/20 rounded-lg px-8 h-12 text-base font-semibold w-64">
                                        Fix My Website <ArrowRight className="w-4 h-4 ml-2" />
                                     </Button>
                                     <p className="mt-4 text-xs text-slate-400">No credit card required • Instant access</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper Components
const TelemetryCard = ({ icon, label, value }) => (
    <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm">
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
            {icon}
        </div>
        <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">{label}</div>
            <div className="text-sm font-mono font-bold text-slate-900 dark:text-white">{value}</div>
        </div>
    </div>
);

const CategoryScore = ({ label, score, color }) => (
    <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <span className={`text-sm font-bold font-mono ${color}`}>{score}</span>
    </div>
);

export default AnalysisDemoModal;