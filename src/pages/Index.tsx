import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PricingCards from "@/components/PricingCards";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { FEATURE_META } from "@/data/featureMeta";

type Tier = "explorer" | "pro" | "premium";

interface DynamicSection {
  section_key: string;
  section_label: string;
  required_tier: Tier;
  sort_order: number;
}


const stats = [
  { value: "200+", label: "Practice Questions" },
  { value: "45+", label: "Exam Topics" },
  { value: "4", label: "Exam Domains" },
  { value: "100%", label: "Syllabus Coverage" },
];

const tierConfig = {
  explorer: { label: "Free", className: "text-muted-foreground border-border" },
  pro: { label: "Pro", className: "text-primary border-primary/30" },
  premium: { label: "★ Premium", className: "text-amber-400 border-amber-400/30" },
};

type TierFilter = "all" | "explorer" | "pro" | "premium";

export default function LandingPage() {
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [sections, setSections] = useState<DynamicSection[]>([]);

  useEffect(() => {
    const load = () => {
      supabase
        .from("section_access")
        .select("section_key, section_label, required_tier, sort_order, admin_only, is_hidden")
        .then(({ data }) => {
          if (!data) return;
          const visible = (data as any[])
            .filter((s) => !s.admin_only && !s.is_hidden && FEATURE_META[s.section_key])
            .map((s) => ({
              section_key: s.section_key as string,
              section_label: s.section_label as string,
              required_tier: s.required_tier as Tier,
              sort_order: s.sort_order as number,
            }))
            .sort((a, b) => a.sort_order - b.sort_order);
          setSections(visible);
        });
    };
    load();
    window.addEventListener("section-access-updated", load);
    return () => window.removeEventListener("section-access-updated", load);
  }, []);

  const appSections = useMemo(
    () =>
      sections.map((s) => {
        const meta = FEATURE_META[s.section_key];
        return {
          key: s.section_key,
          icon: meta.icon,
          name: s.section_label,
          description: meta.description,
          tier: s.required_tier,
          image: meta.image,
          metric:
            meta.countLabel ||
            (meta.count !== undefined ? `${meta.count} items` : ""),
        };
      }),
    [sections]
  );

  const filteredSections = tierFilter === "all"
    ? appSections
    : appSections.filter((s) => s.tier === tierFilter);



  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">PL-300 Coach Pro</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#features">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Features</Button>
            </a>
            <a href="#pricing">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Pricing</Button>
            </a>
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Log In</Button>
            </Link>
            <a href="#pricing">
              <Button size="sm" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                Start Studying <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" /> Power BI Certification Prep Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight animate-fade-in">
            Master the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PL-300
            </span>{" "}
            Exam
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto animate-fade-in-delay">
            Your comprehensive coaching platform for the Microsoft Power BI Data Analyst certification. Study smarter with structured content, practice assessments, and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fade-in-delay">
            <a href="#pricing">
              <Button size="lg" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 text-base">
                Start Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="#features">
              <Button variant="outline" size="lg" className="rounded-xl px-8 text-base">
                View Features
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-border/60 bg-secondary/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features by Section */}
      <section id="features" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Everything you need to pass</h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              Explore every section of the platform and see what's included with each plan.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <span className="text-muted-foreground">{appSections.filter(s => s.tier === "explorer").length} <span className="font-semibold text-foreground">Free</span></span>
              <span className="text-muted-foreground">{appSections.filter(s => s.tier === "pro").length} <span className="font-semibold text-primary">Pro</span></span>
              <span className="text-muted-foreground">{appSections.filter(s => s.tier === "premium").length} <span className="font-semibold text-amber-400">Premium</span></span>
            </div>
          </div>

          {/* Tier filter buttons */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {([
              { key: "all", label: "All Features" },
              { key: "explorer", label: "Free" },
              { key: "pro", label: "Pro" },
              { key: "premium", label: "Premium" },
            ] as const).map((filter) => (
              <button
                key={filter.key}
                onClick={() => setTierFilter(filter.key)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  tierFilter === filter.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSections.map((section) => {
              const config = tierConfig[section.tier as keyof typeof tierConfig];
              return (
                <div
                  key={section.name}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-200 flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {section.image ? (
                      <img
                        src={section.image}
                        alt={section.name}
                        loading="lazy"
                        width={768}
                        height={512}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <section.icon className="w-12 h-12 text-primary/40" />
                    )}
                    <Badge
                      variant="outline"
                      className={cn(
                        "absolute top-3 right-3 text-[10px] backdrop-blur-md bg-background/60",
                        config.className
                      )}
                    >
                      {config.label}
                    </Badge>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <section.icon className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-foreground">{section.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground flex-1">{section.description}</p>
                    <p className="text-xs font-medium text-primary mt-3">{section.metric}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-secondary/20 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Choose your study plan</h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              From free essentials to premium coaching — pick the plan that fits your PL-300 prep journey.
            </p>
          </div>
          <PricingCards compact />

          {/* FAQ */}
          <div className="max-w-2xl mx-auto text-center bg-secondary/30 rounded-2xl border border-border p-6 mt-10">
            <h3 className="font-semibold text-foreground mb-2">🎯 Which plan is right for me?</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Explorer</strong> is perfect for getting an overview. <strong>Pro</strong> is ideal for serious exam prep with full question banks.
              <strong> Premium</strong> adds AI coaching and simulation tools for the most thorough preparation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-primary/10 p-10">
          <h2 className="text-3xl font-bold text-foreground">Ready to ace the PL-300?</h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Join thousands of Power BI developers preparing for their certification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a href="#pricing">
              <Button size="lg" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8">
                Get Started Free
              </Button>
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-primary" /> Free tier available</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-primary" /> No credit card required</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/60">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">PL-300 Coach Pro</span>
          </div>
          <p>© 2026 PL-300 Coach Pro. Not affiliated with Microsoft.</p>
        </div>
      </footer>
    </div>
  );
}
