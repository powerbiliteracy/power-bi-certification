import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { interactiveLessons, type InteractiveLesson } from "@/data/interactiveLessons";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import ContentUpdateBanner from "@/components/ContentUpdateBanner";
import { cn } from "@/lib/utils";

interface Module {
  title: string;
  slugs: string[];
}

interface Domain {
  name: string;
  modules: Module[];
}

// Official PL-300 syllabus structure mapped to lesson slugs
const SYLLABUS: Domain[] = [
  {
    name: "Prepare the data",
    modules: [
      {
        title: "Get or connect to data",
        slugs: ["data-sources", "settings-credentials-privacy", "directquery-import", "parameters"],
      },
      {
        title: "Profile and clean the data",
        slugs: ["evaluate-data", "resolve-inconsistencies", "resolve-import-errors"],
      },
      {
        title: "Transform and load the data",
        slugs: [
          "column-data-types",
          "group-aggregate-rows",
          "semi-structured-data",
          "fact-dimension-tables",
          "reference-duplicate-queries",
          "merge-append-queries",
          "configure-data-loading",
        ],
      },
    ],
  },
  {
    name: "Model the data",
    modules: [
      {
        title: "Design and implement a data model",
        slugs: [
          "role-playing-dimensions",
          "cardinality-cross-filter",
          "common-date-table",
          "calculated-columns-tables",
        ],
      },
      {
        title: "Create model calculations by using DAX",
        slugs: [
          "calculate-function",
          "time-intelligence-measures",
          "semi-additive-measures",
          "quick-measures",
          "calculation-groups",
          "visual-calculations-dax",
        ],
      },
      {
        title: "Optimize model performance",
        slugs: ["optimize-rows-columns", "performance-analyzer", "reduce-granularity"],
      },
    ],
  },
  {
    name: "Visualize and analyze",
    modules: [
      {
        title: "Create reports",
        slugs: [
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
          "dashboards",
        ],
      },
      {
        title: "Enhance reports for usability and storytelling",
        slugs: [
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
        ],
      },
      {
        title: "Identify patterns and trends",
        slugs: [
          "analyze-feature",
          "grouping-binning",
          "ai-visuals",
          "reference-lines",
          "outliers-anomalies",
          "copilot-summarize-model",
        ],
      },
    ],
  },
  {
    name: "Manage and secure Power BI",
    modules: [
      {
        title: "Create and manage workspaces and assets",
        slugs: [
          "workspace",
          "workspace-app",
          "publish-import",
          "manage-publish",
          "distribution",
          "subscriptions-alerts",
          "promote-certify",
          "gateway",
          "semantic-refresh",
        ],
      },
      {
        title: "Secure and govern Power BI items",
        slugs: [
          "workspace-roles",
          "item-level-access",
          "semantic-model-access",
          "rls-roles",
          "rls-groups",
          "dynamic-rls",
          "sensitivity-labels",
        ],
      },
    ],
  },
];

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

  const lessonBySlug = new Map(interactiveLessons.map((l) => [l.slug, l]));
  const orphans: InteractiveLesson[] = interactiveLessons.filter(
    (l) => !SYLLABUS.some((d) => d.modules.some((m) => m.slugs.includes(l.slug)))
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
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
          <SyllabusSyncButton
            sectionLabel="Interactive Lessons"
            sectionKey="interactive-lessons"
            itemType="lesson"
            progressItemTypes={["lesson", "syllabus_topic"]}
            corpus={interactiveLessons.map(l => `${l.title} ${l.description}`)}
            itemCount={interactiveLessons.length}
          />
        </div>
      </div>

      <ContentUpdateBanner sectionKey="interactive-lessons" />

      {SYLLABUS.map((domain) => {
        const domainLessonCount = domain.modules.reduce(
          (sum, m) => sum + m.slugs.filter((s) => lessonBySlug.has(s)).length,
          0
        );
        return (
          <section key={domain.name} className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">{domain.name}</h2>
              <Badge variant="outline" className="text-xs">
                {domainLessonCount} lesson{domainLessonCount !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Accordion type="multiple" className="space-y-2">
              {domain.modules.map((module, idx) => {
                const lessons = module.slugs
                  .map((s) => lessonBySlug.get(s))
                  .filter((l): l is InteractiveLesson => Boolean(l));
                if (lessons.length === 0) return null;
                return (
                  <AccordionItem
                    key={module.title}
                    value={`${domain.name}-${idx}`}
                    className="border border-border rounded-xl bg-card px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <span className="font-medium text-foreground">{module.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {lessons.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-2 pb-2">
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
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        );
      })}

      {orphans.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Other lessons</h2>
            <Badge variant="outline" className="text-xs">
              {orphans.length} lesson{orphans.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orphans.map((l) => (
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
      )}
    </div>
  );
}
