import React from "react";

export const MetricCard = ({ label, value, score }) => {
  const color = score === "good" ? "bg-green-500" : score === "average" ? "bg-orange-500" : "bg-red-500";
  
  return (
    <div className="p-4 border-b md:border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between h-24">
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 ${color} rounded-sm`} /> 
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
        </div>
        <div className="text-2xl font-mono text-slate-900 dark:text-white mt-1">
            {value}
        </div>
    </div>
  );
};