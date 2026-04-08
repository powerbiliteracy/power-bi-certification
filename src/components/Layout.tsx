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
  ChevronDown,
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
  Heart,
  Eye,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  MyList: "my-list",
};

const tierGroups = [
  {
    tier: "explorer" as const,
    label: "Explorer (Free)",
    badgeClass: "text-emerald-400 border-emerald-400/30",
    items: [
      { name: "Dashboard", page: "Dashboard", icon: LayoutDashboard },
      { name: "Badges", page: "Badges", icon: Trophy },
      { name: "Pricing", page: "Pricing", icon: CreditCard },
      { name: "Exam Syllabus", page: "Syllabus", icon: BookOpen },
      { name: "Exam Prep Videos", page: "ExamPrepVideos", icon: Video },
      { name: "Learn Modules", page: "LearnModules", icon: GraduationCap },
      { name: "YouTube Playlists", page: "YouTubePlaylists", icon: Youtube },
      { name: "My List", page: "MyList", icon: Heart },
    ],
  },
  {
    tier: "pro" as const,
    label: "Pro",
    badgeClass: "text-[hsl(var(--indigo-light))] border-[hsl(var(--indigo-light)/0.3)]",
    items: [
      { name: "Key Terms & Features", page: "KeyTerms", icon: BookMarked },
      { name: "Exam Scenarios", page: "ExamScenarios", icon: Lightbulb },
      { name: "Topic Assessments", page: "Assessment", icon: Brain },
    ],
  },
  {
    tier: "premium" as const,
    label: "★ Premium",
    badgeClass: "text-amber-400 border-amber-400/30",
    items: [
      { name: "Troubleshooting", page: "Troubleshooting", icon: AlertTriangle },
      { name: "Decision Framework", page: "DecisionFramework", icon: GitBranch },
      { name: "Exam Questions", page: "PracticeSets", icon: Brain },
    ],
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    explorer: true,
    pro: true,
    premium: true,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.replace("/", "") || "Dashboard";
  const { user, isAdmin, profile, signOut, viewingAsUser, setViewingAsUser, simulatedTier, setSimulatedTier } = useAuth();
  const { canAccess, getRequiredTier, isVisible, isAdminOnly } = useSectionAccess();
  const isTrueAdmin = isAdmin || viewingAsUser;

  const toggleGroup = (tier: string) => {
    setOpenGroups((prev) => ({ ...prev, [tier]: !prev[tier] }));
  };

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
          "fixed lg:sticky top-0 left-0 z-50 h-screen bg-[hsl(var(--navy))] flex flex-col transition-all duration-300 ease-out",
          collapsed ? "w-16" : "w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-3 border-b border-[hsl(var(--indigo-light)/0.15)]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--violet))] flex items-center justify-center shadow-lg shadow-[hsl(var(--indigo)/0.3)] flex-shrink-0">
            <Zap className="w-5 h-5 text-[hsl(0,0%,100%)]" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-lg tracking-tight text-[hsl(0,0%,100%)]">PL-300 Coach</h1>
              <p className="text-xs text-[hsl(var(--indigo-light))]">Power BI Data Analyst</p>
            </div>
          )}
          <button
            className="ml-auto lg:hidden text-[hsl(0,0%,100%/0.6)] hover:text-[hsl(0,0%,100%)]"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapse toggle - desktop only */}
        <div className="hidden lg:flex justify-end px-2 py-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-[hsl(var(--indigo-light)/0.6)] hover:text-[hsl(0,0%,100%)] hover:bg-[hsl(0,0%,100%/0.08)] transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {tierGroups.map((group) => {
            // Check if any item in this group is visible
            const visibleItems = group.items.filter((item) => {
              const sectionKey = sectionKeyMap[item.page];
              return isVisible(sectionKey);
            });
            if (visibleItems.length === 0) return null;

            if (collapsed) {
              // In collapsed mode, just show icons
              return (
                <div key={group.tier} className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const isActive = currentPage === item.page;
                    const sectionKey = sectionKeyMap[item.page];
                    const hasAccess = canAccess(sectionKey);
                    return (
                      <Link
                        key={item.page}
                        to={hasAccess ? createPageUrl(item.page) : "#"}
                        onClick={(e) => {
                          if (!hasAccess) { e.preventDefault(); navigate("/Pricing"); }
                          setSidebarOpen(false);
                        }}
                        title={item.name}
                        className={cn(
                          "flex items-center justify-center p-3 rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-[hsl(0,0%,100%/0.15)] text-[hsl(0,0%,100%)]"
                            : hasAccess
                              ? "text-[hsl(var(--indigo-light))] hover:bg-[hsl(0,0%,100%/0.08)] hover:text-[hsl(0,0%,100%)]"
                              : "text-[hsl(var(--indigo-light)/0.4)] cursor-not-allowed"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                      </Link>
                    );
                  })}
                  <div className="border-b border-[hsl(var(--indigo-light)/0.1)] my-1" />
                </div>
              );
            }

            return (
              <Collapsible
                key={group.tier}
                open={openGroups[group.tier]}
                onOpenChange={() => toggleGroup(group.tier)}
              >
                <CollapsibleTrigger className="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[hsl(var(--indigo-light)/0.5)] hover:text-[hsl(var(--indigo-light))] transition-colors">
                  <ChevronDown className={cn("w-3 h-3 transition-transform", !openGroups[group.tier] && "-rotate-90")} />
                  <span className="flex-1 text-left">{group.label}</span>
                  <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0", group.badgeClass)}>
                    {visibleItems.length}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-0.5 mt-0.5">
                  {visibleItems.map((item) => {
                    const isActive = currentPage === item.page;
                    const sectionKey = sectionKeyMap[item.page];
                    const hasAccess = canAccess(sectionKey);

                    return (
                      <Link
                        key={item.page}
                        to={hasAccess ? createPageUrl(item.page) : "#"}
                        onClick={(e) => {
                          if (!hasAccess) { e.preventDefault(); navigate("/Pricing"); }
                          setSidebarOpen(false);
                        }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-[hsl(0,0%,100%/0.15)] text-[hsl(0,0%,100%)] shadow-lg shadow-[hsl(0,0%,0%/0.1)]"
                            : hasAccess
                              ? "text-[hsl(var(--indigo-light))] hover:bg-[hsl(0,0%,100%/0.08)] hover:text-[hsl(0,0%,100%)]"
                              : "text-[hsl(var(--indigo-light)/0.4)] cursor-not-allowed"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4", isActive && "text-[hsl(var(--indigo-light))]")} />
                        <span className="flex-1">{item.name}</span>
                        {!hasAccess && <Lock className="w-3.5 h-3.5 text-[hsl(var(--indigo-light)/0.5)]" />}
                        {isActive && <ChevronRight className="w-4 h-4 text-[hsl(var(--indigo-light))]" />}
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}

          {isAdmin && !collapsed && (
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
          {isAdmin && collapsed && (
            <Link
              to="/Admin"
              onClick={() => setSidebarOpen(false)}
              title="Admin Panel"
              className={cn(
                "flex items-center justify-center p-3 rounded-xl transition-all duration-200",
                currentPage === "Admin"
                  ? "bg-[hsl(0,0%,100%/0.15)] text-[hsl(0,0%,100%)]"
                  : "text-amber-400 hover:bg-[hsl(0,0%,100%/0.08)]"
              )}
            >
              <Shield className="w-5 h-5" />
            </Link>
          )}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-[hsl(var(--indigo-light)/0.15)]">
          {user ? (
            <div className="space-y-2">
              {!collapsed && (
                <div className="flex items-center gap-2 px-2">
                  <User className="w-4 h-4 text-[hsl(var(--indigo-light))]" />
                  <span className="text-xs text-[hsl(0,0%,100%)] truncate flex-1">
                    {profile?.display_name || user.email}
                  </span>
                  <Badge variant="outline" className="text-[10px] capitalize border-[hsl(var(--indigo-light)/0.3)] text-[hsl(var(--indigo-light))]">
                    {profile?.subscription_tier || "explorer"}
                  </Badge>
                </div>
              )}
              <button
                onClick={signOut}
                className={cn(
                  "flex items-center gap-2 w-full rounded-lg text-xs text-[hsl(var(--indigo-light)/0.7)] hover:text-[hsl(0,0%,100%)] hover:bg-[hsl(0,0%,100%/0.08)] transition-colors",
                  collapsed ? "justify-center p-3" : "px-4 py-2"
                )}
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                {!collapsed && "Sign Out"}
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className={cn(
                "flex items-center gap-2 rounded-xl text-sm font-medium text-[hsl(var(--indigo-light))] hover:bg-[hsl(0,0%,100%/0.08)] hover:text-[hsl(0,0%,100%)] transition-all",
                collapsed ? "justify-center p-3" : "px-4 py-3"
              )}
            >
              <LogIn className="w-5 h-5" />
              {!collapsed && <span>Sign In</span>}
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
        {isTrueAdmin && (viewingAsUser || simulatedTier) && (
          <div className="sticky top-0 z-40 bg-amber-500/90 backdrop-blur text-amber-950 px-4 py-2 flex items-center justify-center gap-4 text-sm font-medium">
            <Eye className="w-4 h-4" />
            <span>Viewing as: <strong>{simulatedTier || profile?.subscription_tier || "explorer"}</strong> tier user</span>
            <button
              onClick={() => { setViewingAsUser(false); setSimulatedTier(null); }}
              className="px-3 py-1 rounded bg-amber-950/20 hover:bg-amber-950/30 transition-colors text-xs font-semibold"
            >
              Exit Preview
            </button>
          </div>
        )}
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
