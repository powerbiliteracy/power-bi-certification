import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Copy, Check } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Template {
  cat: string; complexity: string; title: string; desc: string; tags: string[]; code: string;
}

const CATEGORIES: Record<string, { color: string }> = {
  "Time Intelligence": { color: "text-blue-400" },
  "Aggregation": { color: "text-emerald-400" },
  "Filter & Context": { color: "text-amber-400" },
  "Ranking": { color: "text-orange-400" },
  "Ratios & Shares": { color: "text-pink-400" },
  "Logic & Conditions": { color: "text-teal-400" },
  "Text & Formatting": { color: "text-red-400" },
  "Iterators": { color: "text-violet-400" },
};

const TEMPLATES: Template[] = [
  { cat: "Time Intelligence", complexity: "basic", title: "Year-to-Date Sales", desc: "Cumulative sales from start of year.", tags: ["TOTALYTD"], code: "Sales YTD =\nTOTALYTD(\n    SUM( Sales[Amount] ),\n    'Date'[Date]\n)" },
  { cat: "Time Intelligence", complexity: "basic", title: "Same Period Last Year", desc: "Sales for equivalent period in prior year.", tags: ["SAMEPERIODLASTYEAR"], code: "Sales SPLY =\nCALCULATE(\n    SUM( Sales[Amount] ),\n    SAMEPERIODLASTYEAR( 'Date'[Date] )\n)" },
  { cat: "Time Intelligence", complexity: "intermediate", title: "Year-over-Year Growth %", desc: "Percentage change vs same period last year.", tags: ["DIVIDE", "SAMEPERIODLASTYEAR"], code: "YoY Growth % =\nVAR _CY = SUM( Sales[Amount] )\nVAR _PY = CALCULATE(\n    SUM( Sales[Amount] ),\n    SAMEPERIODLASTYEAR( 'Date'[Date] )\n)\nRETURN\nDIVIDE( _CY - _PY, _PY, BLANK() )" },
  { cat: "Time Intelligence", complexity: "intermediate", title: "Rolling 12-Month Sales", desc: "Sum over last 12 months.", tags: ["DATESINPERIOD"], code: "Sales R12M =\nCALCULATE(\n    SUM( Sales[Amount] ),\n    DATESINPERIOD(\n        'Date'[Date],\n        LASTDATE( 'Date'[Date] ),\n        -12, MONTH\n    )\n)" },
  { cat: "Time Intelligence", complexity: "advanced", title: "Custom Fiscal Year YTD", desc: "YTD using non-January fiscal year.", tags: ["TOTALYTD", "fiscal"], code: "Sales Fiscal YTD =\nTOTALYTD(\n    SUM( Sales[Amount] ),\n    'Date'[Date],\n    \"6/30\"\n)" },
  { cat: "Aggregation", complexity: "basic", title: "Total Sales", desc: "Simple sum of sales amount.", tags: ["SUM"], code: "Total Sales =\nSUM( Sales[Amount] )" },
  { cat: "Aggregation", complexity: "basic", title: "Distinct Customer Count", desc: "Count of unique customers.", tags: ["DISTINCTCOUNT"], code: "Customers =\nDISTINCTCOUNT( Sales[CustomerID] )" },
  { cat: "Aggregation", complexity: "basic", title: "Average Order Value", desc: "Mean sales per transaction.", tags: ["AVERAGEX"], code: "Avg Order Value =\nAVERAGEX(\n    Sales,\n    Sales[Quantity] * Sales[Unit Price]\n)" },
  { cat: "Filter & Context", complexity: "basic", title: "CALCULATE with Filter", desc: "Sales filtered to specific category.", tags: ["CALCULATE"], code: "Electronics Sales =\nCALCULATE(\n    SUM( Sales[Amount] ),\n    Sales[Category] = \"Electronics\"\n)" },
  { cat: "Filter & Context", complexity: "basic", title: "ALL – Remove All Filters", desc: "Total sales ignoring all filters.", tags: ["ALL"], code: "Total Sales All =\nCALCULATE(\n    SUM( Sales[Amount] ),\n    ALL( Sales )\n)" },
  { cat: "Ranking", complexity: "basic", title: "Rank Products by Sales", desc: "Rank each product highest to lowest.", tags: ["RANKX"], code: "Product Rank =\nRANKX(\n    ALL( Product[Name] ),\n    CALCULATE( SUM( Sales[Amount] ) ),\n    , DESC, DENSE\n)" },
  { cat: "Ranking", complexity: "intermediate", title: "Dynamic Top N Filter", desc: "Show only top N items using a parameter.", tags: ["RANKX", "TOPN"], code: "Top N Sales =\nVAR _N = SELECTEDVALUE( TopN[Value], 10 )\nVAR _Rank = RANKX(\n    ALL( Product[Name] ),\n    CALCULATE( SUM( Sales[Amount] ) ),\n    , DESC, DENSE\n)\nRETURN IF( _Rank <= _N, SUM( Sales[Amount] ), BLANK() )" },
  { cat: "Ratios & Shares", complexity: "basic", title: "% of Total Sales", desc: "Each row's share of total.", tags: ["DIVIDE", "ALL"], code: "% of Total =\nDIVIDE(\n    SUM( Sales[Amount] ),\n    CALCULATE( SUM( Sales[Amount] ), ALL( Sales ) )\n)" },
  { cat: "Ratios & Shares", complexity: "basic", title: "Gross Margin %", desc: "Margin as percentage of revenue.", tags: ["DIVIDE"], code: "Gross Margin % =\nDIVIDE(\n    SUM( Sales[Margin] ),\n    SUM( Sales[Revenue] ),\n    0\n)" },
  { cat: "Logic & Conditions", complexity: "basic", title: "SWITCH Classification", desc: "Range-based label using SWITCH(TRUE()).", tags: ["SWITCH"], code: "Rating =\nSWITCH(\n    TRUE(),\n    [Score] >= 90, \"Excellent\",\n    [Score] >= 70, \"Good\",\n    [Score] >= 50, \"Average\",\n    \"Poor\"\n)" },
  { cat: "Iterators", complexity: "intermediate", title: "Revenue (Qty × Price)", desc: "Row-by-row calculation then sum.", tags: ["SUMX"], code: "Revenue =\nSUMX(\n    Sales,\n    Sales[Qty] * Sales[UnitPrice]\n)" },
];

