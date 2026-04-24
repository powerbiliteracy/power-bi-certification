// Tracks per-section content update events and the current user's acknowledgments.
// Used by the per-page banner to alert users that their content has changed and
// give them a choice to accept the new content or keep their current snapshot.

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ContentUpdateEvent {
  id: string;
  section_key: string;
  section_label: string;
  summary: string;
  added_count: number;
  renamed_count: number;
  syllabus_version_label: string | null;
  details: unknown;
  created_at: string;
}

export type AckChoice = "accept_new" | "keep_snapshot";

interface UseContentUpdatesResult {
  /** Update events for this section the current user has not yet acknowledged */
  pending: ContentUpdateEvent[];
  loading: boolean;
  acknowledge: (event: ContentUpdateEvent, choice: AckChoice, snapshot?: unknown) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useContentUpdates(sectionKey: string): UseContentUpdatesResult {
  const { user } = useAuth();
  const [events, setEvents] = useState<ContentUpdateEvent[]>([]);
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data: evs, error: evErr } = await supabase
        .from("content_update_events")
        .select("*")
        .eq("section_key", sectionKey)
        .order("created_at", { ascending: false })
        .limit(20);
      if (evErr) throw evErr;
      setEvents(evs ?? []);

      if (user) {
        const ids = (evs ?? []).map((e) => e.id);
        if (ids.length) {
          const { data: acks } = await supabase
            .from("user_content_acknowledgments")
            .select("event_id")
            .eq("user_id", user.id)
            .in("event_id", ids);
          setAcknowledgedIds(new Set((acks ?? []).map((a) => a.event_id)));
        } else {
          setAcknowledgedIds(new Set());
        }
      } else {
        setAcknowledgedIds(new Set());
      }
    } finally {
      setLoading(false);
    }
  }, [sectionKey, user]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const acknowledge = useCallback(
    async (event: ContentUpdateEvent, choice: AckChoice, snapshot?: unknown) => {
      if (!user) return;
      const { error } = await supabase
        .from("user_content_acknowledgments")
        .upsert(
          [
            {
              user_id: user.id,
              event_id: event.id,
              choice,
              snapshot: (snapshot ?? null) as never,
            },
          ],
          { onConflict: "user_id,event_id" },
        );
      if (error) throw error;
      setAcknowledgedIds((prev) => new Set(prev).add(event.id));
    },
    [user],
  );

  const pending = events.filter((e) => !acknowledgedIds.has(e.id));

  return { pending, loading, acknowledge, refetch: fetchAll };
}
