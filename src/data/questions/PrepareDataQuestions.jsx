// PL-300 Questions: Prepare the Data domain — 5 per topic

export const prepareDataQuestions = [

  // topic: Identify and connect to data sources or a shared semantic model
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Identify and connect to data sources or a shared semantic model",
    question: "What is the main benefit of connecting to a shared semantic model instead of creating a new connection?",
    options: ["Better visual formatting options","Consistent business logic and measures shared across multiple reports","Faster data refresh","More data source options"],
    correct: 1,
    explanation: "Shared semantic models ensure consistent business logic, measures, and relationships are reused across reports, reducing duplication."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Identify and connect to data sources or a shared semantic model",
    question: "What permission do you need on a published dataset to build new reports on top of it in Power BI Service?",
    options: ["Read permission","Write permission","Build permission","Admin permission"],
    correct: 2,
    explanation: "Build permission allows a user to create new reports, composite models, and analyses on top of a shared semantic model."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Identify and connect to data sources or a shared semantic model",
    question: "Which connector type would you use to import data from a REST API returning JSON?",
    options: ["SQL Server connector","Web connector (via URL)","Excel connector","SharePoint List connector"],
    correct: 1,
    explanation: "The Web connector allows Power BI to call REST API endpoints and parse the returned JSON or XML responses."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Identify and connect to data sources or a shared semantic model",
    question: "What happens when you connect to a shared semantic model in Power BI Service?",
    options: ["A copy of the data is downloaded to your local machine","Your report queries the published dataset live without duplicating data","A new refresh schedule is automatically created","The data is exported to Excel"],
    correct: 1,
    explanation: "Connecting to a shared semantic model creates a live connection — reports query the published dataset in the service, not a local copy."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Identify and connect to data sources or a shared semantic model",
    question: "Which of the following is a valid data source category in Power BI?",
    options: ["Machine Learning model","Online Services (e.g. Salesforce, SharePoint)","In-memory JavaScript objects","Browser cookies"],
    correct: 1,
    explanation: "Power BI supports many Online Services connectors including Salesforce, SharePoint, Dynamics 365, and more under the Online Services category."
  },

  // topic: Change data source settings, including credentials and privacy levels
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Change data source settings, including credentials and privacy levels",
    question: "What happens when you set a data source privacy level to 'Private'?",
    options: ["The data cannot be refreshed","The data source cannot combine with other sources during query folding","Only you can access the data","The data is encrypted"],
    correct: 1,
    explanation: "Private privacy level prevents combining data with other sources during query folding to protect sensitive data."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Change data source settings, including credentials and privacy levels",
    question: "Where do you update data source credentials in Power BI Desktop?",
    options: ["File > Options > Security","Home > Transform Data > Data Source Settings","View > Data Source Settings","Model > Credentials"],
    correct: 1,
    explanation: "Data source credentials are managed via Home > Transform Data > Data Source Settings in Power BI Desktop."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Change data source settings, including credentials and privacy levels",
    question: "Which privacy level allows data to be freely combined with any other source?",
    options: ["Private","Organizational","Public","None"],
    correct: 2,
    explanation: "Public privacy level indicates the data is safe to combine with any source — no restrictions on query folding across sources."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Change data source settings, including credentials and privacy levels",
    question: "A report works in Desktop but scheduled refresh fails in Power BI Service with a credentials error. What is the most likely cause?",
    options: ["The report file is too large","Service account credentials have not been configured for the data source in the Service","The dataset has too many tables","The data source privacy level is set to Public"],
    correct: 1,
    explanation: "Power BI Service uses its own credential store. You must configure data source credentials in the Service separately from Desktop — often using a service account."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Change data source settings, including credentials and privacy levels",
    question: "What is the 'Organizational' privacy level most suitable for?",
    options: ["Publicly available data like open government datasets","Internal corporate data that can be combined with other internal sources but not public sources","Highly sensitive HR or financial data that must not be combined","Data that has no sensitivity classification"],
    correct: 1,
    explanation: "Organizational privacy allows data to be combined with other Organizational or Public sources but prevents combining with Private sources, protecting internal data."
  },

  // topic: Choose between DirectLake, DirectQuery, and Import
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Choose between DirectLake, DirectQuery, and Import",
    question: "Which connection mode reads Delta Parquet files directly from OneLake without importing data or querying a database?",
    options: ["Import mode","DirectQuery","DirectLake","Live Connection"],
    correct: 2,
    explanation: "DirectLake is a Fabric-only mode that reads Delta Parquet files directly from OneLake, combining Import-like speed with DirectQuery-like freshness."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Choose between DirectLake, DirectQuery, and Import",
    question: "Which scenario is most appropriate for using DirectQuery mode (non-Fabric source)?",
    options: ["Large historical dataset that changes infrequently","Real-time dashboard showing current sales transactions","Dataset with complex Power Query transformations","Dataset requiring calculated columns"],
    correct: 1,
    explanation: "DirectQuery is ideal for real-time data requirements where you need the most current data from the source and cannot use DirectLake."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Choose between DirectLake, DirectQuery, and Import",
    question: "What is a key limitation of Import mode compared to DirectQuery?",
    options: ["Import mode cannot use DAX measures","Imported data goes stale between refreshes and does not reflect real-time changes","Import mode cannot connect to SQL Server","Import mode does not support relationships"],
    correct: 1,
    explanation: "Import mode copies data into the model at refresh time. The data becomes stale immediately after — it won't reflect changes made to the source until the next refresh."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Choose between DirectLake, DirectQuery, and Import",
    question: "What happens when DirectLake mode exceeds its guardrails (e.g. too many rows or tables)?",
    options: ["The report stops loading","It automatically falls back to DirectQuery mode","It switches to Import mode and caches data","An error is shown to the report user"],
    correct: 1,
    explanation: "When DirectLake guardrails are exceeded, Power BI automatically falls back to DirectQuery mode to maintain query functionality."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Choose between DirectLake, DirectQuery, and Import",
    question: "Which connection mode generally provides the fastest query performance for interactive reports?",
    options: ["DirectQuery","DirectLake","Import","Live Connection"],
    correct: 2,
    explanation: "Import mode loads data into VertiPaq's in-memory engine, which provides the fastest query response for interactive reports."
  },

  // topic: Create and modify parameters
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Create and modify parameters",
    question: "What is the primary use case for parameters in Power BI?",
    options: ["To create calculated columns","To dynamically change data source connections or filter values","To create measures","To format visuals"],
    correct: 1,
    explanation: "Parameters allow dynamic changes to connection strings, file paths, or filter values, making solutions more flexible and environment-agnostic."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Create and modify parameters",
    question: "How do you create a parameter in Power Query Editor?",
    options: ["Home > New Parameter","Transform > Add Parameter","Add Column > Parameter Column","Manage Parameters > New Parameter"],
    correct: 3,
    explanation: "Parameters are created via Home > Manage Parameters > New Parameter in Power Query Editor."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Create and modify parameters",
    question: "A company uses parameters for server names and database names. What is the benefit of this approach?",
    options: ["Faster query execution","The same report can be pointed to dev, test, or prod without editing query steps manually","Parameters improve data quality","Parameters replace the need for credentials"],
    correct: 1,
    explanation: "Using parameters for connection details allows the same report to be redirected between environments (dev/test/prod) by simply changing parameter values."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Create and modify parameters",
    question: "Which feature in Power BI Desktop lets end users modify parameter values without opening Power Query Editor?",
    options: ["What-if parameters","Edit Parameters (via Home > Edit Queries > Edit Parameters)","Slicer visuals","Page-level filters"],
    correct: 1,
    explanation: "Home > Edit Queries > Edit Parameters opens a dialog where users can change parameter values directly without entering Power Query Editor."
  },
  {
    domain: "prepare_data", section: "Get or connect to data",
    topic: "Create and modify parameters",
    question: "What data types can a Power Query parameter hold?",
    options: ["Only text values","Only numbers","Any scalar type including Text, Number, Date, Logical, and more","Only connection strings"],
    correct: 2,
    explanation: "Power Query parameters support all scalar types — Text, Number, Decimal, Date, DateTime, Logical, Duration, and Binary."
  },

  // topic: Evaluate data, including data statistics and column properties
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Evaluate data, including data statistics and column properties",
    question: "Which Power Query feature shows the percentage of empty, error, and valid values in a column?",
    options: ["Column Distribution","Column Profile","Column Quality","Data Type"],
    correct: 2,
    explanation: "Column Quality displays the percentage of valid, error, and empty values for each column in Power Query Editor."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Evaluate data, including data statistics and column properties",
    question: "By default, Column Profile statistics in Power Query are based on how many rows?",
    options: ["All rows in the dataset","Top 100 rows","Top 1000 rows","Top 10000 rows"],
    correct: 2,
    explanation: "By default, profiling is based on the top 1000 rows. You should change this to 'entire dataset' for accurate statistics on large tables."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Evaluate data, including data statistics and column properties",
    question: "What does Column Distribution show in Power Query?",
    options: ["Percentage of nulls per column","A histogram/bar chart of how frequently each distinct value appears","The data type of each column","The number of rows in the table"],
    correct: 1,
    explanation: "Column Distribution shows a visual histogram of value frequency, helping identify skew, dominant values, or unexpected distributions."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Evaluate data, including data statistics and column properties",
    question: "How do you enable column profiling on the entire dataset instead of just the top 1000 rows?",
    options: ["File > Options > Data Load","View tab > Column profiling based on entire data set","Transform > Profile All Rows","Home > Refresh Preview"],
    correct: 1,
    explanation: "In Power Query Editor, go to the View tab and select 'Column profiling based on entire data set' to profile all rows instead of just the top 1000."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Evaluate data, including data statistics and column properties",
    question: "What statistics does the Column Profile pane show for a numeric column?",
    options: ["Only the min and max values","Count, distinct count, empty, error, min, max, average, and standard deviation","Only count and distinct count","Only error percentage"],
    correct: 1,
    explanation: "The Column Profile pane provides rich statistics for numeric columns including count, distinct values, empty/error counts, min, max, average, and standard deviation."
  },

  // topic: Resolve inconsistencies, unexpected or null values, and data quality issues
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve inconsistencies, unexpected or null values, and data quality issues",
    question: "Which transformation is best for propagating the last non-null value down through empty cells in a column?",
    options: ["Replace Values","Fill Down","Remove Rows","Group By"],
    correct: 1,
    explanation: "Fill Down copies the last non-null value into each null cell below it — useful for sparse columns where values apply to multiple rows."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve inconsistencies, unexpected or null values, and data quality issues",
    question: "A 'Country' column contains 'USA', 'U.S.A.', and 'United States'. What is the best Power Query fix?",
    options: ["Delete duplicate rows","Use Replace Values to standardize all variations to one consistent value","Create a calculated column in DAX","Use Group By to combine them"],
    correct: 1,
    explanation: "Replace Values lets you map each inconsistent variation to a standard value — essential for normalising text-based dimension columns."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve inconsistencies, unexpected or null values, and data quality issues",
    question: "What is the recommended approach when a dimension table key column contains null values?",
    options: ["Delete all rows with null keys","Replace nulls with a placeholder like 'Unknown' to maintain referential integrity","Leave nulls as-is — Power BI handles them","Convert null keys to zero"],
    correct: 1,
    explanation: "Replacing nulls with a placeholder like 'Unknown' preserves rows and maintains referential integrity rather than losing data by deleting rows."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve inconsistencies, unexpected or null values, and data quality issues",
    question: "Which Power Query feature trims leading/trailing spaces and removes invisible characters from text columns?",
    options: ["Replace Values","Clean and Trim (Transform tab)","Column Quality","Split Column"],
    correct: 1,
    explanation: "The Transform > Format > Trim removes leading/trailing spaces, and Clean removes non-printable characters — both are essential for text normalisation."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve inconsistencies, unexpected or null values, and data quality issues",
    question: "A date column imported from a CSV is stored as text in the format 'DD/MM/YYYY'. What should you do?",
    options: ["Leave it as text — DAX can parse it","Change the column data type to Date using the correct locale","Delete the column and re-import","Create a calculated column in DAX to convert it"],
    correct: 1,
    explanation: "Change the data type to Date using the locale matching the source format (e.g. en-AU for DD/MM/YYYY) so Power Query parses it correctly."
  },

  // topic: Resolve data import errors
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve data import errors",
    question: "What is the best practice when encountering import errors in Power Query?",
    options: ["Ignore and skip error rows","Use 'Keep Errors' to analyze patterns and fix at source","Always remove error rows","Convert all errors to null"],
    correct: 1,
    explanation: "Using 'Keep Errors' isolates problem rows, helping identify patterns to fix data quality at the source rather than masking the issue."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve data import errors",
    question: "What does the 'Remove Errors' transformation in Power Query do?",
    options: ["Fixes the underlying data errors automatically","Deletes any row that contains an error in any column","Replaces errors with null values","Converts errors to zero"],
    correct: 1,
    explanation: "Remove Errors deletes entire rows that contain error values. Use cautiously — you may lose valid data in other columns of that row."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve data import errors",
    question: "A numeric column has some text values that cause data type errors. What is the safest transformation?",
    options: ["Delete all error rows","Replace errors with null using 'Replace Errors', then investigate the source data","Change the column type to Text","Ignore the errors"],
    correct: 1,
    explanation: "Replacing errors with null preserves other columns in those rows while making the issue visible for investigation — safer than deleting rows."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve data import errors",
    question: "Where do errors typically originate when Power Query reports a data type error on import?",
    options: ["Power BI Desktop software bugs","The source data contains values incompatible with the assigned data type (e.g. text in a number column)","Network connectivity issues","Incorrect DAX syntax"],
    correct: 1,
    explanation: "Data type errors occur when source values cannot be converted to the assigned type — for example, a text string 'N/A' in a column typed as Whole Number."
  },
  {
    domain: "prepare_data", section: "Profile and clean the data",
    topic: "Resolve data import errors",
    question: "You want to keep error rows for investigation while continuing to load the rest of the data. What should you do?",
    options: ["This is not possible in Power BI","Use 'Keep Errors' on the problem column to isolate only error rows into a separate query for analysis","Use 'Remove Errors' and export to Excel","Write a DAX measure to flag errors"],
    correct: 1,
    explanation: "Use 'Keep Errors' to create a diagnostic query containing only error rows — you can analyze them without affecting the main data load."
  },

  // topic: Select appropriate column data types
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Select appropriate column data types",
    question: "Why should monetary values use 'Fixed Decimal Number' instead of 'Decimal Number'?",
    options: ["Fixed Decimal is faster to load","Fixed Decimal provides exact precision with 4 decimal places, avoiding floating-point errors","Fixed Decimal is required for currency formatting","There is no practical difference"],
    correct: 1,
    explanation: "Fixed Decimal Number stores exactly 4 decimal places without floating-point rounding errors, making it ideal for currency and financial values."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Select appropriate column data types",
    question: "Which data type should be used for a column that stores TRUE/FALSE values?",
    options: ["Text","Whole Number","True/False (Logical)","Decimal Number"],
    correct: 2,
    explanation: "The True/False (Logical) data type is purpose-built for Boolean values and uses less storage than Text or Number alternatives."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Select appropriate column data types",
    question: "When is it appropriate to store a numeric identifier (like CustomerID) as Text rather than Whole Number?",
    options: ["Never — numeric IDs should always be Whole Number","When the ID has leading zeros (e.g. '00123') that would be lost if stored as a number","When the ID is very large","When the ID is used in a slicer"],
    correct: 1,
    explanation: "IDs with leading zeros (common in codes like postal codes or employee IDs) must be stored as Text to preserve the leading zeros."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Select appropriate column data types",
    question: "What is the benefit of using 'Date' type instead of 'Date/Time' for a date-only column?",
    options: ["Date type loads faster than Date/Time","Date type uses less storage and prevents unnecessary time component precision","Date type is required for relationships","Date/Time cannot be used in slicers"],
    correct: 1,
    explanation: "Date type uses less storage than Date/Time and avoids the time component causing subtle issues in time intelligence calculations."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Select appropriate column data types",
    question: "A column contains values like '1', '2', '10' but is loaded as Text. What problem can this cause?",
    options: ["No problem — Power BI handles it automatically","Sorting will be alphabetical (1, 10, 2) rather than numeric (1, 2, 10)","The column cannot be used in visuals","The column will cause refresh errors"],
    correct: 1,
    explanation: "Text columns sort alphabetically — '10' comes before '2'. Setting the correct Whole Number type ensures proper numeric sorting."
  },

  // topic: Create and transform columns
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create and transform columns",
    question: "What is the difference between 'Custom Column' and 'Conditional Column' in Power Query?",
    options: ["Custom Column uses M code, Conditional Column uses UI-based if/then logic","They are identical features","Custom Column is for text, Conditional Column is for numbers","Custom Column is always faster"],
    correct: 0,
    explanation: "Custom Column allows M expressions for complex logic, while Conditional Column provides a UI wizard for simple if/then conditions."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create and transform columns",
    question: "Which Power Query feature allows you to extract the year from a date column without writing M code?",
    options: ["Custom Column","Add Column > Date > Year (from the Date column menu)","Transform > Extract","Split Column"],
    correct: 1,
    explanation: "Power Query has built-in date part extractors via Add Column > Date — including Year, Month, Day, Quarter, Week of Year, etc."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create and transform columns",
    question: "You need to combine a First Name and Last Name column into a Full Name column. What is the best Power Query approach?",
    options: ["Write a DAX calculated column","Use Add Column > Custom Column with M expression: [First Name] & ' ' & [Last Name]","Use Merge Queries","Use Group By"],
    correct: 1,
    explanation: "Custom Column with text concatenation M code ([First Name] & \" \" & [Last Name]) creates the combined column during data transformation."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create and transform columns",
    question: "What does the 'Split Column' transformation do in Power Query?",
    options: ["Removes a column from the query","Divides a column into multiple columns based on a delimiter or fixed width","Merges two columns into one","Converts column data types"],
    correct: 1,
    explanation: "Split Column separates a single column into multiple columns using a specified delimiter (e.g. comma, space) or at a fixed character position."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create and transform columns",
    question: "When transforming a column with 'Replace Values', what happens to the original column?",
    options: ["A new column is created and the original is kept","The original column is modified in place — original values matching the search term are replaced","The original column is deleted","A new query is created"],
    correct: 1,
    explanation: "Replace Values modifies the column in place, substituting matching values with the replacement value. No new column is created."
  },

  // topic: Group and aggregate rows
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Group and aggregate rows",
    question: "When should you aggregate data in Power Query versus using DAX measures?",
    options: ["Always aggregate in Power Query for best performance","Always use DAX measures for flexibility","Aggregate in Power Query only when you need to permanently reduce data volume","It doesn't matter — both are equivalent"],
    correct: 2,
    explanation: "Aggregate in Power Query only when permanently reducing volume is needed. Keep detail data and use DAX for flexible, filter-responsive aggregations."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Group and aggregate rows",
    question: "In Power Query, Group By creates a summary table. What happens to the original detail rows?",
    options: ["They are moved to a separate query automatically","They are replaced by the aggregated summary — the original detail is no longer in that query","They are stored in a hidden table","They remain in the original query unchanged"],
    correct: 1,
    explanation: "Group By replaces the detail rows with aggregated summary rows in the same query. To keep detail, use a Reference query for the Group By and keep the original."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Group and aggregate rows",
    question: "Which aggregation operation in Group By would you use to count distinct customers per region?",
    options: ["Sum","Count Rows","Count Distinct Rows","Average"],
    correct: 2,
    explanation: "Count Distinct Values on the customer ID column gives unique customer counts per group — different from Count Rows which counts all rows including duplicates."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Group and aggregate rows",
    question: "You have daily transaction data with 50 million rows but users only ever view monthly totals. What is the most performance-efficient approach?",
    options: ["Keep all 50 million rows and use DAX measures","Aggregate to monthly totals in Power Query before loading","Import all rows but hide the daily detail","Use DirectQuery so the database handles aggregation"],
    correct: 1,
    explanation: "Pre-aggregating to monthly totals in Power Query dramatically reduces row count, improving load time and query speed."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Group and aggregate rows",
    question: "What does the 'All Rows' aggregation option in Group By return?",
    options: ["Only the first row per group","A nested table of all rows within each group","The total count of all rows","A comma-separated list of values"],
    correct: 1,
    explanation: "All Rows returns a nested Table object for each group, allowing further operations like expanding specific columns from the grouped data."
  },

  // topic: Pivot, unpivot, and transpose data
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Pivot, unpivot, and transpose data",
    question: "An Excel spreadsheet has monthly sales columns (Jan, Feb, Mar...). What transformation is needed to prepare it for Power BI?",
    options: ["Pivot the data","Unpivot the month columns to create Attribute and Value rows","Transpose the table","No transformation needed"],
    correct: 1,
    explanation: "Unpivot converts column headers (months) into row values, transforming wide format to normalized tall format suitable for Power BI analysis."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Pivot, unpivot, and transpose data",
    question: "What is the safest way to unpivot month columns when new months may be added to the source file?",
    options: ["Select all month columns and unpivot them manually","Use 'Unpivot Other Columns' after selecting the ID/key columns to keep","Transpose the table first","Use a custom M function"],
    correct: 1,
    explanation: "'Unpivot Other Columns' keeps named key columns and unpivots everything else — new columns added to the source are automatically included."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Pivot, unpivot, and transpose data",
    question: "What does the Transpose transformation do in Power Query?",
    options: ["Converts rows to columns and columns to rows (rotates the table 90 degrees)","Removes duplicate rows","Aggregates numeric columns","Converts text to proper case"],
    correct: 0,
    explanation: "Transpose flips the table so rows become columns and columns become rows — useful when source data is structured with categories as rows."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Pivot, unpivot, and transpose data",
    question: "After pivoting a column, what must you specify in the Power Query Pivot dialog?",
    options: ["The column to pivot on, and the values column with an aggregation method","Only the column to pivot — no other options required","A DAX expression for the pivot values","A sort order for the new columns"],
    correct: 0,
    explanation: "When pivoting, you select the column whose values become new column headers, and the values column that provides the cell data, along with an aggregation function."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Pivot, unpivot, and transpose data",
    question: "A product survey has one row per respondent with columns for Product1, Product2, Product3 ratings. What transformation normalizes this for analysis?",
    options: ["Pivot to summarize ratings","Unpivot the ProductX columns to create Product and Rating rows","Transpose the entire table","Group By respondent"],
    correct: 1,
    explanation: "Unpivoting the product columns creates a normalized structure with one row per respondent-product combination, enabling flexible cross-product analysis."
  },

  // topic: Convert semi-structured data to a table
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Convert semi-structured data to a table",
    question: "How do you expand nested JSON fields in Power Query?",
    options: ["Use the Expand button (↔) on the Record/List column header","Write custom M code only","JSON cannot be loaded into Power BI","Use DAX to parse JSON"],
    correct: 0,
    explanation: "Power BI auto-detects JSON structure and provides an Expand button on Record and List columns to select which nested fields to expand into columns."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Convert semi-structured data to a table",
    question: "When loading a JSON file with a List at the root level, what does Power Query show initially?",
    options: ["A flat table ready to use","A single column called 'List' with a Convert to Table step needed","An error — lists cannot be imported","A pivot table of the values"],
    correct: 1,
    explanation: "A JSON List at the root shows as a List object. You must use 'Convert to Table' to transform it into a tabular structure before expanding records."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Convert semi-structured data to a table",
    question: "What Power BI connector is best for consuming an OData feed from an API?",
    options: ["Web connector (generic)","OData Feed connector","SQL Server connector","Excel connector"],
    correct: 1,
    explanation: "The OData Feed connector is purpose-built for OData APIs, automatically parsing the service metadata and supporting query folding via OData query parameters."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Convert semi-structured data to a table",
    question: "A column in Power Query shows '[Record]' as its value. What does this indicate?",
    options: ["The column has errors","Each cell contains a nested JSON object that must be expanded","The column is a date type","The column contains binary data"],
    correct: 1,
    explanation: "A [Record] value indicates a nested JSON object. You can expand it using the expand icon on the column header to promote its fields to columns."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Convert semi-structured data to a table",
    question: "What does '[List]' appearing as a column value in Power Query indicate?",
    options: ["The column is a calculated column","Each cell contains an array/list of values — it can be expanded or aggregated","The column contains errors","The column is a Text data type"],
    correct: 1,
    explanation: "A [List] value indicates each cell contains a JSON array. You can expand rows (one row per list item) or aggregate (e.g. count, concat) the list values."
  },

  // topic: Create fact tables and dimension tables
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create fact tables and dimension tables",
    question: "What characterizes a well-designed fact table in a star schema?",
    options: ["Many descriptive text columns and few rows","Mostly foreign keys and numeric measures with many rows","Only text columns for filtering","No relationships to other tables"],
    correct: 1,
    explanation: "Fact tables should be tall (many rows) and narrow (few columns), containing mainly foreign keys to dimensions and numeric measures."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create fact tables and dimension tables",
    question: "What is a surrogate key in a dimension table?",
    options: ["The natural business key from the source system","A system-generated integer key used as the primary key independent of source data","A calculated column based on multiple source columns","A key that links to the fact table"],
    correct: 1,
    explanation: "A surrogate key is a system-generated integer (not from the source) used as the primary key — it's stable, performant, and independent of source system changes."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create fact tables and dimension tables",
    question: "Which of the following belongs in a dimension table rather than a fact table?",
    options: ["Sales Amount","Quantity Sold","Product Category and Product Name","Order Date (as a foreign key)"],
    correct: 2,
    explanation: "Descriptive attributes like Product Category and Product Name belong in the Product dimension table, not the fact table."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create fact tables and dimension tables",
    question: "What is a 'snowflake schema' and why is it generally not recommended in Power BI?",
    options: ["A schema with very small fact tables — not recommended because it wastes storage","A schema where dimensions have sub-dimensions (normalized) — not recommended because it complicates DAX and reduces performance","A schema with multiple fact tables — not recommended because relationships become ambiguous","A schema used only for real-time data"],
    correct: 1,
    explanation: "Snowflake schemas normalize dimensions into sub-tables. This complicates DAX and is best flattened into a single dimension in Power BI."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Create fact tables and dimension tables",
    question: "A fact table has a Date foreign key stored as an integer (e.g. 20240115). What must you ensure in your date dimension?",
    options: ["The date dimension must also store dates as integers for the relationship to work","The date dimension must have an integer key column (e.g. DateKey = 20240115) that matches the fact table's date integer","The date dimension must use a Text key","Integer date keys are not supported in Power BI"],
    correct: 1,
    explanation: "The relationship requires matching data types. If the fact table uses an integer date key (YYYYMMDD), the date dimension must have a matching integer DateKey column."
  },

  // topic: Identify when to use reference or duplicate queries
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify when to use reference or duplicate queries and the resulting impact",
    question: "What is the key difference between Reference and Duplicate queries?",
    options: ["No practical difference","Reference creates a linked query (parent changes propagate); Duplicate creates an independent copy","Duplicate is always faster to refresh","Reference uses more memory"],
    correct: 1,
    explanation: "Reference queries are linked to the parent — changes propagate automatically. Duplicate creates an independent copy that doesn't inherit parent changes."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify when to use reference or duplicate queries and the resulting impact",
    question: "You have a 'SalesRaw' staging query and need both a 'FactSales' and a 'SalesSummary' query from it. What should you use?",
    options: ["Duplicate SalesRaw twice","Reference SalesRaw twice to create two dependent queries","Create two separate connections to the data source","Copy and paste the query steps"],
    correct: 1,
    explanation: "Referencing SalesRaw for both outputs means both queries share the same data load from the parent. Changes to SalesRaw flow to both automatically."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify when to use reference or duplicate queries and the resulting impact",
    question: "When would you choose Duplicate over Reference for a new query?",
    options: ["When you want changes in the parent to propagate automatically","When you need a completely independent starting point that diverges significantly from the parent","When you want to share query steps between queries","When the parent query is disabled"],
    correct: 1,
    explanation: "Duplicate is appropriate when you need a fully independent copy that will diverge significantly from the original — changes to the original won't affect the duplicate."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify when to use reference or duplicate queries and the resulting impact",
    question: "What is a potential performance risk of using Reference queries?",
    options: ["Referenced queries cannot be refreshed","If the parent query is not disabled from load, both the parent and child may load unnecessarily into the model","Reference queries always run slower","Reference queries cannot join to other tables"],
    correct: 1,
    explanation: "If the parent staging query has load enabled, it creates an unnecessary table in the model. Always disable load on staging/parent queries used only to feed other queries."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify when to use reference or duplicate queries and the resulting impact",
    question: "If you delete a parent query that has Reference queries dependent on it, what happens?",
    options: ["The reference queries are automatically promoted to standalone queries","The reference queries break and show errors because their source no longer exists","Nothing — reference queries have their own independent data source","The data is cached so the reference queries continue to work"],
    correct: 1,
    explanation: "Reference queries depend on the parent query's output. Deleting the parent breaks all dependent reference queries, causing them to display errors."
  },

  // topic: Merge and append queries
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Merge and append queries",
    question: "Which query operation is equivalent to a SQL UNION?",
    options: ["Merge queries","Append queries","Join queries","Group By"],
    correct: 1,
    explanation: "Append queries stacks tables vertically (combines rows), equivalent to SQL UNION. Merge combines tables horizontally like a SQL JOIN."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Merge and append queries",
    question: "Which Merge join type returns only rows that have matching values in both tables?",
    options: ["Left Outer","Right Outer","Inner Join","Full Outer"],
    correct: 2,
    explanation: "Inner Join returns only rows where the key exists in both tables — equivalent to SQL INNER JOIN."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Merge and append queries",
    question: "You are appending three monthly sales files with identical column names. What does Power Query do?",
    options: ["Creates one combined table with all rows stacked","Creates three separate tables and requires manual joining","Fails because only two tables can be appended","Automatically creates a relationship between the tables"],
    correct: 0,
    explanation: "Append with matching column names simply stacks all rows into one combined table — perfect for combining files with identical structure."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Merge and append queries",
    question: "What join type would you use to find rows in Table A that have NO match in Table B (anti-join)?",
    options: ["Inner Join","Left Outer","Left Anti Join","Full Outer"],
    correct: 2,
    explanation: "Left Anti Join returns only rows from the left table that have no match in the right table — useful for finding missing or unmatched records."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Merge and append queries",
    question: "After merging two queries, a new column appears containing [Table] values. What must you do next?",
    options: ["The merge is complete — [Table] values are the joined data","Expand the [Table] column by clicking the expand icon to select which columns from the right table to include","Delete the [Table] column — the join already happened","Convert the [Table] column to text"],
    correct: 1,
    explanation: "After a merge, the joined table data appears as a [Table] object. You must expand it to bring in the specific columns from the right table."
  },

  // topic: Identify and create appropriate keys for relationships
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify and create appropriate keys for relationships",
    question: "What type of key provides the best performance for relationships in Power BI?",
    options: ["Long text keys","GUID keys","Integer (Whole Number) keys","Date keys"],
    correct: 2,
    explanation: "Integer keys provide the best performance and use least memory. They are more efficiently stored and compared than text or GUID keys."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify and create appropriate keys for relationships",
    question: "What is required for a column to be used as the 'one' side of a One-to-Many relationship?",
    options: ["The column must be a date type","The column must contain unique values (no duplicates) in that table","The column must be an integer","The column must be visible in the report"],
    correct: 1,
    explanation: "The 'one' side key must have unique values — no duplicates. This is the primary key side (e.g. ProductID in a Products dimension table)."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify and create appropriate keys for relationships",
    question: "What Power Query step helps verify a key column has no duplicate values before loading?",
    options: ["Column Quality check","Remove Duplicates or Keep Duplicates to inspect duplicate rows","Replace Values","Group By with a Count column"],
    correct: 1,
    explanation: "Using Remove Duplicates on the key column (or Keep Duplicates to inspect them) helps verify uniqueness before the table is used as a dimension."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify and create appropriate keys for relationships",
    question: "A fact table has a ProductID column that sometimes contains null values. What impact does this have on model relationships?",
    options: ["No impact — nulls are ignored","Null values in fact table foreign keys will not match any dimension row and may cause blank values in reports","The relationship will automatically fail","Power BI converts nulls to zero automatically"],
    correct: 1,
    explanation: "Null foreign keys don't match any dimension row. These fact rows become 'orphaned' and may appear as blanks in your report visuals."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Identify and create appropriate keys for relationships",
    question: "What is the purpose of adding an 'Index Column' in Power Query?",
    options: ["To sort the table alphabetically","To create a sequential integer surrogate key for rows that lack a unique identifier","To add row numbers for display in reports","To replace the primary key from the source"],
    correct: 1,
    explanation: "An Index Column generates a sequential integer starting at 0 or 1 — useful as a surrogate key when the source data lacks a unique identifier column."
  },

  // topic: Configure data loading for queries
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Configure data loading for queries",
    question: "When should you disable loading for a query?",
    options: ["Never disable loading","For intermediate/staging queries that only feed other queries","For all queries to improve performance","For fact tables only"],
    correct: 1,
    explanation: "Disable loading for staging/helper queries not needed in the model. This reduces model size and refresh time without losing the transformation logic."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Configure data loading for queries",
    question: "How do you disable loading for a query in Power Query Editor?",
    options: ["Delete the query","Right-click the query > Enable Load (uncheck it)","Set the data type to None","Use Home > Close & Apply with Load disabled selected"],
    correct: 1,
    explanation: "Right-clicking the query name and unchecking 'Enable Load' disables loading. The query still runs and feeds referenced queries, but won't create a table in the model."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Configure data loading for queries",
    question: "What visual indicator in Power Query shows that a query has load disabled?",
    options: ["A red X icon","The query name appears in italics","The query is hidden","A yellow warning triangle"],
    correct: 1,
    explanation: "Queries with load disabled appear in italics in the Queries pane — a clear visual cue that they won't create a table in the data model."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Configure data loading for queries",
    question: "A query has 'Include in report refresh' disabled. What happens during a scheduled refresh?",
    options: ["The query runs but data is not stored","The query is skipped entirely during refresh","The query runs and stores data in a hidden table","The query throws an error"],
    correct: 1,
    explanation: "Disabling 'Include in report refresh' means the query is excluded from the refresh cycle — the data is not updated when the dataset refreshes."
  },
  {
    domain: "prepare_data", section: "Transform and load the data",
    topic: "Configure data loading for queries",
    question: "What is the impact of having many staging queries with load enabled?",
    options: ["Improves report performance","Creates unnecessary tables in the model, increasing file size and refresh time","Has no impact — only measures affect performance","Breaks relationships between tables"],
    correct: 1,
    explanation: "Every enabled query creates a table in the model. Unnecessary staging tables bloat model size and slow refresh without adding analytical value."
  }
];
