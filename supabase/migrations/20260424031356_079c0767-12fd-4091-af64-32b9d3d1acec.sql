-- Syllabus version history: admin pastes raw syllabus text, we keep every version
CREATE TABLE public.syllabus_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_code TEXT NOT NULL DEFAULT 'PL-300',
  label TEXT NOT NULL,
  source_url TEXT,
  notes TEXT,
  content TEXT NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.syllabus_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view syllabus versions"
ON public.syllabus_versions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert syllabus versions"
ON public.syllabus_versions
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = created_by);

CREATE POLICY "Admins can update syllabus versions"
ON public.syllabus_versions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete syllabus versions"
ON public.syllabus_versions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_syllabus_versions_created_at ON public.syllabus_versions(created_at DESC);
CREATE INDEX idx_syllabus_versions_exam_code ON public.syllabus_versions(exam_code);
