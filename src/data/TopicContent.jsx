// Comprehensive content for each syllabus topic
import { prepareDataContent } from './content/PrepareDataContent';
import { modelDataContent } from './content/ModelDataContent';
import { visualizeAnalyzeContent } from './content/VisualizeAnalyzeContent';
import { deployMaintainContent } from './content/DeployMaintainContent';
import { visualizationTopicsContent } from './content/VisualizationTopicsContent';
import { copilotAndDAXContent } from './content/CopilotAndDAXContent';
import { enhanceReportsContent } from './content/EnhanceReportsContent';
import { interactionAndNavigationContent } from './content/InteractionAndNavigationContent';
import { advancedReportDesignContent } from './content/AdvancedReportDesignContent';
import { analyticsAndInsightsContent } from './content/AnalyticsAndInsightsContent';
import { remainingTopicsContent } from './content/RemainingTopicsContent';
import { manageSecureCompletionContent } from './content/ManageSecureCompletionContent';
import { securityGovernanceContent } from './content/SecurityGovernanceContent';

export const topicContent = {
  // Import content from organized files
  ...prepareDataContent,
  ...modelDataContent,
  ...visualizeAnalyzeContent,
  ...deployMaintainContent,
  ...visualizationTopicsContent,
  ...copilotAndDAXContent,
  ...enhanceReportsContent,
  ...interactionAndNavigationContent,
  ...advancedReportDesignContent,
  ...analyticsAndInsightsContent,
  ...remainingTopicsContent,
  ...manageSecureCompletionContent,
  ...securityGovernanceContent,
  "Identify and connect to data sources or a shared semantic model": {
    overview: {
      title: "Understanding Data Connectivity in Power BI",
      concepts: [
        "Power BI supports 100+ data connectors including databases, cloud services, files, and APIs",
        "Shared semantic models (formerly datasets) enable consistent business logic across multiple reports",
        "Connection modes include Import, DirectQuery, Live Connection, and Composite models",
        "Authentication methods vary by source: Windows, Database credentials, OAuth, API keys",
        "Data gateway enables secure connectivity to on-premises data sources"
      ]
    },
    bestPractices: [
      "Use shared semantic models when available to ensure consistent business logic across reports",
      "Document all data source credentials and connection strings in a secure location",
      "Test connectivity thoroughly before building reports to avoid refresh failures",
      "Use parameters for connection strings to enable easy environment switching (dev/test/prod)",
      "Implement proper security with least-privilege access to data sources",
      "Prefer certified or trusted connectors over custom connectors when available"
    ],
    commonMistakes: [
      "Hardcoding server names and database names instead of using parameters",
      "Not documenting which authentication method is required for each source",
      "Connecting directly to production databases without considering impact",
      "Ignoring privacy levels which can prevent query folding",
      "Not testing connections with different user accounts to verify security",
      "Forgetting to update gateway configuration when moving to production"
    ],
    keySteps: [
      "Click 'Get Data' and select the appropriate connector from the list",
      "Enter connection details (server name, database, file path, etc.)",
      "Select authentication method and provide credentials",
      "Choose connection mode (Import vs DirectQuery) based on requirements",
      "Preview data to verify connectivity before loading",
      "Configure privacy levels to enable query folding where possible"
    ],
    keyDecisions: [
      "**Use existing semantic model?** - YES: Live connection, get consistent logic; NO: New connection, full control",
      "**Source is on-premises?** - YES: Requires data gateway; NO: Direct cloud connectivity",
      "**Need real-time data?** - YES: DirectQuery or Live; NO: Import mode suitable",
      "**Multiple data sources?** - YES: Consider composite model; NO: Single mode sufficient",
      "**Source requires authentication?** - YES: Configure credentials properly; NO: Anonymous access if available"
    ],
    keyDefinitions: [
      "**Semantic Model**: Published dataset containing data, relationships, and measures that can be shared across reports",
      "**DirectQuery**: Connection mode where queries are sent to source in real-time without importing data",
      "**Import Mode**: Data is loaded into Power BI's in-memory engine for fast querying",
      "**Data Gateway**: Software that enables secure connectivity between Power BI Service and on-premises data",
      "**Query Folding**: Power Query operations translated to native source queries for better performance",
      "**Live Connection**: Direct connection to Analysis Services or Power BI semantic model without importing"
    ],
    risks: [
      "**Performance risk**: Poor source performance impacts DirectQuery report speed",
      "**Security risk**: Overly permissive credentials expose sensitive data",
      "**Availability risk**: Source downtime breaks DirectQuery reports",
      "**Gateway dependency**: On-premises sources require gateway maintenance and monitoring",
      "**Credential expiration**: Passwords change breaks scheduled refresh without notification",
      "**Network limitation**: Firewall rules may block connectivity from Power BI service"
    ],
    faqs: [
      {
        q: "Can I connect to multiple data sources in one report?",
        a: "Yes, Power BI supports combining data from multiple sources using Power Query or composite models. Consider privacy levels and authentication requirements."
      },
      {
        q: "What's the difference between Import and DirectQuery?",
        a: "Import loads data into memory for fast queries but requires refresh. DirectQuery queries the source in real-time keeping data current but with potential performance impact."
      },
      {
        q: "How do I connect to on-premises SQL Server?",
        a: "Install and configure the On-premises Data Gateway, then use SQL Server connector with gateway option selected in Power BI Service."
      },
      {
        q: "Can I use the same connection for multiple reports?",
        a: "Yes, either by connecting to a shared semantic model or by publishing your model and connecting other reports to it as a live connection."
      },
      {
        q: "What authentication methods are supported?",
        a: "Varies by connector: Windows Authentication, SQL Server Authentication, OAuth 2.0, API keys, Service Principal, and Anonymous (when allowed)."
      },
      {
        q: "How do I handle dynamic server names?",
        a: "Use parameters in Power Query to make server names and database names dynamic, allowing easy switching between environments."
      }
    ],
    examTips: [
      "Memorize which connectors support DirectQuery (SQL Server, Azure SQL, SAP HANA, etc.)",
      "Know the difference between Live Connection and DirectQuery modes",
      "Understand when data gateway is required (on-premises sources)",
      "Be able to identify appropriate authentication methods for common sources",
      "Know that privacy levels affect query folding capabilities",
      "Understand that shared semantic models promote consistency and governance"
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
        title: "Get data from data sources",
        url: "https://learn.microsoft.com/training/modules/get-data/",
        type: "Microsoft Learn"
      }
    ]
  },

  "Change data source settings, including credentials and privacy levels": {
    overview: {
      title: "Managing Data Source Settings",
      concepts: [
        "Data source settings control authentication, privacy, and connection parameters",
        "Privacy levels (Private, Organizational, Public) affect query folding behavior",
        "Credentials are stored securely and can be updated without recreating queries",
        "Gateway data sources require separate credential configuration in Power BI Service",
        "Changing settings may impact existing queries and relationships"
      ]
    },
    bestPractices: [
      "Document privacy level decisions with business justification",
      "Use organizational privacy level as default for internal data sources",
      "Implement credential rotation policies for security compliance",
      "Test query folding after changing privacy levels",
      "Use service principal authentication for Azure sources in production",
      "Keep data source settings consistent across development and production environments"
    ],
    commonMistakes: [
      "Setting all sources to Private unnecessarily, preventing query folding",
      "Not updating credentials after password changes, causing silent refresh failures",
      "Mixing privacy levels without understanding the impact on performance",
      "Forgetting to update gateway credentials separately from Desktop credentials",
      "Not testing after credential changes before publishing",
      "Using personal accounts instead of service accounts for scheduled refresh"
    ],
    keySteps: [
      "Navigate to Transform Data > Data source settings",
      "Select the data source you want to modify",
      "Click 'Edit Permissions' to access credentials and privacy settings",
      "Update authentication credentials if needed",
      "Set appropriate privacy level based on data sensitivity and source relationship",
      "Click OK and test queries to ensure connectivity works"
    ],
    keyDecisions: [
      "**Privacy level?** - Private: sensitive data; Organizational: internal data; Public: external data",
      "**Credentials expired?** - YES: Update in both Desktop and Service/Gateway; NO: Leave unchanged",
      "**Use service account?** - YES: Better for production refresh; NO: Personal account only for dev",
      "**Gateway required?** - YES: Configure separately in gateway settings; NO: Update in Desktop only",
      "**Query folding broken?** - YES: Review privacy levels; NO: Settings are compatible"
    ],
    keyDefinitions: [
      "**Privacy Levels**: Settings that control how Power Query can combine data from different sources",
      "**Private**: Data source contains sensitive information and cannot be combined with other sources during query folding",
      "**Organizational**: Internal data that can be combined with other organizational sources",
      "**Public**: Publicly accessible data that can freely combine with any source",
      "**Credential Encryption**: Power BI encrypts stored credentials using Windows DPAPI or OAuth tokens",
      "**Service Principal**: Azure AD application identity used for unattended authentication"
    ],
    risks: [
      "**Query folding failure**: Incorrect privacy levels prevent optimization",
      "**Refresh failure**: Expired credentials cause scheduled refresh to fail",
      "**Security exposure**: Overly permissive privacy levels may combine sensitive data inappropriately",
      "**Performance degradation**: Lost query folding forces local processing",
      "**Credential leakage**: Sharing PBIX files with embedded credentials exposes passwords",
      "**Service interruption**: Forgotten password changes break production reports"
    ],
    faqs: [
      {
        q: "Why did my query folding stop working after changing privacy levels?",
        a: "Combining sources with incompatible privacy levels (e.g., Private with Public) prevents query folding. Set compatible privacy levels or isolate sources."
      },
      {
        q: "How do I update credentials for scheduled refresh?",
        a: "In Power BI Service, go to dataset settings > Data source credentials > Edit credentials. For gateway sources, update in gateway configuration."
      },
      {
        q: "What happens if I forget to update credentials after password change?",
        a: "Scheduled refresh will fail. Set up email alerts in dataset settings to be notified of refresh failures immediately."
      },
      {
        q: "Should I use my personal account for production datasets?",
        a: "No, use a service account or service principal. Personal accounts create dependencies and security risks."
      },
      {
        q: "Can I see stored credentials in Power BI?",
        a: "No, credentials are encrypted. You can only update them, not view them. This is a security feature."
      },
      {
        q: "Do privacy levels apply in DirectQuery mode?",
        a: "Privacy levels primarily affect Import mode query folding. DirectQuery sends queries directly to source regardless of privacy level."
      }
    ],
    examTips: [
      "Know the three privacy levels and their purposes",
      "Understand that mixing Private with other levels prevents query folding",
      "Remember that gateway sources require separate credential configuration",
      "Be able to identify when to use service principal vs user credentials",
      "Know that data source settings in Desktop differ from Service/Gateway settings",
      "Understand the security implications of embedded credentials in PBIX files"
    ],
    resources: [
      {
        title: "Privacy levels in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/admin/desktop-privacy-levels",
        type: "Documentation"
      },
      {
        title: "Configure scheduled refresh",
        url: "https://learn.microsoft.com/power-bi/connect-data/refresh-scheduled-refresh",
        type: "Documentation"
      },
      {
        title: "Clean, transform, and load data in Power BI",
        url: "https://learn.microsoft.com/training/paths/prepare-data-power-bi/",
        type: "Microsoft Learn"
      }
    ]
  }

  ,

  "Choose between DirectLake, DirectQuery, and Import": {
    overview: {
      title: "Connection Modes: DirectLake, DirectQuery, and Import",
      concepts: [
        "DirectLake mode reads data directly from OneLake (Fabric) without importing or querying — fastest for large datasets in Fabric",
        "Import mode loads data into Power BI's in-memory engine (VertiPaq) for blazing-fast queries",
        "DirectQuery sends queries directly to the source database in real-time without storing data",
        "Import mode requires scheduled refresh to keep data current",
        "DirectQuery always shows current data but performance depends on source database",
        "Composite models allow combining Import and DirectQuery for optimal balance"
      ]
    },
    bestPractices: [
      "Use DirectLake for Fabric/OneLake sources — it combines the speed of Import with the freshness of DirectQuery",
      "Use Import mode for non-Fabric sources where best performance is required",
      "Choose DirectQuery when data freshness is critical (real-time dashboards, operational reports)",
      "Use DirectQuery for very large datasets (100GB+) that won't fit in memory outside of Fabric",
      "Optimize source database with indexes and materialized views when using DirectQuery",
      "Consider composite models to import dimension tables while keeping facts in DirectQuery",
      "Test DirectQuery performance thoroughly before deploying to production"
    ],
    commonMistakes: [
      "Confusing DirectLake with DirectQuery — DirectLake is Fabric-only and reads from Delta Parquet files in OneLake",
      "Using DirectQuery for everything without considering performance impact",
      "Not optimizing source database queries leading to slow DirectQuery reports",
      "Choosing Import for real-time requirements then struggling with refresh frequency",
      "Forgetting that DirectQuery doesn't support all DAX functions and Power Query transformations",
      "Not considering network latency between Power BI Service and data source",
      "Using DirectQuery with sources that don't support query folding"
    ],
    keySteps: [
      "Analyze requirements: data freshness needs, dataset size, query performance requirements",
      "In Power Query, select connection mode in data source settings",
      "For Import: Configure refresh schedule (up to 8x daily with Pro, 48x with Premium)",
      "For DirectQuery: Ensure source database is optimized with proper indexes",
      "Test query performance with realistic data volumes and user concurrency",
      "Monitor query performance using Performance Analyzer and DAX Studio"
    ],
    keyDecisions: [
      "**Need real-time data?** - YES: DirectQuery or Live Connection; NO: Import mode sufficient",
      "**Dataset larger than available memory?** - YES: DirectQuery or aggregations; NO: Import works",
      "**Source database optimized for queries?** - YES: DirectQuery viable; NO: Import recommended",
      "**Need all Power Query transformations?** - YES: Import required; NO: DirectQuery possible",
      "**Multiple users querying simultaneously?** - YES: Import for better performance; NO: Either works"
    ],
    keyDefinitions: [
      "**DirectLake**: Fabric-only mode that reads Delta Parquet files directly from OneLake — no import, no query passthrough, near-instant refresh",
      "**Import Mode**: Data is copied into Power BI's columnar in-memory database (VertiPaq) for fast queries",
      "**DirectQuery**: Real-time connection where each visual sends queries directly to source database",
      "**Composite Model**: Combines Import and DirectQuery, allowing some tables in each mode",
      "**Aggregations**: Pre-calculated summary tables in Import mode to accelerate DirectQuery queries",
      "**Query Folding**: Power Query transformations translated to source database queries",
      "**VertiPaq**: Power BI's highly compressed columnar in-memory database engine"
    ],
    risks: [
      "**DirectLake fallback risk**: DirectLake may fall back to DirectQuery if data volume exceeds capacity thresholds",
      "**DirectQuery performance risk**: Slow source database = slow reports, impacting user experience",
      "**Import refresh failure risk**: Scheduled refresh breaks leave reports with stale data",
      "**Source availability risk**: DirectQuery reports fail if source database is down",
      "**Memory limitation**: Very large datasets may not fit in Import mode",
      "**Transformation limitation**: Many Power Query operations not supported in DirectQuery",
      "**Concurrent query risk**: Multiple DirectQuery users can overwhelm source database"
    ],
    faqs: [
      {
        q: "What is DirectLake and when should I use it?",
        a: "DirectLake is a Fabric-only connection mode that reads Delta Parquet files directly from OneLake. Use it when your data lives in Microsoft Fabric — it gives Import-like speed without needing to refresh the dataset."
      },
      {
        q: "How do I decide between Import, DirectQuery, and DirectLake?",
        a: "Use DirectLake for Fabric/OneLake sources. Use Import for non-Fabric sources needing best performance. Choose DirectQuery only when you need real-time data from non-Fabric sources or have datasets too large for memory."
      },
      {
        q: "Can I change from Import to DirectQuery later?",
        a: "Yes, but you'll need to reconfigure the connection and may need to adjust measures and transformations that aren't supported in DirectQuery mode."
      },
      {
        q: "What's the maximum dataset size for Import mode?",
        a: "Depends on available memory and compression. Typical limits: 1GB PBIX = 10-20GB source data. Premium supports larger datasets with incremental refresh."
      },
      {
        q: "Why is my DirectQuery report slow?",
        a: "Check source database performance, add indexes, reduce visual complexity, use aggregations, or consider switching to Import mode for better user experience."
      },
      {
        q: "Can I use both Import and DirectQuery in one model?",
        a: "Yes, this is called a Composite Model. You can import dimension tables for speed while keeping large fact tables in DirectQuery."
      },
      {
        q: "Does DirectQuery support all DAX functions?",
        a: "No, some DAX functions and Power Query transformations are not supported. Always test your measures after switching to DirectQuery."
      }
    ],
    examTips: [
      "Know the performance trade-offs: Import is faster, DirectQuery is more current",
      "Memorize which scenarios require DirectQuery (real-time, very large datasets)",
      "Understand that Import mode requires scheduled refresh configuration",
      "Know that DirectQuery has limitations with DAX functions and transformations",
      "Recognize that composite models offer the best of both modes",
      "Remember that DirectQuery performance depends on source database optimization"
    ],
    resources: [
      {
        title: "Use DirectQuery in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-use-directquery",
        type: "Documentation"
      },
      {
        title: "Dataset modes in the Power BI service",
        url: "https://learn.microsoft.com/power-bi/connect-data/service-dataset-modes-understand",
        type: "Documentation"
      },
      {
        title: "Choose a Power BI model framework",
        url: "https://learn.microsoft.com/power-bi/guidance/model-framework",
        type: "Best Practices"
      }
    ]
  },

  "Create and modify parameters": {
    overview: {
      title: "Dynamic Configuration with Parameters",
      concepts: [
        "Parameters are reusable values that can be referenced throughout Power Query",
        "Common uses: dynamic server names, file paths, date ranges, and filter values",
        "Parameters enable easy switching between development, test, and production environments",
        "Parameters can be exposed to report users for interactive filtering",
        "Parameters work with all data sources and can be combined with custom functions"
      ]
    },
    bestPractices: [
      "Create parameters for any value that might change between environments (servers, paths)",
      "Use descriptive names that clearly indicate what the parameter controls",
      "Document parameter purposes and expected values in description field",
      "Set appropriate default values that work for most common scenarios",
      "Group related parameters together for better organization",
      "Test parameter changes thoroughly before deploying to production"
    ],
    commonMistakes: [
      "Hardcoding values that should be parameters (server names, file paths)",
      "Not providing clear descriptions making parameters confusing for others",
      "Creating too many parameters that overwhelm users",
      "Forgetting to update parameter values when moving between environments",
      "Not validating parameter inputs leading to errors",
      "Using parameters for values that never change"
    ],
    keySteps: [
      "In Power Query Editor, go to Home tab > Manage Parameters > New Parameter",
      "Enter parameter name, description, and data type",
      "Set default value that will be used initially",
      "Optionally enable 'Current Value' for different values in Desktop vs Service",
      "Reference parameter in queries using parameter name in formulas",
      "Test queries with different parameter values to ensure they work correctly"
    ],
    keyDecisions: [
      "**Value changes between environments?** - YES: Create parameter; NO: Use literal value",
      "**Users need to change this value?** - YES: Expose in report; NO: Keep internal",
      "**Value used in multiple queries?** - YES: Parameter is perfect; NO: Consider if needed",
      "**Need different Desktop vs Service values?** - YES: Use Current Value; NO: Single value sufficient",
      "**Complex logic required?** - YES: Consider custom function; NO: Simple parameter works"
    ],
    keyDefinitions: [
      "**Parameter**: A named value that can be referenced and reused across queries in Power Query",
      "**Current Value**: Separate value for Power BI Service that differs from Desktop default value",
      "**Parameter Data Type**: Type constraint (Text, Number, Date, etc.) that validates parameter values",
      "**Query Parameter**: Power Query M language variable prefixed with 'let' statement",
      "**Dynamic Data Source**: Connection string or path built using parameter values",
      "**Parameter Table**: Query that lists all parameter values for documentation or management"
    ],
    risks: [
      "**Configuration risk**: Wrong parameter values break data refresh",
      "**Security risk**: Exposed parameters might allow access to unintended data sources",
      "**Validation risk**: No input validation can lead to query errors",
      "**Documentation risk**: Undocumented parameters confuse maintenance",
      "**Migration risk**: Forgetting to update parameters when deploying to new environment",
      "**Complexity risk**: Too many parameters make solution difficult to maintain"
    ],
    faqs: [
      {
        q: "How do I use a parameter in a connection string?",
        a: "Reference the parameter name directly in the connection formula: Source = Sql.Database(ServerParameter, DatabaseParameter)"
      },
      {
        q: "Can I change parameter values in Power BI Service?",
        a: "Yes, go to dataset settings > Parameters to update values after publishing. Changes apply to all reports using that dataset."
      },
      {
        q: "What's the difference between default value and current value?",
        a: "Default value is used in Desktop. Current value is for Service and overrides the default when published."
      },
      {
        q: "Can parameters be used in DirectQuery?",
        a: "Yes, but with limitations. Server and database parameters work, but filter parameters may not fold properly."
      },
      {
        q: "How do I create a dynamic file path parameter?",
        a: "Create Text parameter with folder path, then concatenate with filename: FilePath = FolderParameter & \"/\" & \"data.csv\""
      },
      {
        q: "Can I validate parameter values?",
        a: "Not directly in parameter settings, but you can add validation logic in queries using if/then statements."
      }
    ],
    examTips: [
      "Know how to create and modify parameters in Power Query Editor",
      "Understand the difference between default value and current value",
      "Recognize scenarios where parameters improve maintainability",
      "Remember that parameters can be updated in Power BI Service after publishing",
      "Know how to reference parameters in M code (just use parameter name)",
      "Understand that parameters enable environment-agnostic solutions"
    ],
    resources: [
      {
        title: "Create and use query parameters in Power Query",
        url: "https://learn.microsoft.com/power-query/power-query-query-parameters",
        type: "Documentation"
      },
      {
        title: "Dynamic M query parameters in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-dynamic-m-query-parameters",
        type: "Documentation"
      },
      {
        title: "Get data from data sources",
        url: "https://learn.microsoft.com/training/modules/get-data/",
        type: "Microsoft Learn"
      }
    ]
  },

  "Evaluate data, including data statistics and column properties": {
    overview: {
      title: "Data Profiling and Quality Assessment",
      concepts: [
        "Data profiling reveals quality issues, patterns, and characteristics before modeling",
        "Column Quality shows percentages of valid, error, and empty values at a glance",
        "Column Distribution displays value frequency and distribution across the dataset",
        "Column Profile provides detailed statistics (min, max, average, standard deviation, distinct values)",
        "Power Query evaluates only the first 1000 rows by default; change to entire dataset for accurate profiling"
      ]
    },
    bestPractices: [
      "Enable 'Column profiling based on entire dataset' in Power Query Editor status bar",
      "Profile data immediately after loading to identify issues early",
      "Check data quality metrics (valid, error, empty percentages) for all columns",
      "Review distinct value counts to identify potential cardinality issues",
      "Examine data distribution to spot outliers and unexpected patterns",
      "Document data quality findings before starting transformations"
    ],
    commonMistakes: [
      "Profiling only first 1000 rows and missing issues in larger dataset",
      "Skipping data profiling and discovering quality issues later in development",
      "Not checking for unexpected null values that indicate source data problems",
      "Ignoring error values that need investigation and resolution",
      "Overlooking high cardinality in columns that should have few distinct values",
      "Not reviewing data types which may be incorrectly detected"
    ],
    keySteps: [
      "Open Power Query Editor from Transform Data button",
      "In View tab, enable: Column Quality, Column Distribution, Column Profile",
      "Click status bar to change from 'Top 1000 rows' to 'Entire dataset'",
      "Review Column Quality: look for errors (red) and empty values (gray)",
      "Check Column Distribution: identify skewed distributions and outliers",
      "Select columns individually to see detailed statistics in Column Profile pane",
      "Document issues found and plan transformations needed"
    ],
    keyDecisions: [
      "**Profile 1000 rows or entire dataset?** - Small dataset: entire; Large dataset: sample acceptable",
      "**Accept data quality as-is?** - High quality: proceed; Poor quality: clean or discuss with source owners",
      "**Handle errors found?** - Fix in source: best; Transform in Power Query: acceptable; Remove rows: last resort",
      "**Null values acceptable?** - Expected: keep with handling logic; Unexpected: investigate source issue",
      "**Cardinality appropriate?** - As expected: continue; Unexpected: validate data or revisit model design"
    ],
    keyDefinitions: [
      "**Column Quality**: Visual indicator showing percentage of valid, error, and empty values in each column",
      "**Column Distribution**: Bar chart showing frequency distribution of values in a column",
      "**Column Profile**: Detailed statistics pane with count, distinct values, unique values, min/max, and distribution",
      "**Data Profiling**: Process of examining data to understand its structure, quality, and characteristics",
      "**Cardinality**: Number of distinct values in a column (high cardinality = many unique values)",
      "**Data Statistics**: Numerical summaries including count, sum, average, min, max, standard deviation"
    ],
    risks: [
      "**Sampling risk**: Profiling only 1000 rows may miss issues present in full dataset",
      "**Performance risk**: Profiling very large datasets can be slow",
      "**False confidence**: Good sample quality doesn't guarantee full dataset quality",
      "**Overlooked errors**: Not reviewing profiling results leads to model issues later",
      "**Type misdetection**: Auto-detected types may be wrong, causing transformation failures",
      "**Memory risk**: Profiling extremely large datasets may consume significant memory"
    ],
    faqs: [
      {
        q: "Why does Column Quality show different results than I expected?",
        a: "By default, Power Query profiles only the first 1000 rows. Click the status bar and select 'Column profiling based on entire dataset' for accurate results."
      },
      {
        q: "What's the difference between 'distinct' and 'unique' values?",
        a: "Distinct = total number of different values. Unique = values that appear only once. Example: [1,1,2,3,3] has 3 distinct but only 1 unique value (2)."
      },
      {
        q: "Should I profile data before or after transformations?",
        a: "Both. Profile raw data first to understand source quality, then profile after transformations to verify results."
      },
      {
        q: "How do I find which rows have errors?",
        a: "Filter the column to show only 'Error' values, then investigate those rows to understand the issue."
      },
      {
        q: "Does data profiling affect query performance?",
        a: "Profiling is only in Power Query Editor during development. It doesn't impact report performance after publishing."
      },
      {
        q: "Can I export profiling statistics?",
        a: "Not directly, but you can create queries that calculate statistics and export those results to document data quality."
      }
    ],
    examTips: [
      "Know how to enable Column Quality, Distribution, and Profile in View tab",
      "Remember to change profiling from 1000 rows to entire dataset",
      "Understand what each profiling feature shows (quality, distribution, statistics)",
      "Recognize that error values need investigation and handling",
      "Know that profiling helps identify data quality issues early",
      "Remember Column Quality shows three categories: Valid, Error, Empty"
    ],
    resources: [
      {
        title: "Use column quality, column distribution, and column profile",
        url: "https://learn.microsoft.com/power-query/data-profiling-tools",
        type: "Documentation"
      },
      {
        title: "Profile data in Power BI",
        url: "https://learn.microsoft.com/training/modules/clean-data-power-bi/2-data-structure",
        type: "Microsoft Learn"
      },
      {
        title: "Data profiling in Power Query",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-query-overview",
        type: "Documentation"
      }
    ]
  },

  "Resolve inconsistencies, unexpected or null values, and data quality issues": {
    overview: {
      title: "Data Cleansing and Quality Improvement",
      concepts: [
        "Data quality issues include inconsistent formatting, typos, missing values, and outliers",
        "Power Query provides transformation tools to clean and standardize data",
        "Replace Values handles simple substitutions and error corrections",
        "Fill operations propagate values up or down to handle missing data",
        "Remove operations eliminate problematic rows or columns that can't be fixed"
      ]
    },
    bestPractices: [
      "Document all data cleaning decisions and transformations applied",
      "Use Replace Values for consistent corrections (typos, abbreviations)",
      "Apply Fill Down/Up for missing values in sequential data",
      "Use Replace Errors to substitute error values with defaults or nulls",
      "Trim whitespace from text columns to avoid matching issues",
      "Standardize text case (Upper, Lower, Proper) for consistency",
      "Remove duplicate rows only after confirming they're truly duplicates"
    ],
    commonMistakes: [
      "Removing rows with nulls when those nulls are valid and expected",
      "Not trimming whitespace causing 'NYC ' to differ from 'NYC'",
      "Replacing all nulls with zeros (may distort averages and analysis)",
      "Using Remove Duplicates without understanding which columns determine uniqueness",
      "Not documenting why data was cleaned, making audits difficult",
      "Applying global changes that should only affect specific rows"
    ],
    keySteps: [
      "Identify issues using Column Quality and data profiling tools",
      "For typos/inconsistencies: Transform > Replace Values",
      "For missing sequential values: Transform > Fill > Fill Down or Fill Up",
      "For errors: Transform > Replace Errors with appropriate default",
      "For whitespace: Transform > Format > Trim or Clean",
      "For case issues: Transform > Format > Uppercase/Lowercase/Capitalize Each Word",
      "For duplicates: Home > Remove Rows > Remove Duplicates (select key columns)"
    ],
    keyDecisions: [
      "**Fix at source or in Power Query?** - Source: best if possible; Power Query: when source can't be changed",
      "**Replace nulls or keep them?** - Expected nulls: keep; Missing data: fill or replace",
      "**Remove or fix bad data?** - Fixable: transform; Unfixable: remove; Critical: escalate to source",
      "**Duplicates: Remove or keep?** - True duplicates: remove; Legitimate repeats: keep",
      "**Standardization approach?** - Few variations: Replace Values; Many variations: more complex transformations"
    ],
    keyDefinitions: [
      "**Replace Values**: Substitutes specified values with new values throughout a column",
      "**Fill Down/Up**: Copies non-null values to fill null cells below or above",
      "**Replace Errors**: Converts error values to specified replacement (often null or default)",
      "**Trim**: Removes leading and trailing whitespace from text",
      "**Clean**: Removes non-printable characters from text",
      "**Remove Duplicates**: Deletes rows with duplicate values in selected columns"
    ],
    risks: [
      "**Data loss**: Removing rows may delete valuable information",
      "**Statistical distortion**: Replacing nulls with zeros skews calculations",
      "**Over-correction**: Too aggressive cleaning may alter data meaning",
      "**Audit issues**: Undocumented cleaning makes it hard to explain data changes",
      "**Performance impact**: Complex cleaning on large datasets slows refresh",
      "**False matches**: Not trimming whitespace causes join failures"
    ],
    faqs: [
      {
        q: "Should I replace null values with zeros?",
        a: "Not always. For counts, maybe yes. For averages, no (nulls are excluded but zeros aren't). Consider the analytical impact before replacing."
      },
      {
        q: "How do I fix inconsistent text like 'NY', 'N.Y.', 'New York'?",
        a: "Use Replace Values multiple times, or create a mapping table and merge to standardize values."
      },
      {
        q: "What's the difference between Trim and Clean?",
        a: "Trim removes leading/trailing spaces. Clean removes non-printable characters (like line breaks, tabs). Often use both."
      },
      {
        q: "Can I fill missing values with previous non-null value?",
        a: "Yes, use Fill Down. Select column > Transform > Fill > Down. It propagates last non-null value downward."
      },
      {
        q: "How do I remove only rows where specific column is null?",
        a: "Click column dropdown filter > uncheck 'null'. Or Transform > Remove Rows > Remove Blank Rows (on that column)."
      },
      {
        q: "Should I remove duplicate rows?",
        a: "Only if they're truly duplicates across all key columns. Don't remove duplicates on single columns that should have repeated values."
      }
    ],
    examTips: [
      "Know how to use Replace Values for data cleaning",
      "Understand when to use Fill Down/Up for missing values",
      "Remember Replace Errors converts error values to replacements",
      "Know that Trim removes whitespace (critical for text matching)",
      "Understand Remove Duplicates works on selected columns",
      "Recognize that null handling depends on analytical context"
    ],
    resources: [
      {
        title: "Clean, transform, and load data in Power BI",
        url: "https://learn.microsoft.com/training/modules/clean-data-power-bi/",
        type: "Microsoft Learn"
      },
      {
        title: "Replace values and errors in Power Query",
        url: "https://learn.microsoft.com/power-query/replace-values-and-errors",
        type: "Documentation"
      },
      {
        title: "Fill values in a column",
        url: "https://learn.microsoft.com/power-query/fill-values-column",
        type: "Documentation"
      }
    ]
  },

  "Resolve data import errors": {
    overview: {
      title: "Troubleshooting Data Loading Issues",
      concepts: [
        "Import errors occur from connectivity issues, permission problems, or data format mismatches",
        "Query diagnostics help identify where and why errors occur in the refresh process",
        "Error rows can be isolated using 'Keep Errors' to investigate problematic data",
        "Connection errors often stem from credential issues or firewall restrictions",
        "Data type errors happen when source data doesn't match expected column types"
      ]
    },
    bestPractices: [
      "Read error messages carefully - they usually indicate the root cause",
      "Use Query Diagnostics to trace performance and identify error locations",
      "Test connections immediately after creation to catch issues early",
      "Keep credentials updated and verify permissions on data sources",
      "Use 'Keep Errors' to isolate and examine problematic rows",
      "Document error resolutions for future troubleshooting reference"
    ],
    commonMistakes: [
      "Ignoring error messages and hoping refresh will work eventually",
      "Not checking firewall rules when connection errors occur",
      "Using incorrect credentials or outdated connection strings",
      "Not handling data type conversions that cause type errors",
      "Removing error rows without understanding why they failed",
      "Not testing queries after making changes to data sources"
    ],
    keySteps: [
      "Review error message in Power Query Editor or dataset settings",
      "For connection errors: Check credentials, network access, firewall rules",
      "For type errors: Review column data types and use appropriate conversions",
      "For permission errors: Verify account has read access to source",
      "Use Query Diagnostics: Tools > Session Diagnostics > Start Diagnostics",
      "Use 'Keep Errors' on columns to isolate problematic rows",
      "Fix root cause, then test refresh to confirm resolution"
    ],
    keyDecisions: [
      "**Connection vs data error?** - Connection: fix credentials/network; Data: fix transformations/types",
      "**Fix at source or handle in query?** - Source fixable: coordinate with source owners; Query: add error handling",
      "**Remove error rows or fix them?** - Few errors: fix individually; Many errors: investigate pattern and fix systematically",
      "**Immediate fix or escalate?** - Within control: fix; Infrastructure/permissions: escalate to IT",
      "**Continue with partial data?** - Critical data missing: stop; Non-critical: continue with filtering"
    ],
    keyDefinitions: [
      "**Query Diagnostics**: Tool that records detailed information about query execution for troubleshooting",
      "**Keep Errors**: Filtering option that shows only rows with errors for investigation",
      "**Data Source Error**: Connection or authentication failure preventing data access",
      "**Type Conversion Error**: Failure to convert data to expected type (e.g., text to number)",
      "**Expression Error**: M code syntax or logic error in transformations",
      "**Timeout Error**: Query execution exceeded time limit (common with slow sources or DirectQuery)"
    ],
    risks: [
      "**Undetected failures**: Scheduled refresh fails silently without notifications",
      "**Credential expiration**: Passwords expire causing refresh failures",
      "**Firewall changes**: Network changes break previously working connections",
      "**Schema drift**: Source column changes break transformations",
      "**Partial data loads**: Errors in one table may allow others to load, causing inconsistencies",
      "**Performance degradation**: Slow queries timeout after source data grows"
    ],
    faqs: [
      {
        q: "What does 'Could not find file' error mean?",
        a: "File path is incorrect, file was moved/deleted, or account lacks permission to access the location. Verify path and permissions."
      },
      {
        q: "How do I fix 'The key didn't match any rows in the table' error?",
        a: "This merge error means join keys don't match. Check for whitespace differences, case sensitivity, or missing records. Use Trim on both sides."
      },
      {
        q: "Why does my query work in Desktop but fail in Service?",
        a: "Usually credentials or data gateway issues. Ensure credentials are configured in Service and gateway is running if accessing on-premises data."
      },
      {
        q: "What is a 'Type Conversion' error?",
        a: "Power Query can't convert value to expected type (e.g., 'N/A' text to number). Use Replace Errors or conditional logic to handle these values."
      },
      {
        q: "How do I use Query Diagnostics?",
        a: "Tools > Session Diagnostics > Start Diagnostics, then perform the query operation. Stop diagnostics and review the generated diagnostic queries."
      },
      {
        q: "Can I set up error notifications for refresh failures?",
        a: "Yes, in Power BI Service dataset settings, configure refresh failure notifications to email you when errors occur."
      }
    ],
    examTips: [
      "Know common error types: connection, permissions, type conversion, timeout",
      "Understand Query Diagnostics tool helps trace errors and performance",
      "Remember 'Keep Errors' isolates problematic rows for investigation",
      "Know that Desktop vs Service errors often relate to credentials/gateway",
      "Recognize firewall/network issues cause connection errors",
      "Understand error handling is part of production-ready solution design"
    ],
    resources: [
      {
        title: "Diagnose and troubleshoot data refresh",
        url: "https://learn.microsoft.com/power-bi/connect-data/refresh-troubleshooting-refresh-scenarios",
        type: "Documentation"
      },
      {
        title: "Query diagnostics in Power Query",
        url: "https://learn.microsoft.com/power-query/query-diagnostics",
        type: "Documentation"
      },
      {
        title: "Troubleshoot refresh scenarios",
        url: "https://learn.microsoft.com/power-bi/connect-data/refresh-troubleshooting-refresh-scenarios",
        type: "Documentation"
      }
    ]
  },

  "Select appropriate column data types": {
    overview: {
      title: "Data Type Selection and Optimization",
      concepts: [
        "Data types define how Power BI stores and processes column values",
        "Correct data types ensure accurate calculations and optimal performance",
        "Power Query auto-detects types but often needs manual correction",
        "Text columns are larger and slower than numeric types",
        "Date/time types enable time intelligence and proper sorting"
      ]
    },
    bestPractices: [
      "Verify auto-detected types immediately after loading data",
      "Use most specific type possible (Integer instead of Decimal for whole numbers)",
      "Store dates as Date type, not Text, for proper chronological sorting",
      "Use Whole Number for IDs and counts (smaller storage than Decimal)",
      "Keep monetary values as Fixed Decimal Number (currency type)",
      "Use True/False for boolean flags instead of Text"
    ],
    commonMistakes: [
      "Leaving dates as Text type causing incorrect sorting",
      "Using Text for numeric codes that should be Whole Number",
      "Not changing Decimal to Whole Number for integers (wastes space)",
      "Storing Yes/No as Text instead of True/False boolean",
      "Using general Decimal instead of Fixed Decimal for currency",
      "Not handling data type errors that cause refresh failures"
    ],
    keySteps: [
      "Review auto-detected types in Power Query Editor",
      "Click column data type icon to change type",
      "For dates in non-standard format: Parse > Date/Time custom format",
      "For numeric codes: Change from Decimal/Text to Whole Number",
      "For currency: Select Fixed Decimal Number with 2 decimal places",
      "Test query to ensure type conversions don't produce errors"
    ],
    keyDecisions: [
      "**Numeric text or actual number?** - For calculations: Number; For display/IDs: can be Text",
      "**Decimal or Whole Number?** - Decimals needed: Decimal; Always integers: Whole Number",
      "**Date or DateTime?** - Time matters: DateTime; Date only: Date",
      "**Text or Boolean?** - Two states: Boolean; Multiple values: Text",
      "**Fixed Decimal or Currency?** - Monetary: Currency/Fixed Decimal; General numbers: Decimal"
    ],
    keyDefinitions: [
      "**Whole Number**: 64-bit integer (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807)",
      "**Decimal Number**: Floating point number with ~15-17 digits precision",
      "**Fixed Decimal Number**: Precise decimal with 4 decimal places (ideal for currency)",
      "**Text**: Character string of any length",
      "**True/False**: Boolean value (more efficient than Text 'Yes'/'No')",
      "**Date/DateTime**: Temporal values enabling time intelligence"
    ],
    risks: [
      "**Calculation errors**: Wrong types cause incorrect results (e.g., '2' + '3' = '23' if Text)",
      "**Performance issues**: Text columns are much larger and slower than numeric",
      "**Sorting problems**: Text dates sort alphabetically not chronologically",
      "**Refresh failures**: Type mismatches cause import errors",
      "**Memory waste**: Using Decimal for integers wastes storage",
      "**Join failures**: Mismatched types in keys prevent relationships"
    ],
    faqs: [
      {
        q: "Why does my date column sort incorrectly?",
        a: "It's stored as Text not Date. Change type to Date for proper chronological sorting."
      },
      {
        q: "Should account numbers be Whole Number or Text?",
        a: "Text if they have leading zeros, contain letters, or won't be used in calculations. Otherwise Whole Number."
      },
      {
        q: "What's the difference between Decimal and Fixed Decimal?",
        a: "Fixed Decimal has exactly 4 decimal places and is more precise for currency. Decimal is floating point."
      },
      {
        q: "Can I change data types in the model after loading?",
        a: "Yes, but better to set correctly in Power Query. Model changes don't update source queries."
      },
      {
        q: "Why are all my numbers showing as Text?",
        a: "Source data likely has non-numeric characters (commas, currency symbols). Clean first, then convert."
      }
    ],
    examTips: [
      "Know to use Whole Number for integers (IDs, counts)",
      "Remember Date type is essential for time intelligence",
      "Understand Fixed Decimal is best for currency values",
      "Know that Text types are larger and slower than numeric",
      "Recognize True/False is more efficient than Text for flags"
    ],
    resources: [
      {
        title: "Data types in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-data-types",
        type: "Documentation"
      }
    ]
  },

  "Create and transform columns": {
    overview: {
      title: "Column Manipulation and Transformation",
      concepts: [
        "Custom columns use M language to create new calculated columns",
        "Column from Examples learns patterns from your sample inputs",
        "Split Column divides text by delimiter or position",
        "Extract operations pull specific parts from text (before/after delimiter, length, range)",
        "Format transformations change case, trim whitespace, or clean data"
      ]
    },
    bestPractices: [
      "Use Column from Examples for quick pattern-based transformations",
      "Split columns by delimiter for structured text (CSV-like data)",
      "Extract specific portions rather than keeping full text column",
      "Rename columns immediately after creation for clarity",
      "Remove original column after successful transformation to reduce size",
      "Test transformations on sample data before applying to full dataset"
    ],
    commonMistakes: [
      "Creating custom columns in Power Query when DAX calculated columns are more appropriate",
      "Not removing source columns after transformation (wastes memory)",
      "Using complex M formulas when built-in transformations work",
      "Splitting columns without considering null handling",
      "Not testing edge cases (nulls, unexpected formats)",
      "Keeping too many intermediate transformation columns"
    ],
    keySteps: [
      "Add Column tab > Custom Column for M-based calculations",
      "Add Column > Column from Examples for pattern learning",
      "Transform tab > Split Column > By Delimiter/By Number of Characters",
      "Transform tab > Extract > Text Before/After Delimiter, First/Last Characters",
      "Transform tab > Format > Trim, Clean, Upper/Lower/Proper case",
      "Right-click column > Remove to delete unnecessary columns"
    ],
    keyDecisions: [
      "**Power Query or DAX column?** - PQ: data shaping; DAX: model calculations that change with filters",
      "**Custom Column or Column from Examples?** - Simple pattern: Examples; Complex logic: Custom Column",
      "**Split or Extract?** - Need all parts: Split; Need one part: Extract",
      "**Keep original column?** - For audit: keep; Standard ETL: remove after successful transform",
      "**Fixed position or delimiter split?** - Consistent positions: by position; Variable delimiter: by delimiter"
    ],
    keyDefinitions: [
      "**Custom Column**: New column created using M language expressions",
      "**Column from Examples**: AI-powered feature that learns transformation patterns",
      "**Split Column**: Divides one column into multiple based on delimiter or position",
      "**Extract**: Pulls specific text portion (before/after delimiter, first/last N characters)",
      "**Merge Columns**: Combines multiple columns into one with optional separator",
      "**Conditional Column**: Creates values based on if-then-else logic"
    ],
    risks: [
      "**Performance impact**: Complex transformations slow refresh",
      "**Null handling**: Not accounting for nulls causes errors",
      "**Pattern fragility**: Column from Examples may fail on new data patterns",
      "**Data loss**: Removing source column before verifying transformation",
      "**Query folding**: Complex M breaks folding, reducing performance",
      "**Maintenance burden**: Overly complex custom columns are hard to debug"
    ],
    faqs: [
      {
        q: "When should I create columns in Power Query vs DAX?",
        a: "Power Query for data shaping (split, extract, format). DAX for calculations that need to respond to filters/slicers."
      },
      {
        q: "How does Column from Examples work?",
        a: "You type examples of desired output, and AI generates M code to match your pattern. Great for quick transformations."
      },
      {
        q: "Can I split a column into more than 2 columns?",
        a: "Yes, Split Column by Delimiter can create multiple columns. Specify delimiter and choose 'Each occurrence'."
      },
      {
        q: "What's the difference between Trim and Clean?",
        a: "Trim removes leading/trailing spaces. Clean removes non-printable characters. Often use both."
      },
      {
        q: "How do I merge first and last name columns?",
        a: "Select both columns > Transform > Merge Columns, choose space as separator."
      }
    ],
    examTips: [
      "Know Split Column divides by delimiter or position",
      "Understand Extract pulls specific portions of text",
      "Remember Column from Examples for pattern-based transformations",
      "Know Format operations: Trim, Clean, case changes",
      "Recognize when to use Power Query vs DAX for columns"
    ],
    resources: [
      {
        title: "Add a custom column in Power Query",
        url: "https://learn.microsoft.com/power-query/add-custom-column",
        type: "Documentation"
      },
      {
        title: "Add a column from examples",
        url: "https://learn.microsoft.com/power-query/column-from-example",
        type: "Documentation"
      }
    ]
  },

  "Group and aggregate rows": {
    overview: {
      title: "Data Summarization Through Grouping",
      concepts: [
        "Group By aggregates data to summary level (like SQL GROUP BY)",
        "Common aggregations: Sum, Count, Average, Min, Max, Distinct Count",
        "Group by multiple columns for hierarchical summaries",
        "Advanced aggregations allow multiple aggregate columns in one operation",
        "Grouping reduces row count, improving model performance"
      ]
    },
    bestPractices: [
      "Group at appropriate grain for analysis needs",
      "Use meaningful names for aggregated columns",
      "Consider which columns to group by carefully (dimensions, not measures)",
      "Use Advanced grouping for multiple aggregations simultaneously",
      "Keep detail data if drill-through or detailed analysis is needed",
      "Test aggregations match expected results before proceeding"
    ],
    commonMistakes: [
      "Grouping too early, losing detail needed for other analysis",
      "Grouping by wrong columns causing incorrect aggregations",
      "Not using Distinct Count when duplicates exist",
      "Forgetting to include key dimensions in Group By",
      "Using Count instead of Count Rows (counts non-null, not all rows)",
      "Over-aggregating data that should remain detailed"
    ],
    keySteps: [
      "Select columns to group by (dimensions)",
      "Transform tab > Group By",
      "Click Advanced for multiple aggregations",
      "Add aggregations: select operation, column, and output name",
      "Common operations: Sum, Count Rows, Average, Min, Max, Count Distinct Values",
      "Verify results match expectations with sample checks"
    ],
    keyDecisions: [
      "**What grain to aggregate to?** - Analysis needs: daily/monthly/yearly; customer/product level",
      "**Group in Power Query or DAX?** - Fixed aggregation: Power Query; Dynamic by filter: DAX measures",
      "**Keep detail table or only summary?** - Both needed: keep both; Only summary: group and replace",
      "**Which aggregation functions?** - Total: Sum; Frequency: Count Rows; Unique: Count Distinct",
      "**Multiple aggregations?** - YES: Use Advanced grouping; NO: Basic grouping sufficient"
    ],
    keyDefinitions: [
      "**Group By**: Aggregates rows into groups based on unique combinations of specified columns",
      "**Count Rows**: Counts total rows in each group (including those with nulls)",
      "**Count Distinct Values**: Counts unique non-null values in a column",
      "**Sum/Average/Min/Max**: Standard mathematical aggregations on numeric columns",
      "**All Rows**: Special aggregation that creates nested table of all rows in group",
      "**Grain**: Level of detail in data (daily grain = one row per day)"
    ],
    risks: [
      "**Data loss**: Aggregating too early loses detail needed for other analysis",
      "**Wrong grain**: Grouping at incorrect level produces meaningless results",
      "**Performance trade-off**: While grouping reduces rows, sometimes detail is needed",
      "**Inflexibility**: Pre-aggregated data can't be sliced differently in visuals",
      "**Maintenance**: Business logic in transformations vs measures is harder to update",
      "**Double aggregation**: Aggregating already-aggregated data causes errors"
    ],
    faqs: [
      {
        q: "When should I aggregate in Power Query vs DAX measures?",
        a: "Power Query for fixed aggregations that don't change. DAX measures for flexible aggregations that respond to filters and slicers."
      },
      {
        q: "What's the difference between Count and Count Rows?",
        a: "Count counts non-null values in a column. Count Rows counts all rows regardless of nulls."
      },
      {
        q: "Can I group by date and get monthly totals?",
        a: "Yes, but first create a Year-Month column (extract year and month from date), then group by that."
      },
      {
        q: "How do I create multiple aggregations at once?",
        a: "Use Advanced option in Group By dialog, then add multiple aggregation columns."
      },
      {
        q: "Should I aggregate my sales data before loading?",
        a: "Usually no - keep transaction detail for flexibility. Aggregate using DAX measures instead."
      }
    ],
    examTips: [
      "Know Group By reduces data to summary level",
      "Understand Count Rows vs Count Distinct Values",
      "Remember Advanced grouping allows multiple aggregations",
      "Recognize when aggregation should be in Power Query vs DAX",
      "Know common aggregation functions: Sum, Average, Min, Max, Count"
    ],
    resources: [
      {
        title: "Group by in Power Query",
        url: "https://learn.microsoft.com/power-query/group-by",
        type: "Documentation"
      }
    ]
  },

  "Pivot, unpivot, and transpose data": {
    overview: {
      title: "Reshaping Data Structure",
      concepts: [
        "Unpivot transforms wide format (columns) to narrow format (rows) - most common",
        "Pivot transforms narrow format (rows) to wide format (columns) - less common",
        "Transpose flips rows and columns completely",
        "Unpivoting is essential for converting Excel crosstabs to proper data tables",
        "Normalized (unpivoted) data is ideal for Power BI modeling"
      ]
    },
    bestPractices: [
      "Unpivot column headers that represent values (months, products) not attributes",
      "Keep identifier columns (IDs, names) unchanged when unpivoting",
      "Use 'Unpivot Other Columns' to automatically include future columns",
      "Rename Attribute and Value columns immediately after unpivoting for clarity",
      "Test that unpivoted data produces correct relationships and calculations",
      "Document transformation logic for future reference"
    ],
    commonMistakes: [
      "Pivoting when unpivoting is needed (confusing the two operations)",
      "Unpivoting identifier columns by mistake",
      "Not renaming Attribute and Value columns after unpivoting",
      "Using 'Unpivot Columns' instead of 'Unpivot Other Columns' (less flexible)",
      "Not considering data types after unpivot (Value column becomes Text)",
      "Transposing when other operations are more appropriate"
    ],
    keySteps: [
      "**To Unpivot**: Select columns to keep (IDs), then Transform > Unpivot Columns > Unpivot Other Columns",
      "Rename 'Attribute' column to meaningful name (e.g., 'Month', 'Product')",
      "Rename 'Value' column to meaningful name (e.g., 'Sales', 'Quantity')",
      "Change Value column data type if needed (often auto-detects as Text)",
      "**To Pivot**: Select column to pivot, Transform > Pivot Column, choose value column and aggregation",
      "**To Transpose**: Transform > Transpose (flips entire table)"
    ],
    keyDecisions: [
      "**Pivot or Unpivot?** - Column headers are values: Unpivot; Rows need to be columns: Pivot",
      "**Unpivot Columns or Unpivot Other Columns?** - Fixed set: Unpivot Columns; Future columns: Unpivot Other",
      "**Which aggregation for Pivot?** - One value per combination: Don't aggregate; Multiple values: Sum/Avg/Count",
      "**Transpose needed?** - Rarely - usually Unpivot is what you want",
      "**Keep original table?** - For comparison: duplicate first; Standard ETL: transform in place"
    ],
    keyDefinitions: [
      "**Unpivot**: Converts multiple value columns into row format (wide to narrow)",
      "**Pivot**: Converts rows into multiple columns (narrow to wide)",
      "**Transpose**: Swaps rows and columns completely",
      "**Attribute Column**: After unpivot, contains former column names",
      "**Value Column**: After unpivot, contains the values from those columns",
      "**Normalized Data**: Properly structured data with values in rows not columns"
    ],
    risks: [
      "**Wrong operation**: Confusing pivot/unpivot leads to incorrect structure",
      "**Lost context**: Unpivoting without keeping identifiers loses data relationships",
      "**Type issues**: Unpivot creates Text value column even for numeric data",
      "**Inflexibility**: Pivot creates fixed columns that can't adapt to new data",
      "**Complexity**: Overuse of transpose makes queries hard to understand",
      "**Performance**: Large pivots can be slow and create wide tables"
    ],
    faqs: [
      {
        q: "When do I need to unpivot data?",
        a: "When column headers represent values (Jan, Feb, Mar or Product A, B, C) instead of attributes. Common with Excel crosstabs."
      },
      {
        q: "What's the difference between Unpivot Columns and Unpivot Other Columns?",
        a: "Unpivot Columns: you select what to unpivot. Unpivot Other Columns: you select what to keep, rest is unpivoted (better for dynamic data)."
      },
      {
        q: "Why did my values become Text after unpivoting?",
        a: "Unpivot creates generic Value column as Text. Change data type to Number after unpivoting."
      },
      {
        q: "Can I unpivot multiple sets of columns with different meanings?",
        a: "Not directly. Unpivot first set, duplicate query, unpivot second set, then merge results."
      },
      {
        q: "When would I use Pivot in Power BI?",
        a: "Rarely - Power BI prefers normalized data. Only pivot if you need columns for specific calculations or output format."
      }
    ],
    examTips: [
      "Know Unpivot transforms column headers to row values (wide to narrow)",
      "Remember 'Unpivot Other Columns' is more flexible than 'Unpivot Columns'",
      "Understand Pivot is reverse operation (narrow to wide) - less common",
      "Know that unpivoted data creates Attribute and Value columns",
      "Recognize Excel crosstabs need unpivoting for proper Power BI modeling"
    ],
    resources: [
      {
        title: "Unpivot columns in Power Query",
        url: "https://learn.microsoft.com/power-query/unpivot-column",
        type: "Documentation"
      },
      {
        title: "Pivot columns in Power Query",
        url: "https://learn.microsoft.com/power-query/pivot-columns",
        type: "Documentation"
      }
    ]
  },

  "Convert semi-structured data to a table": {
    overview: {
      title: "Extracting Structured Data from Complex Sources",
      concepts: [
        "Semi-structured data includes JSON, XML, and nested structures",
        "Power Query can parse JSON and XML into tables automatically",
        "Expand operations extract data from nested structures (lists and records)",
        "Web scraping extracts tables from HTML pages",
        "Drill down navigates into nested structures to reach desired data"
      ]
    },
    bestPractices: [
      "Use built-in connectors (JSON, XML) rather than manual parsing",
      "Expand only needed columns from nested structures to reduce complexity",
      "Name columns clearly after expanding nested data",
      "Test with sample data before processing large files",
      "Handle errors gracefully when structure varies",
      "Document source structure for future reference"
    ],
    commonMistakes: [
      "Expanding all nested columns when only some are needed",
      "Not handling optional/missing nested fields causing errors",
      "Forgetting to rename columns after expansion",
      "Not setting proper data types after extraction",
      "Manually parsing when built-in functions work",
      "Not testing with varied data structures"
    ],
    keySteps: [
      "Load JSON/XML file or web URL as data source",
      "Click 'Table' or 'List' to convert to table format",
      "Click expand button (↔) on Record/List columns",
      "Select fields to expand and choose meaningful column names",
      "Drill down into nested lists/records as needed",
      "Set appropriate data types for extracted columns",
      "Test with multiple records to verify extraction works"
    ],
    keyDecisions: [
      "**Parse automatically or manually?** - Standard format: use built-in parser; Custom format: manual M code",
      "**Expand all or selected fields?** - All needed eventually: expand all; Only some: be selective",
      "**Keep nested structure or flatten?** - Simple reporting: flatten; Complex relationships: keep nested",
      "**Handle missing fields how?** - Expected: allow nulls; Critical: filter out or error",
      "**Extract in Power Query or at source?** - Source can transform: better there; Source is fixed: Power Query"
    ],
    keyDefinitions: [
      "**Semi-structured Data**: Data with some organization but not in traditional table format (JSON, XML)",
      "**JSON (JavaScript Object Notation)**: Text format for structured data with nested objects/arrays",
      "**XML (eXtensible Markup Language)**: Tag-based format for hierarchical data",
      "**Record**: Single row of structured data in Power Query",
      "**List**: Array or collection of values/records in Power Query",
      "**Expand**: Operation that extracts fields from nested records/lists into columns"
    ],
    risks: [
      "**Structure changes**: API/file structure changes break transformations",
      "**Missing fields**: Optional fields not handled cause errors",
      "**Performance**: Deep nested structures slow processing",
      "**Complexity**: Over-complex transformations hard to maintain",
      "**Memory**: Large JSON/XML files consume significant memory",
      "**Error propagation**: One malformed record fails entire load"
    ],
    faqs: [
      {
        q: "How do I import JSON data into Power BI?",
        a: "Get Data > JSON, select file, Power Query loads it. Click 'List' or 'Record', then expand columns to create table."
      },
      {
        q: "What does the expand button (↔) do?",
        a: "Extracts fields from nested Record or List columns into separate table columns."
      },
      {
        q: "How do I extract data from web APIs returning JSON?",
        a: "Use Web connector with API endpoint, Power Query parses JSON automatically. Then expand nested fields."
      },
      {
        q: "Can Power Query handle XML files?",
        a: "Yes, Get Data > XML imports and parses automatically. Expand elements to create columns."
      },
      {
        q: "What if JSON structure varies between records?",
        a: "Use try/otherwise error handling in M code, or expand with 'Use original column name as prefix' option."
      }
    ],
    examTips: [
      "Know how to load and parse JSON/XML files",
      "Understand expand operation extracts nested data to columns",
      "Remember drill down navigates into nested structures",
      "Know that Records and Lists need expanding to create tables",
      "Recognize Web connector can extract tables from HTML pages"
    ],
    resources: [
      {
        title: "Import JSON data into Power BI",
        url: "https://learn.microsoft.com/power-query/connectors/json",
        type: "Documentation"
      },
      {
        title: "Work with nested lists and records",
        url: "https://learn.microsoft.com/power-query/add-custom-column",
        type: "Documentation"
      }
    ]
  },

  "Create fact tables and dimension tables": {
    overview: {
      title: "Star Schema Design in Power BI",
      concepts: [
        "Star schema separates facts (transactions/measurements) from dimensions (descriptive attributes)",
        "Fact tables contain numeric measures and foreign keys to dimensions",
        "Dimension tables contain descriptive attributes and primary keys",
        "Star schema optimizes query performance and enables intuitive analysis",
        "Proper fact/dimension design is foundation for effective Power BI models"
      ]
    },
    bestPractices: [
      "Keep fact tables narrow with just keys and measures",
      "Move all descriptive attributes to dimension tables",
      "Create surrogate keys if natural keys are complex or composite",
      "Use reference queries to create dimensions from fact table columns",
      "Remove dimension attributes from fact table after creating relationship",
      "Ensure dimension keys are unique (no duplicates)"
    ],
    commonMistakes: [
      "Keeping descriptive attributes in fact table (denormalized)",
      "Not creating date dimension table (using fact table dates directly)",
      "Creating dimensions with duplicate keys",
      "Not removing redundant columns after creating dimensions",
      "Over-normalizing into snowflake schema (slows performance)",
      "Missing necessary dimension tables (product, customer, etc.)"
    ],
    keySteps: [
      "Identify measure columns (quantities, amounts) - these stay in fact table",
      "Identify dimension attributes (descriptions, categories) - extract to dimensions",
      "Create dimension table: Reference fact table, select dimension columns, remove duplicates",
      "Add primary key (surrogate key) to dimension if needed",
      "In fact table, keep only keys and measures",
      "Create relationships between fact keys and dimension primary keys"
    ],
    keyDecisions: [
      "**What's a fact vs dimension?** - Numeric measurements: fact; Descriptive attributes: dimension",
      "**Create separate date dimension?** - YES - always create dedicated date table for time intelligence",
      "**Use natural or surrogate keys?** - Natural key simple: use it; Complex/composite: create surrogate",
      "**Star or snowflake schema?** - Star (denormalized dimensions) preferred in Power BI for performance",
      "**Which grain for fact table?** - Most detailed level needed for analysis (transaction, daily, etc.)"
    ],
    keyDefinitions: [
      "**Fact Table**: Contains measurements/metrics and foreign keys to dimensions (sales, orders, inventory)",
      "**Dimension Table**: Contains descriptive attributes for analysis (products, customers, dates, locations)",
      "**Star Schema**: Fact table at center connected to dimension tables in a star pattern",
      "**Surrogate Key**: Artificial unique identifier (often integer) replacing natural composite keys",
      "**Grain**: Level of detail in fact table (transaction level, daily summary, etc.)",
      "**Foreign Key**: Column in fact table that references dimension primary key"
    ],
    risks: [
      "**Poor performance**: Denormalized facts or snowflake dimensions slow queries",
      "**Inflexible model**: Wrong grain limits analysis possibilities",
      "**Relationship issues**: Duplicate dimension keys break relationships",
      "**Data quality**: Missing dimension values create orphaned fact records",
      "**Over-complexity**: Too many dimensions make model hard to use",
      "**Maintenance burden**: Improper design makes updates difficult"
    ],
    faqs: [
      {
        q: "What columns should be in a fact table?",
        a: "Numeric measures (sales, quantity, cost) and foreign keys to dimensions. Remove all descriptive text."
      },
      {
        q: "How do I create a dimension from fact table columns?",
        a: "Right-click fact query > Reference, select dimension columns, remove duplicates, add index column as key."
      },
      {
        q: "Should I always use star schema?",
        a: "Yes for Power BI. Star schema (denormalized dimensions) performs better than snowflake schema."
      },
      {
        q: "What if my fact table has millions of rows?",
        a: "Perfect - fact tables should be large. Ensure dimensions are small and star schema is optimized."
      },
      {
        q: "Do I need a date dimension if dates are in fact table?",
        a: "Yes - always create separate date dimension for proper time intelligence, fiscal calendars, and performance."
      }
    ],
    examTips: [
      "Know star schema has central fact table connected to dimension tables",
      "Remember fact tables contain measures and keys, dimensions contain attributes",
      "Understand dimensions should have unique primary keys",
      "Know that date dimension is essential for time intelligence",
      "Recognize denormalized star schema is preferred over snowflake in Power BI"
    ],
    resources: [
      {
        title: "Understand star schema",
        url: "https://learn.microsoft.com/power-bi/guidance/star-schema",
        type: "Documentation"
      },
      {
        title: "Design a data model in Power BI",
        url: "https://learn.microsoft.com/training/modules/design-model-power-bi/",
        type: "Microsoft Learn"
      }
    ]
  },

  "Identify when to use reference or duplicate queries and the resulting impact": {
    overview: {
      title: "Query Reusability: Reference vs Duplicate",
      concepts: [
        "Reference creates a pointer to another query - shares source data",
        "Duplicate creates an independent copy - separate data source",
        "Reference queries inherit parent changes automatically",
        "Duplicate queries don't reflect parent query changes",
        "Reference improves refresh performance by loading source data once"
      ]
    },
    bestPractices: [
      "Use Reference when creating dimensions from fact tables",
      "Use Reference for staging queries that branch into multiple tables",
      "Use Duplicate when you need independent query that won't change with parent",
      "Name reference queries clearly to show relationship to parent",
      "Document query dependencies for team understanding",
      "Consider refresh impact when choosing reference vs duplicate"
    ],
    commonMistakes: [
      "Using Duplicate when Reference would be more efficient",
      "Not understanding reference queries share source data",
      "Creating circular references that cause errors",
      "Over-using reference making query dependencies complex",
      "Modifying parent query without realizing impact on child references",
      "Not disabling load on parent queries used only for referencing"
    ],
    keySteps: [
      "Right-click source query > Reference to create referenced query",
      "Right-click source query > Duplicate to create independent copy",
      "Apply additional transformations to reference/duplicate query",
      "For parent queries: Uncheck 'Enable load' if only used for referencing",
      "Document purpose of each query in description",
      "Test refresh to understand performance impact"
    ],
    keyDecisions: [
      "**Reference or Duplicate?** - Share data source: Reference; Independent: Duplicate",
      "**Parent changes should affect child?** - YES: Reference; NO: Duplicate",
      "**Refresh efficiency matters?** - YES: Reference (loads once); NO: Either works",
      "**Creating dimensions from facts?** - Always use Reference",
      "**Need snapshot of query at point in time?** - Use Duplicate"
    ],
    keyDefinitions: [
      "**Reference Query**: Query that points to another query, inheriting its steps and sharing data source",
      "**Duplicate Query**: Independent copy of a query with its own data source connection",
      "**Parent Query**: Source query that other queries reference",
      "**Child Query**: Query created from reference that inherits parent steps",
      "**Query Folding**: Optimization where Power Query translates operations to source queries",
      "**Enable Load**: Setting that controls whether query creates table in data model"
    ],
    risks: [
      "**Circular reference**: Creating reference loops causes errors",
      "**Unintended changes**: Modifying parent affects all child references",
      "**Complex dependencies**: Many reference levels make troubleshooting difficult",
      "**Refresh failures**: Parent query error fails all child references",
      "**Memory impact**: Many duplicate queries increase refresh memory usage",
      "**Maintenance burden**: Complex reference chains hard to understand"
    ],
    faqs: [
      {
        q: "When should I use Reference vs Duplicate?",
        a: "Reference for dimensions from facts or when queries should share data source. Duplicate for independent copies."
      },
      {
        q: "Do reference queries load data twice?",
        a: "No - they share parent's data source, loaded once. That's why Reference is more efficient."
      },
      {
        q: "Can I reference a reference query?",
        a: "Yes, but avoid deep chains. Keep query dependencies simple for maintainability."
      },
      {
        q: "Should I disable load on parent queries?",
        a: "Yes, if parent is only for creating references (staging query). Saves memory and simplifies model."
      },
      {
        q: "What happens if I change parent query?",
        a: "All reference queries inherit those changes. Duplicates remain unchanged."
      }
    ],
    examTips: [
      "Know Reference shares data source, Duplicate creates independent copy",
      "Remember Reference is more efficient for refresh performance",
      "Understand dimension creation from facts should use Reference",
      "Know parent query changes affect Reference but not Duplicate",
      "Recognize staging queries referenced by multiple queries should have load disabled"
    ],
    resources: [
      {
        title: "Create a referenced query",
        url: "https://learn.microsoft.com/power-query/merge-queries-overview#reference-query",
        type: "Documentation"
      }
    ]
  },

  "Merge and append queries": {
    overview: {
      title: "Combining Data from Multiple Sources",
      concepts: [
        "Merge combines queries horizontally by matching key columns (like SQL JOIN)",
        "Append stacks queries vertically combining rows (like SQL UNION)",
        "Merge types: Left Outer, Inner, Full Outer, Left Anti, Right Anti",
        "Append requires similar column structures across queries",
        "Proper key matching is critical for accurate merges"
      ]
    },
    bestPractices: [
      "Ensure key columns have matching data types before merging",
      "Trim and clean key columns to avoid matching failures",
      "Choose appropriate join type for your scenario",
      "Expand only needed columns after merge to reduce complexity",
      "Use Append when combining similar tables (same structure)",
      "Test merge results with known data to verify correctness"
    ],
    commonMistakes: [
      "Merging on keys with whitespace differences ('ABC' vs 'ABC ')",
      "Using wrong join type (Inner when Left Outer needed)",
      "Not expanding merged column after merge",
      "Appending tables with mismatched columns",
      "Forgetting to change data types causing merge failures",
      "Merging on non-unique keys creating duplicates"
    ],
    keySteps: [
      "**To Merge**: Home > Merge Queries, select tables and key columns",
      "Choose join type (Left Outer most common)",
      "Click OK, then expand merged column to select fields",
      "**To Append**: Home > Append Queries, select tables to combine",
      "Choose 'Two tables' or 'Three or more tables'",
      "Verify column matching is correct in append preview"
    ],
    keyDecisions: [
      "**Merge or Append?** - Combine columns: Merge; Combine rows: Append",
      "**Which join type?** - Keep all left: Left Outer; Only matches: Inner; Keep all: Full Outer",
      "**Merge in Power Query or model?** - Fixed enrichment: PQ Merge; Dynamic: Model relationships",
      "**One-to-one or one-to-many?** - 1:1: merging dimensions; 1:M: enriching facts",
      "**Which columns to expand?** - Only what's needed to reduce model size"
    ],
    keyDefinitions: [
      "**Merge Queries**: Combines queries horizontally by matching keys (like SQL JOIN)",
      "**Append Queries**: Stacks queries vertically combining rows (like SQL UNION)",
      "**Left Outer Join**: Keep all left rows, match right where possible",
      "**Inner Join**: Keep only rows that match in both tables",
      "**Full Outer Join**: Keep all rows from both tables",
      "**Anti Join**: Keep rows that DON'T match (Left Anti or Right Anti)"
    ],
    risks: [
      "**Duplicate rows**: Merging on non-unique keys multiplies rows",
      "**Missing matches**: Wrong join type or key mismatches lose data",
      "**Performance**: Large merges slow refresh times",
      "**Data type mismatches**: Cause merge failures or incorrect matching",
      "**Column explosion**: Expanding too many columns increases model size",
      "**Maintenance**: Complex merge chains hard to troubleshoot"
    ],
    faqs: [
      {
        q: "When should I merge vs create model relationships?",
        a: "Merge for data preparation/enrichment in Power Query. Relationships for dynamic filtering across tables in reports."
      },
      {
        q: "What join type should I use?",
        a: "Left Outer most common (keep all left rows). Inner if you only want matched rows. Full Outer rarely needed."
      },
      {
        q: "Why is my merge creating duplicate rows?",
        a: "Key column isn't unique in one or both tables. Check distinct values in keys before merging."
      },
      {
        q: "How do I append more than two tables?",
        a: "Append Queries > Three or more tables > Add all tables to append > OK."
      },
      {
        q: "Can I merge on multiple columns?",
        a: "Yes - click + icon in Merge dialog to add multiple key columns (composite key)."
      }
    ],
    examTips: [
      "Know Merge combines columns (horizontal), Append combines rows (vertical)",
      "Remember Left Outer keeps all left rows, Inner only matches",
      "Understand merge is like SQL JOIN, append is like UNION",
      "Know to expand merged column to access added fields",
      "Recognize when to merge in Power Query vs create model relationships"
    ],
    resources: [
      {
        title: "Merge queries overview",
        url: "https://learn.microsoft.com/power-query/merge-queries-overview",
        type: "Documentation"
      },
      {
        title: "Append queries",
        url: "https://learn.microsoft.com/power-query/append-queries",
        type: "Documentation"
      }
    ]
  },

  "Identify and create appropriate keys for relationships": {
    overview: {
      title: "Creating Unique Identifiers for Data Models",
      concepts: [
        "Relationships require unique keys in dimension tables",
        "Natural keys come from source data (customer ID, product code)",
        "Surrogate keys are artificial unique identifiers (often index columns)",
        "Composite keys combine multiple columns for uniqueness",
        "Proper keys are essential for accurate relationships and calculations"
      ]
    },
    bestPractices: [
      "Always verify key uniqueness using Remove Duplicates or distinct count",
      "Create index column as surrogate key when natural key is complex",
      "Use Integer keys (whole numbers) for best performance",
      "Keep keys simple - avoid text keys when numeric keys work",
      "Document key column purpose and constraints",
      "Test relationships work correctly after creating keys"
    ],
    commonMistakes: [
      "Not checking for duplicate keys before creating relationships",
      "Using composite natural keys that should be replaced with surrogate",
      "Creating text keys when integer keys would work",
      "Not handling null values in key columns",
      "Forgetting to create primary key for dimension tables",
      "Using unstable keys that change over time"
    ],
    keySteps: [
      "Identify unique identifier in source data (natural key)",
      "Check for duplicates: Group By key column and count rows",
      "If no natural key: Add Column > Index Column (0-based or 1-based)",
      "For composite key: Merge multiple columns into single key column",
      "Verify uniqueness: distinct count should equal row count",
      "Ensure key column has no nulls (filter or handle nulls first)"
    ],
    keyDecisions: [
      "**Natural or surrogate key?** - Simple natural key exists: use it; Complex/composite: create surrogate",
      "**Single or composite key?** - One column unique: single; Need multiple columns: composite or surrogate",
      "**Integer or text key?** - Integer available: use it (better performance); Text only option: acceptable",
      "**0-based or 1-based index?** - Consistency with source: match it; No preference: 1-based more intuitive",
      "**Handle nulls how?** - Replace with placeholder or filter out (nulls can't be in keys)"
    ],
    keyDefinitions: [
      "**Primary Key**: Unique identifier in dimension table (one side of relationship)",
      "**Foreign Key**: Column in fact table that references dimension primary key",
      "**Natural Key**: Business identifier from source data (ProductID, CustomerCode)",
      "**Surrogate Key**: Artificial identifier created for data model (often index column)",
      "**Composite Key**: Combination of multiple columns to create uniqueness",
      "**Index Column**: Sequential number column (0, 1, 2... or 1, 2, 3...)"
    ],
    risks: [
      "**Duplicate keys**: Break relationships and cause incorrect calculations",
      "**Null keys**: Prevent relationships from working correctly",
      "**Changing keys**: Time-variant keys break historical relationships",
      "**Complex keys**: Text or composite keys slow performance",
      "**Missing keys**: Orphan fact records that can't join to dimensions",
      "**Wide keys**: Very long text keys increase model size"
    ],
    faqs: [
      {
        q: "How do I create a surrogate key?",
        a: "Add Column > Index Column. This creates sequential numbers (0,1,2... or 1,2,3...) as unique identifier."
      },
      {
        q: "What if I have composite key (multiple columns)?",
        a: "Either merge columns into single key, or create surrogate key with index column (usually better)."
      },
      {
        q: "How do I check if key column is unique?",
        a: "Group By key column and count rows. Or compare distinct count to row count - should be equal."
      },
      {
        q: "Can relationship keys have nulls?",
        a: "No - nulls in keys prevent relationships. Filter out or replace nulls before creating relationships."
      },
      {
        q: "Should I use GUID text keys?",
        a: "Only if necessary. Integer keys perform better and use less space than GUID text keys."
      }
    ],
    examTips: [
      "Know primary keys must be unique in dimension tables",
      "Remember to check for duplicates before creating relationships",
      "Understand Index Column creates surrogate keys",
      "Know that integer keys perform better than text keys",
      "Recognize null values must be handled in key columns"
    ],
    resources: [
      {
        title: "Create a common date table",
        url: "https://learn.microsoft.com/power-bi/guidance/model-date-tables",
        type: "Documentation"
      },
      {
        title: "Add an index column",
        url: "https://learn.microsoft.com/power-query/add-index-column",
        type: "Documentation"
      }
    ]
  },

  "Configure data loading for queries": {
    overview: {
      title: "Managing Query Load Behavior",
      concepts: [
        "Enable Load controls whether query creates table in data model",
        "Disable load for staging queries used only to create other queries",
        "Connection Only queries don't load but enable relationships",
        "Load behavior affects model size and refresh performance",
        "Proper load configuration reduces memory usage and simplifies model"
      ]
    },
    bestPractices: [
      "Disable load on parent queries used only for referencing",
      "Disable load on staging/intermediate queries",
      "Keep load enabled for final queries that need to be in model",
      "Use Connection Only for dimension queries when using DirectQuery facts",
      "Document why load is disabled for specific queries",
      "Review all queries and optimize load settings before publishing"
    ],
    commonMistakes: [
      "Loading duplicate staging queries into model unnecessarily",
      "Not disabling load on parent queries used for references",
      "Disabling load on final queries that should be in model",
      "Loading too many intermediate transformation steps",
      "Not understanding Connection Only vs Enable Load",
      "Creating large model with unnecessary loaded queries"
    ],
    keySteps: [
      "Right-click query in Queries pane",
      "Uncheck 'Enable load' to prevent loading to model",
      "Check 'Enable load' to include in data model",
      "For Connection Only: Uncheck Enable load but keep for relationships",
      "Review Applied Steps to ensure query is finalized before disabling load",
      "Test model to verify disabled queries don't affect functionality"
    ],
    keyDecisions: [
      "**Enable or disable load?** - Final table: enable; Staging/parent: disable",
      "**Connection Only needed?** - DirectQuery with Import dimensions: yes; Otherwise: no",
      "**Load parent query?** - Used directly in reports: yes; Only for references: no",
      "**Keep intermediate steps?** - For debugging: temporarily yes; Production: no",
      "**Impact on model size?** - Large model: optimize loads; Small model: less critical"
    ],
    keyDefinitions: [
      "**Enable Load**: Setting that controls whether query creates table in data model",
      "**Connection Only**: Query that doesn't load data but enables relationships (for composite models)",
      "**Staging Query**: Intermediate query used to create other queries, not loaded to model",
      "**Parent Query**: Source query referenced by other queries",
      "**Data Model**: Collection of loaded tables, relationships, and measures in Power BI",
      "**Query Dependencies**: Relationships between queries where one references another"
    ],
    risks: [
      "**Bloated model**: Loading unnecessary queries increases file size",
      "**Performance impact**: More loaded tables slow refresh and queries",
      "**Memory usage**: Unnecessary loaded data consumes memory",
      "**Complexity**: Too many tables confuse report authors",
      "**Refresh time**: Loading unnecessary queries extends refresh duration",
      "**User confusion**: Staging queries visible in model complicate navigation"
    ],
    faqs: [
      {
        q: "When should I disable 'Enable load'?",
        a: "For staging queries, parent queries used only for referencing, and intermediate transformation steps not needed in model."
      },
      {
        q: "What's the difference between disabled load and Connection Only?",
        a: "Disabled load: query not in model at all. Connection Only: enables relationships for composite models without loading data."
      },
      {
        q: "Can I disable load after publishing to Service?",
        a: "No - this is a Desktop setting. Configure load behavior before publishing."
      },
      {
        q: "Will disabling load break reports?",
        a: "Only if reports directly use that query. Safe to disable for staging queries not used in visuals."
      },
      {
        q: "How do I know which queries to disable load?",
        a: "Disable parent queries referenced by others, staging queries, and intermediate steps. Keep final tables for reporting."
      }
    ],
    examTips: [
      "Know 'Enable load' controls whether query appears in data model",
      "Remember to disable load for staging/parent queries",
      "Understand Connection Only is for composite model relationships",
      "Recognize proper load configuration reduces model size",
      "Know that load settings must be configured in Desktop before publishing"
    ],
    resources: [
      {
        title: "Specify load settings for queries",
        url: "https://learn.microsoft.com/power-query/options",
        type: "Documentation"
      },
      {
        title: "Manage query load",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-query-overview",
        type: "Documentation"
      }
    ]
  }
};
