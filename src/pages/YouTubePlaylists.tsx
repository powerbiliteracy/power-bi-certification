import React, { useState } from "react";
import { ExternalLink, Play, Youtube, ChevronDown, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FavoriteButton from "@/components/FavoriteButton";

interface Video {
  id: string;
  videoId: string;
  title: string;
  duration: string;
  domain: string;
}

interface Playlist {
  id: string;
  title: string;
  url: string;
  channel: string;
  description: string;
  domainColor: string;
  badge: string;
  videos: Video[];
}

const playlists: Playlist[] = [
  {
    id: "pl-microsoft-learn",
    title: "PL-300: Microsoft Power BI Data Analyst",
    url: "https://www.youtube.com/playlist?list=PLahhVEj9XNTdg4FnhAo_OQ-bSDd86VBcH",
    channel: "Microsoft Learn",
    description: "Official Microsoft Learn course covering all PL-300 exam domains — from data prep and modelling to reporting, deployment, and security.",
    domainColor: "from-red-500 to-pink-600",
    badge: "bg-red-100 text-red-800",
    videos: [
      { id: "ml-1", videoId: "hwgFxj8BtZk", title: "Course Introduction PL-300", duration: "0:51", domain: "Foundation" },
      { id: "ml-2", videoId: "dxxJTYcluHE", title: "Discover Data Analysis in Power BI PL-300", duration: "5:37", domain: "Foundation" },
      { id: "ml-3", videoId: "5gU5RWuU5ZM", title: "Get started building with Power BI PL-300", duration: "3:14", domain: "Foundation" },
      { id: "ml-4", videoId: "odtK0ISa6E8", title: "Get data in Power BI PL-300", duration: "18:07", domain: "Prepare the Data" },
      { id: "ml-5", videoId: "M8ODVXrIF38", title: "Clean, transform, and load data PL-300", duration: "23:21", domain: "Prepare the Data" },
      { id: "ml-6", videoId: "i49dAIN_1nA", title: "Design a semantic model in Power BI PL-300", duration: "20:54", domain: "Model the Data" },
      { id: "ml-7", videoId: "4gqNjn_VboY", title: "Add measures to semantic models PL-300", duration: "12:17", domain: "Model the Data" },
      { id: "ml-8", videoId: "bWzFvSqFMgg", title: "Use DAX functions PL-300", duration: "13:39", domain: "Model the Data" },
      { id: "ml-9", videoId: "mt9W5PenMCQ", title: "Optimize model performance PL-300", duration: "6:35", domain: "Model the Data" },
      { id: "ml-10", videoId: "cgl5hmAi1xc", title: "Create visual calculations PL-300", duration: "13:34", domain: "Model the Data" },
      { id: "ml-11", videoId: "lsfWJ6qOqa0", title: "Design Power BI reports PL-300", duration: "19:31", domain: "Visualize & Analyze" },
      { id: "ml-12", videoId: "Tsl-Pj-in6M", title: "Enhance reports for user experience PL-300", duration: "14:34", domain: "Visualize & Analyze" },
      { id: "ml-13", videoId: "6sF_POPIa-8", title: "Perform advanced analytics PL-300", duration: "11:59", domain: "Visualize & Analyze" },
      { id: "ml-14", videoId: "P1iDu4rkUaM", title: "Create and manage workspaces PL-300", duration: "6:25", domain: "Manage & Secure" },
      { id: "ml-15", videoId: "0CEN6FxezYw", title: "Manage semantic models PL-300", duration: "10:15", domain: "Manage & Secure" },
      { id: "ml-16", videoId: "1lGNMJM5uZw", title: "Create dashboards PL-300", duration: "5:02", domain: "Manage & Secure" },
      { id: "ml-17", videoId: "aJkiitEUzHE", title: "Implement row-level security PL-300", duration: "4:36", domain: "Manage & Secure" },
      { id: "ml-18", videoId: "hwgFxj8BtZk", title: "Row-level security best practices PL-300", duration: "8:45", domain: "Manage & Secure" },
    ],
  },
  {
    id: "pl-pragmatic-works",
    title: "Get Certified (PL-300): Power BI Data Analyst — APAC",
    url: "https://www.youtube.com/playlist?list=PLmsFUfdnGr3xYadJoCJUtbMwROcLCv4tx",
    channel: "Microsoft Reactor",
    description: "Five-session series covering all PL-300 exam domains plus exam day preparation. APAC timezone sessions.",
    domainColor: "from-blue-500 to-indigo-600",
    badge: "bg-blue-100 text-blue-800",
    videos: [
      { id: "pw-1", videoId: "TGEpaQYTAQ0", title: "PL-300: Preparing data using Power BI (APAC)", duration: "1:03:19", domain: "Prepare the Data" },
      { id: "pw-2", videoId: "XGZTWk0zfac", title: "PL-300: Modeling data using Power BI (APAC)", duration: "1:02:59", domain: "Model the Data" },
      { id: "pw-3", videoId: "EOl496QeGhA", title: "PL-300: Visualize and analyze data using Power BI (APAC)", duration: "1:01:38", domain: "Visualize & Analyze" },
      { id: "pw-4", videoId: "i14bTQZUKpg", title: "PL-300: Manage and secure Power BI (APAC)", duration: "1:00:50", domain: "Manage & Secure" },
      { id: "pw-5", videoId: "0YvT4EDDOgQ", title: "PL-300: Prepare for exam day and open Q&A (APAC)", duration: "1:02:12", domain: "Foundation" },
    ],
  },
  {
    id: "pl-pragmatic-works-2",
    title: "Get Certified (PL-300): Power BI Data Analyst — AMER",
    url: "https://www.youtube.com/playlist?list=PLmsFUfdnGr3zRIO9eAuflNHv1cVaPriqU",
    channel: "Microsoft Reactor",
    description: "Five-session series covering all PL-300 exam domains plus exam day preparation. Americas timezone sessions.",
    domainColor: "from-purple-500 to-violet-600",
    badge: "bg-purple-100 text-purple-800",
    videos: [
      { id: "pw2-1", videoId: "55oVQ0kqc40", title: "PL-300: Preparing data using Power BI (AMER)", duration: "1:00:48", domain: "Prepare the Data" },
      { id: "pw2-2", videoId: "_CVayf3XWDY", title: "PL-300: Modeling data using Power BI (AMER)", duration: "59:10", domain: "Model the Data" },
      { id: "pw2-3", videoId: "W0_0hsv_JnY", title: "PL-300: Visualize and analyze data using Power BI (AMER)", duration: "59:16", domain: "Visualize & Analyze" },
      { id: "pw2-4", videoId: "8rNsR_jAcik", title: "PL-300: Manage and secure Power BI (AMER)", duration: "1:02:11", domain: "Manage & Secure" },
      { id: "pw2-5", videoId: "e6iVT7HOMPg", title: "PL-300: Prepare for exam day and open Q&A (AMER)", duration: "1:00:47", domain: "Foundation" },
    ],
  },
  {
    id: "pl-learnit",
    title: "PL-300 Certification Exam Tutoring",
    url: "https://www.youtube.com/playlist?list=PLcwrIWK7WBcSCcdFkFBftOjqli_yi9Zti",
    channel: "Pragmatic Works",
    description: "16-video series by Pragmatic Works covering PL-300 exam prep, practice Q&A, tips & tricks, and full courses.",
    domainColor: "from-emerald-500 to-teal-600",
    badge: "bg-emerald-100 text-emerald-800",
    videos: [
      { id: "li-1", videoId: "Lco3SgSH5S8", title: "Preparing for the PL-300 Certification: Exam Overview", duration: "18:26", domain: "Foundation" },
      { id: "li-2", videoId: "H2HPicNvz8s", title: "Merging vs. Appending Queries in Power BI", duration: "13:35", domain: "Prepare the Data" },
      { id: "li-3", videoId: "NJeVl0KBxiE", title: "Conquer Cardinality with This Easy Cheat Sheet", duration: "17:19", domain: "Model the Data" },
      { id: "li-4", videoId: "OyefIskg810", title: "Ace the Exam with Visual Data Analysis", duration: "11:18", domain: "Visualize & Analyze" },
      { id: "li-5", videoId: "VKDMk0eeemM", title: "Deploy & Maintain Like a Pro: PL-300 Exam Secrets", duration: "8:54", domain: "Manage & Secure" },
      { id: "li-6", videoId: "SCjsUe6D0UM", title: "How To Prepare for the PL-300 [Full Course]", duration: "56:44", domain: "Foundation" },
      { id: "li-7", videoId: "kCAdjT9j4_U", title: "Get Data From Data Sources", duration: "19:03", domain: "Prepare the Data" },
      { id: "li-8", videoId: "5E4s3fVzPOY", title: "PL-300 Practice Exam Q&A Challenge", duration: "34:58", domain: "Foundation" },
      { id: "li-9", videoId: "zUM63N_mvl8", title: "Can You Pass PL-300? Power BI Q&A Ep. 2", duration: "20:26", domain: "Foundation" },
      { id: "li-10", videoId: "sxwuv1nHo1o", title: "Don't Take PL-300 Until You Watch This!", duration: "15:59", domain: "Foundation" },
      { id: "li-11", videoId: "TqBV-BZz9m0", title: "PL-300 Hot Seat Challenge LIVE!", duration: "26:20", domain: "Foundation" },
      { id: "li-12", videoId: "NZmUVfmdnsY", title: "PL-300: Microsoft Power BI Data Analyst Course Preview", duration: "0:54", domain: "Foundation" },
      { id: "li-13", videoId: "UIh-kzdkQ14", title: "PL-300 Tips and Tricks: Learn with the Nerds", duration: "55:42", domain: "Foundation" },
      { id: "li-14", videoId: "BDGzVpt1xCg", title: "Conquering PL-300: Data Analyst Certification [Full Course]", duration: "1:33:08", domain: "Foundation" },
      { id: "li-15", videoId: "Zoyo_8Lv7LM", title: "Is PL-300 Worth It? Redeemed or Reckless", duration: "10:24", domain: "Foundation" },
      { id: "li-16", videoId: "SOP6YiKGhhY", title: "PL-300 Exam Update: Automatic Page Refresh", duration: "12:44", domain: "Visualize & Analyze" },
    ],
  },
];

const domainBadgeColors: Record<string, string> = {
  "Foundation": "bg-primary/10 text-primary",
  "Prepare the Data": "bg-blue-100 text-blue-800",
  "Model the Data": "bg-purple-100 text-purple-800",
  "Visualize & Analyze": "bg-orange-100 text-orange-800",
  "Manage & Secure": "bg-green-100 text-green-800",
};

function getCompletedPlaylists(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem("youtube-playlists-completed") || "[]"));
  } catch { return new Set(); }
}

