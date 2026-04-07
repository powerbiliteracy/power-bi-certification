const questions = [
  {
    id: 1,
    phase: "Get or Connect to Data",
    scenario: "Your organization's BI team has published a certified 'Corporate Sales' semantic model in a central workspace. You need to build a new report using this model but don't have access to the workspace. You find the model in the Data Hub.",
    question: "How do you connect to a shared semantic model from Power BI Desktop?",
    options: [
      "Export the dataset as CSV and import it into a new .pbix file",
      "Ask an Admin to copy the dataset into your workspace",
      "In Power BI Desktop, select Get Data → Power BI semantic models, browse to the shared model in the Data Hub, and connect using a live connection — your report stays linked and always reflects the latest model",
      "Re-create the model from scratch using the same data sources"
    ],
    correctIndex: 2,
    explanation: "Power BI Desktop supports connecting to published semantic models via Get Data → Power BI semantic models. This creates a live connection where your report inherits all measures, relationships, and RLS from the shared model. You need at least 'Build' permission on the model. This promotes reuse of certified, governed models.",
    microsoftLinks: [
      { text: "Use datasets across workspaces", url: "https://learn.microsoft.com/power-bi/connect-data/service-datasets-across-workspaces" },
      { text: "Data Hub", url: "https://learn.microsoft.com/power-bi/connect-data/service-data-hub" }
    ]
  },
  {
    id: 2,
    phase: "Prepare the Data",
    scenario: "You're loading a large product catalog from an Azure SQL Database. When you profile the 'ProductCode' column in Power Query, Column Distribution shows 8,542 distinct values but 8,540 total rows — meaning some codes appear more than once. Column Quality shows 0% errors and 0% empty.",
    question: "What does this profiling result indicate, and what should you investigate?",
    options: [
      "The data is clean — no action needed",
      "There are duplicate ProductCode values (since distinct > unique rows would be impossible, re-check: more distinct than rows means the column has near-unique but some duplicates require investigation for deduplication before creating a dimension table)",
      "This is a Power Query calculation error — refresh the profile",
      "The column should be changed from Text to Integer type"
    ],
    correctIndex: 1,
    explanation: "Column Distribution showing more distinct values than rows is a statistical indicator requiring investigation. In practice, if this is intended as a primary key for a dimension table, duplicates would break relationship integrity. Use Group By to count occurrences per ProductCode and identify which codes have more than one row before building relationships.",
    microsoftLinks: [
      { text: "Column profiling tools", url: "https://learn.microsoft.com/power-query/data-profiling-tools" },
      { text: "Column quality and distribution", url: "https://learn.microsoft.com/power-query/data-profiling-tools#column-distribution" }
    ]
  },
  {
    id: 3,
    phase: "Transform and Load the Data",
    scenario: "You have a 'Transactions' table in Power Query with 5M rows. You need a separate 'Monthly Summary' table for a summary report and a 'Detail' table for a drill-through page. Both share the same source and initial cleaning steps.",
    question: "How do you create these two tables efficiently without duplicating transformation logic?",
    options: [
      "Create two separate queries both connecting to the original SQL source",
      "Create the shared cleaning steps in one query named 'TransactionsBase', disable its load, then create Reference queries for 'Monthly Summary' (add Group By) and 'Detail' (add additional filters) — both inherit the base transformations",
      "Duplicate the Transactions query and apply different transformations to each copy",
      "Create both tables in DAX using SUMMARIZE and CALCULATETABLE"
    ],
    correctIndex: 1,
    explanation: "Reference queries with disabled base loading is the optimal pattern. 'TransactionsBase' runs once; both downstream queries use its output. Duplicate queries re-execute all steps including the source query, doubling load. Disabling load on the base query means it only exists to feed downstream queries without adding a third table to the model.",
    microsoftLinks: [
      { text: "Reference vs duplicate queries", url: "https://learn.microsoft.com/power-query/duplicate-reference-queries" },
      { text: "Disable query load", url: "https://learn.microsoft.com/power-query/disable-query-load" }
    ]
  },
  {
    id: 4,
    phase: "Model the Data",
    scenario: "After building your model, measures that use TOTALYTD and SAMEPERIODLASTYEAR return wrong results. You investigate and find your Date table has gaps — it's missing all weekends and holidays because it was generated from the transactions table (only days with sales).",
    question: "How do you fix the Date table to support time intelligence?",
    options: [
      "Add a filter to all time intelligence measures to exclude weekends",
      "Replace the transaction-derived date list with a contiguous date table using CALENDAR(DATE(2020,1,1), DATE(2025,12,31)) or CALENDARAUTO() in DAX, or generate a full date sequence in Power Query covering all calendar dates without gaps",
      "Use DATEADD instead of SAMEPERIODLASTYEAR — it works without a complete date table",
      "Mark the existing date table as a Date Table and the gaps will be filled automatically"
    ],
    correctIndex: 1,
    explanation: "Time intelligence functions require a contiguous, gap-free date table. Missing dates cause functions like SAMEPERIODLASTYEAR to misalign periods. CALENDAR() generates a complete sequence of dates; CALENDARAUTO() infers the range from the model. Always build date tables from a sequence generator, not from existing data.",
    microsoftLinks: [
      { text: "Create date tables with DAX", url: "https://learn.microsoft.com/power-bi/guidance/model-date-tables" },
      { text: "CALENDARAUTO function", url: "https://learn.microsoft.com/dax/calendarauto-function-dax" }
    ]
  },
  {
    id: 5,
    phase: "DAX — Statistical Functions",
    scenario: "You're building a performance review report. You need measures for: (1) average deal size, (2) median deal size (to avoid outlier skew), (3) count of deals above the 75th percentile threshold. Your Sales table has a DealAmount column.",
    question: "Which DAX functions support these statistical calculations?",
    options: [
      "Only AVERAGE is available in DAX — median and percentile require Python visuals",
      "AVERAGE for mean, MEDIANX(Sales, Sales[DealAmount]) for median, PERCENTILEX.INC(Sales, Sales[DealAmount], 0.75) for 75th percentile — all native DAX statistical functions",
      "Use AVERAGEX for all three with different filter conditions",
      "Statistical functions beyond mean require premium AI features"
    ],
    correctIndex: 1,
    explanation: "DAX includes statistical functions beyond basic aggregations. MEDIANX iterates over a table and calculates the median. PERCENTILEX.INC and PERCENTILEX.EXC calculate percentile values. These enable descriptive statistics directly in measures without external tools.",
    microsoftLinks: [
      { text: "Statistical functions in DAX", url: "https://learn.microsoft.com/dax/statistical-functions-dax" },
      { text: "MEDIANX function", url: "https://learn.microsoft.com/dax/medianx-function-dax" }
    ]
  },
  {
    id: 6,
    phase: "Calculated Tables",
    scenario: "You need a 'Top 10 Products by Sales' table that's used as a dimension in your model (for filtering and slicers), not just for display in a visual. The top 10 should reflect all-time totals and be static after model refresh.",
    question: "How do you create this as a calculated table?",
    options: [
      "Use a Top N filter on a table visual",
      "Create a Power Query table with a manual list of product names",
      "Create a calculated table: Top10Products = TOPN(10, VALUES(Product[Name]), CALCULATE([Total Sales], ALL(Dates)))",
      "Use field parameters to dynamically select top 10 products"
    ],
    correctIndex: 2,
    explanation: "Calculated tables are created using DAX expressions and materialize as actual tables in the model. TOPN returns the top N rows based on a measure. This table can be used in relationships and slicers just like any other table. Unlike visual-level Top N filters, this affects the entire model where the table is used.",
    microsoftLinks: [
      { text: "Calculated tables", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-calculated-tables" },
      { text: "TOPN function", url: "https://learn.microsoft.com/dax/topn-function-dax" }
    ]
  },
  {
    id: 7,
    phase: "Visualize the Data",
    scenario: "Your report has a slicer for Year and a slicer for Region on the same page. You want the Year slicer to affect all visuals on the page, but the Region slicer should only affect 2 of the 4 visuals — the other 2 should always show all regions.",
    question: "How do you configure this selective interaction?",
    options: [
      "This isn't possible — slicers always filter all visuals on a page",
      "Select the Region slicer, go to Format → Edit interactions, then set the interaction mode to 'None' on the two visuals that should not be filtered by Region",
      "Use two separate pages and bookmarks to switch between filtered and unfiltered views",
      "Write DAX measures with ALL(Region) in the unaffected visuals"
    ],
    correctIndex: 1,
    explanation: "Edit Interactions (Format ribbon → Edit interactions) gives you per-visual control over how each slicer or chart affects other visuals. You can set each interaction to Filter, Highlight, or None. Selecting the Region slicer and setting None on two visuals makes them immune to Region selections while still responding to Year.",
    microsoftLinks: [
      { text: "Visual interactions", url: "https://learn.microsoft.com/power-bi/create-reports/service-reports-visual-interactions" }
    ]
  },
  {
    id: 8,
    phase: "Copilot — Summarize the Model",
    scenario: "A new analyst joins your team and needs to quickly understand what a complex semantic model contains — its measures, key dimensions, and what analytical questions it can answer — without reading documentation or exploring every table manually.",
    question: "How can Copilot help them understand the semantic model?",
    options: [
      "Copilot can only help with creating visuals, not explaining models",
      "Use Copilot's 'Summarize the underlying semantic model' capability — it reads the model's schema, measures, and relationships and generates a plain-language description of what data is available and what analytical questions the model supports",
      "Export the model schema to PDF and have Copilot summarize the PDF",
      "Copilot requires the model creator to write documentation first"
    ],
    correctIndex: 1,
    explanation: "Copilot in Power BI can analyze and describe the structure of a semantic model in plain language. This includes identifying key measures, dimension tables, relationships, and analytical capabilities. It's particularly valuable for self-service users who need to understand available data without deep BI expertise.",
    microsoftLinks: [
      { text: "Copilot and semantic models", url: "https://learn.microsoft.com/power-bi/create-reports/copilot-introduction" }
    ]
  },
  {
    id: 9,
    phase: "Optimize Performance",
    scenario: "Your model has a 'Sales' fact table (20M rows) and a 'Products' table (100K rows). Your DAX measure SalesByCategory = CALCULATE([Total Sales], FILTER(Products, Products[Category] = \"Electronics\")) is extremely slow.",
    question: "What's the performance issue and fix?",
    options: [
      "The relationship between Sales and Products is configured incorrectly",
      "FILTER(Products, ...) with a hard-coded string is acceptable — the model needs more memory",
      "Replace FILTER with a direct filter argument: SalesByCategory = CALCULATE([Total Sales], Products[Category] = \"Electronics\") — DAX converts this to a highly optimized storage engine query instead of iterating the Products table row-by-row",
      "Pre-filter the Products table in Power Query to only include Electronics"
    ],
    correctIndex: 2,
    explanation: "Using FILTER() as a CALCULATE argument forces the formula engine to iterate every row of the filtered table. Using a simple column filter (Products[Category] = \"Electronics\") as a direct CALCULATE argument converts to a highly optimized storage engine operation. This is one of the most impactful DAX performance improvements.",
    microsoftLinks: [
      { text: "Avoid FILTER as filter argument", url: "https://learn.microsoft.com/power-bi/guidance/dax-avoid-avoid-filter-as-filter-argument" }
    ]
  },
  {
    id: 10,
    phase: "Manage and Secure Power BI",
    scenario: "Your organization wants to prevent individual users from publishing Power BI Desktop reports to 'My Workspace' and instead require all content to be in governed team workspaces. This is a tenant-wide policy.",
    question: "Where and how is this configured?",
    options: [
      "Configure it in each user's Power BI Desktop settings",
      "In the Power BI Admin Portal (Tenant settings), configure 'Publish to My Workspace' to be disabled for the organization, and optionally restrict it to specific security groups",
      "Remove users' Power BI Pro licenses",
      "Apply workspace-level settings to block publishing"
    ],
    correctIndex: 1,
    explanation: "Tenant settings in the Power BI Admin Portal control organization-wide capabilities. 'Publish to My Workspace' can be restricted or disabled to enforce publishing only to governed team workspaces. Admin Portal tenant settings can apply to the entire organization or be scoped to specific security groups.",
    microsoftLinks: [
      { text: "Power BI admin portal", url: "https://learn.microsoft.com/power-bi/admin/service-admin-portal" },
      { text: "Tenant settings", url: "https://learn.microsoft.com/power-bi/admin/service-admin-portal-about-tenant-settings" }
    ]
  },
  {
    id: 11,
    phase: "Incremental Refresh",
    scenario: "You're setting up incremental refresh for a Sales table (100M rows). You create RangeStart and RangeEnd parameters but when you publish and refresh, the entire 100M rows still reload each time. The source is SQL Server.",
    question: "What's the most likely cause?",
    options: [
      "Incremental refresh requires Premium capacity",
      "The RangeStart and RangeEnd parameters are not applied as filter steps on the date column in Power Query, so query folding pushes a date filter to SQL — without this filter, the entire table loads every refresh",
      "The parameters must be of type Text, not Date/Time",
      "SQL Server doesn't support incremental refresh"
    ],
    correctIndex: 1,
    explanation: "Incremental refresh requires that RangeStart and RangeEnd parameters are explicitly used in Power Query filter steps on the partition date column. Without these filter steps, Power BI can't generate range-specific SQL queries. The filter must fold to SQL: Table.SelectRows(Source, each [Date] >= RangeStart and [Date] < RangeEnd).",
    microsoftLinks: [
      { text: "Configure incremental refresh", url: "https://learn.microsoft.com/power-bi/connect-data/incremental-refresh-configure" }
    ]
  },
  {
    id: 12,
    phase: "Distribution Methods",
    scenario: "You need to share a report with 3 different audiences: (1) 500 internal employees with Power BI Pro licenses, (2) 50 external partners who don't have Power BI accounts, (3) 5 executives who need the report embedded in your internal SharePoint intranet.",
    question: "What's the correct distribution method for each audience?",
    options: [
      "Use email sharing links for all three — it's the simplest approach",
      "Internal employees: Publish an App or share directly (Pro-to-Pro); External partners: Use Publish to web or configure External user access with AAD B2B; SharePoint embedding: Use Power BI web part in SharePoint Online",
      "All three require Power BI Embedded and a developer to implement",
      "External users must be added as guest users with Pro licenses before they can view any reports"
    ],
    correctIndex: 1,
    explanation: "Different audiences require different distribution methods. Internal Pro users: Apps or direct sharing. External users: AAD B2B guest access (governed) or Publish to web (public, no authentication). SharePoint embedding: Power BI web part enables embedding in SharePoint Online pages for intranet scenarios with native AAD authentication.",
    microsoftLinks: [
      { text: "Share Power BI content", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-how-to-collaborate-distribute-dashboards-reports" },
      { text: "Distribute to external users", url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-azure-ad-b2b" }
    ]
  }
];export default questions;
