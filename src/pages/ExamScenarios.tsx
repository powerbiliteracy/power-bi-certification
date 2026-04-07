import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronDown, ChevronRight, Lightbulb, AlertCircle, CheckCircle2, Database, LineChart, Eye, Shield, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const domainIcons: Record<string, React.ElementType> = {
  prepare_data: Database,
  model_data: LineChart,
  visualize_analyze: Eye,
  deploy_maintain: Shield,
};

const domainLabels: Record<string, string> = {
  prepare_data: "Prepare the Data",
  model_data: "Model the Data",
  visualize_analyze: "Visualize & Analyze",
  deploy_maintain: "Manage & Secure",
};

const domainColors: Record<string, string> = {
  prepare_data: "from-blue-400 to-cyan-500",
  model_data: "from-purple-400 to-pink-500",
  visualize_analyze: "from-orange-400 to-red-500",
  deploy_maintain: "from-green-400 to-emerald-500",
};

interface RelatedTopic {
  name: string;
  section: string;
}

interface Scenario {
  id: string;
  title: string;
  domain: string;
  difficulty: string;
  context: string;
  question: string;
  approach: string[];
  sampleDAX?: string;
  examTips: string[];
  relatedTopics: RelatedTopic[];
}

const scenarios: Scenario[] = [
  // ── PREPARE THE DATA ──────────────────────────────────
  {
    id: "scenario-1",
    title: "Multi-table data source integration",
    domain: "prepare_data",
    difficulty: "Medium",
    context: "Your organization uses SQL Server with sales, customer, and product tables. You need to load this data into Power BI, but sales data contains product IDs that don't exist in the product table (data quality issues). How do you handle this?",
    question: "Which approach is best for handling orphaned product IDs during data import?",
    approach: [
      "1. PROFILE THE DATA FIRST: In Power Query, use Data Profiling to identify the scope of missing product IDs",
      "2. DETERMINE ROOT CAUSE: Check if the issue is a data quality problem or a real-time sync lag",
      "3. DECIDE STRATEGY: Choose between filtering out orphaned records, creating a default 'Unknown' product, or excluding from joins",
      "4. IMPLEMENT IN POWER QUERY: Use Filter rows to exclude or Merge with error handling to keep them separate",
      "5. DOCUMENT & VALIDATE: Test the join results and confirm no unexpected nulls appear in your reports",
    ],
    examTips: [
      "Don't assume referential integrity exists—always validate in real-world scenarios",
      "The exam often tests whether you know to check data quality first before loading",
      "Consider business impact: losing data vs. showing 'Unknown' category",
      "Power Query allows handling this before the data model—prefer doing it there",
    ],
    relatedTopics: [
      { name: "Data profiling", section: "Data Connectivity" },
      { name: "Power Query transformations", section: "Data Preparation" },
      { name: "Join operations", section: "Data Structuring" },
    ],
  },
  {
    id: "scenario-8",
    title: "Migrate from Excel reports to Power BI",
    domain: "prepare_data",
    difficulty: "Easy",
    context: "Your finance team has 50 Excel workbooks with pivot tables and charts. They want to consolidate into a single Power BI solution. The data sources are a mix of CSV files, SQL Server, and SharePoint lists.",
    question: "What's the best migration strategy?",
    approach: [
      "1. AUDIT EXISTING REPORTS: Catalog all 50 workbooks—identify common data sources and overlapping metrics",
      "2. IDENTIFY DATA SOURCES: Map each workbook to its underlying data—SQL, CSV, SharePoint, or manual entry",
      "3. DESIGN UNIFIED MODEL: Create a single semantic model that replaces multiple Excel data silos",
      "4. BUILD IN PHASES: Start with the most-used reports first—quick wins build stakeholder confidence",
      "5. CONFIGURE REFRESH: Set up scheduled refresh to replace manual CSV imports",
      "6. TRAIN USERS: Show the finance team how to use slicers and filters instead of pivot tables",
    ],
    examTips: [
      "The exam tests understanding of when to use Import vs. DirectQuery for different source types",
      "Know how to handle Excel-specific patterns: named ranges, pivot tables as sources",
      "SharePoint lists have specific connector behavior—test pagination limits",
      "Query folding works with SQL Server but not with CSV/Excel sources",
    ],
    relatedTopics: [
      { name: "Data source connectivity", section: "Data Connectivity" },
      { name: "Query folding", section: "Performance Optimization" },
      { name: "Gateway configuration", section: "Connectivity" },
    ],
  },
  {
    id: "scenario-pd-1",
    title: "Handling incremental refresh for large datasets",
    domain: "prepare_data",
    difficulty: "Hard",
    context: "Your data warehouse has a transaction table with 500M rows growing by 2M daily. Full refreshes take 4 hours and timeout. You need a strategy that keeps data current without overloading the system.",
    question: "How would you configure incremental refresh to solve this?",
    approach: [
      "1. CREATE PARAMETERS: Define RangeStart and RangeEnd DateTime parameters in Power Query",
      "2. APPLY FILTER: Filter the transaction table to rows between RangeStart and RangeEnd",
      "3. CONFIGURE POLICY: Set incremental refresh policy — store 3 years, refresh last 10 days",
      "4. ENABLE DETECT CHANGES: Use a LastModified column to detect updated historical rows",
      "5. PUBLISH & VALIDATE: Publish to Service — initial full refresh creates partitions, subsequent ones are incremental",
      "6. MONITOR REFRESH: Check refresh history for partition-level success/failure",
    ],
    examTips: [
      "RangeStart and RangeEnd must be DateTime type parameters — exact naming matters",
      "Incremental refresh requires Premium, PPU, or Pro with shared capacity",
      "Query folding MUST work on the date filter for incremental refresh to function",
      "The 'Detect data changes' option uses a max-value column to find updated rows",
    ],
    relatedTopics: [
      { name: "Incremental refresh", section: "Data Refresh" },
      { name: "Query folding", section: "Performance Optimization" },
      { name: "Partitioning", section: "Data Management" },
    ],
  },
  {
    id: "scenario-pd-2",
    title: "Cleaning and shaping messy CSV data",
    domain: "prepare_data",
    difficulty: "Easy",
    context: "You receive a monthly CSV export from a vendor. It has inconsistent headers, mixed date formats (US and EU), null values in key columns, and duplicate rows. You need to automate the cleanup.",
    question: "What Power Query steps would you apply to standardize this data?",
    approach: [
      "1. PROMOTE HEADERS: Use 'Use First Row as Headers' if header row is offset",
      "2. REMOVE DUPLICATES: Select key columns and remove duplicate rows",
      "3. HANDLE NULLS: Replace nulls with defaults or filter out incomplete rows based on business rules",
      "4. STANDARDIZE DATES: Use locale-aware parsing or custom column with Date.FromText",
      "5. CHANGE DATA TYPES: Set correct types for all columns after transformations",
      "6. GROUP STEPS: Organize transformations logically and name steps clearly for maintenance",
    ],
    examTips: [
      "Applied Steps order matters — changing data types too early can cause errors",
      "The exam tests knowledge of Replace Values, Remove Duplicates, and Fill Down",
      "Know the difference between Remove Errors and Replace Errors",
      "Date locale issues are a common exam trap — always check Regional Settings",
    ],
    relatedTopics: [
      { name: "Data cleansing", section: "Data Preparation" },
      { name: "Column transformations", section: "Power Query" },
      { name: "Error handling", section: "Data Quality" },
    ],
  },
  {
    id: "scenario-pd-3",
    title: "Combining data from REST API and database",
    domain: "prepare_data",
    difficulty: "Hard",
    context: "You need to combine real-time inventory data from a REST API with historical sales from SQL Server. The API returns JSON with nested arrays. The combined dataset powers a supply chain dashboard.",
    question: "How do you connect and merge these disparate sources?",
    approach: [
      "1. CONNECT TO API: Use Web connector with the API URL, configure authentication (API key or OAuth)",
      "2. PARSE JSON: Expand nested records and lists using Power Query's JSON parser",
      "3. CONNECT TO SQL: Add SQL Server source for historical sales data",
      "4. ALIGN SCHEMAS: Rename columns and adjust types so both sources share common join keys (e.g., ProductSKU)",
      "5. MERGE QUERIES: Use Merge Queries to join API data with SQL data on ProductSKU",
      "6. HANDLE REFRESH: API calls happen on every refresh—consider caching or dataflow for performance",
    ],
    examTips: [
      "REST API sources require a gateway for scheduled refresh in the Service",
      "Nested JSON expansion is a frequently tested skill—know Record.Field and List.Expand",
      "Privacy levels (Public, Organizational, Private) affect whether sources can be combined",
      "The exam tests understanding of when query folding is NOT possible (APIs, JSON, CSV)",
    ],
    relatedTopics: [
      { name: "Web connector", section: "Data Connectivity" },
      { name: "JSON parsing", section: "Data Transformation" },
      { name: "Privacy levels", section: "Data Source Settings" },
    ],
  },
  {
    id: "scenario-pd-4",
    title: "Implementing query folding for performance",
    domain: "prepare_data",
    difficulty: "Medium",
    context: "Your Power Query pulls from a SQL Server view. After adding several transformations, refresh takes 20 minutes. You suspect query folding has broken, pushing processing to the Power BI engine instead of SQL Server.",
    question: "How do you diagnose and restore query folding?",
    approach: [
      "1. CHECK FOLDING STATUS: Right-click each step — 'View Native Query' appears if folding is active",
      "2. IDENTIFY BREAK POINT: Find the first step where 'View Native Query' is grayed out",
      "3. ANALYZE THE STEP: Common breakers include custom columns, certain text functions, and type changes",
      "4. REFACTOR: Move non-foldable steps to after all foldable steps, or rewrite using foldable alternatives",
      "5. USE NATIVE QUERY: As a last resort, write a native SQL query that handles complex logic server-side",
      "6. VALIDATE PERFORMANCE: Compare refresh times before and after — folded queries should be significantly faster",
    ],
    examTips: [
      "Query folding pushes transformations to the source database — always preferred for performance",
      "Steps that break folding: adding index columns, pivoting, merging with non-SQL sources",
      "Table.Buffer() explicitly breaks folding — know when it's used intentionally",
      "The exam frequently asks which Power Query operations support query folding",
    ],
    relatedTopics: [
      { name: "Query folding", section: "Performance Optimization" },
      { name: "Native queries", section: "Advanced Data Sources" },
      { name: "Power Query diagnostics", section: "Troubleshooting" },
    ],
  },
  {
    id: "scenario-pd-5",
    title: "Configuring a data gateway for on-premises sources",
    domain: "prepare_data",
    difficulty: "Medium",
    context: "Your organization's data resides on-premises in SQL Server and Oracle databases behind a firewall. Reports in Power BI Service need scheduled refresh. No cloud replication exists.",
    question: "How do you set up the on-premises data gateway?",
    approach: [
      "1. INSTALL GATEWAY: Download and install the on-premises data gateway on a server with network access to both databases",
      "2. REGISTER IN SERVICE: Sign in with your Power BI account to register the gateway in Power BI Service",
      "3. ADD DATA SOURCES: Configure SQL Server and Oracle connections in gateway settings with credentials",
      "4. MAP DATASETS: In Power BI Service, assign published datasets to use the gateway's data sources",
      "5. SCHEDULE REFRESH: Configure daily or more frequent refresh schedules",
      "6. SET UP CLUSTERING: For high availability, add a second gateway to the same cluster",
    ],
    examTips: [
      "Know the difference between Personal gateway (single user, dev) and Standard gateway (enterprise, shared)",
      "Gateway runs as a Windows service — the server must stay on for scheduled refreshes",
      "Each data source on the gateway needs its own credential configuration",
      "Gateway admins can manage which users can use which data sources",
    ],
    relatedTopics: [
      { name: "Data gateway", section: "Connectivity" },
      { name: "Scheduled refresh", section: "Data Refresh" },
      { name: "Data source credentials", section: "Security" },
    ],
  },
  {
    id: "scenario-pd-6",
    title: "Using dataflows for reusable data preparation",
    domain: "prepare_data",
    difficulty: "Medium",
    context: "Multiple Power BI reports across your organization use the same customer and product data with identical cleansing steps. Each report author duplicates the same Power Query logic, leading to inconsistencies.",
    question: "How do you centralize data preparation using dataflows?",
    approach: [
      "1. CREATE DATAFLOW: In Power BI Service workspace, create a new dataflow",
      "2. ADD ENTITIES: Connect to the shared data sources and apply the standard cleansing steps",
      "3. DEFINE COMPUTED ENTITIES: Create derived tables that reference base entities for advanced transformations",
      "4. SCHEDULE REFRESH: Set the dataflow to refresh before the datasets that depend on it",
      "5. CONNECT REPORTS: In Power BI Desktop, use the 'Power BI dataflows' connector to pull from the dataflow",
      "6. GOVERN ACCESS: Control who can edit vs. read the dataflow entities",
    ],
    examTips: [
      "Dataflows use the Common Data Model (CDM) format and store data in Azure Data Lake",
      "Computed entities (referencing other entities) require Premium capacity",
      "Dataflows refresh independently — dataset refresh must be scheduled AFTER dataflow refresh",
      "Know the difference between dataflows and datasets — dataflows are ETL, datasets are models",
    ],
    relatedTopics: [
      { name: "Dataflows", section: "Data Preparation" },
      { name: "Common Data Model", section: "Data Standards" },
      { name: "Workspace governance", section: "Administration" },
    ],
  },
  {
    id: "scenario-pd-7",
    title: "Appending and merging queries from multiple regions",
    domain: "prepare_data",
    difficulty: "Easy",
    context: "Your company has separate databases for North America, Europe, and Asia. Each has the same schema but different data. You need to combine them into a single unified dataset for global reporting.",
    question: "Should you use Append or Merge queries, and how?",
    approach: [
      "1. CONNECT TO EACH SOURCE: Add each regional database as a separate query in Power Query",
      "2. VALIDATE SCHEMAS: Ensure all three have matching column names and data types",
      "3. APPEND QUERIES: Use 'Append Queries as New' to stack all three into a single table",
      "4. ADD REGION COLUMN: If not already present, add a custom column identifying the source region",
      "5. HANDLE CONFLICTS: Resolve any column type mismatches or naming differences before appending",
      "6. DISABLE SOURCE QUERIES: Disable loading for the individual region queries — only load the appended result",
    ],
    examTips: [
      "Append = stacking rows (UNION); Merge = joining columns (JOIN) — the exam tests this distinction",
      "Append requires matching column names — mismatched columns become nulls",
      "Disabling load on intermediate queries saves memory and improves performance",
      "Use 'Append Queries as New' to keep originals intact vs. 'Append Queries' which modifies in-place",
    ],
    relatedTopics: [
      { name: "Append queries", section: "Data Combination" },
      { name: "Merge queries", section: "Data Combination" },
      { name: "Query organization", section: "Power Query" },
    ],
  },
  {
    id: "scenario-pd-8",
    title: "Handling parameters and dynamic data sources",
    domain: "prepare_data",
    difficulty: "Medium",
    context: "Your organization has dev, staging, and production databases with identical schemas. You need to switch between them easily without duplicating queries. Additionally, business users want to filter data at the source level by entering a date range.",
    question: "How do you use Power Query parameters for dynamic source switching?",
    approach: [
      "1. CREATE PARAMETERS: Define ServerName and DatabaseName parameters with allowed values for each environment",
      "2. REFERENCE IN QUERIES: Replace hardcoded server/database names in connection strings with parameters",
      "3. ADD DATE PARAMETERS: Create StartDate and EndDate parameters for source-level filtering",
      "4. APPLY TO SOURCE: Use parameters in the WHERE clause or filter step to push filtering to the database",
      "5. TEST EACH ENVIRONMENT: Switch parameters and verify data loads correctly from each source",
      "6. USE IN DEPLOYMENT: Deployment pipeline rules can override parameter values per stage",
    ],
    examTips: [
      "Parameters enable query folding when used in filter steps — the database does the filtering",
      "The exam tests knowledge of parameter types: Text, Decimal Number, Date, True/False",
      "Parameters are required for incremental refresh (RangeStart, RangeEnd)",
      "In Power BI Service, parameter values can be changed in dataset settings without Desktop",
    ],
    relatedTopics: [
      { name: "Parameters", section: "Power Query" },
      { name: "Dynamic data sources", section: "Data Connectivity" },
      { name: "Deployment pipelines", section: "Deployment" },
    ],
  },

  // ── MODEL THE DATA ────────────────────────────────────
  {
    id: "scenario-2",
    title: "Model a fact and dimension structure",
    domain: "model_data",
    difficulty: "Medium",
    context: "You have transaction data with 50 million rows containing product names, customer details, and sales amounts. You need to design a model for fast reporting on sales by product category and region. What's your approach?",
    question: "How would you structure this into a star schema for optimal performance?",
    approach: [
      "1. IDENTIFY DIMENSIONS: Extract unique product categories, regions, and time periods into separate tables",
      "2. CREATE FACT TABLE: Keep transactions with only IDs (ProductID, RegionID, DateID) and measures (SalesAmount, Quantity)",
      "3. HANDLE SLOWLY CHANGING DATA: Decide if product categories change over time—use SCD Type 1 or 2",
      "4. OPTIMIZE CARDINALITY: Product table has ~1000 rows, Region has ~50, Date has ~3650 days—acceptable",
      "5. DEFINE RELATIONSHIPS: Create one-to-many from dimensions to fact table with single-direction filters",
      "6. TEST AGGREGATIONS: Verify sums aggregate correctly across dimensions without duplication",
    ],
    examTips: [
      "The exam tests whether you know WHY star schema is preferred (performance, clarity, reusability)",
      "Don't denormalize too early—normalize first, then denormalize only if needed for performance",
      "Remember: fact tables store many-to-one relationships; dimensions store descriptive attributes",
      "Watch for many-to-many situations—the exam loves asking how to handle product-category cross-mapping",
    ],
    relatedTopics: [
      { name: "Star schema design", section: "Table and Relationship Design" },
      { name: "Dimension and fact tables", section: "Data Structuring" },
      { name: "Relationship cardinality", section: "Table and Relationship Design" },
    ],
  },
  {
    id: "scenario-3",
    title: "Calculate year-to-date sales with complex filters",
    domain: "model_data",
    difficulty: "Hard",
    context: "Your report needs to show YTD sales for the current month, but only for high-value customers (>$100k annual spend) and excluding cancelled orders. The business wants to compare actual vs. target.",
    question: "How would you write a DAX measure to handle all these conditions?",
    approach: [
      "1. BREAK DOWN THE REQUIREMENTS: (a) YTD calculation, (b) current month context, (c) high-value customers only, (d) exclude cancelled",
      "2. START WITH BASE MEASURE: Write a SalesAmount measure = SUM(FactTable[Amount])",
      "3. ADD CUSTOMER FILTER: Use FILTER to select customers where TotalAnnualSpend > 100000",
      "4. ADD ORDER STATUS FILTER: Exclude cancelled orders in the FILTER expression",
      "5. ADD TIME INTELLIGENCE: Wrap with TOTALYTD() to calculate year-to-date",
      "6. TEST CONTEXT: Verify the measure works at month level and year level without breaking",
    ],
    sampleDAX: `YTD Sales (High Value) = CALCULATE(
  SUM(Sales[Amount]),
  FILTER(
    VALUES(Customer[CustomerID]),
    CALCULATE(SUM(Sales[Amount])) > 100000
  ),
  Sales[OrderStatus] <> "Cancelled",
  TOTALYTD(SUM(Sales[Amount]), Date[Date])
)`,
    examTips: [
      "The exam tests filter context management—know when to use CALCULATE, FILTER, and ALL",
      "Avoid circular references: make sure your condition measure doesn't reference itself",
      "Test edge cases: What happens in month 1? Does YTD reset at year boundary?",
      "Use variables (VAR) to break complex formulas into readable steps—the exam values clarity",
    ],
    relatedTopics: [
      { name: "CALCULATE function", section: "Advanced DAX" },
      { name: "FILTER and TOTALYTD", section: "Time Intelligence" },
      { name: "Filter context", section: "Context Concepts" },
    ],
  },
  {
    id: "scenario-md-1",
    title: "Resolving many-to-many relationships",
    domain: "model_data",
    difficulty: "Hard",
    context: "Your model has a Students table and a Courses table. Each student can enroll in multiple courses, and each course has multiple students. You need to report on student counts per course and course counts per student.",
    question: "How do you model this many-to-many relationship correctly?",
    approach: [
      "1. CREATE BRIDGE TABLE: Build an Enrollments table with StudentID and CourseID as composite key",
      "2. SET RELATIONSHIPS: Create one-to-many from Students to Enrollments and from Courses to Enrollments",
      "3. AVOID DIRECT M:M: Don't use a direct many-to-many between Students and Courses — it causes ambiguity",
      "4. HANDLE FILTERS: Set both relationships to single-direction cross-filter to avoid ambiguity",
      "5. WRITE MEASURES: Use DISTINCTCOUNT for student counts to avoid double-counting",
      "6. TEST BOTH DIRECTIONS: Verify filtering from Student → Courses and Courses → Students both work correctly",
    ],
    examTips: [
      "Bridge tables resolve M:M properly and give you additional attributes (enrollment date, grade)",
      "Direct M:M relationships in Power BI have limitations — the exam prefers bridge table approach",
      "Bi-directional cross-filtering can cause unexpected results — use CROSSFILTER() in DAX instead",
      "DISTINCTCOUNT is essential when counting across M:M — SUM would double-count",
    ],
    relatedTopics: [
      { name: "Many-to-many relationships", section: "Relationship Design" },
      { name: "Bridge tables", section: "Data Modeling" },
      { name: "Cross-filter direction", section: "Model Configuration" },
    ],
  },
  {
    id: "scenario-md-2",
    title: "Building a date table for time intelligence",
    domain: "model_data",
    difficulty: "Medium",
    context: "Your reports need YoY comparisons, fiscal year aggregations (April–March), and week-over-week trends. The current date column in your fact table doesn't support these. You need a proper date dimension.",
    question: "How do you create and configure a date table?",
    approach: [
      "1. GENERATE DATE TABLE: Use CALENDAR() or CALENDARAUTO() DAX function to create a continuous date range",
      "2. ADD COLUMNS: Add Year, Month, Quarter, WeekNum, FiscalYear, FiscalQuarter calculated columns",
      "3. MARK AS DATE TABLE: Right-click → Mark as Date Table and select the Date column",
      "4. CREATE RELATIONSHIP: Link Date[Date] to FactTable[OrderDate] as one-to-many",
      "5. CONFIGURE FISCAL YEAR: Add FiscalYear = IF(MONTH([Date]) >= 4, YEAR([Date]), YEAR([Date]) - 1)",
      "6. TEST TIME INTELLIGENCE: Validate TOTALYTD, SAMEPERIODLASTYEAR work correctly with fiscal calendar",
    ],
    sampleDAX: `DateTable = 
ADDCOLUMNS(
  CALENDAR(DATE(2020,1,1), DATE(2025,12,31)),
  "Year", YEAR([Date]),
  "Month", FORMAT([Date], "MMMM"),
  "MonthNum", MONTH([Date]),
  "FiscalYear", IF(MONTH([Date])>=4, YEAR([Date]), YEAR([Date])-1)
)`,
    examTips: [
      "A marked Date Table is REQUIRED for time intelligence functions to work",
      "The date column must have no gaps and no duplicates — CALENDAR ensures this",
      "CALENDARAUTO scans all date columns in the model — CALENDAR gives you explicit control",
      "Fiscal year offsets are a common exam question — know how to calculate them",
    ],
    relatedTopics: [
      { name: "Date tables", section: "Time Intelligence" },
      { name: "CALENDAR function", section: "DAX" },
      { name: "Fiscal year configuration", section: "Date Dimension" },
    ],
  },
  {
    id: "scenario-md-3",
    title: "Implementing calculation groups for reusable logic",
    domain: "model_data",
    difficulty: "Hard",
    context: "Your model has 20 measures (Sales, Costs, Profit, etc.). For each, users want to see Current, YTD, Prior Year, and YoY Change. Creating 80 individual measures is unsustainable.",
    question: "How do you use calculation groups to reduce measure proliferation?",
    approach: [
      "1. IDENTIFY PATTERN: All measures need the same 4 time calculations — this is perfect for a calculation group",
      "2. CREATE CALCULATION GROUP: Using Tabular Editor, create a 'Time Calculation' calculation group",
      "3. ADD ITEMS: Create calculation items: Current, YTD (TOTALYTD), Prior Year (SAMEPERIODLASTYEAR), YoY %",
      "4. USE SELECTEDMEASURE(): Each item wraps SELECTEDMEASURE() with the appropriate time intelligence function",
      "5. ADD TO VISUALS: Users place the calculation group column as a slicer or row — it dynamically modifies any base measure",
      "6. TEST COMBINATIONS: Verify that Sales × YTD, Profit × Prior Year, etc. all calculate correctly",
    ],
    sampleDAX: `// YTD calculation item
CALCULATE(SELECTEDMEASURE(), DATESYTD(DimDate[Date]))

// Prior Year calculation item
CALCULATE(SELECTEDMEASURE(), SAMEPERIODLASTYEAR(DimDate[Date]))`,
    examTips: [
      "Calculation groups reduce N measures × M calculations to N + M instead of N × M",
      "SELECTEDMEASURE() dynamically refers to whatever measure is in context",
      "Calculation groups are created in Tabular Editor or via XMLA — not in Power BI Desktop UI directly",
      "The exam tests understanding of calculation group precedence when multiple groups exist",
    ],
    relatedTopics: [
      { name: "Calculation groups", section: "Advanced DAX" },
      { name: "SELECTEDMEASURE", section: "DAX Functions" },
      { name: "Tabular Editor", section: "External Tools" },
    ],
  },
  {
    id: "scenario-md-4",
    title: "Using CALCULATE to manipulate filter context",
    domain: "model_data",
    difficulty: "Medium",
    context: "Your report shows Sales by Category. The CEO wants a column showing each category's percentage of Total Sales. You also need 'All Others' — the sum of all categories except the current row.",
    question: "How do you write DAX measures that override filter context?",
    approach: [
      "1. CREATE BASE: Total Sales = SUM(Sales[Amount])",
      "2. REMOVE FILTERS: All Sales = CALCULATE([Total Sales], ALL(Product[Category]))",
      "3. CALCULATE PERCENTAGE: % of Total = DIVIDE([Total Sales], [All Sales])",
      "4. ALL OTHERS: Other Sales = CALCULATE([Total Sales], ALL(Product[Category])) - [Total Sales]",
      "5. FORMAT: Apply percentage format to % of Total measure",
      "6. TEST IN MATRIX: Verify percentages sum to 100% and 'All Others' shows correct values per row",
    ],
    sampleDAX: `% of Total = 
DIVIDE(
  SUM(Sales[Amount]),
  CALCULATE(SUM(Sales[Amount]), ALL(Product[Category]))
)`,
    examTips: [
      "ALL() removes filters — know the difference between ALL, ALLEXCEPT, and ALLSELECTED",
      "ALLSELECTED preserves slicer context while removing visual-level filters — exam favorite",
      "DIVIDE handles division by zero gracefully — always prefer it over '/' operator",
      "Context transition occurs when CALCULATE evaluates a row context as filter context",
    ],
    relatedTopics: [
      { name: "CALCULATE", section: "DAX Core" },
      { name: "ALL / ALLEXCEPT", section: "Filter Functions" },
      { name: "Context transition", section: "DAX Concepts" },
    ],
  },
  {
    id: "scenario-md-5",
    title: "Creating a disconnected slicer for dynamic analysis",
    domain: "model_data",
    difficulty: "Medium",
    context: "Users want a slicer to switch the displayed metric between Sales, Cost, and Profit without changing the visual. They also want a 'Top N' slicer to show only the top 5, 10, or 20 items.",
    question: "How do you build disconnected tables for dynamic measure selection?",
    approach: [
      "1. CREATE METRIC TABLE: Build a disconnected table with columns MetricName and MetricOrder",
      "2. ADD SWITCH MEASURE: Use SWITCH(SELECTEDVALUE(Metric[MetricName]), 'Sales', [Sales], 'Cost', [Cost], 'Profit', [Profit])",
      "3. CREATE TOP N TABLE: Build a table with values 5, 10, 20",
      "4. ADD TOPN MEASURE: Use CALCULATE with TOPN based on SELECTEDVALUE from the Top N table",
      "5. ADD SLICERS: Place both disconnected tables as slicers — they filter the switch measures, not the data",
      "6. TEST COMBINATIONS: Verify Top 10 Products by Profit, Top 5 Products by Sales, etc.",
    ],
    examTips: [
      "Disconnected tables have NO relationships to other tables — they only drive measure logic",
      "SELECTEDVALUE returns blank if multiple values selected — handle with a default using the second parameter",
      "SWITCH is more readable than nested IF — the exam prefers SWITCH for multi-condition logic",
      "This pattern is called 'metric switching' or 'measure branching' — very common on the exam",
    ],
    relatedTopics: [
      { name: "SWITCH function", section: "DAX" },
      { name: "Disconnected tables", section: "Data Modeling" },
      { name: "Dynamic measures", section: "Advanced DAX" },
    ],
  },
  {
    id: "scenario-md-6",
    title: "Role-playing dimensions and inactive relationships",
    domain: "model_data",
    difficulty: "Hard",
    context: "Your Sales fact table has three date columns: OrderDate, ShipDate, and DeliveryDate. You want users to analyze sales by any of these dates using the same Date dimension table.",
    question: "How do you handle multiple relationships to the same dimension?",
    approach: [
      "1. CREATE PRIMARY RELATIONSHIP: Set Date[Date] → Sales[OrderDate] as active (one-to-many)",
      "2. ADD INACTIVE RELATIONSHIPS: Create inactive relationships for ShipDate and DeliveryDate",
      "3. USE USERELATIONSHIP: Create measures that activate inactive relationships dynamically",
      "4. SHIP DATE MEASURE: Sales by Ship = CALCULATE([Total Sales], USERELATIONSHIP(Sales[ShipDate], Date[Date]))",
      "5. ADD SLICER: Use disconnected table or buttons to let users choose which date to analyze by",
      "6. COMBINE WITH SWITCH: Use SWITCH to select the appropriate USERELATIONSHIP-based measure",
    ],
    sampleDAX: `Sales by Ship Date = 
CALCULATE(
  [Total Sales], 
  USERELATIONSHIP(Sales[ShipDate], 'Date'[Date])
)`,
    examTips: [
      "Only ONE relationship between two tables can be active — others must be inactive",
      "USERELATIONSHIP activates an inactive relationship within a CALCULATE context",
      "Role-playing dimensions are a core exam concept — know the pattern thoroughly",
      "Some solutions create multiple date tables instead — less efficient but sometimes simpler",
    ],
    relatedTopics: [
      { name: "USERELATIONSHIP", section: "DAX Functions" },
      { name: "Role-playing dimensions", section: "Data Modeling" },
      { name: "Inactive relationships", section: "Model Design" },
    ],
  },
  {
    id: "scenario-md-7",
    title: "Implementing row-level security in the model",
    domain: "model_data",
    difficulty: "Medium",
    context: "Your data model supports 200 sales reps who should only see their own territory's data. Managers should see all territories under them. You need RLS defined in the model before publishing.",
    question: "How do you define static and dynamic RLS roles in Power BI Desktop?",
    approach: [
      "1. CREATE SECURITY TABLE: Add UserTerritory table mapping user email to territory",
      "2. DEFINE ROLE: In Modeling → Manage Roles, create a 'SalesRep' role",
      "3. ADD DAX FILTER: On Territory table: [TerritoryEmail] = USERPRINCIPALNAME()",
      "4. MANAGER ACCESS: Create 'Manager' role with filter on hierarchy level or multiple territories",
      "5. TEST IN DESKTOP: Use 'View as' to simulate each role and verify visible data",
      "6. PUBLISH AND ASSIGN: In Service, assign Azure AD users/groups to each role",
    ],
    examTips: [
      "USERPRINCIPALNAME() returns the logged-in user's email — core function for dynamic RLS",
      "RLS filters propagate through relationships — one filter on a dimension filters the whole model",
      "Model owners and workspace admins bypass RLS — don't rely on them for testing",
      "Static RLS uses hardcoded values; Dynamic RLS uses USERPRINCIPALNAME() — know the difference",
    ],
    relatedTopics: [
      { name: "Row-level security", section: "Security" },
      { name: "USERPRINCIPALNAME", section: "DAX" },
      { name: "Role management", section: "Security" },
    ],
  },
  {
    id: "scenario-md-8",
    title: "Optimizing model size with proper data types",
    domain: "model_data",
    difficulty: "Easy",
    context: "Your imported model is 2GB and hitting Premium capacity limits. Analysis shows large text columns, unnecessary columns, and high-cardinality columns with GUIDs being imported into the model.",
    question: "What strategies reduce model size without losing functionality?",
    approach: [
      "1. REMOVE UNUSED COLUMNS: Delete columns not used in any visual, measure, or relationship",
      "2. REDUCE CARDINALITY: Replace GUIDs with integer surrogate keys in Power Query",
      "3. OPTIMIZE TEXT: Shorten long text columns or move them to a separate detail table",
      "4. USE PROPER TYPES: Ensure numeric columns aren't stored as text (text takes more memory)",
      "5. AVOID CALCULATED COLUMNS: Replace with measures where possible — calculated columns consume memory",
      "6. CHECK WITH DAX STUDIO: Use VertiPaq Analyzer to identify the largest columns by size",
    ],
    examTips: [
      "The VertiPaq engine compresses data by column — fewer unique values = better compression",
      "Integer keys compress far better than GUID strings — always prefer integer keys",
      "Calculated columns are materialized and stored — measures are computed at query time",
      "The exam tests knowledge of which strategies actually reduce model size vs. just query time",
    ],
    relatedTopics: [
      { name: "Model optimization", section: "Performance" },
      { name: "VertiPaq compression", section: "Engine" },
      { name: "DAX Studio", section: "External Tools" },
    ],
  },

  // ── VISUALIZE & ANALYZE ───────────────────────────────
  {
    id: "scenario-4",
    title: "Design an interactive dashboard with proper slicers",
    domain: "visualize_analyze",
    difficulty: "Medium",
    context: "Your sales manager needs a dashboard showing sales by region, product, and month. They want to click a region and see only that region's products. How do you design the interactions?",
    question: "What's the best approach to set up slicers and visual interactions?",
    approach: [
      "1. IDENTIFY REQUIRED SLICERS: Region, Product, Date range—decide which are essential vs. optional",
      "2. CONSIDER FILTER PROPAGATION: When Region is selected, should Product list update? (Usually yes for UX)",
      "3. CREATE SLICER VISUALS: Add slicers that connect to the appropriate dimension tables",
      "4. CONFIGURE VISUAL INTERACTIONS: Set filters from slicer to impact relevant visuals (map, table, chart)",
      "5. DISABLE UNNECESSARY INTERACTIONS: Don't let Date slicer affect the product list—that's confusing",
      "6. TEST USER FLOWS: Walk through: 'user selects region → product list updates → maps update'",
      "7. CONSIDER PERFORMANCE: With 1M+ rows, check if slicers are slow to load—use Top N or defaults",
    ],
    examTips: [
      "The exam tests whether you understand user experience—not every visual needs to interact",
      "Know the difference between slicer interactions and visual interactions—they're separate",
      "Consider performance implications: slicers on high-cardinality columns are slow",
      "Bookmarks can supplement slicers for preset views (e.g., 'Top 10 Products')",
    ],
    relatedTopics: [
      { name: "Slicers and filters", section: "Interactive Features" },
      { name: "Visual interactions", section: "Report Interactivity" },
      { name: "Performance optimization", section: "Report Design" },
    ],
  },
  {
    id: "scenario-6",
    title: "Optimize a slow-loading report",
    domain: "visualize_analyze",
    difficulty: "Hard",
    context: "A report with 15 visuals takes 30+ seconds to load. Users are complaining and adoption is dropping. The dataset has 100M rows across 20 tables.",
    question: "What's your systematic approach to diagnosing and fixing performance?",
    approach: [
      "1. USE PERFORMANCE ANALYZER: Identify which visuals are slow—DAX query time vs. visual rendering time",
      "2. CHECK THE DATA MODEL: Look for unnecessary columns, high-cardinality dimensions, and complex relationships",
      "3. OPTIMIZE DAX: Review measures for inefficient patterns—nested CALCULATE, excessive FILTER, etc.",
      "4. REDUCE VISUAL COUNT: Consider splitting into multiple pages or using drillthrough instead of showing everything",
      "5. IMPLEMENT AGGREGATIONS: Pre-aggregate large tables to reduce query load for common scenarios",
      "6. TEST INCREMENTALLY: Fix one issue at a time and measure improvement after each change",
    ],
    examTips: [
      "The exam expects you to know Performance Analyzer as the first diagnostic tool",
      "Know the difference between DAX query time and visual rendering time—they require different fixes",
      "Aggregations are a key exam topic—understand user-defined vs. automatic aggregations",
      "Consider DirectQuery with aggregations as a hybrid approach for very large datasets",
    ],
    relatedTopics: [
      { name: "Performance Analyzer", section: "Report Optimization" },
      { name: "Aggregations", section: "Model Optimization" },
      { name: "DAX optimization", section: "Advanced DAX" },
    ],
  },
  {
    id: "scenario-va-1",
    title: "Choosing the right chart type for comparison",
    domain: "visualize_analyze",
    difficulty: "Easy",
    context: "Your marketing team needs to compare campaign performance across 8 channels over 12 months. They want to see both the trend over time and the total per channel. The audience is non-technical executives.",
    question: "Which visual types best communicate this comparison?",
    approach: [
      "1. IDENTIFY THE GOAL: Trend over time (line) + total comparison (bar) — two complementary views",
      "2. USE LINE CHART: Show 12-month trend with one line per channel for trend analysis",
      "3. ADD BAR CHART: Clustered bar chart for total-per-channel comparison side by side",
      "4. CONSIDER COMBO CHART: If space is limited, a line-and-clustered-column combo shows both in one visual",
      "5. SIMPLIFY FOR AUDIENCE: Limit to top 5 channels, group others into 'Other' to reduce clutter",
      "6. ADD CONTEXT: Include data labels on key points and a title that states the insight, not just the topic",
    ],
    examTips: [
      "The exam tests whether you pick the visual that matches the analytical task (compare, trend, distribute, relate)",
      "Line charts = trends over time; Bar charts = comparing categories; Pie/donut = part-to-whole (use sparingly)",
      "Too many series on a line chart makes it unreadable — 5-7 lines maximum",
      "Combo charts are excellent for showing two related but different measures (e.g., revenue line + volume bars)",
    ],
    relatedTopics: [
      { name: "Chart selection", section: "Visual Design" },
      { name: "Combo charts", section: "Visualization Types" },
      { name: "Best practices", section: "Report Design" },
    ],
  },
  {
    id: "scenario-va-2",
    title: "Implementing drillthrough and drill-down hierarchy",
    domain: "visualize_analyze",
    difficulty: "Medium",
    context: "Your executive report shows Revenue by Country. Executives want to click a country and see a detailed breakdown by City → Store → Product. They also want a separate drillthrough page for individual store KPIs.",
    question: "How do you set up both drill-down hierarchy and drillthrough?",
    approach: [
      "1. CREATE HIERARCHY: In the Geography table, create Country → City → Store hierarchy",
      "2. ADD TO VISUAL: Use the hierarchy in a bar chart — drill-down buttons appear automatically",
      "3. CONFIGURE DRILL MODE: Choose between 'drill down all' and 'drill into specific item'",
      "4. CREATE DRILLTHROUGH PAGE: Build a Store KPI page with detailed metrics",
      "5. ADD DRILLTHROUGH FIELD: Drag Store[StoreName] into the drillthrough well on the KPI page",
      "6. TEST BOTH PATHS: Verify drill-down navigates the hierarchy; drillthrough opens the detail page",
    ],
    examTips: [
      "Drill-down expands a hierarchy within the same visual — drillthrough navigates to a different page",
      "The exam loves asking the difference — drill-down is visual-level, drillthrough is page-level",
      "Drillthrough automatically adds a back button — don't manually create one",
      "Cross-report drillthrough allows drilling from one report to another — requires same semantic model or published dataset",
    ],
    relatedTopics: [
      { name: "Drill-down", section: "Hierarchies" },
      { name: "Drillthrough", section: "Navigation" },
      { name: "Cross-report drillthrough", section: "Advanced Navigation" },
    ],
  },
  {
    id: "scenario-va-3",
    title: "Designing an accessible report with proper contrast",
    domain: "visualize_analyze",
    difficulty: "Medium",
    context: "Your organization mandates WCAG 2.1 AA compliance for all reports. A visually impaired user reported they can't navigate the report with a screen reader, and colorblind users can't distinguish chart series.",
    question: "What accessibility improvements must you implement?",
    approach: [
      "1. ADD ALT TEXT: Set meaningful alt text on every visual describing the data insight, not just the chart type",
      "2. SET TAB ORDER: In Selection pane, configure logical tab order so keyboard users navigate sequentially",
      "3. FIX COLOR CONTRAST: Ensure 4.5:1 contrast ratio for text and 3:1 for graphical elements",
      "4. USE PATTERNS: Add patterns or markers to chart series — don't rely on color alone for distinction",
      "5. ADD DATA LABELS: Include text labels so data is readable without relying on color or position",
      "6. TEST WITH TOOLS: Run the Accessibility checker and test with Narrator/NVDA screen reader",
    ],
    examTips: [
      "Alt text supports dynamic values using DAX measures — e.g., 'Sales are [TotalSales] this month'",
      "Tab order is set in the Selection pane — items at the top are tabbed to first",
      "The exam tests knowledge of the Accessibility checker tool in Power BI Desktop",
      "Themes can enforce accessible color palettes across all visuals automatically",
    ],
    relatedTopics: [
      { name: "Accessibility", section: "Report Design" },
      { name: "Alt text", section: "Accessibility" },
      { name: "Keyboard navigation", section: "Accessibility" },
    ],
  },
  {
    id: "scenario-va-4",
    title: "Building a paginated report for print distribution",
    domain: "visualize_analyze",
    difficulty: "Medium",
    context: "Your accounting team needs pixel-perfect invoices that print exactly as designed — consistent headers, footers, page breaks, and table formatting. They currently use SSRS. Each invoice must show only that customer's data.",
    question: "How do you create a paginated report for this use case?",
    approach: [
      "1. USE POWER BI REPORT BUILDER: Open Report Builder — it's designed for paginated (pixel-perfect) reports",
      "2. CONNECT TO DATASET: Use a shared Power BI dataset or direct SQL connection",
      "3. ADD PARAMETER: Create a CustomerID parameter to filter each invoice to one customer",
      "4. DESIGN LAYOUT: Add header (logo, date), tablix for line items, and footer (totals, page numbers)",
      "5. SET PAGE BREAKS: Configure group-level page breaks so each customer starts on a new page",
      "6. PUBLISH: Upload to Power BI Service workspace — users can export to PDF, Word, or Excel",
    ],
    examTips: [
      "Paginated reports are for pixel-perfect, printable layouts — interactive reports are for dashboards",
      "Report Builder creates .rdl files — different from .pbix Power BI Desktop files",
      "Paginated reports require Premium, PPU, or Fabric capacity to host in the Service",
      "Know when to use paginated vs. interactive: invoices, compliance forms, mail-merge = paginated",
    ],
    relatedTopics: [
      { name: "Paginated reports", section: "Report Types" },
      { name: "Report Builder", section: "Tools" },
      { name: "Parameters", section: "Report Configuration" },
    ],
  },
  {
    id: "scenario-va-5",
    title: "Using Q&A and AI visuals for self-service analytics",
    domain: "visualize_analyze",
    difficulty: "Easy",
    context: "Business users want to ask ad-hoc questions about data without waiting for developers to build new visuals. Your model has well-defined relationships and clean column names.",
    question: "How do you enable natural language querying with Q&A?",
    approach: [
      "1. ADD Q&A VISUAL: Insert the Q&A visual onto the report page",
      "2. OPTIMIZE NAMES: Rename columns to business-friendly names (e.g., 'Amt' → 'Sales Amount')",
      "3. ADD SYNONYMS: In model view, add synonyms for common terms (e.g., 'revenue' = Sales Amount)",
      "4. CONFIGURE FEATURED QUESTIONS: Add pre-built questions users can click as starting points",
      "5. TEST QUERIES: Try 'show sales by region last quarter' and verify correct interpretation",
      "6. ADD SMART NARRATIVE: Place a Smart Narrative visual to auto-generate text summaries",
    ],
    examTips: [
      "Q&A works best with clean, descriptive column and table names — avoid codes and abbreviations",
      "Synonyms are defined in the model and help Q&A understand domain-specific language",
      "Featured questions appear as suggestions in the Q&A visual — great for guiding users",
      "Q&A can generate visuals that users pin to a dashboard — it's a self-service enabler",
    ],
    relatedTopics: [
      { name: "Q&A visual", section: "AI Features" },
      { name: "Synonyms", section: "Model Configuration" },
      { name: "Smart Narrative", section: "AI Visuals" },
    ],
  },
  {
    id: "scenario-va-6",
    title: "Configuring conditional formatting for data-driven visuals",
    domain: "visualize_analyze",
    difficulty: "Easy",
    context: "Your KPI table shows metrics across departments. Management wants: red/green icons for status, gradient backgrounds for performance scores, and bold formatting for values exceeding targets.",
    question: "How do you apply multiple conditional formatting rules?",
    approach: [
      "1. ICON SETS: Select the Status column → Conditional formatting → Icons → set rules (✓ for on-track, ✕ for behind)",
      "2. BACKGROUND GRADIENT: On Performance Score → Background color → Gradient → set min/mid/max colors",
      "3. FONT COLOR: On Amount column → Font color → Rules → bold red when value > target",
      "4. DATA BARS: Add data bars to numeric columns for inline bar-chart effect",
      "5. FIELD-BASED FORMATTING: Use a DAX measure returning color hex codes for fully dynamic formatting",
      "6. TEST EDGE CASES: Check how formatting behaves with nulls, zeros, and extreme values",
    ],
    examTips: [
      "Conditional formatting supports: background color, font color, data bars, icons, and web URL",
      "Rules-based (thresholds) vs. gradient (continuous) — know when each is appropriate",
      "Field-based formatting uses a measure returning colors — most flexible but requires DAX",
      "Conditional formatting applies per-column in tables/matrices — each column can have different rules",
    ],
    relatedTopics: [
      { name: "Conditional formatting", section: "Visual Formatting" },
      { name: "KPI visuals", section: "Visualization Types" },
      { name: "DAX for formatting", section: "Advanced Measures" },
    ],
  },
  {
    id: "scenario-va-7",
    title: "Creating bookmarks for guided storytelling",
    domain: "visualize_analyze",
    difficulty: "Medium",
    context: "Your quarterly business review requires a guided presentation flow: overview → regional deep-dive → action items. Each view has different filter states, visible visuals, and highlighted data points.",
    question: "How do you use bookmarks to create a presentation-ready report?",
    approach: [
      "1. DESIGN EACH STATE: Configure the report page for each 'slide' — set filters, show/hide visuals",
      "2. CAPTURE BOOKMARKS: For each state, create a bookmark capturing Data, Display, and Current Page",
      "3. ADD NAVIGATION BUTTONS: Create Previous/Next buttons assigned to bookmark actions",
      "4. CREATE BOOKMARK NAVIGATOR: Use the Bookmark Navigator visual for a slide-picker bar",
      "5. CONFIGURE OPTIONS: Choose whether each bookmark captures data state, display state, or both",
      "6. TEST THE FLOW: Walk through the entire presentation to verify smooth transitions",
    ],
    examTips: [
      "Bookmarks capture three things: Data (filter state), Display (visibility), Current Page",
      "You can choose to capture only Display (for show/hide toggles) without affecting data filters",
      "Personal bookmarks vs. Report bookmarks — personal are user-specific, report are shared",
      "The Bookmark Navigator visual automatically creates a button bar from a bookmark group",
    ],
    relatedTopics: [
      { name: "Bookmarks", section: "Report Navigation" },
      { name: "Selection pane", section: "Visual Management" },
      { name: "Button actions", section: "Interactivity" },
    ],
  },
  {
    id: "scenario-va-8",
    title: "Implementing anomaly detection and forecasting",
    domain: "visualize_analyze",
    difficulty: "Hard",
    context: "Your operations team monitors daily transaction volumes. They need automatic alerts when volumes deviate significantly from expected patterns and a 30-day forecast for capacity planning.",
    question: "How do you add anomaly detection and forecasting to a line chart?",
    approach: [
      "1. CREATE LINE CHART: Plot daily transaction volume over time as a continuous line",
      "2. ENABLE ANOMALY DETECTION: In Analytics pane → Find Anomalies toggle → configure sensitivity",
      "3. ADJUST SENSITIVITY: Higher sensitivity flags more anomalies — tune based on business tolerance",
      "4. ADD FORECAST: In Analytics pane → Forecast → set forecast length to 30 points (days)",
      "5. CONFIGURE CONFIDENCE: Set confidence interval (95% default) — shown as a shaded band",
      "6. INVESTIGATE ANOMALIES: Click anomaly points to see possible explanations from the AI engine",
    ],
    examTips: [
      "Anomaly detection uses ML to identify statistically significant deviations automatically",
      "Forecasting uses exponential smoothing — it needs enough historical data to be reliable",
      "Both features are in the Analytics pane of line charts — not available on all visual types",
      "The exam tests knowledge of when AI features are appropriate vs. when manual analysis is needed",
    ],
    relatedTopics: [
      { name: "Anomaly detection", section: "AI Features" },
      { name: "Forecasting", section: "Analytics" },
      { name: "Analytics pane", section: "Visual Configuration" },
    ],
  },

  // ── DEPLOY & MAINTAIN (MANAGE & SECURE) ───────────────
  {
    id: "scenario-5",
    title: "Implement RLS for a multi-tenant sales org",
    domain: "deploy_maintain",
    difficulty: "Hard",
    context: "Your organization has 50 sales teams across different regions. Each team should only see their region's data. You need to implement RLS without breaking the data model.",
    question: "How would you structure RLS to handle multi-region access?",
    approach: [
      "1. CREATE MAPPING TABLE: Build a SecurityMapping table: UserEmail | Region | AccessLevel",
      "2. DESIGN RLS RULE: On Region dimension table, add rule: [RegionName] = USERNAME()",
      "3. TEST IN DESKTOP: Use 'View as' feature to test each user's visible data before publishing",
      "4. CONSIDER MANAGER ACCESS: Can regional managers see all regions? Use more complex rules if yes",
      "5. HANDLE DYNAMIC UPDATES: Refresh the mapping table when users change roles",
      "6. VALIDATE COMPLETENESS: Ensure no data leaks—users should only see their region's products",
      "7. MONITOR IN SERVICE: Check capacity usage—RLS can impact performance if too complex",
    ],
    examTips: [
      "RLS is applied at the row level—know it filters the underlying tables, not just visuals",
      "The exam often tests understanding of when RLS breaks—avoid applying RLS to both sides of a relationship",
      "Static RLS (hardcoded roles) vs. Dynamic RLS (USERNAME() function)—know the trade-offs",
      "Remember: RLS applies to all users in a role, but test with 'View as' to validate",
    ],
    relatedTopics: [
      { name: "Row-level security (RLS)", section: "Security" },
      { name: "Dynamic RLS", section: "Security Implementation" },
      { name: "Relationship modeling", section: "Data Modeling" },
    ],
  },
  {
    id: "scenario-7",
    title: "Set up deployment pipelines for dev/test/prod",
    domain: "deploy_maintain",
    difficulty: "Medium",
    context: "Your team develops reports in a development workspace, tests with sample data, then deploys to production. You need a structured process that prevents breaking production.",
    question: "How would you configure deployment pipelines in Power BI Service?",
    approach: [
      "1. CREATE THREE WORKSPACES: Development, Test, Production—each with appropriate access levels",
      "2. SET UP DEPLOYMENT PIPELINE: Link the three workspaces in order via Power BI deployment pipelines",
      "3. CONFIGURE RULES: Set parameter rules to change data sources between environments (dev DB → prod DB)",
      "4. ASSIGN ROLES: Developers get access to Dev, testers to Test, stakeholders to Production only",
      "5. DEPLOY AND VALIDATE: Push from Dev → Test, validate, then Test → Production",
      "6. MONITOR AND ROLLBACK: Have a rollback plan—keep previous versions accessible",
    ],
    examTips: [
      "Deployment pipelines require Premium or PPU capacity",
      "Know how parameter rules work—they allow data source switching between environments",
      "The exam tests understanding of workspace roles in context of deployment",
      "Incremental refresh settings persist across pipeline stages",
    ],
    relatedTopics: [
      { name: "Deployment pipelines", section: "Deployment and Maintenance" },
      { name: "Workspace management", section: "Workspace Configuration" },
      { name: "Refresh scheduling", section: "Deployment and Maintenance" },
    ],
  },
  {
    id: "scenario-dm-1",
    title: "Managing workspace roles and permissions",
    domain: "deploy_maintain",
    difficulty: "Easy",
    context: "Your organization has 30 report developers, 15 analysts who build their own visuals, and 200 viewers. You need to assign appropriate workspace permissions without over-granting access.",
    question: "How do you structure workspace roles for different user types?",
    approach: [
      "1. IDENTIFY USER GROUPS: Developers (build/publish), Analysts (edit reports), Viewers (consume only)",
      "2. ASSIGN ROLES: Developers → Contributor, Analysts → Contributor or Member, Viewers → Viewer",
      "3. USE SECURITY GROUPS: Map Azure AD groups to workspace roles instead of individual users",
      "4. SEPARATE WORKSPACES: Create separate workspaces for different departments if data is sensitive",
      "5. APP DISTRIBUTION: Publish a Power BI App from the workspace for Viewers — cleaner than direct workspace access",
      "6. AUDIT REGULARLY: Review workspace membership quarterly and remove departed users",
    ],
    examTips: [
      "Workspace roles hierarchy: Admin > Member > Contributor > Viewer",
      "Contributors can publish content but cannot manage workspace membership",
      "Members can publish AND add other members (but not admins)",
      "The exam tests which role can do what — memorize the permissions matrix",
    ],
    relatedTopics: [
      { name: "Workspace roles", section: "Administration" },
      { name: "Power BI Apps", section: "Content Distribution" },
      { name: "Azure AD groups", section: "Security" },
    ],
  },
  {
    id: "scenario-dm-2",
    title: "Configuring scheduled refresh and failure alerts",
    domain: "deploy_maintain",
    difficulty: "Easy",
    context: "Your dashboard is used in the 9 AM daily standup. Data must be refreshed by 8:30 AM. Currently, refresh sometimes fails silently and the team uses stale data without knowing.",
    question: "How do you ensure reliable, monitored data refresh?",
    approach: [
      "1. SCHEDULE REFRESH: In dataset settings, set refresh for 7:00 AM — allows buffer for retries",
      "2. CONFIGURE GATEWAY: Ensure the on-premises gateway is running and credentials are valid",
      "3. SET FAILURE NOTIFICATIONS: Add email addresses to receive refresh failure alerts",
      "4. ADD REFRESH HISTORY CHECK: Monitor the refresh history page for patterns (timeouts, credential expiry)",
      "5. IMPLEMENT RETRY LOGIC: If using dataflows, configure retry policies",
      "6. ADD DATA FRESHNESS VISUAL: Add a card showing 'Last Refreshed' timestamp on the report",
    ],
    examTips: [
      "Pro licenses allow up to 8 refreshes per day; Premium allows up to 48",
      "Refresh failures send email notifications only if configured — not automatic by default",
      "Gateway credential expiry is the #1 cause of refresh failures — set calendar reminders",
      "Enhanced refresh API (Premium) allows programmatic control of refresh from external tools",
    ],
    relatedTopics: [
      { name: "Scheduled refresh", section: "Data Refresh" },
      { name: "Gateway management", section: "Connectivity" },
      { name: "Monitoring", section: "Administration" },
    ],
  },
  {
    id: "scenario-dm-3",
    title: "Publishing and managing a Power BI App",
    domain: "deploy_maintain",
    difficulty: "Medium",
    context: "Your workspace has 15 reports. External stakeholders need access to 5 specific reports with a curated navigation experience. They shouldn't see work-in-progress or internal analytics.",
    question: "How do you publish a Power BI App with controlled content and audiences?",
    approach: [
      "1. SELECT CONTENT: Choose only the 5 stakeholder reports to include in the app",
      "2. CONFIGURE NAVIGATION: Arrange reports in logical sections with custom names and ordering",
      "3. SET AUDIENCE: Create an audience group and assign specific users or security groups",
      "4. CONFIGURE PERMISSIONS: Set whether audience can download data, share further, or only view",
      "5. PUBLISH APP: Publish and distribute the installation link to stakeholders",
      "6. UPDATE PROCESS: When content changes, update the app — users see changes on next visit",
    ],
    examTips: [
      "Apps provide a curated, read-only experience — separate from the workspace editing experience",
      "Multiple audiences can be configured with different report subsets per audience",
      "Users install apps from AppSource or via direct link — they don't need workspace access",
      "App updates are manual — you must explicitly 'Update app' after workspace changes",
    ],
    relatedTopics: [
      { name: "Power BI Apps", section: "Content Distribution" },
      { name: "App audiences", section: "Access Management" },
      { name: "Content packaging", section: "Deployment" },
    ],
  },
  {
    id: "scenario-dm-4",
    title: "Implementing sensitivity labels and data protection",
    domain: "deploy_maintain",
    difficulty: "Hard",
    context: "Your organization handles confidential financial data. Compliance requires that reports containing PII or financial data be labeled, encrypted when exported, and tracked for access. Microsoft Purview is available.",
    question: "How do you apply sensitivity labels in Power BI?",
    approach: [
      "1. ENABLE IN TENANT: Admin portal → Tenant settings → Enable sensitivity labels for Power BI",
      "2. DEFINE LABELS: In Microsoft Purview, create labels: Public, Internal, Confidential, Highly Confidential",
      "3. APPLY TO ARTIFACTS: In Power BI Service, set sensitivity labels on datasets, reports, and dashboards",
      "4. CONFIGURE INHERITANCE: Enable downstream inheritance — labels flow from dataset to reports",
      "5. ENFORCE EXPORT PROTECTION: Confidential labels prevent or encrypt exports to PDF/Excel",
      "6. AUDIT USAGE: Use Microsoft Purview audit logs to track who accessed labeled content",
    ],
    examTips: [
      "Sensitivity labels are part of Microsoft Information Protection (MIP) — integrated across M365",
      "Labels can be inherited downstream: dataset label → report → dashboard automatically",
      "Mandatory labeling can be enforced — users must label before saving",
      "The exam tests which export formats respect sensitivity labels (PDF encrypted, CSV not)",
    ],
    relatedTopics: [
      { name: "Sensitivity labels", section: "Data Protection" },
      { name: "Microsoft Purview", section: "Compliance" },
      { name: "Export policies", section: "Security" },
    ],
  },
  {
    id: "scenario-dm-5",
    title: "Monitoring usage metrics and adoption",
    domain: "deploy_maintain",
    difficulty: "Easy",
    context: "Leadership invested in Power BI and wants to see ROI. They need to know which reports are used, by whom, how often, and which are abandoned. You need to build an adoption tracking solution.",
    question: "How do you monitor and report on Power BI usage?",
    approach: [
      "1. USAGE METRICS REPORT: Open any report → View → Usage metrics report for built-in analytics",
      "2. COPY AND CUSTOMIZE: Copy the usage metrics report to customize views and add filters",
      "3. ADMIN API: Use the Power BI REST API to extract detailed activity logs programmatically",
      "4. AUDIT LOGS: Access unified audit logs in Microsoft 365 compliance center for security tracking",
      "5. BUILD ADOPTION DASHBOARD: Create a dedicated report visualizing trends, active users, and content popularity",
      "6. SET KPIs: Define adoption targets (e.g., 80% of licensed users active monthly) and track progress",
    ],
    examTips: [
      "Usage metrics reports show views, viewers, and performance data per report",
      "The Admin API provides tenant-wide activity data — more comprehensive than per-report metrics",
      "Audit logs capture security events: sharing, access changes, export actions",
      "The exam tests which data source provides which type of usage information",
    ],
    relatedTopics: [
      { name: "Usage metrics", section: "Administration" },
      { name: "Activity logs", section: "Monitoring" },
      { name: "Admin API", section: "Programmatic Access" },
    ],
  },
  {
    id: "scenario-dm-6",
    title: "Managing dataset certification and endorsement",
    domain: "deploy_maintain",
    difficulty: "Medium",
    context: "Your organization has 500+ datasets. Users don't know which are authoritative vs. experimental. Finance data has 3 versions — users pick the wrong one frequently, causing incorrect reports.",
    question: "How do you establish a trusted dataset governance process?",
    approach: [
      "1. PROMOTE DATASETS: Mark validated datasets as 'Promoted' — signals they're recommended for use",
      "2. CERTIFY KEY DATASETS: Enable certification in Admin portal — only designated users can certify",
      "3. DEFINE CERTIFICATION PROCESS: Document criteria: data quality checks, refresh reliability, owner sign-off",
      "4. ADD DESCRIPTIONS: Add detailed descriptions and documentation links to certified datasets",
      "5. DISCOVER VIA HUB: Users search the data hub and see certified/promoted badges prominently",
      "6. RETIRE OLD VERSIONS: Remove or hide deprecated datasets to prevent confusion",
    ],
    examTips: [
      "Promoted = recommended by workspace members; Certified = verified by authorized users (admin-controlled)",
      "Certification is enabled in Admin portal → Tenant settings → Certification",
      "Certified datasets show a badge in the data hub and Get Data experience",
      "The exam tests the difference between promoted and certified — and who can do each",
    ],
    relatedTopics: [
      { name: "Dataset endorsement", section: "Governance" },
      { name: "Certification", section: "Data Quality" },
      { name: "Data hub", section: "Content Discovery" },
    ],
  },
  {
    id: "scenario-dm-7",
    title: "Implementing object-level security (OLS)",
    domain: "deploy_maintain",
    difficulty: "Hard",
    context: "Your HR model contains Salary, Bonus, and Performance Rating columns. All managers can see headcount and department data, but only HR and Finance should see compensation columns. RLS alone doesn't solve this.",
    question: "How do you restrict access at the column level using OLS?",
    approach: [
      "1. IDENTIFY SENSITIVE COLUMNS: Salary, Bonus, PerformanceRating in the Employee table",
      "2. OPEN TABULAR EDITOR: OLS is configured in Tabular Editor, not directly in Power BI Desktop",
      "3. CREATE ROLE: Create a 'Standard Manager' role that restricts access to sensitive columns",
      "4. SET COLUMN PERMISSIONS: Set Salary, Bonus, PerformanceRating to 'None' (hidden) for the role",
      "5. TEST IN DESKTOP: Verify that users in the role cannot see the restricted columns in any visual",
      "6. PUBLISH AND ASSIGN: Assign Azure AD users/groups to the OLS role in the Service",
    ],
    examTips: [
      "OLS restricts column visibility — RLS restricts row visibility — they solve different problems",
      "OLS is defined in the model using Tabular Editor or XMLA endpoint — not in the Power BI Desktop UI",
      "If a visual references a restricted column, users see an error — not just hidden data",
      "OLS + RLS can be combined in the same role for comprehensive security",
    ],
    relatedTopics: [
      { name: "Object-level security", section: "Security" },
      { name: "Tabular Editor", section: "External Tools" },
      { name: "Column-level access", section: "Data Protection" },
    ],
  },
  {
    id: "scenario-dm-8",
    title: "Setting up alerts and subscriptions for stakeholders",
    domain: "deploy_maintain",
    difficulty: "Easy",
    context: "Your CEO wants to receive an email every Monday with the weekly KPI dashboard. The operations manager wants a real-time alert when inventory drops below 100 units for any product.",
    question: "How do you configure subscriptions and data-driven alerts?",
    approach: [
      "1. CREATE SUBSCRIPTION: On the report in Service → Subscribe → set schedule (Monday 8 AM)",
      "2. CONFIGURE RECIPIENTS: Add CEO's email and format (full report page or specific visual)",
      "3. SET UP ALERT: On a dashboard tile (gauge or card), click '…' → Manage alerts",
      "4. DEFINE THRESHOLD: Set alert when inventory value is below 100, check frequency = hourly",
      "5. ADD FLOW INTEGRATION: Optionally trigger a Power Automate flow from the alert for Teams/Slack notification",
      "6. TEST BOTH: Verify subscription email arrives and alert fires when test data crosses the threshold",
    ],
    examTips: [
      "Subscriptions work on reports and paginated reports — delivery is on a schedule",
      "Alerts work on dashboard tiles only — specifically KPI, gauge, and card visuals",
      "Alerts check on data refresh — frequency setting determines check interval between refreshes",
      "Power Automate integration enables complex workflows triggered by alert conditions",
    ],
    relatedTopics: [
      { name: "Subscriptions", section: "Content Distribution" },
      { name: "Data alerts", section: "Monitoring" },
      { name: "Power Automate", section: "Integration" },
    ],
  },
];

