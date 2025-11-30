import React from "react";
import { ChevronDown, FileCode, ImageIcon } from "lucide-react";

export const OpportunityItem = ({ title, url, size, savings, type }) => {
  return (
    <div className="group border-b border-slate-100 dark:border-slate-800 py-4 px-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        
        {/* Left Side: Icon & Title */}
        <div className="flex gap-4 flex-1 min-w-0">
            {/* Thumbnail / Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex-shrink-0 flex items-center justify-center">
                {type === 'img' ? (
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&q=80')] bg-cover opacity-80" />
                ) : (
                    <FileCode className="w-5 h-5 text-slate-400" />
                )}
            </div>
            
            <div className="space-y-1 min-w-0 flex-1">
                <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline leading-tight">
                    {title}
                </h4>
                <p className="text-xs text-slate-500 font-mono break-all truncate max-w-full sm:max-w-md">
                    {url || "..."}
                </p>
                
                {/* Mobile-only Savings Display (Hidden on Desktop) */}
                <div className="flex sm:hidden items-center gap-3 mt-2 text-xs">
                    <span className="font-bold text-red-500">Save {savings}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{size}</span>
                </div>
            </div>
        </div>

        {/* Right Side: Metrics (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden sm:block text-right w-32 flex-shrink-0">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{size}</div>
            <div className="text-xs text-red-500 mt-1 font-medium">Est. {savings}</div>
        </div>
        
        {/* Expand Icon */}
        <div className="hidden sm:block mt-1">
             <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};