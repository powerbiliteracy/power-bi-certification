import React, { useState } from "react";
import { ExternalLink, Play, Youtube, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLahhVEj9XNTdg4FnhAo_OQ-bSDd86VBcH";

interface Video {
  id: number;
  videoId: string;
  title: string;
  duration: string;
  domain: string;
}

const videos: Video[] = [
  { id: 1, videoId: "hwgFxj8BtZk", title: "Course Introduction PL-300", duration: "0:51", domain: "Foundation" },
  { id: 2, videoId: "dxxJTYcluHE", title: "Discover Data Analysis in Power BI PL-300", duration: "5:37", domain: "Foundation" },
  { id: 3, videoId: "5gU5RWuU5ZM", title: "Get started building with Power BI PL-300", duration: "3:14", domain: "Foundation" },
  { id: 4, videoId: "odtK0ISa6E8", title: "Get data in Power BI PL-300", duration: "18:07", domain: "Prepare the Data" },
  { id: 5, videoId: "M8ODVXrIF38", title: "Clean, transform, and load data PL-300", duration: "23:21", domain: "Prepare the Data" },
  { id: 6, videoId: "i49dAIN_1nA", title: "Design a semantic model in Power BI PL-300", duration: "20:54", domain: "Model the Data" },
  { id: 7, videoId: "4gqNjn_VboY", title: "Add measures to semantic models PL-300", duration: "12:17", domain: "Model the Data" },
  { id: 8, videoId: "bWzFvSqFMgg", title: "Use DAX functions PL-300", duration: "13:39", domain: "Model the Data" },
  { id: 9, videoId: "mt9W5PenMCQ", title: "Optimize model performance PL-300", duration: "6:35", domain: "Model the Data" },
  { id: 10, videoId: "cgl5hmAi1xc", title: "Create visual calculations PL-300", duration: "13:34", domain: "Model the Data" },
  { id: 11, videoId: "lsfWJ6qOqa0", title: "Design Power BI reports PL-300", duration: "19:31", domain: "Visualize & Analyze" },
  { id: 12, videoId: "Tsl-Pj-in6M", title: "Enhance reports for user experience PL-300", duration: "14:34", domain: "Visualize & Analyze" },
  { id: 13, videoId: "6sF_POPIa-8", title: "Perform advanced analytics PL-300", duration: "11:59", domain: "Visualize & Analyze" },
  { id: 14, videoId: "P1iDu4rkUaM", title: "Create and manage workspaces PL-300", duration: "6:25", domain: "Manage & Secure" },
  { id: 15, videoId: "0CEN6FxezYw", title: "Manage semantic models PL-300", duration: "10:15", domain: "Manage & Secure" },
  { id: 16, videoId: "1lGNMJM5uZw", title: "Create dashboards PL-300", duration: "5:02", domain: "Manage & Secure" },
  { id: 17, videoId: "aJkiitEUzHE", title: "Implement row-level security PL-300", duration: "4:36", domain: "Manage & Secure" },
  { id: 18, videoId: "hwgFxj8BtZk", title: "Row-level security best practices PL-300", duration: "8:45", domain: "Manage & Secure" },
];

const domainBadgeColors: Record<string, string> = {
  "Foundation": "bg-primary/10 text-primary",
  "Prepare the Data": "bg-blue-100 text-blue-800",
  "Model the Data": "bg-purple-100 text-purple-800",
  "Visualize & Analyze": "bg-orange-100 text-orange-800",
  "Manage & Secure": "bg-green-100 text-green-800",
};

function VideoCard({ video, index }: { video: Video; index: number }) {
  const url = `https://www.youtube.com/watch?v=${video.videoId}&list=PLahhVEj9XNTdg4FnhAo_OQ-bSDd86VBcH&index=${index + 1}`;
  const thumb = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
  const badgeClass = domainBadgeColors[video.domain] || domainBadgeColors["Foundation"];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
    >
      <div className="relative flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden bg-muted">
        <img src={thumb} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <Play className="w-6 h-6 text-card fill-card" />
        </div>
        <div className="absolute bottom-1 right-1 bg-foreground/70 text-card text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-muted-foreground">#{index + 1}</span>
          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${badgeClass}`}>
            {video.domain}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function YouTubePlaylists() {
  const [expanded, setExpanded] = useState<string | null>("pl300-microsoft-learn");

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
          <p className="font-semibold text-lg">Official Microsoft Learn — PL-300 Course</p>
          <p className="text-red-100 text-sm mt-0.5">18 videos · Free · By Microsoft Learn on YouTube</p>
        </div>
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-card/20 hover:bg-card/30 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
        >
          View Playlist <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <Card className="overflow-hidden">
        <div
          className="p-5 flex items-start gap-4 cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setExpanded(expanded === "pl300-microsoft-learn" ? null : "pl300-microsoft-learn")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center flex-shrink-0">
            <Youtube className="w-5 h-5 text-card" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-base">PL-300: Microsoft Power BI Data Analyst</p>
            <p className="text-sm text-muted-foreground mt-0.5">Official Microsoft Learn course covering all PL-300 exam domains — from data prep and modelling to reporting, deployment, and security.</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Youtube className="w-3 h-3" /> Microsoft Learn</span>
              <span>·</span>
              <span>18 videos</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Play className="w-3 h-3 fill-red-700" /> Play All
            </a>
            <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expanded === "pl300-microsoft-learn" ? "rotate-90" : ""}`} />
          </div>
        </div>

        {expanded === "pl300-microsoft-learn" && (
          <CardContent className="p-3 pt-0 border-t border-border">
            <div className="divide-y divide-border/50">
              {videos.map((video, idx) => (
                <VideoCard key={video.id} video={video} index={idx} />
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      <p className="text-xs text-muted-foreground text-center pb-4">
        Videos provided by Microsoft Learn on YouTube — official free training content for PL-300.
      </p>
    </div>
  );
}
