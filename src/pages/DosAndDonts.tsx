import { useState } from "react";
import { DOS_DONTS_DOMAINS } from "@/data/dosAndDontsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FavoriteButton from "@/components/FavoriteButton";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import { cn } from "@/lib/utils";

const domainColors = ["text-blue-400", "text-violet-400", "text-cyan-400", "text-orange-400"];

export default function DosAndDonts() {
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (id: string) => setOpenTopics(prev => ({ ...prev, [id]: !prev[id] }));

  const totalDos = DOS_DONTS_DOMAINS.reduce((s, d) => s + d.subtopics.reduce((ss, st) => ss + st.dos.length, 0), 0);
  const totalDonts = DOS_DONTS_DOMAINS.reduce((s, d) => s + d.subtopics.reduce((ss, st) => ss + st.donts.length, 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Complete Dos & Don'ts</h1>
          <p className="text-sm text-muted-foreground">Every exam objective mapped to a best practice — with reasoning</p>
        </div>
        <div className="flex items-center gap-2">
          <SyllabusSyncButton
            sectionLabel="Dos & Don'ts"
            corpus={DOS_DONTS_DOMAINS.flatMap(d => d.subtopics.flatMap(st => [st.title, ...st.bullets, ...st.dos.map(x => x.text), ...st.donts.map(x => x.text)]))}
            itemCount={DOS_DONTS_DOMAINS.reduce((s, d) => s + d.subtopics.length, 0)}
          />
          <FavoriteButton itemId="dos-and-donts" itemType="page" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DOS_DONTS_DOMAINS.map((d, i) => (
          <Card key={d.id} className="p-3 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior: "smooth" })}>
            <div className={cn("text-xs font-mono uppercase tracking-wider", domainColors[i])}>Domain 0{i + 1}</div>
            <div className="text-sm font-bold text-foreground">{d.title}</div>
            <div className="text-xs text-muted-foreground">{d.weight}</div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="text-emerald-400 font-semibold">{totalDos} Dos</span>
        <span className="text-red-400 font-semibold">{totalDonts} Don'ts</span>
      </div>

      {DOS_DONTS_DOMAINS.map((domain, dIdx) => (
        <Card key={domain.id} id={domain.id} className={cn("border-t-2", dIdx === 0 ? "border-t-blue-500" : dIdx === 1 ? "border-t-violet-500" : dIdx === 2 ? "border-t-cyan-500" : "border-t-orange-500")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Badge variant="outline" className={cn("font-mono", domainColors[dIdx])}>0{dIdx + 1}</Badge>
              {domain.title}
              <span className="ml-auto text-xs text-muted-foreground font-normal">{domain.weight}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {domain.subtopics.map(st => (
              <Collapsible key={st.id} open={openTopics[st.id]} onOpenChange={() => toggleTopic(st.id)}>
                <CollapsibleTrigger className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <span className="text-xs text-muted-foreground font-mono">{st.id}</span>
                  <span className="text-sm font-semibold text-foreground flex-1 text-left">{st.title}</span>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", openTopics[st.id] && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid md:grid-cols-2 gap-4 p-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" /> Do
                      </div>
                      {st.dos.map((item, i) => (
                        <div key={i} className="rounded-lg overflow-hidden">
                          <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-emerald-400" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{item.text}</p>
                              <p className="text-xs text-muted-foreground mt-1"><span className="text-emerald-400 font-semibold">Why: </span>{item.reason}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider">
                        <div className="w-2 h-2 rounded-full bg-red-400" /> Don't
                      </div>
                      {st.donts.map((item, i) => (
                        <div key={i} className="rounded-lg overflow-hidden">
                          <div className="bg-red-500/5 border border-red-500/20 p-3 flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <X className="w-3 h-3 text-red-400" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{item.text}</p>
                              <p className="text-xs text-muted-foreground mt-1"><span className="text-red-400 font-semibold">Risk: </span>{item.reason}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
