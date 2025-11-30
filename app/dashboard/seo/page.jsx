"use client";
import React from "react";
import SeoHeader from "./_components/SeoHeader";
import AgentView from "./_components/AgentView";
// UPDATE: Pointing to the new Wrapper inside the lighthouse folder
import LighthouseWrapper from "./_components/lighthouse/LighthouseWrapper"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SeoPage() {
  return (
    <div className="space-y-6">
      <SeoHeader />

      <Tabs defaultValue="lighthouse" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
          <TabsTrigger value="lighthouse">Lighthouse View</TabsTrigger>
          <TabsTrigger value="agent">Agent View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lighthouse" className="animate-in fade-in-50 duration-500">
          <LighthouseWrapper /> 
        </TabsContent>
        
        <TabsContent value="agent" className="animate-in fade-in-50 duration-500">
          <AgentView />
        </TabsContent>
      </Tabs>
    </div>
  );
}