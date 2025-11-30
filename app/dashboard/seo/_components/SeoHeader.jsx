"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ExternalLink } from "lucide-react";

const SeoHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            SEO Performance
        </h2>
        <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Last scan: <span className="font-mono">Today, 10:42 AM</span>
            </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="border-slate-200 dark:border-slate-800">
            View Live Site <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
        <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100">
            <RefreshCcw className="mr-2 w-4 h-4" /> Run New Audit
        </Button>
      </div>
    </div>
  );
};

export default SeoHeader;