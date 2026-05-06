CREATE UNIQUE INDEX IF NOT EXISTS page_summaries_unique_topic_idx
ON public.page_summaries (
  lower(btrim(title)),
  lower(btrim(coalesce(syllabus_domain, ''))),
  lower(btrim(coalesce(syllabus_subtopic, '')))
);