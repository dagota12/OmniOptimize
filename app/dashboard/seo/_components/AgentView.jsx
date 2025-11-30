"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Lightbulb, Target, TrendingUp } from "lucide-react";

const AgentView = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: The "Chat" / Agent Profile */}
        <Card className="lg:col-span-1 border-brand-200 dark:border-brand-900 bg-brand-50/50 dark:bg-brand-900/10 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Omni Agent</h3>
                        <p className="text-xs text-slate-500 dark:text-brand-200">Deep Semantic Analysis</p>
                    </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    "I've crawled your site simulating an LLM (like GPT-4). While your technical structure is decent, your **entity relationships** are weak. AI engines struggle to connect your 'Products' to your 'Pricing'."
                </p>
                <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Agent Confidence</div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-500 w-[72%]" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>Low</span>
                        <span>72/100</span>
                        <span>High</span>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Right: The Detailed Report */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Insight Card 1 */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-lg">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Content Gap Analysis</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                Your competitors are ranking for <strong>"Best student laptop deals"</strong>, but your site only mentions "electronics". AI searches are specific; you need more long-tail content.
                            </p>
                            <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                Suggestion: Add a blog post titled "Top 5 Laptops for Ethiopian Students in 2025"
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Insight Card 2 */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Schema Markup Strategy</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                I found product pages, but no <code className="text-pink-500 bg-pink-50 dark:bg-pink-900/20 px-1 rounded">Product</code> schema. This means Perplexity and Google cannot display your prices in rich results.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* Insight Card 3 */}
             <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Sentiment Analysis</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Your "About Us" page has a highly positive sentiment score (0.9), but your "Refund Policy" is confusing (0.4 readability). Simplify the language to build trust.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    </div>
  );
};

export default AgentView;