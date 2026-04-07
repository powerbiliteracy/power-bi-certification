import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface SectionAccess {
  section_key: string;
  section_label: string;
  required_tier: "explorer" | "pro" | "premium";
  is_locked: boolean;
}

const tierLevel = { explorer: 0, pro: 1, premium: 2 };

export function useSectionAccess() {
  const { profile } = useAuth();
  const [sections, setSections] = useState<SectionAccess[]>([]);

  useEffect(() => {
    supabase
      .from("section_access")
      .select("section_key, section_label, required_tier, is_locked")
      .then(({ data }) => {
        if (data) setSections(data);
      });
  }, []);

  const canAccess = (sectionKey: string): boolean => {
    const section = sections.find((s) => s.section_key === sectionKey);
    if (!section) return true;
    if (section.is_locked) return false;
    const userTier = profile?.subscription_tier ?? "explorer";
    return tierLevel[userTier] >= tierLevel[section.required_tier];
  };

  const getRequiredTier = (sectionKey: string) => {
    return sections.find((s) => s.section_key === sectionKey)?.required_tier ?? "explorer";
  };

  return { sections, canAccess, getRequiredTier };
}
