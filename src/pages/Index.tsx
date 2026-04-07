import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import PricingCards from "@/components/PricingCards";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  BookOpen,
  Brain,
  Target,
  ChevronRight,
  CheckCircle,
  Star,
  ArrowRight,
  Video,
  GraduationCap,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  Youtube,
  Trophy,
  LayoutDashboard,
  BookMarked,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const appSections = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    description: "Track your study progress, view completion stats, and see your overall readiness.",
    tier: "explorer",
  },
  {
    icon: BookOpen,
    name: "Exam Syllabus",
    description: "Browse every PL-300 exam topic organized by the four official domains with detailed content.",
    tier: "explorer",
  },
  {
    icon: BookMarked,
    name: "Key Terms & Features",
    description: "Searchable glossary of essential Power BI terms, DAX functions, and exam-relevant features.",
    tier: "pro",
  },
  {
    icon: Video,
    name: "Exam Prep Videos",
    description: "Curated Microsoft Exam Readiness Zone videos with embedded player for each domain.",
    tier: "explorer",
  },
  {
    icon: GraduationCap,
    name: "Learn Modules",
    description: "Direct links to official Microsoft Learn modules mapped to PL-300 exam objectives.",
    tier: "explorer",
  },
  {
    icon: AlertTriangle,
    name: "Troubleshooting",
    description: "Real-world troubleshooting scenarios with step-by-step solutions and progress tracking.",
    tier: "premium",
  },
  {
    icon: Lightbulb,
    name: "Exam Scenarios",
    description: "Scenario-based practice that simulates real exam case studies with completion tracking.",
    tier: "premium",
  },
  {
    icon: GitBranch,
    name: "Decision Framework",
    description: "Learn how to choose between Power BI tools, visuals, and approaches for exam questions.",
    tier: "premium",
  },
  {
    icon: Youtube,
    name: "YouTube Playlists",
    description: "Curated YouTube playlists from top Power BI educators organized by exam domain.",
    tier: "explorer",
  },
  {
    icon: Brain,
    name: "Topic Assessments",
    description: "Domain-specific quizzes with explanations and a full results history to track improvement.",
    tier: "pro",
  },
  {
    icon: Brain,
    name: "Exam Questions",
    description: "200+ practice questions in timed sets simulating the real PL-300 exam experience.",
    tier: "pro",
  },
  {
    icon: Trophy,
    name: "Badges",
    description: "Earn achievement badges as you complete sections and hit study milestones.",
    tier: "explorer",
  },
];

const tierConfig = {
  explorer: { label: "Free", className: "text-muted-foreground border-border" },
  pro: { label: "Pro", className: "text-primary border-primary/30" },
  premium: { label: "★ Premium", className: "text-amber-400 border-amber-400/30" },
};

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
            <a href="#features">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Features</Button>
            </a>
            <a href="#pricing">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Pricing</Button>
            </a>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Everything you need to pass</h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              Explore every section of the platform and see what's included with each plan.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              {Object.entries(tierConfig).map(([key, config]) => (
                <span key={key} className={cn("flex items-center gap-1.5", config.className.split(" ")[0])}>
                  <span className={cn("inline-block w-2 h-2 rounded-full", key === "explorer" ? "bg-muted-foreground" : key === "pro" ? "bg-primary" : "bg-amber-400")} />
                  {config.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {appSections.map((section) => {
              const config = tierConfig[section.tier as keyof typeof tierConfig];
              return (
                <div
                  key={section.name}
                  className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className={cn("text-[10px]", config.className)}>
                      {config.label}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-foreground">{section.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 flex-1">{section.description}</p>
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
