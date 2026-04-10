import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClipboardList, ArrowRight, CheckCircle2, RotateCcw, BookOpen, Target, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface TopicDef {
  id: string;
  label: string;
  context: string;
  syllabusLink: { domain: string; section: string };
}

interface DomainDef {
  id: string;
  title: string;
  weight: string;
  topics: TopicDef[];
}

const domains: DomainDef[] = [
  {
    id: "prepare_data",
    title: "Prepare the Data",
    weight: "25-30%",
    topics: [
      { id: "pd1", label: "Connect to data sources & shared semantic models", context: "Do you know how to identify and connect to different data sources or reuse a shared semantic model in Power BI?", syllabusLink: { domain: "prepare_data", section: "Get or connect to data" } },
      { id: "pd2", label: "Data source settings, credentials & privacy levels", context: "Do you know how to change credentials, configure privacy levels, and manage data source settings?", syllabusLink: { domain: "prepare_data", section: "Get or connect to data" } },
      { id: "pd3", label: "DirectLake vs DirectQuery vs Import", context: "Do you know how to choose between DirectLake, DirectQuery, and Import mode and explain the trade-offs?", syllabusLink: { domain: "prepare_data", section: "Get or connect to data" } },
      { id: "pd4", label: "Parameters in Power Query", context: "Do you know how to create and modify parameters to make queries dynamic and reusable?", syllabusLink: { domain: "prepare_data", section: "Get or connect to data" } },
      { id: "pd5", label: "Data profiling & column statistics", context: "Do you know how to evaluate data quality using column distribution, column quality, and column profile tools?", syllabusLink: { domain: "prepare_data", section: "Profile and clean the data" } },
      { id: "pd6", label: "Cleaning: nulls, inconsistencies, errors", context: "Do you know how to resolve null values, fix inconsistencies, and handle data quality issues in Power Query?", syllabusLink: { domain: "prepare_data", section: "Profile and clean the data" } },
      { id: "pd7", label: "Column data types", context: "Do you know how to select appropriate column data types and understand the impact on performance and accuracy?", syllabusLink: { domain: "prepare_data", section: "Transform and load the data" } },
      { id: "pd8", label: "Create & transform columns", context: "Do you know how to create calculated columns, split columns, and apply transformations in Power Query?", syllabusLink: { domain: "prepare_data", section: "Transform and load the data" } },
      { id: "pd9", label: "Group, aggregate, pivot, unpivot", context: "Do you know how to group rows, aggregate data, and reshape tables using pivot and unpivot operations?", syllabusLink: { domain: "prepare_data", section: "Transform and load the data" } },
      { id: "pd10", label: "Merge & append queries", context: "Do you know how to merge (join) and append (union) queries to combine data from multiple sources?", syllabusLink: { domain: "prepare_data", section: "Transform and load the data" } },
      { id: "pd11", label: "Keys for relationships", context: "Do you know how to identify and create appropriate keys to build relationships between tables?", syllabusLink: { domain: "prepare_data", section: "Transform and load the data" } },
    ],
  },
  {
    id: "model_data",
    title: "Model the Data",
    weight: "25-30%",
    topics: [
      { id: "md1", label: "Table & column properties", context: "Do you know how to configure table and column properties like sort order, data category, and summarization?", syllabusLink: { domain: "model_data", section: "Design and implement a data model" } },
      { id: "md2", label: "Role-playing dimensions", context: "Do you know how to implement role-playing dimensions where a single table serves multiple relationships (e.g., OrderDate, ShipDate)?", syllabusLink: { domain: "model_data", section: "Design and implement a data model" } },
      { id: "md3", label: "Cardinality & cross-filter direction", context: "Do you know how to define relationship cardinality (1:M, M:M) and choose the correct cross-filter direction?", syllabusLink: { domain: "model_data", section: "Design and implement a data model" } },
      { id: "md4", label: "Common date table", context: "Do you know how to create a shared date table and mark it as a date table for time intelligence?", syllabusLink: { domain: "model_data", section: "Design and implement a data model" } },
      { id: "md5", label: "Calculated columns vs calculated tables", context: "Do you know when to use calculated columns vs calculated tables and the performance implications of each?", syllabusLink: { domain: "model_data", section: "Design and implement a data model" } },
      { id: "md6", label: "Single aggregation measures (SUM, COUNT…)", context: "Do you know how to create simple DAX measures like SUM, COUNT, AVERAGE, and DISTINCTCOUNT?", syllabusLink: { domain: "model_data", section: "Create model calculations by using DAX" } },
      { id: "md7", label: "CALCULATE function", context: "Do you know how to use CALCULATE to modify filter context and create complex business logic in DAX?", syllabusLink: { domain: "model_data", section: "Create model calculations by using DAX" } },
      { id: "md8", label: "Time intelligence measures", context: "Do you know how to build YTD, QTD, prior year, and rolling average calculations using time intelligence functions?", syllabusLink: { domain: "model_data", section: "Create model calculations by using DAX" } },
      { id: "md9", label: "Statistical functions", context: "Do you know how to use DAX statistical functions like MEDIAN, PERCENTILE, and standard deviation?", syllabusLink: { domain: "model_data", section: "Create model calculations by using DAX" } },
      { id: "md10", label: "Semi-additive measures", context: "Do you know how to create semi-additive measures for scenarios like inventory snapshots where SUM doesn't apply across dates?", syllabusLink: { domain: "model_data", section: "Create model calculations by using DAX" } },
      { id: "md11", label: "Calculation groups", context: "Do you know how to create and use calculation groups to apply reusable time intelligence or currency conversion patterns?", syllabusLink: { domain: "model_data", section: "Create model calculations by using DAX" } },
      { id: "md12", label: "Performance optimization", context: "Do you know how to use Performance Analyzer and DAX query view to identify and fix slow measures, visuals, and relationships?", syllabusLink: { domain: "model_data", section: "Optimize model performance" } },
    ],
  },
  {
    id: "visualize_analyze",
    title: "Visualize & Analyze",
    weight: "25-30%",
    topics: [
      { id: "va1", label: "Choosing the right visual", context: "Do you know how to select the most effective visual type (bar, line, scatter, etc.) for a given data story?", syllabusLink: { domain: "visualize_analyze", section: "Create reports" } },
      { id: "va2", label: "Formatting & configuring visuals", context: "Do you know how to format visuals including axes, legends, data labels, and visual-level filters?", syllabusLink: { domain: "visualize_analyze", section: "Create reports" } },
      { id: "va3", label: "Copilot narrative visual", context: "Do you know how to create a narrative visual with Copilot to auto-generate text summaries of your data?", syllabusLink: { domain: "visualize_analyze", section: "Create reports" } },
      { id: "va4", label: "Themes & conditional formatting", context: "Do you know how to apply custom themes and use conditional formatting (color scales, icons, rules) on visuals?", syllabusLink: { domain: "visualize_analyze", section: "Create reports" } },
      { id: "va5", label: "Slicers & filters", context: "Do you know how to apply slicing and filtering at visual, page, and report level including sync slicers?", syllabusLink: { domain: "visualize_analyze", section: "Create reports" } },
      { id: "va6", label: "Bookmarks & buttons for navigation", context: "Do you know how to configure bookmarks and buttons to create interactive navigation and storytelling experiences?", syllabusLink: { domain: "visualize_analyze", section: "Enhance reports for usability and storytelling" } },
      { id: "va7", label: "Drill-through & cross-report drill-through", context: "Do you know how to configure drill-through pages with filters and buttons, including cross-report drill-through?", syllabusLink: { domain: "visualize_analyze", section: "Enhance reports for usability and storytelling" } },
      { id: "va8", label: "AI visuals (Q&A, Key Influencers…)", context: "Do you know how to use AI-powered visuals like Q&A, Key Influencers, and Decomposition Tree to uncover insights?", syllabusLink: { domain: "visualize_analyze", section: "Identify patterns and trends" } },
      { id: "va9", label: "Paginated reports basics", context: "Do you know when to choose a paginated report over a Power BI report and how to set one up?", syllabusLink: { domain: "visualize_analyze", section: "Create reports" } },
      { id: "va10", label: "Anomaly detection & forecasting", context: "Do you know how to use reference lines, error bars, forecasting, and anomaly detection to spot trends and outliers?", syllabusLink: { domain: "visualize_analyze", section: "Identify patterns and trends" } },
    ],
  },
  {
    id: "deploy_maintain",
    title: "Deploy & Maintain",
    weight: "15-20%",
    topics: [
      { id: "dm1", label: "Workspaces, roles & permissions", context: "Do you know how to create workspaces, assign workspace roles, and configure access for collaboration?", syllabusLink: { domain: "deploy_maintain", section: "Create and manage workspaces and assets" } },
      { id: "dm2", label: "Sensitivity labels", context: "Do you know how to apply Microsoft Purview sensitivity labels to protect and classify Power BI content?", syllabusLink: { domain: "deploy_maintain", section: "Secure and govern Power BI items" } },
      { id: "dm3", label: "Row-level & object-level security", context: "Do you know how to implement RLS roles with DAX filters and configure group membership for data security?", syllabusLink: { domain: "deploy_maintain", section: "Secure and govern Power BI items" } },
      { id: "dm4", label: "Deployment pipelines", context: "Do you know how to use deployment pipelines to promote content through Dev → Test → Production stages?", syllabusLink: { domain: "deploy_maintain", section: "Create and manage workspaces and assets" } },
      { id: "dm5", label: "Scheduled & incremental refresh", context: "Do you know how to configure scheduled refresh and set up incremental refresh policies for large datasets?", syllabusLink: { domain: "deploy_maintain", section: "Create and manage workspaces and assets" } },
      { id: "dm6", label: "Endorsement (Promoted, Certified)", context: "Do you know how to promote or certify Power BI content to help users discover trusted datasets and reports?", syllabusLink: { domain: "deploy_maintain", section: "Create and manage workspaces and assets" } },
      { id: "dm7", label: "Gateway management", context: "Do you know when a gateway is required and how to configure one for on-premises or private network data?", syllabusLink: { domain: "deploy_maintain", section: "Create and manage workspaces and assets" } },
      { id: "dm8", label: "Impact analysis & lineage", context: "Do you know how to use impact analysis and data lineage views to understand downstream dependencies?", syllabusLink: { domain: "deploy_maintain", section: "Create and manage workspaces and assets" } },
    ],
  },
];

