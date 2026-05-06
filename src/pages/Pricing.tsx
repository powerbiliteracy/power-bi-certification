import React from "react";
import { Star } from "lucide-react";
import PricingCards from "@/components/PricingCards";

export default function Pricing() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <Star className="w-3 h-3" /> PL-300 Certification Prep
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Choose your study plan
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          From free essentials to premium coaching — pick the plan that fits your PL-300 prep journey.
        </p>
      </div>

      <PricingCards />

      {/* FAQ-like section */}
      <div className="max-w-2xl mx-auto text-center bg-secondary/30 rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-2">🎯 Which plan is right for me?</h3>
        <p className="text-sm text-muted-foreground">
          <strong>Explorer</strong> is great for browsing the syllabus and core lessons. <strong>Pro</strong> unlocks deeper study tools — key terms, exam scenarios and DAX templates.
          <strong> Premium</strong> gives you everything: flashcards, cheat sheets, full question banks, decision frameworks and topic assessments.
        </p>
      </div>
    </div>
  );
}
