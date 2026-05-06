import React, { useState, useMemo } from "react";
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
  ListChecks,
  FileText,
  ThumbsUp,
  Layers,
  Code,
  MessageSquare,
  ClipboardList,
  PlayCircle,
  GitCompare,
  FileImage,
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
  Account: "dashboard",
  Flashcards: "flashcards",
  Cheatsheets: "cheatsheets",
  DosAndDonts: "dos-and-donts",
  ExamChecklist: "exam-checklist",
  DAXTemplates: "dax-templates",
  Reviews: "reviews",
  StudyPlan: "study-plan",
  InteractiveLessons: "interactive-lessons",
  ConceptComparisons: "concept-comparisons",
  PageSummaries: "page-summaries",
};

// All navigable items with their icons — tier assignment comes from DB
const allNavItems: { name: string; page: string; icon: any; sectionKey: string }[] = [
  { name: "Exam Syllabus", page: "Syllabus", icon: BookOpen, sectionKey: "syllabus" },
  { name: "Microsoft Modules", page: "LearnModules", icon: GraduationCap, sectionKey: "learn-modules" },
  { name: "YouTube Playlists", page: "YouTubePlaylists", icon: Youtube, sectionKey: "youtube-playlists" },
  { name: "Exam Prep Videos", page: "ExamPrepVideos", icon: Video, sectionKey: "exam-prep-videos" },
  { name: "Pricing", page: "Pricing", icon: CreditCard, sectionKey: "pricing" },
  { name: "Key Terms & Features", page: "KeyTerms", icon: BookMarked, sectionKey: "key-terms" },
  { name: "Exam Scenarios", page: "ExamScenarios", icon: Lightbulb, sectionKey: "exam-scenarios" },
  { name: "Topic Assessments", page: "Assessment", icon: Brain, sectionKey: "assessment" },
  { name: "Flashcards", page: "Flashcards", icon: Layers, sectionKey: "flashcards" },
  { name: "Cheat Sheets", page: "Cheatsheets", icon: FileText, sectionKey: "cheatsheets" },
  { name: "Dos & Don'ts", page: "DosAndDonts", icon: ThumbsUp, sectionKey: "dos-and-donts" },
  { name: "Exam Checklist", page: "ExamChecklist", icon: ListChecks, sectionKey: "exam-checklist" },
  { name: "DAX Templates", page: "DAXTemplates", icon: Code, sectionKey: "dax-templates" },
  { name: "Troubleshooting", page: "Troubleshooting", icon: AlertTriangle, sectionKey: "troubleshooting" },
  { name: "Decision Framework", page: "DecisionFramework", icon: GitBranch, sectionKey: "decision-framework" },
  { name: "Exam Simulations", page: "PracticeSets", icon: Brain, sectionKey: "practice-sets" },
  { name: "Student Reviews", page: "Reviews", icon: MessageSquare, sectionKey: "reviews" },
  { name: "Study Plan", page: "StudyPlan", icon: ClipboardList, sectionKey: "study-plan" },
  { name: "Interactive Lessons", page: "InteractiveLessons", icon: PlayCircle, sectionKey: "interactive-lessons" },
  { name: "Concept Comparisons", page: "ConceptComparisons", icon: GitCompare, sectionKey: "concept-comparisons" },
  { name: "Summary of a Page", page: "PageSummaries", icon: FileImage, sectionKey: "page-summaries" },
];

const profileItems = [
  { name: "Dashboard", page: "Dashboard", icon: LayoutDashboard },
  { name: "Badges", page: "Badges", icon: Trophy },
  { name: "My List", page: "MyList", icon: Heart },
  { name: "Account", page: "Account", icon: User },
];

const tierBadgeClass: Record<string, string> = {
  profile: "text-[hsl(0,0%,100%/0.7)] border-[hsl(0,0%,100%/0.2)]",
  explorer: "text-emerald-400 border-emerald-400/30",
  pro: "text-[hsl(var(--indigo-light))] border-[hsl(var(--indigo-light)/0.3)]",
  premium: "text-amber-400 border-amber-400/30",
};

const tierLabel: Record<string, string> = {
  profile: "Profile",
  explorer: "Free",
  pro: "Pro",
  premium: "★ Premium",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    profile: true,
    explorer: false,
    pro: false,
    premium: false,
  });

  // When the sidebar is re-expanded after being collapsed, reset groups so only Profile is open
  const handleToggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (!next) {
        setOpenGroups({ profile: true, explorer: false, pro: false, premium: false });
      }
      return next;
    });
  };
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.replace("/", "") || "Dashboard";
  const { user, isAdmin, profile, signOut, viewingAsUser, setViewingAsUser, simulatedTier, setSimulatedTier } = useAuth();
  const { canAccess, isVisible, sections } = useSectionAccess();
  const isTrueAdmin = isAdmin || viewingAsUser;

  // Build dynamic tier groups from DB section_access data
  const dynamicTierGroups = useMemo(() => {
    // Profile group is always static
    const groups: { tier: string; label: string; badgeClass: string; items: typeof profileItems }[] = [
      { tier: "profile", label: tierLabel.profile, badgeClass: tierBadgeClass.profile, items: profileItems },
    ];

    // Bucket nav items by their DB-assigned tier, respecting sort_order
    const buckets: Record<string, typeof allNavItems> = { explorer: [], pro: [], premium: [] };
    for (const item of allNavItems) {
      const dbSection = sections.find((s) => s.section_key === item.sectionKey);
      const tier = dbSection?.required_tier || "explorer";
      buckets[tier].push(item);
    }

    // Sort items within each bucket by DB sort_order
    const getSortOrder = (sectionKey: string) => {
      const s = sections.find((sec) => sec.section_key === sectionKey);
      return s?.sort_order ?? 999;
    };

    for (const tier of ["explorer", "pro", "premium"] as const) {
      buckets[tier].sort((a, b) => getSortOrder(a.sectionKey) - getSortOrder(b.sectionKey));
      if (buckets[tier].length > 0) {
        groups.push({
          tier,
          label: tierLabel[tier],
          badgeClass: tierBadgeClass[tier],
          items: buckets[tier].map((i) => ({ name: i.name, page: i.page, icon: i.icon })),
        });
      }
    }
    return groups;
  }, [sections]);

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
              <p className="text-[10px] text-[hsl(var(--indigo-light)/0.6)]">Skills measured as of April 20, 2026</p>
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
          {dynamicTierGroups.map((group) => {
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

        {/* Disclaimer link */}
        <div className="px-3 pb-2">
          <Link
            to="/Disclaimer"
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-2 rounded-lg text-[hsl(var(--indigo-light)/0.7)] hover:text-[hsl(0,0%,100%)] hover:bg-[hsl(0,0%,100%/0.08)] transition-colors",
              collapsed ? "justify-center p-2.5" : "px-3 py-2 text-xs"
            )}
            title="Disclaimer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {!collapsed && <span>Disclaimer · Cancel anytime · Not endorsed by Microsoft</span>}
          </Link>
        </div>

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
