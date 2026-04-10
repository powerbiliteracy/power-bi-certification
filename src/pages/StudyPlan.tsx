import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ClipboardList, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, BookOpen, Target } from "lucide-react";

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

// 12 quick quiz questions — 3 per domain
const quizQuestions = [
  { domain: "prepare_data", q: "Which connection mode stores data inside the Power BI model file?", options: ["DirectQuery", "Import", "Live Connection", "DirectLake"], answer: 1 },
  { domain: "prepare_data", q: "What Power Query feature lets you combine rows from two tables with matching columns?", options: ["Append", "Merge", "Group By", "Pivot"], answer: 1 },
  { domain: "prepare_data", q: "Which privacy level prevents data from one source being sent to another?", options: ["Public", "Organizational", "Private", "None"], answer: 2 },
  { domain: "model_data", q: "Which DAX function modifies filter context?", options: ["SUM", "CALCULATE", "RELATED", "COUNTROWS"], answer: 1 },
  { domain: "model_data", q: "A date table used in multiple roles (OrderDate, ShipDate) is called a…", options: ["Fact table", "Bridge table", "Role-playing dimension", "Snowflake table"], answer: 2 },
  { domain: "model_data", q: "Which relationship type is most common in a star schema?", options: ["Many-to-Many", "One-to-One", "One-to-Many", "Self-referencing"], answer: 2 },
  { domain: "visualize_analyze", q: "Which visual type is best for showing composition of a whole?", options: ["Line chart", "Scatter plot", "Pie / Donut chart", "Waterfall chart"], answer: 2 },
  { domain: "visualize_analyze", q: "Bookmarks in Power BI save which of the following?", options: ["Only filters", "Only visuals", "Page state including filters, slicers, visuals", "Data model"], answer: 2 },
  { domain: "visualize_analyze", q: "Which AI visual helps identify factors that influence a metric?", options: ["Decomposition Tree", "Key Influencers", "Q&A", "Smart Narrative"], answer: 1 },
  { domain: "deploy_maintain", q: "Row-level security (RLS) is defined using…", options: ["Power Query", "DAX filter expressions", "M code", "Dataflows"], answer: 1 },
  { domain: "deploy_maintain", q: "What is the purpose of a deployment pipeline?", options: ["Version control", "Promote content through Dev → Test → Prod", "Schedule refresh", "Manage gateways"], answer: 1 },
  { domain: "deploy_maintain", q: "Which endorsement level requires admin approval?", options: ["Promoted", "Certified", "Featured", "Verified"], answer: 1 },
];

type Step = "intro" | "quiz" | "selfRate" | "results";

interface PlanItem {
  domain: string;
  topic: string;
  priority: "high" | "medium" | "low";
  reason: string;
}

export default function StudyPlan() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("intro");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [selfRatings, setSelfRatings] = useState<Record<string, number>>({});
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [savedPlan, setSavedPlan] = useState<PlanItem[] | null>(null);
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
      setSavedPlan((data as any).recommended_plan as PlanItem[]);
      setStep("results");
      setPlan((data as any).recommended_plan as PlanItem[]);
    }
    setLoading(false);
  };

  const generatePlan = () => {
    const domainScores: Record<string, { quizCorrect: number; quizTotal: number; selfAvg: number }> = {};

    for (const d of domains) {
      const dQuestions = quizQuestions.filter((q) => q.domain === d.id);
      let correct = 0;
      dQuestions.forEach((q, i) => {
        const globalIdx = quizQuestions.indexOf(q);
        if (quizAnswers[globalIdx] === q.answer) correct++;
      });
      const topicRatings = d.topics.map((t) => selfRatings[`${d.id}::${t}`] || 1);
      const selfAvg = topicRatings.reduce((a, b) => a + b, 0) / topicRatings.length;
      domainScores[d.id] = { quizCorrect: correct, quizTotal: dQuestions.length, selfAvg };
    }

    const items: PlanItem[] = [];
    for (const d of domains) {
      const score = domainScores[d.id];
      const quizPct = score.quizCorrect / score.quizTotal;
      for (const topic of d.topics) {
        const selfScore = selfRatings[`${d.id}::${topic}`] || 1;
        const combined = (quizPct * 50 + (selfScore / 5) * 50) / 100;
        let priority: "high" | "medium" | "low" = "low";
        let reason = "";
        if (combined < 0.4) {
          priority = "high";
          reason = "Low quiz performance + low confidence";
        } else if (combined < 0.65) {
          priority = "medium";
          reason = "Moderate understanding — needs reinforcement";
        } else {
          priority = "low";
          reason = "Good grasp — review occasionally";
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

    // Save to DB
    if (user) {
      supabase.from("study_plan_results").insert({
        user_id: user.id,
        quiz_answers: quizAnswers as any,
        self_ratings: selfRatings as any,
        recommended_plan: items as any,
        completed: true,
      });
    }
  };

  const resetPlan = () => {
    setStep("intro");
    setQuizIndex(0);
    setQuizAnswers({});
    setSelfRatings({});
    setPlan([]);
    setSavedPlan(null);
  };

  const currentQ = quizQuestions[quizIndex];
  const quizProgress = ((quizIndex + 1) / quizQuestions.length) * 100;

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
          <p className="text-sm text-muted-foreground">Quiz + self-assessment → tailored study priorities</p>
        </div>
      </div>

      {/* INTRO */}
      {step === "intro" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" /> How It Works</CardTitle>
            <CardDescription>Two quick steps to generate your personalized PL-300 study plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-medium text-foreground">Quick Knowledge Quiz</p>
                  <p className="text-sm text-muted-foreground">12 questions (3 per exam domain) to test your current knowledge.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-medium text-foreground">Confidence Self-Rating</p>
                  <p className="text-sm text-muted-foreground">Rate your confidence on each topic from 1 (no idea) to 5 (expert).</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setStep("quiz")} className="gap-2 mt-4">
              Start Assessment <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* QUIZ */}
      {step === "quiz" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Question {quizIndex + 1} of {quizQuestions.length}</CardTitle>
              <span className="text-xs text-muted-foreground capitalize">{currentQ.domain.replace("_", " ")}</span>
            </div>
            <Progress value={quizProgress} className="h-2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium text-foreground">{currentQ.q}</p>
            <RadioGroup
              value={quizAnswers[quizIndex]?.toString() || ""}
              onValueChange={(v) => setQuizAnswers((p) => ({ ...p, [quizIndex]: parseInt(v) }))}
            >
              {currentQ.options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <RadioGroupItem value={i.toString()} id={`q${quizIndex}-${i}`} />
                  <Label htmlFor={`q${quizIndex}-${i}`} className="flex-1 cursor-pointer">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between pt-2">
              <Button variant="outline" disabled={quizIndex === 0} onClick={() => setQuizIndex((i) => i - 1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              {quizIndex < quizQuestions.length - 1 ? (
                <Button
                  disabled={quizAnswers[quizIndex] === undefined}
                  onClick={() => setQuizIndex((i) => i + 1)}
                  className="gap-2"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  disabled={quizAnswers[quizIndex] === undefined}
                  onClick={() => setStep("selfRate")}
                  className="gap-2"
                >
                  Continue to Self-Rating <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
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
                    </div>
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
