import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface SectionAccess {
  section_key: string;
  section_label: string;
  required_tier: "explorer" | "pro" | "premium";
  is_locked: boolean;
  admin_only: boolean;
}

const tierLevel = { explorer: 0, pro: 1, premium: 2 };

export function useSectionAccess() {
  const { profile, isAdmin } = useAuth();
  const [sections, setSections] = useState<SectionAccess[]>([]);

  useEffect(() => {
    supabase
      .from("section_access")
      .select("section_key, section_label, required_tier, is_locked, admin_only")
      .then(({ data }) => {
        if (data) setSections(data as SectionAccess[]);
      });
  }, []);

  const isAdminOnly = (sectionKey: string): boolean => {
    return sections.find((s) => s.section_key === sectionKey)?.admin_only ?? false;
  };

  const canAccess = (sectionKey: string): boolean => {
    if (isAdmin) return true; // Admins bypass all restrictions
    const section = sections.find((s) => s.section_key === sectionKey);
    if (!section) return true;
    if (section.admin_only) return false;
    if (section.is_locked) return false;
    const userTier = profile?.subscription_tier ?? "explorer";
    return tierLevel[userTier] >= tierLevel[section.required_tier];
  };

  const isVisible = (sectionKey: string): boolean => {
    if (isAdmin) return true;
    const section = sections.find((s) => s.section_key === sectionKey);
    if (!section) return true;
    return !section.admin_only;
  };

  const getRequiredTier = (sectionKey: string) => {
    return sections.find((s) => s.section_key === sectionKey)?.required_tier ?? "explorer";
  };

  return { sections, canAccess, getRequiredTier, isVisible, isAdminOnly };
}
