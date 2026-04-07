import React, { useState, useMemo } from "react";
import { CheckCircle2, XCircle, ChevronRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Database, LineChart, Eye, Shield, BookOpen } from "lucide-react";
import { assessmentQuestions } from "@/data/AssessmentQuestions";

const domainMeta: Record<string, { title: string; subtitle: string; icon: React.ElementType; gradient: string; border: string }> = {
  prepare_data: {
    title: "Prepare the Data",
    subtitle: "25–30% of exam",
    icon: Database,
    gradient: "from-blue-500 to-cyan-500",
    border: "border-blue-200 hover:border-blue-400",
  },
  model_data: {
    title: "Model the Data",
    subtitle: "25–30% of exam",
    icon: LineChart,
    gradient: "from-violet-500 to-pink-500",
    border: "border-violet-200 hover:border-violet-400",
  },
  visualize_analyze: {
    title: "Visualize & Analyze",
    subtitle: "25–30% of exam",
    icon: Eye,
    gradient: "from-amber-500 to-orange-500",
    border: "border-amber-200 hover:border-amber-400",
  },
  deploy_maintain: {
    title: "Manage & Secure",
    subtitle: "15–20% of exam",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    border: "border-emerald-200 hover:border-emerald-400",
  },
};

const domainColorMap: Record<string, string> = {
  prepare_data: "bg-blue-500",
  model_data: "bg-violet-500",
  visualize_analyze: "bg-amber-500",
  deploy_maintain: "bg-emerald-500",
};

const domainLabelMap: Record<string, string> = {
  prepare_data: "Prepare the Data",
  model_data: "Model the Data",
  visualize_analyze: "Visualize & Analyze",
  deploy_maintain: "Manage & Secure",
};

type Phase = "domains" | "topics" | "quiz" | "results";

