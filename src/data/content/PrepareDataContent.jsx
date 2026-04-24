// Content for "Prepare the data" domain topics

export const prepareDataContent = {
  "Identify and connect to data sources or a shared semantic model": {
    overview: {
      title: "Understanding Data Connectivity in Power BI",
      concepts: [
        "Power BI connects to 100+ data sources including databases, files, cloud services, and APIs",
        "Shared semantic models (formerly datasets) enable reusable data models across multiple reports",
        "Connection methods vary by source: Import loads data into Power BI, DirectQuery queries source in real-time",
        "Authentication and credentials are required for most data sources",
        "Data gateways enable secure access to on-premises data sources from Power BI Service"
      ]
    },
    bestPractices: [
      "Identify all required data sources before starting development",
      "Use shared semantic models when multiple reports need the same data",
      "Test connectivity and permissions before building complex transformations",
      "Document data source locations and connection requirements",
      "Use data gateways for on-premises sources that need scheduled refresh",
      "Consider data freshness requirements when choosing connection mode"
    ],
    commonMistakes: [
      "Not verifying data source access before building reports",
      "Recreating semantic models instead of reusing existing ones",
      "Forgetting to configure gateways for on-premises data sources",
      "Not understanding the difference between Import and DirectQuery",
      "Hardcoding server names instead of using parameters",
      "Not securing credentials properly"
    ],
    keySteps: [
      "Click 'Get Data' in Power BI Desktop and select data source type",
      "Enter connection details (server, database, file path, etc.)",
      "Provide authentication credentials when prompted",
      "Select tables or data to import, or connect to shared semantic model",
      "Preview data to verify correct source is connected",
      "Choose Import or DirectQuery mode based on requirements"
    ],
    keyDecisions: [
      "**New semantic model or reuse existing?** - Reuse when data model already exists and meets needs",
      "**Import or DirectQuery?** - Import for best performance, DirectQuery for real-time data",
      "**Single or multiple data sources?** - Combine sources as needed for complete analysis",
      "**On-premises or cloud data?** - On-premises requires data gateway for Service refresh",
      "**Authentication method?** - Windows, database, OAuth, or service account depending on source"
    ],
    keyDefinitions: [
      "**Data Source**: Origin system containing data to be analyzed (database, file, API, etc.)",
      "**Semantic Model**: Reusable data model published to Power BI Service that multiple reports can connect to",
      "**Import Mode**: Data copied into Power BI for fast queries (requires scheduled refresh)",
      "**DirectQuery**: Real-time connection where queries sent to source database",
      "**Data Gateway**: Secure bridge between on-premises data and Power BI cloud service",
      "**Credentials**: Authentication information required to access data sources"
    ],
    risks: [
      "**Access issues**: Insufficient permissions prevent data loading",
      "**Performance problems**: Wrong connection mode impacts report speed",
      "**Security concerns**: Improperly stored credentials create vulnerabilities",
      "**Refresh failures**: Missing gateway or expired credentials break scheduled refresh",
      "**Data inconsistency**: Multiple semantic models for same data cause version conflicts",
      "**Connectivity loss**: Network issues or source changes break connections"
    ],
    faqs: [
      {
        q: "What's the difference between a semantic model and a dataset?",
        a: "They're the same thing - Microsoft renamed 'dataset' to 'semantic model' in 2023. It's a reusable data model in Power BI Service."
      },
      {
        q: "How do I connect to a shared semantic model?",
        a: "In Get Data, choose 'Power BI semantic models', select the published semantic model from your workspace, and click Create."
      },
      {
        q: "What is a data gateway and when do I need it?",
        a: "A gateway securely connects Power BI Service to on-premises data sources. You need it for scheduled refresh of on-premises data."
      },
      {
        q: "Can I combine data from multiple sources?",
        a: "Yes, Power BI can combine data from different sources using Power Query merge/append or model relationships."
      },
      {
        q: "Which connection mode should I choose?",
        a: "Use Import for best performance and when data doesn't need to be real-time. Use DirectQuery when you need up-to-the-second data."
      },
      {
        q: "How do I know which data sources are available?",
        a: "Click Get Data in Power BI Desktop to see 100+ connectors including databases, files, online services, and more."
      }
    ],
    examTips: [
      "Know the difference between Import and DirectQuery connection modes",
      "Understand when to use shared semantic models vs creating new ones",
      "Remember that data gateways are required for on-premises sources in Service",
      "Know that Power BI supports 100+ data source connectors",
      "Understand authentication and credentials are required for most sources",
      "Recognize the importance of testing connectivity before building reports"
    ],
    resources: [
      {
        title: "Data sources in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-data-sources",
        type: "Documentation"
      },
      {
        title: "Connect to semantic models in the Power BI service",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-report-lifecycle-datasets",
        type: "Documentation"
      },
      {
        title: "What is an on-premises data gateway?",
        url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-onprem",
        type: "Documentation"
      }
    ]
  },

  "Change data source settings, including credentials and privacy levels": {
    overview: {
      title: "Managing Connection Configuration",
      concepts: [
        "Data source settings control how Power BI connects to and refreshes data",
        "Credentials store authentication information for accessing data sources",
        "Privacy levels prevent unintended data combination across security boundaries",
        "Connection strings can be updated without rebuilding queries",
        "Power BI Service requires separate credential configuration from Desktop"
      ]
    },
    bestPractices: [
      "Set privacy levels appropriately (Private, Organizational, Public)",
      "Use Windows credentials or service accounts for automated refresh",
      "Update data source settings rather than recreating queries when servers change",
      "Document privacy level choices for compliance and security",
      "Test refresh after changing credentials to verify they work",
      "Use parameters for data sources that change between environments"
    ],
    commonMistakes: [
      "Not setting privacy levels causing \"Formula.Firewall\" errors",
      "Using personal credentials for scheduled refresh (they expire)",
      "Forgetting to update credentials in Power BI Service after publishing",
      "Setting all sources to Public without considering data security",
      "Not testing data source changes before publishing",
      "Hardcoding credentials in connection strings"
    ],
    keySteps: [
      "In Power BI Desktop: File > Options and settings > Data source settings",
      "Select data source and click 'Edit Permissions'",
      "Update credentials by clicking 'Edit' under Credentials section",
      "Set Privacy Level: Private (internal), Organizational (corporate), or Public (internet)",
      "In Power BI Service: Dataset Settings > Data source credentials > Edit credentials",
      "For gateways: Configure credentials in gateway settings"
    ],
    keyDecisions: [
      "**Which privacy level?** - Sensitive data: Private; Corporate data: Organizational; Public data: Public",
      "**Personal or service account?** - Service account for production, personal for development",
      "**Embed credentials or prompt?** - Automated refresh: embed; Interactive use: prompt",
      "**Windows or database auth?** - Depends on data source security configuration",
      "**Update settings or recreate?** - Simple changes (server name): update settings; Major changes: consider recreating"
    ],
    keyDefinitions: [
      "**Data Source Settings**: Configuration for how Power BI connects to and authenticates with data sources",
      "**Privacy Levels**: Security boundaries that control how data can be combined (Private, Organizational, Public)",
      "**Credentials**: Authentication information (username/password, keys, tokens) for accessing data",
      "**Formula.Firewall**: Privacy protection that prevents combining data across privacy boundaries",
      "**Service Account**: Non-personal account used for automated processes like scheduled refresh",
      "**Connection String**: Technical specification of server, database, and connection parameters"
    ],
    risks: [
      "**Credential expiration**: Personal passwords expire causing refresh failures",
      "**Privacy violations**: Incorrect privacy levels may allow unauthorized data combination",
      "**Security exposure**: Embedded credentials in reports create security risks",
      "**Refresh failures**: Wrong credentials or privacy settings break scheduled refresh",
      "**Compliance issues**: Not documenting privacy levels may violate data governance",
      "**Access loss**: Changing credentials without testing breaks existing reports"
    ],
    faqs: [
      {
        q: "What are privacy levels and why do they matter?",
        a: "Privacy levels (Private, Organizational, Public) prevent accidentally combining sensitive data with less secure sources. Set based on data sensitivity."
      },
      {
        q: "Why am I getting a 'Formula.Firewall' error?",
        a: "Privacy levels are blocking data combination. Review privacy settings for each source and adjust if appropriate."
      },
      {
        q: "How do I change the server name without rebuilding my queries?",
        a: "File > Options > Data source settings, select source, click Edit, update connection details. Or use parameters for flexibility."
      },
      {
        q: "What's the difference between Desktop and Service credentials?",
        a: "Desktop stores credentials locally for development. Service needs separate credential configuration for scheduled refresh."
      },
      {
        q: "Should I use my personal account for scheduled refresh?",
        a: "No - use a service account. Personal credentials may expire when you change password, breaking scheduled refresh."
      },
      {
        q: "Can I update data source settings after publishing?",
        a: "Yes, in Power BI Service go to Dataset Settings > Data source credentials to update credentials and settings."
      }
    ],
    examTips: [
      "Know the three privacy levels: Private, Organizational, Public",
      "Understand Formula.Firewall errors come from privacy level conflicts",
      "Remember data source settings can be updated without rebuilding queries",
      "Know Service requires separate credential configuration from Desktop",
      "Understand service accounts are preferred for automated refresh",
      "Recognize the importance of testing after changing credentials"
    ],
    resources: [
      {
        title: "Manage data sources",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-data-sources",
        type: "Documentation"
      },
      {
        title: "Privacy levels in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/admin/desktop-privacy-levels",
        type: "Documentation"
      },
      {
        title: "Configure scheduled refresh",
        url: "https://learn.microsoft.com/power-bi/connect-data/refresh-scheduled-refresh",
        type: "Documentation"
      }
    ]
  },

  "Choose between DirectLake, DirectQuery, and Import": {
    overview: {
      title: "Selecting the Right Storage / Connection Mode",
      concepts: [
        "Import loads a copy of the data into the model — fastest queries, requires scheduled refresh",
        "DirectQuery sends queries to the source on every interaction — near real-time, slower visuals",
        "DirectLake reads Parquet files directly from OneLake (Fabric) — Import-like speed without refresh",
        "Composite models can mix Import + DirectQuery tables in the same model",
        "Choice affects refresh strategy, latency, security, and feature support (e.g. calculated columns)"
      ]
    },
    bestPractices: [
      "Default to Import unless real-time data or huge volumes prevent it",
      "Use DirectQuery for very large fact tables or when source-system latency is critical",
      "Use DirectLake for Fabric workloads to avoid refresh while keeping speed",
      "Test query performance with realistic volumes before committing to a mode",
      "Document which storage mode each table uses for governance"
    ],
    commonMistakes: [
      "Picking DirectQuery for small datasets and suffering slow visuals",
      "Picking Import for billion-row tables and hitting model size limits",
      "Forgetting that DAX features are limited under DirectQuery",
      "Mixing modes without understanding composite model relationships",
      "Assuming DirectLake works outside of Fabric / OneLake"
    ],
    examTips: [
      "Know the three modes by name and one-line trade-off for each",
      "DirectLake = OneLake + Parquet + Fabric — Import-speed, no refresh",
      "DirectQuery = real-time, but limited DAX and slower visuals",
      "Composite model = Import + DirectQuery in one model",
      "Choose mode based on freshness, size, and feature requirements"
    ]
  },

  "Create and modify parameters": {
    overview: {
      title: "Power Query Parameters",
      concepts: [
        "Parameters are reusable named values referenced inside queries (server, path, date, etc.)",
        "Used for switching environments (dev/test/prod), filtering data, or reusable templates",
        "Parameters can be edited from File > Options > Query parameters or in the Service",
        "Templates (.pbit) prompt for parameter values when opened",
        "Parameters can drive M code, source connections, and incremental refresh policies"
      ]
    },
    bestPractices: [
      "Name parameters clearly (pServerName, pStartDate)",
      "Use parameters for any value that may change across environments",
      "Bind data source connections to parameters for portable models",
      "Combine parameters with templates (.pbit) for reusable starter reports",
      "Use parameters for incremental refresh RangeStart / RangeEnd"
    ],
    commonMistakes: [
      "Hardcoding server or path strings instead of using parameters",
      "Forgetting to update parameters when promoting from dev to prod",
      "Using wrong data type for the parameter (text vs date)",
      "Not setting Current Value, breaking refresh in the Service",
      "Renaming parameters without updating dependent queries"
    ],
    examTips: [
      "Parameters live in Power Query, not in the model",
      "Required for incremental refresh (RangeStart / RangeEnd)",
      "Templates (.pbit) prompt for parameters on open",
      "Editable in Service after publish (Dataset settings > Parameters)"
    ]
  },

  "Evaluate data, including data statistics and column properties": {
    overview: {
      title: "Data Profiling in Power Query",
      concepts: [
        "Power Query offers Column quality, Column distribution, and Column profile views",
        "Column quality shows valid / error / empty percentages",
        "Column distribution shows distinct vs unique counts",
        "Column profile shows min/max/avg/std dev and value distribution",
        "By default profiling is based on top 1000 rows — switch to 'entire data set' for accuracy"
      ]
    },
    bestPractices: [
      "Always profile against entire data set before going to production",
      "Enable column quality + distribution as a default view",
      "Investigate any column with non-zero error %",
      "Check distinct vs unique counts to find natural keys",
      "Use min/max to spot date range and outlier issues early"
    ],
    commonMistakes: [
      "Profiling only top 1000 rows and missing data quality issues",
      "Ignoring error % in source columns",
      "Not noticing extra whitespace or casing inconsistencies",
      "Treating distinct = unique without checking",
      "Skipping profiling on slowly changing source data"
    ],
    examTips: [
      "Three profiling tools: Column quality, distribution, profile",
      "Default sample is 1000 rows — must switch to 'entire data set'",
      "Distinct counts all unique values; Unique counts values appearing only once",
      "View > Data preview group in Power Query"
    ]
  },

  "Resolve inconsistencies, unexpected or null values, and data quality issues": {
    overview: {
      title: "Cleaning Dirty Data",
      concepts: [
        "Use Replace Values, Trim, Clean, Capitalize Each Word for text issues",
        "Replace Errors handles cells that fail type conversion",
        "Filter rows or Remove Rows to drop nulls / blanks where appropriate",
        "Conditional columns or Replace Values can normalize categories ('Y' / 'Yes' / 'true')",
        "Always fix at the source query so all downstream visuals benefit"
      ]
    },
    bestPractices: [
      "Standardize casing and trim text columns early",
      "Use Replace Errors to keep refresh from breaking",
      "Document any transformation that changes business meaning",
      "Prefer fixing in Power Query over DAX workarounds",
      "Add a 'Cleaned at' annotation step for traceability"
    ],
    commonMistakes: [
      "Filtering nulls without checking whether they carry meaning",
      "Replacing values with case-sensitive matches by accident",
      "Hiding data issues with DAX rather than fixing in Power Query",
      "Forgetting Trim doesn't remove non-printing characters (use Clean too)",
      "Not re-running profiling after cleaning"
    ],
    examTips: [
      "Trim removes leading/trailing spaces; Clean removes non-printable characters",
      "Replace Errors prevents whole-row failures during refresh",
      "Null handling: Remove Rows > Remove Blank Rows, or Replace nulls with default",
      "Always clean upstream in Power Query, not downstream in DAX"
    ]
  },

  "Resolve data import errors": {
    overview: {
      title: "Diagnosing and Fixing Import Errors",
      concepts: [
        "Errors surface as 'Errors in N rows' banner or red Error cells in preview",
        "Right-click column > Remove Errors, Replace Errors, or Keep Errors to inspect",
        "Common causes: type mismatch, missing source, locked file, credential issues",
        "Use 'Keep Errors' on a duplicate query to investigate without losing data",
        "Refresh history in Service shows error details for scheduled refresh"
      ]
    },
    bestPractices: [
      "Set explicit data types right after the source step, not at the end",
      "Investigate errors with a temporary 'Keep Errors' branch",
      "Add Replace Errors steps for known recoverable issues",
      "Check refresh history in Service after publishing",
      "Fail fast: don't suppress errors that hide real data quality issues"
    ],
    commonMistakes: [
      "Removing all error rows without understanding why they errored",
      "Setting types after merges, causing late-stage failures",
      "Ignoring the 'Errors in N rows' banner",
      "Not testing refresh in Service after fixing errors locally",
      "Confusing privacy / firewall errors with import errors"
    ],
    examTips: [
      "Three options: Remove / Replace / Keep Errors",
      "Refresh history is the first place to look for Service errors",
      "Type errors are the most common — set types early",
      "Privacy / Formula.Firewall is a separate class of error"
    ]
  },

  "Select appropriate column data types": {
    overview: {
      title: "Setting Correct Data Types",
      concepts: [
        "Types affect storage size, sort order, available DAX functions, and aggregations",
        "Common types: Whole/Decimal Number, Date/DateTime, Text, True/False, Binary",
        "Decimal Number stores 17 digits; Fixed Decimal stores exactly 4 decimal places",
        "Date types unlock time intelligence; Text dates do not",
        "Set type explicitly — never rely on 'Any' (untyped)"
      ]
    },
    bestPractices: [
      "Detect and assign types immediately after the source step",
      "Use Whole Number for IDs and counts (smaller, faster)",
      "Use Fixed Decimal for currency to avoid rounding drift",
      "Convert text dates to Date type before modeling",
      "Avoid 'Any' type in production queries"
    ],
    commonMistakes: [
      "Leaving columns as 'Any' type",
      "Storing numbers as Text and breaking aggregations",
      "Using Decimal Number for currency and getting rounding errors",
      "Storing dates as Text and breaking time intelligence",
      "Setting types at the end of long query chains, causing silent errors"
    ],
    examTips: [
      "Whole Number is more efficient than Decimal for IDs",
      "Fixed Decimal Number = exact 4 decimal places (currency)",
      "Date type required for time intelligence to work",
      "'Any' type means unknown — always replace it"
    ]
  },

  "Create and transform columns": {
    overview: {
      title: "Adding & Transforming Columns",
      concepts: [
        "Add Column tab: Custom, Conditional, Index, From Examples, Column from Calculation",
        "Transform tab modifies the existing column in place",
        "Custom Column uses M; Column from Examples infers M from samples",
        "Conditional Column builds if/then logic without writing M",
        "Prefer Power Query columns over DAX calculated columns when possible"
      ]
    },
    bestPractices: [
      "Use Column from Examples for quick text parsing",
      "Use Conditional Column for simple if/then logic",
      "Write M directly only when GUI options can't express the logic",
      "Name new columns descriptively from the start",
      "Move heavy calculations upstream into Power Query for refresh-time compute"
    ],
    commonMistakes: [
      "Using DAX calculated columns when Power Query would be more efficient",
      "Naming columns 'Custom' / 'Custom.1' and forgetting to rename",
      "Building 8-step transformations when one Custom Column would do",
      "Ignoring the privacy implications of combining columns from different sources",
      "Not testing the new column's data type after creation"
    ],
    examTips: [
      "Column from Examples uses AI to infer the M expression",
      "Conditional Column = GUI if/then/else",
      "Custom Column = full M expression",
      "Power Query columns compute at refresh; DAX calculated columns compute in model"
    ]
  },

  "Group and aggregate rows": {
    overview: {
      title: "Group By in Power Query",
      concepts: [
        "Transform > Group By aggregates rows by one or more columns",
        "Aggregations: Sum, Average, Min, Max, Count Rows, Count Distinct, All Rows",
        "'All Rows' keeps a nested table for further transformation",
        "Use Basic for one column / one aggregation; Advanced for multiple",
        "Reduces row count before loading — improves model size and refresh time"
      ]
    },
    bestPractices: [
      "Group at the lowest level needed for analysis, not lower",
      "Combine Group By with column removal to shrink fact tables",
      "Use 'All Rows' when you need the detail row context after grouping",
      "Group early in the query to reduce downstream processing",
      "Document grouping logic — it changes business semantics"
    ],
    commonMistakes: [
      "Grouping too aggressively and losing needed detail",
      "Using DAX SUMMARIZE when Power Query Group By would do",
      "Forgetting Count Rows vs Count Distinct difference",
      "Grouping after merge instead of before, hurting performance",
      "Not naming the new aggregated columns clearly"
    ],
    examTips: [
      "Group By offers Basic and Advanced modes",
      "Aggregations include Sum, Avg, Min, Max, Count Rows, Count Distinct, All Rows",
      "'All Rows' returns nested tables",
      "Group early to reduce data volume"
    ]
  },

  "Pivot, unpivot, and transpose data": {
    overview: {
      title: "Reshaping Data",
      concepts: [
        "Unpivot turns wide tables (columns per category) into tall tables (one row per value) — better for modeling",
        "Pivot turns tall tables back into wide — usually only for export/display",
        "Transpose flips rows and columns — used for header rows in odd source files",
        "Unpivot Other Columns is the safe choice when new categories may appear",
        "Star schemas almost always need unpivoted source data"
      ]
    },
    bestPractices: [
      "Always Unpivot wide-format spreadsheet data before modeling",
      "Use 'Unpivot Other Columns' so new monthly columns are picked up automatically",
      "Use Transpose only when source structure is sideways",
      "Avoid Pivot in the model — pivot is a presentation concern",
      "Rename Attribute / Value columns after Unpivot for clarity"
    ],
    commonMistakes: [
      "Modeling against wide data and writing dozens of measures",
      "Using Unpivot Selected Columns and breaking when new columns arrive",
      "Pivoting back to wide format inside the model",
      "Forgetting to set types after Unpivot",
      "Confusing Transpose with Unpivot"
    ],
    examTips: [
      "Unpivot = wide → tall (good for modeling)",
      "Pivot = tall → wide (usually for display)",
      "Transpose swaps rows and columns",
      "'Unpivot Other Columns' future-proofs against new columns"
    ]
  },

  "Convert semi-structured data to a table": {
    overview: {
      title: "Parsing JSON / XML / Nested Records",
      concepts: [
        "Sources like JSON, XML, and APIs return nested records and lists",
        "Use Expand / Aggregate buttons on Record and List columns to flatten",
        "Json.Document and Xml.Tables convert raw text into navigable structures",
        "Parse Column > JSON for stringified JSON inside a column",
        "After expanding, set data types and remove unwanted fields"
      ]
    },
    bestPractices: [
      "Expand only the fields you need — keeps queries narrow and fast",
      "Set data types immediately after expanding",
      "For deeply nested structures, expand level by level",
      "Use Json.Document on Text columns containing JSON strings",
      "Document the expected schema to detect upstream changes"
    ],
    commonMistakes: [
      "Expanding all fields and bloating the model",
      "Not handling missing fields when API responses vary",
      "Treating JSON arrays as single values",
      "Forgetting to set types after expansion",
      "Hardcoding deeply-nested paths that break on schema changes"
    ],
    examTips: [
      "Record column = Expand to columns",
      "List column = Expand to new rows or aggregate",
      "Json.Document parses JSON text",
      "Always set types after flattening"
    ]
  },

  "Create fact tables and dimension tables": {
    overview: {
      title: "Star Schema Foundations",
      concepts: [
        "Fact tables hold quantitative events (Sales, Orders, Sessions) with foreign keys + measures",
        "Dimension tables hold descriptive attributes (Date, Product, Customer) used to slice facts",
        "One-to-many relationships flow from dimension (one) to fact (many)",
        "Star schema = fact in the middle, dimensions around it — Power BI's preferred shape",
        "Avoid snowflakes (dim referring to dim) when possible — flatten into the dimension"
      ]
    },
    bestPractices: [
      "Build a dedicated Date dimension instead of using fact-table dates",
      "Keep dimensions wide (many descriptive columns) and short (few rows)",
      "Keep facts narrow (few columns: keys + measures) and tall (many rows)",
      "Use surrogate integer keys for joins where possible",
      "Validate every dim → fact relationship is one-to-many, single-direction"
    ],
    commonMistakes: [
      "Putting descriptive text on the fact table (huge model)",
      "Building many-to-many relationships when one-to-many would do",
      "Using snowflake schemas where star would simplify DAX",
      "Missing a Date dimension — breaks time intelligence",
      "Bidirectional cross-filter as a default"
    ],
    examTips: [
      "Star schema is Microsoft's recommended pattern",
      "Fact = events / measures; Dimension = descriptive context",
      "Relationships should be one-to-many, single-direction by default",
      "A proper Date dim is mandatory for time intelligence"
    ]
  },

  "Identify when to use reference or duplicate queries and the resulting impact": {
    overview: {
      title: "Reference vs Duplicate Queries",
      concepts: [
        "Reference creates a new query that points at the steps of an existing query",
        "Duplicate creates a fully independent copy of all steps",
        "Reference reduces duplication but couples queries — changes propagate",
        "Duplicate isolates queries but doubles maintenance",
        "Both can affect query folding and refresh time"
      ]
    },
    bestPractices: [
      "Use Reference when several queries share the same cleansing pipeline",
      "Use Duplicate when you need to evolve a query independently",
      "Stage common cleansing in a 'Staging' (load disabled) query and reference it",
      "Disable load on intermediate referenced queries to keep the model clean",
      "Watch for performance: referenced steps may execute multiple times"
    ],
    commonMistakes: [
      "Using Duplicate everywhere and creating maintenance nightmares",
      "Referencing a query and not realizing both load to the model",
      "Breaking query folding by referencing after a non-foldable step",
      "Forgetting to disable load on staging queries",
      "Treating Reference as a free copy — re-evaluation cost still applies"
    ],
    examTips: [
      "Reference = link (changes flow through); Duplicate = copy (independent)",
      "Disable load on staging queries that only feed others",
      "Reference can break query folding if used after non-foldable steps",
      "Both can affect refresh time"
    ]
  },

  "Merge and append queries": {
    overview: {
      title: "Joining and Stacking Queries",
      concepts: [
        "Merge joins two queries side-by-side on key columns (like SQL JOIN)",
        "Join kinds: Left Outer (default), Right Outer, Full Outer, Inner, Left/Right Anti",
        "Append stacks queries vertically — schemas should align",
        "Append Three or More for combining multiple monthly files",
        "Both produce a new query step; Merge adds a navigable nested table column"
      ]
    },
    bestPractices: [
      "Choose join kind deliberately — Left Outer is default but not always right",
      "Set proper data types on key columns before merging",
      "Append with consistent schemas (use Choose Columns to align)",
      "Use folder source for repetitive Append (e.g. monthly CSVs)",
      "Watch for many-to-many merges that explode row counts"
    ],
    commonMistakes: [
      "Forgetting Inner vs Left Outer and silently dropping rows",
      "Appending queries with mismatched column names / casing",
      "Merging on text keys with whitespace or case differences",
      "Performing Merge before Filter, hurting performance",
      "Not expanding the merged column after the Merge step"
    ],
    examTips: [
      "Merge = horizontal join (like SQL); Append = vertical stack (like UNION)",
      "Six join kinds: Left/Right/Full Outer, Inner, Left/Right Anti",
      "Append requires aligned schemas",
      "Anti joins find rows without matches — useful for QA"
    ]
  },

  "Identify and create appropriate keys for relationships": {
    overview: {
      title: "Designing Keys",
      concepts: [
        "Keys uniquely identify dimension rows and link facts to dimensions",
        "Surrogate keys (integer) are preferred over natural keys (text) for performance",
        "Composite keys can be merged into a single concatenated key column",
        "Keys must be unique on the dimension side for one-to-many",
        "Mismatched key types (Int vs Text) prevent relationships"
      ]
    },
    bestPractices: [
      "Use integer surrogate keys whenever possible",
      "Verify uniqueness on the dimension side before creating the relationship",
      "Concatenate composite keys into one column with a clear separator",
      "Match data types exactly between fact and dim keys",
      "Hide key columns from report view — they're plumbing, not insight"
    ],
    commonMistakes: [
      "Using text GUIDs as keys when integers would be faster",
      "Missing duplicates on the dimension side",
      "Mismatched data types preventing relationship creation",
      "Composite keys not concatenated, requiring inactive relationships",
      "Showing key columns in the report's Fields list"
    ],
    examTips: [
      "Integer surrogate keys are most efficient",
      "Dimension side must be unique — no duplicates",
      "Data types must match exactly (Whole Number ≠ Text)",
      "Composite keys: concatenate into one merged key column"
    ]
  },

  "Configure data loading for queries": {
    overview: {
      title: "Controlling Which Queries Load",
      concepts: [
        "Right-click query > Enable load to control whether it loads to the model",
        "Right-click query > Include in report refresh controls scheduled refresh participation",
        "Disable load on staging / utility queries to keep the model clean",
        "Background data download options affect Service refresh behavior",
        "Query dependencies view shows which queries feed which"
      ]
    },
    bestPractices: [
      "Disable load on intermediate / staging queries",
      "Keep load enabled only for queries that become tables in the model",
      "Use Query Dependencies view to audit the pipeline",
      "Document why a query has load disabled",
      "Test refresh after toggling load settings"
    ],
    commonMistakes: [
      "Loading every query and bloating the model with utility tables",
      "Disabling load and then losing the staging table you needed",
      "Forgetting to include a query in refresh after enabling load",
      "Not documenting load decisions for future maintainers",
      "Confusing 'Enable load' with 'Include in refresh'"
    ],
    examTips: [
      "Enable load = does the query become a table in the model?",
      "Include in refresh = does it run during scheduled refresh?",
      "Disable load on staging queries by default",
      "Query Dependencies view is in View tab"
    ]
  }
};
