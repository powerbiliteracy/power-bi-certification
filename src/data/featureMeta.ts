// Shared feature metadata keyed by section_access.section_key
// Used by both PricingCards (feature lists) and the landing "Everything you need to pass" grid
// so they stay in sync with section_access changes.

import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  Video,
  GraduationCap,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  Youtube,
  Brain,
  Trophy,
  Sparkles,
  FileText,
  Wrench,
  ListChecks,
  Calendar,
  Star,
  Heart,
  GitCompare,
  type LucideIcon,
} from "lucide-react";

import imgDashboard from "@/assets/features/dashboard.jpg";
import imgSyllabus from "@/assets/features/syllabus.jpg";
import imgKeyTerms from "@/assets/features/key-terms.jpg";
import imgExamVideos from "@/assets/features/exam-videos.jpg";
import imgLearnModules from "@/assets/features/learn-modules.jpg";
import imgTroubleshooting from "@/assets/features/troubleshooting.jpg";
import imgExamScenarios from "@/assets/features/exam-scenarios.jpg";
import imgDecisionFramework from "@/assets/features/decision-framework.jpg";
import imgYoutubePlaylists from "@/assets/features/youtube-playlists.jpg";
import imgTopicAssessments from "@/assets/features/topic-assessments.jpg";
import imgExamQuestions from "@/assets/features/exam-questions.jpg";
import imgBadges from "@/assets/features/badges.jpg";

export interface FeatureMeta {
  icon: LucideIcon;
  description: string;
  image?: string;
  count?: number;          // shown as a small count badge in pricing list & metric on landing
  countLabel?: string;     // optional override for landing metric (e.g., "92 flashcards")
}

// Keyed by section_access.section_key
export const FEATURE_META: Record<string, FeatureMeta> = {
  dashboard: {
    icon: LayoutDashboard,
    description: "Your personalized study home with progress, streaks, and quick links.",
    image: imgDashboard,
    countLabel: "Real-time progress tracking",
  },
  syllabus: {
    icon: BookOpen,
    description: "Official PL-300 exam outline with every domain and subtopic.",
    image: imgSyllabus,
    count: 74,
  },
  "learn-modules": {
    icon: GraduationCap,
    description: "Structured Microsoft Learn modules covering each PL-300 topic in depth.",
    image: imgLearnModules,
    count: 73,
  },
  "youtube-playlists": {
    icon: Youtube,
    description: "Curated YouTube playlists organized by exam domain.",
    image: imgYoutubePlaylists,
    count: 4,
  },
  "exam-prep-videos": {
    icon: Video,
    description: "Focused Microsoft Exam Readiness Zone videos for each domain.",
    image: imgExamVideos,
    count: 4,
  },
  "key-terms": {
    icon: BookMarked,
    description: "Glossary of must-know Power BI terms and exam-relevant features.",
    image: imgKeyTerms,
    count: 120,
  },
  "exam-scenarios": {
    icon: Lightbulb,
    description: "Real-world scenario questions that mirror the exam style.",
    image: imgExamScenarios,
    count: 41,
  },
  flashcards: {
    icon: Sparkles,
    description: "Spaced-repetition flashcards for fast recall of key concepts.",
    count: 92,
  },
  cheatsheets: {
    icon: FileText,
    description: "Printable one-page references for quick review.",
    count: 5,
  },
  "dos-and-donts": {
    icon: ListChecks,
    description: "Best practices and common pitfalls to avoid on the exam.",
    count: 122,
  },
  "dax-templates": {
    icon: FileText,
    description: "Ready-to-use DAX patterns for common report needs.",
    count: 12,
  },
  troubleshooting: {
    icon: Wrench,
    description: "Fixes for the most frequent Power BI and DAX errors.",
    image: imgTroubleshooting,
    count: 30,
  },
  "decision-framework": {
    icon: GitBranch,
    description: "Guides to choose the right visual, model, or DAX approach.",
    image: imgDecisionFramework,
    count: 11,
  },
  assessment: {
    icon: Brain,
    description: "Topic-by-topic quizzes to validate your understanding.",
    image: imgTopicAssessments,
    count: 21,
  },
  "practice-sets": {
    icon: Brain,
    description: "Full-length practice question sets with detailed explanations.",
    image: imgExamQuestions,
    count: 84,
  },
  "page-summaries": {
    icon: FileText,
    description: "Visual summary cards covering key exam topics at a glance.",
    count: 60,
  },
  "interactive-lessons": {
    icon: BookOpen,
    description: "Hands-on interactive lessons with built-in practice.",
    count: 73,
  },
  "concept-comparisons": {
    icon: GitCompare,
    description: "Side-by-side comparisons of similar Power BI concepts.",
    count: 60,
  },
  "study-plan": {
    icon: Calendar,
    description: "A personalized study schedule based on your goals.",
  },
  "exam-checklist": {
    icon: ListChecks,
    description: "A final pre-exam checklist to make sure you're ready.",
  },
  badges: {
    icon: Trophy,
    description: "Earn achievements as you progress through the material.",
    image: imgBadges,
    countLabel: "Achievement milestones",
  },
  reviews: {
    icon: Star,
    description: "See what other learners say about the platform.",
  },
  "my-list": {
    icon: Heart,
    description: "Your saved favorites for quick access.",
  },
};

