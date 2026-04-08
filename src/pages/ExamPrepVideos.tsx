import React, { useState } from "react";
import BadgeGrantOnVisit from "@/components/BadgeGrantOnVisit";
import { ExternalLink, PlayCircle, Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const videos = [
  {
    id: "epv-1",
    title: "Preparing for PL-300 - Prepare the Data",
    part: "Part 1 of 4",
    duration: "10:45",
    domainLabel: "Prepare the Data",
    date: "Dec 13, 2024",
    url: "https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-pl-300-prepare-the-data/",
    thumbnail: "https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-3a7bceac-80d6-4542-a33a-bb215420c74e/PL300_EP_1_Thumbnail_w800.png",
    topics: [
      "Connecting to data sources and shared semantic models",
      "Choosing between DirectLake, DirectQuery, and Import",
      "Data profiling and cleaning techniques",
      "Transforming and loading data with Power Query",
    ],
    gradient: "from-blue-400 to-cyan-500",
    badge: "bg-blue-100 text-blue-800",
    weight: "25–30%",
  },
  {
    id: "epv-2",
    title: "Preparing for PL-300 - Model the Data",
    part: "Part 2 of 4",
    duration: "7:43",
    domainLabel: "Model the Data",
    date: "Dec 13, 2024",
    url: "https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-pl-300-model-the-data/",
    thumbnail: "https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-e92bcbf2-c7fb-485d-ae5f-de18c3150abb/PL300_EP_2_Thumbnail_w800.png",
    topics: [
      "Designing star schema data models",
      "Creating DAX measures and calculated columns",
      "Time intelligence calculations",
      "Optimising model performance",
    ],
    gradient: "from-violet-400 to-pink-500",
    badge: "bg-violet-100 text-violet-800",
    weight: "25–30%",
  },
  {
    id: "epv-3",
    title: "Preparing for PL-300 - Visualize and Analyze",
    part: "Part 3 of 4",
    duration: "13:42",
    domainLabel: "Visualize & Analyze",
    date: "Dec 13, 2024",
    url: "https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-pl-300-visualize-and-analyze-the-data/",
    thumbnail: "https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-d494b8df-f450-4ffe-8647-a2f5bbffec0d/PL300_EP_3_Thumbnail_w800.png",
    topics: [
      "Selecting appropriate visuals for your data",
      "Enhancing reports for usability and storytelling",
      "Using AI visuals and Copilot features",
      "Identifying patterns, trends, and anomalies",
    ],
    gradient: "from-amber-400 to-orange-500",
    badge: "bg-amber-100 text-amber-800",
    weight: "25–30%",
  },
  {
    id: "epv-4",
    title: "Preparing for PL-300 - Manage and Secure",
    part: "Part 4 of 4",
    duration: "9:45",
    domainLabel: "Manage & Secure",
    date: "Dec 13, 2024",
    url: "https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-pl-300-manage-and-secure-power-bi/",
    thumbnail: "https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-d11ad03e-0add-4620-88bb-879d52115719/PL300_EP_4_Thumbnail_w800.png",
    topics: [
      "Creating and configuring workspaces and apps",
      "Scheduling data refresh and using gateways",
      "Implementing Row-Level Security (RLS)",
      "Applying sensitivity labels and governance",
    ],
    gradient: "from-emerald-400 to-teal-500",
    badge: "bg-emerald-100 text-emerald-800",
    weight: "15–20%",
  },
];

function getCompletedPrepVideos(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem("exam-prep-videos-completed") || "[]"));
  } catch { return new Set(); }
}

export default function ExamPrepVideos() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(getCompletedPrepVideos);
  const totalMinutes = Math.round(
    (10 * 60 + 45 + 7 * 60 + 43 + 13 * 60 + 42 + 9 * 60 + 45) / 60
  );

  const toggleComplete = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("exam-prep-videos-completed", JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <BadgeGrantOnVisit badgeKey="video_learner" />
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Exam Prep Videos</h1>
        <p className="text-muted-foreground mt-1">
          Official Microsoft PL-300 Exam Readiness Zone — 4 expert-led episodes covering every exam domain · {completed.size}/{videos.length} completed
        </p>
      </div>

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[hsl(0,0%,100%/0.2)] flex items-center justify-center flex-shrink-0">
          <PlayCircle className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg">Microsoft Exam Readiness Zone — PL-300</p>
          <p className="text-sm opacity-80 mt-0.5">
            4 episodes · ~{totalMinutes} minutes total · Official Microsoft Learn content
          </p>
        </div>
        <a
          href="https://learn.microsoft.com/en-us/shows/exam-readiness-zone/?expanded=power-platform&products=power-bi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(0,0%,100%/0.2)] hover:bg-[hsl(0,0%,100%/0.3)] rounded-xl text-sm font-medium transition-colors flex-shrink-0"
        >
          View all on Microsoft Learn <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Study tip */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <span className="font-semibold">💡 Study tip:</span> These videos are best watched after completing
        study for each domain. Each episode includes example exam questions with explanations.
      </div>

      {/* Video Cards */}
      <div className="space-y-4">
        {videos.map((video) => {
          const isComplete = completed.has(video.id);
          return (
            <Card key={video.id} className={cn("overflow-hidden hover:shadow-md transition-shadow", isComplete && "border-emerald-500/30 bg-emerald-500/5")}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex-shrink-0 sm:w-64 group"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-44 sm:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-card opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-foreground/70 text-card text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </div>
                  </a>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${video.badge}`}>
                          {video.domainLabel}
                        </span>
                        <span className="text-xs text-muted-foreground">{video.part}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">Exam weight: {video.weight}</span>
                        {isComplete && (
                          <>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-emerald-600 font-medium">✓ Completed</span>
                          </>
                        )}
                      </div>

                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-semibold text-foreground hover:text-primary transition-colors text-base leading-snug mb-3"
                      >
                        {video.title}
                      </a>

                      {/* Topics toggle */}
                      <button
                        onClick={() => setExpanded(expanded === video.id ? null : video.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <ChevronRight
                          className={cn("w-3.5 h-3.5 transition-transform", expanded === video.id ? "rotate-90" : "")}
                        />
                        {expanded === video.id ? "Hide topics" : "Show topics covered"}
                      </button>

                      {expanded === video.id && (
                        <ul className="mt-3 space-y-1.5">
                          {video.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${video.gradient} flex-shrink-0`} />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => toggleComplete(video.id)}
                        className={cn(
                          "flex items-center gap-1.5 text-sm font-medium transition-colors",
                          isComplete ? "text-emerald-600 hover:text-emerald-700" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <CheckCircle className={cn("w-4 h-4", isComplete ? "text-emerald-500" : "opacity-40")} />
                        {isComplete ? "Completed" : "Mark complete"}
                      </button>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Watch on Microsoft Learn <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center pb-4">
        Content provided by Microsoft Learn — Exam Readiness Zone. Videos are hosted on Microsoft's platform.
      </p>
    </div>
  );
}
