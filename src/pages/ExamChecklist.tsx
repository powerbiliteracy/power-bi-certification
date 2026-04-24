import { useState, useMemo } from "react";
import { CHECKLIST_DOMAINS } from "@/data/checklistData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronDown, RotateCcw, Check } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FavoriteButton from "@/components/FavoriteButton";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import ContentUpdateBanner from "@/components/ContentUpdateBanner";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "exam-checklist-checked";

export default function ExamChecklist() {
  const [checked, setChecked] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  });
  const [openDomains, setOpenDomains] = useState<Record<number, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const totalItems = useMemo(() => CHECKLIST_DOMAINS.reduce((sum, d) => sum + d.sections.reduce((s, sec) => s + sec.items.length, 0), 0), []);
  const overallPct = totalItems > 0 ? Math.round((checked.length / totalItems) * 100) : 0;

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const reset = () => { setChecked([]); localStorage.removeItem(STORAGE_KEY); };

  const getDomainProgress = (dIdx: number) => {
    const d = CHECKLIST_DOMAINS[dIdx];
    const total = d.sections.reduce((s, sec) => s + sec.items.length, 0);
    const done = d.sections.reduce((s, sec, sIdx) => s + sec.items.filter((_, iIdx) => checked.includes(`${dIdx}-${sIdx}-${iIdx}`)).length, 0);
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const tagColors: Record<string, string> = {
    HOT: "bg-red-500/15 text-red-400 border-red-500/30",
    DAX: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    PQ: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Exam Readiness Checklist</h1>
          <p className="text-sm text-muted-foreground">Track your preparation across all four exam domains</p>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton itemId="exam-checklist" itemType="page" />
          <SyllabusSyncButton
            sectionLabel="Exam Checklist"
            sectionKey="exam-checklist"
            itemType="checklist_item"
            corpus={CHECKLIST_DOMAINS.flatMap(d => d.sections.flatMap(s => s.items.map(i => i.label)))}
            itemCount={totalItems}
          />
          <Button variant="outline" size="sm" onClick={reset} className="gap-1"><RotateCcw className="w-3 h-3" /> Reset</Button>
        </div>
      </div>

      <ContentUpdateBanner sectionKey="exam-checklist" />

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Overall Readiness</div>
              <div className="text-3xl font-bold text-foreground">{overallPct}%</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{checked.length} / {totalItems} items</div>
              <Badge variant={overallPct >= 80 ? "default" : overallPct >= 50 ? "secondary" : "outline"}>
                {overallPct >= 80 ? "Ready" : overallPct >= 50 ? "Getting There" : "Keep Studying"}
              </Badge>
            </div>
          </div>
          <Progress value={overallPct} className="h-3" />
        </CardContent>
      </Card>

      {CHECKLIST_DOMAINS.map((domain, dIdx) => {
        const { total, done, pct } = getDomainProgress(dIdx);
        return (
          <Collapsible key={dIdx} open={openDomains[dIdx]} onOpenChange={() => setOpenDomains(prev => ({ ...prev, [dIdx]: !prev[dIdx] }))}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center gap-4 cursor-pointer hover:bg-muted/30 transition-colors">
                  <span className="text-2xl">{domain.icon}</span>
                  <div className="flex-1 text-left">
                    <CardTitle className="text-base">{domain.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{domain.weight} · {done}/{total} complete</p>
                  </div>
                  <div className="w-24">
                    <Progress value={pct} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right mt-1">{pct}%</div>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", openDomains[dIdx] && "rotate-180")} />
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {domain.sections.map((section, sIdx) => (
                    <Collapsible key={sIdx} open={openSections[`${dIdx}-${sIdx}`]} onOpenChange={() => setOpenSections(prev => ({ ...prev, [`${dIdx}-${sIdx}`]: !prev[`${dIdx}-${sIdx}`] }))}>
                      <CollapsibleTrigger className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <span className="text-sm font-semibold text-foreground">{section.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{section.items.filter((_, iIdx) => checked.includes(`${dIdx}-${sIdx}-${iIdx}`)).length}/{section.items.length}</span>
                          <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform", openSections[`${dIdx}-${sIdx}`] && "rotate-180")} />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 mt-1">
                        {section.items.map((item, iIdx) => {
                          const id = `${dIdx}-${sIdx}-${iIdx}`;
                          const isChecked = checked.includes(id);
                          return (
                            <div key={iIdx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => toggle(id)}>
                              <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all", isChecked ? "bg-primary border-primary" : "border-muted-foreground/30")}>
                                {isChecked && <Check className="w-3 h-3 text-primary-foreground" />}
                              </div>
                              <div className="flex-1">
                                <span className={cn("text-sm", isChecked ? "text-muted-foreground line-through" : "text-foreground")}>{item.label}</span>
                                {item.tags?.map(tag => <Badge key={tag} variant="outline" className={cn("ml-2 text-[10px] px-1.5 py-0", tagColors[tag])}>{tag}</Badge>)}
                                {item.note && <p className="text-xs text-muted-foreground mt-0.5 italic">{item.note}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}
