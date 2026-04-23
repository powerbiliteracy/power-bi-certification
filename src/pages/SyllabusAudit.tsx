import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertTriangle, XCircle, ClipboardPaste, FileSearch, Sparkles, Copy } from "lucide-react";
import { interactiveLessons } from "@/data/interactiveLessons";
import { pl300Syllabus } from "@/data/SyllabusData";
import { CHECKLIST_DOMAINS } from "@/data/checklistData";

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

// Normalize text for fuzzy matching
const normalize = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Tokenize for keyword overlap
const tokens = (s: string): Set<string> => {
  const stop = new Set([
    "the", "a", "an", "and", "or", "to", "of", "for", "in", "on", "by", "with",
    "use", "using", "create", "configure", "apply", "set", "your", "data", "is",
    "are", "be", "as", "from", "at", "into", "how", "when", "what", "which",
  ]);
  return new Set(
    normalize(s)
      .split(" ")
      .filter((w) => w.length > 2 && !stop.has(w))
  );
};

// Jaccard-ish similarity
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

/**
 * Parse a pasted syllabus. Supports common Microsoft Learn formats:
 *
 * Domain headings: lines that look like
 *   "Prepare the data (25–30%)"
 *   "Manage and secure Power BI (15–20%)"
 *
 * Section headings: lines starting with no bullet but matching known prefixes
 *   "Get or connect to data"
 *   "Profile and clean the data"
 *
 * Topics: bullet lines starting with "-", "*", "•", or indented text.
 */
function parseSyllabus(text: string): ParsedDomain[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/\u00a0/g, " ").trimEnd())
    .filter((l) => l.trim().length > 0);

  const domains: ParsedDomain[] = [];
  let currentDomain: ParsedDomain | null = null;
  let currentSection: ParsedSection | null = null;

  const domainRegex = /^([A-Z][A-Za-z0-9 ,&'/\-]+?)\s*\(?\s*(\d{1,2}\s*[\-–]\s*\d{1,2}\s*%|\d{1,2}\s*%)\s*\)?\s*$/;
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

    // Treat as section heading if inside a domain and not a bullet
    if (currentDomain && line.trim().length > 0 && !line.startsWith("Skills measured")) {
      // Skip very long lines (probably paragraphs), keep concise headings
      if (line.length <= 120 && !line.endsWith(".")) {
        currentSection = { title: line.trim(), topics: [] };
        currentDomain.sections.push(currentSection);
        continue;
      }
    }
  }

  return domains;
}

interface CoverageHit {
  source: "lesson" | "syllabusData" | "checklist";
  label: string;
  score: number;
}

interface TopicCoverage {
  topic: ParsedTopic;
  hits: CoverageHit[];
  bestScore: number;
}

interface SectionCoverage {
  title: string;
  topics: TopicCoverage[];
}

interface DomainCoverage {
  name: string;
  weight?: string;
  sections: SectionCoverage[];
  totals: { total: number; covered: number; partial: number; missing: number };
}

const COVERED_THRESHOLD = 0.5;
const PARTIAL_THRESHOLD = 0.25;

function buildAppCorpus() {
  const corpus: { source: CoverageHit["source"]; label: string }[] = [];

  // Interactive lessons
  for (const l of interactiveLessons) {
    corpus.push({ source: "lesson", label: `${l.title} — ${l.description}` });
  }

  // Official syllabus data inside the app
  for (const d of pl300Syllabus.domains) {
    for (const s of d.sections) {
      for (const t of s.topics) {
        corpus.push({ source: "syllabusData", label: t });
      }
    }
  }

  // Exam checklist items
  for (const d of CHECKLIST_DOMAINS) {
    for (const s of d.sections) {
      for (const item of s.items) {
        corpus.push({ source: "checklist", label: item.label });
      }
    }
  }

  return corpus;
}

