import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Archive, Copy, Eye, History, Plus, Trash2 } from "lucide-react";

interface SyllabusVersion {
  id: string;
  exam_code: string;
  label: string;
  source_url: string | null;
  notes: string | null;
  content: string;
  created_at: string;
  created_by: string;
}

interface Props {
  /** Optional: prefill the textarea when "Save as version" is clicked from outside */
  initialContent?: string;
  /** Optional: callback when user clicks "Use this version" — receives the raw content */
  onUseVersion?: (content: string) => void;
}

export default function SyllabusVersionsManager({ initialContent, onUseVersion }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [versions, setVersions] = useState<SyllabusVersion[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [label, setLabel] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const [viewing, setViewing] = useState<SyllabusVersion | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SyllabusVersion | null>(null);

  const fetchVersions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("syllabus_versions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load versions", description: error.message, variant: "destructive" });
    } else {
      setVersions(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  const openAdd = () => {
    setLabel(`PL-300 — ${new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}`);
    setSourceUrl("https://learn.microsoft.com/credentials/certifications/resources/study-guides/pl-300");
    setNotes("");
    setContent(initialContent ?? "");
    setShowAdd(true);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!label.trim() || !content.trim()) {
      toast({
        title: "Label and content required",
        description: "Give the version a label and paste the syllabus text.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("syllabus_versions").insert({
      label: label.trim(),
      source_url: sourceUrl.trim() || null,
      notes: notes.trim() || null,
      content,
      created_by: user.id,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Version saved", description: `"${label}" added to history.` });
    setShowAdd(false);
    fetchVersions();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase
      .from("syllabus_versions")
      .delete()
      .eq("id", deleteTarget.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Version deleted" });
      fetchVersions();
    }
    setDeleteTarget(null);
  };

  const handleCopy = (v: SyllabusVersion) => {
    navigator.clipboard.writeText(v.content);
    toast({ title: "Copied", description: `"${v.label}" copied to clipboard.` });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" /> Saved syllabus versions
            </CardTitle>
            <CardDescription>
              Every PL-300 syllabus you paste in is kept here so you can compare what changed over time.
            </CardDescription>
          </div>
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4 mr-2" /> Save new version
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading versions…</p>
        ) : versions.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground space-y-2">
            <Archive className="h-8 w-8 mx-auto opacity-50" />
            <p className="text-sm">No syllabus versions saved yet.</p>
            <p className="text-xs">
              Click <strong>Save new version</strong> to store the current PL-300 outline.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {versions.map((v) => (
              <div
                key={v.id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-accent/40 transition"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold truncate">{v.label}</p>
                    <Badge variant="outline" className="text-[10px]">
                      {v.exam_code}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Saved {new Date(v.created_at).toLocaleString()} ·{" "}
                    {v.content.length.toLocaleString()} chars
                  </p>
                  {v.notes && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{v.notes}</p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => setViewing(v)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleCopy(v)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteTarget(v)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Add version dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Save a new syllabus version</DialogTitle>
            <DialogDescription>
              Paste the latest PL-300 outline. We'll keep it in history so you can refer back later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="ver-label">Label</Label>
              <Input
                id="ver-label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. PL-300 — April 2026"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ver-url">Source URL (optional)</Label>
              <Input
                id="ver-url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://learn.microsoft.com/..."
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ver-notes">Notes (optional)</Label>
              <Textarea
                id="ver-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What changed in this version?"
                className="min-h-[60px]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ver-content">Syllabus content</Label>
              <Textarea
                id="ver-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the full PL-300 Skills measured outline…"
                className="min-h-[260px] font-mono text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowAdd(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save version"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View version dialog */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewing?.label}</DialogTitle>
            <DialogDescription>
              Saved {viewing && new Date(viewing.created_at).toLocaleString()}
              {viewing?.source_url && (
                <>
                  {" · "}
                  <a
                    href={viewing.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary"
                  >
                    Source
                  </a>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {viewing?.notes && (
            <div className="text-sm bg-muted/50 p-3 rounded-md">
              <p className="font-medium text-xs text-muted-foreground mb-1">Notes</p>
              {viewing.notes}
            </div>
          )}
          <pre className="whitespace-pre-wrap font-mono text-xs bg-muted/40 p-4 rounded-md max-h-[55vh] overflow-y-auto border">
            {viewing?.content}
          </pre>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => viewing && handleCopy(viewing)}>
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            {onUseVersion && (
              <Button
                onClick={() => {
                  if (viewing) {
                    onUseVersion(viewing.content);
                    setViewing(null);
                    toast({ title: "Loaded into audit", description: viewing.label });
                  }
                }}
              >
                Use in audit
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this version?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.label}" will be removed permanently. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
