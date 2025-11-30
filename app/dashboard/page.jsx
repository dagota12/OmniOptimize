"use client";
import React from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { 
  ArrowUpRight, ArrowDownRight, Activity, Users, MousePointer2, GitCommit, ShieldCheck 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockOverview } from "@/data/mockDashboard";
import { Button } from "@/components/ui/button";

const trafficData = [
  { name: "Mon", visits: 4000, bounce: 2400 },
  { name: "Tue", visits: 3000, bounce: 1398 },
  { name: "Wed", visits: 2000, bounce: 9800 },
  { name: "Thu", visits: 2780, bounce: 3908 },
  { name: "Fri", visits: 1890, bounce: 4800 },
  { name: "Sat", visits: 2390, bounce: 3800 },
  { name: "Sun", visits: 3490, bounce: 4300 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h2>
            <p className="text-slate-500 dark:text-slate-400">Here's what's happening with <span className="font-semibold text-slate-900 dark:text-white">wego.com.et</span> today.</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Last updated: Just now</span>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {mockOverview.metrics.map((metric, i) => (
            <Card key={i} className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {metric.title}
                    </CardTitle>
                    {/* Dynamic Icons based on title */}
                    {metric.title.includes("Visits") ? <Users className="h-4 w-4 text-slate-400" /> :
                     metric.title.includes("Session") ? <Activity className="h-4 w-4 text-slate-400" /> :
                     metric.title.includes("Bounce") ? <MousePointer2 className="h-4 w-4 text-slate-400" /> :
                     <ShieldCheck className="h-4 w-4 text-slate-400" />}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</div>
                    <div className="flex items-center text-xs mt-1">
                        {metric.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />}
                        {metric.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />}
                        <span className={metric.trend === 'up' ? "text-green-500 font-medium" : metric.trend === 'down' ? "text-red-500 font-medium" : "text-slate-500"}>
                            {metric.change}
                        </span>
                        <span className="text-slate-400 ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      {/* 3. Main Charts Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Traffic Chart (Takes 4 cols) */}
        <Card className="col-span-4 border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Daily visitors vs. bounce rate.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trafficData}>
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" vertical={false} />
                            <XAxis 
                                dataKey="name" 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                            />
                            <YAxis 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `${value}`} 
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="visits" 
                                stroke="#10b981" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorVisits)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* Recent Activity / Code Log (Takes 3 cols) */}
        <Card className="col-span-3 border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader>
                <CardTitle>Recent Code Commits</CardTitle>
                <CardDescription>Security scans from GitHub.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {mockOverview.recentCommits.map((commit, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="relative mt-1">
                                <div className="z-10 relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <GitCommit className="h-4 w-4 text-slate-500" />
                                </div>
                                {i !== mockOverview.recentCommits.length - 1 && (
                                    <div className="absolute left-4 top-8 h-full w-px bg-slate-200 dark:bg-slate-800" />
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-white leading-none">
                                    {commit.message}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>{commit.author}</span>
                                    <span>•</span>
                                    <span>{commit.time}</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                                        commit.status === 'safe' 
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}>
                                        {commit.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                        View All Commits
                    </Button>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}