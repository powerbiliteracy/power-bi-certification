export interface DoOrDont {
  text: string;
  reason: string;
}

export interface SubTopic {
  id: string;
  title: string;
  bullets: string[];
  dos: DoOrDont[];
  donts: DoOrDont[];
}

export interface DosDontsDomain {
  id: string;
  title: string;
  weight: string;
  subtopics: SubTopic[];
}

export const DOS_DONTS_DOMAINS: DosDontsDomain[] = [
  {
    id: "d1", title: "Prepare the Data", weight: "25–30%",
    subtopics: [
      {
        id: "1.1", title: "Get or Connect to Data",
        bullets: ["Connect to data sources / shared semantic models", "Change data source settings, credentials, privacy levels", "Choose between DirectLake, DirectQuery, Import", "Create and modify parameters"],
        dos: [
          { text: "Connect to a shared semantic model when one already exists for your data domain.", reason: "Reusing a governed model eliminates redundant data prep and ensures metric consistency." },
          { text: "Choose Import mode for datasets queried frequently that fit within capacity limits.", reason: "Import loads data into VertiPaq's in-memory engine for fastest query response." },
          { text: "Use DirectQuery when data must always reflect the latest source state.", reason: "DirectQuery sends live queries so reports always show current data." },
          { text: "Set data source privacy levels correctly for every source.", reason: "Correct settings prevent Formula Firewall errors and data leakage." },
          { text: "Use parameters for all environment-specific values.", reason: "Parameters centralise values that vary between environments, eliminating manual find-and-replace." },
        ],
        donts: [
          { text: "Don't rebuild a semantic model when a shared, governed model already covers your data.", reason: "Duplicate models create metric inconsistency and double maintenance burden." },
          { text: "Don't use DirectQuery against slow, underpowered source systems.", reason: "Every visual interaction fires a live query, causing timeouts on overloaded sources." },
          { text: "Don't hard-code server names, file paths, or credentials in query steps.", reason: "Hard-coded values break on deployment and require manual updates across all queries." },
          { text: "Don't leave credentials unconfigured after publishing to the Service.", reason: "Unconfigured credentials cause every scheduled refresh to fail silently." },
        ],
      },
      {
        id: "1.2", title: "Profile and Clean the Data",
        bullets: ["Evaluate data statistics and column properties", "Resolve inconsistencies, nulls, and data quality issues", "Resolve data import errors"],
        dos: [
          { text: "Enable Column Distribution, Quality, and Profile before committing to a load strategy.", reason: "Profiling reveals null percentages, distinct values, and errors before they enter the model." },
          { text: "Replace or remove null values in key columns before establishing relationships.", reason: "Nulls in foreign keys produce blank rows that corrupt aggregations." },
          { text: "Standardise text inconsistencies using Trim, Clean, and Replace steps.", reason: "Inconsistent strings produce duplicate dimension members." },
          { text: "Investigate the root cause of import errors (type, formula, credentials) before removing them.", reason: "Each error class has a distinct fix; blind removal hides upstream data quality issues." },
          { text: "Set the profile sample to the entire dataset for production-quality analysis.", reason: "The default 1,000-row sample can miss rare but critical data quality issues." },
        ],
        donts: [
          { text: "Don't skip data profiling and assume source data is clean.", reason: "Unvalidated data silently corrupts the model with duplicate keys and unexpected nulls." },
          { text: "Don't ignore data import errors — don't simply 'Remove Errors' without understanding root cause.", reason: "Blindly removing error rows deletes real data." },
          { text: "Don't resolve data quality issues in DAX instead of Power Query.", reason: "DAX calculated columns are evaluated at every refresh and stored in memory — wasteful for cleaning." },
        ],
      },
      {
        id: "1.3", title: "Transform and Load the Data",
        bullets: ["Select column data types", "Create and transform columns", "Pivot, unpivot, transpose", "Merge and append queries", "Configure data loading"],
        dos: [
          { text: "Assign correct data types to every column before closing Power Query.", reason: "Correct types are the foundation for SUM, time intelligence, and VertiPaq compression." },
          { text: "Use Group By to pre-aggregate when visuals never need row-level granularity.", reason: "Aggregating in Power Query reduces rows entering the model, shrinking size proportionally." },
          { text: "Unpivot columns to convert wide, pivoted source data into normalised format.", reason: "Pivoted tables cannot be filtered or aggregated correctly in Power BI." },
          { text: "Use Reference queries to create branch queries sharing a common transformation chain.", reason: "One change to base query propagates to all references automatically." },
          { text: "Disable 'Enable Load' for staging queries.", reason: "Staging queries loaded unnecessarily inflate model size and confuse report builders." },
        ],
        donts: [
          { text: "Don't leave columns typed as 'Any' or 'Text' when data is numeric or date.", reason: "Wrong types block aggregations and time intelligence functions silently." },
          { text: "Don't use Duplicate queries when you need a shared transformation base.", reason: "Duplicates are independent — bug fixes must be applied to every copy separately." },
          { text: "Don't use Merge to replicate joins that belong as model relationships.", reason: "Merging materialises the full joined result, increasing model size by orders of magnitude." },
        ],
      },
    ],
  },
  {
    id: "d2", title: "Model the Data", weight: "25–30%",
    subtopics: [
      {
        id: "2.1", title: "Design and Implement a Data Model",
        bullets: ["Star schema design", "Relationships and cardinality", "Date tables", "Role-playing dimensions"],
        dos: [
          { text: "Build a star schema: one central fact table related to multiple dimension tables.", reason: "Star schema produces fewest relationship hops and most predictable filter propagation." },
          { text: "Create a dedicated, contiguous date table and mark it as Date Table.", reason: "Time intelligence functions require a complete, gap-free date spine." },
          { text: "Implement role-playing dimensions using inactive relationships + USERELATIONSHIP.", reason: "Avoids duplicating dimension tables for each date role." },
          { text: "Set relationship cardinality correctly: many-to-one from fact to dimension.", reason: "Correct cardinality ensures optimised joins and predictable aggregation." },
        ],
        donts: [
          { text: "Don't create snowflake schemas with chains of dimension-to-dimension relationships.", reason: "Multi-hop filter chains create ambiguity and slow performance." },
          { text: "Don't enable bidirectional cross-filtering by default.", reason: "Bidirectional filtering introduces ambiguity and performance issues." },
          { text: "Don't rely on auto-detected date hierarchies instead of a proper date table.", reason: "Auto dates lack fiscal year support and create hidden tables." },
        ],
      },
      {
        id: "2.2", title: "Create Model Calculations Using DAX",
        bullets: ["CALCULATE and filter context", "Time intelligence", "Iterators", "VAR/RETURN"],
        dos: [
          { text: "Use measures for all dynamic aggregations — avoid calculated columns for aggregations.", reason: "Measures compute at query time without consuming model storage." },
          { text: "Use VAR/RETURN pattern for any measure beyond 2 lines.", reason: "Variables improve readability, performance, and prevent context transition errors." },
          { text: "Always use DIVIDE() instead of the / operator.", reason: "DIVIDE safely handles division by zero, returning BLANK() instead of an error." },
          { text: "Use ALL() inside CALCULATE for % of total calculations.", reason: "ALL removes filters to create the grand total denominator." },
        ],
        donts: [
          { text: "Don't nest more than 2 levels of IF — use SWITCH(TRUE()) instead.", reason: "Nested IFs are unreadable and error-prone. SWITCH is cleaner for range-based logic." },
          { text: "Don't use FILTER() when a simple column filter in CALCULATE works.", reason: "FILTER iterates row-by-row, which is slow on large tables." },
          { text: "Don't forget to wrap time intelligence functions in CALCULATE.", reason: "DATESYTD, SAMEPERIODLASTYEAR etc. return tables — they must be used as CALCULATE filters." },
        ],
      },
      {
        id: "2.3", title: "Optimize Model Performance",
        bullets: ["Performance Analyzer", "Model size reduction", "Query optimisation"],
        dos: [
          { text: "Remove unused columns and rows in Power Query before loading.", reason: "Every column consumes memory in VertiPaq. Fewer columns = faster queries." },
          { text: "Use integer keys instead of text for relationships.", reason: "Integer comparisons are faster and compress better." },
          { text: "Use Performance Analyzer to diagnose slow visuals.", reason: "Shows exact DAX query time vs visual rendering time per visual." },
        ],
        donts: [
          { text: "Don't store calculated columns that duplicate what measures can compute.", reason: "Calculated columns consume persistent storage for every row." },
          { text: "Don't ignore high-cardinality columns in dimension tables.", reason: "High cardinality increases model size and slows filter operations." },
        ],
      },
    ],
  },
  {
    id: "d3", title: "Visualize & Analyze", weight: "25–30%",
    subtopics: [
      {
        id: "3.1", title: "Create Reports",
        bullets: ["Visual selection", "Conditional formatting", "Slicers and filters", "Drill-through"],
        dos: [
          { text: "Choose the right visual type for the analytical question.", reason: "Line for trends, bar for comparison, scatter for correlation, donut for composition." },
          { text: "Use conditional formatting to highlight important patterns.", reason: "Visual encoding helps users spot outliers and patterns instantly." },
          { text: "Configure drill-through pages for detailed analysis.", reason: "Drill-through passes context to detail pages without cluttering the main view." },
        ],
        donts: [
          { text: "Don't put more than 6-8 visuals on a single page.", reason: "Too many visuals slow rendering and overwhelm users." },
          { text: "Don't use pie charts for more than 5-6 categories.", reason: "Many slices become unreadable. Use bar charts for many categories." },
          { text: "Don't mix analytical and operational reports on the same page.", reason: "Different audiences need different levels of detail and interaction." },
        ],
      },
      {
        id: "3.2", title: "Enhance Reports for Usability and Storytelling",
        bullets: ["Bookmarks", "Custom tooltips", "Visual interactions", "Navigation", "Sorting", "Sync slicers", "Selection pane", "Drillthrough", "Export settings", "Mobile design", "Personalization", "Accessibility", "Automatic page refresh"],
        dos: [
          { text: "Add alt text to every visual for screen reader accessibility.", reason: "Required for inclusive design and compliance." },
          { text: "Use bookmarks for guided storytelling and navigation.", reason: "Bookmarks let you walk users through analytical insights step by step." },
          { text: "Set tab order via the Selection pane for keyboard navigation.", reason: "Users who rely on keyboard navigation need logical tab order." },
          { text: "Use the Page navigator visual instead of hand-built button menus.", reason: "Page navigators auto-update when you add or rename pages — no manual maintenance." },
          { text: "Configure drillthrough pages with explicit drillthrough fields and a Back button.", reason: "Passes context cleanly from summary to detail without cluttering the main page." },
          { text: "Enable personalized visuals so consumers can tweak charts without breaking the source.", reason: "Personalisations save per-user as bookmarks and don't affect the published report." },
          { text: "Use Sort By Column for any text field that has a natural order (months, weekdays, custom buckets).", reason: "Without it, sort defaults to alphabetical (April, August, December…) which misleads readers." },
          { text: "Configure automatic page refresh with change detection for real-time DirectQuery dashboards.", reason: "Change detection only refreshes when a measure value actually changes, reducing source load." },
        ],
        donts: [
          { text: "Don't rely solely on colour to convey information.", reason: "Colour-blind users may miss the signal. Use labels, icons, or patterns as well." },
          { text: "Don't create tooltips with complex visuals that slow rendering.", reason: "Tooltips must render instantly on hover. Complex content causes lag." },
          { text: "Don't allow exports of underlying data when reports contain sensitive content.", reason: "Underlying-data export bypasses report-level filters and reveals the full model." },
          { text: "Don't enable automatic page refresh on Import models.", reason: "Auto refresh only re-queries the source — Import models are static between scheduled refreshes, so it does nothing useful." },
        ],
      },
      {
        id: "3.3", title: "Identify Patterns and Trends",
        bullets: ["Analyze feature", "Grouping / binning / clustering", "AI visuals", "Reference lines / forecasting", "Outliers and anomalies", "Copilot summarize model"],
        dos: [
          { text: "Right-click a data point → Analyze → Explain the increase/decrease for instant root cause.", reason: "The Analyze feature surfaces statistically significant drivers without writing any DAX." },
          { text: "Use Key Influencers when you need to know which fields drive a metric.", reason: "Key Influencers runs ML behind the scenes to rank factor importance." },
          { text: "Use Copilot to summarise the underlying semantic model when onboarding new analysts.", reason: "Generates a plain-English overview of tables, relationships, and key measures." },
          { text: "Use forecasting on line charts with a dedicated date axis for projections.", reason: "Forecasting needs a continuous time series; categorical x-axes won't produce a forecast." },
        ],
        donts: [
          { text: "Don't apply anomaly detection on metrics with naturally spiky behaviour (campaigns, releases).", reason: "Anomaly detection flags every spike as anomalous, drowning real outliers in noise." },
          { text: "Don't use clustering on tiny datasets (<50 rows).", reason: "Clustering needs enough data for meaningful segments; small samples produce unstable groups." },
        ],
      },
    ],
  },
  {
    id: "d4", title: "Deploy & Maintain", weight: "15–20%",
    subtopics: [
      {
        id: "4.1", title: "Manage Workspaces and Assets",
        bullets: ["Workspaces", "Apps", "Publish/import items", "Dashboards", "Distribution method", "Subscriptions & alerts", "Endorsement", "Gateways", "Scheduled refresh"],
        dos: [
          { text: "Assign minimum necessary workspace roles to each user.", reason: "Least privilege prevents accidental content deletion or modification." },
          { text: "Publish workspace apps with audiences for end-user consumption.", reason: "Apps provide a curated, read-only experience and audiences let you tailor content per group." },
          { text: "Choose the distribution method that matches the audience: app for end users, sharing for ad-hoc, Teams for collaboration.", reason: "Each method has different governance, refresh, and licensing implications." },
          { text: "Use deployment pipelines for ALM (Dev → Test → Production).", reason: "Automated promotion reduces human error and ensures testing before production." },
          { text: "Pin tiles from multiple reports into a dashboard for executive monitoring.", reason: "Dashboards aggregate KPIs from many reports into one at-a-glance view." },
          { text: "Configure data alerts on dashboard tiles for KPI threshold notifications.", reason: "Alerts proactively notify owners when metrics breach thresholds." },
          { text: "Certify the small set of trusted, governed semantic models — promote everything else lighter-touch.", reason: "Certification requires admin approval and signals enterprise-grade quality." },
          { text: "Use a gateway for any on-premises or VNet-bound source.", reason: "Without a gateway, scheduled refresh against on-prem data fails immediately." },
        ],
        donts: [
          { text: "Don't give Contributor or Member roles to report consumers.", reason: "Consumers should be Viewers. Higher roles allow content modification." },
          { text: "Don't use 'Publish to Web' for anything containing sensitive data.", reason: "Publish to Web creates a public URL with no authentication whatsoever." },
          { text: "Don't share workspace access when the user only needs one report.", reason: "Use item-level sharing to expose just the one item without granting workspace-wide access." },
          { text: "Don't schedule refresh more frequently than the source actually changes.", reason: "Wasted refreshes consume capacity and can cause throttling on the source system." },
        ],
      },
      {
        id: "4.2", title: "Secure and Govern Power BI Items",
        bullets: ["Workspace roles", "Item-level access", "Semantic model access", "RLS roles", "RLS group membership", "Sensitivity labels"],
        dos: [
          { text: "Implement dynamic RLS using USERPRINCIPALNAME() for per-user data filtering.", reason: "Dynamic RLS scales automatically as users are added — no role-per-user maintenance." },
          { text: "Assign Microsoft Entra security groups (not individual users) to RLS roles.", reason: "Group membership scales — HR adds a user to the group and access updates automatically." },
          { text: "Use item-level access to share a single report without exposing the whole workspace.", reason: "Item-level sharing keeps blast radius small and avoids Viewer role sprawl." },
          { text: "Grant Build permission on a semantic model only to analysts who need to create new reports off it.", reason: "Build allows new reports/composite models on top — Read alone is enough for consumers." },
          { text: "Apply sensitivity labels to classify content; they persist on exports.", reason: "Labels enforce data protection beyond Power BI — exported files inherit the label." },
          { text: "Test RLS thoroughly using 'View as Role' in Desktop before publishing.", reason: "RLS errors are invisible to admins who bypass security. Always test as a specific user." },
        ],
        donts: [
          { text: "Don't rely on hiding pages or visuals as a security mechanism.", reason: "Hidden content is still accessible via the API and can be discovered." },
          { text: "Don't forget to assign users to RLS roles after publishing.", reason: "Roles defined in Desktop do nothing until users are assigned in Service." },
          { text: "Don't grant Reshare permission unless absolutely necessary.", reason: "Reshare lets a user pass access to anyone — quickly fragments your governance model." },
        ],
      },
    ],
  },
];
