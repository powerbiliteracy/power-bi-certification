import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";
import { pl300Syllabus } from "@/data/SyllabusData";
import { useBadges, getBadgeEmoji } from "@/hooks/useBadges";
import { useSectionAccess } from "@/hooks/useSectionAccess";
import { useAuth } from "@/hooks/useAuth";
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
  CheckCircle2,
  Lock,
  GraduationCap,
  Youtube,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

interface ProgressItem {
  label: string;
  page: string;
  completed: number;
  total: number;
  icon: React.ElementType;
  tier: string;
  locked: boolean;
}

function getLocalStorageSet(key: string): Set<string> {
  try {
    const stored = localStorage.getItem(key);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch { return new Set(); }
}

function getLocalStorageArray(key: string): any[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch { return []; }
}

export default function Dashboard() {
  const { badges, earnedBadges } = useBadges();
  const { canAccess, getRequiredTier } = useSectionAccess();
  const { profile } = useAuth();
  useProgress(); // Syncs localStorage progress to DB for admin visibility
  const recentBadges = earnedBadges.slice(-3).reverse();
  const [announcements, setAnnouncements] = useState<{ id: string; title: string; message: string; type: string }[]>([]);

  useEffect(() => {
    supabase.from("announcements").select("id, title, message, type").eq("is_active", true).then(({ data }) => {
      if (data) setAnnouncements(data);
    });
  }, []);

  const progressItems = useMemo<ProgressItem[]>(() => {
    const syllabusTopics = pl300Syllabus.domains.flatMap(d => d.sections.flatMap(s => s.topics));
    const completedTopics = getLocalStorageSet("pl300-completed-topics");
    const completedScenarios = getLocalStorageSet("exam-scenarios-completed");
    const completedTroubleshooting = getLocalStorageSet("troubleshooting-completed");
    const completedPracticeSets = getLocalStorageArray("completed_practice_sets");
    const completedModules = getLocalStorageArray("learn-modules-completed");
    const completedYouTube = getLocalStorageArray("youtube-playlists-completed");
    const completedPrepVideos = getLocalStorageArray("exam-prep-videos-completed");

    return [
      {
        label: "Exam Syllabus",
        page: "Syllabus",
        completed: syllabusTopics.filter(t => completedTopics.has(t)).length,
        total: syllabusTopics.length,
        icon: BookOpen,
        tier: getRequiredTier("syllabus"),
        locked: !canAccess("syllabus"),
      },
      {
        label: "Microsoft Modules",
        page: "LearnModules",
        completed: completedModules.length,
        total: 5,
        icon: GraduationCap,
        tier: getRequiredTier("learn-modules"),
        locked: !canAccess("learn-modules"),
      },
      {
        label: "YouTube Playlists",
        page: "YouTubePlaylists",
        completed: completedYouTube.length,
        total: 4,
        icon: Youtube,
        tier: getRequiredTier("youtube-playlists"),
        locked: !canAccess("youtube-playlists"),
      },
      {
        label: "Exam Prep Videos",
        page: "ExamPrepVideos",
        completed: completedPrepVideos.length,
        total: 4,
        icon: Video,
        tier: getRequiredTier("exam-prep-videos"),
        locked: !canAccess("exam-prep-videos"),
      },
      {
        label: "Exam Scenarios",
        page: "ExamScenarios",
        completed: completedScenarios.size,
        total: 40,
        icon: Target,
        tier: getRequiredTier("exam-scenarios"),
        locked: !canAccess("exam-scenarios"),
      },
      {
        label: "Troubleshooting",
        page: "Troubleshooting",
        completed: completedTroubleshooting.size,
        total: 30,
        icon: Shield,
        tier: getRequiredTier("troubleshooting"),
        locked: !canAccess("troubleshooting"),
      },
      {
        label: "Exam Questions",
        page: "PracticeSets",
        completed: completedPracticeSets.length,
        total: 7,
        icon: Brain,
        tier: getRequiredTier("practice-sets"),
        locked: !canAccess("practice-sets"),
      },
    ];
  }, [canAccess, getRequiredTier]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Announcements */}
      {announcements.length > 0 && (
        <div className="space-y-3">
          {announcements.map((ann) => {
            const typeStyles: Record<string, string> = {
              info: "border-primary/30 bg-primary/5 text-primary",
              promo: "border-chart-5/30 bg-chart-5/5 text-chart-5",
              warning: "border-destructive/30 bg-destructive/5 text-destructive",
              update: "border-accent/30 bg-accent/5 text-accent-foreground",
            };
            const typeEmoji: Record<string, string> = { info: "ℹ️", promo: "🎉", warning: "⚠️", update: "🚀" };
            return (
              <div key={ann.id} className={`rounded-xl border p-4 ${typeStyles[ann.type] || typeStyles.info}`}>
                <p className="font-semibold text-sm">{typeEmoji[ann.type] || "📢"} {ann.title}</p>
                <p className="text-sm mt-1 opacity-80">{ann.message}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your PL-300 exam preparation progress</p>
        </div>
        {canAccess("assessment") ? (
          <Link to={createPageUrl("Assessment")}>
            <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2 shadow-lg shadow-primary/20">
              <Target className="w-4 h-4" /> Take Assessment
            </Button>
          </Link>
        ) : (
          <Link to={createPageUrl("Pricing")}>
            <Button variant="outline" className="rounded-xl gap-2">
              <Lock className="w-4 h-4" /> Upgrade to Assess
            </Button>
          </Link>
        )}
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

      {/* Progress Tracking */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Progress</h2>
          <Badge variant="outline" className="capitalize">{profile?.subscription_tier || "explorer"} tier</Badge>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {progressItems.filter(item => !item.locked).map((item) => {
            const pct = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.locked ? createPageUrl("Pricing") : createPageUrl(item.page)}
                className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{item.label}</h3>
                  </div>
                  {item.locked ? (
                    <Badge variant="outline" className="gap-1 text-xs"><Lock className="w-3 h-3" /> {item.tier}</Badge>
                  ) : item.tier !== "explorer" ? (
                    <Badge variant="outline" className="text-xs capitalize">{item.tier}</Badge>
                  ) : null}
                </div>
                {item.locked ? (
                  <p className="text-sm text-muted-foreground">Upgrade to {item.tier} to access</p>
                ) : (
                  <>
                    <Progress value={pct} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.completed}/{item.total} completed</span>
                      <span className="font-semibold text-foreground">{pct}%</span>
                    </div>
                  </>
                )}
              </Link>
            );
          })}
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
          {[
            { label: "Study Syllabus", page: "Syllabus", sectionKey: "syllabus", icon: BookOpen, color: "text-primary" },
            { label: "Topic Assessments", page: "Assessment", sectionKey: "assessment", icon: Brain, color: "text-accent" },
            { label: "Exam Questions", page: "PracticeSets", sectionKey: "practice-sets", icon: Zap, color: "text-chart-5" },
          ].map((link) => {
            const hasAccess = canAccess(link.sectionKey);
            return (
              <Link
                key={link.page}
                to={hasAccess ? createPageUrl(link.page) : createPageUrl("Pricing")}
                className="flex items-center gap-3 p-3 bg-card rounded-xl hover:shadow-md transition-all border border-border"
              >
                {hasAccess ? (
                  <link.icon className={cn("w-5 h-5", link.color)} />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
                <span className={cn("text-sm font-medium", hasAccess ? "text-foreground" : "text-muted-foreground")}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
