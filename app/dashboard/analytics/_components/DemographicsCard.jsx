"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Smartphone, Monitor } from "lucide-react";

const countries = [
    { name: "United States", pct: 65, color: "bg-blue-500" },
    { name: "Ethiopia", pct: 20, color: "bg-green-500" },
    { name: "United Kingdom", pct: 10, color: "bg-purple-500" },
    { name: "Others", pct: 5, color: "bg-slate-500" },
];

const DemographicsCard = () => {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm flex-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">User Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        
        {/* Device Usage */}
        <div className="mb-6 flex items-center justify-around text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <div>
                <Monitor className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                <div className="text-lg font-bold text-slate-900 dark:text-white">42%</div>
                <div className="text-xs text-slate-500">Desktop</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div>
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                <div className="text-lg font-bold text-slate-900 dark:text-white">58%</div>
                <div className="text-xs text-slate-500">Mobile</div>
            </div>
        </div>

        {/* Countries List */}
        <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Top Locations</h4>
            {countries.map((c, i) => (
                <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300">{c.name}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{c.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                    </div>
                </div>
            ))}
        </div>

      </CardContent>
    </Card>
  );
};

export default DemographicsCard;