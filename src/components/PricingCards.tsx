import React, { useEffect, useMemo, useState } from "react";
import { Check, Zap, Crown, Rocket, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { FEATURE_META } from "@/data/featureMeta";
import { usePricingSettings } from "@/hooks/usePricingSettings";

type Tier = "explorer" | "pro" | "premium";

interface SectionRow {
  section_key: string;
  section_label: string;
  required_tier: Tier;
  sort_order: number;
}

const STRIPE_PRICES = {
  pro: {
    monthly: "price_1TJiRbGfR936pbAmdrVoB4NC",
    annual: "price_1TJiViGfR936pbAmWBgrEiGL",
  },
  premium: {
    monthly: "price_1TJiVOGfR936pbAmaTIVsLKx",
    annual: "price_1TJiW2GfR936pbAmIscPKxWF",
  },
};

interface PricingCardsProps {
  compact?: boolean;
}

export default function PricingCards({ compact = false }: PricingCardsProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionRow[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { settings } = usePricingSettings();

  useEffect(() => {
    const load = () => {
      supabase
        .from("section_access")
        .select("section_key, section_label, required_tier, sort_order, admin_only, is_hidden")
        .then(({ data }) => {
          if (!data) return;
          const visible = (data as any[])
            .filter((s) => !s.admin_only && !s.is_hidden)
            .map((s) => ({
              section_key: s.section_key as string,
              section_label: s.section_label as string,
              required_tier: s.required_tier as Tier,
              sort_order: s.sort_order as number,
            }))
            .sort((a, b) => a.sort_order - b.sort_order);
          setSections(visible);
        });
    };
    load();
    window.addEventListener("section-access-updated", load);
    return () => window.removeEventListener("section-access-updated", load);
  }, []);

  const fmt = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
  const annualMultiplier = (100 - (settings.annual_discount_percent || 0)) / 100;
  const proAnnualMonthly = settings.pro_monthly_price * annualMultiplier;
  const premiumAnnualMonthly = settings.premium_monthly_price * annualMultiplier;

  const tiers = [
    {
      id: "free",
      tierKey: "explorer" as Tier,
      name: "Explorer",
      price: fmt(settings.explorer_price),
      description: "Free essentials to explore the PL-300 syllabus and core lessons",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-400",
      popular: false,
      cta: "Get Started Free",
    },
    {
      id: "pro",
      tierKey: "pro" as Tier,
      name: "Pro",
      price: fmt(settings.pro_monthly_price),
      description: "Deeper study tools — key terms, scenarios, DAX templates and more",
      icon: Crown,
      gradient: "from-primary to-accent",
      popular: true,
      cta: "Start Pro Trial",
    },
    {
      id: "premium",
      tierKey: "premium" as Tier,
      name: "Premium",
      price: fmt(settings.premium_monthly_price),
      description: "Full exam prep — flashcards, cheat sheets, full question banks & more",
      icon: Rocket,
      gradient: "from-violet-500 to-pink-400",
      popular: false,
      cta: "Start Premium Trial",
    },
  ];

  const featuresByTier = useMemo(() => {
    const explorer = sections.filter((s) => s.required_tier === "explorer");
    const pro = sections.filter((s) => s.required_tier === "pro");
    const premium = sections.filter((s) => s.required_tier === "premium");
    return {
      explorer: [...explorer.map((s) => ({ key: s.section_key, label: s.section_label }))],
      pro: [{ key: "__roll", label: "Everything in Explorer" }, ...pro.map((s) => ({ key: s.section_key, label: s.section_label }))],
      premium: [{ key: "__roll", label: "Everything in Pro" }, ...premium.map((s) => ({ key: s.section_key, label: s.section_label }))],
    } as Record<Tier, { key: string; label: string }[]>;
  }, [sections]);

  const handleSubscribe = async (tierId: string) => {
    if (tierId === "free") {
      if (!user) navigate("/auth"); else navigate("/Dashboard");
      return;
    }
    if (!user) {
      const priceId = STRIPE_PRICES[tierId as keyof typeof STRIPE_PRICES]?.[isAnnual ? "annual" : "monthly"];
      sessionStorage.setItem("pending_checkout_price", priceId);
      navigate("/auth");
      return;
    }
    const priceId = STRIPE_PRICES[tierId as keyof typeof STRIPE_PRICES]?.[isAnnual ? "annual" : "monthly"];
    if (!priceId) return;
    setLoadingTier(tierId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", { body: { priceId, tier: tierId } });
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (err: any) {
      toast({ title: "Checkout Error", description: err.message || "Failed to start checkout", variant: "destructive" });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", !isAnnual ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={cn(
            "relative w-12 h-6 rounded-full transition-colors",
            isAnnual ? "bg-primary" : "bg-border"
          )}
        >
          <div className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform",
            isAnnual ? "translate-x-6" : "translate-x-0.5"
          )} />
        </button>
        <span className={cn("text-sm font-medium", isAnnual ? "text-foreground" : "text-muted-foreground")}>
          Annual
          {settings.annual_discount_percent > 0 && (
            <span className="ml-1 text-xs text-primary font-semibold">Save {settings.annual_discount_percent}%</span>
          )}
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier) => {
          let displayPrice = tier.price;
          let period = tier.id === "free" ? "forever" : isAnnual ? "/month, billed annually" : "/month";
          if (isAnnual && tier.id === "pro") displayPrice = fmt(Math.round(proAnnualMonthly * 100) / 100);
          if (isAnnual && tier.id === "premium") displayPrice = fmt(Math.round(premiumAnnualMonthly * 100) / 100);

          return (
            <div
              key={tier.id}
              className={cn(
                "relative bg-card rounded-2xl border p-6 flex flex-col transition-all duration-200",
                tier.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border hover:shadow-lg hover:border-primary/20"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-3`}>
                  <tier.icon className="w-5 h-5 text-card" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
              </div>

              <div className="mb-5">
                <span className="text-4xl font-bold text-foreground">{displayPrice}</span>
                <span className="text-sm text-muted-foreground ml-1">{period}</span>
                {isAnnual && tier.id !== "free" && settings.annual_discount_percent > 0 && (
                  <p className="text-xs text-primary font-medium mt-1">
                    Save {settings.annual_discount_percent}%
                  </p>
                )}
              </div>

              <ul className={cn("space-y-3 mb-6 flex-1", compact && "space-y-2")}>
                {featuresByTier[tier.tierKey].map(({ key, label }) => {
                  const meta = FEATURE_META[key];
                  const desc = meta?.description;
                  const count = meta?.count;
                  return (
                    <li key={key + label} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground flex-1">
                        {label}
                        {count !== undefined && (
                          <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold">
                            {count}
                          </span>
                        )}
                      </span>
                      {desc && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              aria-label={`More info about ${label}`}
                              className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent side="top" className="w-64 text-xs">
                            <p className="font-semibold text-foreground mb-1">{label}</p>
                            <p className="text-muted-foreground">{desc}</p>
                          </PopoverContent>
                        </Popover>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className={cn("w-full rounded-xl font-semibold", tier.popular && "shadow-lg shadow-primary/20")}
                disabled={loadingTier === tier.id}
                onClick={() => handleSubscribe(tier.id)}
              >
                {loadingTier === tier.id ? "Loading..." : tier.cta}
              </Button>
              {(() => {
                const days = tier.id === "pro" ? settings.pro_trial_days
                  : tier.id === "premium" ? settings.premium_trial_days
                  : settings.explorer_trial_days;
                return days > 0 ? (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    {days}-day free trial — cancel anytime
                  </p>
                ) : null;
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