export default function Assessment() {
  const [phase, setPhase] = useState<Phase>("domains");
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [quizLabel, setQuizLabel] = useState("");

  // Build topic structure per domain
  const domainTopics = useMemo(() => {
    const map: Record<string, { section: string; topic: string; count: number }[]> = {};
    const seen: Record<string, Set<string>> = {};

    assessmentQuestions.forEach((q: any) => {
      if (!map[q.domain]) {
        map[q.domain] = [];
        seen[q.domain] = new Set();
      }
      const key = `${q.section}|||${q.topic}`;
      if (!seen[q.domain].has(key)) {
        seen[q.domain].add(key);
        map[q.domain].push({ section: q.section, topic: q.topic, count: 0 });
      }
      const entry = map[q.domain].find((t) => t.section === q.section && t.topic === q.topic);
      if (entry) entry.count++;
    });

    return map;
  }, []);

  const startQuiz = (qs: any[], label: string) => {
    setQuestions([...qs].sort(() => Math.random() - 0.5));
    setQuizLabel(label);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setPhase("quiz");
  };

  const handleAnswerSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
  };

  const handleNext = () => {
    const finalAnswers = [
      ...answers,
      {
        ...questions[currentIndex],
        selectedAnswer: selectedAnswer!,
        isCorrect: selectedAnswer === questions[currentIndex].correct,
      },
    ];

    if (currentIndex < questions.length - 1) {
      setAnswers(finalAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setAnswers(finalAnswers);
      setPhase("results");
    }
  };

  // ─── Phase: Domain Selection ───
  if (phase === "domains") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">PL-300 Assessment</h1>
          <p className="text-muted-foreground">
            Choose a domain, then pick a specific topic to test your knowledge. {assessmentQuestions.length} total questions.
          </p>
        </div>

        {/* All domains quick start */}
        <button
          onClick={() => startQuiz(assessmentQuestions, "All Domains")}
          className="w-full text-left p-5 rounded-2xl border-2 bg-card border-primary/20 hover:border-primary/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-accent flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-card" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">All Domains — Full Assessment</h3>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {assessmentQuestions.length} randomized questions across all four domains
              </p>
            </div>
          </div>
        </button>

        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(domainMeta).map(([id, meta]) => {
            const Icon = meta.icon;
            const topics = domainTopics[id] || [];
            const totalQ = topics.reduce((sum, t) => sum + t.count, 0);
            return (
              <button
                key={id}
                onClick={() => {
                  setSelectedDomain(id);
                  setPhase("topics");
                }}
                className={cn(
                  "text-left p-5 rounded-2xl border-2 bg-card transition-all duration-200 hover:shadow-md group",
                  meta.border
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br flex-shrink-0", meta.gradient)}>
                    <Icon className="w-6 h-6 text-card" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-foreground">{meta.title}</h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{meta.subtitle} · {totalQ} questions · {topics.length} topics</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Phase: Topic Selection within Domain ───
  if (phase === "topics") {
    const meta = domainMeta[selectedDomain];
    const Icon = meta.icon;
    const topics = domainTopics[selectedDomain] || [];
    const allDomainQs = assessmentQuestions.filter((q: any) => q.domain === selectedDomain);

    // Group topics by section
    const sections: Record<string, { section: string; topic: string; count: number }[]> = {};
    topics.forEach((t) => {
      if (!sections[t.section]) sections[t.section] = [];
      sections[t.section].push(t);
    });

    return (
      <div className="space-y-6 animate-fade-in">
        <button
          onClick={() => setPhase("domains")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to domains
        </button>

        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br flex-shrink-0", meta.gradient)}>
            <Icon className="w-6 h-6 text-card" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{meta.title}</h1>
            <p className="text-sm text-muted-foreground">{meta.subtitle} · Choose a topic to practice</p>
          </div>
        </div>

        {/* All topics in this domain */}
        <button
          onClick={() => startQuiz(allDomainQs, meta.title)}
          className="w-full text-left p-4 rounded-xl border-2 border-primary/20 hover:border-primary/40 bg-card hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br flex-shrink-0", meta.gradient)}>
                <CheckCircle2 className="w-4 h-4 text-card" />
              </div>
              <div>
                <p className="font-semibold text-foreground">All Topics in {meta.title}</p>
                <p className="text-xs text-muted-foreground">{allDomainQs.length} questions randomized</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </button>

        {/* Sections with topics */}
        <div className="space-y-5">
          {Object.entries(sections).map(([sectionName, sectionTopics]) => (
            <div key={sectionName}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">{sectionName}</h3>
              <div className="space-y-2">
                {sectionTopics.map((t) => {
                  const topicQs = assessmentQuestions.filter(
                    (q: any) => q.domain === selectedDomain && q.topic === t.topic
                  );
                  return (
                    <button
                      key={t.topic}
                      onClick={() => startQuiz(topicQs, t.topic)}
                      className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <BookOpen className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground leading-snug">{t.topic}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{t.count} questions</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Phase: Results ───
  if (phase === "results") {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const score = Math.round((correctCount / answers.length) * 100);
    const passed = score >= 70;

    const domainScores: Record<string, { correct: number; total: number }> = {};
    answers.forEach((a) => {
      if (!domainScores[a.domain]) domainScores[a.domain] = { correct: 0, total: 0 };
      domainScores[a.domain].total++;
      if (a.isCorrect) domainScores[a.domain].correct++;
    });

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div
          className={cn(
            "text-center p-8 rounded-2xl border-2",
            passed ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
          )}
        >
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{quizLabel}</p>
          <div
            className="text-5xl font-bold mb-2"
            style={{ color: passed ? "hsl(142, 71%, 45%)" : "hsl(38, 92%, 50%)" }}
          >
            {score}%
          </div>
          <p className="text-lg font-semibold text-foreground">
            {passed ? "🎉 Great job!" : "📚 Keep studying!"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {correctCount} of {answers.length} correct
          </p>
        </div>

        {Object.keys(domainScores).length > 1 && (
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Score by Domain</h3>
            <div className="space-y-3">
              {Object.entries(domainScores).map(([domain, { correct, total }]) => {
                const pct = Math.round((correct / total) * 100);
                return (
                  <div key={domain} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{domainLabelMap[domain] || domain}</span>
                      <span className="text-xs text-muted-foreground">{correct}/{total} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={cn("h-2 rounded-full transition-all", pct >= 70 ? "bg-emerald-500" : "bg-amber-500")}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Question Review</h3>
          {answers.map((answer, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 rounded-xl border",
                answer.isCorrect ? "bg-emerald-50/50 border-emerald-200" : "bg-red-50/50 border-red-200"
              )}
            >
              <div className="flex items-start gap-3">
                {answer.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{answer.question}</p>
                  <p className="text-xs text-muted-foreground mt-1">{answer.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => startQuiz(
              questions.length === assessmentQuestions.length
                ? assessmentQuestions
                : assessmentQuestions.filter((q: any) =>
                    selectedDomain ? q.domain === selectedDomain : true
                  ).filter((q: any) =>
                    quizLabel && quizLabel !== domainLabelMap[selectedDomain]
                      ? q.topic === quizLabel
                      : true
                  ),
              quizLabel
            )}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Retake
          </button>
          <button
            onClick={() => selectedDomain ? setPhase("topics") : setPhase("domains")}
            className="px-6 py-2.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary transition-colors"
          >
            {selectedDomain ? "Back to Topics" : "Back to Domains"}
          </button>
          <button
            onClick={() => { setSelectedDomain(""); setPhase("domains"); }}
            className="px-6 py-2.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary transition-colors"
          >
            All Domains
          </button>
        </div>
      </div>
    );
  }

  // ─── Phase: Quiz ───
  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion?.correct;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={cn("inline-block w-2.5 h-2.5 rounded-full", domainColorMap[currentQuestion.domain])} />
        <span className="text-xs font-medium text-foreground">{domainLabelMap[currentQuestion.domain]}</span>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">{currentQuestion.section}</span>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-4 shadow-sm">
        <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">{currentQuestion.topic}</p>
        <h3 className="text-lg font-semibold text-foreground mb-5">{currentQuestion.question}</h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option: string, idx: number) => {
            const selected = selectedAnswer === idx;
            const correct = idx === currentQuestion.correct;
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showExplanation}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all text-sm font-medium",
                  !showExplanation && "hover:border-primary/30 hover:bg-primary/5 border-border",
                  !showExplanation && selected && "border-primary bg-primary/5",
                  showExplanation && correct && "border-emerald-500 bg-emerald-50 text-emerald-900",
                  showExplanation && selected && !correct && "border-red-500 bg-red-50 text-red-900",
                  showExplanation && !selected && !correct && "border-border opacity-50",
                  showExplanation && "cursor-default"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{option}</span>
                  {showExplanation && correct && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                  {showExplanation && selected && !correct && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={cn("mt-5 p-4 rounded-xl border text-sm", isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200")}>
            <p className="font-semibold mb-1">{isCorrect ? "✅ Correct!" : "❌ Incorrect"}</p>
            <p className="text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => selectedDomain ? setPhase("topics") : setPhase("domains")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← {selectedDomain ? "Back to topics" : "Back to domains"}
        </button>
        <button
          onClick={handleNext}
          disabled={!showExplanation}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-xl transition-colors"
        >
          {currentIndex < questions.length - 1 ? "Next Question" : "View Results"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
