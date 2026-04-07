
-- Add first_name, last_name, status, flag_reason to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS flag_reason text;

-- Create promo_codes table
CREATE TABLE public.promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  discount_percent integer NOT NULL DEFAULT 10,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  max_uses integer DEFAULT NULL,
  times_used integer NOT NULL DEFAULT 0,
  created_by uuid NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage promo codes" ON public.promo_codes FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active promo codes" ON public.promo_codes FOR SELECT TO public
  USING (is_active = true AND expires_at > now());

-- Create announcements table
CREATE TABLE public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active announcements" ON public.announcements FOR SELECT TO public
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- Update handle_new_user to capture first/last name
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$function$;
