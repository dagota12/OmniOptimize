"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Timer, MousePointerClick, TrendingUp } from "lucide-react";

const metrics = [
  { title: "Active Users", value: "842", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Avg. Time", value: "4m 32s", change: "+8%", icon: Timer, color: "text-orange-500", bg: "bg-orange-500/10" },
  { title: "Total Clicks", value: "12.5k", change: "+24%", icon: MousePointerClick, color: "text-purple-500", bg: "bg-purple-500/10" },
  { title: "Conv. Rate", value: "3.2%", change: "+1.1%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
];

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <Card key={i} className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{m.title}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{m.value}</h3>
                        <span className="text-xs font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                            {m.change}
                        </span>
                    </div>
                </div>
                <div className={`p-3 rounded-xl ${m.bg}`}>
                    <m.icon className={`w-5 h-5 ${m.color}`} />
                </div>
            </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;