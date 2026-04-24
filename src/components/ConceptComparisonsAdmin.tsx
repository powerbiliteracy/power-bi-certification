import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { GitCompare, Plus, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Row {
  aspect: string;
  left: string;
  right: string;
}

interface Comparison {
  id: string;
  title: string;
  category: string;
  description: string | null;
  left_label: string;
  right_label: string;
  rows: Row[];
  notes: string | null;
  sort_order: number;
  is_active: boolean;
}

const empty = (): Omit<Comparison, "id"> => ({
  title: "",
  category: "General",
  description: "",
  left_label: "Option A",
  right_label: "Option B",
  rows: [{ aspect: "", left: "", right: "" }],
  notes: "",
  sort_order: 0,
  is_active: true,
});

export default function ConceptComparisonsAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Comparison | null>(null);
  const [form, setForm] = useState<Omit<Comparison, "id">>(empty());
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("concept_comparisons")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    } else if (data) {
      setItems(
        data.map((d: any) => ({
          ...d,
          rows: Array.isArray(d.rows) ? d.rows : [],
          description: d.description ?? "",
          notes: d.notes ?? "",
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(empty());
    setDialogOpen(true);
  };

  const openEdit = (c: Comparison) => {
    setEditing(c);
    setForm({
      title: c.title,
      category: c.category,
      description: c.description ?? "",
      left_label: c.left_label,
      right_label: c.right_label,
      rows: c.rows?.length ? c.rows : [{ aspect: "", left: "", right: "" }],
      notes: c.notes ?? "",
      sort_order: c.sort_order,
      is_active: c.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.left_label.trim() || !form.right_label.trim()) {
      toast({
        title: "Missing fields",
        description: "Title, left label, and right label are required.",
        variant: "destructive",
      });
      return;
    }
    const cleanRows = form.rows.filter((r) => r.aspect.trim() || r.left.trim() || r.right.trim());
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      category: form.category.trim() || "General",
      description: form.description?.trim() || null,
      left_label: form.left_label.trim(),
      right_label: form.right_label.trim(),
      rows: cleanRows as any,
      notes: form.notes?.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    };

    let error;
    if (editing) {
      ({ error } = await supabase
        .from("concept_comparisons")
        .update(payload)
        .eq("id", editing.id));
    } else {
      ({ error } = await supabase
        .from("concept_comparisons")
        .insert([{ ...payload, created_by: user?.id ?? null }]));
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comparison?")) return;
    const { error } = await supabase.from("concept_comparisons").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      load();
    }
  };

  const toggleActive = async (c: Comparison, v: boolean) => {
    const { error } = await supabase
      .from("concept_comparisons")
      .update({ is_active: v })
      .eq("id", c.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      setItems((prev) => prev.map((i) => (i.id === c.id ? { ...i, is_active: v } : i)));
    }
  };

  const updateRow = (idx: number, key: keyof Row, value: string) => {
    setForm((f) => {
      const rows = [...f.rows];
      rows[idx] = { ...rows[idx], [key]: value };
      return { ...f, rows };
    });
  };

  const addRow = () =>
    setForm((f) => ({ ...f, rows: [...f.rows, { aspect: "", left: "", right: "" }] }));

  const removeRow = (idx: number) =>
    setForm((f) => ({ ...f, rows: f.rows.filter((_, i) => i !== idx) }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" /> Concept Comparisons
          </CardTitle>
          <CardDescription>
            Manage side-by-side comparison tables shown on the Concept Comparisons page.
          </CardDescription>
        </div>
        <Button onClick={openNew} size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> New comparison
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground py-4">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No comparisons yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-20">Rows</TableHead>
                <TableHead className="w-20">Order</TableHead>
                <TableHead className="w-24">Active</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    <div>{c.title}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {c.left_label} vs {c.right_label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {c.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{c.rows.length}</TableCell>
                  <TableCell>{c.sort_order}</TableCell>
                  <TableCell>
                    <Switch
                      checked={c.is_active}
                      onCheckedChange={(v) => toggleActive(c, v)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(c)}
                        className="h-8 px-2"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(c.id)}
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit comparison" : "New comparison"}</DialogTitle>
              <DialogDescription>
                Each row contains an aspect being compared and the value for each side.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Power Query vs DAX"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Category</label>
                  <Input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Modeling & Transformation"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Description</label>
                <Textarea
                  value={form.description ?? ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Left label</label>
                  <Input
                    value={form.left_label}
                    onChange={(e) => setForm({ ...form, left_label: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Right label</label>
                  <Input
                    value={form.right_label}
                    onChange={(e) => setForm({ ...form, right_label: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium">Comparison rows</label>
                  <Button size="sm" variant="outline" onClick={addRow} className="gap-1 h-7">
                    <Plus className="w-3 h-3" /> Add row
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.rows.map((r, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_1.5fr_1.5fr_auto] gap-2 items-start">
                      <Input
                        value={r.aspect}
                        onChange={(e) => updateRow(idx, "aspect", e.target.value)}
                        placeholder="Aspect"
                      />
                      <Textarea
                        value={r.left}
                        onChange={(e) => updateRow(idx, "left", e.target.value)}
                        placeholder={form.left_label}
                        rows={2}
                        className="min-h-[40px]"
                      />
                      <Textarea
                        value={r.right}
                        onChange={(e) => updateRow(idx, "right", e.target.value)}
                        placeholder={form.right_label}
                        rows={2}
                        className="min-h-[40px]"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeRow(idx)}
                        className="h-9 px-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Notes (optional)</label>
                <Textarea
                  value={form.notes ?? ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  placeholder="Pro tip or rule of thumb shown beneath the table"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-end">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Sort order</label>
                  <Input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm({ ...form, sort_order: Number(e.target.value) || 0 })
                    }
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
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : editing ? "Save changes" : "Create comparison"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
