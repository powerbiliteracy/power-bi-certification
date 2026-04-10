import React, { useState } from "react";
import { ExternalLink, BookOpen, Clock, GraduationCap, ChevronRight, ChevronDown, CheckCircle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FavoriteButton from "@/components/FavoriteButton";

interface SubModule {
  title: string;
  url: string;
  duration: string;
}

interface LearningPath {
  id: string;
  title: string;
  url: string;
  duration: string;
  modules: number;
  domain: string;
  examWeight?: string;
  domainColor: string;
  badge: string;
  description: string;
  subModules: SubModule[];
  labs?: { title: string; url: string }[];
}

const learningPaths: LearningPath[] = [
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
    subModules: [
      { title: "Discover data analysis", url: "https://learn.microsoft.com/training/modules/data-analytics-microsoft/", duration: "23 min" },
      { title: "Get started building with Power BI", url: "https://learn.microsoft.com/training/modules/get-started-with-power-bi/", duration: "47 min" },
      { title: "Building blocks of Power BI", url: "https://learn.microsoft.com/training/modules/explore-power-bi-service/", duration: "18 min" },
      { title: "Tour the Power BI service", url: "https://learn.microsoft.com/training/modules/tour-power-bi-service/", duration: "18 min" },
    ],
    labs: [
      { title: "Explore Power BI Desktop", url: "https://learn.microsoft.com/training/modules/get-started-with-power-bi/" },
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
    subModules: [
      { title: "Get data in Power BI", url: "https://learn.microsoft.com/training/modules/get-data/", duration: "1 hr 35 min" },
      { title: "Clean, transform, and load data", url: "https://learn.microsoft.com/training/modules/clean-data-power-bi/", duration: "1 hr 30 min" },
      { title: "Choose a Power BI model framework", url: "https://learn.microsoft.com/training/modules/choose-power-bi-model-framework/", duration: "1 hr 28 min" },
    ],
    labs: [
      { title: "Lab: Get data in Power BI Desktop", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/01-prepare-data.html" },
      { title: "Lab: Load data in Power BI Desktop", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/02-load-data.html" },
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
    subModules: [
      { title: "Design a semantic model in Power BI", url: "https://learn.microsoft.com/training/modules/design-model-power-bi/", duration: "1 hr 15 min" },
      { title: "Add measures to semantic models", url: "https://learn.microsoft.com/training/modules/dax-power-bi-add-measures/", duration: "50 min" },
      { title: "Add calculated tables and columns", url: "https://learn.microsoft.com/training/modules/dax-power-bi-add-calculated-tables/", duration: "35 min" },
      { title: "Use DAX time intelligence functions", url: "https://learn.microsoft.com/training/modules/dax-power-bi-time-intelligence/", duration: "40 min" },
      { title: "Optimize model performance", url: "https://learn.microsoft.com/training/modules/optimize-model-power-bi/", duration: "55 min" },
      { title: "Use DAX iterator functions", url: "https://learn.microsoft.com/training/modules/dax-power-bi-iterator-functions/", duration: "30 min" },
      { title: "Create visual calculations", url: "https://learn.microsoft.com/training/modules/power-bi-visual-calculations/", duration: "34 min" },
    ],
    labs: [
      { title: "Lab: Model data in Power BI Desktop", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/03-configure-data-model.html" },
      { title: "Lab: Create DAX calculations (Part 1)", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/04-create-dax-calculations.html" },
      { title: "Lab: Create DAX calculations (Part 2)", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/05-create-dax-calculations-advanced.html" },
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
    subModules: [
      { title: "Design Power BI reports", url: "https://learn.microsoft.com/training/modules/power-bi-effective-reports/", duration: "1 hr 20 min" },
      { title: "Enhance reports for user experience", url: "https://learn.microsoft.com/training/modules/power-bi-effective-user-experience/", duration: "1 hr 25 min" },
      { title: "Configure Power BI report filters", url: "https://learn.microsoft.com/training/modules/power-bi-effective-filters/", duration: "1 hr 10 min" },
      { title: "Perform analytics in Power BI", url: "https://learn.microsoft.com/training/modules/perform-analytics-power-bi/", duration: "1 hr 12 min" },
    ],
    labs: [
      { title: "Lab: Design a report in Power BI Desktop", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/06-design-report.html" },
      { title: "Lab: Enhance a report in Power BI Desktop", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/07-design-report-advanced.html" },
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
    subModules: [
      { title: "Create and manage workspaces", url: "https://learn.microsoft.com/training/modules/create-manage-workspaces-power-bi/", duration: "28 min" },
      { title: "Manage semantic models", url: "https://learn.microsoft.com/training/modules/manage-datasets-power-bi/", duration: "35 min" },
      { title: "Create dashboards", url: "https://learn.microsoft.com/training/modules/create-dashboards-power-bi/", duration: "25 min" },
      { title: "Implement row-level security", url: "https://learn.microsoft.com/training/modules/row-level-security-power-bi/", duration: "30 min" },
      { title: "Monitor and troubleshoot", url: "https://learn.microsoft.com/training/modules/troubleshoot-power-bi-model/", duration: "30 min" },
    ],
    labs: [
      { title: "Lab: Create a Power BI dashboard", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/08-create-power-bi-dashboard.html" },
      { title: "Lab: Enforce row-level security", url: "https://microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst/Instructions/Labs/09-enforce-rls.html" },
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

  const toggleComplete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
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
            5 learning paths · 21 hr 13 min total · {completed.size}/{learningPaths.length} completed
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
          const isExpanded = expanded === path.id;
          return (
            <Card key={path.id} className={cn("overflow-hidden hover:shadow-md transition-shadow", isComplete && "border-emerald-500/30 bg-emerald-500/5")}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Step number / complete toggle */}
                  <button
                    onClick={(e) => toggleComplete(path.id, e)}
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

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpanded(isExpanded ? null : path.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <ChevronRight
                        className={cn("w-3.5 h-3.5 transition-transform", isExpanded ? "rotate-90" : "")}
                      />
                      {isExpanded ? "Hide modules" : `Show ${path.subModules.length} modules`}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Modules</h4>
                        {path.subModules.map((sub, i) => (
                          <a
                            key={i}
                            href={sub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors group"
                          >
                            <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{sub.title}</p>
                              <p className="text-xs text-muted-foreground">{sub.duration}</p>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                          </a>
                        ))}

                        {path.labs && path.labs.length > 0 && (
                          <>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-2">🧪 Hands-on Labs</h4>
                            {path.labs.map((lab, i) => (
                              <a
                                key={i}
                                href={lab.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors group"
                              >
                                <BookOpen className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-foreground group-hover:text-emerald-700 transition-colors flex-1">{lab.title}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 flex-shrink-0" />
                              </a>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <FavoriteButton itemType="learn_module" itemId={path.id} />
                    <button
                      onClick={(e) => toggleComplete(path.id, e)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        isComplete
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-primary/5 text-primary hover:bg-primary/10"
                      )}
                    >
                      {isComplete ? "✓ Done" : "Mark Complete"}
                    </button>
                    <a
                      href={path.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-xs font-medium transition-colors"
                    >
                      Start <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
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
