"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "./_components/ProfileSettings";
import ApiKeys from "./_components/ApiKeys";
import TeamSettings from "./_components/TeamSettings";
import BillingSettings from "./_components/BillingSettings";
import FeatureSettings from "./_components/FeatureSettings"; // New
import IntegrationsSettings from "./_components/IntegrationsSettings"; // New

export default function SettingsPage() {
  return (
    <div className="space-y-6 mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your organization, preferences, and integrations.
        </p>
      </div>

      <Tabs defaultValue="features" className="space-y-6">
        <div className="overflow-x-auto pb-2">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 inline-flex w-auto min-w-full md:min-w-0 justify-start">
            <TabsTrigger value="general">Profile</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="apikeys">API Keys</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="general" className="space-y-4">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <TeamSettings />
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <FeatureSettings />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
            <IntegrationsSettings />
        </TabsContent>
        
        <TabsContent value="apikeys" className="space-y-4">
          <ApiKeys />
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}