import React, { useState } from "react";
import { ExternalLink, BookOpen, Clock, GraduationCap, ChevronRight, CheckCircle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const learningPaths = [
  {
    id: "lp-1",
    title: "Get started with Microsoft data analytics",
    url: "https://learn.microsoft.com/training/paths/data-analytics-microsoft/",
    duration: "1 hr 46 min",
    modules: 4,
    domain: "Foundation",
    domainColor: "from-primary to-accent",
    badge: "bg-primary/10 text-primary",
    description: "Discover the core concepts of data analytics and how Microsoft Power BI enables organisations to derive insights from their data.",
    topics: [
      "Understand data analyst roles and responsibilities",
      "Explore Power BI components and workflow",
      "Learn about data analytics concepts and terms",
      "Identify when to use Power BI",
    ],
  },
  {
    id: "lp-2",
    title: "Prepare data for analysis with Power BI",
    url: "https://learn.microsoft.com/training/paths/prepare-data-power-bi/",
    duration: "4 hr 33 min",
    modules: 3,
    domain: "Prepare the Data",
    examWeight: "25–30%",
    domainColor: "from-blue-400 to-cyan-500",
    badge: "bg-blue-100 text-blue-800",
    description: "Learn how to get, clean, and transform data from various sources using Power Query to prepare it for analysis.",
    topics: [
      "Get data from databases, files, web, and APIs",
      "Clean and transform data using Power Query",
      "Profile data to understand quality and distribution",
      "Combine data from multiple sources",
      "Optimise data loading and query performance",
    ],
  },
  {
    id: "lp-3",
    title: "Model data with Power BI",
    url: "https://learn.microsoft.com/training/paths/model-data-power-bi/",
    duration: "6 hr 59 min",
    modules: 7,
    domain: "Model the Data",
    examWeight: "25–30%",
    domainColor: "from-violet-400 to-pink-500",
    badge: "bg-violet-100 text-violet-800",
    description: "Create sophisticated data models using relationships, hierarchies, and DAX calculations to enable powerful analytics.",
    topics: [
      "Design star schemas and data modelling best practices",
      "Create and manage relationships between tables",
      "Write DAX measures and calculated columns",
      "Implement time intelligence calculations",
      "Optimise model performance and size",
      "Use calculation groups and field parameters",
      "Implement row-level security",
    ],
  },
  {
    id: "lp-4",
    title: "Design effective reports in Power BI",
    url: "https://learn.microsoft.com/training/paths/power-bi-effective/",
    duration: "5 hr 7 min",
    modules: 4,
    domain: "Visualize & Analyze",
    examWeight: "25–30%",
    domainColor: "from-amber-400 to-orange-500",
    badge: "bg-amber-100 text-amber-800",
    description: "Build compelling, interactive reports and dashboards that tell data stories and enable business decisions.",
    topics: [
      "Choose the right visualisations for your data",
      "Design report layouts and apply formatting",
      "Implement slicers, filters, and cross-filtering",
      "Create bookmarks, drill-through pages, and tooltips",
      "Use AI visuals (Key Influencers, Decomposition Tree, Q&A)",
      "Design for mobile and accessibility",
      "Create paginated reports",
    ],
  },
  {
    id: "lp-5",
    title: "Manage and secure Power BI",
    url: "https://learn.microsoft.com/training/paths/manage-secure-power-bi/",
    duration: "2 hr 48 min",
    modules: 5,
    domain: "Manage & Secure",
    examWeight: "15–20%",
    domainColor: "from-emerald-400 to-teal-500",
    badge: "bg-emerald-100 text-emerald-800",
    description: "Learn how to deploy, manage, and secure Power BI content across your organisation.",
    topics: [
      "Create and manage workspaces",
      "Publish and share reports and dashboards",
      "Configure data refresh schedules",
      "Implement row-level security (RLS)",
      "Apply sensitivity labels and data protection",
      "Use deployment pipelines for ALM",
      "Monitor and troubleshoot performance",
    ],
  },
];

function getCompletedModules(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem("learn-modules-completed") || "[]"));
  } catch { return new Set(); }
}

export default function LearnModules() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(getCompletedModules);

  const toggleComplete = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("learn-modules-completed", JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Microsoft Learn Modules</h1>
        <p className="text-muted-foreground mt-1">
          Official Microsoft Learn learning paths for the PL-300 certification
        </p>
      </div>

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-primary p-6 text-primary-foreground flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[hsl(0,0%,100%/0.2)] flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg">PL-300: Power BI Data Analyst Associate</p>
          <p className="text-sm opacity-80 mt-0.5">
            5 learning paths · 21 hr 13 min total · 23 modules · Free on Microsoft Learn · {completed.size}/{learningPaths.length} completed
          </p>
        </div>
        <a
          href="https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/?practice-assessment-type=certification#certification-prepare-for-the-exam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(0,0%,100%/0.2)] hover:bg-[hsl(0,0%,100%/0.3)] rounded-xl text-sm font-medium transition-colors flex-shrink-0"
        >
          View on Microsoft Learn <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Study tip */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <span className="font-semibold">💡 Study tip:</span> Complete these learning paths in order — each builds
        on the previous. All content is free on Microsoft Learn and maps directly to PL-300 exam domains.
      </div>

      {/* Learning Paths */}
      <div className="space-y-4">
        {learningPaths.map((path, index) => {
          const isComplete = completed.has(path.id);
          return (
            <Card key={path.id} className={cn("overflow-hidden hover:shadow-md transition-shadow", isComplete && "border-emerald-500/30 bg-emerald-500/5")}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Step number / complete toggle */}
                  <button
                    onClick={() => toggleComplete(path.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm transition-colors ${
                      isComplete
                        ? "bg-emerald-500 text-card"
                        : `bg-gradient-to-br ${path.domainColor} text-card`
                    }`}
                    title={isComplete ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {isComplete ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </button>

                  <div className="flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${path.badge}`}>
                        {path.domain}
                      </span>
                      {path.examWeight && (
                        <span className="text-xs text-muted-foreground">Exam weight: {path.examWeight}</span>
                      )}
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {path.duration}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{path.modules} modules</span>
                      {isComplete && (
                        <>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-emerald-600 font-medium">✓ Completed</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <a
                      href={path.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-semibold text-foreground hover:text-primary transition-colors text-base leading-snug mb-1"
                    >
                      {path.title}
                    </a>

                    <p className="text-sm text-muted-foreground mb-3">{path.description}</p>

                    {/* Topics toggle */}
                    <button
                      onClick={() => setExpanded(expanded === path.id ? null : path.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <ChevronRight
                        className={cn("w-3.5 h-3.5 transition-transform", expanded === path.id ? "rotate-90" : "")}
                      />
                      {expanded === path.id ? "Hide topics" : `Show ${path.topics.length} topics covered`}
                    </button>

                    {expanded === path.id && (
                      <ul className="mt-3 space-y-1.5">
                        {path.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action */}
                  <a
                    href={path.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-xs font-medium transition-colors"
                  >
                    Start <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Practice Assessment CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-foreground">Ready to test your knowledge?</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Microsoft's official free practice assessment for PL-300 — questions styled like the real exam.
            </p>
          </div>
          <a
            href="https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/practice/assessment?assessment-type=practice&assessmentId=48&practice-assessment-type=certification"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-colors flex-shrink-0"
          >
            Take Microsoft Practice Assessment <ExternalLink className="w-4 h-4" />
          </a>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center pb-4">
        Content provided by Microsoft Learn — free official certification training for PL-300.
      </p>
    </div>
  );
}
