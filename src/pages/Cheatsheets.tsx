import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FavoriteButton from "@/components/FavoriteButton";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import ContentUpdateBanner from "@/components/ContentUpdateBanner";
import { prepareDataContent } from "@/data/content/PrepareDataContent";
import { modelDataContent } from "@/data/content/ModelDataContent";
import { visualizationTopicsContent } from "@/data/content/VisualizationTopicsContent";
import { copilotAndDAXContent } from "@/data/content/CopilotAndDAXContent";
import { interactionAndNavigationContent } from "@/data/content/InteractionAndNavigationContent";
import { remainingTopicsContent } from "@/data/content/RemainingTopicsContent";
import { enhanceReportsContent } from "@/data/content/EnhanceReportsContent";
import { advancedReportDesignContent } from "@/data/content/AdvancedReportDesignContent";
import { analyticsAndInsightsContent } from "@/data/content/AnalyticsAndInsightsContent";
import { manageSecureCompletionContent } from "@/data/content/ManageSecureCompletionContent";
import { securityGovernanceContent } from "@/data/content/SecurityGovernanceContent";
import { similarity } from "@/utils/syllabusSync";

// Combine all available content into a single lookup so we can match each
// official syllabus topic to the best available content card.
const ALL_CONTENT: Record<string, any> = {
  ...prepareDataContent,
  ...modelDataContent,
  ...visualizationTopicsContent,
  ...copilotAndDAXContent,
  ...interactionAndNavigationContent,
  ...remainingTopicsContent,
  ...enhanceReportsContent,
  ...advancedReportDesignContent,
  ...analyticsAndInsightsContent,
  ...manageSecureCompletionContent,
  ...securityGovernanceContent,
};

// Official PL-300 syllabus structure (matches mem://reference/pl300-syllabus
// and src/data/SyllabusData.ts). Cheat Sheets is grouped exactly like this.
interface SyllabusModule {
  title: string;
  topics: string[];
}
interface SyllabusDomain {
  id: string;
  label: string;
  weight: string;
  color: string;
  modules: SyllabusModule[];
}

const PL300_STRUCTURE: SyllabusDomain[] = [
  {
    id: "prepare",
    label: "Prepare the data",
    weight: "25–30%",
    color: "text-amber-400",
    modules: [
      {
        title: "Get or connect to data",
        topics: [
          "Identify and connect to data sources or a shared semantic model",
          "Change data source settings, including credentials and privacy levels",
          "Choose between DirectLake, DirectQuery, and Import",
          "Create and modify parameters",
        ],
      },
      {
        title: "Profile and clean the data",
        topics: [
          "Evaluate data, including data statistics and column properties",
          "Resolve inconsistencies, unexpected or null values, and data quality issues",
          "Resolve data import errors",
        ],
      },
      {
        title: "Transform and load the data",
        topics: [
          "Select appropriate column data types",
          "Create and transform columns",
          "Group and aggregate rows",
          "Pivot, unpivot, and transpose data",
          "Convert semi-structured data to a table",
          "Create fact tables and dimension tables",
          "Identify when to use reference or duplicate queries and the resulting impact",
          "Merge and append queries",
          "Identify and create appropriate keys for relationships",
          "Configure data loading for queries",
        ],
      },
    ],
  },
  {
    id: "model",
    label: "Model the data",
    weight: "25–30%",
    color: "text-blue-400",
    modules: [
      {
        title: "Design and implement a data model",
        topics: [
          "Configure table and column properties",
          "Implement role-playing dimensions",
          "Define a relationship's cardinality and cross-filter direction",
          "Create a common date table",
          "Identify use cases for calculated columns and calculated tables",
        ],
      },
      {
        title: "Create model calculations by using DAX",
        topics: [
          "Create single aggregation measures",
          "Use the CALCULATE function",
          "Implement time intelligence measures",
          "Use basic statistical functions",
          "Create semi-additive measures",
          "Create a measure by using quick measures",
          "Create calculated tables or columns",
          "Create calculation groups",
        ],
      },
      {
        title: "Optimize model performance",
        topics: [
          "Improve performance by identifying and removing unnecessary rows and columns",
          "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view",
          "Improve performance by reducing granularity",
        ],
      },
    ],
  },
  {
    id: "visualize",
    label: "Visualize and analyze the data",
    weight: "25–30%",
    color: "text-emerald-400",
    modules: [
      {
        title: "Create reports",
        topics: [
          "Select an appropriate visual",
          "Format and configure visuals",
          "Create a narrative visual with Copilot",
          "Apply and customize a theme",
          "Apply conditional formatting",
          "Apply slicing and filtering",
          "Use Copilot to create a new report page",
          "Use Copilot to suggest content for a new report page",
          "Configure the report page",
          "Choose when to use a paginated report",
          "Create visual calculations by using DAX",
        ],
      },
      {
        title: "Enhance reports for usability and storytelling",
        topics: [
          "Configure bookmarks",
          "Create custom tooltips",
          "Edit and configure interactions between visuals",
          "Configure navigation for a report",
          "Apply sorting to visuals",
          "Configure sync slicers",
          "Group and layer visuals by using the Selection pane",
          "Configure drillthrough navigation, including pages, filters, and buttons",
          "Configure export settings",
          "Design reports for mobile devices",
          "Enable personalization in a report, including personalized visuals",
          "Design and configure Power BI reports for accessibility",
          "Configure automatic page refresh",
        ],
      },
      {
        title: "Identify patterns and trends",
        topics: [
          "Use the Analyze feature in Power BI",
          "Use grouping, binning, and clustering",
          "Use AI visuals",
          "Use reference lines, error bars, and forecasting",
          "Detect outliers and anomalies",
          "Use Copilot to summarize the underlying semantic model",
        ],
      },
    ],
  },
  {
    id: "manage",
    label: "Manage and secure Power BI",
    weight: "15–20%",
    color: "text-violet-400",
    modules: [
      {
        title: "Create and manage workspaces and assets",
        topics: [
          "Create and configure a workspace",
          "Configure and update an app",
          "Publish, import, or update items in a workspace",
          "Create dashboards",
          "Choose a distribution method",
          "Configure subscriptions and data alerts",
          "Promote or certify Power BI content",
          "Identify when a gateway is required",
          "Configure a semantic model scheduled refresh",
        ],
      },
      {
        title: "Secure and govern Power BI items",
        topics: [
          "Assign workspace roles",
          "Configure item-level access",
          "Configure access to semantic models",
          "Implement row-level security roles",
          "Configure row-level security group membership",
          "Apply sensitivity labels",
        ],
      },
    ],
  },
];

