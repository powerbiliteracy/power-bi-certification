
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancel_at_period_end boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS subscription_current_period_end timestamptz;

ALTER TABLE public.pricing_settings
  ADD COLUMN IF NOT EXISTS explorer_trial_days integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pro_trial_days integer NOT NULL DEFAULT 7,
  ADD COLUMN IF NOT EXISTS premium_trial_days integer NOT NULL DEFAULT 7;

-- Allow admins to update profiles (needed for assigning tiers/expiry)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Admins can update any profile'
  ) THEN
    CREATE POLICY "Admins can update any profile"
      ON public.profiles
      FOR UPDATE
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'))
      WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Admins can insert any profile'
  ) THEN
    CREATE POLICY "Admins can insert any profile"
      ON public.profiles
      FOR INSERT
      TO authenticated
      WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- Add expiry to user_roles (for time-limited admin)
ALTER TABLE public.user_roles
  ADD COLUMN IF NOT EXISTS expires_at timestamptz;

-- Update has_role to ignore expired roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (expires_at IS NULL OR expires_at > now())
  )
$function$;
