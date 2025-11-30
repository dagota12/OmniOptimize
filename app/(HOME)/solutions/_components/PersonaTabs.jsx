"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, LineChart, Users, CheckCircle2, ArrowRight, Code2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "dev", label: "For Developers", icon: <Terminal className="w-4 h-4" /> },
  { id: "seo", label: "For SEO Pros", icon: <Search className="w-4 h-4" /> },
  { id: "pm", label: "For Product Managers", icon: <Users className="w-4 h-4" /> },
];

const content = {
  dev: {
    title: "Ship faster. Debug less.",
    description: "Stop wasting time on 'fix SEO tags' tickets. Integrate OmniOptimize into your CI/CD pipeline and catch regressions before they hit production.",
    features: [
      "Next.js & React SDK (2kb gzipped)",
      "Automated GitHub PR Comments",
      "Type-safe Analytics Events",
      "Zero-config Heatmap Tracking"
    ],
    visual: (
      <div className="bg-[#0d1117] p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 shadow-2xl">
        <div className="flex gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/50"/>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"/>
          <div className="w-3 h-3 rounded-full bg-green-500/50"/>
        </div>
        <p><span className="text-purple-400">import</span> &#123; OmniAnalytics &#125; <span className="text-purple-400">from</span> <span className="text-green-400">'@omni/sdk'</span>;</p>
        <br/>
        <p><span className="text-blue-400">export default function</span> <span className="text-yellow-300">RootLayout</span>() &#123;</p>
        <p className="pl-4">return (</p>
        <p className="pl-8">&lt;<span className="text-green-400">OmniAnalytics</span></p>
        <p className="pl-12">projectId=<span className="text-blue-400">"proj_123"</span></p>
        <p className="pl-12">autoTrack=<span className="text-blue-400">&#123;true&#125;</span></p>
        <p className="pl-8">/&gt;</p>
        <p className="pl-4">);</p>
        <p>&#125;</p>
      </div>
    )
  },
  seo: {
    title: "Dominate Search & AI.",
    description: "Traditional SEO tools ignore AI. We optimize your content for Google AND Large Language Models like ChatGPT and Perplexity.",
    features: [
      "Agentic Content Analysis",
      "Competitor Keyword Gap",
      "Schema Markup Generator",
      "Core Web Vitals Monitoring"
    ],
    visual: (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col gap-4">
         <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="font-bold text-slate-900 dark:text-white">Rank Tracker</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+12% this week</span>
         </div>
         <div className="space-y-3">
             <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <span className="text-sm font-medium dark:text-slate-50 text-slate-800">"Buy College Merch"</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Pos:</span>
                    <span className="font-bold text-green-500">#1</span>
                </div>
             </div>
             <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <span className="text-sm font-medium dark:text-slate-50 text-slate-800">"Student Marketplace"</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Pos:</span>
                    <span className="font-bold text-green-500">#3</span>
                </div>
             </div>
             <div className="p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 rounded text-xs text-brand-700 dark:text-brand-300">
                ✨ AI Insight: Add more structured data for "Price" to rank in Google Shopping snippets.
             </div>
         </div>
      </div>
    )
  },
  pm: {
    title: "Understand User Intent.",
    description: "Numbers don't tell the whole story. See exactly how users interact with your product through heatmaps and session replay data.",
    features: [
      "Click & Scroll Heatmaps",
      "Rage Click Detection",
      "User Journey funnels",
      "Retention Cohorts"
    ],
    visual: (
      <div className="relative bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden h-64">
         <div className="absolute inset-0 bg-white dark:bg-slate-950 p-4">
             <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
             <div className="flex gap-4">
                 <div className="w-1/3 h-32 bg-slate-200 dark:bg-slate-800 rounded" />
                 <div className="w-2/3 space-y-2">
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="w-1/2 h-8 bg-blue-500 rounded mt-4" />
                 </div>
             </div>
         </div>
         {/* Heatmap Overlay */}
         <div className="absolute top-1/2 right-12 w-24 h-24 bg-red-500/50 blur-xl rounded-full mix-blend-multiply dark:mix-blend-normal" />
         <div className="absolute bottom-4 left-12 w-16 h-16 bg-yellow-500/50 blur-xl rounded-full mix-blend-multiply dark:mix-blend-normal" />
         
         <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
            Heatmap Layer: ON
         </div>
      </div>
    )
  }
};

const PersonaTabs = () => {
  const [activeTab, setActiveTab] = useState("dev");

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Built for the entire team
            </h2>
            
            {/* TABS HEADER */}
            <div className="inline-flex p-1 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                            activeTab === tab.id 
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md" 
                                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* CONTENT AREA */}
        <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* LEFT: TEXT */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                {content[activeTab].title}
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                {content[activeTab].description}
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            {content[activeTab].features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                                    <span className="text-slate-700 dark:text-slate-200 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                            Read Documentation <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    {/* RIGHT: VISUAL */}
                    <div className="relative">
                        {/* Decorative Blob */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50" />
                        
                        <div className="relative transform transition-all duration-500 hover:scale-[1.02]">
                            {content[activeTab].visual}
                        </div>
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default PersonaTabs;