import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileImage, Plus, Pencil, Trash2, Upload, ShieldCheck, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { pl300Syllabus } from "@/data/SyllabusData";
import { runImageQC, type QCResult } from "@/lib/imageQuality";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Summary {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  syllabus_domain: string | null;
  syllabus_subtopic: string | null;
  sort_order: number;
  is_active: boolean;
}

const empty = (): Omit<Summary, "id"> => ({
  title: "",
  description: "",
  image_url: "",
  syllabus_domain: pl300Syllabus.domains[0]?.title ?? "",
  syllabus_subtopic: "",
  sort_order: 0,
  is_active: true,
});

const domainOrder = pl300Syllabus.domains.map((d) => d.title);
const subtopicOrder = new Map(
  pl300Syllabus.domains.flatMap((domain) =>
    domain.sections.map((section, index) => [`${domain.title}:::${section.title}`, index] as const)
  )
);

export default function PageSummariesAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Summary | null>(null);
  const [form, setForm] = useState<Omit<Summary, "id">>(empty());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formQC, setFormQC] = useState<QCResult | null>(null);
  const [qcOverride, setQcOverride] = useState(false);
  const [qcResults, setQcResults] = useState<Record<string, QCResult>>({});
  const [qcRunning, setQcRunning] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_summaries")
      .select("*");
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    } else if (data) {
      // Sort by syllabus domain order, then subtopic order, then sort_order
      const sorted = [...data].sort((a: any, b: any) => {
        const ai = domainOrder.indexOf(a.syllabus_domain || "");
        const bi = domainOrder.indexOf(b.syllabus_domain || "");
        const aRank = ai === -1 ? 999 : ai;
        const bRank = bi === -1 ? 999 : bi;
        if (aRank !== bRank) return aRank - bRank;
        const aSub = subtopicOrder.get(`${a.syllabus_domain || ""}:::${a.syllabus_subtopic || ""}`) ?? 999;
        const bSub = subtopicOrder.get(`${b.syllabus_domain || ""}:::${b.syllabus_subtopic || ""}`) ?? 999;
        if (aSub !== bSub) return aSub - bSub;
        return (a.sort_order ?? 0) - (b.sort_order ?? 0);
      });
      setItems(sorted as any);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(empty());
    setFormQC(null);
    setQcOverride(false);
    setDialogOpen(true);
  };

  const openEdit = (s: Summary) => {
    setEditing(s);
    setForm({
      title: s.title,
      description: s.description ?? "",
      image_url: s.image_url,
      syllabus_domain: s.syllabus_domain ?? "",
      syllabus_subtopic: s.syllabus_subtopic ?? "",
      sort_order: s.sort_order,
      is_active: s.is_active,
    });
    setFormQC(qcResults[s.id] ?? null);
    setQcOverride(false);
    setDialogOpen(true);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setFormQC(null);
    setQcOverride(false);
    let qc: QCResult | null = null;
    try {
      qc = await runImageQC(file);
      setFormQC(qc);
    } catch (e) {
      console.warn("QC failed", e);
    }
    const ext = file.name.split(".").pop() ?? "png";
    const path = `${user?.id ?? "anon"}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("page-summaries").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) {
      setUploading(false);
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return;
    }
    const { data } = supabase.storage.from("page-summaries").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
    setUploading(false);
    if (qc && !qc.ok) {
      toast({
        title: "Quality check failed",
        description: "Image may be hard to read. Review issues below before saving.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Image uploaded" });
    }
  };

  const runQCOnAll = async () => {
    setQcRunning(true);
    const out: Record<string, QCResult> = {};
    for (const it of items) {
      try {
        out[it.id] = await runImageQC(it.image_url);
      } catch (e) {
        // skip
      }
    }
    setQcResults(out);
    setQcRunning(false);
    const failed = Object.values(out).filter((r) => !r.ok).length;
    const warned = Object.values(out).filter((r) => r.ok && r.issues.length).length;
    toast({
      title: "Quality check complete",
      description: `${failed} failing, ${warned} warnings, ${Object.keys(out).length - failed - warned} clean.`,
    });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.image_url.trim()) {
      toast({ title: "Missing fields", description: "Title and image are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description?.trim() || null,
      image_url: form.image_url,
      syllabus_domain: form.syllabus_domain?.trim() || null,
      syllabus_subtopic: form.syllabus_subtopic?.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    };
    let error;
    if (editing) {
      ({ error } = await supabase.from("page_summaries").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("page_summaries").insert([{ ...payload, created_by: user?.id ?? null }]));
    }
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Updated" : "Created" });
    setDialogOpen(false);
    load();
  };

  const handleDelete = async (s: Summary) => {
    if (!confirm(`Delete "${s.title}"?`)) return;
    const { error } = await supabase.from("page_summaries").delete().eq("id", s.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      load();
    }
  };

  const toggleActive = async (s: Summary, v: boolean) => {
    const { error } = await supabase.from("page_summaries").update({ is_active: v }).eq("id", s.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      setItems((prev) => prev.map((i) => (i.id === s.id ? { ...i, is_active: v } : i)));
    }
  };

  const subtopicsForDomain = (domainTitle: string) => {
    const d = pl300Syllabus.domains.find((x) => x.title === domainTitle);
    return d?.sections.map((s) => s.title) ?? [];
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="w-5 h-5" /> Page Summaries
          </CardTitle>
          <CardDescription>
            Upload one-pager summary images. Sorted by PL-300 syllabus domain, then by sort order.
          </CardDescription>
        </div>
        <Button onClick={openNew} size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> New summary
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground py-4">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No summaries yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Domain / Subtopic</TableHead>
                <TableHead className="w-20">Order</TableHead>
                <TableHead className="w-20">Active</TableHead>
                <TableHead className="w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <img src={s.image_url} alt="" className="w-16 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell className="text-xs">
                    <div>{s.syllabus_domain || "—"}</div>
                    <div className="text-muted-foreground">{s.syllabus_subtopic || ""}</div>
                  </TableCell>
                  <TableCell>{s.sort_order}</TableCell>
                  <TableCell>
                    <Switch checked={s.is_active} onCheckedChange={(v) => toggleActive(s, v)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => openEdit(s)} className="h-8 px-2">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(s)}
                        className="h-8 px-2 text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit summary" : "New page summary"}</DialogTitle>
              <DialogDescription>Upload an image and tag it to a syllabus domain.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="DAX CALCULATE Cheatsheet"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Image</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(f);
                    }}
                    disabled={uploading}
                  />
                  {uploading && <span className="text-xs text-muted-foreground">Uploading…</span>}
                </div>
                {form.image_url && (
                  <div className="mt-2">
                    <img src={form.image_url} alt="" className="max-h-40 rounded border" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Syllabus domain</label>
                  <Select
                    value={form.syllabus_domain ?? ""}
                    onValueChange={(v) => setForm({ ...form, syllabus_domain: v, syllabus_subtopic: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {pl300Syllabus.domains.map((d) => (
                        <SelectItem key={d.id} value={d.title}>
                          {d.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Subtopic</label>
                  <Select
                    value={form.syllabus_subtopic ?? ""}
                    onValueChange={(v) => setForm({ ...form, syllabus_subtopic: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subtopic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subtopicsForDomain(form.syllabus_domain ?? "").map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Description (optional)</label>
                <Textarea
                  value={form.description ?? ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-end">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Sort order (within domain)</label>
                  <Input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.is_active}
                    onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                  />
                  <span className="text-sm">Active (visible to users)</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving || uploading}>
                {saving ? "Saving…" : editing ? "Save changes" : "Create summary"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
