-- Create table for concept comparison tables (e.g., Power Query vs DAX)
CREATE TABLE public.concept_comparisons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  description TEXT,
  left_label TEXT NOT NULL,
  right_label TEXT NOT NULL,
  rows JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.concept_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active comparisons"
  ON public.concept_comparisons
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all comparisons"
  ON public.concept_comparisons
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert comparisons"
  ON public.concept_comparisons
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update comparisons"
  ON public.concept_comparisons
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete comparisons"
  ON public.concept_comparisons
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_concept_comparisons_updated_at
  BEFORE UPDATE ON public.concept_comparisons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed section_access entry
INSERT INTO public.section_access (section_key, section_label, required_tier, sort_order, is_locked, admin_only)
VALUES ('concept-comparisons', 'Concept Comparisons', 'explorer', 95, false, false)
ON CONFLICT DO NOTHING;