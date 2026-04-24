-- Content overrides created by admins via "Fix issue" action
CREATE TABLE public.content_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL,
  item_type TEXT NOT NULL DEFAULT 'topic',
  original_topic TEXT NOT NULL,
  generated_title TEXT NOT NULL,
  generated_body JSONB NOT NULL DEFAULT '{}'::jsonb,
  domain_name TEXT,
  domain_section TEXT,
  syllabus_version_id UUID,
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_overrides_section ON public.content_overrides(section_key);

ALTER TABLE public.content_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active overrides"
  ON public.content_overrides FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins can manage overrides"
  ON public.content_overrides FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_content_overrides_updated_at
  BEFORE UPDATE ON public.content_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Update events generated when an admin runs a "Fix" action
CREATE TABLE public.content_update_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL,
  section_label TEXT NOT NULL,
  summary TEXT NOT NULL,
  added_count INTEGER NOT NULL DEFAULT 0,
  renamed_count INTEGER NOT NULL DEFAULT 0,
  syllabus_version_label TEXT,
  syllabus_version_id UUID,
  details JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_update_events_section ON public.content_update_events(section_key);
CREATE INDEX idx_content_update_events_created_at ON public.content_update_events(created_at DESC);

ALTER TABLE public.content_update_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view update events"
  ON public.content_update_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create update events"
  ON public.content_update_events FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') AND auth.uid() = created_by);

CREATE POLICY "Admins can delete update events"
  ON public.content_update_events FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Per-user acknowledgments of update events
CREATE TABLE public.user_content_acknowledgments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  event_id UUID NOT NULL REFERENCES public.content_update_events(id) ON DELETE CASCADE,
  choice TEXT NOT NULL,
  snapshot JSONB,
  acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, event_id)
);

CREATE INDEX idx_user_content_ack_user ON public.user_content_acknowledgments(user_id);

ALTER TABLE public.user_content_acknowledgments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own acknowledgments"
  ON public.user_content_acknowledgments FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all acknowledgments"
  ON public.user_content_acknowledgments FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));