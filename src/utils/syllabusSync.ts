// Shared syllabus parsing & coverage analysis used by SyllabusAudit and the
// per-section "Sync with latest syllabus" button.

export interface ParsedTopic {
  raw: string;
  normalized: string;
}
export interface ParsedSection {
  title: string;
  topics: ParsedTopic[];
}
export interface ParsedDomain {
  name: string;
  weight?: string;
  sections: ParsedSection[];
}

export const normalize = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const STOP = new Set([
  "the", "a", "an", "and", "or", "to", "of", "for", "in", "on", "by", "with",
  "use", "using", "create", "configure", "apply", "set", "your", "data", "is",
  "are", "be", "as", "from", "at", "into", "how", "when", "what", "which",
]);

export const tokens = (s: string): Set<string> =>
  new Set(normalize(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w)));

export const similarity = (a: string, b: string): number => {
  const ta = tokens(a);
  const tb = tokens(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  ta.forEach((t) => {
    if (tb.has(t)) inter++;
  });
  return inter / Math.min(ta.size, tb.size);
};

export function parseSyllabus(text: string): ParsedDomain[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/\u00a0/g, " ").trimEnd())
    .filter((l) => l.trim().length > 0);

  const domains: ParsedDomain[] = [];
  let currentDomain: ParsedDomain | null = null;
  let currentSection: ParsedSection | null = null;

  const domainRegex =
    /^([A-Z][A-Za-z0-9 ,&'/\-]+?)\s*\(?\s*(\d{1,2}\s*[\-–]\s*\d{1,2}\s*%|\d{1,2}\s*%)\s*\)?\s*$/;
  const bulletRegex = /^\s*([-*•·–▪◦]|\d+\.)\s+(.*)$/;

  for (const line of lines) {
    const domainMatch = line.match(domainRegex);
    if (domainMatch) {
      currentDomain = { name: domainMatch[1].trim(), weight: domainMatch[2].trim(), sections: [] };
      currentSection = null;
      domains.push(currentDomain);
      continue;
    }
    const bulletMatch = line.match(bulletRegex);
    if (bulletMatch && currentDomain) {
      const t = bulletMatch[2].trim();
      if (!currentSection) {
        currentSection = { title: "(uncategorized)", topics: [] };
        currentDomain.sections.push(currentSection);
      }
      currentSection.topics.push({ raw: t, normalized: normalize(t) });
      continue;
    }
    if (currentDomain && line.trim().length > 0 && !line.startsWith("Skills measured")) {
      if (line.length <= 120 && !line.endsWith(".")) {
        currentSection = { title: line.trim(), topics: [] };
        currentDomain.sections.push(currentSection);
        continue;
      }
    }
  }
  return domains;
}

// ---------- Coverage analysis ----------
export const COVERED_THRESHOLD = 0.5;
export const PARTIAL_THRESHOLD = 0.25;

export type CoverageStatus = "covered" | "partial" | "missing";

export interface TopicMatch {
  topic: ParsedTopic;
  domainName: string;
  sectionTitle: string;
  bestScore: number;
  bestMatch?: string;
  status: CoverageStatus;
}

export interface CoverageReport {
  total: number;
  covered: number;
  partial: number;
  missing: number;
  matches: TopicMatch[];
  /** Topics in syllabus that the section content covers well (score >= COVERED_THRESHOLD). */
  coveredTopics: TopicMatch[];
  /** Topics partially covered (score in [PARTIAL, COVERED)). */
  partialTopics: TopicMatch[];
  /** Topics not covered at all (score < PARTIAL_THRESHOLD). Renaming/adding candidates. */
  missingTopics: TopicMatch[];
}

function bestScoreFor(
  topic: ParsedTopic,
  corpus: string[],
): { score: number; match?: string } {
  let best = 0;
  let bestLabel: string | undefined;
  for (const c of corpus) {
    const s = similarity(topic.raw, c);
    if (s > best) {
      best = s;
      bestLabel = c;
    }
    if (best === 1) break;
  }
  return { score: best, match: bestLabel };
}

export function analyzeCoverage(
  parsed: ParsedDomain[],
  corpus: string[],
): CoverageReport {
  const matches: TopicMatch[] = [];
  let covered = 0;
  let partial = 0;
  let missing = 0;

  for (const d of parsed) {
    for (const s of d.sections) {
      for (const t of s.topics) {
        const { score, match } = bestScoreFor(t, corpus);
        let status: CoverageStatus;
        if (score >= COVERED_THRESHOLD) {
          status = "covered";
          covered++;
        } else if (score >= PARTIAL_THRESHOLD) {
          status = "partial";
          partial++;
        } else {
          status = "missing";
          missing++;
        }
        matches.push({
          topic: t,
          domainName: d.name,
          sectionTitle: s.title,
          bestScore: score,
          bestMatch: match,
          status,
        });
      }
    }
  }

  return {
    total: matches.length,
    covered,
    partial,
    missing,
    matches,
    coveredTopics: matches.filter((m) => m.status === "covered"),
    partialTopics: matches.filter((m) => m.status === "partial"),
    missingTopics: matches.filter((m) => m.status === "missing"),
  };
}