export default function ExamScenarios() {
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({
    prepare_data: true,
    model_data: true,
    visualize_analyze: true,
    deploy_maintain: true,
  });
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("exam-scenarios-completed");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });

  const toggleComplete = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("exam-scenarios-completed", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const toggleDomain = (domain: string) => {
    setExpandedDomains((prev) => ({ ...prev, [domain]: !prev[domain] }));
  };

  const filtered = scenarios.filter(
    (s) => filterDifficulty === "all" || s.difficulty === filterDifficulty
  );

  const grouped = Object.keys(domainLabels).reduce<Record<string, Scenario[]>>((acc, domain) => {
    acc[domain] = filtered.filter((s) => s.domain === domain);
    return acc;
  }, {});

  const getDifficultyColor = (difficulty: string) => {
    return difficulty === "Hard"
      ? "bg-destructive/10 text-destructive"
      : difficulty === "Medium"
      ? "bg-chart-5/10 text-chart-5"
      : "bg-chart-4/10 text-chart-4";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Exam Scenario Questions</h1>
        <p className="text-muted-foreground">Real-world scenarios with step-by-step guidance on solving them</p>
        <p className="text-sm text-primary font-medium mt-1">{completed.size}/{scenarios.length} completed</p>
      </div>

      <div className="flex gap-2">
        {["all", "Easy", "Medium", "Hard"].map((diff) => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filterDifficulty === diff
                ? "bg-primary text-primary-foreground shadow"
                : "bg-card border border-border text-foreground hover:border-primary/30"
            )}
          >
            {diff === "all" ? "All Difficulties" : diff}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([domain, domainScenarios]) => {
          if (domainScenarios.length === 0) return null;
          const Icon = domainIcons[domain];
          const isDomainOpen = expandedDomains[domain];
          return (
            <div key={domain}>
              <button
                onClick={() => toggleDomain(domain)}
                className="w-full mb-3 flex items-center gap-3 p-3 bg-card border-2 border-border rounded-lg hover:border-primary/30 transition-colors text-left"
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br flex-shrink-0", domainColors[domain])}>
                  <Icon className="w-4 h-4 text-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-foreground">{domainLabels[domain]}</h2>
                  <p className="text-xs text-muted-foreground">{domainScenarios.filter(s => completed.has(s.id)).length}/{domainScenarios.length} completed</p>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform", isDomainOpen ? "rotate-180" : "")} />
              </button>

              {isDomainOpen && (
                <div className="space-y-3 pl-2">
                  {domainScenarios.map((scenario) => {
                    const isExpanded = expandedScenario === scenario.id;
                    return (
                      <Card key={scenario.id} className={cn("overflow-hidden", completed.has(scenario.id) && "border-chart-4/40")}>
                        <button
                          onClick={() => setExpandedScenario(isExpanded ? null : scenario.id)}
                          className="w-full p-4 text-left hover:bg-secondary/50 transition-colors flex items-start justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <Badge className={getDifficultyColor(scenario.difficulty)}>{scenario.difficulty}</Badge>
                              {completed.has(scenario.id) && <Badge className="bg-chart-4/10 text-chart-4">✓ Done</Badge>}
                            </div>
                            <h3 className={cn("font-semibold text-lg", completed.has(scenario.id) ? "text-muted-foreground" : "text-foreground")}>{scenario.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2">{scenario.context}</p>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                          )}
                        </button>

                        {isExpanded && (
                          <CardContent className="p-4 border-t border-border bg-secondary/20 space-y-6">
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                The Exam Question
                              </h4>
                              <p className="text-foreground">{scenario.question}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-chart-5" />
                                Step-by-Step Approach
                              </h4>
                              <div className="space-y-2">
                                {scenario.approach.map((step, idx) => (
                                  <div key={idx} className="flex gap-3 p-3 bg-card border border-border rounded-lg">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                      {idx + 1}
                                    </div>
                                    <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {scenario.sampleDAX && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Sample DAX Formula</h4>
                                <pre className="bg-[hsl(var(--navy))] text-[hsl(0,0%,90%)] p-4 rounded-lg text-xs overflow-x-auto">
                                  {scenario.sampleDAX}
                                </pre>
                              </div>
                            )}

                            <div>
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-chart-4" />
                                Exam Tips & Common Pitfalls
                              </h4>
                              <ul className="space-y-2">
                                {scenario.examTips.map((tip, idx) => (
                                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground p-3 bg-chart-4/5 border border-chart-4/20 rounded-lg">
                                    <span className="text-chart-4 font-bold flex-shrink-0">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <button
                              onClick={(e) => toggleComplete(scenario.id, e)}
                              className={cn(
                                "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                completed.has(scenario.id)
                                  ? "bg-chart-4/10 text-chart-4 hover:bg-destructive/10 hover:text-destructive"
                                  : "bg-primary/10 text-primary hover:bg-primary/20"
                              )}
                            >
                              <Check className="w-4 h-4" />
                              {completed.has(scenario.id) ? "Completed — click to undo" : "Mark as Complete"}
                            </button>

                            <div>
                              <h4 className="font-semibold text-foreground mb-3">Related Syllabus Topics</h4>
                              <div className="flex flex-wrap gap-2">
                                {scenario.relatedTopics.map((topic, idx) => (
                                  <Link
                                    key={idx}
                                    to={`${createPageUrl("Syllabus")}?domain=${scenario.domain}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors"
                                  >
                                    {topic.name}
                                    <ChevronRight className="w-3 h-3" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No scenarios match your filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
