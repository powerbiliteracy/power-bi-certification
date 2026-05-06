
CREATE TABLE IF NOT EXISTS public.pricing_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true UNIQUE,
  explorer_price numeric NOT NULL DEFAULT 0,
  pro_monthly_price numeric NOT NULL DEFAULT 19,
  premium_monthly_price numeric NOT NULL DEFAULT 39,
  annual_discount_percent integer NOT NULL DEFAULT 20,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

ALTER TABLE public.pricing_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pricing settings"
  ON public.pricing_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert pricing settings"
  ON public.pricing_settings FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update pricing settings"
  ON public.pricing_settings FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_pricing_settings_updated_at
  BEFORE UPDATE ON public.pricing_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.pricing_settings (singleton, explorer_price, pro_monthly_price, premium_monthly_price, annual_discount_percent)
VALUES (true, 0, 19, 39, 20)
ON CONFLICT (singleton) DO NOTHING;
