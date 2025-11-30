"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Clock } from "lucide-react";

const pages = [
  { path: "/home", views: "12,405", time: "1m 32s" },
  { path: "/products/hoodies", views: "8,200", time: "2m 15s" },
  { path: "/checkout", views: "4,100", time: "3m 45s" },
  { path: "/blog/student-hustle", views: "3,240", time: "5m 12s" },
  { path: "/about", views: "1,100", time: "0m 50s" },
];

const TopPagesTable = () => {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm flex-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">Top Performing Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {pages.map((page, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{page.path}</span>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-brand-500 h-full rounded-full" style={{ width: `${100 - (i * 15)}%` }}></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3"/> {page.views}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {page.time}</span>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPagesTable;