import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

/**
 * Syncs localStorage progress to the user_progress table so admins can see it.
 * Call syncProgress(itemType, itemId) when a user completes something.
 */
export function useProgress() {
  const { user } = useAuth();
  const synced = useRef(false);

  // On login, sync existing localStorage progress to DB
  useEffect(() => {
    if (!user || synced.current) return;
    synced.current = true;

    const syncFromLocalStorage = async () => {
      const pairs: { type: string; key: string; parser: (stored: string) => string[] }[] = [
        { type: "syllabus_topic", key: "pl300-completed-topics", parser: (s) => JSON.parse(s) },
        { type: "scenario", key: "exam-scenarios-completed", parser: (s) => JSON.parse(s) },
        { type: "troubleshooting", key: "troubleshooting-completed", parser: (s) => JSON.parse(s) },
        { type: "practice_set", key: "completed_practice_sets", parser: (s) => JSON.parse(s).map((x: any) => typeof x === "object" ? x.id || String(x) : String(x)) },
      ];

      for (const { type, key, parser } of pairs) {
        try {
          const stored = localStorage.getItem(key);
          if (!stored) continue;
          const items = parser(stored);
          if (items.length === 0) continue;
          // Upsert in batches
          const rows = items.map((itemId: string) => ({ user_id: user.id, item_type: type, item_id: itemId }));
          await supabase.from("user_progress").upsert(rows as any, { onConflict: "user_id,item_type,item_id" });
        } catch {
          // ignore parse errors
        }
      }
    };

    syncFromLocalStorage();
  }, [user]);

  const syncProgress = useCallback(
    async (itemType: string, itemId: string) => {
      if (!user) return;
      await supabase.from("user_progress").upsert(
        { user_id: user.id, item_type: itemType, item_id: itemId } as any,
        { onConflict: "user_id,item_type,item_id" }
      );
    },
    [user]
  );

  return { syncProgress };
}
