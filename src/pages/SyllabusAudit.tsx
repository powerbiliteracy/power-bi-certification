import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ClipboardPaste,
  FileSearch,
  Sparkles,
  Copy,
  BookOpen,
  ListChecks,
  PlayCircle,
  Layers,
  ThumbsUp,
  Brain,
} from "lucide-react";
import { interactiveLessons } from "@/data/interactiveLessons";
import { pl300Syllabus } from "@/data/SyllabusData";
import { CHECKLIST_DOMAINS } from "@/data/checklistData";
import { FLASHCARDS } from "@/data/flashcardsData";
import { DOS_DONTS_DOMAINS } from "@/data/dosAndDontsData";
import { assessmentQuestions } from "@/data/AssessmentQuestions";
import SyllabusVersionsManager from "@/components/SyllabusVersionsManager";

// ---------- Parsing ----------
interface ParsedTopic {
  raw: string;
  normalized: string;
}
interface ParsedSection {
  title: string;
  topics: ParsedTopic[];
}
interface ParsedDomain {
  name: string;
  weight?: string;
  sections: ParsedSection[];
}

const normalize = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const STOP = new Set([
  "the", "a", "an", "and", "or", "to", "of", "for", "in", "on", "by", "with",
  "use", "using", "create", "configure", "apply", "set", "your", "data", "is",
  "are", "be", "as", "from", "at", "into", "how", "when", "what", "which",
]);

const tokens = (s: string): Set<string> =>
  new Set(normalize(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w)));

