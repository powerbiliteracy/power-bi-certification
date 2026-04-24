import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Clock, CheckCircle2, XCircle, ExternalLink, ChevronLeft, ChevronRight, History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PracticeResults from "@/components/PracticeResults";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import ContentUpdateBanner from "@/components/ContentUpdateBanner";

import set1 from "@/data/practiceSets/set1";
import set2 from "@/data/practiceSets/set2";
import set3 from "@/data/practiceSets/set3";
import set4 from "@/data/practiceSets/set4";
import set5 from "@/data/practiceSets/set5";
import set6 from "@/data/practiceSets/set6";
import set7 from "@/data/practiceSets/set7";

const allSets = [set1, set2, set3, set4, set5, set6, set7];

const setDescriptions = [
  { title: "Exam Set 1", description: "Connect to data, DirectLake vs DirectQuery vs Import, parameters, data profiling, transformations", topics: ["Data Sources", "Storage Modes", "Power Query", "Data Quality"] },
  { title: "Exam Set 2", description: "Data modeling, DAX calculations, time intelligence, calculation groups, performance", topics: ["Star Schema", "CALCULATE", "Time Intelligence", "Optimization"] },
  { title: "Exam Set 3", description: "Report creation, Copilot, visuals, bookmarks, drillthrough, mobile, accessibility", topics: ["Copilot", "Bookmarks", "Drillthrough", "Accessibility"] },
  { title: "Exam Set 4", description: "AI visuals, forecasting, anomaly detection, paginated reports, themes, export settings", topics: ["Key Influencers", "Decomposition Tree", "Forecasting", "Paginated Reports"] },
  { title: "Exam Set 5", description: "Workspace roles, RLS, sensitivity labels, gateway, subscriptions, distribution methods", topics: ["Workspace Roles", "Row-Level Security", "Sensitivity Labels", "Gateway"] },
  { title: "Exam Set 6", description: "Shared semantic models, incremental refresh, visual interactions, Copilot insights, DAX", topics: ["Semantic Models", "DAX Statistics", "Calculated Tables", "Incremental Refresh"] },
  { title: "Exam Set 7", description: "Advanced scenarios across all four exam domains — full end-to-end coverage", topics: ["DirectLake", "Visual Calculations", "Deployment Pipelines", "Governance"] },
];

type Phase = "select" | "quiz" | "results";

