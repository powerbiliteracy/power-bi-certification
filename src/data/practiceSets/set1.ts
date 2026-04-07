const questions = [
  {
    id: 1,
    phase: "Get & Connect to Data",
    scenario: "Your organization stores sales data in a Fabric Lakehouse. The data science team updates Delta tables hourly. Report users need near-real-time data but your IT policy forbids scheduled refreshes more than once per day. You're evaluating DirectLake, DirectQuery, and Import mode.",
    question: "Which storage mode should you choose, and why?",
    options: [
      "Import mode — it's the fastest and most feature-complete, and you can schedule refresh every 30 minutes",
      "DirectQuery — it queries the source on every visual interaction, ensuring real-time data at the cost of performance",
      "DirectLake — it reads Delta Parquet files directly from OneLake without import or traditional DirectQuery, providing near-real-time freshness with in-memory query speed",
      "Composite model — use Import for dimensions and DirectQuery for the fact table"
    ],
    correctIndex: 2,
    explanation: "DirectLake is a Fabric-exclusive storage mode that reads Delta Parquet files directly from OneLake. It avoids the latency of traditional DirectQuery by caching column segments on demand ('framing') and delivers near-Import-level query performance. It's ideal when data is in a Fabric Lakehouse or Warehouse and you need freshness beyond what scheduled Import refresh allows.",
    microsoftLinks: [
      { text: "DirectLake overview", url: "https://learn.microsoft.com/power-bi/enterprise/directlake-overview" },
      { text: "Choose a storage mode", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-storage-mode" }
    ]
  },
  {
    id: 2,
    phase: "Data Source Settings",
    scenario: "You're connecting Power BI Desktop to an on-premises SQL Server that contains sensitive PII. A colleague warns you that combining PII data with a public web API inside Power Query could cause privacy leakage. You need to prevent Power Query from sending PII columns to external sources during query folding.",
    question: "How do you configure this correctly?",
    options: [
      "Set the SQL Server data source privacy level to 'Private' in Data Source Settings, and the web API to 'Public'",
      "Disable query folding on the SQL Server connection",
      "Load both sources in separate queries and only combine them in DAX measures",
      "Enable 'Always use encrypted connections' in Power BI Service"
    ],
    correctIndex: 0,
    explanation: "Privacy levels control how Power Query handles data combinations across sources. Setting SQL Server to 'Private' ensures its data is never sent to external sources during query evaluation. Setting the public web API to 'Public' tells Power Query that data from it is safe to share. This prevents PII from leaking when Power Query optimizes cross-source queries.",
    microsoftLinks: [
      { text: "Data source privacy levels", url: "https://learn.microsoft.com/power-bi/enterprise/desktop-privacy-levels" },
      { text: "Configure data source settings", url: "https://learn.microsoft.com/power-bi/connect-data/desktop-data-sources" }
    ]
  },
  {
    id: 3,
    phase: "Create and Modify Parameters",
    scenario: "Your Power BI file connects to SQL Server. You need to support Dev, UAT, and Prod environments with different server names. Currently the server name is hardcoded. You want colleagues to switch environments easily without editing M code directly.",
    question: "What's the correct approach?",
    options: [
      "Create a Power Query parameter named 'ServerName', use it in the SQL Server connection string, then change the parameter value in Manage Parameters before each publish",
      "Create three separate .pbix files with hardcoded connections",
      "Use a SharePoint list to store server names and load them dynamically",
      "Use deployment pipelines only — parameters aren't needed for this scenario"
    ],
    correctIndex: 0,
    explanation: "Parameters in Power Query let you abstract dynamic values like server names, database names, or file paths. Once a parameter is created and referenced in the data source connection, users can change it via Manage Parameters without touching M code. Combined with deployment pipeline parameter rules, this enables automated environment switching.",
    microsoftLinks: [
      { text: "Power Query parameters", url: "https://learn.microsoft.com/power-query/power-query-query-parameters" },
      { text: "Deployment pipeline parameters", url: "https://learn.microsoft.com/power-bi/create-reports/deployment-pipelines-parameters" }
    ]
  },
  {
    id: 4,
    phase: "Profile and Clean the Data",
    scenario: "You're connecting to a CSV file with 500,000 rows of customer transactions. In Power Query's Column Quality view, the 'Email' column shows 12% errors and 3% empty values. The 'TransactionAmount' column shows min = -50,000, which seems invalid. You need to understand the data before loading.",
    question: "What's the correct sequence of actions?",
    options: [
      "Load the data as-is and handle quality issues with DAX measures",
      "Use Column Distribution and Column Profile to understand value spread, filter out null emails using 'Remove Empty', replace negative amounts using Replace Values, and document decisions",
      "Delete rows with any errors to ensure data quality",
      "Use the Data tab in Excel to pre-clean before importing to Power BI"
    ],
    correctIndex: 1,
    explanation: "Power Query's data profiling tools (Column Quality, Column Distribution, Column Profile) reveal error rates, empty values, min/max, and value distributions. You should investigate before deciding on a strategy — some errors may be meaningful (returns = negative amounts), others may be data entry issues. Systematic investigation and transformation in Power Query keeps the logic auditable.",
    microsoftLinks: [
      { text: "Column profiling in Power Query", url: "https://learn.microsoft.com/power-query/data-profiling-tools" },
      { text: "Deal with errors in Power Query", url: "https://learn.microsoft.com/power-query/dealing-with-errors" }
    ]
  },
  {
    id: 5,
    phase: "Transform and Load the Data",
    scenario: "You receive a JSON file from an API that contains: {\"orders\": [{\"id\": 1, \"items\": [{\"sku\": \"A1\", \"qty\": 2}, {\"sku\": \"B3\", \"qty\": 1}]}, ...]}. You need a flat table with OrderID, SKU, and Qty. When you expand 'orders', you get a nested list column 'items'.",
    question: "What Power Query steps correctly flatten this semi-structured data?",
    options: [
      "Use Text.Split to parse the raw JSON string",
      "After expanding 'orders', expand the 'items' list column to new rows, then expand the resulting record column to get SKU and Qty as separate columns",
      "Convert to CSV first, then import",
      "Use the 'Pivot Column' feature on the items column"
    ],
    correctIndex: 1,
    explanation: "Nested lists in JSON require two expansion steps: (1) Expand the list column to new rows — this creates one row per item while duplicating the OrderID; (2) Expand the record column to extract individual fields (SKU, Qty) as separate columns. This is the standard pattern for converting semi-structured nested JSON to a flat, relational table.",
    microsoftLinks: [
      { text: "Working with JSON", url: "https://learn.microsoft.com/power-query/connectors/json" },
      { text: "Expand nested structures", url: "https://learn.microsoft.com/power-query/expand-column" }
    ]
  },
  {
    id: 6,
    phase: "Transform and Load the Data",
    scenario: "You have a sales table where months are columns: Product, Jan, Feb, Mar, Apr ... Dec. You need to convert this to a row-per-month format with columns: Product, Month, Sales for time intelligence to work in DAX.",
    question: "Which Power Query transformation should you use?",
    options: [
      "Transpose the table",
      "Unpivot the month columns — select them and choose 'Unpivot Columns', which creates Attribute (month name) and Value (sales) columns",
      "Pivot the Product column",
      "Use Group By on the Product column"
    ],
    correctIndex: 1,
    explanation: "Unpivot converts column headers into row values. Selecting the month columns and clicking 'Unpivot Columns' produces a normalized table with one row per Product-Month combination, with the month name in an 'Attribute' column and the value in a 'Value' column. This is a prerequisite for effective time intelligence in DAX.",
    microsoftLinks: [
      { text: "Unpivot columns", url: "https://learn.microsoft.com/power-query/unpivot-column" },
      { text: "Pivot and unpivot", url: "https://learn.microsoft.com/power-query/pivot-columns" }
    ]
  },
  {
    id: 7,
    phase: "Reference vs Duplicate Queries",
    scenario: "You have a raw customer query that loads from SQL Server and includes several expensive transformation steps. You need two separate output tables: 'Customers' (clean dimension) and 'CustomerContacts' (a filtered subset for the marketing team). You want to avoid running the SQL source query twice.",
    question: "Should you use Reference or Duplicate, and why?",
    options: [
      "Duplicate — it creates an independent copy that can be optimized separately",
      "Reference — it creates a new query that uses the existing query's output as its source, so the underlying source runs only once and transformations are shared",
      "Either — they behave identically in terms of data loading",
      "Neither — create two separate connections to the SQL source for clarity"
    ],
    correctIndex: 1,
    explanation: "A Reference query points to another query's output rather than re-executing its steps. This means the source and shared transformations run once, and both output queries use that result. A Duplicate creates an independent query that re-runs all steps, including the source query, which doubles the load. For performance-sensitive sources, always prefer Reference.",
    microsoftLinks: [
      { text: "Reference and duplicate queries", url: "https://learn.microsoft.com/power-query/duplicate-reference-queries" }
    ]
  },
  {
    id: 8,
    phase: "Create Fact and Dimension Tables",
    scenario: "You have a raw Sales CSV with columns: Date, Product, Category, Customer, City, Region, SalesRep, Amount, Quantity. You need to build a star schema. Your manager says 'just keep it as one big table to keep things simple'.",
    question: "Why is the star schema approach superior for Power BI?",
    options: [
      "Star schema is only needed for DirectQuery mode",
      "One big table works fine — Power BI handles denormalized data well",
      "Star schema separates facts from dimensions, enabling VertiPaq compression on repeated string values (City, Region), creating clean filter propagation, and avoiding many-to-many relationship issues",
      "Star schema reduces the number of DAX measures you need to write"
    ],
    correctIndex: 2,
    explanation: "VertiPaq (Power BI's in-memory engine) compresses column values using dictionary encoding. A column like 'Region' with 5 unique values repeating across 10M rows compresses dramatically when stored in a dimension table. It also enforces single-direction filter flow, makes RLS simpler, and follows the dimensional modeling best practices Power BI is optimized for.",
    microsoftLinks: [
      { text: "Star schema guidance", url: "https://learn.microsoft.com/power-bi/guidance/star-schema" },
      { text: "Data reduction techniques", url: "https://learn.microsoft.com/power-bi/guidance/import-modeling-data-reduction" }
    ]
  },
  {
    id: 9,
    phase: "Merge and Append Queries",
    scenario: "You have a 'SalesNorth' table and a 'SalesSouth' table with identical schemas. You also have a 'ProductCodes' lookup table you need to join to the combined sales data. What's the correct Power Query sequence?",
    question: "What is the correct combination of operations?",
    options: [
      "Merge SalesNorth and SalesSouth, then Append with ProductCodes",
      "Append SalesNorth and SalesSouth to get a unified table, then Merge with ProductCodes using ProductCode as the join key",
      "Append all three tables together",
      "Merge SalesNorth with ProductCodes, Merge SalesSouth with ProductCodes, then Append the results"
    ],
    correctIndex: 1,
    explanation: "Append combines tables with the same structure vertically (adding rows). Merge joins tables on a key column (like a SQL JOIN). The correct sequence is: Append the two regional tables to combine rows into one dataset, then Merge with the ProductCodes lookup table to enrich the data.",
    microsoftLinks: [
      { text: "Append queries", url: "https://learn.microsoft.com/power-query/append-queries" },
      { text: "Merge queries", url: "https://learn.microsoft.com/power-query/merge-queries-overview" }
    ]
  },
  {
    id: 10,
    phase: "Resolve Data Issues",
    scenario: "After loading data, Power Query shows 'DataFormat.Error: We couldn't convert to Number' on 3% of rows in the Revenue column. Investigation reveals some cells contain '#N/A' strings from a spreadsheet formula error. You need to load the data with those rows set to 0.",
    question: "What's the best Power Query approach?",
    options: [
      "Remove all error rows using Remove Errors",
      "Use Replace Values to replace '#N/A' with 0 before changing the column type to number",
      "Change column type to Text to avoid the error",
      "Catch errors with a try-otherwise expression in a custom column"
    ],
    correctIndex: 1,
    explanation: "Replace Values cleans the problematic text values before the type conversion step, preventing the error from occurring. This is preferable to removing rows (data loss) or keeping as text (breaks calculations). Using Replace Errors (on the typed column) is also valid, but Replace Values before type change is cleaner and avoids creating errors in the first place.",
    microsoftLinks: [
      { text: "Replace values and errors", url: "https://learn.microsoft.com/power-query/replace-values" },
      { text: "Handle errors in Power Query", url: "https://learn.microsoft.com/power-query/dealing-with-errors" }
    ]
  },
  {
    id: 11,
    phase: "Configure Data Loading",
    scenario: "You have 5 Power Query queries: 3 are intermediate transformation steps (staging) and 2 are the final output tables for your data model. The staging queries don't need to be loaded into the model but you want to keep them in Power Query for reuse.",
    question: "How do you prevent staging queries from loading into the model?",
    options: [
      "Delete the staging queries after final queries are built",
      "Right-click each staging query and uncheck 'Enable Load' — they remain in Power Query but don't consume model memory",
      "Move staging queries to a separate Power BI file",
      "Use parameters instead of staging queries"
    ],
    correctIndex: 1,
    explanation: "'Enable Load' controls whether a query loads into the data model. Disabling it keeps the query available as a source for other queries (reference queries) without increasing model size. This is a best practice for staging/helper queries in complex transformations.",
    microsoftLinks: [
      { text: "Configure query load settings", url: "https://learn.microsoft.com/power-query/disable-query-load" }
    ]
  },
  {
    id: 12,
    phase: "Resolve Data Import Errors",
    scenario: "You're connecting Power BI to an Excel file stored on a shared network drive. In your desktop environment refreshes work fine, but after publishing to Power BI Service, scheduled refresh fails with 'Unable to connect to the data source'. The file is on-premises.",
    question: "What's required to fix the scheduled refresh?",
    options: [
      "Re-publish the report from Desktop",
      "Move the Excel file to SharePoint Online",
      "Install and configure an on-premises data gateway on a machine with access to the network drive, then configure the dataset to use that gateway in Power BI Service",
      "Export the Excel file as CSV and re-import"
    ],
    correctIndex: 2,
    explanation: "Power BI Service cannot directly access on-premises files or local network drives. An on-premises data gateway acts as a bridge, installed on a machine that can access the network location. After configuration, you assign the dataset to use the gateway in the Service, enabling scheduled refresh for on-premises sources.",
    microsoftLinks: [
      { text: "On-premises data gateway", url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-onprem" },
      { text: "Configure gateway data sources", url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-data-sources" }
    ]
  }
];export default questions;