const similarity = (a: string, b: string): number => {
  const ta = tokens(a);
  const tb = tokens(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  ta.forEach((t) => {
    if (tb.has(t)) inter++;
  });
  return inter / Math.min(ta.size, tb.size);
};

function parseSyllabus(text: string): ParsedDomain[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/\u00a0/g, " ").trimEnd())
    .filter((l) => l.trim().length > 0);

  const domains: ParsedDomain[] = [];
  let currentDomain: ParsedDomain | null = null;
  let currentSection: ParsedSection | null = null;

  const domainRegex =
    /^([A-Z][A-Za-z0-9 ,&'/\-]+?)\s*\(?\s*(\d{1,2}\s*[\-–]\s*\d{1,2}\s*%|\d{1,2}\s*%)\s*\)?\s*$/;
  const bulletRegex = /^\s*([-*•·–▪◦]|\d+\.)\s+(.*)$/;

  for (const line of lines) {
    const domainMatch = line.match(domainRegex);
    if (domainMatch) {
      currentDomain = { name: domainMatch[1].trim(), weight: domainMatch[2].trim(), sections: [] };
      currentSection = null;
      domains.push(currentDomain);
      continue;
    }
    const bulletMatch = line.match(bulletRegex);
    if (bulletMatch && currentDomain) {
      const t = bulletMatch[2].trim();
      if (!currentSection) {
        currentSection = { title: "(uncategorized)", topics: [] };
        currentDomain.sections.push(currentSection);
      }
      currentSection.topics.push({ raw: t, normalized: normalize(t) });
      continue;
    }
    if (currentDomain && line.trim().length > 0 && !line.startsWith("Skills measured")) {
      if (line.length <= 120 && !line.endsWith(".")) {
        currentSection = { title: line.trim(), topics: [] };
        currentDomain.sections.push(currentSection);
        continue;
      }
    }
  }
  return domains;
}

// ---------- App sections (matches navigation pane) ----------
interface AppSection {
  key: string;
  label: string;
  icon: typeof BookOpen;
  /** Strings representing the content this section covers. */
  corpus: string[];
  /** Total content items (used for context, e.g. "26 lessons"). */
  itemCount: number;
}

function buildAppSections(): AppSection[] {
  // Exam Syllabus (in-app)
  const syllabusCorpus: string[] = [];
  let syllabusCount = 0;
  for (const d of pl300Syllabus.domains) {
    for (const s of d.sections) {
      for (const t of s.topics) {
        syllabusCorpus.push(t);
        syllabusCount++;
      }
    }
  }

  // Exam Checklist
  const checklistCorpus: string[] = [];
  let checklistCount = 0;
  for (const d of CHECKLIST_DOMAINS) {
    for (const s of d.sections) {
      for (const item of s.items) {
        checklistCorpus.push(item.label);
        checklistCount++;
      }
    }
  }

  // Interactive Lessons
  const lessonCorpus = interactiveLessons.map((l) => `${l.title} ${l.description}`);

  // Flashcards
  const flashcardCorpus = FLASHCARDS.map((c) => c.q);

  // Dos & Don'ts
  const dosCorpus: string[] = [];
  let dosCount = 0;
  for (const d of DOS_DONTS_DOMAINS) {
    for (const sub of d.subtopics) {
      dosCorpus.push(sub.title);
      sub.bullets.forEach((b) => dosCorpus.push(b));
      dosCount++;
    }
  }

  // Topic Assessments
  const assessmentTopics = new Set<string>();
  (assessmentQuestions as Array<{ topic?: string; section?: string }>).forEach((q) => {
    if (q.topic) assessmentTopics.add(q.topic);
    if (q.section) assessmentTopics.add(q.section);
  });
  const assessmentCorpus = Array.from(assessmentTopics);

  return [
    {
      key: "syllabus",
      label: "Exam Syllabus",
      icon: BookOpen,
      corpus: syllabusCorpus,
      itemCount: syllabusCount,
    },
    {
      key: "interactive-lessons",
      label: "Interactive Lessons",
      icon: PlayCircle,
      corpus: lessonCorpus,
      itemCount: interactiveLessons.length,
    },
    {
      key: "exam-checklist",
      label: "Exam Checklist",
      icon: ListChecks,
      corpus: checklistCorpus,
      itemCount: checklistCount,
    },
    {
      key: "flashcards",
      label: "Flashcards",
      icon: Layers,
      corpus: flashcardCorpus,
      itemCount: FLASHCARDS.length,
    },
    {
      key: "dos-and-donts",
      label: "Dos & Don'ts",
      icon: ThumbsUp,
      corpus: dosCorpus,
      itemCount: dosCount,
    },
    {
      key: "assessment",
      label: "Topic Assessments",
      icon: Brain,
      corpus: assessmentCorpus,
      itemCount: assessmentCorpus.length,
    },
  ];
}

// ---------- Coverage analysis ----------
const COVERED_THRESHOLD = 0.5;
const PARTIAL_THRESHOLD = 0.25;

interface TopicMatch {
  topic: ParsedTopic;
  bestScore: number;
  bestMatch?: string;
}

interface SectionDomainBreakdown {
  domainName: string;
  total: number;
  covered: number;
  partial: number;
  missing: number;
  topics: TopicMatch[];
}

interface SectionCoverageReport {
  section: AppSection;
  total: number;
  covered: number;
  partial: number;
  missing: number;
  domains: SectionDomainBreakdown[];
}

function bestScoreFor(topic: ParsedTopic, corpus: string[]): { score: number; match?: string } {
  let best = 0;
  let bestLabel: string | undefined;
  for (const c of corpus) {
    const s = similarity(topic.raw, c);
    if (s > best) {
      best = s;
      bestLabel = c;
    }
    if (best === 1) break;
  }
  return { score: best, match: bestLabel };
}

function analyzePerSection(
  parsed: ParsedDomain[],
  appSections: AppSection[],
): SectionCoverageReport[] {
  return appSections.map((section) => {
    let total = 0,
      covered = 0,
      partial = 0,
      missing = 0;
    const domains: SectionDomainBreakdown[] = parsed.map((d) => {
      let dTotal = 0,
        dCovered = 0,
        dPartial = 0,
        dMissing = 0;
      const topics: TopicMatch[] = [];
      for (const s of d.sections) {
        for (const t of s.topics) {
          const { score, match } = bestScoreFor(t, section.corpus);
          topics.push({ topic: t, bestScore: score, bestMatch: match });
          dTotal++;
          total++;
          if (score >= COVERED_THRESHOLD) {
            dCovered++;
            covered++;
          } else if (score >= PARTIAL_THRESHOLD) {
            dPartial++;
            partial++;
          } else {
            dMissing++;
            missing++;
          }
        }
      }
      return {
        domainName: d.name,
        total: dTotal,
        covered: dCovered,
        partial: dPartial,
        missing: dMissing,
        topics,
      };
    });

    return { section, total, covered, partial, missing, domains };
  });
}

// ---------- Sample ----------
const SAMPLE = `Prepare the data (25–30%)
Get or connect to data
- Identify and connect to data sources or a shared semantic model
- Change data source settings, including credentials and privacy levels
- Choose between DirectLake, DirectQuery, and Import
- Create and modify parameters

Profile and clean the data
- Evaluate data, including data statistics and column properties
- Resolve inconsistencies, unexpected or null values, and data quality issues
- Resolve data import errors

Model the data (25–30%)
Design and implement a data model
- Configure table and column properties
- Implement role-playing dimensions
- Define a relationship's cardinality and cross-filter direction
- Create a common date table

Visualize and analyze the data (25–30%)
Create reports
- Select an appropriate visual
- Format and configure visuals
- Apply conditional formatting

Manage and secure Power BI (15–20%)
Create and manage workspaces and assets
- Create and configure a workspace
- Configure and update an app
`;

// ---------- Component ----------
export default function SyllabusAudit() {
  const { isAdmin, loading, viewingAsUser } = useAuth();
  const { toast } = useToast();
  const [raw, setRaw] = useState("");
  const [reports, setReports] = useState<SectionCoverageReport[] | null>(null);

  const parsed = useMemo(() => (raw.trim() ? parseSyllabus(raw) : []), [raw]);

  const realIsAdmin = !loading && (isAdmin || viewingAsUser);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }
  if (!realIsAdmin) return <Navigate to="/Dashboard" replace />;

  const totalParsedTopics = parsed.reduce(
    (a, d) => a + d.sections.reduce((b, s) => b + s.topics.length, 0),
    0,
  );

  const handleAnalyze = () => {
    if (!raw.trim()) {
      toast({
        title: "Paste the syllabus first",
        description: "Copy the latest PL-300 Skills measured outline and paste it into the box.",
        variant: "destructive",
      });
      return;
    }
    const appSections = buildAppSections();
    const result = analyzePerSection(parsed, appSections);
    setReports(result);
    toast({
      title: "Audit complete",
      description: `Checked ${appSections.length} app sections against ${totalParsedTopics} syllabus topics.`,
    });
  };

  const handleLoadSample = () => setRaw(SAMPLE);
  const handleClear = () => {
    setRaw("");
    setReports(null);
  };

  const handleExport = () => {
    if (!reports) return;
    const lines: string[] = [];
    lines.push(`# PL-300 Syllabus Audit — ${new Date().toISOString().slice(0, 10)}`);
    lines.push("");
    lines.push(`Pasted topics: ${totalParsedTopics}`);
    lines.push("");
    lines.push("## Coverage by app section");
    lines.push("");
    for (const r of reports) {
      const pct = r.total ? Math.round((r.covered / r.total) * 100) : 0;
      lines.push(
        `### ${r.section.label} (${r.section.itemCount} items in app)`,
      );
      lines.push(
        `Coverage: ${pct}% — ✅ ${r.covered} covered · ⚠️ ${r.partial} partial · ❌ ${r.missing} missing (of ${r.total} pasted topics)`,
      );
      for (const d of r.domains) {
        lines.push(`- ${d.domainName}: ${d.covered}/${d.total} covered, ${d.partial} partial, ${d.missing} missing`);
        for (const t of d.topics) {
          const status =
            t.bestScore >= COVERED_THRESHOLD ? "✅" : t.bestScore >= PARTIAL_THRESHOLD ? "⚠️" : "❌";
          lines.push(`    - ${status} ${t.topic.raw}`);
        }
      }
      lines.push("");
    }
    navigator.clipboard.writeText(lines.join("\n"));
    toast({
      title: "Audit copied to clipboard",
      description: "Paste it into your notes or share with the team.",
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileSearch className="h-8 w-8 text-primary" /> Syllabus Audit
        </h1>
        <p className="text-muted-foreground mt-1">
          Paste the latest official PL-300 <em>Skills measured</em> outline. The tool then checks{" "}
          <strong>each navigation section</strong> (Exam Syllabus, Interactive Lessons, Exam Checklist,
          Flashcards, Dos & Don'ts, Topic Assessments) and reports how many of the pasted syllabus
          topics it covers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardPaste className="h-5 w-5" /> Paste latest syllabus
          </CardTitle>
          <CardDescription>
            Copy directly from{" "}
            <a
              href="https://learn.microsoft.com/credentials/certifications/resources/study-guides/pl-300"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              Microsoft Learn → PL-300 Study Guide
            </a>
            . Domain headings should include their weight, e.g.{" "}
            <code>Prepare the data (25–30%)</code>. Topics should be bulleted with <code>-</code>,{" "}
            <code>*</code>, or <code>•</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="Paste the official PL-300 Skills measured outline here…"
            className="min-h-[260px] font-mono text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAnalyze}>
              <Sparkles className="h-4 w-4 mr-2" /> Run audit
            </Button>
            <Button variant="outline" onClick={handleLoadSample}>
              Load sample
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
            {reports && (
              <Button variant="secondary" onClick={handleExport} className="ml-auto">
                <Copy className="h-4 w-4 mr-2" /> Copy report
              </Button>
            )}
          </div>
          {parsed.length > 0 && !reports && (
            <p className="text-xs text-muted-foreground">
              Parsed preview: {parsed.length} domain(s), {totalParsedTopics} topic(s).
            </p>
          )}
        </CardContent>
      </Card>

      {reports && (
        <>
          {/* Per-section summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((r) => {
              const pct = r.total ? Math.round((r.covered / r.total) * 100) : 0;
              const Icon = r.section.icon;
              const tone =
                pct >= 75
                  ? "text-green-600 dark:text-green-400"
                  : pct >= 40
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400";
              return (
                <Card key={r.section.key}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">{r.section.label}</p>
                      <Badge variant="outline" className="ml-auto text-[10px]">
                        {r.section.itemCount} items
                      </Badge>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between">
                        <span className={`text-2xl font-bold ${tone}`}>{pct}%</span>
                        <span className="text-xs text-muted-foreground">
                          {r.covered}/{r.total} covered
                        </span>
                      </div>
                      <Progress value={pct} className="h-1.5 mt-1" />
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3" /> {r.covered}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                        <AlertTriangle className="h-3 w-3" /> {r.partial}
                      </span>
                      <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <XCircle className="h-3 w-3" /> {r.missing}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Per-section detail tabs */}
          <Tabs defaultValue={reports[0]?.section.key} className="w-full">
            <TabsList className="flex-wrap h-auto">
              {reports.map((r) => {
                const pct = r.total ? Math.round((r.covered / r.total) * 100) : 0;
                return (
                  <TabsTrigger key={r.section.key} value={r.section.key} className="text-xs md:text-sm">
                    {r.section.label}
                    <Badge variant="secondary" className="ml-2">
                      {pct}%
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {reports.map((r) => (
              <TabsContent key={r.section.key} value={r.section.key} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <r.section.icon className="h-5 w-5 text-primary" />
                      {r.section.label}
                    </CardTitle>
                    <CardDescription>
                      ✅ {r.covered} covered · ⚠️ {r.partial} partial · ❌ {r.missing} missing — of{" "}
                      {r.total} pasted syllabus topics. This section currently has{" "}
                      <strong>{r.section.itemCount}</strong> content items in the app.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Accordion type="multiple" className="space-y-2">
                  {r.domains.map((d) => {
                    const pct = d.total ? Math.round((d.covered / d.total) * 100) : 0;
                    return (
                      <AccordionItem
                        key={d.domainName}
                        value={d.domainName}
                        className="border border-border rounded-lg px-4 bg-card/50"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 flex-1 text-left">
                            <span className="font-semibold text-sm">{d.domainName}</span>
                            <Badge variant="outline" className="text-[10px]">
                              {d.covered}/{d.total} ({pct}%)
                            </Badge>
                            <div className="ml-auto flex gap-2 text-xs">
                              <span className="text-green-600 dark:text-green-400">✅ {d.covered}</span>
                              <span className="text-yellow-600 dark:text-yellow-400">⚠️ {d.partial}</span>
                              <span className="text-red-600 dark:text-red-400">❌ {d.missing}</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2 pt-2">
                          {d.topics.map((t, idx) => {
                            const status =
                              t.bestScore >= COVERED_THRESHOLD
                                ? {
                                    icon: CheckCircle2,
                                    color: "text-green-500",
                                    label: "Covered",
                                    variant: "default" as const,
                                  }
                                : t.bestScore >= PARTIAL_THRESHOLD
                                  ? {
                                      icon: AlertTriangle,
                                      color: "text-yellow-500",
                                      label: "Partial",
                                      variant: "secondary" as const,
                                    }
                                  : {
                                      icon: XCircle,
                                      color: "text-red-500",
                                      label: "Missing",
                                      variant: "destructive" as const,
                                    };
                            const Icon = status.icon;
                            return (
                              <div
                                key={idx}
                                className="border border-border rounded-md p-2.5 bg-background/40"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1 min-w-0">
                                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${status.color}`} />
                                    <p className="text-sm">{t.topic.raw}</p>
                                  </div>
                                  <Badge variant={status.variant} className="shrink-0 text-[10px]">
                                    {status.label}
                                    {t.bestScore > 0 && ` · ${Math.round(t.bestScore * 100)}%`}
                                  </Badge>
                                </div>
                                {t.bestMatch && t.bestScore >= PARTIAL_THRESHOLD && (
                                  <p className="text-[11px] text-muted-foreground mt-1 ml-6 truncate">
                                    Best match: <span className="italic">{t.bestMatch}</span>
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
}
