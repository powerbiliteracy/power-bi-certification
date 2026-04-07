import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";

interface FavoriteButtonProps {
  itemType: string;
  itemId: string;
  className?: string;
  size?: "sm" | "md";
}

export default function FavoriteButton({ itemType, itemId, className, size = "sm" }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!user) return null;

  const active = isFavorite(itemType, itemId);
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(itemType, itemId); }}
      className={cn(
        "transition-colors",
        active ? "text-red-500 hover:text-red-400" : "text-muted-foreground hover:text-red-400",
        className
      )}
      title={active ? "Remove from My List" : "Add to My List"}
    >
      <Heart className={cn(iconSize, active && "fill-current")} />
    </button>
  );
}
