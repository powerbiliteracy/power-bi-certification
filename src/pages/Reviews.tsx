import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, MessageSquare, Send, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text: string;
  display_name: string | null;
  is_approved: boolean;
  created_at: string;
}

export default function Reviews() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const fetchReviews = async () => {
    setLoading(true);
    // Fetch approved reviews (visible to everyone)
    const { data: approved } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    setReviews((approved as Review[]) || []);

    // Fetch user's own review if logged in
    if (user) {
      const { data: mine } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (mine) {
        setMyReview(mine as Review);
        setRating((mine as Review).rating);
        setReviewText((mine as Review).review_text);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!user || rating === 0 || !reviewText.trim()) {
      toast({ title: "Please provide a rating and review text", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const payload = {
      user_id: user.id,
      rating,
      review_text: reviewText.trim(),
      display_name: profile?.display_name || user.email?.split("@")[0] || "Anonymous",
    };

    if (myReview) {
      const { error } = await supabase.from("reviews").update(payload).eq("id", myReview.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Review updated!", description: "Your review will be visible once approved by an admin." });
        fetchReviews();
      }
    } else {
      const { error } = await supabase.from("reviews").insert(payload);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Review submitted!", description: "Your review will be visible once approved by an admin." });
        fetchReviews();
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!myReview) return;
    const { error } = await supabase.from("reviews").delete().eq("id", myReview.id);
    if (!error) {
      setMyReview(null);
      setRating(0);
      setReviewText("");
      toast({ title: "Review deleted" });
      fetchReviews();
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Reviews</h1>
          <p className="text-sm text-muted-foreground">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""} · Average {avgRating} ★
          </p>
        </div>
      </div>

      {/* Submit / Edit review */}
      {user ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {myReview ? "Edit Your Review" : "Leave a Review"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myReview && !myReview.is_approved && (
              <p className="text-xs text-amber-400 bg-amber-400/10 rounded-lg px-3 py-2">
                ⏳ Your review is pending admin approval.
              </p>
            )}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-7 h-7 transition-colors",
                      (hoverRating || rating) >= s
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Share your experience with PL-300 Coach..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={submitting || rating === 0} className="gap-2">
                <Send className="w-4 h-4" />
                {myReview ? "Update Review" : "Submit Review"}
              </Button>
              {myReview && (
                <Button variant="outline" onClick={handleDelete} className="gap-2 text-destructive">
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-6 text-center text-muted-foreground">
            <p>Sign in to leave a review.</p>
          </CardContent>
        </Card>
      )}

      {/* Approved reviews */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">No reviews yet. Be the first!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <Card key={r.id} className="border-border/50">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{r.display_name || "Anonymous"}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={cn(
                        "w-4 h-4",
                        r.rating >= s ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.review_text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
