"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Github, Check } from "lucide-react";
import { useState } from "react";

const IntegrationsSettings = () => {
  const [copied, setCopied] = useState(false);
  // Mock convex URL - we will replace this with real one later
  const webhookUrl = "https://happy-otter-123.convex.site/clerk/github-webhook"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" /> GitHub Integration
        </CardTitle>
        <CardDescription>
            To enable Code Health, add this Webhook to your GitHub Repository settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500">Payload URL</span>
                <span className="text-[10px] text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-2 py-0.5 rounded-full">Listening</span>
            </div>
            <div className="flex gap-2">
                <Input value={webhookUrl} readOnly className="font-mono text-xs h-9 bg-white dark:bg-slate-950" />
                <Button size="sm" variant="outline" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
            </div>
            <div className="text-xs text-slate-500">
                <p>1. Go to your Repo &gt; Settings &gt; Webhooks.</p>
                <p>2. Paste this URL.</p>
                <p>3. Select Content type: <span className="font-mono text-slate-700 dark:text-slate-300">application/json</span>.</p>
                <p>4. Select event: <span className="font-mono text-slate-700 dark:text-slate-300">Check runs</span> & <span className="font-mono text-slate-700 dark:text-slate-300">Pushes</span>.</p>
            </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default IntegrationsSettings;