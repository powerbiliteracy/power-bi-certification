import { useEffect, useRef } from "react";
import { useBadges } from "@/hooks/useBadges";
import { useAuth } from "@/hooks/useAuth";

/** Drop this component into any page to grant a badge on visit */
export default function BadgeGrantOnVisit({ badgeKey }: { badgeKey: string }) {
  const { user } = useAuth();
  const { grantBadge, hasBadge, loading } = useBadges();
  const granted = useRef(false);

  useEffect(() => {
    if (!user || loading || granted.current || hasBadge(badgeKey)) return;
    granted.current = true;
    grantBadge(badgeKey);
  }, [user, loading, badgeKey, grantBadge, hasBadge]);

  return null;
}
