import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import PricingCards from "@/components/PricingCards";
import {
  Zap,
  BookOpen,
  Brain,
  Target,
  ChevronRight,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Complete Syllabus",
    description: "Browse every PL-300 exam topic organized by domain with official Microsoft content.",
  },
  {
    icon: Brain,
    title: "Practice Assessments",
    description: "Test your knowledge with domain-specific questions and detailed explanations.",
  },
  {
    icon: Target,
    title: "Key Terms Glossary",
    description: "Master essential Power BI terms, features, and exam tips for each domain.",
  },
  {
    icon: Star,
    title: "Exam Prep Videos",
    description: "Official Microsoft Exam Readiness Zone videos covering all four domains.",
  },
];

const stats = [
  { value: "200+", label: "Practice Questions" },
  { value: "45+", label: "Exam Topics" },
  { value: "4", label: "Exam Domains" },
  { value: "100%", label: "Syllabus Coverage" },
];

export default function LandingPage() {
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
            <Link to={createPageUrl("Pricing")}>
              <Button variant="ghost" size="sm" className="text-muted-foreground">Pricing</Button>
            </Link>
            <Link to={createPageUrl("Dashboard")}>
              <Button size="sm" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                Start Studying <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
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
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 text-base">
                Start Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Pricing")}>
              <Button variant="outline" size="lg" className="rounded-xl px-8 text-base">
                View Plans
              </Button>
            </Link>
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

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Everything you need to pass</h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              Structured study materials aligned to the official PL-300 exam objectives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Choose your study plan</h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              From free essentials to premium coaching — pick the plan that fits your PL-300 prep journey.
            </p>
          </div>
          <PricingCards compact />
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
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8">
                Get Started Free
              </Button>
            </Link>
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
