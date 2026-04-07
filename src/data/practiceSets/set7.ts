const questions = [
  {
    id: 1,
    phase: "DirectLake vs DirectQuery vs Import",
    scenario: "You're advising on storage mode selection for three scenarios: (A) Data in a Fabric Lakehouse, updated every 10 minutes, report needs near-real-time freshness with fast queries. (B) A legacy on-premises Oracle DB where you only need daily snapshots. (C) A 10TB data warehouse where you need live data but IT won't allow data copies.",
    question: "What storage mode matches each scenario?",
    options: [
      "All three: Import mode with scheduled refresh at different frequencies",
      "A: DirectLake (reads Delta files from OneLake without import); B: Import with daily scheduled refresh (fast queries, manageable size); C: DirectQuery (live queries to source, no data copy)",
      "A: DirectQuery; B: Import; C: DirectLake",
      "A: Import; B: DirectQuery; C: DirectLake"
    ],
    correctIndex: 1,
    explanation: "DirectLake is optimized for Fabric Lakehouse/Warehouse Delta tables — it reads files directly, offering near-Import performance with near-real-time freshness. Import is ideal when you own the data pipeline and can schedule refresh (fast queries, full feature support). DirectQuery maintains a live connection to large sources where data copies aren't permitted.",
    microsoftLinks: [
      { text: "Choose storage mode", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-storage-mode" },
      { text: "DirectLake overview", url: "https://learn.microsoft.com/power-bi/enterprise/directlake-overview" }
    ]
  },
  {
    id: 2,
    phase: "Data Transformation",
    scenario: "Your source data has a 'FullName' column containing values like 'Smith, John' (last name first, comma-separated). You need to split this into separate 'FirstName' and 'LastName' columns in Power Query.",
    question: "What's the correct Power Query transformation?",
    options: [
      "Use Transform → Split Column → By Delimiter (comma), then rename the resulting columns and use Text.Trim to remove leading/trailing spaces",
      "Add a calculated column in DAX: FirstName = RIGHT([FullName], LEN([FullName]) - FIND(',', [FullName]))",
      "Use Pivot Column on the FullName field",
      "Export to Excel, use Text-to-Columns, then re-import"
    ],
    correctIndex: 0,
    explanation: "Split Column by Delimiter is the appropriate Power Query transformation. Splitting on comma creates two columns, then renaming and trimming whitespace cleans the result. Doing this in Power Query (not DAX) keeps the transformation in the ETL layer, reduces model complexity, and is processed during refresh rather than at query time.",
    microsoftLinks: [
      { text: "Split columns", url: "https://learn.microsoft.com/power-query/split-columns-delimiter" },
      { text: "Text functions", url: "https://learn.microsoft.com/powerquery-m/text-functions" }
    ]
  },
  {
    id: 3,
    phase: "Data Model — Keys and Relationships",
    scenario: "You're building a model with a Sales fact table and a Date dimension. The Sales table has a 'SaleDate' column stored as DateTime (e.g., '2024-03-15 14:32:00'), but your Date dimension has a 'DateKey' column as Integer (e.g., 20240315). You need to create a relationship.",
    question: "What's the best approach to create the relationship?",
    options: [
      "Use a many-to-many relationship with DateTime on one side",
      "In Power Query, add a calculated column to Sales: DateKey = Date.Year([SaleDate])*10000 + Date.Month([SaleDate])*100 + Date.Day([SaleDate]), then create a many-to-one relationship from Sales[DateKey] to Date[DateKey]",
      "Change the Date dimension to use DateTime type keys",
      "Use USERELATIONSHIP in all time intelligence measures instead"
    ],
    correctIndex: 1,
    explanation: "Matching data types and formats is required for relationships. Creating an integer DateKey (YYYYMMDD) from the DateTime in Power Query normalizes the grain to the day level and matches the Date dimension's key format. Integer keys are also more efficient for VertiPaq compression than DateTime columns.",
    microsoftLinks: [
      { text: "Create relationships", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-create-and-manage-relationships" },
      { text: "Model relationships guidance", url: "https://learn.microsoft.com/power-bi/guidance/relationships-active-inactive" }
    ]
  },
  {
    id: 4,
    phase: "DAX — Time Intelligence",
    scenario: "You need four measures for a Sales dashboard: MTD Sales, QTD Sales, YTD Sales, and Same Period Last Year Sales. You have a properly configured Date table marked as a Date Table.",
    question: "Which DAX functions implement these measures correctly?",
    options: [
      "All four can use CALCULATE with DATESBETWEEN and manually calculated start dates",
      "MTD: TOTALMTD([Sales], Dates[Date]); QTD: TOTALQTD([Sales], Dates[Date]); YTD: TOTALYTD([Sales], Dates[Date]); SPLY: CALCULATE([Sales], SAMEPERIODLASTYEAR(Dates[Date]))",
      "DATESMTD, DATESQTD, DATESYTD return the sales values directly without CALCULATE",
      "Time intelligence functions only work with SUMX, not CALCULATE"
    ],
    correctIndex: 1,
    explanation: "TOTALMTD, TOTALQTD, and TOTALYTD are shorthand time intelligence functions that wrap CALCULATE with the appropriate date range modifier. SAMEPERIODLASTYEAR used inside CALCULATE shifts the date context to the equivalent prior year period. All require a properly configured, contiguous Date table marked as a Date Table.",
    microsoftLinks: [
      { text: "Time intelligence functions", url: "https://learn.microsoft.com/dax/time-intelligence-functions-dax" },
      { text: "SAMEPERIODLASTYEAR", url: "https://learn.microsoft.com/dax/sameperiodlastyear-function-dax" }
    ]
  },
  {
    id: 5,
    phase: "Reduce Model Granularity",
    scenario: "Your Sales fact table stores one row per individual product scan in a retail system — millions of rows per day with the same product, store, and date but incrementing scan timestamps. Reports only ever analyze at the Day × Product × Store level, never at the individual scan level.",
    question: "How should you reduce granularity to improve model performance?",
    options: [
      "Keep all rows and rely on VertiPaq compression to handle it",
      "In Power Query, Group By on Date, Product, and Store and aggregate Quantity as Sum and Revenue as Sum — this reduces millions of scan rows to thousands of day-level rows, dramatically reducing model size",
      "Switch to DirectQuery to avoid storing the data",
      "Create aggregation measures that ignore the scan level"
    ],
    correctIndex: 1,
    explanation: "When your reporting grain is coarser than your source data grain, reducing in Power Query via Group By is the right optimization. This cuts row count from millions to thousands, dramatically reducing model size, refresh time, and memory usage. Since reports never need scan-level detail, no information is lost.",
    microsoftLinks: [
      { text: "Group by in Power Query", url: "https://learn.microsoft.com/power-query/group-by" },
      { text: "Reduce model size", url: "https://learn.microsoft.com/power-bi/guidance/import-modeling-data-reduction" }
    ]
  },
  {
    id: 6,
    phase: "Visualize — Format and Configure Visuals",
    scenario: "Your bar chart shows sales figures ranging from $1,234 to $12,456,789. The Y-axis labels are showing full numbers which cause overlapping. The data labels on bars are too large. You need the chart to display values clearly in a limited space.",
    question: "What formatting options address this?",
    options: [
      "Switch to a table visual to show exact numbers",
      "In Format pane: set Y-axis Display Units to 'Millions' with 1 decimal place; enable data labels with abbreviated units; adjust font size. These settings control number formatting without changing the underlying data",
      "Reduce the number of bars shown using a Top N filter",
      "Change the measure to divide values by 1,000,000 in DAX"
    ],
    correctIndex: 1,
    explanation: "Display units (Thousands, Millions, Billions) control how numbers are abbreviated in axes and data labels without modifying data or measures. Combined with decimal place settings, this makes large numbers readable in small spaces. Modifying the DAX measure to divide is bad practice as it breaks the measure's reusability.",
    microsoftLinks: [
      { text: "Format visuals", url: "https://learn.microsoft.com/power-bi/visuals/service-getting-started-with-color-formatting-and-axis-properties" }
    ]
  },
  {
    id: 7,
    phase: "Sorting Visuals",
    scenario: "Your bar chart showing months on the X-axis is sorted alphabetically (April, August, December...) instead of chronologically. You've tried clicking 'Sort by' but Month Name isn't available as a sort option that produces chronological order.",
    question: "What's the correct fix?",
    options: [
      "Rename months to include numbers: '01 January', '02 February', etc.",
      "In your Date table, create a MonthNumber column (1-12), then use 'Sort by Column' in the Data view to configure MonthName to sort by MonthNumber — visuals using MonthName will then sort chronologically",
      "Switch to a line chart which automatically sorts by date",
      "Use a slicer to filter to one month at a time"
    ],
    correctIndex: 1,
    explanation: "'Sort by Column' is a data model setting that controls how a column is sorted when used in visuals. Setting MonthName to sort by MonthNumber means any visual using MonthName will display months in numeric order (Jan, Feb, Mar...) rather than alphabetically. This is the correct, clean solution without renaming source data.",
    microsoftLinks: [
      { text: "Sort by column", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-sort-by-column" }
    ]
  },
  {
    id: 8,
    phase: "Manage Workspaces",
    scenario: "Your organization is adopting a Fabric deployment pipeline (Dev → Test → Prod). A developer accidentally published a report directly to the Production workspace, bypassing the Test stage. This introduced untested changes that broke the Prod environment.",
    question: "What governance configuration prevents this scenario?",
    options: [
      "Enable 2FA for all workspace members",
      "Assign Production workspace roles so that developers have 'Viewer' or no access — only pipeline service principals or designated deployers have 'Admin/Member' rights in Production, forcing all deployments through the pipeline",
      "Add a disclaimer to all reports in Production",
      "Use sensitivity labels to restrict Production publishing"
    ],
    correctIndex: 1,
    explanation: "Controlling workspace roles in Production is the key governance control. Developers should have no ability to publish directly to Prod — they work in Dev, promote through the pipeline to Test, and only authorized deployers or automation promotes to Prod. This enforces the deployment discipline and prevents bypassing the testing stage.",
    microsoftLinks: [
      { text: "Deployment pipelines best practices", url: "https://learn.microsoft.com/power-bi/create-reports/deployment-pipelines-best-practices" },
      { text: "Workspace roles", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-roles-new-workspaces" }
    ]
  },
  {
    id: 9,
    phase: "Row-Level Security",
    scenario: "You've implemented RLS with the filter [Region] = USERPRINCIPALNAME(). A department head says: 'I need to see all regions, not just my own, for my management reports.' Your RLS role currently applies to all users in the dataset.",
    question: "What's the correct way to give the department head full access without breaking RLS for others?",
    options: [
      "Remove the department head from the RLS role so they see all data",
      "Create a second RLS role 'Management' with no filter (TRUE()) and add the department head to this role — not assigning users to a role means they see all data, but explicit roles are cleaner. Note: users NOT assigned to any role see all data",
      "Create a separate dataset for the department head",
      "Modify the existing role with an IF statement checking their specific email"
    ],
    correctIndex: 1,
    explanation: "Users not assigned to any RLS role see all data in the dataset. Creating a 'Management' role with a TRUE() filter (or no filter) is a best practice for documenting who has full access. Alternatively, simply not assigning the department head to the restricted role also works. Explicit role assignment is more auditable and intentional.",
    microsoftLinks: [
      { text: "Row-level security", url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls" }
    ]
  },
  {
    id: 10,
    phase: "Gateway Configuration",
    scenario: "Your company has two office locations — New York and London. SQL Server data sources exist in both offices. You have one gateway installed in New York. London users experience very slow refresh times because data travels from London → Power BI Service → New York gateway → New York SQL, and also London SQL must be reached through New York.",
    question: "What's the optimal gateway architecture?",
    options: [
      "Install a second gateway in London for local data sources; cluster both gateways for high availability on shared sources; route each data source to its geographically closest gateway",
      "Move all data to Azure SQL and eliminate the need for gateways",
      "Use a single gateway in a neutral cloud location",
      "Schedule refreshes during off-peak hours to reduce perceived slowness"
    ],
    correctIndex: 0,
    explanation: "Gateway clustering allows multiple gateway instances to form a cluster for load balancing and high availability. Installing a gateway in London for London SQL sources eliminates the cross-ocean latency. Each data source can be configured to use a specific gateway cluster. This is the recommended enterprise architecture for multi-location deployments.",
    microsoftLinks: [
      { text: "Gateway clusters", url: "https://learn.microsoft.com/data-integration/gateway/service-gateway-high-availability-clusters" },
      { text: "On-premises gateway overview", url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-onprem" }
    ]
  },
  {
    id: 11,
    phase: "Visual Calculations",
    scenario: "You have a table visual showing quarterly sales. You want to add a column showing what percentage each quarter's sales are of the total year — calculated relative to the total shown in the visual, not the total in the model. This should update automatically when the user applies slicer filters.",
    question: "What's the most appropriate feature for this visual-relative percentage?",
    options: [
      "Create a DAX measure: % of Total = DIVIDE([Sales], CALCULATE([Sales], ALL(Dates[Quarter])))",
      "Use Visual Calculations: % of Total = DIVIDE([Sales], RUNNINGSUM([Sales], WINDOW(1, ABS, 0, ABS))) — or more simply, use DIVIDE with a WINDOW or COLLAPSE function to calculate the total within the visual context",
      "Add the percentage as a calculated column in Power Query",
      "Enable 'Show value as % of Grand Total' in the Values field formatting"
    ],
    correctIndex: 1,
    explanation: "Visual Calculations operate on the visual matrix itself, making calculations like '% of visual total' natural. The COLLAPSE function returns values from a higher level in the visual hierarchy. For percentage of total visible in the visual (which respects slicer context automatically), Visual Calculations are more intuitive than DAX measures that require careful ALLSELECTED handling.",
    microsoftLinks: [
      { text: "Visual calculations overview", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-visual-calculations-overview" }
    ]
  },
  {
    id: 12,
    phase: "Manage and Secure — Full Scenario",
    scenario: "Your BI team is being audited. The auditor asks: how do you ensure that (1) sensitive financial reports are classified, (2) data analysts can't accidentally publish to production, (3) the CEO can access reports without a Pro license, and (4) only authorized users see their own regional data?",
    question: "Which combination of Power BI features addresses all four requirements?",
    options: [
      "All four require manual processes — Power BI doesn't automate governance",
      "Sensitivity labels (classification); Deployment pipelines with role-restricted Prod workspace (prevent accidental prod publish); Premium Per User or Premium capacity with Power BI Embedded or App distribution (no Pro for CEO); Row-Level Security with USERPRINCIPALNAME() (regional data isolation)",
      "Watermarking, workspace permissions, Pro license, and column-level security",
      "Microsoft Purview, deployment scripts, guest user licenses, and table-level security"
    ],
    correctIndex: 1,
    explanation: "This scenario maps exactly to four Power BI governance features: (1) Sensitivity labels classify and protect content; (2) Deployment pipelines with restricted Prod workspace roles enforce promotion discipline; (3) Premium capacity or PPU enables non-Pro users to consume content via Apps; (4) RLS with USERPRINCIPALNAME() enforces data-level security per user.",
    microsoftLinks: [
      { text: "Power BI governance", url: "https://learn.microsoft.com/power-bi/guidance/powerbi-implementation-planning-security-overview" },
      { text: "Sensitivity labels", url: "https://learn.microsoft.com/power-bi/enterprise/service-security-sensitivity-label-overview" }
    ]
  }
];export default questions;
