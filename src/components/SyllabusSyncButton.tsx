import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RefreshCw, CheckCircle2, AlertTriangle, XCircle, Copy, FileSearch, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  parseSyllabus,
  analyzeCoverage,
  type CoverageReport,
  type TopicMatch,
} from "@/utils/syllabusSync";
import { cn } from "@/lib/utils";

interface SyllabusSyncButtonProps {
  /** Stable key shown in dialog header (e.g. "Exam Checklist") */
  sectionLabel: string;
  /** Strings representing every topic/lesson/card/etc. on this page. */
  corpus: string[];
  /** Total content items in the section (for context line). */
  itemCount: number;
}

interface VersionMeta {
  id: string;
  label: string;
  created_at: string;
  notes: string | null;
}

interface LastSync {
  syncedAt: string;
  versionLabel: string;
  versionDate: string;
  pct: number;
  covered: number;
  partial: number;
  missing: number;
  total: number;
}

const lastSyncKey = (label: string) => `syllabus-sync:${label}`;

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function SyllabusSyncButton({
  sectionLabel,
  corpus,
  itemCount,
}: SyllabusSyncButtonProps) {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState<VersionMeta | null>(null);
  const [report, setReport] = useState<CoverageReport | null>(null);
  const [lastSync, setLastSync] = useState<LastSync | null>(() => {
    try {
      const raw = localStorage.getItem(lastSyncKey(sectionLabel));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(lastSyncKey(sectionLabel));
      setLastSync(raw ? JSON.parse(raw) : null);
    } catch {
      setLastSync(null);
    }
  }, [sectionLabel]);

  if (!isAdmin) return null;

  const runSync = async () => {
    setLoading(true);
    setReport(null);
    setVersion(null);
    try {
      const { data, error } = await supabase
        .from("syllabus_versions")
        .select("id, label, created_at, notes, content")
        .eq("exam_code", "PL-300")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast({
          title: "No saved syllabus version",
          description: "Save a version on the Syllabus Audit page first.",
          variant: "destructive",
        });
        setOpen(true);
        return;
      }

      const parsed = parseSyllabus(data.content);
      const result = analyzeCoverage(parsed, corpus);
      setVersion({
        id: data.id,
        label: data.label,
        created_at: data.created_at,
        notes: data.notes,
      });
      setReport(result);
      setOpen(true);

      toast({
        title: "Sync complete",
        description: `${result.covered}/${result.total} syllabus topics covered.`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to sync";
      toast({ title: "Sync failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!report || !version) return;
    const lines: string[] = [];
    lines.push(`# ${sectionLabel} — Sync vs "${version.label}"`);
    lines.push(`Saved: ${new Date(version.created_at).toLocaleString()}`);
    lines.push(`Coverage: ${report.covered}/${report.total} covered, ${report.partial} partial, ${report.missing} missing`);
    lines.push("");
    if (report.missingTopics.length) {
      lines.push("## Missing topics");
      for (const m of report.missingTopics) {
        lines.push(`- [${m.domainName} → ${m.sectionTitle}] ${m.topic.raw}`);
      }
      lines.push("");
    }
    if (report.partialTopics.length) {
      lines.push("## Partial / possibly renamed");
      for (const m of report.partialTopics) {
        lines.push(`- [${m.domainName}] "${m.topic.raw}"`);
        if (m.bestMatch) lines.push(`    closest in app: "${m.bestMatch}"`);
      }
    }
    navigator.clipboard.writeText(lines.join("\n"));
    toast({ title: "Report copied", description: "Paste into your notes." });
  };

  const pct = report?.total ? Math.round((report.covered / report.total) * 100) : 0;

  return (
    <>
      <Button variant="outline" size="sm" onClick={runSync} disabled={loading} className="gap-1">
        <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
        {loading ? "Syncing…" : "Sync with latest syllabus"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSearch className="w-5 h-5" />
              {sectionLabel} — Syllabus Sync Report
            </DialogTitle>
            <DialogDescription>
              {version ? (
                <>
                  Comparing <strong>{itemCount}</strong> items in this section against saved
                  version <strong>{version.label}</strong> (saved{" "}
                  {new Date(version.created_at).toLocaleDateString()}).
                </>
              ) : (
                "No saved syllabus version found. Save one on the Syllabus Audit page first."
              )}
            </DialogDescription>
          </DialogHeader>

          {report && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Coverage
                    </div>
                    <div className="text-3xl font-bold">{pct}%</div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Badge variant="outline" className="gap-1 border-emerald-500/40 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> {report.covered} covered
                    </Badge>
                    <Badge variant="outline" className="gap-1 border-amber-500/40 text-amber-400">
                      <AlertTriangle className="w-3 h-3" /> {report.partial} partial
                    </Badge>
                    <Badge variant="outline" className="gap-1 border-red-500/40 text-red-400">
                      <XCircle className="w-3 h-3" /> {report.missing} missing
                    </Badge>
                  </div>
                </div>
                <Progress value={pct} className="h-2" />
              </div>

              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4">
                  <Accordion type="multiple" defaultValue={["missing", "partial"]}>
                    {report.missingTopics.length > 0 && (
                      <AccordionItem value="missing">
                        <AccordionTrigger className="text-sm">
                          <span className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-400" />
                            Missing ({report.missingTopics.length}) — consider adding
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TopicList topics={report.missingTopics} variant="missing" />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {report.partialTopics.length > 0 && (
                      <AccordionItem value="partial">
                        <AccordionTrigger className="text-sm">
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            Partial ({report.partialTopics.length}) — possibly renamed
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TopicList topics={report.partialTopics} variant="partial" />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {report.coveredTopics.length > 0 && (
                      <AccordionItem value="covered">
                        <AccordionTrigger className="text-sm">
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Covered ({report.coveredTopics.length})
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TopicList topics={report.coveredTopics} variant="covered" />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" onClick={copyReport} className="gap-1">
                  <Copy className="w-3 h-3" /> Copy report
                </Button>
                <Button variant="outline" size="sm" onClick={runSync} disabled={loading} className="gap-1">
                  <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} /> Re-run
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function TopicList({
  topics,
  variant,
}: {
  topics: TopicMatch[];
  variant: "covered" | "partial" | "missing";
}) {
  const tone =
    variant === "covered"
      ? "border-emerald-500/30 bg-emerald-500/5"
      : variant === "partial"
        ? "border-amber-500/30 bg-amber-500/5"
        : "border-red-500/30 bg-red-500/5";
  return (
    <ul className="space-y-2">
      {topics.map((m, i) => (
        <li key={i} className={cn("rounded-md border p-3 text-sm", tone)}>
          <div className="text-xs text-muted-foreground mb-1">
            {m.domainName} · {m.sectionTitle}
          </div>
          <div className="font-medium text-foreground">{m.topic.raw}</div>
          {m.bestMatch && variant !== "missing" && (
            <div className="text-xs text-muted-foreground mt-1">
              closest in app: <span className="italic">"{m.bestMatch}"</span> ·{" "}
              {Math.round(m.bestScore * 100)}% match
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
