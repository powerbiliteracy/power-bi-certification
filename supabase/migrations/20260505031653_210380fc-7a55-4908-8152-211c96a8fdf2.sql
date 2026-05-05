-- Page summaries table
CREATE TABLE public.page_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  syllabus_domain TEXT,
  syllabus_subtopic TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.page_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active page summaries"
  ON public.page_summaries FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all page summaries"
  ON public.page_summaries FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert page summaries"
  ON public.page_summaries FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update page summaries"
  ON public.page_summaries FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete page summaries"
  ON public.page_summaries FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_page_summaries_updated_at
  BEFORE UPDATE ON public.page_summaries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('page-summaries', 'page-summaries', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view page summary images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'page-summaries');

CREATE POLICY "Admins can upload page summary images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'page-summaries' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update page summary images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'page-summaries' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete page summary images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'page-summaries' AND has_role(auth.uid(), 'admin'::app_role));

-- Register section
INSERT INTO public.section_access (section_key, section_label, required_tier, is_locked, admin_only, sort_order)
VALUES ('page-summaries', 'Summary of a Page', 'explorer', false, false, 50)
ON CONFLICT DO NOTHING;