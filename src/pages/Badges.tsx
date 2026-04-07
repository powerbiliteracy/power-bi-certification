import React from "react";
import { useBadges, getBadgeEmoji } from "@/hooks/useBadges";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Trophy, Lock } from "lucide-react";

const categoryLabels: Record<string, string> = {
  assessment: "Assessments",
  practice: "Practice Sets",
  learning: "Learning",
  domain: "Exam Domains",
};

const categoryOrder = ["assessment", "practice", "domain", "learning"];

export default function Badges() {
  const { user } = useAuth();
  const { badges, earnedBadges, loading } = useBadges();

  if (!user) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Badges</h1>
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Sign in to start earning badges!</p>
            <Link to="/auth" className="text-primary hover:underline font-medium">Sign In</Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const earnedKeys = new Set(earnedBadges.map((ub) => ub.badge?.key));
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat] || cat,
    items: badges.filter((b) => b.category === cat),
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Badges</h1>
        <p className="text-muted-foreground mt-1">
          {earnedBadges.length} of {badges.length} badges earned
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-4 mb-3">
          <Trophy className="w-6 h-6 text-chart-5" />
          <span className="text-lg font-bold text-foreground">
            {badges.length > 0 ? Math.round((earnedBadges.length / badges.length) * 100) : 0}% Complete
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
            style={{ width: `${badges.length > 0 ? (earnedBadges.length / badges.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-8">Loading badges...</div>
      ) : (
        grouped.map((group) => (
          <div key={group.category}>
            <h2 className="text-lg font-semibold text-foreground mb-4">{group.label}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.items.map((badge) => {
                const isEarned = earnedKeys.has(badge.key);
                return (
                  <Card
                    key={badge.id}
                    className={`border transition-all ${
                      isEarned
                        ? "bg-card border-primary/30 shadow-md shadow-primary/5"
                        : "bg-card/50 border-border opacity-60"
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">
                        {isEarned ? getBadgeEmoji(badge.icon) : <Lock className="w-7 h-7 mx-auto text-muted-foreground" />}
                      </div>
                      <h3 className="font-semibold text-sm text-foreground mb-1">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      {isEarned && (
                        <p className="text-[10px] text-primary mt-2 font-medium">
                          Earned {new Date(earnedBadges.find((ub) => ub.badge?.key === badge.key)!.earned_at).toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
