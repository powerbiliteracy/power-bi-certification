import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileImage, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Summary {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  syllabus_domain: string | null;
  syllabus_subtopic: string | null;
  sort_order: number;
}

export default function PageSummaries() {
  const [items, setItems] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState<Summary | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("page_summaries")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (data) setItems(data as any);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.syllabus_domain?.toLowerCase().includes(q) ||
        i.syllabus_subtopic?.toLowerCase().includes(q)
    );
  }, [items, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, Summary[]>();
    for (const i of filtered) {
      const key = i.syllabus_domain || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(i);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileImage className="w-7 h-7 text-primary" /> Summary of a Page
        </h1>
        <p className="text-muted-foreground mt-1">
          Quick visual one-pager summaries for each PL-300 topic. Click any image to enlarge.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search summaries…"
          className="pl-9"
        />
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No summaries available yet.
          </CardContent>
        </Card>
      ) : (
        grouped.map(([domain, list]) => (
          <section key={domain} className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Badge variant="outline">{domain}</Badge>
              <span className="text-xs text-muted-foreground">{list.length} summaries</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((s) => (
                <Card
                  key={s.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setZoom(s)}
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={s.image_url}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">{s.title}</CardTitle>
                    {s.syllabus_subtopic && (
                      <p className="text-xs text-muted-foreground">{s.syllabus_subtopic}</p>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        ))
      )}

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>{zoom?.title}</DialogTitle>
          </DialogHeader>
          {zoom && (
            <div className="space-y-2">
              <img src={zoom.image_url} alt={zoom.title} className="w-full rounded-lg" />
              {zoom.description && (
                <p className="text-sm text-muted-foreground">{zoom.description}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
