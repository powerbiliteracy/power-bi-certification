export interface InteractiveLesson {
  slug: string;
  title: string;
  description: string;
  domain: string;
  file: string;
  accent: string;
}

export const interactiveLessons: InteractiveLesson[] = [
  {
    slug: "reduce-granularity",
    title: "Improve Performance by Reducing Granularity",
    description: "Learn how summarising fact tables and trimming unused columns boosts model performance.",
    domain: "Model the data",
    file: "/lessons/pl300-reduce-granularity.html",
    accent: "from-purple-500/20 to-fuchsia-500/10 border-purple-400/30",
  },
  {
    slug: "copilot-suggest-content",
    title: "Use Copilot to Suggest Content for a New Report Page",
    description: "Use Copilot prompts to generate visuals, layouts, and narratives for a new report page.",
    domain: "Visualize and analyze",
    file: "/lessons/pl300-copilot-suggest-content.html",
    accent: "from-violet-500/20 to-purple-500/10 border-violet-400/30",
  },
  {
    slug: "copilot-report-page",
    title: "Use Copilot to Create a New Report Page",
    description: "Step-by-step workflow for spinning up an entire report page with Copilot in Power BI.",
    domain: "Visualize and analyze",
    file: "/lessons/pl300-copilot-report-page.html",
    accent: "from-emerald-500/20 to-green-500/10 border-emerald-400/30",
  },
  {
    slug: "dynamic-rls",
    title: "Configure Dynamic Row-Level Security",
    description: "Build dynamic RLS using USERPRINCIPALNAME() and a security mapping table.",
    domain: "Deploy and maintain",
    file: "/lessons/pl300-dynamic-rls.html",
    accent: "from-orange-500/20 to-red-500/10 border-orange-400/30",
  },
  {
    slug: "rls-groups",
    title: "Configure Row-Level Security Group Membership",
    description: "Map Microsoft Entra security groups to RLS roles in the Power BI service.",
    domain: "Deploy and maintain",
    file: "/lessons/pl300-rls-groups.html",
    accent: "from-amber-500/20 to-yellow-500/10 border-amber-400/30",
  },
  {
    slug: "semantic-model-access",
    title: "Configure Access to Semantic Models",
    description: "Manage Build, Read, and Reshare permissions on semantic models across workspaces.",
    domain: "Deploy and maintain",
    file: "/lessons/pl300-semantic-model-access.html",
    accent: "from-pink-500/20 to-rose-500/10 border-pink-400/30",
  },
  {
    slug: "gateway",
    title: "Identify When a Gateway Is Required",
    description: "Decide between on-premises data gateway, VNet gateway, or no gateway at all.",
    domain: "Deploy and maintain",
    file: "/lessons/pl300-gateway.html",
    accent: "from-red-500/20 to-rose-500/10 border-red-400/30",
  },
  {
    slug: "personalized-visuals",
    title: "Enable Personalized Visuals in a Report",
    description: "Let consumers explore data by personalising visuals without changing the source report.",
    domain: "Visualize and analyze",
    file: "/lessons/pl300-personalized-visuals.html",
    accent: "from-pink-500/20 to-fuchsia-500/10 border-pink-400/30",
  },
  {
    slug: "mobile-design",
    title: "Design Reports for Mobile Devices",
    description: "Build a portrait mobile layout that highlights the most important visuals on small screens.",
    domain: "Visualize and analyze",
    file: "/lessons/pl300-mobile-design.html",
    accent: "from-cyan-500/20 to-sky-500/10 border-cyan-400/30",
  },
  {
    slug: "drill-through",
    title: "Configure Drill Through Navigation",
    description: "Set up drill-through pages with filters that pass context from summary to detail.",
    domain: "Visualize and analyze",
    file: "/lessons/pl300-drill-through.html",
    accent: "from-orange-500/20 to-amber-500/10 border-orange-400/30",
  },
];