export default function PracticeSets() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedSet, setSelectedSet] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const questions = allSets[selectedSet] || [];

  useEffect(() => {
    if (phase !== "quiz" || !timerEnabled) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [phase, timerEnabled]);

  const startSet = (index: number) => {
    setSelectedSet(index);
    setCurrentQ(0);
    setAnswers(new Array(allSets[index].length).fill(null));
    setShowExplanation(false);
    setSeconds(0);
    setPhase("quiz");
  };

  const selectAnswer = (index: number) => {
    if (showExplanation) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  };

  const submitAnswer = () => setShowExplanation(true);

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setShowExplanation(false);
    } else {
      // Save to history before showing results
      const finalScore = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
      try {
        const history = JSON.parse(localStorage.getItem("exam-questions-history") || "[]");
        history.push({
          set: selectedSet,
          label: setDescriptions[selectedSet]?.title || `Set ${selectedSet + 1}`,
          score: Math.round((finalScore / questions.length) * 100),
          correct: finalScore,
          total: questions.length,
          time: seconds,
          date: new Date().toISOString(),
        });
        if (history.length > 50) history.splice(0, history.length - 50);
        localStorage.setItem("exam-questions-history", JSON.stringify(history));
      } catch {}
      setPhase("results");
    }
  };

  const score = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
  const formatTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  // --- SET SELECTOR ---
  if (phase === "select") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Exam Simulations</h1>
            <p className="text-muted-foreground mt-1">7 sets • 12 questions each • Real-world scenarios</p>
          </div>
          <SyllabusSyncButton
            sectionLabel="Exam Simulations"
            sectionKey="exam-simulations"
            itemType="scenario"
            progressItemTypes={["practice_set"]}
            corpus={allSets.flatMap((set, i) => [
              setDescriptions[i]?.title || "",
              setDescriptions[i]?.description || "",
              ...(setDescriptions[i]?.topics || []),
              ...set.flatMap((q: { question?: string; topic?: string }) => [q.question || "", q.topic || ""]),
            ])}
            itemCount={allSets.reduce((s, set) => s + set.length, 0)}
          />
        </div>

        <ContentUpdateBanner sectionKey="exam-simulations" />

        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-chart-5" />
              <div>
                <p className="font-medium text-foreground">Enable Timer</p>
                <p className="text-xs text-muted-foreground">Track completion time</p>
              </div>
            </div>
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${timerEnabled ? "bg-primary" : "bg-muted"}`}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground"
                animate={{ left: timerEnabled ? "calc(100% - 22px)" : "2px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {setDescriptions.map((set, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group" onClick={() => startSet(index)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{set.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">12 questions</p>
                    </div>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Play className="w-3.5 h-3.5" /> Start
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{set.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {set.topics.map((topic, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{topic}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results History */}
        {(() => {
          let history: any[] = [];
          try { history = JSON.parse(localStorage.getItem("exam-questions-history") || "[]"); } catch {}
          if (history.length === 0) return null;
          return (
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Results History</h3>
                  </div>
                  <button
                    onClick={() => { localStorage.removeItem("exam-questions-history"); setPhase("select"); }}
                    className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[...history].reverse().map((entry: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">{entry.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()} · {entry.correct}/{entry.total} correct
                          {entry.time > 0 && ` · ${Math.floor(entry.time / 60)}m ${entry.time % 60}s`}
                        </p>
                      </div>
                      <span className={`text-lg font-bold ${entry.score >= 70 ? "text-chart-4" : "text-chart-5"}`}>
                        {entry.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })()}
      </div>
    );
  }

  // --- RESULTS ---
  if (phase === "results") {
    return <PracticeResults score={score} total={questions.length} timerEnabled={timerEnabled} seconds={seconds} formatTime={formatTime} selectedSet={selectedSet} onRetry={() => startSet(selectedSet)} onBack={() => setPhase("select")} />;
  }


  // --- QUIZ ---
  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setPhase("select")} className="gap-1">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        {timerEnabled && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-sm font-medium text-muted-foreground">{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
        </div>
        <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          <Card className="bg-card border-border mb-4">
            <CardContent className="p-6">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-primary/10 text-primary border border-primary/30">
                {q.phase}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{q.scenario}</p>
              <h3 className="text-lg font-semibold text-foreground mb-4">{q.question}</h3>

              <div className="space-y-3 mb-4">
                {q.options.map((option: string, index: number) => {
                  const isSelected = answers[currentQ] === index;
                  const isCorrect = q.correctIndex === index;
                  const showCorrect = showExplanation && isCorrect;
                  const showWrong = showExplanation && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect ? "border-green-500/50 bg-green-500/10"
                        : showWrong ? "border-red-500/50 bg-red-500/10"
                        : isSelected ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/30 bg-card"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm text-foreground">{option}</span>
                        {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                        {showWrong && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-4 rounded-lg bg-secondary border border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Explanation:</p>
                  <p className="text-sm text-muted-foreground mb-3">{q.explanation}</p>
                  {q.microsoftLinks?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-foreground mb-2">Learn more:</p>
                      <div className="space-y-1">
                        {q.microsoftLinks.map((link: any, i: number) => (
                          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors">
                            <ExternalLink className="w-3 h-3" /> {link.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end">
        {!showExplanation ? (
          <Button onClick={submitAnswer} disabled={answers[currentQ] === null}>Submit Answer</Button>
        ) : (
          <Button onClick={nextQuestion} className="gap-2">
            {currentQ < questions.length - 1 ? "Next Question" : "See Results"} <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
