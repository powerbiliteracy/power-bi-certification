
-- Badge definitions
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'trophy',
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Admins can manage badges" ON public.badges FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- User earned badges
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges" ON public.user_badges FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "System can insert badges" ON public.user_badges FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Seed badge definitions
INSERT INTO public.badges (key, name, description, icon, category) VALUES
  ('first_assessment', 'First Steps', 'Complete your first assessment', 'rocket', 'assessment'),
  ('assessment_pass', 'Passing Grade', 'Score 70% or higher on an assessment', 'award', 'assessment'),
  ('assessment_ace', 'Ace', 'Score 90% or higher on an assessment', 'star', 'assessment'),
  ('practice_set_1', 'Practice Beginner', 'Complete Practice Set 1', 'zap', 'practice'),
  ('practice_set_3', 'Practice Intermediate', 'Complete 3 Practice Sets', 'flame', 'practice'),
  ('practice_set_all', 'Practice Master', 'Complete all 7 Practice Sets', 'crown', 'practice'),
  ('syllabus_explorer', 'Syllabus Explorer', 'Visit the Syllabus section', 'book-open', 'learning'),
  ('video_learner', 'Video Learner', 'Watch exam prep videos', 'play', 'learning'),
  ('domain_prepare', 'Data Preparer', 'Study the Prepare Data domain', 'database', 'domain'),
  ('domain_model', 'Data Modeler', 'Study the Model Data domain', 'line-chart', 'domain'),
  ('domain_visualize', 'Visualization Pro', 'Study the Visualize & Analyze domain', 'eye', 'domain'),
  ('domain_deploy', 'Deployment Expert', 'Study the Deploy & Maintain domain', 'shield', 'domain'),
  ('all_domains', 'Full Coverage', 'Study all four exam domains', 'trophy', 'domain'),
  ('key_terms', 'Terminology Master', 'Review Key Terms', 'book', 'learning'),
  ('decision_framework', 'Decision Maker', 'Use the Decision Framework', 'git-branch', 'learning');
