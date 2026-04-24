import React, { useState } from "react";
import BadgeGrantOnVisit from "@/components/BadgeGrantOnVisit";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ChevronRight, ChevronDown, BookOpen, Lightbulb, ArrowRight, Info
} from "lucide-react";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step {
  action: string;
  detail: string;
  syllabusTopics: string[];
  decision: string;
  sectionOverride?: string;
  domainOverride?: string;
}

interface Phase {
  id: number;
  phase: string;
  title: string;
  section: string;
  emoji: string;
  color: string;
  bgLight: string;
  border: string;
  badgeColor: string;
  domain: string;
  domainLabel: string;
  realWorld: string;
  steps: Step[];
}

const phases: Phase[] = [
  {
    id: 1, phase: "Phase 1", title: "Connect to Your Data", section: "Get or connect to data", emoji: "🔌",
    color: "from-blue-500 to-cyan-500", bgLight: "bg-blue-50", border: "border-blue-200", badgeColor: "bg-blue-100 text-blue-800",
    domain: "prepare_data", domainLabel: "Prepare the Data",
    realWorld: "A business analyst is asked to build a sales report. The first decision: where is the data and how should Power BI connect to it?",
    steps: [
      { action: "Decide how to connect to the data source", detail: "Should you Import data into Power BI, use DirectQuery (live connection), or DirectLake (Fabric)? Import is fastest for reporting; DirectQuery suits large or frequently updated datasets; DirectLake is optimised for Microsoft Fabric.", syllabusTopics: ["Choose between DirectLake, DirectQuery, and Import"], decision: "Import = best performance. DirectQuery = real-time data. DirectLake = Fabric only." },
      { action: "Connect to data sources or a shared semantic model", detail: "Identify whether to connect directly to a source (SQL, Excel, SharePoint, API) or reuse an existing published semantic model in the Power BI service.", syllabusTopics: ["Identify and connect to data sources or a shared semantic model"], decision: "Reuse shared models where possible to avoid duplication and maintain a single source of truth." },
      { action: "Configure credentials and privacy levels", detail: "Set authentication (Windows, OAuth, API key) and privacy levels (Public, Organisational, Private) to control data query folding and security.", syllabusTopics: ["Change data source settings, including credentials and privacy levels"], decision: "Wrong privacy levels can block query folding or expose sensitive data." },
      { action: "Create parameters for dynamic connections", detail: "Use parameters to make data sources flexible — e.g., switching between dev/prod environments or letting users filter data at load time.", syllabusTopics: ["Create and modify parameters"], decision: "Parameters enable reusability and environment switching without hardcoding values." },
    ],
  },
  {
    id: 2, phase: "Phase 2", title: "Profile & Clean the Data", section: "Profile and clean the data", emoji: "🔍",
    color: "from-amber-500 to-orange-500", bgLight: "bg-amber-50", border: "border-amber-200", badgeColor: "bg-amber-100 text-amber-800",
    domain: "prepare_data", domainLabel: "Prepare the Data",
    realWorld: "Before building anything, you need to understand the data quality. Raw data rarely arrives clean — nulls, duplicates, wrong types, and inconsistencies are common.",
    steps: [
      { action: "Profile the data to understand quality", detail: "Use Power Query's Column Quality, Column Distribution, and Column Profile tools to identify nulls, errors, distinct vs. unique values, and data patterns.", syllabusTopics: ["Evaluate data, including data statistics and column properties"], decision: "Profiling reveals issues before they become report errors. Always do this first." },
      { action: "Resolve data quality issues", detail: "Handle nulls (replace, remove, or fill down), fix inconsistent text casing, remove duplicates, and standardise date formats.", syllabusTopics: ["Resolve inconsistencies, unexpected or null values, and data quality issues"], decision: "Decide whether to remove or impute nulls based on business context." },
      { action: "Fix data import errors", detail: "Address type mismatch errors, encoding issues, or broken query steps that prevent data from loading correctly.", syllabusTopics: ["Resolve data import errors"], decision: "Import errors will silently exclude rows — always check error counts in Power Query." },
    ],
  },
  {
    id: 3, phase: "Phase 3", title: "Transform & Shape the Data", section: "Transform and load the data", emoji: "⚙️",
    color: "from-violet-500 to-purple-600", bgLight: "bg-violet-50", border: "border-violet-200", badgeColor: "bg-violet-100 text-violet-800",
    domain: "prepare_data", domainLabel: "Prepare the Data",
    realWorld: "The raw data is clean but not yet in the right shape. You need to restructure it into a model that supports efficient analysis.",
    steps: [
      { action: "Set column data types correctly", detail: "Every column must have the right data type (text, whole number, decimal, date, etc.). Incorrect types cause DAX errors and incorrect aggregations.", syllabusTopics: ["Select appropriate column data types"], decision: "Always explicitly set types — never rely on auto-detection, especially for dates." },
      { action: "Transform columns as needed", detail: "Split, merge, extract, add custom or conditional columns to shape data for your model.", syllabusTopics: ["Create and transform columns"], decision: "Transformations in Power Query are preferable to calculated columns for performance." },
      { action: "Aggregate and group data", detail: "Group rows to summarise data at the right grain — e.g., daily sales rolled up to monthly.", syllabusTopics: ["Group and aggregate rows"], decision: "Aggregate at load time to reduce model size if detail-level rows aren't needed." },
      { action: "Restructure data (pivot, unpivot, transpose)", detail: "Flatten wide tables (unpivot columns to rows), reshape crosstab data, or transpose for correct model orientation.", syllabusTopics: ["Pivot, unpivot, and transpose data"], decision: "Unpivoting is one of the most common transformations — especially for Excel source data." },
      { action: "Parse semi-structured data", detail: "Expand JSON, XML, or nested list/record columns into flat, usable tables.", syllabusTopics: ["Convert semi-structured data to a table"], decision: "Use expand vs. aggregate wisely — expanding creates more rows, aggregating creates more columns." },
      { action: "Design fact and dimension tables", detail: "Separate the data into fact tables (events/transactions with measures) and dimension tables (descriptive attributes). This is the star schema pattern.", syllabusTopics: ["Create fact tables and dimension tables"], decision: "Star schema is strongly preferred — it improves performance and simplifies DAX." },
      { action: "Manage query references and duplicates", detail: "Use Reference queries when you want a live dependency on a parent query. Use Duplicate to create an independent copy.", syllabusTopics: ["Identify when to use reference or duplicate queries and the resulting impact"], decision: "Reference = linked (shared load). Duplicate = independent (separate load)." },
      { action: "Merge and append queries", detail: "Merge (JOIN) combines columns from two tables. Append (UNION) stacks rows. Choose based on whether you need to add columns or add rows.", syllabusTopics: ["Merge and append queries"], decision: "Merge = horizontal join. Append = vertical stack." },
      { action: "Configure data loading", detail: "Choose which queries load into the model and which are staging/helper queries only (disable load). Staging queries reduce model size.", syllabusTopics: ["Configure data loading for queries"], decision: "Disable load on intermediate/staging queries to keep your model lean." },
    ],
  },
  {
    id: 4, phase: "Phase 4", title: "Build the Data Model", section: "Design and implement a data model", emoji: "🏗️",
    color: "from-indigo-500 to-blue-600", bgLight: "bg-indigo-50", border: "border-indigo-200", badgeColor: "bg-indigo-100 text-indigo-800",
    domain: "model_data", domainLabel: "Model the Data",
    realWorld: "Data is loaded into Power BI Desktop. Now you build the semantic model — relationships, properties, and calculations that power your reports.",
    steps: [
      { action: "Configure table and column properties", detail: "Set descriptions, format strings, data categories (e.g., Country, City for maps), summarisation behaviour, and hide technical columns from report view.", syllabusTopics: ["Configure table and column properties"], decision: "Hide keys and technical columns — expose only what report authors need." },
      { action: "Create relationships between tables", detail: "Define cardinality (one-to-many, many-to-many) and cross-filter direction (single vs. bidirectional). Incorrect relationships cause silent filter bugs.", syllabusTopics: ["Define a relationship's cardinality and cross-filter direction", "Identify and create appropriate keys for relationships"], decision: "Default to single-direction filters. Use bidirectional only when justified — it has performance costs." },
      { action: "Handle role-playing dimensions", detail: "When a dimension (e.g., Date) relates to a fact table multiple times (e.g., OrderDate, ShipDate), only one can be active. Use USERELATIONSHIP() in DAX for the others.", syllabusTopics: ["Handle role-playing dimensions"], decision: "Mark one relationship as active; use USERELATIONSHIP() in measures for the rest." },
      { action: "Create a date table", detail: "A proper date table is required for time intelligence. It must be contiguous, marked as a date table, and have a date column with no gaps.", syllabusTopics: ["Create and configure a date table"], decision: "Always create a dedicated date table — do not rely on auto date/time." },
      { action: "Set up Q&A linguistic schema", detail: "Configure synonyms and relationships so natural language queries (Q&A) understand your model's terminology.", syllabusTopics: ["Configure the Q&A feature including Q&A linguistic schema"], decision: "Q&A adoption depends on good synonyms — 'revenue' = 'sales amount', etc." },
    ],
  },
  {
    id: 5, phase: "Phase 5", title: "Write DAX Calculations", section: "Create model calculations by using DAX", emoji: "🧮",
    color: "from-pink-500 to-rose-500", bgLight: "bg-pink-50", border: "border-pink-200", badgeColor: "bg-pink-100 text-pink-800",
    domain: "model_data", domainLabel: "Model the Data",
    realWorld: "The model is structured. Now you write the business logic — the measures that answer business questions like 'What were sales last year?' or 'What % of budget did we achieve?'",
    steps: [
      { action: "Write aggregation measures", detail: "SUM, COUNT, AVERAGE, MIN, MAX — the building blocks. Always write measures, not implicit measures.", syllabusTopics: ["Create single aggregation measures"], decision: "Explicit measures are always preferable to implicit aggregations for consistency and reuse." },
      { action: "Use CALCULATE to modify filter context", detail: "CALCULATE is the most important DAX function. It evaluates an expression in a modified filter context — used for comparisons, ratios, and overriding filters.", syllabusTopics: ["Use the CALCULATE function"], decision: "CALCULATE + filter arguments replaces the current context — understand this or your measures will be wrong." },
      { action: "Implement time intelligence", detail: "TOTALYTD, SAMEPERIODLASTYEAR, DATEADD, DATESYTD — compare across time periods. Requires a proper date table.", syllabusTopics: ["Implement time intelligence measures"], decision: "Time intelligence only works if your date table is marked and contiguous." },
      { action: "Use statistical and advanced functions", detail: "RANKX, PERCENTILE, STDEV, GEOMEAN for statistical analysis beyond simple aggregations.", syllabusTopics: ["Use basic statistical functions"], decision: "Use statistical functions sparingly — document their purpose for report consumers." },
      { action: "Handle semi-additive measures", detail: "Some measures (like balances or headcount) cannot be summed across time — use LASTDATE, FIRSTDATE, or AVERAGEX.", syllabusTopics: ["Create semi-additive measures"], decision: "Inventory, balance, and headcount are classic semi-additive scenarios." },
      { action: "Create calculation groups", detail: "Calculation groups apply the same logic (e.g., time intelligence: MTD, QTD, YTD) across multiple measures — avoiding measure proliferation.", syllabusTopics: ["Create calculation groups"], decision: "If you have 5+ time intelligence variants for multiple measures, use calculation groups." },
      { action: "Add visual calculations", detail: "Visual calculations compute within the visual matrix and can reference adjacent rows/columns — useful for running totals, % of parent, or previous row comparisons.", sectionOverride: "Create reports", domainOverride: "visualize_analyze", syllabusTopics: ["Create visual calculations by using DAX"], decision: "Visual calculations are report-layer only — they don't exist in the model and can't be reused across visuals." },
    ],
  },
  {
    id: 6, phase: "Phase 6", title: "Optimise the Model", section: "Optimize model performance", emoji: "⚡",
    color: "from-yellow-500 to-amber-500", bgLight: "bg-yellow-50", border: "border-yellow-200", badgeColor: "bg-yellow-100 text-yellow-800",
    domain: "model_data", domainLabel: "Model the Data",
    realWorld: "Before publishing, you need to ensure the model is performant and won't time out or slow down reports for end users.",
    steps: [
      { action: "Remove unnecessary rows and columns", detail: "Every column in your model consumes memory. Remove columns not used in calculations or reports. Filter rows at source where possible.", syllabusTopics: ["Improve performance by identifying and removing unnecessary rows and columns"], decision: "A lean model loads faster and uses less memory — less is more." },
      { action: "Use Performance Analyzer and DAX query view", detail: "Performance Analyzer identifies slow visuals. DAX Studio and the DAX query view expose which measures are slow and why.", syllabusTopics: ["Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view"], decision: "Always profile before publishing — a slow report leads to low adoption." },
      { action: "Reduce granularity where appropriate", detail: "If the report doesn't need day-level data, aggregate to month at load time. Lower granularity = smaller model = faster queries.", syllabusTopics: ["Improve performance by reducing granularity"], decision: "Match granularity to reporting requirements — don't store what you don't report." },
    ],
  },
  {
    id: 7, phase: "Phase 7", title: "Design the Reports", section: "Create reports", emoji: "📊",
    color: "from-orange-500 to-red-500", bgLight: "bg-orange-50", border: "border-orange-200", badgeColor: "bg-orange-100 text-orange-800",
    domain: "visualize_analyze", domainLabel: "Visualize & Analyze",
    realWorld: "Model is ready. Now you design the reports that stakeholders will actually use to make decisions.",
    steps: [
      { action: "Choose the right visual for the data", detail: "Bar/column for comparison, line for trends, matrix for detail, card for KPIs, scatter for correlation, map for geography.", syllabusTopics: ["Select an appropriate visual"], decision: "Match visual to analytical purpose — not aesthetics." },
      { action: "Format and configure visuals", detail: "Set titles, axis labels, data labels, legends, and colours meaningfully. Reduce visual noise.", syllabusTopics: ["Format and configure visuals"], decision: "Less formatting is usually better — guide the eye, don't decorate." },
      { action: "Apply a theme", detail: "Use a JSON theme file to apply consistent colours, fonts, and formatting across all visuals. Supports corporate branding.", syllabusTopics: ["Apply and customize a theme"], decision: "Define the theme first and build reports within it — retrofitting is painful." },
      { action: "Apply conditional formatting", detail: "Highlight outliers, progress against targets, or risk levels using colour scales, icons, or data bars.", syllabusTopics: ["Apply conditional formatting"], decision: "Use conditional formatting to direct user attention — not for decoration." },
      { action: "Add slicers and filters", detail: "Slicers on canvas let users self-filter. Filters pane (page/visual/report level) apply defaults or restrictions.", syllabusTopics: ["Apply slicing and filtering"], decision: "Limit slicer count per page — too many choices create decision fatigue." },
      { action: "Decide: standard report vs paginated report", detail: "Standard reports are interactive and exploratory. Paginated reports are for pixel-perfect, print-ready outputs (invoices, statements).", syllabusTopics: ["Choose when to use a paginated report"], decision: "If the report needs to be printed or exported row-by-row, use paginated. Otherwise, standard." },
      { action: "Use Copilot features", detail: "Copilot can generate narrative summaries, suggest new report pages, and create visuals — accelerating report development.", syllabusTopics: ["Create a narrative visual with Copilot", "Use Copilot to create a new report page"], decision: "Copilot requires Fabric capacity and appropriate licensing." },
    ],
  },
  {
    id: 8, phase: "Phase 8", title: "Enhance for Usability", section: "Enhance reports for usability and storytelling", emoji: "✨",
    color: "from-teal-500 to-cyan-600", bgLight: "bg-teal-50", border: "border-teal-200", badgeColor: "bg-teal-100 text-teal-800",
    domain: "visualize_analyze", domainLabel: "Visualize & Analyze",
    realWorld: "A technically correct report isn't enough — it needs to be intuitive, navigable, and accessible for all users.",
    steps: [
      { action: "Configure bookmarks and navigation", detail: "Bookmarks capture view states (filter selections, visible visuals). Use them for storytelling, toggling between views, or button-driven navigation.", syllabusTopics: ["Configure bookmarks", "Configure navigation for a report"], decision: "Bookmarks are powerful but complex — document each one clearly." },
      { action: "Create custom tooltips", detail: "Report-page tooltips show a mini-report when hovering a visual — providing extra context without cluttering the main page.", syllabusTopics: ["Create custom tooltips"], decision: "Tooltip pages must be marked as tooltips in page settings and kept small." },
      { action: "Configure visual interactions", detail: "Control how clicking one visual filters others. Default is cross-highlight/cross-filter — you can disable or change per visual pair.", syllabusTopics: ["Edit and configure interactions between visuals"], decision: "Turn off interactions that create confusion — not every visual should filter everything else." },
      { action: "Configure drillthrough", detail: "Drillthrough lets users right-click a data point and navigate to a detail page filtered to that context.", syllabusTopics: ["Configure and use drillthrough pages"], decision: "Drillthrough is for detail exploration — keep the destination page focused on one entity." },
      { action: "Make reports accessible", detail: "Add alt text to visuals, use tab order, ensure colour contrast, and enable screen reader compatibility.", syllabusTopics: ["Design and configure Power BI reports for accessibility"], decision: "Accessibility isn't optional — it's a requirement for enterprise deployment." },
    ],
  },
  {
    id: 9, phase: "Phase 9", title: "Deploy & Distribute", section: "Manage the analytics lifecycle", emoji: "🚀",
    color: "from-emerald-500 to-green-600", bgLight: "bg-emerald-50", border: "border-emerald-200", badgeColor: "bg-emerald-100 text-emerald-800",
    domain: "deploy_maintain", domainLabel: "Manage & Secure",
    realWorld: "The report is ready. Now publish it to the Power BI service, configure refresh, and distribute to stakeholders.",
    steps: [
      { action: "Create and configure workspaces", detail: "Workspaces are containers for reports, datasets, and dashboards. Organise by team, project, or environment (Dev/Test/Prod).", syllabusTopics: ["Create and configure a workspace"], decision: "One workspace per project or team — don't dump everything into 'My Workspace'." },
      { action: "Publish reports to the service", detail: "Publish from Power BI Desktop to a workspace. Share via apps (curated experience) or direct workspace access.", syllabusTopics: ["Manage content in workspaces"], decision: "Apps provide a clean, read-only experience. Workspace access is for collaborators." },
      { action: "Set up deployment pipelines", detail: "Use deployment pipelines to promote content from Dev → Test → Production workspaces with parameter rules for environment switching.", syllabusTopics: ["Use deployment pipelines"], decision: "Pipelines prevent accidental production changes — always use for enterprise deployments." },
      { action: "Create dashboards", detail: "Pin visuals from multiple reports to a dashboard for an at-a-glance view. Set up data alerts on dashboard tiles.", syllabusTopics: ["Create dashboards", "Configure subscriptions and data alerts"], decision: "Dashboards are service-only and are great for monitoring KPIs — not for deep analysis." },
      { action: "Promote or certify content", detail: "Promoted content is highlighted in the data hub. Certified content requires admin approval and signals high quality/trustworthiness.", syllabusTopics: ["Promote or certify Power BI content"], decision: "Certification requires governance processes — don't certify without a review workflow." },
      { action: "Configure data refresh", detail: "Set up scheduled refresh (up to 8x/day on Pro, 48x on Premium). Configure the gateway if data is on-premises.", syllabusTopics: ["Configure a semantic model scheduled refresh", "Identify when a gateway is required"], decision: "On-premises or VNet data requires a gateway — cloud-to-cloud connections usually do not." },
    ],
  },
  {
    id: 10, phase: "Phase 10", title: "Secure the Content", section: "Secure and govern Power BI items", emoji: "🔒",
    color: "from-slate-500 to-gray-700", bgLight: "bg-slate-50", border: "border-slate-200", badgeColor: "bg-slate-100 text-slate-800",
    domain: "deploy_maintain", domainLabel: "Manage & Secure",
    realWorld: "Reports are live. Now ensure the right people see the right data — no more, no less.",
    steps: [
      { action: "Assign workspace roles", detail: "Admin, Member, Contributor, Viewer roles control what users can do within a workspace. Viewer = read only.", syllabusTopics: ["Assign workspace roles"], decision: "Use the principle of least privilege — give Viewer unless more is genuinely needed." },
      { action: "Configure item-level access", detail: "Share individual reports or semantic models directly without giving workspace access. Use for external stakeholders or limited access.", syllabusTopics: ["Configure item-level access", "Configure access to semantic models"], decision: "Workspace sharing vs. item sharing — choose based on how many items users need access to." },
      { action: "Implement Row-Level Security (RLS)", detail: "RLS filters rows so users only see their own data. Static RLS uses fixed role rules. Dynamic RLS uses USERNAME() or USERPRINCIPALNAME() to filter at login.", syllabusTopics: ["Implement row-level security roles", "Configure row-level security group membership"], decision: "Dynamic RLS is more scalable — it doesn't require a new role per user or region." },
      { action: "Apply sensitivity labels", detail: "Microsoft Purview sensitivity labels (Confidential, Public, etc.) classify and protect data. Labels follow the content — exported files retain the label.", syllabusTopics: ["Apply sensitivity labels"], decision: "Labels enforce downstream protection — a Confidential label can block export or require encryption." },
    ],
  },
];