// Look up the best content match for an official syllabus topic across all
// available content sources (exact match first, then fuzzy).
function findContent(topic: string): any | null {
  if (ALL_CONTENT[topic]) return ALL_CONTENT[topic];
  let bestKey: string | null = null;
  let bestScore = 0;
  for (const key of Object.keys(ALL_CONTENT)) {
    const s = similarity(topic, key);
    if (s > bestScore) {
      bestScore = s;
      bestKey = key;
    }
  }
  return bestScore >= 0.5 && bestKey ? ALL_CONTENT[bestKey] : null;
}

function TopicCard({ title, content }: { title: string; content: any | null }) {
  const [expanded, setExpanded] = useState(false);
  const hasContent = !!content;
  return (
    <Card
      className={`${hasContent ? "cursor-pointer hover:border-primary/30" : "opacity-60"} transition-colors`}
      onClick={() => hasContent && setExpanded(!expanded)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between gap-2">
          <span className="flex-1">{title}</span>
          {hasContent ? (
            <Badge variant="outline" className="text-[10px]">{expanded ? "▲" : "▼"}</Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400">
              Not yet covered
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      {expanded && hasContent && (
        <CardContent className="space-y-4 text-sm">
          {content.overview?.concepts && (
            <div>
              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Key Concepts</h4>
              <ul className="space-y-1">
                {content.overview.concepts.map((c: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-primary">›</span>{c}</li>
                ))}
              </ul>
            </div>
          )}
          {content.bestPractices && (
            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Best Practices</h4>
              <ul className="space-y-1">
                {content.bestPractices.map((b: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-emerald-400">✓</span>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {content.commonMistakes && (
            <div>
              <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Common Mistakes</h4>
              <ul className="space-y-1">
                {content.commonMistakes.map((m: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-red-400">✗</span>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {content.examTips && (
            <div>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Exam Tips</h4>
              <ul className="space-y-1">
                {content.examTips.map((t: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-amber-400">💡</span>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default function Cheatsheets() {
  // Pre-resolve every topic in the syllabus to a content card (or null).
  const resolved = useMemo(() => {
    return PL300_STRUCTURE.map((d) => ({
      ...d,
      modules: d.modules.map((m) => ({
        ...m,
        items: m.topics.map((t) => ({ topic: t, content: findContent(t) })),
      })),
    }));
  }, []);

  // All topics across the syllabus — used by the sync button corpus.
  const allTopics = useMemo(
    () => PL300_STRUCTURE.flatMap((d) => d.modules.flatMap((m) => m.topics)),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">PL-300 Cheat Sheets</h1>
          <p className="text-sm text-muted-foreground">
            Quick reference aligned to the official PL-300 syllabus (April 2026)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton itemId="cheatsheets" itemType="page" />
          <SyllabusSyncButton
            sectionLabel="Cheat Sheets"
            sectionKey="cheatsheets"
            itemType="topic"
            corpus={allTopics}
            itemCount={allTopics.length}
          />
        </div>
      </div>

      <ContentUpdateBanner sectionKey="cheatsheets" />

      <Tabs defaultValue="prepare">
        <TabsList className="flex-wrap h-auto gap-1">
          {resolved.map((d) => (
            <TabsTrigger key={d.id} value={d.id} className="gap-1 text-xs">
              <span className={d.color}>●</span> {d.label}
              <Badge variant="outline" className="text-[9px] px-1 py-0">{d.weight}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {resolved.map((d) => (
          <TabsContent key={d.id} value={d.id} className="mt-4">
            <Accordion type="multiple" className="space-y-2">
              {d.modules.map((m) => {
                const coveredCount = m.items.filter((i) => i.content).length;
                return (
                  <AccordionItem
                    key={m.title}
                    value={m.title}
                    className="border rounded-md px-3 bg-card"
                  >
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                      <span className="flex items-center gap-2 text-left flex-wrap">
                        <span className={d.color}>●</span>
                        <span className="font-medium">{m.title}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {coveredCount}/{m.items.length} topic{m.items.length === 1 ? "" : "s"}
                        </Badge>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1 pb-2">
                        {m.items.map((it) => (
                          <TopicCard key={it.topic} title={it.topic} content={it.content} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
