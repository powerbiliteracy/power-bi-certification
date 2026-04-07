import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/hooks/useAuth";
import { useSectionAccess } from "@/hooks/useSectionAccess";
import {
  LayoutDashboard,
  Brain,
  Trophy,
  BookOpen,
  Menu,
  X,
  Zap,
  ChevronRight,
  BookMarked,
  Video,
  GraduationCap,
  CreditCard,
  Lock,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  Youtube,
  Shield,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const sectionKeyMap: Record<string, string> = {
  Dashboard: "dashboard",
  Syllabus: "syllabus",
  Assessment: "assessment",
  KeyTerms: "key-terms",
  ExamPrepVideos: "exam-prep-videos",
  LearnModules: "learn-modules",
  Troubleshooting: "troubleshooting",
  ExamScenarios: "exam-scenarios",
  DecisionFramework: "decision-framework",
  YouTubePlaylists: "youtube-playlists",
  PracticeSets: "practice-sets",
  Badges: "badges",
  Pricing: "pricing",
};

const navItems = [
  { name: "Dashboard", page: "Dashboard", icon: LayoutDashboard },
  { name: "Exam Syllabus", page: "Syllabus", icon: BookOpen },
  { name: "Key Terms & Features", page: "KeyTerms", icon: BookMarked },
  { name: "Exam Prep Videos", page: "ExamPrepVideos", icon: Video },
  { name: "Learn Modules", page: "LearnModules", icon: GraduationCap },
  { name: "Troubleshooting", page: "Troubleshooting", icon: AlertTriangle },
  { name: "Exam Scenarios", page: "ExamScenarios", icon: Lightbulb },
  { name: "Decision Framework", page: "DecisionFramework", icon: GitBranch },
  { name: "YouTube Playlists", page: "YouTubePlaylists", icon: Youtube },
  { name: "Topic Assessments", page: "Assessment", icon: Brain },
  { name: "Exam Questions", page: "PracticeSets", icon: Brain },
  { name: "Badges", page: "Badges", icon: Trophy },
  { name: "Pricing", page: "Pricing", icon: CreditCard },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.replace("/", "") || "Dashboard";
  const { user, isAdmin, profile, signOut, loading } = useAuth();
  const { canAccess, getRequiredTier, isVisible, isAdminOnly } = useSectionAccess();

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[hsl(var(--navy))] flex flex-col transition-transform duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-[hsl(var(--indigo-light)/0.15)]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--violet))] flex items-center justify-center shadow-lg shadow-[hsl(var(--indigo)/0.3)]">
            <Zap className="w-5 h-5 text-[hsl(0,0%,100%)]" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-[hsl(0,0%,100%)]">PL-300 Coach</h1>
            <p className="text-xs text-[hsl(var(--indigo-light))]">Power BI Data Analyst</p>
          </div>
          <button
            className="ml-auto lg:hidden text-[hsl(0,0%,100%/0.6)] hover:text-[hsl(0,0%,100%)]"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            const sectionKey = sectionKeyMap[item.page];
            const hasAccess = canAccess(sectionKey);
            const requiredTier = getRequiredTier(sectionKey);
            const adminOnly = isAdminOnly(sectionKey);

            // Hide admin-only sections from non-admins
            if (!isVisible(sectionKey)) return null;

            return (
              <Link
                key={item.page}
                to={hasAccess ? createPageUrl(item.page) : "#"}
                onClick={(e) => {
                  if (!hasAccess) {
                    e.preventDefault();
                    navigate("/Pricing");
                  }
                  setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[hsl(0,0%,100%/0.15)] text-[hsl(0,0%,100%)] shadow-lg shadow-[hsl(0,0%,0%/0.1)]"
                    : hasAccess
                      ? "text-[hsl(var(--indigo-light))] hover:bg-[hsl(0,0%,100%/0.08)] hover:text-[hsl(0,0%,100%)]"
                      : "text-[hsl(var(--indigo-light)/0.4)] cursor-not-allowed"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-[hsl(var(--indigo-light))]")} />
                <span className="flex-1">{item.name}</span>
                {!hasAccess && <Lock className="w-3.5 h-3.5 text-[hsl(var(--indigo-light)/0.5)]" />}
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] border-[hsl(var(--indigo-light)/0.3)]",
                    adminOnly
                      ? "text-red-400 border-red-400/30"
                      : requiredTier === "premium"
                      ? "text-amber-400 border-amber-400/30"
                      : requiredTier === "pro"
                      ? "text-[hsl(var(--indigo-light))] border-[hsl(var(--indigo-light)/0.3)]"
                      : "text-[hsl(var(--indigo-light)/0.4)] border-[hsl(var(--indigo-light)/0.15)]"
                  )}
                >
                  {adminOnly ? "🔒 Admin" : requiredTier === "premium" ? "★ Premium" : requiredTier === "pro" ? "Pro" : "Free"}
                </Badge>
                {isActive && <ChevronRight className="w-4 h-4 text-[hsl(var(--indigo-light))]" />}
              </Link>
            );
          })}

          {isAdmin && (
            <>
              <div className="border-t border-[hsl(var(--indigo-light)/0.15)] my-3" />
              <Link
                to="/Admin"
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  currentPage === "Admin"
                    ? "bg-[hsl(0,0%,100%/0.15)] text-[hsl(0,0%,100%)]"
                    : "text-amber-400 hover:bg-[hsl(0,0%,100%/0.08)]"
                )}
              >
                <Shield className="w-5 h-5" />
                <span className="flex-1">Admin Panel</span>
              </Link>
            </>
          )}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-[hsl(var(--indigo-light)/0.15)]">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-2">
                <User className="w-4 h-4 text-[hsl(var(--indigo-light))]" />
                <span className="text-xs text-[hsl(0,0%,100%)] truncate flex-1">
                  {profile?.display_name || user.email}
                </span>
                <Badge variant="outline" className="text-[10px] capitalize border-[hsl(var(--indigo-light)/0.3)] text-[hsl(var(--indigo-light))]">
                  {profile?.subscription_tier || "explorer"}
                </Badge>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 w-full rounded-lg text-xs text-[hsl(var(--indigo-light)/0.7)] hover:text-[hsl(0,0%,100%)] hover:bg-[hsl(0,0%,100%/0.08)] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[hsl(var(--indigo-light))] hover:bg-[hsl(0,0%,100%/0.08)] hover:text-[hsl(0,0%,100%)] transition-all"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/60 px-6 py-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </header>
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
