import React from "react";
import SolutionsHero from "./_components/SolutionsHero";
import ProblemSolver from "./_components/ProblemSolver";
import PersonaTabs from "./_components/PersonaTabs";
import SolutionsCTA from "./_components/SolutionsCTA";

export const metadata = {
  title: "Solutions | OmniOptimize",
  description: "How OmniOptimize unifies SEO, Analytics, and Code health for Developers, SEOs, and Product Managers.",
};

export default function SolutionsPage() {
  return (
    <main className="flex-1">
      <SolutionsHero />
      <ProblemSolver />
      <PersonaTabs />
      <SolutionsCTA />
    </main>
  );
}