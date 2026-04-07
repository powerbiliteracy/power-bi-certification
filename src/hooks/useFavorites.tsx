import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Favorite {
  id: string;
  item_type: string;
  item_id: string;
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setFavorites([]); setLoading(false); return; }
    supabase
      .from("user_favorites")
      .select("id, item_type, item_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) setFavorites(data);
        setLoading(false);
      });
  }, [user]);

  const isFavorite = useCallback(
    (itemType: string, itemId: string) => favorites.some((f) => f.item_type === itemType && f.item_id === itemId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (itemType: string, itemId: string) => {
      if (!user) return;
      const existing = favorites.find((f) => f.item_type === itemType && f.item_id === itemId);
      if (existing) {
        await supabase.from("user_favorites").delete().eq("id", existing.id);
        setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
      } else {
        const { data } = await supabase
          .from("user_favorites")
          .insert({ user_id: user.id, item_type: itemType, item_id: itemId } as any)
          .select("id, item_type, item_id")
          .single();
        if (data) setFavorites((prev) => [...prev, data]);
      }
    },
    [user, favorites]
  );

  return { favorites, isFavorite, toggleFavorite, loading };
}
