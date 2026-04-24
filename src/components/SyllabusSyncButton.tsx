import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  FileSearch,
  Clock,
  Wrench,
  ExternalLink,
  Check,
  Sparkles,
  Users,
  Loader2,
} from "lucide-react";
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
  /** Stable label shown in the dialog header (e.g. "Exam Checklist"). */
  sectionLabel: string;
  /** Stable key used in the DB for overrides + update events. */
  sectionKey: string;
  /** Item type passed to the AI generator (e.g. "checklist_item", "flashcard"). */
  itemType: string;
  /** user_progress.item_type values used to count affected users. */
  progressItemTypes?: string[];
  /** Strings representing every topic / lesson / card on this page. */
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
const fixedKey = (label: string) => `syllabus-sync-fixed:${label}`;

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

interface PendingFix {
  match: TopicMatch;
  isRename: boolean;
}

export default function SyllabusSyncButton({
  sectionLabel,
  sectionKey,
  itemType,
  progressItemTypes,
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
  const [fixed, setFixed] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(fixedKey(sectionLabel));
      return new Set<string>(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set<string>();
    }
  });
  const [fixingKey, setFixingKey] = useState<string | null>(null);
  const [confirmFix, setConfirmFix] = useState<PendingFix | null>(null);
  const [affectedUsers, setAffectedUsers] = useState<number | null>(null);
  const [countingUsers, setCountingUsers] = useState(false);
  const [appliedFixes, setAppliedFixes] = useState<
    Array<{ topic: string; isRename: boolean; closestMatch?: string }>
  >([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(lastSyncKey(sectionLabel));
      setLastSync(raw ? JSON.parse(raw) : null);
    } catch {
      setLastSync(null);
    }
    try {
      const raw = localStorage.getItem(fixedKey(sectionLabel));
      setFixed(new Set<string>(raw ? JSON.parse(raw) : []));
    } catch {
      setFixed(new Set<string>());
    }
  }, [sectionLabel]);

  const persistFixed = (next: Set<string>) => {
    setFixed(next);
    try {
      localStorage.setItem(fixedKey(sectionLabel), JSON.stringify(Array.from(next)));
    } catch {
      /* ignore quota errors */
    }
  };

  const markFixed = (key: string) => {
    const next = new Set(fixed);
    next.add(key);
    persistFixed(next);
  };

  const undoFixed = (key: string) => {
    const next = new Set(fixed);
    next.delete(key);
    persistFixed(next);
  };

  const clearFixed = () => persistFixed(new Set());

  const runSync = async () => {
    setLoading(true);
    setReport(null);
    setVersion(null);
    setAppliedFixes([]);
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
      const versionMeta: VersionMeta = {
        id: data.id,
        label: data.label,
        created_at: data.created_at,
        notes: data.notes,
      };
      setVersion(versionMeta);
      setReport(result);
      setOpen(true);

      const pctNow = result.total ? Math.round((result.covered / result.total) * 100) : 0;
      const summary: LastSync = {
        syncedAt: new Date().toISOString(),
        versionLabel: data.label,
        versionDate: data.created_at,
        pct: pctNow,
        covered: result.covered,
        partial: result.partial,
        missing: result.missing,
        total: result.total,
      };
      try {
        localStorage.setItem(lastSyncKey(sectionLabel), JSON.stringify(summary));
      } catch {
        /* ignore quota errors */
      }
      setLastSync(summary);

      toast({
        title: "Sync complete",
        description: `${result.covered}/${result.total} syllabus topics covered (${pctNow}%).`,
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
    lines.push(
      `Coverage: ${report.covered}/${report.total} covered, ${report.partial} partial, ${report.missing} missing`,
    );
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

  const requestFix = async (match: TopicMatch, isRename: boolean) => {
    setConfirmFix({ match, isRename });
    setAffectedUsers(null);
    if (progressItemTypes && progressItemTypes.length > 0) {
      setCountingUsers(true);
      try {
        const { count } = await supabase
          .from("user_progress")
          .select("user_id", { count: "exact", head: true })
          .in("item_type", progressItemTypes);
        setAffectedUsers(count ?? 0);
      } catch {
        setAffectedUsers(null);
      } finally {
        setCountingUsers(false);
      }
    } else {
      setAffectedUsers(0);
    }
  };

  const applyFixCore = async (match: TopicMatch, isRename: boolean) => {
    if (!version) return false;
    const key = topicKey(match);
    setFixingKey(key);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content-fix", {
        body: {
          sectionKey,
          sectionLabel,
          itemType,
          topic: match.topic.raw,
          domainName: match.domainName,
          domainSection: match.sectionTitle,
          syllabusVersionId: version.id,
          closestMatch: match.bestMatch,
          isRename,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setAppliedFixes((prev) => [
        ...prev,
        { topic: match.topic.raw, isRename, closestMatch: match.bestMatch },
      ]);
      markFixed(key);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not apply fix";
      toast({ title: `Fix failed: ${match.topic.raw}`, description: message, variant: "destructive" });
      return false;
    } finally {
      setFixingKey(null);
    }
  };

  const confirmAndApplyFix = async () => {
    if (!confirmFix) return;
    const { match, isRename } = confirmFix;
    const ok = await applyFixCore(match, isRename);
    if (ok) {
      toast({
        title: "Fix applied",
        description: `AI-generated content saved for "${match.topic.raw}".`,
      });
      setConfirmFix(null);
    }
  };

  const [fixingAll, setFixingAll] = useState(false);
  const [fixAllProgress, setFixAllProgress] = useState<{ done: number; total: number } | null>(null);

  const fixAll = async () => {
    if (!report || !version) return;
    const targets: Array<{ match: TopicMatch; isRename: boolean }> = [
      ...report.missingTopics
        .filter((m) => !fixed.has(topicKey(m)))
        .map((m) => ({ match: m, isRename: false })),
      ...report.partialTopics
        .filter((m) => !fixed.has(topicKey(m)))
        .map((m) => ({ match: m, isRename: true })),
    ];
    if (targets.length === 0) return;

    setFixingAll(true);
    setFixAllProgress({ done: 0, total: targets.length });
    let ok = 0;
    let failed = 0;
    for (let i = 0; i < targets.length; i++) {
      const { match, isRename } = targets[i];
      const success = await applyFixCore(match, isRename);
      if (success) ok++;
      else failed++;
      setFixAllProgress({ done: i + 1, total: targets.length });
    }
    setFixingAll(false);
    setFixAllProgress(null);
    toast({
      title: "Fix all complete",
      description: `${ok} fixed${failed ? `, ${failed} failed` : ""}.`,
    });
  };

  const publishUpdateEvent = async () => {
    if (appliedFixes.length === 0 || !version) return;
    const added = appliedFixes.filter((f) => !f.isRename).length;
    const renamed = appliedFixes.filter((f) => f.isRename).length;
    const summaryParts: string[] = [];
    if (added) summaryParts.push(`${added} added`);
    if (renamed) summaryParts.push(`${renamed} renamed`);
    const summary = summaryParts.join(", ");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");

      const { error } = await supabase.from("content_update_events").insert({
        section_key: sectionKey,
        section_label: sectionLabel,
        summary,
        added_count: added,
        renamed_count: renamed,
        syllabus_version_label: version.label,
        syllabus_version_id: version.id,
        details: appliedFixes,
        created_by: user.id,
      });
      if (error) throw error;
      toast({
        title: "Users will be notified",
        description: `${summary} on next visit to ${sectionLabel}.`,
      });
      setAppliedFixes([]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not publish update";
      toast({ title: "Notify failed", description: message, variant: "destructive" });
    }
  };

  // Filter out topics already fixed
  const visible = useMemo(() => {
    if (!report) return null;
    const keep = (m: TopicMatch) => !fixed.has(topicKey(m));
    return {
      missing: report.missingTopics.filter(keep),
      partial: report.partialTopics.filter(keep),
      covered: report.coveredTopics,
    };
  }, [report, fixed]);

  const pct = report?.total ? Math.round((report.covered / report.total) * 100) : 0;
  const fixedCount = fixed.size;

  if (!isAdmin) return null;

  return (
    <>
      <div className="inline-flex flex-col items-end gap-0.5">
        <Button variant="outline" size="sm" onClick={runSync} disabled={loading} className="gap-1">
          <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
          {loading ? "Syncing…" : "Sync with latest syllabus"}
        </Button>
        {lastSync && !loading && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            title={`Last synced ${new Date(lastSync.syncedAt).toLocaleString()} against ${lastSync.versionLabel}`}
          >
            <Clock className="w-2.5 h-2.5" />
            Last sync {formatRelative(lastSync.syncedAt)} · {lastSync.pct}% match
          </button>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
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
              ) : lastSync ? (
                <>
                  Last synced {formatRelative(lastSync.syncedAt)} against{" "}
                  <strong>{lastSync.versionLabel}</strong>. Click <em>Re-run</em> to refresh.
                </>
              ) : (
                "No saved syllabus version found. Save one on the Syllabus Audit page first."
              )}
            </DialogDescription>
          </DialogHeader>

          {report && visible && (
            <>
              <div className="space-y-3 px-6 pb-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Coverage
                    </div>
                    <div className="text-3xl font-bold">{pct}%</div>
                  </div>
                  <div className="flex gap-2 text-sm flex-wrap">
                    <Badge variant="outline" className="gap-1 border-emerald-500/40 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> {report.covered} covered
                    </Badge>
                    <Badge variant="outline" className="gap-1 border-amber-500/40 text-amber-400">
                      <AlertTriangle className="w-3 h-3" /> {report.partial} partial
                    </Badge>
                    <Badge variant="outline" className="gap-1 border-red-500/40 text-red-400">
                      <XCircle className="w-3 h-3" /> {report.missing} missing
                    </Badge>
                    {fixedCount > 0 && (
                      <Badge variant="outline" className="gap-1 border-primary/40 text-primary">
                        <Check className="w-3 h-3" /> {fixedCount} fixed
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={pct} className="h-2" />
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {(visible.missing.length > 0 || visible.partial.length > 0) && (
                      <Button
                        size="sm"
                        onClick={fixAll}
                        disabled={fixingAll || !!fixingKey}
                        className="gap-1 h-7"
                      >
                        {fixingAll ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Fixing {fixAllProgress?.done}/{fixAllProgress?.total}…
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            Fix all ({visible.missing.length + visible.partial.length})
                          </>
                        )}
                      </Button>
                    )}
                    {fixedCount > 0 && (
                      <Button variant="ghost" size="sm" className="text-xs h-6" onClick={clearFixed}>
                        Reset fixed list
                      </Button>
                    )}
                  </div>
                  {appliedFixes.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={publishUpdateEvent}
                      className="gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Notify users ({appliedFixes.length})
                    </Button>
                  )}
                </div>
              </div>

              <ScrollArea className="flex-1 min-h-0 px-6">
                <div className="space-y-4 pb-4">
                  <Accordion type="multiple" defaultValue={["missing", "partial"]}>
                    {visible.missing.length > 0 && (
                      <AccordionItem value="missing">
                        <AccordionTrigger className="text-sm">
                          <span className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-400" />
                            Missing ({visible.missing.length}) — consider adding
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TopicList
                            topics={visible.missing}
                            variant="missing"
                            fixed={fixed}
                            fixingKey={fixingKey}
                            onFix={(m) => requestFix(m, false)}
                            onUndoFix={(k) => undoFixed(k)}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {visible.partial.length > 0 && (
                      <AccordionItem value="partial">
                        <AccordionTrigger className="text-sm">
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            Partial ({visible.partial.length}) — possibly renamed
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TopicList
                            topics={visible.partial}
                            variant="partial"
                            fixed={fixed}
                            fixingKey={fixingKey}
                            onFix={(m) => requestFix(m, true)}
                            onUndoFix={(k) => undoFixed(k)}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {visible.covered.length > 0 && (
                      <AccordionItem value="covered">
                        <AccordionTrigger className="text-sm">
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Covered ({visible.covered.length})
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TopicList
                            topics={visible.covered}
                            variant="covered"
                            fixed={fixed}
                            fixingKey={fixingKey}
                          />
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runSync}
                  disabled={loading}
                  className="gap-1"
                >
                  <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} /> Re-run
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Per-topic Fix confirmation */}
      <Dialog
        open={!!confirmFix}
        onOpenChange={(o) => !o && !fixingKey && setConfirmFix(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Apply AI-generated fix?
            </DialogTitle>
            <DialogDescription>
              The app will use AI to generate content for this {confirmFix?.isRename ? "renamed" : "missing"} topic
              and save it as a published override on the {sectionLabel} page.
            </DialogDescription>
          </DialogHeader>

          {confirmFix && (
            <div className="space-y-3 text-sm">
              <div className="rounded-md border p-3 bg-card">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  Syllabus topic
                </div>
                <div className="font-medium text-foreground">{confirmFix.match.topic.raw}</div>
                {confirmFix.isRename && confirmFix.match.bestMatch && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Will replace closest existing item:{" "}
                    <span className="italic">"{confirmFix.match.bestMatch}"</span>
                  </div>
                )}
              </div>

              <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 flex gap-2">
                <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-foreground">User impact</p>
                  <p className="text-muted-foreground mt-0.5">
                    {countingUsers
                      ? "Counting affected users…"
                      : affectedUsers === null
                        ? "Could not estimate user impact."
                        : affectedUsers === 0
                          ? "No users currently track progress in this section."
                          : `${affectedUsers} user${affectedUsers === 1 ? "" : "s"} have progress in this section. They'll see a banner asking whether to accept the new content or keep their snapshot.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmFix(null)}
              disabled={!!fixingKey}
            >
              Cancel
            </Button>
            <Button onClick={confirmAndApplyFix} disabled={!!fixingKey} className="gap-1">
              {fixingKey ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Apply fix
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function topicKey(m: TopicMatch): string {
  return `${m.domainName}|${m.sectionTitle}|${m.topic.normalized}`;
}

function TopicList({
  topics,
  variant,
  fixed,
  fixingKey,
  onFix,
  onUndoFix,
}: {
  topics: TopicMatch[];
  variant: "covered" | "partial" | "missing";
  fixed: Set<string>;
  fixingKey: string | null;
  onFix?: (m: TopicMatch) => void;
  onUndoFix?: (key: string) => void;
}) {
  const { toast } = useToast();
  const tone =
    variant === "covered"
      ? "border-emerald-500/30 bg-emerald-500/5"
      : variant === "partial"
        ? "border-amber-500/30 bg-amber-500/5"
        : "border-red-500/30 bg-red-500/5";

  const copyTopic = (raw: string) => {
    navigator.clipboard.writeText(raw);
    toast({ title: "Topic copied", description: "Paste it into your content file or notes." });
  };

  return (
    <ul className="space-y-2">
      {topics.map((m, i) => {
        const key = topicKey(m);
        const isFixed = fixed.has(key);
        const isThisFixing = fixingKey === key;
        return (
          <li key={i} className={cn("rounded-md border p-3 text-sm", tone, isFixed && "opacity-60")}>
            <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between gap-2">
              <span>
                {m.domainName} · {m.sectionTitle}
              </span>
              {isFixed && (
                <Badge variant="outline" className="text-[9px] border-primary/40 text-primary">
                  Fixed by AI
                </Badge>
              )}
            </div>
            <div className="font-medium text-foreground">{m.topic.raw}</div>
            {m.bestMatch ? (
              <div className="text-xs text-muted-foreground mt-1">
                {variant === "missing" ? "weak match" : "closest in app"}:{" "}
                <span className="italic">"{m.bestMatch}"</span> ·{" "}
                {Math.round(m.bestScore * 100)}% match
              </div>
            ) : (
              <div className="text-xs text-muted-foreground mt-1">no match in app content</div>
            )}

            {variant !== "covered" && (
              <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-border/50">
                {!isFixed && onFix && (
                  <Button
                    size="sm"
                    className="h-6 text-[11px] gap-1"
                    onClick={() => onFix(m)}
                    disabled={isThisFixing}
                  >
                    {isThisFixing ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" /> Fixing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" /> Fix issue
                      </>
                    )}
                  </Button>
                )}
                {isFixed && onUndoFix && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 text-[11px] gap-1"
                    onClick={() => onUndoFix(key)}
                  >
                    <Check className="w-3 h-3" /> Undo
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-[11px] gap-1"
                  onClick={() => copyTopic(m.topic.raw)}
                >
                  <Copy className="w-3 h-3" /> Copy topic
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-[11px] gap-1"
                  asChild
                >
                  <Link to="/SyllabusAudit">
                    <ExternalLink className="w-3 h-3" /> Open Syllabus Audit
                  </Link>
                </Button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
