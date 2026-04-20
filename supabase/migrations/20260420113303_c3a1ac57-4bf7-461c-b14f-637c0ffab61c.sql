INSERT INTO public.section_access (section_key, section_label, required_tier, sort_order, is_locked, admin_only)
VALUES ('interactive-lessons', 'Interactive Lessons', 'explorer', 65, false, false)
ON CONFLICT (section_key) DO NOTHING;