export default function DAXTemplates() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let list = TEMPLATES;
    if (activeCat !== "all") list = list.filter(t => t.cat === activeCat);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q)) || t.code.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeCat]);

  const grouped = useMemo(() => {
    const map: Record<string, Template[]> = {};
    filtered.forEach(t => { (map[t.cat] ??= []).push(t); });
    return map;
  }, [filtered]);

  const copyCode = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopied(title);
    toast({ title: "Copied!", description: `${title} copied to clipboard.` });
    setTimeout(() => setCopied(null), 2000);
  };

  const complexityColor = (c: string) => c === "basic" ? "text-emerald-400 bg-emerald-500/10" : c === "intermediate" ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">DAX Template Library</h1>
          <p className="text-sm text-muted-foreground">{TEMPLATES.length} templates · {Object.keys(CATEGORIES).length} categories</p>
        </div>
        <FavoriteButton itemId="dax-templates" itemType="page" />
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search templates, functions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} results</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={activeCat === "all" ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setActiveCat("all")}>All</Button>
        {Object.entries(CATEGORIES).map(([cat, { color }]) => (
          <Button key={cat} variant={activeCat === cat ? "default" : "outline"} size="sm" className={cn("text-xs", activeCat !== cat && color)} onClick={() => setActiveCat(cat)}>
            {cat}
          </Button>
        ))}
      </div>

      {Object.entries(grouped).map(([cat, templates]) => (
        <div key={cat}>
          <h3 className={cn("text-sm font-bold mb-3 flex items-center gap-2", CATEGORIES[cat]?.color || "text-foreground")}>
            <span className="w-2.5 h-2.5 rounded-full bg-current" /> {cat}
            <span className="text-xs text-muted-foreground font-normal">{templates.length} templates</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {templates.map(t => (
              <Card key={t.title} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex justify-between items-start gap-2">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
                    </div>
                    <Badge variant="outline" className={cn("text-[10px] px-1.5 shrink-0", complexityColor(t.complexity))}>{t.complexity}</Badge>
                  </div>
                  <div className="bg-muted/30 p-3 relative group">
                    <pre className="text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">{t.code}</pre>
                    <Button variant="outline" size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 text-xs gap-1" onClick={() => copyCode(t.code, t.title)}>
                      {copied === t.title ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied === t.title ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className="p-2 flex gap-1.5 flex-wrap border-t border-border">
                    {t.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-4xl mb-2">( )</div>
          <p>No templates match your search.</p>
        </div>
      )}
    </div>
  );
}
