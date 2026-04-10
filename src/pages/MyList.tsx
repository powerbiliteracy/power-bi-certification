import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Heart, BookOpen, Lightbulb, Brain, BookMarked, AlertTriangle, GitBranch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FavoriteButton from "@/components/FavoriteButton";
import { Navigate } from "react-router-dom";

const typeLabels: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  syllabus_topic: { label: "Syllabus Topics", icon: BookOpen, color: "text-blue-400" },
  key_term: { label: "Key Terms", icon: BookMarked, color: "text-violet-400" },
  scenario: { label: "Exam Scenarios", icon: Lightbulb, color: "text-amber-400" },
  practice_set: { label: "Practice Sets", icon: Brain, color: "text-emerald-400" },
  troubleshooting: { label: "Troubleshooting", icon: AlertTriangle, color: "text-red-400" },
  decision_framework: { label: "Decision Framework", icon: GitBranch, color: "text-cyan-400" },
};

interface Favorite {
  id: string;
  item_type: string;
  item_id: string;
}

export default function MyList() {
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_favorites")
      .select("id, item_type, item_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setFavorites(data); });
  }, [user]);

  if (!loading && !user) return <Navigate to="/auth" replace />;

  const grouped = favorites.reduce<Record<string, Favorite[]>>((acc, f) => {
    if (!acc[f.item_type]) acc[f.item_type] = [];
    acc[f.item_type].push(f);
    return acc;
  }, {});

  const resetAll = async () => {
    if (!user || favorites.length === 0) return;
    const ids = favorites.map(f => f.id);
    await supabase.from("user_favorites").delete().in("id", ids);
    setFavorites([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
          <Heart className="w-5 h-5 text-primary-foreground fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">My List</h1>
          <p className="text-sm text-muted-foreground">Your favorited items across all sections</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {favorites.length > 0 && (
            <button
              onClick={resetAll}
              className="px-3 py-1.5 text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-lg transition-colors"
            >
              Reset All
            </button>
          )}
          <Badge variant="outline">{favorites.length} items</Badge>
        </div>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No favorites yet. Click the heart icon on any item to add it here.</p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(grouped).map(([type, items]) => {
          const meta = typeLabels[type] || { label: type, icon: Heart, color: "text-muted-foreground" };
          const Icon = meta.icon;
          return (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className={`w-5 h-5 ${meta.color}`} />
                  {meta.label}
                  <Badge variant="secondary" className="ml-2">{items.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {items.map((fav) => (
                    <div key={fav.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <span className="text-sm font-medium text-foreground">{formatItemId(fav.item_id)}</span>
                      <FavoriteButton itemType={fav.item_type} itemId={fav.item_id} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

function formatItemId(id: string): string {
  return id
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
