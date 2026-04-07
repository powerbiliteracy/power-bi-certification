import React, { useEffect, useRef } from "react";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBadges } from "@/hooks/useBadges";

interface PracticeResultsProps {
  score: number;
  total: number;
  timerEnabled: boolean;
  seconds: number;
  formatTime: (s: number) => string;
  selectedSet: number;
  onRetry: () => void;
  onBack: () => void;
}

export default function PracticeResults({ score, total, timerEnabled, seconds, formatTime, selectedSet, onRetry, onBack }: PracticeResultsProps) {
  const { grantBadge, hasBadge } = useBadges();
  const granted = useRef(false);
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  useEffect(() => {
    if (granted.current) return;
    granted.current = true;

    // Grant practice set completion badges
    grantBadge("practice_set_1");

    // We track by localStorage which sets are completed for multi-set badges
    const completedSets = JSON.parse(localStorage.getItem("completed_practice_sets") || "[]");
    if (!completedSets.includes(selectedSet)) {
      completedSets.push(selectedSet);
      localStorage.setItem("completed_practice_sets", JSON.stringify(completedSets));
    }

    if (completedSets.length >= 3) grantBadge("practice_set_3");
    if (completedSets.length >= 7) grantBadge("practice_set_all");
  }, [grantBadge, selectedSet]);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="bg-card border-border">
        <CardContent className="p-8 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? "bg-green-500/10" : "bg-red-500/10"}`}>
            <Trophy className={`w-10 h-10 ${passed ? "text-green-500" : "text-red-500"}`} />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
          <p className={`text-lg font-semibold mb-6 ${percentage >= 90 ? "text-green-500" : percentage >= 70 ? "text-chart-5" : "text-red-500"}`}>
            {percentage >= 90 ? "Excellent!" : percentage >= 70 ? "Good Work!" : "Keep Practicing!"}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Score</p>
              <p className="text-2xl font-bold text-foreground">{score}/{total}</p>
              <p className="text-sm text-muted-foreground">{percentage}%</p>
            </div>
            {timerEnabled && (
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground mb-1">Time</p>
                <p className="text-xl font-bold text-foreground">{formatTime(seconds)}</p>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Button onClick={onRetry} className="flex-1 gap-2">
              <RotateCcw className="w-4 h-4" /> Retry
            </Button>
            <Button onClick={onBack} variant="outline" className="flex-1 gap-2">
              <Home className="w-4 h-4" /> All Sets
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
