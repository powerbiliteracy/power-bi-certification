ALTER TABLE public.section_access ADD COLUMN sort_order integer NOT NULL DEFAULT 0;

-- Set initial sort orders based on a logical grouping
UPDATE public.section_access SET sort_order = 1 WHERE section_key = 'syllabus';
UPDATE public.section_access SET sort_order = 2 WHERE section_key = 'learn-modules';
UPDATE public.section_access SET sort_order = 3 WHERE section_key = 'youtube-playlists';
UPDATE public.section_access SET sort_order = 4 WHERE section_key = 'exam-prep-videos';
UPDATE public.section_access SET sort_order = 5 WHERE section_key = 'pricing';
UPDATE public.section_access SET sort_order = 6 WHERE section_key = 'key-terms';
UPDATE public.section_access SET sort_order = 7 WHERE section_key = 'exam-scenarios';
UPDATE public.section_access SET sort_order = 8 WHERE section_key = 'assessment';
UPDATE public.section_access SET sort_order = 9 WHERE section_key = 'flashcards';
UPDATE public.section_access SET sort_order = 10 WHERE section_key = 'cheatsheets';
UPDATE public.section_access SET sort_order = 11 WHERE section_key = 'dos-and-donts';
UPDATE public.section_access SET sort_order = 12 WHERE section_key = 'exam-checklist';
UPDATE public.section_access SET sort_order = 13 WHERE section_key = 'dax-templates';
UPDATE public.section_access SET sort_order = 14 WHERE section_key = 'troubleshooting';
UPDATE public.section_access SET sort_order = 15 WHERE section_key = 'decision-framework';
UPDATE public.section_access SET sort_order = 16 WHERE section_key = 'practice-sets';
UPDATE public.section_access SET sort_order = 17 WHERE section_key = 'reviews';
UPDATE public.section_access SET sort_order = 18 WHERE section_key = 'study-plan';