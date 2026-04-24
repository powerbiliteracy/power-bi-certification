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
        bullets: ["Select column data types", "Create and transform columns", "Group and aggregate rows", "Pivot, unpivot, and transpose", "Convert semi-structured data to a table", "Create fact and dimension tables", "Reference vs duplicate queries", "Merge and append queries", "Identify and create relationship keys", "Configure data loading"],
        dos: [
          { text: "Assign correct data types to every column before closing Power Query.", reason: "Correct types are the foundation for SUM, time intelligence, and VertiPaq compression." },
          { text: "Use Group By to pre-aggregate when visuals never need row-level granularity.", reason: "Aggregating in Power Query reduces rows entering the model, shrinking size proportionally." },
          { text: "Unpivot columns to convert wide, pivoted source data into normalised format.", reason: "Pivoted tables cannot be filtered or aggregated correctly in Power BI." },
          { text: "Use Reference queries to create branch queries sharing a common transformation chain.", reason: "One change to base query propagates to all references automatically." },
          { text: "Disable 'Enable Load' for staging queries.", reason: "Staging queries loaded unnecessarily inflate model size and confuse report builders." },
          { text: "Convert semi-structured JSON/XML to a table using Json.Document then Convert to Table and Expand.", reason: "Power BI visuals require tabular data — nested records and lists must be expanded before modelling." },
          { text: "Design a star schema with separate fact and dimension tables loaded from cleansed staging queries.", reason: "Star schemas perform faster, are easier to maintain, and produce predictable filter propagation." },
          { text: "Create surrogate integer keys (Index Column) for dimension tables when business keys are wide text.", reason: "Integer keys compress better in VertiPaq and produce faster relationship joins." },
          { text: "Use Append for stacking similar-shape tables (e.g. monthly files), and Merge only for genuine lookups not handled by relationships.", reason: "Append preserves grain; Merge materialises a join into the model and bloats size." },
        ],
        donts: [
          { text: "Don't leave columns typed as 'Any' or 'Text' when data is numeric or date.", reason: "Wrong types block aggregations and time intelligence functions silently." },
          { text: "Don't use Duplicate queries when you need a shared transformation base.", reason: "Duplicates are independent — bug fixes must be applied to every copy separately." },
          { text: "Don't use Merge to replicate joins that belong as model relationships.", reason: "Merging materialises the full joined result, increasing model size by orders of magnitude." },
          { text: "Don't use text or GUID columns as relationship keys when an integer surrogate is possible.", reason: "Wide text keys hurt compression and slow query performance noticeably on large fact tables." },
          { text: "Don't load semi-structured columns (Record/List) into the model without expanding them first.", reason: "Unexpanded structural columns can't be visualised and waste model memory." },
        ],
      },
    ],
  },
  {
    id: "d2", title: "Model the Data", weight: "25–30%",
    subtopics: [
      {
        id: "2.1", title: "Design and Implement a Data Model",
        bullets: ["Configure table and column properties", "Implement role-playing dimensions", "Define cardinality and cross-filter direction", "Create a common date table", "Identify use cases for calculated columns and tables"],
        dos: [
          { text: "Build a star schema: one central fact table related to multiple dimension tables.", reason: "Star schema produces fewest relationship hops and most predictable filter propagation." },
          { text: "Create a dedicated, contiguous date table and mark it as Date Table.", reason: "Time intelligence functions require a complete, gap-free date spine." },
          { text: "Implement role-playing dimensions using inactive relationships + USERELATIONSHIP.", reason: "Avoids duplicating dimension tables for each date role." },
          { text: "Set relationship cardinality correctly: many-to-one from fact to dimension.", reason: "Correct cardinality ensures optimised joins and predictable aggregation." },
          { text: "Configure column properties (Data Category, Summarize By, Sort By Column) for every dimension column.", reason: "These properties drive smarter visuals (geo categories, default sort) and prevent meaningless auto-sums on IDs." },
          { text: "Use a calculated table for static lookups (date table, parameter table) when the source can't provide one.", reason: "Calculated tables are computed once at refresh and behave like normal tables for relationships." },
        ],
        donts: [
          { text: "Don't create snowflake schemas with chains of dimension-to-dimension relationships.", reason: "Multi-hop filter chains create ambiguity and slow performance." },
          { text: "Don't enable bidirectional cross-filtering by default.", reason: "Bidirectional filtering introduces ambiguity and performance issues." },
          { text: "Don't rely on auto-detected date hierarchies instead of a proper date table.", reason: "Auto dates lack fiscal year support and create hidden tables." },
          { text: "Don't leave Summarize By set to 'Sum' on numeric ID/key columns.", reason: "Visuals will silently sum IDs producing nonsense totals — set Summarize By to 'Don't summarize'." },
        ],
      },
      {
        id: "2.2", title: "Create Model Calculations Using DAX",
        bullets: ["Single aggregation measures", "CALCULATE function", "Time intelligence", "Statistical functions", "Semi-additive measures", "Quick measures", "Calculated tables and columns", "Calculation groups"],
        dos: [
          { text: "Use measures for all dynamic aggregations — avoid calculated columns for aggregations.", reason: "Measures compute at query time without consuming model storage." },
          { text: "Use VAR/RETURN pattern for any measure beyond 2 lines.", reason: "Variables improve readability, performance, and prevent context transition errors." },
          { text: "Always use DIVIDE() instead of the / operator.", reason: "DIVIDE safely handles division by zero, returning BLANK() instead of an error." },
          { text: "Use ALL() inside CALCULATE for % of total calculations.", reason: "ALL removes filters to create the grand total denominator." },
          { text: "Use LASTNONBLANK or LASTDATE for semi-additive measures like inventory or account balances.", reason: "These metrics shouldn't be summed across time — they take the period-end value." },
          { text: "Start with Quick Measures when you're new to a DAX pattern, then read the generated code to learn it.", reason: "Quick measures produce optimised, idiomatic DAX you can copy and adapt." },
          { text: "Use calculation groups to apply time-intelligence calculations (YTD, MTD, PY) across all measures without duplication.", reason: "One calculation item replaces dozens of repetitive measures and keeps formatting consistent." },
          { text: "Use statistical functions (MEDIAN, PERCENTILE.INC, STDEV.P) for distribution analysis instead of just averages.", reason: "Averages hide skew — medians and percentiles describe real-world data more honestly." },
        ],
        donts: [
          { text: "Don't nest more than 2 levels of IF — use SWITCH(TRUE()) instead.", reason: "Nested IFs are unreadable and error-prone. SWITCH is cleaner for range-based logic." },
          { text: "Don't use FILTER() when a simple column filter in CALCULATE works.", reason: "FILTER iterates row-by-row, which is slow on large tables." },
          { text: "Don't forget to wrap time intelligence functions in CALCULATE.", reason: "DATESYTD, SAMEPERIODLASTYEAR etc. return tables — they must be used as CALCULATE filters." },
          { text: "Don't sum semi-additive metrics like Inventory On Hand across the time dimension.", reason: "Adding daily balances produces meaningless inflated totals — use LASTDATE pattern instead." },
          { text: "Don't recreate quick measures by hand without understanding what they generate.", reason: "Generated DAX uses subtle patterns (KEEPFILTERS, variables) that hand-written versions often miss." },
        ],
      },
      {
        id: "2.3", title: "Optimize Model Performance",
        bullets: ["Remove unnecessary rows and columns", "Identify poor performers with Performance Analyzer and DAX query view", "Reduce granularity"],
        dos: [
          { text: "Remove unused columns and rows in Power Query before loading.", reason: "Every column consumes memory in VertiPaq. Fewer columns = faster queries." },
          { text: "Use integer keys instead of text for relationships.", reason: "Integer comparisons are faster and compress better." },
          { text: "Use Performance Analyzer to diagnose slow visuals.", reason: "Shows exact DAX query time vs visual rendering time per visual." },
          { text: "Use the DAX query view to test and tune individual measures with EVALUATE before adding them to visuals.", reason: "Lets you see exact result and timing without rendering a visual — much faster iteration." },
          { text: "Reduce granularity by pre-aggregating fact tables when row-level detail isn't needed for visuals.", reason: "A daily-grain fact is much smaller than a transaction-grain fact and queries far faster." },
        ],
        donts: [
          { text: "Don't store calculated columns that duplicate what measures can compute.", reason: "Calculated columns consume persistent storage for every row." },
          { text: "Don't ignore high-cardinality columns in dimension tables.", reason: "High cardinality increases model size and slows filter operations." },
          { text: "Don't keep transaction-level granularity when reports only ever show daily or monthly aggregates.", reason: "Wasted storage and slower queries for detail nobody uses." },
        ],
      },
    ],
  },
  {
    id: "d3", title: "Visualize & Analyze", weight: "25–30%",
    subtopics: [
      {
        id: "3.1", title: "Create Reports",
        bullets: ["Select an appropriate visual", "Format and configure visuals", "Create a narrative visual with Copilot", "Apply and customize a theme", "Apply conditional formatting", "Apply slicing and filtering", "Use Copilot to create / suggest a report page", "Configure the report page", "Choose when to use a paginated report", "Create visual calculations using DAX"],
        dos: [
          { text: "Choose the right visual type for the analytical question.", reason: "Line for trends, bar for comparison, scatter for correlation, donut for composition." },
          { text: "Use conditional formatting to highlight important patterns.", reason: "Visual encoding helps users spot outliers and patterns instantly." },
          { text: "Configure drill-through pages for detailed analysis.", reason: "Drill-through passes context to detail pages without cluttering the main view." },
          { text: "Apply a custom theme JSON to enforce corporate colours, fonts, and visual defaults across every page.", reason: "Themes guarantee consistency and remove per-visual styling work — change once, apply everywhere." },
          { text: "Use the Narrative visual with Copilot to generate auto-updating summaries of key metrics.", reason: "Copilot writes a plain-English narrative that refreshes with the data — great for executive pages." },
          { text: "Use Copilot to create or suggest content for a new report page when you're starting from scratch.", reason: "Copilot proposes layout and visuals based on your model, accelerating draft creation." },
          { text: "Configure page size, page type (Tooltip / Drillthrough), and canvas background under Page configuration.", reason: "Correct page setup is required for tooltip/drillthrough pages to function and for mobile rendering." },
          { text: "Choose paginated reports for pixel-perfect, print-ready output (invoices, statements, regulatory filings).", reason: "Power BI reports are interactive but not print-optimised; paginated reports are designed for fixed layouts." },
          { text: "Use visual calculations (DAX directly on a visual) for running totals, % of parent, and moving averages.", reason: "Visual calculations work on the visual's result, avoiding model bloat from extra measures." },
        ],
        donts: [
          { text: "Don't put more than 6-8 visuals on a single page.", reason: "Too many visuals slow rendering and overwhelm users." },
          { text: "Don't use pie charts for more than 5-6 categories.", reason: "Many slices become unreadable. Use bar charts for many categories." },
          { text: "Don't mix analytical and operational reports on the same page.", reason: "Different audiences need different levels of detail and interaction." },
          { text: "Don't use a paginated report for interactive exploration — it's read-only and cannot drill or cross-filter.", reason: "Wrong tool: paginated is for print/export; standard reports are for exploration." },
          { text: "Don't blindly accept Copilot-generated narratives or pages without validating the metrics it picked.", reason: "Copilot can choose misleading aggregations or visuals if the model lacks clear measure descriptions." },
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
        id: "4.1", title: "Create and Manage Workspaces and Assets",
        bullets: ["Create and configure a workspace", "Configure and update an app", "Publish, import, or update items", "Create dashboards", "Choose a distribution method", "Configure subscriptions and data alerts", "Promote or certify content", "Identify when a gateway is required", "Configure semantic model scheduled refresh"],
        dos: [
          { text: "Assign minimum necessary workspace roles to each user.", reason: "Least privilege prevents accidental content deletion or modification." },
          { text: "Publish workspace apps with audiences for end-user consumption.", reason: "Apps provide a curated, read-only experience and audiences let you tailor content per group." },
          { text: "Re-publish (Update) the app every time you change content in the workspace, so consumers see the new version.", reason: "Workspace edits are not visible to app users until you click Update app." },
          { text: "Choose the distribution method that matches the audience: app for end users, sharing for ad-hoc, Teams for collaboration.", reason: "Each method has different governance, refresh, and licensing implications." },
          { text: "Use deployment pipelines for ALM (Dev → Test → Production).", reason: "Automated promotion reduces human error and ensures testing before production." },
          { text: "Pin tiles from multiple reports into a dashboard for executive monitoring.", reason: "Dashboards aggregate KPIs from many reports into one at-a-glance view." },
          { text: "Configure data alerts on dashboard tiles for KPI threshold notifications.", reason: "Alerts proactively notify owners when metrics breach thresholds." },
          { text: "Configure subscriptions so stakeholders receive scheduled email snapshots of key reports.", reason: "Subscriptions push insight to consumers without requiring them to log in." },
          { text: "Certify the small set of trusted, governed semantic models — promote everything else lighter-touch.", reason: "Certification requires admin approval and signals enterprise-grade quality." },
          { text: "Use a gateway for any on-premises or VNet-bound source.", reason: "Without a gateway, scheduled refresh against on-prem data fails immediately." },
          { text: "Match scheduled refresh frequency to source change rate and capacity limits (max 8/day Pro, 48/day Premium).", reason: "Aligning refresh cadence to data velocity avoids wasted refreshes and throttling." },
        ],
        donts: [
          { text: "Don't give Contributor or Member roles to report consumers.", reason: "Consumers should be Viewers. Higher roles allow content modification." },
          { text: "Don't use 'Publish to Web' for anything containing sensitive data.", reason: "Publish to Web creates a public URL with no authentication whatsoever." },
          { text: "Don't share workspace access when the user only needs one report.", reason: "Use item-level sharing to expose just the one item without granting workspace-wide access." },
          { text: "Don't schedule refresh more frequently than the source actually changes.", reason: "Wasted refreshes consume capacity and can cause throttling on the source system." },
          { text: "Don't forget to update the app after workspace changes — consumers will keep seeing the old version.", reason: "App content is a snapshot; without Update app, no changes reach end users." },
        ],
      },
      {
        id: "4.2", title: "Secure and Govern Power BI Items",
        bullets: ["Assign workspace roles", "Configure item-level access", "Configure access to semantic models", "Implement row-level security roles", "Configure RLS group membership", "Apply sensitivity labels"],
        dos: [
          { text: "Implement dynamic RLS using USERPRINCIPALNAME() for per-user data filtering.", reason: "Dynamic RLS scales automatically as users are added — no role-per-user maintenance." },
          { text: "Assign Microsoft Entra security groups (not individual users) to RLS roles.", reason: "Group membership scales — HR adds a user to the group and access updates automatically." },
          { text: "Use item-level access to share a single report without exposing the whole workspace.", reason: "Item-level sharing keeps blast radius small and avoids Viewer role sprawl." },
          { text: "Grant Build permission on a semantic model only to analysts who need to create new reports off it.", reason: "Build allows new reports/composite models on top — Read alone is enough for consumers." },
          { text: "Apply sensitivity labels to classify content; they persist on exports.", reason: "Labels enforce data protection beyond Power BI — exported files inherit the label." },
          { text: "Test RLS thoroughly using 'View as Role' in Desktop before publishing.", reason: "RLS errors are invisible to admins who bypass security. Always test as a specific user." },
          { text: "Assign workspace roles (Admin, Member, Contributor, Viewer) deliberately based on the smallest set of permissions each user needs.", reason: "The four roles map to specific capabilities — picking the wrong one either over-grants access or blocks legitimate work." },
        ],
        donts: [
          { text: "Don't rely on hiding pages or visuals as a security mechanism.", reason: "Hidden content is still accessible via the API and can be discovered." },
          { text: "Don't forget to assign users to RLS roles after publishing.", reason: "Roles defined in Desktop do nothing until users are assigned in Service." },
          { text: "Don't grant Reshare permission unless absolutely necessary.", reason: "Reshare lets a user pass access to anyone — quickly fragments your governance model." },
          { text: "Don't grant Build permission to consumers — Read is sufficient for viewing reports.", reason: "Build allows users to create new reports off the model and pull underlying data — over-permissioning." },
        ],
      },
    ],
  },
];
