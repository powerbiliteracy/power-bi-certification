import { useState, useMemo } from "react";
import { FLASHCARD_DOMAINS, FLASHCARDS } from "@/data/flashcardsData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle, BookOpen } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function Flashcards() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>(FLASHCARD_DOMAINS.map(d => d.id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [started, setStarted] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const cards = useMemo(() => FLASHCARDS.filter(c => selectedDomains.includes(c.domain)), [selectedDomains]);

  const toggleDomain = (id: string) => {
    setSelectedDomains(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const shuffleCards = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setStarted(true);
  };

  const rate = (score: number) => {
    const card = cards[currentIndex];
    setRatings(prev => ({ ...prev, [card.id]: score }));
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFlipped(false);
    }
  };

  const current = cards[currentIndex];
  const domain = FLASHCARD_DOMAINS.find(d => d.id === current?.domain);
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;
  const mastered = Object.values(ratings).filter(r => r >= 2).length;

  if (!started) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Flashcard Engine</h1>
            <p className="text-sm text-muted-foreground">75 cards · All 4 exam domains · Spaced repetition</p>
          </div>
          <FavoriteButton itemId="flashcards" itemType="page" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="text-center p-4"><div className="text-2xl font-bold text-foreground">{FLASHCARDS.length}</div><div className="text-xs text-muted-foreground">Total Cards</div></Card>
          <Card className="text-center p-4"><div className="text-2xl font-bold text-primary">{cards.length}</div><div className="text-xs text-muted-foreground">Selected</div></Card>
          <Card className="text-center p-4"><div className="text-2xl font-bold text-emerald-400">{mastered}</div><div className="text-xs text-muted-foreground">Confident</div></Card>
          <Card className="text-center p-4"><div className="text-2xl font-bold text-amber-400">{Object.keys(ratings).length}</div><div className="text-xs text-muted-foreground">Reviewed</div></Card>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Study by Domain</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FLASHCARD_DOMAINS.map(d => (
              <Card
                key={d.id}
                className={`cursor-pointer transition-all p-4 ${selectedDomains.includes(d.id) ? "border-primary bg-primary/5" : "opacity-60"}`}
                onClick={() => toggleDomain(d.id)}
              >
                <div className="text-sm font-bold text-primary">{d.short}</div>
                <div className="text-xs text-muted-foreground">{d.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{FLASHCARDS.filter(c => c.domain === d.id).length} cards · {d.weight}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={shuffleCards} className="gap-2"><Shuffle className="w-4 h-4" /> Start Session ({cards.length} cards)</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => { setStarted(false); setCurrentIndex(0); setFlipped(false); }}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        {domain && <Badge variant="outline" className="text-primary border-primary/30">{domain.short}</Badge>}
      </div>

      {current && (
        <div className="flex flex-col items-center gap-6">
          <div
            className="w-full max-w-2xl min-h-[320px] cursor-pointer perspective-1000"
            onClick={() => setFlipped(!flipped)}
          >
            <Card className={`min-h-[320px] transition-all duration-300 ${flipped ? "bg-card border-primary/30" : ""}`}>
              <CardContent className="p-8 flex flex-col h-full min-h-[320px]">
                {!flipped ? (
                  <>
                    <Badge variant="outline" className="self-start mb-4 text-primary border-primary/30">{domain?.name}</Badge>
                    <div className="flex-1 flex items-center">
                      <p className="text-lg font-semibold text-foreground leading-relaxed">{current.q}</p>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">↕ Tap to reveal answer</p>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Answer</div>
                    <div className="flex-1 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: current.a }} />
                    {current.tip && (
                      <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground italic">💡 {current.tip}</div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {flipped && (
            <div className="w-full max-w-2xl">
              <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-wider font-semibold">How well did you know this?</p>
              <div className="grid grid-cols-4 gap-3">
                <Button variant="outline" className="flex-col h-auto py-3 border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => rate(0)}>
                  <span className="text-lg">😶</span><span className="text-xs font-bold">Again</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-3 border-amber-500/30 text-amber-400 hover:bg-amber-500/10" onClick={() => rate(1)}>
                  <span className="text-lg">😬</span><span className="text-xs font-bold">Hard</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-3 border-blue-500/30 text-blue-400 hover:bg-blue-500/10" onClick={() => rate(2)}>
                  <span className="text-lg">🙂</span><span className="text-xs font-bold">Good</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-3 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" onClick={() => rate(3)}>
                  <span className="text-lg">😎</span><span className="text-xs font-bold">Easy</span>
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" disabled={currentIndex === 0} onClick={() => { setCurrentIndex(prev => prev - 1); setFlipped(false); }}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={currentIndex >= cards.length - 1} onClick={() => { setCurrentIndex(prev => prev + 1); setFlipped(false); }}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
