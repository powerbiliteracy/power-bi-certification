import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import { prepareDataContent } from "@/data/content/PrepareDataContent";
import { modelDataContent } from "@/data/content/ModelDataContent";
import { visualizeAnalyzeContent } from "@/data/content/VisualizeAnalyzeContent";
import { enhanceReportsContent } from "@/data/content/EnhanceReportsContent";

const domains = [
  { id: "prepare", label: "Prepare Data", weight: "25–30%", color: "text-amber-400", content: prepareDataContent },
  { id: "model", label: "Model Data", weight: "25–30%", color: "text-blue-400", content: modelDataContent },
  { id: "visualize", label: "Visualize & Analyze", weight: "25–30%", color: "text-emerald-400", content: visualizeAnalyzeContent },
  { id: "enhance", label: "Enhance Reports", weight: "25–30%", color: "text-violet-400", content: enhanceReportsContent },
];

function TopicCard({ title, content }: { title: string; content: any }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setExpanded(!expanded)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          {title}
          <Badge variant="outline" className="text-[10px]">{expanded ? "▲" : "▼"}</Badge>
        </CardTitle>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4 text-sm">
          {content.overview && (
            <div>
              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Key Concepts</h4>
              <ul className="space-y-1">
                {content.overview.concepts?.map((c: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-primary">›</span>{c}</li>
                ))}
              </ul>
            </div>
          )}
          {content.bestPractices && (
            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Best Practices</h4>
              <ul className="space-y-1">
                {content.bestPractices.map((b: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-emerald-400">✓</span>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {content.commonMistakes && (
            <div>
              <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Common Mistakes</h4>
              <ul className="space-y-1">
                {content.commonMistakes.map((m: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-red-400">✗</span>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {content.examTips && (
            <div>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Exam Tips</h4>
              <ul className="space-y-1">
                {content.examTips.map((t: string, i: number) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2"><span className="text-amber-400">💡</span>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default function Cheatsheets() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">PL-300 Cheat Sheets</h1>
          <p className="text-sm text-muted-foreground">Quick reference for all four exam domains</p>
        </div>
        <FavoriteButton itemId="cheatsheets" itemType="page" />
      </div>

      <Tabs defaultValue="prepare">
        <TabsList className="flex-wrap h-auto gap-1">
          {domains.map(d => (
            <TabsTrigger key={d.id} value={d.id} className="gap-1 text-xs">
              <span className={d.color}>●</span> {d.label}
              <Badge variant="outline" className="text-[9px] px-1 py-0">{d.weight}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {domains.map(d => (
          <TabsContent key={d.id} value={d.id} className="mt-4 space-y-3">
            {d.content && Object.entries(d.content).map(([title, content]) => (
              <TopicCard key={title} title={title} content={content} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