type Step = "intro" | "selfRate" | "results";

interface PlanItem {
  domain: string;
  topicId: string;
  topic: string;
  context: string;
  priority: "high" | "medium" | "low";
  reason: string;
  syllabusLink: { domain: string; section: string };
}

export default function StudyPlan() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("intro");
  const [selfRatings, setSelfRatings] = useState<Record<string, number>>({});
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadSavedPlan();
    else setLoading(false);
  }, [user]);

  const loadSavedPlan = async () => {
    const { data } = await supabase
      .from("study_plan_results")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) {
      setPlan((data as any).recommended_plan as PlanItem[]);
      setStep("results");
    }
    setLoading(false);
  };

  const generatePlan = () => {
    const items: PlanItem[] = [];
    for (const d of domains) {
      for (const topic of d.topics) {
        const selfScore = selfRatings[topic.id] || 1;
        let priority: "high" | "medium" | "low" = "low";
        let reason = "";
        if (selfScore <= 2) {
          priority = "high";
          reason = "Low confidence — focus here first";
        } else if (selfScore <= 3) {
          priority = "medium";
          reason = "Moderate confidence — reinforce understanding";
        } else {
          priority = "low";
          reason = "Good confidence — review occasionally";
        }
        items.push({
          domain: d.title,
          topicId: topic.id,
          topic: topic.label,
          context: topic.context,
          priority,
          reason,
          syllabusLink: topic.syllabusLink,
        });
      }
    }

    items.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });

    setPlan(items);
    setStep("results");

    if (user) {
      supabase.from("study_plan_results").insert({
        user_id: user.id,
        quiz_answers: {} as any,
        self_ratings: selfRatings as any,
        recommended_plan: items as any,
        completed: true,
      });
    }
  };

  const resetPlan = () => {
    setStep("intro");
    setSelfRatings({});
    setPlan([]);
  };

  const makeSyllabusUrl = (link: { domain: string; section: string }) =>
    `/Syllabus?domain=${encodeURIComponent(link.domain)}&section=${encodeURIComponent(link.section)}`;

  const priorityColor = {
    high: "bg-red-500/15 text-red-400 border-red-500/30",
    medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  };

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Personal Study Plan</h1>
          <p className="text-sm text-muted-foreground">Rate your confidence → get tailored study priorities with direct links to study material</p>
        </div>
      </div>

      {/* INTRO */}
      {step === "intro" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" /> How It Works</CardTitle>
            <CardDescription>One quick step to generate your personalized PL-300 study plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <p className="font-medium text-foreground">Confidence Self-Rating</p>
                <p className="text-sm text-muted-foreground">Rate your confidence on each topic from 1 (no idea) to 5 (expert). Be honest — this drives your plan!</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <p className="font-medium text-foreground">Get Your Plan with Study Links</p>
                <p className="text-sm text-muted-foreground">We'll prioritize topics and link you directly to the specific Exam Syllabus sections to study. Your plan is saved so you can come back anytime.</p>
              </div>
            </div>
            <Button onClick={() => setStep("selfRate")} className="gap-2 mt-4">
              Start Rating <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* SELF RATING */}
      {step === "selfRate" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Rate Your Confidence</CardTitle>
              <CardDescription>For each topic, rate 1 (no idea) to 5 (expert). Be honest!</CardDescription>
            </CardHeader>
          </Card>

          {domains.map((d) => (
            <Card key={d.id}>
              <CardHeader>
                <CardTitle className="text-base">{d.title} <span className="text-xs text-muted-foreground font-normal ml-2">{d.weight}</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {d.topics.map((topic) => (
                  <div key={topic.id} className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{topic.label}</p>
                        <p className="text-xs text-muted-foreground italic">{topic.context}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setSelfRatings((p) => ({ ...p, [topic.id]: n }))}
                            className={cn(
                              "w-8 h-8 rounded-lg text-xs font-bold border transition-colors",
                              (selfRatings[topic.id] || 0) >= n
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <Button onClick={generatePlan} className="w-full gap-2" size="lg">
            <CheckCircle2 className="w-5 h-5" /> Generate My Study Plan
          </Button>
        </div>
      )}

      {/* RESULTS */}
      {step === "results" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Your Personalized Study Plan</h2>
            <Button variant="outline" size="sm" onClick={resetPlan} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Retake
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            This plan is saved to your account — come back anytime to review it. Click any topic to jump straight to that section in the Exam Syllabus.
          </p>

          {(["high", "medium", "low"] as const).map((priority) => {
            const items = plan.filter((p) => p.priority === priority);
            if (items.length === 0) return null;
            return (
              <div key={priority} className="space-y-2">
                <h3 className={cn("text-sm font-semibold uppercase tracking-wider", {
                  "text-red-400": priority === "high",
                  "text-amber-400": priority === "medium",
                  "text-emerald-400": priority === "low",
                })}>
                  {priority === "high" ? "🔴 Focus First" : priority === "medium" ? "🟡 Reinforce" : "🟢 Review Occasionally"}
                  <span className="text-muted-foreground ml-2">({items.length})</span>
                </h3>
                <div className="space-y-1.5">
                  {items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.syllabusLink ? makeSyllabusUrl(item.syllabusLink) : "/Syllabus"}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 rounded-lg border text-sm transition-opacity hover:opacity-80 group cursor-pointer block",
                        priorityColor[priority]
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block">{item.topic}</span>
                        <span className="text-xs opacity-75 block mt-0.5">{item.context || item.reason}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                        <span className="text-xs opacity-60 hidden sm:block">{item.domain}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
