"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, MousePointerClick, AlertCircle, Clock, Layout, Monitor, Smartphone, MapPin, ArrowDown } from "lucide-react";

// ... (Keep SESSIONS and TIMELINE_EVENTS constants the same) ...
const SESSIONS = [
  { id: 1, user: "User_8x92", location: "Ethiopia", device: "Mobile", duration: "4m 12s", events: 24, rageClicks: 2, status: "Abandoned" },
  { id: 2, user: "User_33a1", location: "USA", device: "Desktop", duration: "12m 05s", events: 112, rageClicks: 0, status: "Purchased" },
  { id: 3, user: "User_99b2", location: "UK", device: "Desktop", duration: "0m 45s", events: 5, rageClicks: 0, status: "Bounced" },
];

const TIMELINE_EVENTS = [
  { time: "00:05", type: "navigate", label: "Landed on /home", icon: Layout },
  { time: "00:12", type: "click", label: "Clicked 'Shop Now'", icon: MousePointerClick },
  { time: "00:15", type: "navigate", label: "Viewed /products", icon: Layout },
  { time: "00:45", type: "scroll", label: "Scrolled to bottom", icon: ArrowDown },
  { time: "01:02", type: "click", label: "Clicked 'Add to Cart' (Failed)", icon: AlertCircle, color: "text-red-500" },
  { time: "01:04", type: "rage", label: "Rage Click on 'Add to Cart'", icon: MousePointerClick, color: "text-red-500 font-bold" },
];

const SessionPlayer = () => (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-[300px] sm:h-[450px]">
        {/* Browser Bar */}
        <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" /></div>
            <div className="flex-1 bg-slate-800 h-6 rounded text-[10px] text-slate-400 flex items-center px-2 font-mono mx-4 truncate">wego.com.et/products</div>
        </div>
        {/* Playback Canvas */}
        <div className="flex-1 relative bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
            <div className="absolute top-1/4 left-1/4 animate-[bounce_3s_infinite] z-10">
                <MousePointerClick className="w-6 h-6 text-slate-900 dark:text-white drop-shadow-xl" />
            </div>
            {/* Mock Content */}
            <div className="w-3/4 h-3/4 border border-dashed border-slate-300 dark:border-slate-700 rounded flex items-center justify-center text-slate-400 text-sm p-4 text-center">
                [ Session Video Replay ]
            </div>
        </div>
        {/* Controls */}
        <div className="bg-slate-900 p-3 flex items-center gap-4">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white"><Play className="w-4 h-4 fill-current" /></Button>
            <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden relative">
                <div className="w-[35%] h-full bg-brand-500" />
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">01:12 / 04:12</span>
        </div>
    </div>
);

export const SessionReplayTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-full">
        
        {/* LEFT: Session List (3 cols) - Adjusted height for mobile */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto lg:pr-2 h-[200px] lg:h-auto border-b lg:border-b-0 border-slate-200 dark:border-slate-800 pb-4 lg:pb-0">
            {SESSIONS.map((session, i) => (
                <Card key={i} className={`cursor-pointer hover:border-brand-500 transition-colors shrink-0 ${i === 0 ? 'border-brand-500 ring-1 ring-brand-500/20' : ''}`}>
                    <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">{session.user}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${session.status === 'Purchased' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{session.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1 truncate"><Clock className="w-3 h-3 shrink-0" /> {session.duration}</span>
                            <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3 shrink-0" /> {session.location}</span>
                            <span className="flex items-center gap-1 truncate">
                                {session.device === 'Mobile' ? <Smartphone className="w-3 h-3 shrink-0" /> : <Monitor className="w-3 h-3 shrink-0" />} {session.device}
                            </span>
                            {session.rageClicks > 0 && <span className="text-red-500 font-bold flex items-center gap-1 truncate"><AlertCircle className="w-3 h-3 shrink-0" /> {session.rageClicks} Rage</span>}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* MIDDLE: Player (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
            <SessionPlayer />
            <div className="grid grid-cols-3 gap-4">
                <div className="p-2 sm:p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold">Clicks</div>
                    <div className="text-base sm:text-lg font-mono font-bold">24</div>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold">Pages</div>
                    <div className="text-base sm:text-lg font-mono font-bold">4</div>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold">Errors</div>
                    <div className="text-base sm:text-lg font-mono font-bold text-red-500">1</div>
                </div>
            </div>
        </div>

        {/* RIGHT: Event Stream (3 cols) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[300px] lg:h-auto">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-xs uppercase tracking-wider text-slate-500">
                Session Timeline
            </div>
            <div className="flex-1 overflow-y-auto p-0">
                {TIMELINE_EVENTS.map((event, i) => (
                    <div key={i} className="flex gap-3 p-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="text-xs font-mono text-slate-400 pt-0.5 w-10 shrink-0">{event.time}</div>
                        <div className="flex-1 min-w-0">
                            <div className={`flex items-center gap-2 text-sm font-medium ${event.color || "text-slate-700 dark:text-slate-300"}`}>
                                <event.icon className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{event.label}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div>
  );
};