function VideoCard({
  video,
  index,
  isPlaying,
  isComplete,
  onPlay,
  onToggleComplete,
}: {
  video: Video;
  index: number;
  isPlaying: boolean;
  isComplete: boolean;
  onPlay: () => void;
  onToggleComplete: () => void;
}) {
  const thumb = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
  const badgeClass = domainBadgeColors[video.domain] || domainBadgeColors["Foundation"];

  return (
    <div className="space-y-0">
      <div className={cn("w-full flex gap-3 p-3 rounded-xl transition-colors group", isPlaying ? "bg-primary/5 border border-primary/20" : "hover:bg-secondary/50", isComplete && !isPlaying && "bg-emerald-500/5")}>
        <button
          onClick={onToggleComplete}
          className={cn("flex-shrink-0 mt-1 transition-colors", isComplete ? "text-emerald-500" : "text-muted-foreground/40 hover:text-muted-foreground")}
          title={isComplete ? "Mark as incomplete" : "Mark as complete"}
        >
          <CheckCircle className={cn("w-5 h-5", !isComplete && "opacity-30")} />
        </button>
        <button onClick={onPlay} className="flex-1 flex gap-3 text-left">
          <div className="relative flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden bg-muted">
            <img src={thumb} alt={video.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 ${isPlaying ? "bg-primary/40" : "bg-foreground/30 opacity-0 group-hover:opacity-100"} flex items-center justify-center transition-opacity`}>
              <Play className="w-6 h-6 text-card fill-card" />
            </div>
            <div className="absolute bottom-1 right-1 bg-foreground/70 text-card text-xs px-1 rounded">{video.duration}</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("text-sm font-medium leading-snug line-clamp-2 transition-colors", isPlaying ? "text-primary" : "text-foreground group-hover:text-primary", isComplete && "line-through opacity-70")}>{video.title}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-muted-foreground">#{index + 1}</span>
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${badgeClass}`}>{video.domain}</span>
            </div>
          </div>
        </button>
      </div>
      {isPlaying && (
        <div className="px-3 pb-3">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground/5">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function YouTubePlaylists() {
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(getCompletedPlaylists);

  const toggleComplete = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("youtube-playlists-completed", JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">YouTube Playlists</h1>
        <p className="text-muted-foreground mt-1">Curated video playlists to support your PL-300 exam preparation</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 p-6 text-card flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-card/20 flex items-center justify-center flex-shrink-0">
          <Youtube className="w-7 h-7 text-card" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg">PL-300 YouTube Playlists</p>
          <p className="text-red-100 text-sm mt-0.5">{playlists.length} playlists · {completed.size}/{playlists.length} completed</p>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <span className="font-semibold">💡 Tip:</span> Each playlist is from a different educator. Click to expand and watch videos embedded in the app. Mark playlists as complete to track your progress.
      </div>

      <div className="space-y-3">
        {playlists.map((playlist) => {
          const isComplete = completed.has(playlist.id);
          const isExpanded = expandedPlaylist === playlist.id;
          const hasVideos = playlist.videos.length > 0;

          return (
            <Card key={playlist.id} className={cn("overflow-hidden", isComplete && "border-emerald-500/30 bg-emerald-500/5")}>
              <div
                className="p-5 flex items-start gap-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => {
                  setExpandedPlaylist(isExpanded ? null : playlist.id);
                  if (isExpanded) setPlayingVideoId(null);
                }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); toggleComplete(playlist.id); }}
                  className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm transition-colors",
                    isComplete ? "bg-emerald-500 text-card" : `bg-gradient-to-br ${playlist.domainColor} text-card`
                  )}
                  title={isComplete ? "Mark as incomplete" : "Mark as complete"}
                >
                  {isComplete ? <CheckCircle className="w-5 h-5" /> : <Youtube className="w-5 h-5" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${playlist.badge}`}>{playlist.channel}</span>
                    {hasVideos && <span className="text-xs text-muted-foreground">{playlist.videos.length} videos</span>}
                    {isComplete && <span className="text-xs text-emerald-600 font-medium">✓ Completed</span>}
                  </div>
                  <p className="font-semibold text-foreground text-base">{playlist.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{playlist.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <FavoriteButton itemType="youtube_playlist" itemId={playlist.id} />
                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Open
                  </a>
                  <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded ? "rotate-180" : "")} />
                </div>
              </div>

              {isExpanded && (
                <CardContent className="p-3 pt-0 border-t border-border">
                  {hasVideos ? (
                    <div className="divide-y divide-border/50">
                      {playlist.videos.map((video, idx) => (
                        <VideoCard
                          key={video.id}
                          video={video}
                          index={idx}
                          isPlaying={playingVideoId === video.id}
                          isComplete={false}
                          onPlay={() => setPlayingVideoId(playingVideoId === video.id ? null : video.id)}
                          onToggleComplete={() => {}}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-sm text-muted-foreground mb-3">Watch this playlist directly on YouTube</p>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground/5 max-w-2xl mx-auto">
                        <iframe
                          src={`https://www.youtube.com/embed/videoseries?list=${playlist.url.split("list=")[1]}`}
                          title={playlist.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center pb-4">
        Videos provided by various Power BI educators on YouTube — curated for PL-300 exam preparation.
      </p>
    </div>
  );
}
