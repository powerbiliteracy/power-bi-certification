import React, { useState, useEffect } from "react";
import BadgeGrantOnVisit from "@/components/BadgeGrantOnVisit";
import FavoriteButton from "@/components/FavoriteButton";
import { useSectionAccess } from "@/hooks/useSectionAccess";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import { pl300Syllabus } from "@/data/SyllabusData";
import { topicContent } from "@/data/TopicContent";
import { assessmentQuestions } from "@/data/AssessmentQuestions";
import {
  ChevronDown,
  ChevronRight,
  Database,
  LineChart,
  Eye,
  Shield,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  GitBranch,
  List,
  ShieldAlert,
  HelpCircle,
  Target,
  ExternalLink,
  Zap,
  XCircle,
  RotateCcw,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const domainIcons: Record<string, React.ElementType> = {
  prepare_data: Database,
  model_data: LineChart,
  visualize_analyze: Eye,
  deploy_maintain: Shield,
};

const domainColors: Record<string, string> = {
  prepare_data: "from-blue-400 to-cyan-500",
  model_data: "from-violet-400 to-pink-500",
  visualize_analyze: "from-amber-400 to-orange-500",
  deploy_maintain: "from-emerald-400 to-teal-500",
};

const menuItems = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "keyDefinitions", label: "Key Definitions", icon: Lightbulb },
  { id: "keySteps", label: "Key Steps", icon: List },
  { id: "keyDecisions", label: "Key Decisions", icon: GitBranch },
  { id: "commonMistakes", label: "Common Mistakes", icon: AlertTriangle },
  { id: "risks", label: "Risks & Limitations", icon: ShieldAlert },
  { id: "bestPractices", label: "Best Practices", icon: CheckCircle },
  { id: "examTips", label: "Exam Tips", icon: Target },
  { id: "resources", label: "Microsoft Resources", icon: ExternalLink },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "quiz", label: "Quiz", icon: Zap },
];

