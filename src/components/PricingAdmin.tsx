import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Save } from "lucide-react";
import { usePricingSettings, notifyPricingUpdate } from "@/hooks/usePricingSettings";

export default function PricingAdmin() {
  const { settings, refetch } = usePricingSettings();
  const { user } = useAuth();
  const { toast } = useToast();

  const [explorer, setExplorer] = useState(0);
  const [pro, setPro] = useState(0);
  const [premium, setPremium] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [explorerTrial, setExplorerTrial] = useState(0);
  const [proTrial, setProTrial] = useState(7);
  const [premiumTrial, setPremiumTrial] = useState(7);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setExplorer(Number(settings.explorer_price));
    setPro(Number(settings.pro_monthly_price));
    setPremium(Number(settings.premium_monthly_price));
    setDiscount(Number(settings.annual_discount_percent));
    setExplorerTrial(Number(settings.explorer_trial_days || 0));
    setProTrial(Number(settings.pro_trial_days || 0));
    setPremiumTrial(Number(settings.premium_trial_days || 0));
  }, [settings]);

  const save = async () => {
    setSaving(true);
    const payload = {
      explorer_price: explorer,
      pro_monthly_price: pro,
      premium_monthly_price: premium,
      annual_discount_percent: discount,
      explorer_trial_days: explorerTrial,
      pro_trial_days: proTrial,
      premium_trial_days: premiumTrial,
      updated_by: user?.id,
    };
    let error;
    if (settings.id) {
      const res = await supabase.from("pricing_settings" as any).update(payload as any).eq("id", settings.id);
      error = res.error;
    } else {
      const res = await supabase.from("pricing_settings" as any).insert({ singleton: true, ...payload } as any);
      error = res.error;
    }
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Pricing updated", description: "Pricing page is now in sync." });
      notifyPricingUpdate();
      refetch();
    }
    setSaving(false);
  };

  const proAnnual = pro * (100 - discount) / 100;
  const premiumAnnual = premium * (100 - discount) / 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5" /> Pricing Settings</CardTitle>
        <CardDescription>
          Set the price for each tier and annual discount. The Pricing page on the home/marketing site updates instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <Label>Explorer (Free) — $/month</Label>
            <Input type="number" min={0} step="0.01" value={explorer} onChange={(e) => setExplorer(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Pro — $/month</Label>
            <Input type="number" min={0} step="0.01" value={pro} onChange={(e) => setPro(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Premium — $/month</Label>
            <Input type="number" min={0} step="0.01" value={premium} onChange={(e) => setPremium(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Annual discount %</Label>
            <Input type="number" min={0} max={100} step="1" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-secondary/30 p-4 text-sm space-y-1">
          <p className="font-semibold text-foreground">Annual preview (per month, billed yearly):</p>
          <p className="text-muted-foreground">Pro: <span className="text-foreground font-medium">${proAnnual.toFixed(2)}</span> /mo</p>
          <p className="text-muted-foreground">Premium: <span className="text-foreground font-medium">${premiumAnnual.toFixed(2)}</span> /mo</p>
        </div>

        <Button onClick={save} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Pricing"}
        </Button>
      </CardContent>
    </Card>
  );
}