export default function DecisionFramework() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const togglePhase = (id: number) => setExpanded((prev) => (prev === id ? null : id));
  const toggleStep = (key: string) => setExpandedSteps((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <BadgeGrantOnVisit badgeKey="decision_framework" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Power BI Decision Framework</h1>
          <p className="text-muted-foreground mt-1">How a real Power BI project works — mapped to the PL-300 exam syllabus</p>
        </div>
        <SyllabusSyncButton
          sectionLabel="Decision Framework"
          corpus={phases.flatMap(p => [p.title, p.section, ...p.steps.flatMap(s => [s.action, s.detail, ...s.syllabusTopics])])}
          itemCount={phases.reduce((sum, p) => sum + p.steps.length, 0)}
        />
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">How to use this framework</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every Power BI project follows a predictable lifecycle — from connecting to data all the way to securing and distributing reports.
              This framework walks through each phase with real-world context and maps every decision point to the corresponding PL-300 syllabus topic.
              Click any phase to expand it, then explore each step.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        {phases.map((phase, idx) => (
          <React.Fragment key={phase.id}>
            <button
              onClick={() => {
                togglePhase(phase.id);
                setTimeout(() => document.getElementById(`phase-${phase.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                expanded === phase.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/30 hover:text-primary"
              )}
            >
              <span>{phase.emoji}</span> {phase.phase}
            </button>
            {idx < phases.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground/30 self-center" />}
          </React.Fragment>
        ))}
      </div>

      <div className="space-y-4">
        {phases.map((phase) => (
          <div key={phase.id} id={`phase-${phase.id}`}>
            <Card className={cn("overflow-hidden border-2", expanded === phase.id ? phase.border : "border-border")}>
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full p-5 flex items-start gap-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0 text-xl shadow-sm`}>
                  {phase.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{phase.phase}</span>
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", phase.badgeColor)}>{phase.domainLabel}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{phase.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{phase.realWorld}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                  <span className="text-xs text-muted-foreground">{phase.steps.length} steps</span>
                  <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", expanded === phase.id ? "rotate-180" : "")} />
                </div>
              </button>

              {expanded === phase.id && (
                <CardContent className={cn("p-5 pt-0 border-t", phase.border)}>
                  <div className={cn("p-4 rounded-xl mb-4", phase.bgLight)}>
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">📋 Real-world context: </span>{phase.realWorld}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {phase.steps.map((step, idx) => {
                      const stepKey = `${phase.id}-${idx}`;
                      const isOpen = expandedSteps[stepKey];
                      return (
                        <div key={idx} className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleStep(stepKey)}
                            className="w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left"
                          >
                            <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br flex-shrink-0 mt-0.5 flex items-center justify-center text-card text-xs font-bold", phase.color)}>
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground text-sm">{step.action}</p>
                              {!isOpen && (
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{step.detail}</p>
                              )}
                            </div>
                            <ChevronDown className={cn("w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform", isOpen ? "rotate-180" : "")} />
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-4 space-y-3">
                              <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>

                              {step.decision && (
                                <div className="flex items-start gap-2 p-3 bg-chart-5/5 border border-chart-5/20 rounded-lg">
                                  <Info className="w-4 h-4 text-chart-5 flex-shrink-0 mt-0.5" />
                                  <p className="text-xs text-foreground"><span className="font-semibold">Key decision: </span>{step.decision}</p>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {step.syllabusTopics.map((topic, i) => (
                                  <Link
                                    key={i}
                                    to={`${createPageUrl("Syllabus")}?domain=${step.domainOverride || phase.domain}`}
                                    className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 border border-primary/20 text-primary rounded-lg text-xs font-medium hover:bg-primary/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    {topic}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center pb-4">
        Each syllabus topic link navigates to the corresponding domain in the Exam Syllabus page.
      </p>
    </div>
  );
}
