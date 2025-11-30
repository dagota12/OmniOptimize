"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Nov 01", visitors: 1200, sessions: 1400 },
  { date: "Nov 05", visitors: 1900, sessions: 2200 },
  { date: "Nov 10", visitors: 1500, sessions: 1800 },
  { date: "Nov 15", visitors: 2800, sessions: 3200 },
  { date: "Nov 20", visitors: 2400, sessions: 2900 },
  { date: "Nov 25", visitors: 3100, sessions: 3800 },
  { date: "Nov 30", visitors: 3800, sessions: 4500 },
];

const TrafficChart = () => {
  return (
    <Card className="col-span-4 border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">
            Visitor Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100 dark:stroke-slate-800" />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: "#0f172a", 
                    borderColor: "#1e293b", 
                    borderRadius: "8px", 
                    color: "#fff",
                    fontSize: "12px"
                }}
              />
              <Area type="monotone" dataKey="sessions" stroke="#10b981" fillOpacity={1} fill="url(#colorSessions)" strokeWidth={2} />
              <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;