export default function Syllabus() {
  const { canAccess, getRequiredTier } = useSectionAccess();
  const [searchParams] = useSearchParams();
  const urlDomain = searchParams.get("domain");
  const urlSection = searchParams.get("section");

  const [topicSearch, setTopicSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("overview");
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>(
    urlDomain ? { [urlDomain]: true } : {}
  );
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    if (urlDomain && urlSection) {
      const domain = pl300Syllabus.domains.find((d) => d.id === urlDomain);
      if (domain) {
        const idx = domain.sections.findIndex((s) => s.title === urlSection);
        if (idx !== -1) return { [`${urlDomain}-${idx}`]: true };
      }
    }
    return {};
  });

  // Progress tracking with localStorage
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("pl300-completed-topics") || "[]");
    } catch {
      return [];
    }
  });

  const completedSet = new Set(completedTopics);

  const toggleCompletion = (topic: string) => {
    const updated = completedSet.has(topic)
      ? completedTopics.filter((t) => t !== topic)
      : [...completedTopics, topic];
    setCompletedTopics(updated);
    localStorage.setItem("pl300-completed-topics", JSON.stringify(updated));
  };

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizShowExplanation, setQuizShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizTopic, setQuizTopic] = useState<string | null>(null);

  const loadQuiz = (topic: string) => {
    const filtered = assessmentQuestions.filter((q: any) => q.topic === topic);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
    setQuizCurrentIndex(0);
    setQuizSelected(null);
    setQuizShowExplanation(false);
    setQuizScore(0);
    setQuizDone(false);
    setQuizTopic(topic);
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizShowExplanation) return;
    setQuizSelected(idx);
    setQuizShowExplanation(true);
    if (idx === quizQuestions[quizCurrentIndex].correct) {
      setQuizScore((s) => s + 1);
    }
  };

  const handleQuizNext = () => {
    if (quizCurrentIndex < quizQuestions.length - 1) {
      setQuizCurrentIndex((i) => i + 1);
      setQuizSelected(null);
      setQuizShowExplanation(false);
    } else {
      setQuizDone(true);
    }
  };

  useEffect(() => {
    if (!urlDomain) return;
    setExpandedDomains((prev) => ({ ...prev, [urlDomain]: true }));
    if (urlSection) {
      const domain = pl300Syllabus.domains.find((d) => d.id === urlDomain);
      if (domain) {
        const idx = domain.sections.findIndex((s) => s.title === urlSection);
        if (idx !== -1) {
          setExpandedSections((prev) => ({ ...prev, [`${urlDomain}-${idx}`]: true }));
        }
      }
    }
  }, []);

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) => ({ ...prev, [domainId]: !prev[domainId] }));
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const handleTopicSelect = (domain: any, sectionTitle: string, topic: string) => {
    setSelectedDomain(domain.id);
    setSelectedSection(sectionTitle);
    setSelectedTopic(topic);
    setActiveMenu("overview");
    setQuizQuestions([]);
    setQuizDone(false);
    setQuizTopic(null);
  };

  const currentContent: any = selectedTopic ? (topicContent as any)[selectedTopic] : null;

  return (
    <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      <BadgeGrantOnVisit badgeKey="syllabus_explorer" />
      {/* Left Sidebar - Topics */}
      <div className="lg:col-span-4 overflow-y-auto">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">PL-300 Exam Syllabus</h1>
              <p className="text-sm text-muted-foreground">Select a topic to explore</p>
            </div>
            <SyllabusSyncButton
              sectionLabel="Exam Syllabus"
              corpus={pl300Syllabus.domains.flatMap(d => d.sections.flatMap(s => s.topics))}
              itemCount={pl300Syllabus.domains.reduce((sum, d) => sum + d.sections.reduce((s, sec) => s + sec.topics.length, 0), 0)}
            />
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics..."
              value={topicSearch}
              onChange={(e) => setTopicSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Exam Info */}
        <Card className="mb-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground uppercase">Passing Score</p>
                <p className="font-semibold text-foreground">{pl300Syllabus.examInfo.passingScore}</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase">Questions</p>
                <p className="font-semibold text-foreground">{pl300Syllabus.examInfo.questionCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase">Duration</p>
                <p className="font-semibold text-foreground">{pl300Syllabus.examInfo.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase">Domains</p>
                <p className="font-semibold text-foreground">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Domain List */}
        <div className="space-y-2">
          {pl300Syllabus.domains.map((domain) => {
            const Icon = domainIcons[domain.id];
            const isExpanded = expandedDomains[domain.id] || !!topicSearch.trim();
            const hasMatchingTopics = topicSearch.trim()
              ? domain.sections.some(s => s.topics.some(t => t.toLowerCase().includes(topicSearch.toLowerCase())))
              : true;
            if (topicSearch.trim() && !hasMatchingTopics) return null;

            return (
              <div key={domain.id} className="border border-border rounded-lg bg-card overflow-hidden">
                {(() => {
                  const domainAccessKey = `syllabus.${domain.id}`;
                  const domainLocked = !canAccess(domainAccessKey);
                  const requiredTier = getRequiredTier(domainAccessKey);
                  return (
                    <>
                      <button
                        onClick={() => !domainLocked && toggleDomain(domain.id)}
                        className={cn(
                          "w-full p-3 bg-secondary/30 flex items-center gap-3 transition-colors",
                          domainLocked ? "opacity-60 cursor-not-allowed" : "hover:bg-secondary/50"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br flex-shrink-0",
                            domainColors[domain.id]
                          )}
                        >
                          {domainLocked ? <Lock className="w-4 h-4 text-card" /> : <Icon className="w-4 h-4 text-card" />}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className="font-semibold text-sm text-foreground truncate">{domain.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {domainLocked ? `Requires ${requiredTier} tier` : domain.weight}
                          </p>
                        </div>
                        {domainLocked ? (
                          <Badge variant="outline" className="text-xs gap-1"><Lock className="w-3 h-3" /> {requiredTier}</Badge>
                        ) : (
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform",
                              isExpanded ? "rotate-180" : ""
                            )}
                          />
                        )}
                      </button>

                      {isExpanded && !domainLocked && (
                  <div className="p-2 space-y-1">
                    {domain.sections.map((section, sectionIdx) => {
                      const filteredTopics = topicSearch.trim()
                        ? section.topics.filter(t => t.toLowerCase().includes(topicSearch.toLowerCase()))
                        : section.topics;
                      if (topicSearch.trim() && filteredTopics.length === 0) return null;
                      const sectionKey = `${domain.id}-${sectionIdx}`;
                      const sectionExpanded = expandedSections[sectionKey];

                      return (
                        <div key={sectionIdx}>
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            className="w-full text-xs font-medium text-foreground px-2 py-1 rounded flex items-center gap-1 hover:bg-secondary/50 transition-colors"
                          >
                            <ChevronRight
                              className={cn(
                                "w-3 h-3 transition-transform flex-shrink-0",
                                sectionExpanded ? "rotate-90" : ""
                              )}
                            />
                            <span className="truncate flex-1 text-left">{section.title}</span>
                          </button>
                          {(topicSearch.trim() || sectionExpanded) && (
                            <div className="ml-2 space-y-1">
                              {filteredTopics.map((topic, topicIdx) => {
                                const isCompleted = completedSet.has(topic);
                                return (
                                  <button
                                    key={topicIdx}
                                    onClick={() => handleTopicSelect(domain, section.title, topic)}
                                    className={cn(
                                      "w-full text-left px-3 py-2 text-xs rounded hover:bg-primary/5 transition-colors flex items-center justify-between",
                                      selectedTopic === topic
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground",
                                      isCompleted && "bg-emerald-50"
                                    )}
                                  >
                                    <span>{topic}</span>
                                    {isCompleted && (
                                      <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                    </>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="lg:col-span-8 overflow-y-auto">
        {!selectedTopic ? (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Select a Topic</h3>
              <p className="text-muted-foreground max-w-md">
                Choose any topic from the syllabus to view detailed explanations, best practices, exam tips, and more
              </p>
            </CardContent>
          </Card>
        ) : currentContent ? (
          <div>
            {/* Topic Header */}
            <Card className="mb-4">
              <CardContent className="p-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FavoriteButton itemType="syllabus_topic" itemId={selectedTopic} size="md" className="mt-1" />
                  <div>
                    <Badge className="mb-2">{selectedSection}</Badge>
                    <h2 className="text-xl font-bold text-foreground">{selectedTopic}</h2>
                  </div>
                </div>
                <button
                  onClick={() => toggleCompletion(selectedTopic)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all flex-shrink-0 text-sm",
                    completedSet.has(selectedTopic)
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  <CheckCircle className="w-4 h-4" />
                  {completedSet.has(selectedTopic) ? "Completed" : "Mark Complete"}
                </button>
              </CardContent>
            </Card>

            {/* Menu Tabs */}
            <Card>
              <CardContent className="p-0">
                <div className="border-b border-border">
                  <div className="flex flex-wrap gap-2 p-3">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveMenu(item.id);
                            if (item.id === "quiz" && selectedTopic && selectedTopic !== quizTopic) {
                              loadQuiz(selectedTopic);
                            }
                          }}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                            activeMenu === item.id
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-foreground bg-secondary/50 hover:bg-secondary border border-border"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6">
                  {/* Overview */}
                  {activeMenu === "overview" && currentContent.overview && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">{currentContent.overview.title}</h3>
                      <div className="space-y-3">
                        {currentContent.overview.concepts.map((concept: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-card flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{concept}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Best Practices */}
                  {activeMenu === "bestPractices" && currentContent.bestPractices && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Best Practices & Tips</h3>
                      {currentContent.bestPractices.map((practice: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{practice}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {activeMenu === "commonMistakes" && currentContent.commonMistakes && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Common Mistakes to Avoid</h3>
                      {currentContent.commonMistakes.map((mistake: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{mistake}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Steps */}
                  {activeMenu === "keySteps" && currentContent.keySteps && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Key Steps & Considerations</h3>
                      {currentContent.keySteps.map((step: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-violet-600 text-card flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Decisions */}
                  {activeMenu === "keyDecisions" && currentContent.keyDecisions && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Key Decisions</h3>
                      {currentContent.keyDecisions.map((decision: string, idx: number) => (
                        <div key={idx} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <p
                            className="text-sm text-foreground"
                            dangerouslySetInnerHTML={{
                              __html: decision.replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="text-amber-900">$1</strong>'
                              ),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Definitions */}
                  {activeMenu === "keyDefinitions" && currentContent.keyDefinitions && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Key Definitions</h3>
                      {currentContent.keyDefinitions.map((def: string, idx: number) => (
                        <div key={idx} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <p
                            className="text-sm text-foreground"
                            dangerouslySetInnerHTML={{
                              __html: def.replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="text-primary">$1</strong>'
                              ),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Risks & Limitations */}
                  {activeMenu === "risks" && currentContent.risks && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Risks, Limitations & Dependencies</h3>
                      {currentContent.risks.map((risk: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <ShieldAlert className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <p
                            className="text-sm text-foreground"
                            dangerouslySetInnerHTML={{
                              __html: risk.replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="text-orange-900">$1</strong>'
                              ),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* FAQs */}
                  {activeMenu === "faqs" && currentContent.faqs && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
                      {currentContent.faqs.map((faq: any, idx: number) => (
                        <div key={idx} className="p-4 bg-secondary/30 border border-border rounded-lg">
                          <p className="font-medium text-foreground mb-2">{faq.q}</p>
                          <p className="text-sm text-muted-foreground">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Exam Tips */}
                  {activeMenu === "examTips" && currentContent.examTips && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Exam Tips</h3>
                      {currentContent.examTips.map((tip: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                          <Target className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{tip}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Resources */}
                  {activeMenu === "resources" && currentContent.resources && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Microsoft Learn Resources</h3>
                      {currentContent.resources.map((resource: any, idx: number) => {
                        const searchUrl = `https://learn.microsoft.com/en-us/search/?terms=${encodeURIComponent(
                          resource.title + " Power BI"
                        )}&category=Ai`;
                        return (
                          <a
                            key={idx}
                            href={searchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {resource.type}
                                  </Badge>
                                </div>
                                <p className="font-medium text-foreground mb-1">{resource.title}</p>
                                <p className="text-xs text-primary flex items-center gap-1">
                                  Search Microsoft Learn (AI) <ExternalLink className="w-3 h-3" />
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {/* Quiz */}
                  {activeMenu === "quiz" && (
                    <div>
                      {quizQuestions.length === 0 && !quizDone && (
                        <div className="text-center py-12 text-muted-foreground">
                          <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p className="text-foreground font-medium">No quiz questions available for this topic yet.</p>
                          <p className="text-sm mt-1">Try a broader topic from the syllabus.</p>
                        </div>
                      )}

                      {!quizDone &&
                        quizQuestions.length > 0 &&
                        (() => {
                          const q = quizQuestions[quizCurrentIndex];
                          const isCorrect = quizSelected === q.correct;
                          return (
                            <div>
                              <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                                <span>
                                  Question {quizCurrentIndex + 1} of {quizQuestions.length}
                                </span>
                                <span>{quizScore} correct</span>
                              </div>
                              <h3 className="text-base font-semibold text-foreground mb-4">{q.question}</h3>
                              <div className="space-y-2 mb-4">
                                {q.options.map((opt: string, idx: number) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleQuizAnswer(idx)}
                                    disabled={quizShowExplanation}
                                    className={cn(
                                      "w-full text-left p-3 rounded-xl border-2 text-sm font-medium transition-all",
                                      !quizShowExplanation &&
                                        "border-border hover:border-primary/30 hover:bg-primary/5",
                                      quizShowExplanation &&
                                        idx === q.correct &&
                                        "border-emerald-500 bg-emerald-50 text-emerald-900",
                                      quizShowExplanation &&
                                        quizSelected === idx &&
                                        idx !== q.correct &&
                                        "border-red-500 bg-red-50 text-red-900",
                                      quizShowExplanation &&
                                        quizSelected !== idx &&
                                        idx !== q.correct &&
                                        "border-border opacity-50",
                                      quizShowExplanation && "cursor-default"
                                    )}
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <span>{opt}</span>
                                      {quizShowExplanation && idx === q.correct && (
                                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                      )}
                                      {quizShowExplanation &&
                                        quizSelected === idx &&
                                        idx !== q.correct && (
                                          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                        )}
                                    </div>
                                  </button>
                                ))}
                              </div>
                              {quizShowExplanation && (
                                <div
                                  className={cn(
                                    "p-3 rounded-xl border text-sm mb-4",
                                    isCorrect
                                      ? "bg-emerald-50 border-emerald-200"
                                      : "bg-amber-50 border-amber-200"
                                  )}
                                >
                                  <p className="font-semibold mb-1">
                                    {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                                  </p>
                                  <p className="text-muted-foreground">{q.explanation}</p>
                                </div>
                              )}
                              {quizShowExplanation && (
                                <div className="flex justify-end">
                                  <button
                                    onClick={handleQuizNext}
                                    className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm transition-colors"
                                  >
                                    {quizCurrentIndex < quizQuestions.length - 1
                                      ? "Next Question"
                                      : "See Results"}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })()}

                      {quizDone && (
                        <div className="text-center py-12">
                          <div
                            className={cn(
                              "text-5xl font-bold mb-2",
                              quizScore >= 4
                                ? "text-emerald-600"
                                : quizScore >= 3
                                ? "text-amber-500"
                                : "text-red-500"
                            )}
                          >
                            {quizScore}/{quizQuestions.length}
                          </div>
                          <p className="text-muted-foreground mb-6">
                            {quizScore >= 4
                              ? "Excellent! You know this topic well."
                              : quizScore >= 3
                              ? "Good effort — review a couple of areas."
                              : "Keep studying this topic."}
                          </p>
                          <button
                            onClick={() => loadQuiz(selectedTopic!)}
                            className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
                          >
                            <RotateCcw className="w-4 h-4" /> Retake Quiz
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Fallback for topics without content yet */}
                  {activeMenu !== "overview" &&
                    activeMenu !== "quiz" &&
                    currentContent &&
                    !currentContent[activeMenu] && (
                      <div className="text-center py-12">
                        <AlertTriangle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground">Content for this section is being developed</p>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Content In Development</h3>
              <p className="text-muted-foreground max-w-md">
                Detailed content for this topic is being created. Try another topic or check back soon.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
