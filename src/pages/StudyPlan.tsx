import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClipboardList, ArrowRight, CheckCircle2, RotateCcw, BookOpen, Target, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const domains = [
  {
    id: "prepare_data",
    title: "Prepare the Data",
    weight: "25-30%",
    topics: [
      "Connect to data sources & shared semantic models",
      "Data source settings, credentials & privacy levels",
      "DirectLake vs DirectQuery vs Import",
      "Parameters in Power Query",
      "Data profiling & column statistics",
      "Cleaning: nulls, inconsistencies, errors",
      "Column data types",
      "Create & transform columns",
      "Group, aggregate, pivot, unpivot",
      "Merge & append queries",
      "Keys for relationships",
    ],
  },
  {
    id: "model_data",
    title: "Model the Data",
    weight: "25-30%",
    topics: [
      "Table & column properties",
      "Role-playing dimensions",
      "Cardinality & cross-filter direction",
      "Common date table",
      "Calculated columns vs calculated tables",
      "Single aggregation measures (SUM, COUNT…)",
      "CALCULATE function",
      "Time intelligence measures",
      "Statistical functions",
      "Semi-additive measures",
      "Calculation groups",
      "Performance optimization",
    ],
  },
  {
    id: "visualize_analyze",
    title: "Visualize & Analyze",
    weight: "25-30%",
    topics: [
      "Choosing the right visual",
      "Formatting & configuring visuals",
      "Copilot narrative visual",
      "Themes & conditional formatting",
      "Slicers & filters",
      "Bookmarks & buttons for navigation",
      "Drill-through & cross-report drill-through",
      "AI visuals (Q&A, Key Influencers…)",
      "Paginated reports basics",
      "Anomaly detection & forecasting",
    ],
  },
  {
    id: "deploy_maintain",
    title: "Deploy & Maintain",
    weight: "15-20%",
    topics: [
      "Workspaces, roles & permissions",
      "Sensitivity labels",
      "Row-level & object-level security",
      "Deployment pipelines",
      "Scheduled & incremental refresh",
      "Endorsement (Promoted, Certified)",
      "Gateway management",
      "Impact analysis & lineage",
    ],
  },
];

type Step = "intro" | "selfRate" | "results";

interface PlanItem {
  domain: string;
  topic: string;
  priority: "high" | "medium" | "low";
  reason: string;
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
        const selfScore = selfRatings[`${d.id}::${topic}`] || 1;
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
        items.push({ domain: d.title, topic, priority, reason });
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
          <p className="text-sm text-muted-foreground">Rate your confidence → get tailored study priorities</p>
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
                <p className="font-medium text-foreground">Get Your Plan</p>
                <p className="text-sm text-muted-foreground">We'll prioritize topics and link you directly to the Exam Syllabus sections to study.</p>
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
              <CardContent className="space-y-3">
                {d.topics.map((topic) => {
                  const key = `${d.id}::${topic}`;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <p className="flex-1 text-sm text-foreground">{topic}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setSelfRatings((p) => ({ ...p, [key]: n }))}
                            className={cn(
                              "w-8 h-8 rounded-lg text-xs font-bold border transition-colors",
                              (selfRatings[key] || 0) >= n
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
                    <div key={i} className={cn("flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm", priorityColor[priority])}>
                      <span className="flex-1 font-medium">{item.topic}</span>
                      <span className="text-xs opacity-75 hidden sm:block">{item.domain}</span>
                      <Link to="/Syllabus" className="flex-shrink-0 hover:opacity-80 transition-opacity" title="Study in Exam Syllabus">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <Link to="/Syllabus" className="flex items-center gap-3 text-primary hover:underline font-medium">
                <BookOpen className="w-5 h-5" />
                Open Exam Syllabus to start studying →
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
