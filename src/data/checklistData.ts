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
          { label: "Choose between DirectQuery and Import mode", tags: ["HOT"] },
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
          { label: "Apply conditional formatting (color scales, rules, field value)" },
          { label: "Configure report themes and formatting" },
          { label: "Add reference lines, trend lines, forecasting (Analytics pane)" },
          { label: "Configure slicers (list, dropdown, date range, relative date)" },
          { label: "Set report, page, and visual-level filters" },
          { label: "Configure drill-down and drill-through", tags: ["HOT"] },
          { label: "Create and configure paginated reports" },
          { label: "Use AI visuals: Q&A, Key Influencers, Decomposition Tree, Smart Narrative" },
        ],
      },
      {
        title: "Enhance Reports for Usability",
        items: [
          { label: "Configure bookmarks for report navigation and storytelling" },
          { label: "Create custom tooltip pages" },
          { label: "Configure sync slicers across pages" },
          { label: "Set edit interactions between visuals (filter, highlight, none)" },
          { label: "Add buttons, images, and shapes for navigation" },
          { label: "Implement accessibility: alt text, tab order, high contrast" },
          { label: "Configure mobile layout" },
        ],
      },
      {
        title: "Identify Patterns and Trends",
        items: [
          { label: "Use anomaly detection on line charts" },
          { label: "Use forecasting to project future values" },
          { label: "Use Copilot for insights and measure generation" },
          { label: "Create Top N analysis with filters" },
          { label: "Use grouping and binning to categorise data" },
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
          { label: "Understand workspace roles: Admin, Member, Contributor, Viewer", tags: ["HOT"] },
          { label: "Publish and manage workspace apps" },
          { label: "Configure scheduled data refresh" },
          { label: "Configure data gateway for on-premises sources" },
          { label: "Use deployment pipelines (Dev → Test → Production)" },
          { label: "Understand endorsement: Promoted vs Certified" },
          { label: "Use lineage view to understand dependencies" },
          { label: "Configure subscriptions for automated report delivery" },
          { label: "Manage incremental refresh for large datasets" },
        ],
      },
      {
        title: "Security and Governance",
        items: [
          { label: "Implement Row-Level Security (static and dynamic RLS)", tags: ["HOT"] },
          { label: "Implement Object-Level Security (OLS)" },
          { label: "Apply sensitivity labels to content" },
          { label: "Understand sharing vs. publish to web", tags: ["HOT"] },
          { label: "Configure per-user data access with USERPRINCIPALNAME()" },
          { label: "Understand composite models and their security implications" },
          { label: "Use admin portal for tenant-level management" },
        ],
      },
    ],
  },
];
