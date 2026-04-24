import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Bookmark, Info } from "lucide-react";
import { useContentUpdates, type ContentUpdateEvent } from "@/hooks/useContentUpdates";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ContentUpdateBannerProps {
  sectionKey: string;
  /** Snapshot to store if the user picks "keep snapshot" — usually the current corpus. */
  currentSnapshot?: unknown;
}

export default function ContentUpdateBanner({
  sectionKey,
  currentSnapshot,
}: ContentUpdateBannerProps) {
  const { isAdmin } = useAuth();
  const { pending, acknowledge } = useContentUpdates(sectionKey);
  const [openEvent, setOpenEvent] = useState<ContentUpdateEvent | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Admins drove the change; they don't need the user-side banner.
  if (isAdmin || pending.length === 0) return null;

  const event = pending[0];

  const handleChoice = async (choice: "accept_new" | "keep_snapshot") => {
    if (!event) return;
    setSubmitting(true);
    try {
      await acknowledge(event, choice, choice === "keep_snapshot" ? currentSnapshot : undefined);
      toast.success(
        choice === "accept_new"
          ? "Updated content applied."
          : "Snapshot saved. Your view stays the same.",
      );
      setOpenEvent(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not save your choice";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-foreground">
                This section was updated
              </p>
              <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400">
                {event.summary}
              </Badge>
              {pending.length > 1 && (
                <Badge variant="outline" className="text-[10px]">
                  +{pending.length - 1} more update{pending.length > 2 ? "s" : ""}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              An admin synced this section against the latest PL-300 syllabus
              {event.syllabus_version_label ? ` (${event.syllabus_version_label})` : ""}.
              Choose how to handle the change so your progress isn't lost.
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setOpenEvent(event)}>
            Review
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={!!openEvent}
        onOpenChange={(open) => !open && setOpenEvent(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Section updated
            </DialogTitle>
            <DialogDescription>
              {event.summary}
              {event.syllabus_version_label
                ? ` — synced against "${event.syllabus_version_label}"`
                : ""}
              .
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <div className="rounded-md border border-border p-3 bg-card">
              <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Accept new content
              </p>
              <p className="text-xs text-muted-foreground">
                See the renamed and added items. Progress on items that still
                exist (by id) is preserved automatically.
              </p>
            </div>
            <div className="rounded-md border border-border p-3 bg-card">
              <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 text-blue-400" /> Keep my snapshot
              </p>
              <p className="text-xs text-muted-foreground">
                Hide the new items for now and remember exactly what you were
                working through. You can switch later from your account.
              </p>
            </div>
            <div className="rounded-md border border-border/60 p-3 bg-muted/30 flex gap-2">
              <Info className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Either way, nothing you've already completed is lost — only the
                visible content changes.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => handleChoice("keep_snapshot")}
              disabled={submitting}
              className="gap-1"
            >
              <Bookmark className="w-3.5 h-3.5" /> Keep snapshot
            </Button>
            <Button
              onClick={() => handleChoice("accept_new")}
              disabled={submitting}
              className="gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Accept new content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
