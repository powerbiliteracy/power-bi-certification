import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, GitCompare, Info } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import { Skeleton } from "@/components/ui/skeleton";

interface ComparisonRow {
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
  rows: ComparisonRow[];
  notes: string | null;
  sort_order: number;
  is_active: boolean;
}

export default function ConceptComparisons() {
  const [items, setItems] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("concept_comparisons")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (!error && data) {
        setItems(
          data.map((d: any) => ({
            ...d,
            rows: Array.isArray(d.rows) ? d.rows : [],
          }))
        );
      }
      setLoading(false);
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["all", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    let list = items;
    if (activeCat !== "all") list = list.filter((i) => i.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      // Word-boundary-ish matching: split query into tokens and require each to appear
      const tokens = q.split(/\s+/).filter(Boolean);
      list = list.filter((i) => {
        const hay = [
          i.title,
          i.description ?? "",
          i.left_label,
          i.right_label,
          i.notes ?? "",
          ...(i.rows ?? []).flatMap((r) => [r.aspect, r.left, r.right]),
        ]
          .join(" \n ")
          .toLowerCase();
        return tokens.every((t) => hay.includes(t));
      });
    }
    return list;
  }, [items, search, activeCat]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--violet))] flex items-center justify-center shadow-md">
            <GitCompare className="w-5 h-5 text-[hsl(0,0%,100%)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Concept Comparisons</h1>
            <p className="text-sm text-muted-foreground">
              Side-by-side tables for the concepts most often confused on the PL-300 exam.
            </p>
          </div>
        </div>
      </header>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search comparisons (e.g. DAX, privacy, sharing)…"
              className="pl-9"
            />
          </div>
          <Tabs value={activeCat} onValueChange={setActiveCat}>
            <TabsList className="flex flex-wrap h-auto justify-start">
              {categories.map((c) => (
                <TabsTrigger key={c} value={c} className="capitalize">
                  {c === "all" ? "All" : c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No comparisons match your search.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filtered.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-lg">{c.title}</CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        {c.category}
                      </Badge>
                    </div>
                    {c.description && (
                      <CardDescription>{c.description}</CardDescription>
                    )}
                  </div>
                  <FavoriteButton itemId={c.id} itemType="comparison" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[28%]">Aspect</TableHead>
                        <TableHead className="w-[36%] text-[hsl(var(--indigo-light))]">
                          {c.left_label}
                        </TableHead>
                        <TableHead className="w-[36%] text-[hsl(var(--violet))]">
                          {c.right_label}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(c.rows ?? []).map((r, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium align-top">{r.aspect}</TableCell>
                          <TableCell className="align-top">{r.left}</TableCell>
                          <TableCell className="align-top">{r.right}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {c.notes && (
                  <div className="flex gap-2 text-sm bg-muted/50 rounded-md p-3">
                    <Info className="w-4 h-4 text-[hsl(var(--indigo-light))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{c.notes}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
