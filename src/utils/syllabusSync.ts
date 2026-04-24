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
    .map((l) => l.replace(/\u00a0/g, " ").trim())
    .filter((l) => l.length > 0);

  const domains: ParsedDomain[] = [];
  let currentDomain: ParsedDomain | null = null;
  let currentSection: ParsedSection | null = null;
  const seenDomainNames = new Set<string>();

  // Domain heading: "Prepare the data (25–30%)" or "Manage and secure Power BI (15-20%)"
  const domainRegex =
    /^([A-Z][A-Za-z0-9 ,&'/\-]+?)\s*\(\s*(\d{1,2}\s*[\-–]\s*\d{1,2}\s*%|\d{1,2}\s*%)\s*\)\s*$/;
  // Bullet: "- foo", "* foo", "• foo", "1. foo"
  const bulletRegex = /^([-*•·–▪◦]|\d+\.)\s+(.*)$/;
  // Lines to ignore entirely (preamble / meta)
  const ignoreLine = (l: string): boolean =>
    /^(skills measured|skills at a glance|audience profile|study resources|exam objectives?|as a candidate|as a power bi|provide meaningful|enable others|you should be|you collaborate|prepare the data$|model the data$|visualize and analyze data$|manage and secure power bi$)/i.test(
      l,
    );

  // Heuristic: a line is a "section heading" if it's short, lowercase-ish (not all caps),
  // doesn't end in punctuation, and looks like a topic group ("Get or connect to data").
  // Section headings in the MS syllabus are always ≤60 chars and start with a capital verb.
  const looksLikeSection = (l: string): boolean => {
    if (l.length > 70) return false;
    if (/[.!?:;]$/.test(l)) return false;
    if (bulletRegex.test(l)) return false;
    // Section headings rarely contain commas (topics often do)
    if (l.includes(",")) return false;
    // Must start with a capital letter and contain at least one space
    if (!/^[A-Z]/.test(l)) return false;
    if (!l.includes(" ")) return false;
    return true;
  };

  for (const line of lines) {
    const domainMatch = line.match(domainRegex);
    if (domainMatch) {
      const name = domainMatch[1].trim();
      // Skip duplicate domain headers (e.g. "Skills at a glance" lists them all upfront)
      if (seenDomainNames.has(name.toLowerCase())) {
        currentDomain = domains.find((d) => d.name.toLowerCase() === name.toLowerCase()) || null;
        currentSection = null;
        continue;
      }
      seenDomainNames.add(name.toLowerCase());
      currentDomain = { name, weight: domainMatch[2].trim(), sections: [] };
      currentSection = null;
      domains.push(currentDomain);
      continue;
    }

    if (!currentDomain) continue;
    if (ignoreLine(line)) continue;

    const bulletMatch = line.match(bulletRegex);
    const topicText = bulletMatch ? bulletMatch[2].trim() : line;

    // Section headings (only when not bulleted)
    if (!bulletMatch && looksLikeSection(line)) {
      currentSection = { title: line, topics: [] };
      currentDomain.sections.push(currentSection);
      continue;
    }

    // Otherwise treat as a topic
    if (!currentSection) {
      currentSection = { title: "(uncategorized)", topics: [] };
      currentDomain.sections.push(currentSection);
    }
    currentSection.topics.push({ raw: topicText, normalized: normalize(topicText) });
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