function analyzeCoverage(parsed: ParsedDomain[]): DomainCoverage[] {
  const corpus = buildAppCorpus();

  return parsed.map((d) => {
    const sections: SectionCoverage[] = d.sections.map((s) => {
      const topics: TopicCoverage[] = s.topics.map((t) => {
        let hits: CoverageHit[] = corpus
          .map((c) => ({ source: c.source, label: c.label, score: similarity(t.raw, c.label) }))
          .filter((h) => h.score >= PARTIAL_THRESHOLD)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        const bestScore = hits[0]?.score ?? 0;
        return { topic: t, hits, bestScore };
      });

      return { title: s.title, topics };
    });

    let total = 0,
      covered = 0,
      partial = 0,
      missing = 0;
    for (const s of sections) {
      for (const t of s.topics) {
        total++;
        if (t.bestScore >= COVERED_THRESHOLD) covered++;
        else if (t.bestScore >= PARTIAL_THRESHOLD) partial++;
        else missing++;
      }
    }

    return { name: d.name, weight: d.weight, sections, totals: { total, covered, partial, missing } };
  });
}

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

export default function SyllabusAudit() {
  const { isAdmin, loading, viewingAsUser } = useAuth();
  const { toast } = useToast();
  const [raw, setRaw] = useState("");
  const [analyzed, setAnalyzed] = useState<DomainCoverage[] | null>(null);

  const parsed = useMemo(() => (raw.trim() ? parseSyllabus(raw) : []), [raw]);

  // Same pattern as Admin.tsx — viewingAsUser makes isAdmin false, so check both
  const realIsAdmin = !loading && (isAdmin || viewingAsUser);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!realIsAdmin) return <Navigate to="/Dashboard" replace />;

  const handleAnalyze = () => {
    if (!raw.trim()) {
      toast({ title: "Paste the syllabus first", description: "Copy the latest PL-300 Skills measured outline and paste it into the box.", variant: "destructive" });
      return;
    }
    const result = analyzeCoverage(parsed);
    setAnalyzed(result);
    toast({ title: "Audit complete", description: `Parsed ${parsed.length} domain(s) with ${parsed.reduce((a, d) => a + d.sections.reduce((b, s) => b + s.topics.length, 0), 0)} topic(s).` });
  };

  const handleLoadSample = () => setRaw(SAMPLE);
  const handleClear = () => {
    setRaw("");
    setAnalyzed(null);
  };

  const grandTotals = analyzed?.reduce(
    (acc, d) => ({
      total: acc.total + d.totals.total,
      covered: acc.covered + d.totals.covered,
      partial: acc.partial + d.totals.partial,
      missing: acc.missing + d.totals.missing,
    }),
    { total: 0, covered: 0, partial: 0, missing: 0 }
  );

  const handleExport = () => {
    if (!analyzed) return;
    const lines: string[] = [];
    lines.push(`# PL-300 Syllabus Audit — ${new Date().toISOString().slice(0, 10)}`);
    lines.push("");
    if (grandTotals) {
      lines.push(`Total topics: ${grandTotals.total} | ✅ Covered: ${grandTotals.covered} | ⚠️ Partial: ${grandTotals.partial} | ❌ Missing: ${grandTotals.missing}`);
      lines.push("");
    }
    for (const d of analyzed) {
      lines.push(`## ${d.name}${d.weight ? ` (${d.weight})` : ""}`);
      lines.push(`Covered: ${d.totals.covered}/${d.totals.total} · Partial: ${d.totals.partial} · Missing: ${d.totals.missing}`);
      for (const s of d.sections) {
        lines.push(`\n### ${s.title}`);
        for (const t of s.topics) {
          const status = t.bestScore >= COVERED_THRESHOLD ? "✅" : t.bestScore >= PARTIAL_THRESHOLD ? "⚠️" : "❌";
          lines.push(`- ${status} ${t.topic.raw}`);
          if (t.hits.length > 0) {
            for (const h of t.hits.slice(0, 2)) {
              lines.push(`    - ${h.source}: ${h.label} (${Math.round(h.score * 100)}%)`);
            }
          }
        }
      }
      lines.push("");
    }
    const text = lines.join("\n");
    navigator.clipboard.writeText(text);
    toast({ title: "Audit copied to clipboard", description: "Paste it into your notes or share with the team." });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileSearch className="h-8 w-8 text-primary" /> Syllabus Audit
        </h1>
        <p className="text-muted-foreground mt-1">
          Paste the latest official PL-300 <em>Skills measured</em> outline. The tool parses each domain, section, and topic
          and checks whether your app already covers it across <strong>Interactive Lessons</strong>, the in-app{" "}
          <strong>Syllabus</strong> data, and the <strong>Exam Checklist</strong>.
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
            . Domain headings should include their weight, e.g. <code>Prepare the data (25–30%)</code>. Topics should be bulleted with <code>-</code>, <code>*</code>, or <code>•</code>.
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
            {analyzed && (
              <Button variant="secondary" onClick={handleExport} className="ml-auto">
                <Copy className="h-4 w-4 mr-2" /> Copy report
              </Button>
            )}
          </div>
          {parsed.length > 0 && !analyzed && (
            <p className="text-xs text-muted-foreground">
              Parsed preview: {parsed.length} domain(s),{" "}
              {parsed.reduce((a, d) => a + d.sections.reduce((b, s) => b + s.topics.length, 0), 0)} topic(s).
            </p>
          )}
        </CardContent>
      </Card>

      {analyzed && grandTotals && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Total topics</p>
                <p className="text-2xl font-bold">{grandTotals.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" /> Covered
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{grandTotals.covered}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" /> Partial
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{grandTotals.partial}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-red-500" /> Missing
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{grandTotals.missing}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue={analyzed[0]?.name ?? "all"} className="w-full">
            <TabsList className="flex-wrap h-auto">
              {analyzed.map((d) => (
                <TabsTrigger key={d.name} value={d.name} className="text-xs md:text-sm">
                  {d.name}
                  <Badge variant="secondary" className="ml-2">
                    {d.totals.covered}/{d.totals.total}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {analyzed.map((d) => (
              <TabsContent key={d.name} value={d.name} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {d.name} {d.weight && <span className="text-sm text-muted-foreground">({d.weight})</span>}
                    </CardTitle>
                    <CardDescription>
                      ✅ {d.totals.covered} covered · ⚠️ {d.totals.partial} partial · ❌ {d.totals.missing} missing
                    </CardDescription>
                  </CardHeader>
                </Card>

                {d.sections.map((s) => (
                  <Card key={s.title}>
                    <CardHeader>
                      <CardTitle className="text-base">{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {s.topics.map((t, idx) => {
                        const status =
                          t.bestScore >= COVERED_THRESHOLD
                            ? { icon: CheckCircle2, color: "text-green-500", label: "Covered", variant: "default" as const }
                            : t.bestScore >= PARTIAL_THRESHOLD
                              ? { icon: AlertTriangle, color: "text-yellow-500", label: "Partial", variant: "secondary" as const }
                              : { icon: XCircle, color: "text-red-500", label: "Missing", variant: "destructive" as const };
                        const Icon = status.icon;
                        return (
                          <div key={idx} className="border border-border rounded-lg p-3 bg-card/50">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${status.color}`} />
                                <p className="text-sm font-medium">{t.topic.raw}</p>
                              </div>
                              <Badge variant={status.variant} className="shrink-0">
                                {status.label} {t.bestScore > 0 && `· ${Math.round(t.bestScore * 100)}%`}
                              </Badge>
                            </div>
                            {t.hits.length > 0 && (
                              <ul className="mt-2 ml-6 space-y-1">
                                {t.hits.slice(0, 3).map((h, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                                      {h.source === "lesson" ? "Lesson" : h.source === "syllabusData" ? "Syllabus" : "Checklist"}
                                    </Badge>
                                    <span className="truncate">{h.label}</span>
                                    <span className="text-muted-foreground/70 shrink-0">{Math.round(h.score * 100)}%</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
}
