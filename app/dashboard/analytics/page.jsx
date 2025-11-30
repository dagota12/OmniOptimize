// app/dashboard/analytics/page.jsx
"use client"; // IMPORTANT: Needs to be client component now
import React, { useState } from "react";
import AnalyticsHeader from "./_components/AnalyticsHeader";
import TrafficChart from "./_components/TrafficChart";
import TopPagesTable from "./_components/TopPagesTable";
import DemographicsCard from "./_components/DemographicsCard";
import HeatmapCard from "./_components/HeatmapCard";
import MetricsGrid from "./_components/MetricsGrid";
import DeepInsightsModal from "./_components/DeepInsightsModal"; // <--- Import
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function AnalyticsPage() {
  const [showInsights, setShowInsights] = useState(false);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <AnalyticsHeader />
          
          {/* THE PRO TRIGGER BUTTON */}
          <Button 
            onClick={() => setShowInsights(true)}
            className="bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-700 hover:to-emerald-700 text-white shadow-lg shadow-brand-500/20 border-0"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Open Deep Insights
          </Button>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1">
        <TrafficChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <HeatmapCard />
         <DemographicsCard />
      </div>

      <div className="grid grid-cols-1">
         <TopPagesTable />
      </div>

      {/* THE MODAL */}
      <DeepInsightsModal 
        isOpen={showInsights} 
        onClose={() => setShowInsights(false)} 
      />

    </div>
  );
}