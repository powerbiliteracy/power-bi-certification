import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { interactiveLessons } from "@/data/interactiveLessons";
import { cn } from "@/lib/utils";

export default function InteractiveLessons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get("lesson");
  const [fullscreen, setFullscreen] = useState(false);
  const lesson = interactiveLessons.find((l) => l.slug === slug);

  if (lesson) {
    return (
      <div className={cn("space-y-4", fullscreen && "fixed inset-0 z-50 bg-background p-4 overflow-auto")}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => setSearchParams({})}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to lessons
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setFullscreen((f) => !f)}>
              {fullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Maximize2 className="w-4 h-4 mr-2" />}
              {fullscreen ? "Exit fullscreen" : "Fullscreen"}
            </Button>
            <a href={lesson.file} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in new tab
              </Button>
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
        </div>
        <div className="rounded-xl border border-border overflow-hidden bg-background">
          <iframe
            src={lesson.file}
            title={lesson.title}
            className="w-full"
            style={{ height: fullscreen ? "calc(100vh - 200px)" : "calc(100vh - 280px)", minHeight: 600 }}
          />
        </div>
      </div>
    );
  }

  // Official PL-300 exam syllabus order
  const domainOrder = [
    "Prepare the data",
    "Model the data",
    "Visualize and analyze",
    "Deploy and maintain",
  ];

  // Slug order within each domain, following the syllabus topic order
  const slugOrder: string[] = [
    // Prepare the data
    "data-sources",
    "settings-credentials-privacy",
    "directquery-import",
    "parameters",
    "resolve-import-errors",
    "column-data-types",
    "group-aggregate-rows",
    "semi-structured-data",
    "fact-dimension-tables",
    "reference-duplicate-queries",
    "merge-append-queries",
    "configure-data-loading",
    // Model the data
    "role-playing-dimensions",
    "cardinality-cross-filter",
    "common-date-table",
    "calculated-columns-tables",
    "calculate-function",
    "time-intelligence-measures",
    "semi-additive-measures",
    "quick-measures",
    "calculation-groups",
    "optimize-rows-columns",
    "performance-analyzer",
    "reduce-granularity",
    "visual-calculations-dax",
    // Visualize and analyze
    "select-appropriate-visual",
    "format-configure-visuals",
    "narrative-copilot",
    "apply-customize-theme",
    "apply-conditional-formatting",
    "apply-slicing-filtering",
    "copilot-report-page",
    "copilot-suggest-content",
    "configure-report-page",
    "paginated-reports",
    "configure-bookmarks",
    "custom-tooltips",
    "visual-interactions",
    "report-navigation",
    "apply-sorting",
    "sync-slicers",
    "selection-pane",
    "drill-through",
    "export-settings",
    "mobile-design",
    "personalized-visuals",
    "accessibility",
    "auto-refresh",
    "analyze-feature",
    "grouping-binning",
    "ai-visuals",
    "reference-lines",
    "outliers-anomalies",
    "copilot-summarize-model",
    "dashboards",
    // Deploy and maintain
    "workspace",
    "workspace-app",
    "publish-import",
    "manage-publish",
    "distribution",
    "subscriptions-alerts",
    "promote-certify",
    "gateway",
    "semantic-refresh",
    "workspace-roles",
    "item-level-access",
    "semantic-model-access",
    "rls-roles",
    "rls-groups",
    "dynamic-rls",
    "sensitivity-labels",
  ];

  const slugIndex = (s: string) => {
    const i = slugOrder.indexOf(s);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };

  // Group by domain and sort
  const groups = interactiveLessons.reduce<Record<string, typeof interactiveLessons>>((acc, l) => {
    (acc[l.domain] ||= []).push(l);
    return acc;
  }, {});

  Object.values(groups).forEach((arr) => arr.sort((a, b) => slugIndex(a.slug) - slugIndex(b.slug)));

  const sortedDomains = Object.keys(groups).sort(
    (a, b) => domainOrder.indexOf(a) - domainOrder.indexOf(b)
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--violet))] flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Interactive Lessons</h1>
            <p className="text-muted-foreground">
              Hands-on, scenario-driven walkthroughs for the trickiest PL-300 skills.
            </p>
          </div>
        </div>
      </div>

      {sortedDomains.map((domain) => {
        const lessons = groups[domain];
        return (
        <section key={domain} className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">{domain}</h2>
            <Badge variant="outline" className="text-xs">
              {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((l) => (
              <Link key={l.slug} to={`/InteractiveLessons?lesson=${l.slug}`}>
                <Card
                  className={cn(
                    "p-5 h-full bg-gradient-to-br hover:scale-[1.02] transition-transform cursor-pointer",
                    l.accent
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-background/50 backdrop-blur flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground leading-snug">{l.title}</h3>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{l.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
