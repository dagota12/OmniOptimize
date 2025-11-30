"use client";
import React, { useState } from "react";
import { Smartphone, Monitor, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { MetricCard } from "./MetricCard";
import { OpportunityItem } from "./OpportunityItem";
import { Filmstrip } from "./Filmstrip";
import { DiagnosticItem } from "./DiagnosticItem";       // <--- NEW IMPORT
import { AccessibilityAudit } from "./AccessibilityAudit"; // <--- NEW IMPORT
import { ScoreGauge } from "./ScoreGuage";

// --- MOCK DATA ---
const REPORT_DATA = {
  mobile: {
    scores: { perf: 83, a11y: 85, best: 96, seo: 100 },
    metrics: [
      { label: "First Contentful Paint", value: "2.8 s", score: "average" },
      { label: "Largest Contentful Paint", value: "4.7 s", score: "poor" },
      { label: "Total Blocking Time", value: "120 ms", score: "average" },
      { label: "Cumulative Layout Shift", value: "0.002", score: "good" },
      { label: "Speed Index", value: "5.4 s", score: "poor" },
      { label: "Time to Interactive", value: "5.1 s", score: "poor" },
    ],
    opportunities: [
      { title: "Serve images in next-gen formats", url: "/assets/hero-banner.jpg", size: "1,200 KiB", savings: "1.5s" },
      { title: "Defer offscreen images", url: "/images/carousel/slide-3.png", size: "450 KiB", savings: "0.8s" },
      { title: "Reduce unused JavaScript", url: "vendors.js", size: "120 KiB", savings: "0.4s" },
      { title: "Eliminate render-blocking resources", url: "styles.css", size: "40 KiB", savings: "0.15s" },
    ]
  },
  desktop: {
    scores: { perf: 98, a11y: 95, best: 100, seo: 100 },
    metrics: [
      { label: "First Contentful Paint", value: "0.4 s", score: "good" },
      { label: "Largest Contentful Paint", value: "0.9 s", score: "good" },
      { label: "Total Blocking Time", value: "10 ms", score: "good" },
      { label: "Cumulative Layout Shift", value: "0", score: "good" },
      { label: "Speed Index", value: "1.1 s", score: "good" },
      { label: "Time to Interactive", value: "0.8 s", score: "good" },
    ],
    opportunities: [
        { title: "Properly size images", url: "/assets/logo.png", size: "15 KiB", savings: "0.02s" },
    ]
  }
};

const LighthouseWrapper = () => {
  const [device, setDevice] = useState("mobile");
  const data = REPORT_DATA[device];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* 1. CONTROLS */}
      <div className="flex justify-center sticky top-0 z-20 py-4 bg-slate-50/80 dark:bg-[#020617]/80 backdrop-blur-md">
        <div className="inline-flex bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
            <button 
                onClick={() => setDevice("mobile")}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all ${device === 'mobile' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
                <Smartphone className="w-4 h-4" /> Mobile
            </button>
            <button 
                onClick={() => setDevice("desktop")}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all ${device === 'desktop' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
                <Monitor className="w-4 h-4" /> Desktop
            </button>
        </div>
      </div>

      {/* 2. TOP LEVEL SCORES */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 pb-8 border-b border-slate-200 dark:border-slate-800">
        <ScoreGauge score={data.scores.perf} label="Performance" />
        <ScoreGauge score={data.scores.a11y} label="Accessibility" />
        <ScoreGauge score={data.scores.best} label="Best Practices" />
        <ScoreGauge score={data.scores.seo} label="SEO" />
      </div>

      {/* 3. PERFORMANCE SECTION */}
      <section>
        <div className="flex flex-col items-center mb-8">
            <ScoreGauge score={data.scores.perf} label="Performance" size="large" />
            <p className="text-xs text-slate-400 mt-4">Values are estimated and may vary.</p>
        </div>

        {/* Core Web Vitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-lg overflow-hidden">
            {data.metrics.map((m, i) => (
                <MetricCard key={i} label={m.label} value={m.value} score={m.score} />
            ))}
        </div>

        {/* Filmstrip */}
        <div className="mt-8">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 px-2">Visual Progress</h4>
            <Filmstrip />
        </div>
      </section>

      {/* 4. OPPORTUNITIES (Accordion) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Opportunities</h3>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
                {data.opportunities.map((opp, i) => (
                    <OpportunityItem key={i} {...opp} />
                ))}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 text-xs text-slate-500 text-right">
                These suggestions can help your page load faster.
            </div>
        </div>
      </section>

      {/* 5. DIAGNOSTICS (Updated with Component) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Diagnostics</h3>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="diag-1" className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <AccordionTrigger className="hover:no-underline px-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900/80">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        View 4 Diagnostics
                    </span>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                    <div className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                        <DiagnosticItem 
                            title="Minimize main-thread work" 
                            description="Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this." 
                        />
                        <DiagnosticItem 
                            title="Ensure text remains visible during webfont load" 
                            description="Leverage the font-display CSS feature to ensure text is user-visible while webfonts are loading." 
                        />
                        <DiagnosticItem 
                            title="Avoid chaining critical requests" 
                            description="The critical request chains below show what resources are loaded with high priority." 
                        />
                        <DiagnosticItem 
                            title="Keep request counts low and transfer sizes small" 
                            description="To set budgets for the quantity and size of page resources, add a budget.json file." 
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </section>

      {/* 6. ACCESSIBILITY AUDIT (New Section) */}
      <section>
         <AccessibilityAudit />
      </section>

      {/* 7. PASSED AUDITS */}
      <section>
        <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Passed Audits (12)</h3>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                {[
                    "Properly size images", "Defer offscreen images", "Minify CSS", 
                    "Minify JavaScript", "Enable text compression", "Preconnect to required origins",
                    "Avoids enormous network payloads", "Uses passive listeners"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
};

export default LighthouseWrapper;