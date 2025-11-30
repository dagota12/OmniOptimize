"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, AlertTriangle, CheckCircle2, XCircle, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CommitDetailSheet from "./CommitDetailSheet";

// ENHANCED MOCK DATA
const commits = [
  {
    sha: "5e6f7g8",
    message: "feat: user profile page query",
    author: "sami-dev",
    time: "2 days ago",
    riskScore: 92, // High Risk
    status: "critical",
    aiComments: 4,
    summary: "This commit introduces a severe SQL Injection vulnerability by concatenating user input directly into a database query string.",
    issues: [
        { 
            severity: "high", 
            title: "SQL Injection Risk", 
            location: "src/db/users.ts:42",
            desc: "Raw query parameters used directly in SQL string. This allows attackers to manipulate the query.", 
            fixType: "code",
            fixContent: "const user = await db.query('SELECT * FROM users WHERE id = $1', [req.body.id]);",
            explanation: "Use parameterized queries (prepared statements) to sanitize input automatically."
        },
        { 
            severity: "medium", 
            title: "Missing Error Handling", 
            location: "src/db/users.ts:48",
            desc: "The database call is not wrapped in a try/catch block.", 
            fixType: "text",
            fixContent: "Wrap the database await call in a try/catch block and return a 500 status code if it fails.",
            explanation: null
        }
    ]
  },
  {
    sha: "8a2b9f1",
    message: "feat: implement stripe webhook handler",
    author: "sami-dev",
    time: "10 mins ago",
    riskScore: 45, // Medium Risk
    status: "warning",
    aiComments: 2,
    summary: "Logic is sound, but security best practices regarding logging are violated.",
    issues: [
        { 
            severity: "medium", 
            title: "Sensitive Data Logged", 
            location: "src/api/webhooks.ts:15",
            desc: "You are console logging the Stripe Secret Key environment variable.", 
            fixType: "code",
            fixContent: "// console.log(process.env.STRIPE_KEY); \nconsole.log('Stripe webhook received');",
            explanation: "Never output secrets to stdout/logs."
        }
    ]
  },
  {
    sha: "b4c1d2e",
    message: "fix: resolve hydration error on navbar",
    author: "sami-dev",
    time: "2 hours ago",
    riskScore: 5, // Low Risk
    status: "safe",
    aiComments: 0,
    summary: "Clean fix. No security regressions detected.",
    issues: []
  },
  {
    sha: "1a2b3c4",
    message: "refactor: optimize image loading strategy",
    author: "bot-optimize",
    time: "1 day ago",
    riskScore: 0, // Perfect
    status: "safe",
    aiComments: 1,
    summary: "Automated optimization. Performance metrics improved.",
    issues: []
  }
];

const CommitLog = () => {
  const [selectedCommit, setSelectedCommit] = useState(null);

  // Helper to determine status color based on score
  const getStatusColor = (score) => {
    if (score >= 80) return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"; // Critical
    if (score >= 40) return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"; // Warning
    return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"; // Safe
  };

  const getStatusIcon = (score) => {
    if (score >= 80) return <XCircle className="w-5 h-5" />;
    if (score >= 40) return <AlertTriangle className="w-5 h-5" />;
    return <CheckCircle2 className="w-5 h-5" />;
  };

  return (
    <>
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">
              Commit History
          </CardTitle>
          <div className="flex gap-2 text-xs text-slate-500">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"/> Safe</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"/> Warning</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"/> Critical</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {commits.map((commit) => (
              <div 
                key={commit.sha} 
                onClick={() => setSelectedCommit(commit)}
                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                    {/* Dynamic Status Icon */}
                    <div className={`mt-1 p-2 rounded-full ${getStatusColor(commit.riskScore)}`}>
                        {getStatusIcon(commit.riskScore)}
                    </div>

                    <div>
                        <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                {commit.message}
                            </p>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-500">
                                {commit.sha}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500">
                            <span>by {commit.author}</span>
                            <span>•</span>
                            <span>{commit.time}</span>
                            
                            {/* AI Comment Count */}
                            {commit.aiComments > 0 && (
                                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                    <MessageSquare className="w-3 h-3" />
                                    {commit.aiComments} AI Notes
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Risk Score Indicator */}
                    <div className="text-right hidden sm:block">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Risk Score</div>
                        <div className={`text-sm font-bold ${
                            commit.riskScore > 50 ? "text-red-500" : commit.riskScore > 0 ? "text-yellow-500" : "text-green-500"
                        }`}>
                            {commit.riskScore}/100
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Slide-over Sheet */}
      <CommitDetailSheet 
        isOpen={!!selectedCommit} 
        onClose={() => setSelectedCommit(null)} 
        commit={selectedCommit} 
      />
    </>
  );
};

// Helper Icon
const ChevronRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

export default CommitLog;