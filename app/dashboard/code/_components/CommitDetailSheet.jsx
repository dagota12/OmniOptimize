"use client";
import React, { useState } from "react";
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, AlertTriangle, Check, X, Copy, CheckCircle2, FileCode } from "lucide-react";

// Sub-component for Handling Code Copying
const FixBlock = ({ type, content, explanation }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (type === 'code') {
        return (
            <div className="mt-3 w-full">
                <div className="flex items-center justify-between bg-slate-900 border-b border-slate-700 px-3 py-2 rounded-t-md">
                    <span className="text-[10px] font-mono text-slate-400">Suggested Fix</span>
                    <button 
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-[10px] text-slate-300 hover:text-white transition-colors"
                    >
                        {copied ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        {copied ? "Copied" : "Copy Code"}
                    </button>
                </div>
                {/* overflow-x-auto ensures code scrolls horizontally on small screens */}
                <div className="p-3 bg-[#0d1117] rounded-b-md border border-t-0 border-slate-700 overflow-x-auto max-w-full">
                    <pre className="text-xs font-mono text-green-400 whitespace-pre-wrap break-all md:break-normal">
                        {content}
                    </pre>
                </div>
                {explanation && (
                    <p className="mt-2 text-xs text-slate-500 italic">
                        💡 {explanation}
                    </p>
                )}
            </div>
        );
    }

    // Text Suggestion
    return (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-md">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Recommendation:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {content}
            </p>
        </div>
    );
};

const CommitDetailSheet = ({ isOpen, onClose, commit }) => {
  if (!commit) return null;

  const isSafe = commit.riskScore < 40;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* 
          RESPONSIVE WIDTH FIX:
          w-full (mobile) -> sm:max-w-lg (tablet) -> md:max-w-xl (desktop) 
      */}
      <SheetContent className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto bg-slate-50 dark:bg-[#020617] border-l border-slate-200 dark:border-slate-800 p-4 sm:p-6">
        
        {/* Header */}
        <SheetHeader className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <Badge 
                    variant="outline" 
                    className={`${isSafe ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"} uppercase text-[10px] tracking-wider shrink-0`}
                >
                    {isSafe ? 'Passed' : 'Risks Found'}
                </Badge>
                <span className="text-xs font-mono text-slate-500 truncate max-w-[100px]">{commit.sha}</span>
            </div>
            
            {/* Risk Score Bubble */}
            <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-0">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Risk Score</span>
                <span className={`text-xl font-bold ${isSafe ? "text-green-500" : "text-red-500"}`}>
                    {commit.riskScore}
                </span>
            </div>
          </div>
          
          <SheetTitle className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-2">
            {commit.message}
          </SheetTitle>
          
          <SheetDescription className="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm">
            <span className="font-medium text-slate-700 dark:text-slate-300">{commit.author}</span>
            <span className="text-slate-400">•</span>
            <span>{commit.time}</span>
          </SheetDescription>
        </SheetHeader>

        {/* AI SUMMARY BOX */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            <div className="flex items-center gap-2 mb-3 text-brand-600 dark:text-brand-400 font-bold text-sm">
                <Bot className="w-4 h-4 shrink-0" /> Omni AI Analysis
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {commit.summary}
            </p>
        </div>

        {/* FINDINGS LIST */}
        <div className="space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Findings ({commit.issues ? commit.issues.length : 0})
                </h4>
            </div>
            
            {commit.issues && commit.issues.length > 0 ? (
                commit.issues.map((issue, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        {/* Severity Line */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${issue.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                        
                        <div className="mt-1 flex-shrink-0 hidden sm:block">
                            {issue.severity === 'high' ? <X className="w-5 h-5 text-red-500" /> : <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                        </div>
                        
                        <div className="space-y-2 flex-1 min-w-0 w-full">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                <div className="flex items-center gap-2">
                                    {/* Mobile Icon */}
                                    <div className="sm:hidden flex-shrink-0">
                                        {issue.severity === 'high' ? <X className="w-4 h-4 text-red-500" /> : <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                    </div>
                                    <h5 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{issue.title}</h5>
                                </div>
                                {issue.location && (
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded self-start truncate max-w-full">
                                        {issue.location}
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {issue.desc}
                            </p>
                            
                            {/* THE SMART FIX BLOCK */}
                            <FixBlock 
                                type={issue.fixType} 
                                content={issue.fixContent} 
                                explanation={issue.explanation} 
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30 border-dashed">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm font-bold text-green-800 dark:text-green-300">Clean Codebase</p>
                    <p className="text-xs text-green-600 dark:text-green-400/70 mt-1 max-w-[200px]">
                        The AI agent found no security vulnerabilities or code smells in this commit.
                    </p>
                </div>
            )}
        </div>

      </SheetContent>
    </Sheet>
  );
};

export default CommitDetailSheet;