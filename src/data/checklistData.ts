export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  label: string;
  note?: string;
  tags?: string[];
}

export interface ChecklistDomain {
  name: string;
  icon: string;
  weight: string;
  sections: ChecklistSection[];
}

export const CHECKLIST_DOMAINS: ChecklistDomain[] = [
  {
    name: "Prepare the Data",
    icon: "🔌",
    weight: "25–30%",
    sections: [
      {
        title: "Get or Connect to Data",
        items: [
          { label: "Identify and connect to data sources (Excel, SQL, SharePoint, Azure, web, etc.)", tags: ["HOT"] },
          { label: "Connect to and use a shared semantic model (Live Connection vs. DirectQuery)" },
          { label: "Change data source settings — credentials, privacy levels, authentication methods" },
          { label: "Choose between DirectLake, DirectQuery, and Import mode", tags: ["HOT"] },
          { label: "Create and modify parameters in Power Query" },
          { label: "Understand privacy levels (Public, Organizational, Private)" },
        ],
      },
      {
        title: "Profile and Clean the Data",
        items: [
          { label: "Evaluate data using Column Quality, Column Distribution, and Column Profile", tags: ["PQ"] },
          { label: "Identify and handle null values, empty strings, and errors" },
          { label: "Resolve data inconsistencies (mixed casing, formats, duplicates)" },
          { label: "Resolve data import errors" },
          { label: "Use Replace Values, Remove Rows, Fill Down/Up cleaning transforms" },
          { label: "Understand column statistics: min, max, distinct, unique, empty, error" },
        ],
      },
      {
        title: "Transform and Load the Data",
        items: [
          { label: "Select and change column data types", tags: ["PQ"] },
          { label: "Create custom columns, conditional columns, transform existing" },
          { label: "Group By rows and aggregate data" },
          { label: "Pivot, unpivot, and transpose tables", tags: ["HOT"] },
          { label: "Convert semi-structured data (JSON, XML) to a table" },
          { label: "Create fact and dimension tables in Power Query" },
          { label: "Reference vs. Duplicate queries", tags: ["HOT"] },
          { label: "Merge queries (join types) and append queries" },
          { label: "Create appropriate keys for relationships" },
          { label: "Configure data loading — disable load, enable report connection only" },
          { label: "Understand query folding", note: "Critical for performance" },
        ],
      },
    ],
  },
  {
    name: "Model the Data",
    icon: "🏗️",
    weight: "25–30%",
    sections: [
      {
        title: "Design and Implement a Data Model",
        items: [
          { label: "Configure table and column properties", tags: ["HOT"] },
          { label: "Implement role-playing dimensions using USERELATIONSHIP()" },
          { label: "Define relationship cardinality: one-to-many, one-to-one, many-to-many", tags: ["HOT"] },
          { label: "Set cross-filter direction: single vs. both" },
          { label: "Create a common date table (Mark as Date Table, CALENDAR/CALENDARAUTO)", tags: ["HOT"] },
          { label: "Identify use cases for calculated columns vs. calculated tables" },
          { label: "Understand star schema design — facts, dimensions, bridge tables" },
          { label: "Apply column formatting — currency, percentage, date format" },
        ],
      },
      {
        title: "Create Model Calculations Using DAX",
        items: [
          { label: "Create aggregation measures: SUM, COUNT, AVERAGE, MIN, MAX", tags: ["DAX"] },
          { label: "Use CALCULATE() to modify filter context", tags: ["DAX", "HOT"] },
          { label: "Understand row context vs. filter context", tags: ["HOT"] },
          { label: "Implement time intelligence: TOTALYTD, SAMEPERIODLASTYEAR, DATEADD", tags: ["DAX", "HOT"] },
          { label: "Use statistical functions: RANKX, PERCENTILE, MEDIAN" },
          { label: "Create semi-additive measures (LASTDATE, LASTNONBLANK)", tags: ["DAX"] },
          { label: "Create measures using Quick Measures" },
          { label: "Create calculated columns and tables" },
          { label: "Create calculation groups", tags: ["DAX"] },
          { label: "Use ALL(), ALLEXCEPT(), FILTER(), RELATED(), RELATEDTABLE()", tags: ["DAX"] },
          { label: "Understand iterators: SUMX, AVERAGEX, MAXX, COUNTX, RANKX" },
          { label: "Use DIVIDE() for safe division" },
          { label: "Use VAR/RETURN pattern" },
        ],
      },
      {
        title: "Optimize Model Performance",
        items: [
          { label: "Remove unnecessary rows, columns, and unused tables", tags: ["HOT"] },
          { label: "Use Performance Analyzer to identify slow visuals" },
          { label: "Use DAX Query View to test measure performance" },
          { label: "Identify poorly performing measures, relationships, visuals" },
          { label: "Reduce granularity by summarising data before loading" },
          { label: "Avoid high-cardinality columns and unnecessary calculated columns" },
          { label: "Understand VertiPaq columnar storage" },
        ],
      },
    ],
  },
  {
    name: "Visualize & Analyze",
    icon: "📊",
    weight: "25–30%",
    sections: [
      {
        title: "Create Reports",
        items: [
          { label: "Choose the correct visual type for the data question", tags: ["HOT"] },
          { label: "Format and configure visuals (titles, data labels, axes, legends)" },
          { label: "Create a narrative visual with Copilot", tags: ["HOT"] },
          { label: "Apply and customize a theme (built-in + theme JSON)" },
          { label: "Apply conditional formatting (color scales, rules, field value)" },
          { label: "Apply slicing and filtering (slicers vs. visual/page/report filters)" },
          { label: "Use Copilot to create a new report page", tags: ["HOT"] },
          { label: "Use Copilot to suggest content for a new report page" },
          { label: "Configure the report page (size, background, page info)" },
          { label: "Choose when to use a paginated report" },
          { label: "Create visual calculations by using DAX", tags: ["DAX", "HOT"] },
          { label: "Use AI visuals: Q&A, Key Influencers, Decomposition Tree, Smart Narrative" },
        ],
      },
      {
        title: "Enhance Reports for Usability and Storytelling",
        items: [
          { label: "Configure bookmarks for report navigation and storytelling" },
          { label: "Create custom tooltip pages" },
          { label: "Edit and configure interactions between visuals (filter, highlight, none)", tags: ["HOT"] },
          { label: "Configure navigation for a report (page navigators, button menus, bookmark navigators)" },
          { label: "Apply sorting to visuals (by column, by measure, Sort By Column)" },
          { label: "Configure sync slicers across pages" },
          { label: "Group and layer visuals using the Selection pane" },
          { label: "Configure drillthrough navigation (pages, filters, buttons)", tags: ["HOT"] },
          { label: "Configure export settings (PDF, PowerPoint, Excel, underlying data)" },
          { label: "Design reports for mobile devices (portrait layout)" },
          { label: "Enable personalization in a report (personalized visuals)" },
          { label: "Design and configure reports for accessibility (alt text, tab order, high contrast)" },
          { label: "Configure automatic page refresh (fixed interval / change detection)" },
        ],
      },
      {
        title: "Identify Patterns and Trends",
        items: [
          { label: "Use the Analyze feature in Power BI (Explain the increase/decrease)" },
          { label: "Use grouping, binning, and clustering" },
          { label: "Use AI visuals to surface insights" },
          { label: "Use reference lines, error bars, and forecasting (Analytics pane)" },
          { label: "Detect outliers and anomalies (anomaly detection on line charts)" },
          { label: "Use Copilot to summarize the underlying semantic model", tags: ["HOT"] },
        ],
      },
    ],
  },
  {
    name: "Deploy & Maintain Assets",
    icon: "🔒",
    weight: "15–20%",
    sections: [
      {
        title: "Manage Workspaces and Assets",
        items: [
          { label: "Create and configure a workspace (capacity, OneDrive, contact list)" },
          { label: "Configure and update an app (audiences, navigation, publish updates)" },
          { label: "Publish, import, or update items in a workspace (.pbix / .pbip)" },
          { label: "Create dashboards (pin tiles from multiple reports)" },
          { label: "Choose a distribution method (workspace, app, sharing, Teams embed)", tags: ["HOT"] },
          { label: "Configure subscriptions and data alerts" },
          { label: "Promote or certify Power BI content (endorsement)" },
          { label: "Identify when a gateway is required (on-prem, VNet, none)" },
          { label: "Configure a semantic model scheduled refresh (incremental refresh)" },
          { label: "Understand workspace roles: Admin, Member, Contributor, Viewer", tags: ["HOT"] },
          { label: "Use deployment pipelines (Dev → Test → Production)" },
          { label: "Use lineage view to understand dependencies" },
        ],
      },
      {
        title: "Secure and Govern Power BI Items",
        items: [
          { label: "Assign workspace roles (least privilege)", tags: ["HOT"] },
          { label: "Configure item-level access (per-report / per-model permissions)" },
          { label: "Configure access to semantic models (Build, Read, Reshare)" },
          { label: "Implement Row-Level Security roles (static and dynamic RLS)", tags: ["HOT"] },
          { label: "Configure Row-Level Security group membership (Microsoft Entra groups)" },
          { label: "Apply sensitivity labels to content" },
          { label: "Understand sharing vs. publish to web", tags: ["HOT"] },
          { label: "Configure per-user data access with USERPRINCIPALNAME()" },
          { label: "Use admin portal for tenant-level management" },
        ],
      },
    ],
  },
];
