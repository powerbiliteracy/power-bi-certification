import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { pl300Syllabus } from "@/data/SyllabusData";
import { useBadges, getBadgeEmoji } from "@/hooks/useBadges";
import {
  Zap,
  Target,
  BookOpen,
  Brain,
  ChevronRight,
  Database,
  LineChart,
  Eye,
  Shield,
  Trophy,
} from "lucide-react";

const domainIcons: Record<string, React.ElementType> = {
  prepare_data: Database,
  model_data: LineChart,
  visualize_analyze: Eye,
  deploy_maintain: Shield,
};

const domainGradients: Record<string, string> = {
  prepare_data: "from-blue-500 to-cyan-400",
  model_data: "from-violet-500 to-pink-400",
  visualize_analyze: "from-amber-500 to-orange-400",
  deploy_maintain: "from-emerald-500 to-teal-400",
};

export default function Dashboard() {
  const { badges, earnedBadges } = useBadges();
  const recentBadges = earnedBadges.slice(-3).reverse();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your PL-300 exam preparation progress</p>
        </div>
        <Link to={createPageUrl("Assessment")}>
          <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2 shadow-lg shadow-primary/20">
            <Target className="w-4 h-4" /> Take Assessment
          </Button>
        </Link>
      </div>

      {/* Exam Overview */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">PL-300 Exam Overview</h2>
            <p className="text-xs text-muted-foreground">Skills measured as of {pl300Syllabus.examInfo.lastUpdated}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Exam Code", value: pl300Syllabus.examInfo.code },
            { label: "Passing Score", value: pl300Syllabus.examInfo.passingScore },
            { label: "Questions", value: pl300Syllabus.examInfo.questionCount },
            { label: "Duration", value: pl300Syllabus.examInfo.duration },
          ].map((item) => (
            <div key={item.label} className="bg-secondary/50 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Exam Domains</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {pl300Syllabus.domains.map((domain) => {
            const Icon = domainIcons[domain.id] || BookOpen;
            const gradient = domainGradients[domain.id] || "from-primary to-accent";
            const totalTopics = domain.sections.reduce((sum, s) => sum + s.topics.length, 0);

            return (
              <Link
                key={domain.id}
                to={`${createPageUrl("Syllabus")}?domain=${domain.id}`}
                className="group bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-foreground">{domain.title}</h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {domain.weight} · {totalTopics} topics · {domain.sections.length} sections
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-chart-5" />
            <h2 className="font-semibold text-foreground">Badges</h2>
            <span className="text-xs text-muted-foreground">{earnedBadges.length}/{badges.length} earned</span>
          </div>
          <Link to={createPageUrl("Badges")} className="text-xs text-primary hover:underline font-medium">View All →</Link>
        </div>
        {recentBadges.length > 0 ? (
          <div className="flex gap-3 flex-wrap">
            {recentBadges.map((ub) => (
              <div key={ub.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/20">
                <span className="text-lg">{getBadgeEmoji(ub.badge?.icon || "trophy")}</span>
                <span className="text-sm font-medium text-foreground">{ub.badge?.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Complete sections to earn your first badge!</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6">
        <h2 className="font-semibold text-foreground mb-3">Quick Start</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Link to={createPageUrl("Syllabus")} className="flex items-center gap-3 p-3 bg-card rounded-xl hover:shadow-md transition-all border border-border">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Study Syllabus</span>
          </Link>
          <Link to={createPageUrl("Assessment")} className="flex items-center gap-3 p-3 bg-card rounded-xl hover:shadow-md transition-all border border-border">
            <Brain className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-foreground">Practice Assessment</span>
          </Link>
          <Link to={createPageUrl("PracticeSets")} className="flex items-center gap-3 p-3 bg-card rounded-xl hover:shadow-md transition-all border border-border">
            <Zap className="w-5 h-5 text-chart-5" />
            <span className="text-sm font-medium text-foreground">Practice Sets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
