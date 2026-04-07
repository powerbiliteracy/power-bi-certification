import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Badge {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface UserBadge {
  id: string;
  badge_id: string;
  earned_at: string;
  badge: Badge;
}

const BADGE_ICONS: Record<string, string> = {
  rocket: "🚀",
  award: "🏅",
  star: "⭐",
  zap: "⚡",
  flame: "🔥",
  crown: "👑",
  "book-open": "📖",
  play: "▶️",
  database: "🗄️",
  "line-chart": "📈",
  eye: "👁️",
  shield: "🛡️",
  trophy: "🏆",
  book: "📚",
  "git-branch": "🔀",
};

export function getBadgeEmoji(icon: string): string {
  return BADGE_ICONS[icon] || "🏆";
}

export function useBadges() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBadges = useCallback(async () => {
    const { data: allBadges } = await supabase
      .from("badges")
      .select("*");

    if (allBadges) setBadges(allBadges);

    if (user) {
      const { data: earned } = await supabase
        .from("user_badges")
        .select("*, badge:badges(*)")
        .eq("user_id", user.id);

      if (earned) setEarnedBadges(earned as unknown as UserBadge[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const hasBadge = useCallback(
    (badgeKey: string) => earnedBadges.some((ub) => ub.badge?.key === badgeKey),
    [earnedBadges]
  );

  const grantBadge = useCallback(
    async (badgeKey: string) => {
      if (!user || hasBadge(badgeKey)) return;

      const badge = badges.find((b) => b.key === badgeKey);
      if (!badge) return;

      const { error } = await supabase
        .from("user_badges")
        .insert({ user_id: user.id, badge_id: badge.id });

      if (!error) {
        toast.success(`Badge Earned: ${badge.name}!`, {
          description: badge.description,
          icon: getBadgeEmoji(badge.icon),
          duration: 5000,
        });
        await fetchBadges();
      }
    },
    [user, badges, hasBadge, fetchBadges]
  );

  return { badges, earnedBadges, loading, hasBadge, grantBadge };
}
