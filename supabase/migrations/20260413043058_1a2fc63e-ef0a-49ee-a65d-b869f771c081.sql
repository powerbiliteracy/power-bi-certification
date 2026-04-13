-- Remove public SELECT policy on promo_codes - only admins need access
DROP POLICY IF EXISTS "Anyone can view active promo codes" ON public.promo_codes;