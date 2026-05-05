import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { pl300Syllabus } from "@/data/SyllabusData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileImage, Search, Maximize2, X, ZoomIn, ZoomOut, Maximize, MoveHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [fullscreen, setFullscreen] = useState<Summary | null>(null);
  const [fullscreenZoom, setFullscreenZoom] = useState(1);
  const [fitMode, setFitMode] = useState<"page" | "width" | "free">("width");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const openFullscreen = (summary: Summary) => {
    setFullscreen(summary);
    setFitMode("width");
  };

  const recomputeFit = (mode: "page" | "width") => {
    const c = scrollRef.current;
    const img = imgRef.current;
    if (!c || !img || !img.naturalWidth) return;
    if (mode === "width") {
      setFullscreenZoom(c.clientWidth / img.naturalWidth);
    } else {
      const z = Math.min(c.clientWidth / img.naturalWidth, c.clientHeight / img.naturalHeight);
      setFullscreenZoom(z);
    }
  };

  useEffect(() => {
    if (!fullscreen || fitMode === "free") return;
    const handler = () => recomputeFit(fitMode);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [fullscreen, fitMode]);

  const adjustZoom = (delta: number, focal?: { x: number; y: number }) => {
    const c = scrollRef.current;
    const img = imgRef.current;
    if (!c || !img) return;
    const oldZoom = fullscreenZoom;
    const newZoom = Math.min(8, Math.max(0.1, Number((oldZoom + delta).toFixed(3))));
    if (newZoom === oldZoom) return;
    // Focal point in image-natural coordinates
    const fx = focal ? (c.scrollLeft + focal.x) / oldZoom : (c.scrollLeft + c.clientWidth / 2) / oldZoom;
    const fy = focal ? (c.scrollTop + focal.y) / oldZoom : (c.scrollTop + c.clientHeight / 2) / oldZoom;
    setFitMode("free");
    setFullscreenZoom(newZoom);
    requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const targetX = focal ? focal.x : c.clientWidth / 2;
      const targetY = focal ? focal.y : c.clientHeight / 2;
      scrollRef.current.scrollLeft = fx * newZoom - targetX;
      scrollRef.current.scrollTop = fy * newZoom - targetY;
    });
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const c = scrollRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const focal = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    adjustZoom(e.altKey ? -0.5 : 0.5, focal);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const c = scrollRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const focal = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    adjustZoom(e.deltaY < 0 ? 0.2 : -0.2, focal);
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("page_summaries")
        .select("*")
        .eq("is_active", true);
      if (data) {
        const domainOrder = pl300Syllabus.domains.map((d) => d.title);
        const subtopicOrder = new Map(
          pl300Syllabus.domains.flatMap((domain) =>
            domain.sections.map((section, index) => [`${domain.title}:::${section.title}`, index] as const)
          )
        );
        const sorted = [...(data as Summary[])].sort((a, b) => {
          const aDomain = domainOrder.indexOf(a.syllabus_domain || "");
          const bDomain = domainOrder.indexOf(b.syllabus_domain || "");
          const aRank = aDomain === -1 ? 999 : aDomain;
          const bRank = bDomain === -1 ? 999 : bDomain;
          if (aRank !== bRank) return aRank - bRank;
          const aSub = subtopicOrder.get(`${a.syllabus_domain || ""}:::${a.syllabus_subtopic || ""}`) ?? 999;
          const bSub = subtopicOrder.get(`${b.syllabus_domain || ""}:::${b.syllabus_subtopic || ""}`) ?? 999;
          if (aSub !== bSub) return aSub - bSub;
          return (a.sort_order || 0) - (b.sort_order || 0);
        });
        setItems(sorted);
      }
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

  // Group: domain -> subtopic -> items[]
  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, Summary[]>>();
    for (const i of filtered) {
      const d = i.syllabus_domain || "Other";
      const s = i.syllabus_subtopic || "General";
      if (!map.has(d)) map.set(d, new Map());
      const sub = map.get(d)!;
      if (!sub.has(s)) sub.set(s, []);
      sub.get(s)!.push(i);
    }
    return Array.from(map.entries()).map(([d, subs]) => ({
      domain: d,
      subtopics: Array.from(subs.entries()).map(([s, list]) => ({ subtopic: s, list })),
      total: Array.from(subs.values()).reduce((n, l) => n + l.length, 0),
    }));
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileImage className="w-7 h-7 text-primary" /> Summary of a Page
        </h1>
        <p className="text-muted-foreground mt-1">
          Quick visual one-pager summaries for each PL-300 topic. Click an image's expand icon for full screen.
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
        <Accordion type="multiple" className="space-y-3">
          {grouped.map(({ domain, subtopics, total }) => (
            <AccordionItem
              key={domain}
              value={`domain-${domain}`}
              className="border rounded-lg bg-card px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{domain}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {total} summaries · {subtopics.length} modules
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple" className="space-y-2 pt-2">
                  {subtopics.map(({ subtopic, list }) => (
                    <AccordionItem
                      key={subtopic}
                      value={`sub-${domain}-${subtopic}`}
                      className="border rounded-md px-3 bg-background"
                    >
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex items-center gap-2 text-left">
                          <span className="font-medium text-sm">{subtopic}</span>
                          <span className="text-xs text-muted-foreground">({list.length})</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                          {list.map((s) => (
                            <Card key={s.id} className="overflow-hidden group">
                              <div className="relative aspect-video bg-muted overflow-hidden">
                                <img
                                  src={s.image_url}
                                  alt={s.title}
                                  loading="lazy"
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="secondary"
                                  className="absolute top-2 right-2 h-8 w-8 opacity-90 shadow"
                                  onClick={() => openFullscreen(s)}
                                  aria-label="View full screen"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <CardHeader className="py-3">
                                <CardTitle className="text-sm">{s.title}</CardTitle>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur flex flex-col"
          onClick={() => setFullscreen(null)}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b">
            <div className="min-w-0">
              <h3 className="font-semibold">{fullscreen.title}</h3>
              {fullscreen.syllabus_subtopic && (
                <p className="text-xs text-muted-foreground">{fullscreen.syllabus_subtopic}</p>
              )}
            </div>
            <div className="flex items-center gap-1 rounded-md border bg-card p-1" onClick={(e) => e.stopPropagation()}>
              <Button size="icon" variant="ghost" onClick={() => adjustZoom(-0.25)} aria-label="Zoom out">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="w-14 text-center text-xs tabular-nums text-muted-foreground">
                {Math.round(fullscreenZoom * 100)}%
              </span>
              <Button size="icon" variant="ghost" onClick={() => adjustZoom(0.25)} aria-label="Zoom in">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={fitMode === "page" ? "secondary" : "ghost"}
                onClick={() => setFitMode("page")}
                title="Fit entire page in view"
              >
                <Maximize className="w-4 h-4 mr-1" /> Page
              </Button>
              <Button
                size="sm"
                variant={fitMode === "width" ? "secondary" : "ghost"}
                onClick={() => setFitMode("width")}
                title="Fit image width to view"
              >
                <MoveHorizontal className="w-4 h-4 mr-1" /> Width
              </Button>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreen(null);
              }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto p-4"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
          >
            <div className="min-h-full min-w-full flex items-start justify-center">
              <img
                ref={imgRef}
                src={fullscreen.image_url}
                alt={fullscreen.title}
                onLoad={() => fitMode !== "free" && recomputeFit(fitMode)}
                onClick={handleImageClick}
                className="h-auto max-w-none rounded border shadow-lg cursor-zoom-in select-none"
                style={{
                  width: imgRef.current?.naturalWidth
                    ? `${imgRef.current.naturalWidth * fullscreenZoom}px`
                    : `${fullscreenZoom * 100}%`,
                  imageRendering: fullscreenZoom >= 2 ? "crisp-edges" : "auto",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
