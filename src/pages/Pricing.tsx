import React, { useState } from "react";
import { Check, Zap, Crown, Rocket, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    id: "free",
    name: "Explorer",
    price: "$0",
    period: "forever",
    description: "Get started with essential PL-300 study materials",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-400",
    popular: false,
    features: [
      "Exam syllabus browser",
      "Dashboard overview",
      "Exam prep video links",
      "Microsoft Learn module links",
      "5 sample assessment questions",
      "Community support",
    ],
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Full access to all study tools and practice exams",
    icon: Crown,
    gradient: "from-primary to-accent",
    popular: true,
    features: [
      "Everything in Explorer",
      "200+ practice assessment questions",
      "All 4 domain question banks",
      "Key Terms & Features glossary",
      "Detailed answer explanations",
      "Progress tracking & analytics",
      "Topic-by-topic study content",
      "Email support",
    ],
    cta: "Start Pro Trial",
    ctaVariant: "default" as const,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "Premium coaching with AI-powered exam preparation",
    icon: Rocket,
    gradient: "from-violet-500 to-pink-400",
    popular: false,
    features: [
      "Everything in Pro",
      "AI coaching assistant",
      "Exam scenario simulations",
      "Decision framework trainer",
      "Troubleshooting lab exercises",
      "Performance analytics dashboard",
      "Personalized study plan",
      "Priority support",
      "Certificate of completion",
    ],
    cta: "Start Premium Trial",
    ctaVariant: "outline" as const,
  },
];

const annualSavings = {
  pro: { monthly: "$19", annual: "$15", save: "21%" },
  premium: { monthly: "$39", annual: "$29", save: "26%" },
};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

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

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", !isAnnual ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={cn(
            "relative w-12 h-6 rounded-full transition-colors",
            isAnnual ? "bg-primary" : "bg-border"
          )}
        >
          <div className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform",
            isAnnual ? "translate-x-6" : "translate-x-0.5"
          )} />
        </button>
        <span className={cn("text-sm font-medium", isAnnual ? "text-foreground" : "text-muted-foreground")}>
          Annual
          <span className="ml-1 text-xs text-primary font-semibold">Save up to 26%</span>
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier) => {
          const price = isAnnual && tier.id !== "free"
            ? annualSavings[tier.id as keyof typeof annualSavings]?.annual || tier.price
            : tier.price;
          const period = tier.id === "free" ? "forever" : isAnnual ? "/month, billed annually" : "/month";

          return (
            <div
              key={tier.id}
              className={cn(
                "relative bg-card rounded-2xl border p-6 flex flex-col transition-all duration-200",
                tier.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border hover:shadow-lg hover:border-primary/20"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-3`}>
                  <tier.icon className="w-5 h-5 text-card" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
              </div>

              <div className="mb-5">
                <span className="text-4xl font-bold text-foreground">{price}</span>
                <span className="text-sm text-muted-foreground ml-1">{period}</span>
                {isAnnual && tier.id !== "free" && (
                  <p className="text-xs text-primary font-medium mt-1">
                    Save {annualSavings[tier.id as keyof typeof annualSavings]?.save}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className={cn(
                  "w-full rounded-xl font-semibold",
                  tier.popular && "shadow-lg shadow-primary/20"
                )}
              >
                {tier.cta}
              </Button>
            </div>
          );
        })}
      </div>

      {/* FAQ-like section */}
      <div className="max-w-2xl mx-auto text-center bg-secondary/30 rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-2">🎯 Which plan is right for me?</h3>
        <p className="text-sm text-muted-foreground">
          <strong>Explorer</strong> is perfect for getting an overview. <strong>Pro</strong> is ideal for serious exam prep with full question banks. 
          <strong> Premium</strong> adds AI coaching and simulation tools for the most thorough preparation.
        </p>
      </div>
    </div>
  );
}
