import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FavoriteButton from "@/components/FavoriteButton";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import ContentUpdateBanner from "@/components/ContentUpdateBanner";
import { prepareDataContent } from "@/data/content/PrepareDataContent";
import { modelDataContent } from "@/data/content/ModelDataContent";
import { visualizeAnalyzeContent } from "@/data/content/VisualizeAnalyzeContent";
import { enhanceReportsContent } from "@/data/content/EnhanceReportsContent";
import { pl300Syllabus } from "@/data/SyllabusData";
import { similarity } from "@/utils/syllabusSync";

const domains = [
  { id: "prepare", label: "Prepare Data", weight: "25–30%", color: "text-amber-400", content: prepareDataContent, syllabusId: "prepare_data" },
  { id: "model", label: "Model Data", weight: "25–30%", color: "text-blue-400", content: modelDataContent, syllabusId: "model_data" },
  { id: "visualize", label: "Visualize & Analyze", weight: "25–30%", color: "text-emerald-400", content: visualizeAnalyzeContent, syllabusId: "visualize_analyze" },
  { id: "enhance", label: "Enhance Reports", weight: "25–30%", color: "text-violet-400", content: enhanceReportsContent, syllabusId: "manage_secure" },
];

interface SyllabusDomain {
  id: string;
  title: string;
  sections: { title: string; topics: string[] }[];
}

function findBestSection(
  topic: string,
  syllabusDomain: SyllabusDomain | undefined,
): string {
  if (!syllabusDomain) return "Other";
  let bestSection = syllabusDomain.sections[0]?.title ?? "Other";
  let bestScore = 0;
  for (const sec of syllabusDomain.sections) {
    for (const synTopic of sec.topics) {
      const s = similarity(topic, synTopic);
      if (s > bestScore) {
        bestScore = s;
        bestSection = sec.title;
      }
    }
  }
  return bestSection;
}

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
  // Pre-group all topics per domain by their best-matching syllabus module
  const groupedByDomain = useMemo(() => {
    const result: Record<string, { module: string; topics: [string, any][] }[]> = {};
    for (const d of domains) {
      const syllabusDomain = pl300Syllabus.domains.find((sd) => sd.id === d.syllabusId);
      const grouped = new Map<string, [string, any][]>();
      // Seed in syllabus order so module order matches the official syllabus
      syllabusDomain?.sections.forEach((sec) => grouped.set(sec.title, []));
      for (const [title, content] of Object.entries(d.content || {})) {
        const sectionTitle = findBestSection(title, syllabusDomain);
        if (!grouped.has(sectionTitle)) grouped.set(sectionTitle, []);
        grouped.get(sectionTitle)!.push([title, content]);
      }
      result[d.id] = Array.from(grouped.entries())
        .filter(([, topics]) => topics.length > 0)
        .map(([module, topics]) => ({ module, topics }));
    }
    return result;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">PL-300 Cheat Sheets</h1>
          <p className="text-sm text-muted-foreground">Quick reference for all four exam domains</p>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton itemId="cheatsheets" itemType="page" />
          <SyllabusSyncButton
            sectionLabel="Cheat Sheets"
            sectionKey="cheatsheets"
            itemType="topic"
            corpus={domains.flatMap(d => Object.keys(d.content || {}))}
            itemCount={domains.reduce((sum, d) => sum + Object.keys(d.content || {}).length, 0)}
          />
        </div>
      </div>

      <ContentUpdateBanner sectionKey="cheatsheets" />

      <Tabs defaultValue="prepare">
        <TabsList className="flex-wrap h-auto gap-1">
          {domains.map(d => (
            <TabsTrigger key={d.id} value={d.id} className="gap-1 text-xs">
              <span className={d.color}>●</span> {d.label}
              <Badge variant="outline" className="text-[9px] px-1 py-0">{d.weight}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {domains.map(d => {
          const groups = groupedByDomain[d.id] ?? [];
          return (
            <TabsContent key={d.id} value={d.id} className="mt-4">
              {/* All modules collapsed by default */}
              <Accordion type="multiple" className="space-y-2">
                {groups.map(({ module, topics }) => (
                  <AccordionItem
                    key={module}
                    value={module}
                    className="border rounded-md px-3 bg-card"
                  >
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                      <span className="flex items-center gap-2 text-left">
                        <span className={d.color}>●</span>
                        <span className="font-medium">{module}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {topics.length} topic{topics.length === 1 ? "" : "s"}
                        </Badge>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1 pb-2">
                        {topics.map(([title, content]) => (
                          <TopicCard key={title} title={title} content={content} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
