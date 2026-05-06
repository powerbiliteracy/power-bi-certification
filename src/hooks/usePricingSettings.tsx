import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PricingSettings {
  id: string;
  explorer_price: number;
  pro_monthly_price: number;
  premium_monthly_price: number;
  annual_discount_percent: number;
}

const DEFAULTS: PricingSettings = {
  id: "",
  explorer_price: 0,
  pro_monthly_price: 19,
  premium_monthly_price: 39,
  annual_discount_percent: 20,
};

export function usePricingSettings() {
  const [settings, setSettings] = useState<PricingSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("pricing_settings" as any)
      .select("id, explorer_price, pro_monthly_price, premium_monthly_price, annual_discount_percent")
      .limit(1)
      .maybeSingle();
    if (data) setSettings(data as unknown as PricingSettings);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
    const handler = () => fetchSettings();
    window.addEventListener("pricing-settings-updated", handler);
    return () => window.removeEventListener("pricing-settings-updated", handler);
  }, [fetchSettings]);

  return { settings, loading, refetch: fetchSettings };
}

export function notifyPricingUpdate() {
  window.dispatchEvent(new Event("pricing-settings-updated"));
}
