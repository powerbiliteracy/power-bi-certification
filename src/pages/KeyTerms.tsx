import React, { useState } from "react";
import BadgeGrantOnVisit from "@/components/BadgeGrantOnVisit";
import FavoriteButton from "@/components/FavoriteButton";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import ContentUpdateBanner from "@/components/ContentUpdateBanner";
import { Search, ChevronDown, ChevronRight, Lightbulb, CheckCircle, ExternalLink, Zap, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const msLearnUrl = (term: string) =>
  `https://learn.microsoft.com/en-us/search/?terms=${encodeURIComponent(term + " Power BI")}&category=Ai`;

interface TermData {
  term: string;
  def: string;
  speed?: string;
  tip?: string;
  practice?: string;
}

interface SectionData {
  title: string;
  emoji: string;
  terms: TermData[];
}

interface DomainData {
  domain: string;
  emoji: string;
  weight: string;
  color: string;
  sections: SectionData[];
}

const keyTermsData: DomainData[] = [
  {
    domain: "Prepare the Data",
    emoji: "🧩",
    weight: "25–30%",
    color: "blue",
    sections: [
      {
        title: "Data Connection & Setup",
        emoji: "🔹",
        terms: [
          { term: "Data sources", def: "External systems Power BI connects to — databases, files, cloud services, APIs, and more.", speed: "Relational → SQL Server, Oracle. File → Excel, CSV. Cloud → SharePoint, Salesforce. API → OData, Web.", tip: "Know the difference between supported source types: relational, flat file, online services, and OData feeds.", practice: "Always use named parameters for connection strings so reports can be easily redirected between environments." },
          { term: "Shared semantic model", def: "A published dataset in Power BI Service that multiple reports can connect to, ensuring consistent business logic.", speed: "One dataset → many reports. Promotes consistency. Build permission required to create reports on top.", tip: "Exam may ask when to use a shared model vs. building your own — shared models promote consistency and reduce duplication.", practice: "Use shared models when multiple teams need the same KPIs to avoid metric discrepancies across reports." },
          { term: "Data source credentials", def: "Authentication details (username/password, OAuth, keys) stored securely to access data sources.", speed: "Stored per user in Service. Service account needed for scheduled refresh. Gateway uses its own credentials.", tip: "Credentials are stored per user in Power BI Service — service account credentials are needed for scheduled refresh.", practice: "Use a dedicated service account for gateway credentials to avoid refresh failures when staff leave." },
          { term: "Privacy levels", def: "Settings (Private, Organizational, Public) that control how Power Query can combine data across sources — affects query folding.", speed: "Private > Organizational > Public. Wrong level = folding breaks or data leaks. Set before combining sources.", tip: "Setting privacy levels incorrectly can block query folding or cause data leakage. Exam often tests 'why is folding breaking?'", practice: "Set privacy levels to the least permissive option that still allows required data combinations." },
          { term: "DirectLake", def: "Fabric-only mode that reads Delta Parquet files directly from OneLake — combines Import speed with DirectQuery freshness.", speed: "Fabric only. No data copy. Fast as Import. Fresh as DirectQuery. Falls back to DQ if guardrails exceeded.", tip: "DirectLake is new in the Jan 2026 syllabus. Know it as Fabric-only, no data copy, falls back to DirectQuery if guardrails exceeded.", practice: "Use DirectLake for large Fabric lakehouses where you need near-real-time data without import refresh overhead." },
          { term: "DirectQuery", def: "Connection mode where each visual sends real-time queries to the source database — no data is stored in Power BI.", speed: "Real-time. No data stored. Performance = source DB speed. No complex M transformations. Limited DAX.", tip: "Use DirectQuery when data must be real-time or dataset is too large for import. Performance depends on source DB speed.", practice: "Limit visuals on DirectQuery reports and pre-aggregate at the source to avoid slow queries." },
          { term: "Import mode", def: "Data is copied into Power BI's in-memory engine (VertiPaq). Requires scheduled refresh to stay current.", speed: "Fastest query mode. Data stored in VertiPaq. Refresh required. Best for most scenarios.", tip: "Import is the fastest query mode. Best for most scenarios unless real-time data is required.", practice: "Remove unused columns before import to reduce model size and improve compression." },
          { term: "Parameters", def: "Named, reusable values in Power Query used for dynamic connection strings, file paths, or filter values.", speed: "Named values in PQ. Used for env switching (dev/test/prod), dynamic paths, and incremental refresh.", tip: "Parameters enable environment switching (dev/test/prod) without editing queries manually.", practice: "Create a 'ServerName' parameter so the same report can point to different databases without query edits." },
        ]
      },
      {
        title: "Data Profiling & Quality",
        emoji: "🔹",
        terms: [
          { term: "Data profiling", def: "Examining data to understand its structure, quality, and characteristics before modeling.", speed: "View tab in PQ. Enable 'Column profiling based on entire dataset' — default is top 1000 rows only.", tip: "Enable profiling on the full dataset (not just top 1000 rows) by changing the setting in the View tab of Power Query.", practice: "Profile every column in a new dataset before building transformations — surprises late are expensive." },
          { term: "Column quality", def: "Visual indicator in Power Query showing % of valid, error, and empty values per column.", speed: "Valid / Error / Empty %. Target = 100% valid. Fix errors before load.", tip: "Aim for 100% valid before loading. Errors in columns can propagate silently into calculations.", practice: "Filter out or replace error rows before load to prevent NULL propagation in DAX measures." },
          { term: "Column distribution", def: "Bar chart in Power Query showing the frequency of each value across a column.", speed: "Value frequency histogram. Distinct vs. count gap = duplicates or nulls.", tip: "Useful for spotting data skew — if one value dominates, consider if it's a data quality issue.", practice: "Use distribution to validate lookup/dimension tables have no unexpected values before creating relationships." },
          { term: "Null values", def: "Missing or unknown values. Need to be handled explicitly — replacement, fill, or removal depending on context.", speed: "Nulls in keys = broken joins. Replace with 'Unknown'. Don't delete rows — use a placeholder.", tip: "Nulls in relationship key columns will break or weaken joins. Always handle before modeling.", practice: "Replace nulls in dimension keys with a placeholder like 'Unknown' rather than removing rows." },
          { term: "Data cleansing", def: "The process of detecting and correcting errors, inconsistencies, and missing values in raw data.", speed: "Do in Power Query (M), not DAX. Name every step. Cleanse before modeling.", tip: "Power Query is the right place for cleansing — not DAX. Keep business logic out of the M layer.", practice: "Document every cleansing step in query step names so future maintainers understand transformations." },
        ]
      },
      {
        title: "Data Transformation (Power Query)",
        emoji: "🔹",
        terms: [
          { term: "Data types", def: "Classification of column values: Whole Number, Decimal, Text, Date, Boolean, etc.", speed: "Set explicitly — always. Auto-detect fails on date formats. Set types as last step.", tip: "Always set data types explicitly — auto-detection can fail, especially with dates in non-US formats.", practice: "Set data types as the last step in a query to avoid type-cast errors mid-transformation." },
          { term: "Custom columns", def: "New columns created using M language expressions in Power Query.", speed: "M language. More flexible than conditional columns. Can call custom functions.", tip: "Custom columns using M can reference other columns and functions — more flexible than conditional columns.", practice: "Use Table.AddColumn with a custom function for complex transformations that need reuse." },
          { term: "Conditional columns", def: "Wizard-driven columns built from if/then/else rules without writing M.", speed: "GUI wizard. Compiles to a Table.AddColumn with nested if. Easy for non-coders.", tip: "Use for simple bucketing — switch to custom columns when conditions exceed 4–5 branches.", practice: "Build region buckets ('EMEA', 'APAC', 'AMER') from country codes using a conditional column." },
          { term: "Group By", def: "Aggregates rows into groups based on unique column combinations — like SQL GROUP BY.", speed: "Like SQL GROUP BY. Multiple columns + multiple aggregations in one step.", tip: "Power Query Group By can use multiple columns and multiple aggregation operations at once.", practice: "Use Group By to pre-aggregate large tables before load — reduces model row count significantly." },
          { term: "Pivot", def: "Transforms row values into columns (narrow to wide format).", speed: "Rows → Columns. Requires value column + aggregation.", tip: "Pivot in Power Query requires selecting the value column and an aggregation function.", practice: "Use pivot carefully — it creates dynamic column names that can break if source data changes." },
          { term: "Unpivot", def: "Transforms column headers into row values (wide to narrow). Essential for normalising Excel crosstabs.", speed: "Columns → Rows. Use 'Unpivot Other Columns' to future-proof.", tip: "Unpivot Other Columns is the safest option — it won't break if new columns are added to the source.", practice: "Use 'Unpivot Other Columns' instead of selecting specific columns to future-proof the query." },
          { term: "Transpose", def: "Swaps rows and columns of a table — what was a row becomes a column and vice versa.", speed: "Rows ↔ Columns. Often paired with 'Use First Row as Headers' afterwards.", tip: "Transpose is one-shot; the original column names are lost. Promote headers after if needed.", practice: "Transpose tiny lookup files (e.g. a single-row config sheet) before joining to a fact table." },
          { term: "Semi-structured data", def: "Data with partial structure — JSON, XML, nested records/lists in cells — that needs expansion before tabular use.", speed: "JSON → Table.FromRecords. Records/Lists in cell → Expand or Convert to Table.", tip: "Use Json.Document / Xml.Tables to parse, then expand records and lists into rows/columns.", practice: "Convert a JSON API response by parsing with Json.Document, then 'Convert to Table' and expand records." },
          { term: "Convert to Table", def: "Power Query action that turns a list or record into a tabular structure ready for further transforms.", speed: "List/Record → Table. Required before column operations.", tip: "Lists become single-column tables; records become two-column key/value tables.", practice: "After parsing JSON, use 'Convert to Table' so you can rename, expand, and type the columns." },
          { term: "Primary key", def: "A column (or combination) that uniquely identifies each row in a dimension or fact table.", speed: "Unique. Non-null. Single value per row.", tip: "Power BI uses primary keys on the 'one' side of relationships; duplicates break cardinality.", practice: "Run 'Keep Duplicates' on a candidate key to verify uniqueness before creating relationships." },
          { term: "Surrogate key", def: "A system-generated integer key (often via Index Column) used instead of a business key for relationships.", speed: "Integer. Generated. Smaller + faster than text business keys.", tip: "Surrogate keys keep relationships stable when business identifiers change.", practice: "Add an Index Column starting at 1 to a dimension and use it as the relationship key." },
          { term: "Composite key", def: "A key made from two or more columns that together uniquely identify a row.", speed: "Multi-column unique. Merge into a single key column for clean relationships.", tip: "Power BI relationships only join on a single column — concatenate composite keys with a delimiter.", practice: "Merge OrderId + LineNo with a pipe ('|') to build a single relationship key." },
          { term: "Foreign key", def: "A column in a fact table that references the primary key of a dimension table.", speed: "Many side. Matches dimension PK. Hide after the relationship is built.", tip: "FKs in facts should be the same data type as the dimension PK or the relationship will silently fail.", practice: "Hide all foreign-key columns from report view so users only see meaningful dimension fields." },
          { term: "Fact table", def: "A table of measurable events (sales, orders, sessions) at a defined grain, joined to dimensions via foreign keys.", speed: "Numbers + FKs. Long and narrow. Defined grain.", tip: "Every fact table must have a clearly stated grain — one row per what?", practice: "Document the grain in the table description so future analysts don't aggregate at the wrong level." },
          { term: "Dimension table", def: "A descriptive table (Customer, Product, Date) used to slice and group facts.", speed: "Wide + short. Descriptive attributes. One row per entity.", tip: "Star schema needs flat dimensions — flatten snowflakes back into the dimension.", practice: "Combine Product, Subcategory, and Category into one Product dimension for simpler filters." },
          { term: "Merge queries", def: "Combines two queries horizontally by matching key columns — equivalent to SQL JOIN.", speed: "SQL JOIN equivalent. 6 join types.", tip: "Know all join types: Left Outer, Right Outer, Full Outer, Inner, Left Anti, Right Anti.", practice: "Check query folding after merges — complex merges may break folding." },
          { term: "Append queries", def: "Stacks two or more queries vertically to combine rows — equivalent to SQL UNION.", speed: "SQL UNION equivalent. Column names must match.", tip: "Column names must match exactly for append to work correctly.", practice: "Use append to combine monthly files from a folder — pair with 'From Folder' connector." },
          { term: "Fuzzy merge", def: "Merge that matches text columns approximately using similarity thresholds.", speed: "Set threshold (0–1). Optional transformation table for synonyms.", tip: "Useful for joining customer names with typos — supply a transformation table to handle synonyms.", practice: "Set similarity threshold to 0.8+ in production to avoid false matches." },
        ]
      },
      {
        title: "Data Load Configuration",
        emoji: "🔹",
        terms: [
          { term: "Query folding", def: "Power Query translates M steps into native source queries — keeps processing at the source.", speed: "M → native SQL at source. Breaks after: Add Index, cross-source merges.", tip: "Folding breaks after steps like adding index columns or merging from different sources.", practice: "Place folding-breaking steps as late as possible in the query to maximise folding." },
          { term: "Staging queries", def: "Intermediate queries used only to feed other queries — should have load disabled.", speed: "Disable load on helper queries. Group in a 'Staging' folder.", tip: "Disable load on all staging/helper queries to prevent unnecessary tables in the model.", practice: "Group staging queries in a dedicated folder using Power Query's query group feature." },
          { term: "Reference queries", def: "Queries that point to a parent query and share its data source — changes to parent flow through automatically.", speed: "Shares parent source. Parent changes flow through.", tip: "Use reference when you want multiple outputs from one source query.", practice: "Reference a clean staging query to create both a fact table and an aggregated summary." },
          { term: "Duplicate queries", def: "Independent copies of a query with their own source connection — parent changes do not affect them.", speed: "Independent copy. Parent changes don't flow through. Doubles source load.", tip: "Use duplicate when you need a fully independent starting point.", practice: "Only duplicate when the two queries will diverge significantly — otherwise use reference." },
          { term: "Enable load", def: "Toggle that controls whether a query loads into the data model on refresh.", speed: "On = appears in model. Off = staging only. Default = on.", tip: "Disable load for any query that's only used as an input to another query.", practice: "Right-click → Enable Load to suppress staging queries from the model." },
          { term: "Include in report refresh", def: "Toggle that determines if a query is refreshed when the report refreshes.", speed: "On = refreshes. Off = static snapshot. Independent of Enable Load.", tip: "Useful for one-off lookup tables that should never re-fetch.", practice: "Disable for legacy lookup files that you intentionally want to freeze." },
        ]
      },
    ]
  },
  {
    domain: "Model the Data",
    emoji: "🧱",
    weight: "25–30%",
    color: "purple",
    sections: [
      {
        title: "Data Model Design",
        emoji: "🔹",
        terms: [
          { term: "Star schema", def: "Model design with a central fact table connected to surrounding dimension tables — the recommended pattern for Power BI.", speed: "Fact in centre. Dimensions around it. Always correct for 'best model design' questions.", tip: "Star schema is almost always the correct answer for 'best model design' questions in the exam.", practice: "Flatten snowflake dimensions into single flat dimension tables." },
          { term: "Fact tables", def: "Tables containing numeric measures and foreign keys. Represent events or transactions.", speed: "Numbers + FK keys only. No descriptive text. High row count.", tip: "Fact tables should have no descriptive text — just numbers and foreign keys.", practice: "Remove descriptive columns from fact tables and instead join to dimensions." },
          { term: "Dimension tables", def: "Tables containing descriptive attributes used to filter/group facts.", speed: "One row per entity. Rich descriptive attributes. Low row count.", tip: "Good dimensions have one row per entity, a surrogate key, and rich attributes.", practice: "Add calculated columns in dimensions (not facts) for groupings." },
          { term: "Role-playing dimensions", def: "A single dimension table used multiple times via inactive relationships.", speed: "1 table, multiple relationships. Only 1 active. Others via USERELATIONSHIP().", tip: "Only one relationship between two tables can be active.", practice: "Create separate measures for each role using USERELATIONSHIP." },
          { term: "Hidden fields", def: "Columns/tables not visible to report authors — used to hide technical keys.", speed: "Hide FK/ID columns after relationships set.", tip: "Hide foreign keys and surrogate keys so report users only see business fields.", practice: "Hide all ID/key columns after relationships are defined." },
        ]
      },
      {
        title: "Relationships",
        emoji: "🔹",
        terms: [
          { term: "Cardinality", def: "Defines the uniqueness of values between tables: 1:1, 1:*, or *:*.", speed: "1:* = dimension to fact (ideal). *:* = avoid if possible.", tip: "Many-to-Many relationships should be avoided unless necessary.", practice: "Always aim for 1:* relationships from dimension to fact." },
          { term: "Cross-filter direction", def: "Controls which direction filters flow across a relationship: Single or Both.", speed: "Single = default. Both = bidirectional, causes ambiguity.", tip: "Bidirectional filtering can cause ambiguous filter paths.", practice: "Use bidirectional only when explicitly needed." },
          { term: "Active vs inactive relationships", def: "Active relationships filter automatically. Inactive ones use USERELATIONSHIP() in DAX.", speed: "Active = auto filters. Inactive = need USERELATIONSHIP().", tip: "Only one relationship can be active between two tables.", practice: "Use inactive relationships + USERELATIONSHIP inside CALCULATE." },
          { term: "USERELATIONSHIP", def: "DAX function that activates an inactive relationship inside a single CALCULATE.", speed: "CALCULATE([Sales], USERELATIONSHIP(Date[Date], Sales[ShipDate])).", tip: "Used for role-playing dimensions when several date columns reference the same date table.", practice: "Create OrderDate (active) + ShipDate (inactive) and switch with USERELATIONSHIP." },
          { term: "RELATED", def: "DAX function that pulls a column value from the 'one' side of an active relationship into a row context.", speed: "Use in calculated columns. Follows active relationships only.", tip: "RELATED needs row context — won't work directly inside a measure.", practice: "Add a 'CategoryName' calculated column to a Product table by RELATED(Category[Name])." },
          { term: "RELATEDTABLE", def: "Returns the related rows on the 'many' side of an active relationship as a table.", speed: "Use with iterators (SUMX) or COUNTROWS.", tip: "Useful in calculated columns on the 'one' side that need to summarise child rows.", practice: "On Customer, add 'Lifetime Orders' = COUNTROWS(RELATEDTABLE(Sales))." },
          { term: "Table and column properties", def: "Metadata such as data category, summarise by, format, sort by column, and visibility.", speed: "Set in Model view. Affects visuals + Q&A.", tip: "Set 'Sort by Column' on Month Name → Month Number so months sort chronologically.", practice: "Mark address columns with the correct geographic data category for map visuals." },
          { term: "Calculated tables", def: "Tables defined entirely by a DAX expression — created in the modelling layer.", speed: "DAX-defined. No source. Refreshed with the model.", tip: "Common uses: date tables, helper tables, disconnected tables for what-if.", practice: "Use CALENDARAUTO() to spin up a date table without needing Power Query." },
        ]
      },
      {
        title: "DAX Fundamentals",
        emoji: "🔹",
        terms: [
          { term: "Measures", def: "DAX formulas evaluated dynamically based on filter context.", speed: "Dynamic. Recalculated per cell. Respond to all filters/slicers.", tip: "Measures are recalculated for every cell in a visual.", practice: "Store all measures in a dedicated hidden 'Measures' table." },
          { term: "Calculated columns", def: "DAX expressions evaluated row by row and stored in the table.", speed: "Row by row. Stored = increases model size.", tip: "Calculated columns increase model size. Prefer measures for aggregations.", practice: "Use calculated columns only for slicer/axis values." },
          { term: "Implicit measures", def: "Auto-generated aggregations Power BI creates when you drop a numeric column on a visual.", speed: "Auto SUM/AVG/COUNT in visual. No DAX written.", tip: "Disable implicit measures when using calculation groups — they aren't compatible.", practice: "Convert implicit aggregations into explicit measures for reuse and tooltips." },
          { term: "Quick measures", def: "Wizard-driven measures (running total, % of grand total, etc.) that generate DAX for you.", speed: "GUI wizard. Produces editable DAX.", tip: "Great for learning patterns — open the generated DAX and study it.", practice: "Use a quick measure for 'Year-over-year %' then refactor with VAR/RETURN." },
          { term: "CALCULATE", def: "Evaluates an expression in a modified filter context — the most important DAX function.", speed: "Most important DAX function. Modifies filter context.", tip: "CALCULATE can add, remove, or replace filters. ALL(), ALLEXCEPT(), FILTER() are common modifiers.", practice: "Use CALCULATE(SUM(Sales[Amount]), DateTable[Year] = 2024) for fixed-year totals." },
          { term: "Filter context", def: "The set of active filters applied to a measure at evaluation time.", speed: "Active filters at evaluation time. Key concept for DAX.", tip: "Understanding filter context is the key to writing correct DAX.", practice: "Use CALCULATE to manipulate filter context explicitly." },
          { term: "Row context", def: "The current row being evaluated in a calculated column or iterator function.", speed: "Current row in calc column or iterator (SUMX, AVERAGEX).", tip: "Row context doesn't automatically filter related tables — use RELATED().", practice: "Use SUMX(Sales, Sales[Qty] * Sales[Price]) for row-by-row multiplication." },
          { term: "Context transition", def: "When CALCULATE converts the current row context into an equivalent filter context.", speed: "Triggered by CALCULATE inside an iterator. Powerful but error-prone.", tip: "Implicit context transition happens when you reference a measure inside an iterator.", practice: "Wrap measure references in iterators with VAR to make context transition explicit." },
          { term: "Iterators (SUMX, AVERAGEX)", def: "DAX functions that walk a table row-by-row evaluating an expression in row context.", speed: "X-suffix. Slower than non-iterators. Use for per-row calcs.", tip: "Prefer SUM([Col]) over SUMX(Tbl, [Col]) when no row math is needed.", practice: "Use SUMX(Sales, Sales[Qty] * Sales[Price]) when there's no Total = Qty*Price column." },
          { term: "VAR / RETURN", def: "Local variables in DAX that compute once and are reused — improves readability and performance.", speed: "Computed once. Stable across context. Self-documenting.", tip: "Variables capture filter context at definition time — handy when CALCULATE later changes it.", practice: "Use a 'Sales' VAR + 'PrevSales' VAR + RETURN DIVIDE(...) for clean YoY% measures." },
          { term: "DIVIDE", def: "Safe division that returns BLANK (or alternate result) when the denominator is zero.", speed: "DIVIDE(num, den, [alt]). No #DIV/0 errors.", tip: "Always prefer DIVIDE over the / operator in measures.", practice: "DIVIDE([Profit], [Sales]) returns blank when sales are zero." },
          { term: "SWITCH(TRUE())", def: "Pattern that replaces nested IF with cleaner range/condition branches.", speed: "SWITCH(TRUE(), cond1, val1, cond2, val2, default).", tip: "Drastically more readable than 4+ nested IFs.", practice: "Use for tier banding (e.g. spend > 10000 → 'Gold'; > 5000 → 'Silver'…)." },
          { term: "Calculation groups", def: "A feature that applies DAX expressions across multiple measures — reduces duplication.", speed: "1 group replaces dozens of duplicate measures. Classic: Time Intelligence.", tip: "Use for time intelligence (YTD, PY, MoM%).", practice: "Create a 'Time Intelligence' calculation group with items: Actual, YTD, Prior Year, YoY%." },
          { term: "Statistical functions", def: "DAX functions for statistics: MEDIAN, PERCENTILE.INC, STDEV.P, RANKX.", speed: "MEDIAN, PERCENTILE.INC, STDEV.P, RANKX, GEOMEAN.", tip: "PL-300 covers basic statistical measures — know AVERAGE vs MEDIAN trade-offs.", practice: "Use MEDIAN for skewed distributions where AVERAGE misleads (salary, response time)." },
          { term: "Semi-additive measures", def: "Measures that can't be summed across all dimensions (typically time) — e.g. inventory balance.", speed: "Use LASTDATE / LASTNONBLANK / OPENINGBALANCEMONTH.", tip: "Bank balances and inventory snapshots are classic semi-additive examples.", practice: "Use CALCULATE([Inventory Qty], LASTDATE(Date[Date])) for end-of-period balance." },
        ]
      },
      {
        title: "Time Intelligence DAX",
        emoji: "🔹",
        terms: [
          { term: "TOTALYTD", def: "Calculates a cumulative year-to-date total. Requires a marked date table.", speed: "TOTALYTD([Measure], Date[Date]). Add 3rd arg for fiscal year-end.", tip: "Use the optional third argument to define fiscal year end.", practice: "TOTALYTD(SUM(Sales[Amount]), DateTable[Date]) — simplest YTD measure." },
          { term: "SAMEPERIODLASTYEAR", def: "Returns dates shifted back one year — for year-over-year comparisons.", speed: "CALCULATE([Sales], SAMEPERIODLASTYEAR(Date[Date])).", tip: "Wrap in CALCULATE for year-over-year measures.", practice: "Create a 'Sales LY' measure, then calculate YoY%." },
          { term: "DATEADD", def: "Shifts dates by any interval — more flexible than SAMEPERIODLASTYEAR.", speed: "DATEADD(Date[Date], -1, QUARTER). Any interval.", tip: "More flexible than SAMEPERIODLASTYEAR — can shift by any interval.", practice: "Use for prior quarter or prior month comparisons." },
          { term: "DATESYTD / DATESQTD / DATESMTD", def: "Return tables of dates from the start of the year/quarter/month to the current date in context.", speed: "Use as filter inside CALCULATE.", tip: "DATESYTD returns a table — must be wrapped in CALCULATE.", practice: "CALCULATE([Sales], DATESYTD(Date[Date], '12-31'))." },
          { term: "PARALLELPERIOD", def: "Shifts the current date selection by a number of intervals while preserving the period length.", speed: "PARALLELPERIOD(Date[Date], -1, YEAR).", tip: "Useful for 'same month last year' style comparisons across non-day-grain selections.", practice: "Use to compare current quarter sales vs. the same quarter two years ago." },
          { term: "Date table", def: "A dedicated table with one row per day used for time intelligence.", speed: "One row per day. No gaps. Must be marked as date table.", tip: "Must have no missing dates, a Date column type, and be marked as date table.", practice: "Use CALENDAR() or CALENDARAUTO() to generate; add Year, Month, Quarter columns." },
          { term: "Mark as date table", def: "Model setting that registers a table as the canonical date table for time intelligence.", speed: "Right-click table → Mark as Date Table → choose date column.", tip: "Without it, time-intelligence functions silently fall back to auto-generated tables.", practice: "Always mark a custom date table after creating it to enable TOTALYTD / SAMEPERIODLASTYEAR." },
        ]
      },
      {
        title: "Performance Optimization",
        emoji: "🔹",
        terms: [
          { term: "Performance Analyzer", def: "Built-in tool that records query execution times per visual.", speed: "View tab → Performance Analyzer. DAX time vs. visual display time.", tip: "Slow DAX = measure issue. Slow display = rendering issue.", practice: "Run before publishing — fix any visual exceeding 3-5 seconds." },
          { term: "DAX query view", def: "Built-in pane in Power BI Desktop for writing and benchmarking DAX queries directly against the model.", speed: "View tab → DAX query view. Run + benchmark.", tip: "Use the Run benchmark button to compare two measure versions deterministically.", practice: "Paste a slow visual's DAX from Performance Analyzer and refactor in DAX query view." },
          { term: "Reducing granularity", def: "Aggregating fact data to a coarser grain (e.g. daily → monthly) before load to shrink the model.", speed: "Group By in Power Query. Smaller model = faster queries.", tip: "Reduce granularity whenever the report never needs lower-level detail.", practice: "Pre-aggregate POS transactions to daily totals if reports never need transaction-level detail." },
          { term: "Aggregations", def: "Pre-computed summary tables stored alongside the fact table — Power BI uses them automatically.", speed: "Manage Aggregations in modelling. Composite models / Premium.", tip: "Best paired with DirectQuery composite models for big data scenarios.", practice: "Add a daily-grain aggregation table over a transaction-grain DirectQuery fact." },
          { term: "Model size reduction", def: "Techniques to shrink model: remove unused columns, use appropriate data types.", speed: "Remove high-cardinality columns (GUIDs, timestamps).", tip: "Removing high-cardinality columns dramatically reduces compression.", practice: "Audit with DAX Studio's VertiPaq Analyser." },
          { term: "VertiPaq engine", def: "The columnar in-memory engine that powers Import-mode datasets in Power BI.", speed: "Columnar. Compressed. RAM-resident.", tip: "Compression depends on column cardinality and sort order — fewer distinct values compress better.", practice: "Sort large fact tables by the lowest-cardinality column to improve VertiPaq compression." },
        ]
      },
    ]
  },
  {
    domain: "Visualize & Analyze Data",
    emoji: "📈",
    weight: "25–30%",
    color: "green",
    sections: [
      {
        title: "Report Creation",
        emoji: "🔹",
        terms: [
          { term: "Visual types", def: "Chart types: bar, column, line, pie, donut, matrix, table, card, scatter, map, and more.", speed: "Bar/Column = compare. Line = trend. Scatter = correlation. Matrix = cross-tab.", tip: "Know which visual to use: bar for comparison, line for trends, scatter for correlation.", practice: "Default to bar/column charts — avoid pie charts for more than 3-4 categories." },
          { term: "Conditional formatting", def: "Dynamically changing visual properties based on data rules or field values.", speed: "Background, font, data bars, icons, URLs. Rules or field-value based.", tip: "Can be applied to background, font, data bars, icons, and web URLs.", practice: "Use RAG (Red/Amber/Green) colour scales on KPI columns." },
          { term: "Slicers", def: "Visual filters that allow report users to interactively filter data.", speed: "List, Dropdown, Between, Relative date.", tip: "Slicer types: list, dropdown, between, relative date.", practice: "Use dropdown slicers for long lists; list slicers for 5-10 values." },
          { term: "Themes", def: "JSON-based styling configurations applied across an entire report.", speed: "JSON config. Apply at start. Sets colours, fonts, defaults.", tip: "Custom themes define colours, fonts, and default formatting.", practice: "Apply a corporate theme at report start." },
          { term: "Visual calculations", def: "DAX expressions scoped to a single visual — running totals, ranks.", speed: "DAX scoped to visual only. Use ROWS/COLUMNS window.", tip: "Visual calculations use different context from standard DAX.", practice: "Use for running totals without creating model measures." },
          { term: "Paginated reports", def: "Pixel-perfect, print-ready reports built in Report Builder.", speed: "Pixel-perfect. Print-ready. Not interactive.", tip: "For structured tabular output — not for interactive exploration.", practice: "Use for invoices, statements, and regulatory outputs." },
        ]
      },
      {
        title: "Copilot Features",
        emoji: "🔹",
        terms: [
          { term: "Narrative visuals", def: "AI-generated natural language summaries of data trends.", speed: "Copilot generates text summary. Requires Fabric/Premium.", tip: "New in Jan 2026 syllabus. Requires Fabric or Premium capacity.", practice: "Review and customise Copilot-generated narratives." },
          { term: "Report page generation", def: "Copilot creates entire report pages from model and prompts.", speed: "Quality improves with good field names and descriptions.", tip: "Good field naming improves Copilot output quality.", practice: "Add descriptions to measures and tables to improve suggestions." },
          { term: "Semantic model summaries", def: "Copilot generates descriptions of the data model structure.", speed: "Plain English model overview. Useful for onboarding.", tip: "Useful for onboarding new report authors.", practice: "Use as a starting point, then refine with business terminology." },
        ]
      },
      {
        title: "Interactivity & UX",
        emoji: "🔹",
        terms: [
          { term: "Bookmarks", def: "Saved states of a report page used for interactive navigation.", speed: "Saved page state. Captures data + visibility.", tip: "Can capture data state, display state, or both.", practice: "Use with buttons to build 'Reset Filters' functionality." },
          { term: "Drillthrough", def: "Navigates to a detail page pre-filtered by selected value.", speed: "Right-click → drill to detail. Field on TARGET page.", tip: "Drillthrough field on the target page, not the source.", practice: "Add a Back button on drillthrough pages." },
          { term: "Sync slicers", def: "Slicers that maintain filter state across multiple pages.", speed: "View → Sync slicers. Sync + Visible toggles per page.", tip: "Two toggles: sync (keeps value) and visible (shows slicer).", practice: "Sync a Date slicer across all pages." },
          { term: "Visual interactions", def: "Controls how one visual's selection affects others.", speed: "Filter = removes rows. Highlight = dims. None = no effect.", tip: "Three types: Filter, Highlight, None. Set per visual pair.", practice: "Disable interactions from KPI cards to prevent confusion." },
          { term: "Custom tooltips", def: "Custom report pages shown on hover over a visual.", speed: "Create page → Tooltip canvas → assign in Format pane.", tip: "Tooltip page canvas should use 'Tooltip' preset.", practice: "Build tooltip pages with sparklines and KPIs." },
        ]
      },
      {
        title: "Analytics & Insights",
        emoji: "🔹",
        terms: [
          { term: "AI visuals", def: "Key Influencers, Decomposition Tree, Q&A, Anomaly Detection, Smart Narrative.", speed: "Key Influencers = what drives. Decomp Tree = explore. Q&A = natural language.", tip: "Know which AI visual to use for each scenario.", practice: "Use Decomposition Tree for ad-hoc root cause analysis." },
          { term: "Forecasting", def: "Built-in line chart feature predicting future values.", speed: "Line chart only. Continuous date axis required.", tip: "Only available on line charts with continuous date axis.", practice: "Set a confidence interval (e.g. 95%) on forecasts." },
          { term: "Anomaly detection", def: "AI feature identifying unexpected spikes or drops in time series.", speed: "Line chart only. Click marker = AI explanation.", tip: "Markers on line charts. Click for possible explanations.", practice: "Use on key metrics dashboards for proactive monitoring." },
          { term: "Reference lines", def: "Lines showing targets, averages, or percentiles overlaid on visuals.", speed: "Analytics pane. Constant, measure, or percentile.", tip: "Can be based on constant, measure, or percentile.", practice: "Add target lines so stakeholders see above/below target." },
        ]
      },
      {
        title: "Accessibility & Performance",
        emoji: "🔹",
        terms: [
          { term: "Accessibility features", def: "Alt text, tab order, colour contrast, keyboard navigation.", speed: "Alt text on all visuals. Tab order via Selection pane.", tip: "Exam tests: alt text, tab order, avoid colour-only encoding.", practice: "Add descriptive alt text to every visual." },
          { term: "Mobile layout", def: "Optimised view for phone-sized screens.", speed: "Separate portrait canvas. Manually add/arrange visuals.", tip: "Mobile layout is a separate canvas — visuals must be manually added.", practice: "Prioritise top 3-4 KPIs for mobile." },
          { term: "Automatic page refresh", def: "Auto-refreshes a report page at defined intervals.", speed: "DirectQuery or DirectLake only. Not for Import.", tip: "Not available for Import mode datasets.", practice: "Set sensible minimum refresh intervals." },
        ]
      },
    ]
  },
  {
    domain: "Manage & Secure Power BI",
    emoji: "🔐",
    weight: "15–20%",
    color: "red",
    sections: [
      {
        title: "Workspaces & Collaboration",
        emoji: "🔹",
        terms: [
          { term: "Workspace roles", def: "Admin, Member, Contributor, Viewer — each with different permissions.", speed: "Admin = full. Member = apps. Contributor = publish. Viewer = read.", tip: "Know each role's limits for the exam.", practice: "Grant Contributor to developers and Viewer to end users." },
          { term: "Apps", def: "Packaged collections of dashboards and reports for end users.", speed: "Published from workspace. Users see last published version.", tip: "Apps provide a curated, stable view of workspace content.", practice: "Use apps for end-user distribution." },
          { term: "Dashboards", def: "Single-page canvas in Service pinning tiles from multiple reports.", speed: "Service only. Pin tiles from reports or Q&A.", tip: "Dashboards are Service-only. Tiles from reports or Q&A.", practice: "Use for executive summaries — pin key KPI tiles." },
          { term: "Subscriptions", def: "Scheduled email snapshots of report pages.", speed: "Static image only. Recipients need Viewer access.", tip: "Subscriptions send static images, not interactive content.", practice: "Set up for daily/weekly KPI summaries." },
          { term: "Data alerts", def: "Notifications when a dashboard tile value crosses a threshold.", speed: "Dashboard tiles only (card, gauge, KPI).", tip: "Alerts only work on single-number tiles.", practice: "Set up on critical KPIs for proactive monitoring." },
        ]
      },
      {
        title: "Governance & Endorsement",
        emoji: "🔹",
        terms: [
          { term: "Certified content", def: "Content reviewed and approved by a designated certifier.", speed: "Highest trust. Requires designated certifier.", tip: "Certification requires a designated certifier. Promoted is self-service.", practice: "Certify only content that meets governance standards." },
          { term: "Promoted content", def: "Content marked by the owner as recommended.", speed: "Self-service. Anyone with write access.", tip: "No approval required — lower trust than certified.", practice: "Promote content as a signal it's ready for use." },
          { term: "Data lineage", def: "Visual map showing data flow from sources to reports.", speed: "Workspace → Lineage view. Impact analysis.", tip: "Shows what would break if a dataset changed.", practice: "Review lineage before changing shared datasets." },
        ]
      },
      {
        title: "Data Connectivity & Refresh",
        emoji: "🔹",
        terms: [
          { term: "On-premises data gateway", def: "Software enabling Power BI Service to access on-premises data.", speed: "Personal = 1 user. Standard = shared.", tip: "Personal gateway: one user. Standard: shared, supports DirectQuery.", practice: "Use standard (enterprise) gateway for teams." },
          { term: "Scheduled refresh", def: "Automated data refresh — up to 8x/day (Pro) or 48x/day (Premium).", speed: "Pro = 8x/day max. Premium = 48x/day.", tip: "Requires correct gateway and credentials.", practice: "Stagger refresh times to avoid overloading gateway." },
          { term: "Incremental refresh", def: "Refreshes only new/changed data — requires RangeStart/RangeEnd parameters.", speed: "Needs RangeStart + RangeEnd parameters (DateTime type).", tip: "Requires specific parameter naming and data type.", practice: "Use for tables with millions of rows." },
        ]
      },
      {
        title: "Security",
        emoji: "🔹",
        terms: [
          { term: "Row-level security (RLS)", def: "Restricts data rows based on user identity using DAX filters.", speed: "Define in Desktop. Assign users in Service.", tip: "RLS defined in Desktop, roles assigned in Service.", practice: "Use USERPRINCIPALNAME() for dynamic roles." },
          { term: "RLS roles", def: "Named security roles with DAX filter expressions.", speed: "Test with 'View as role' in Desktop.", tip: "Test with 'View as role' before publishing.", practice: "Create a single dynamic role using a security table." },
          { term: "Semantic model permissions", def: "Controls who can read, build on, or reshare a dataset.", speed: "Read. Build. Reshare. Separate from workspace roles.", tip: "Build permission allows creating new reports.", practice: "Grant Build permission to analysts who need to create reports." },
          { term: "Sensitivity labels", def: "Microsoft Purview labels applied to classify and protect data.", speed: "Purview labels. Propagate from dataset to reports + exports.", tip: "Labels propagate from dataset to reports and exports.", practice: "Apply labels to datasets before publishing." },
        ]
      },
    ]
  },
];

const colorMap: Record<string, { header: string; section: string; dot: string; tip: string; practice: string; speed: string; link: string }> = {
  blue: { header: "bg-blue-600", section: "border-blue-200 bg-blue-50", dot: "bg-blue-500", tip: "bg-blue-50 border-blue-200 text-blue-800", practice: "bg-primary/5 border-primary/20 text-primary", speed: "bg-amber-50 border-amber-200 text-amber-800", link: "text-blue-600 hover:text-blue-800" },
  purple: { header: "bg-violet-600", section: "border-violet-200 bg-violet-50", dot: "bg-violet-500", tip: "bg-violet-50 border-violet-200 text-violet-800", practice: "bg-violet-50 border-violet-200 text-violet-800", speed: "bg-amber-50 border-amber-200 text-amber-800", link: "text-violet-600 hover:text-violet-800" },
  green: { header: "bg-emerald-600", section: "border-emerald-200 bg-emerald-50", dot: "bg-emerald-500", tip: "bg-emerald-50 border-emerald-200 text-emerald-800", practice: "bg-teal-50 border-teal-200 text-teal-800", speed: "bg-amber-50 border-amber-200 text-amber-800", link: "text-emerald-600 hover:text-emerald-800" },
  red: { header: "bg-rose-600", section: "border-rose-200 bg-rose-50", dot: "bg-rose-500", tip: "bg-rose-50 border-rose-200 text-rose-800", practice: "bg-pink-50 border-pink-200 text-pink-800", speed: "bg-amber-50 border-amber-200 text-amber-800", link: "text-rose-600 hover:text-rose-800" },
};

function TermCard({ term, def, speed, tip, practice, colors }: TermData & { colors: typeof colorMap["blue"] }) {
  const [expanded, setExpanded] = useState(false);
  const searchUrl = msLearnUrl(term);

  return (
    <div className={cn("rounded-xl border transition-all duration-200", colors.section, expanded && "shadow-sm")}>
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-bold text-foreground leading-snug">{term}</p>
          <div className="flex items-center gap-1.5">
            <FavoriteButton itemType="key_term" itemId={term} size="sm" />
            <ChevronRight className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-muted-foreground transition-transform", expanded && "rotate-90")} />
          </div>
        </div>
        {!expanded && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{def}</p>
        )}
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          <p className="text-xs text-foreground leading-relaxed">{def}</p>

          {speed && (
            <div className={cn("rounded-lg border p-2", colors.speed)}>
              <div className="flex items-start gap-1.5">
                <Zap className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="text-xs font-semibold mb-0.5">Exam Speed Notes</p>
                  <p className="text-xs leading-relaxed opacity-90">{speed}</p>
                </div>
              </div>
            </div>
          )}

          {tip && (
            <div className={cn("rounded-lg border p-2", colors.tip)}>
              <div className="flex items-start gap-1.5">
                <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="text-xs font-semibold mb-0.5">Exam Tip</p>
                  <p className="text-xs leading-relaxed opacity-90">{tip}</p>
                </div>
              </div>
            </div>
          )}

          {practice && (
            <div className={cn("rounded-lg border p-2", colors.practice)}>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="text-xs font-semibold mb-0.5">Best Practice</p>
                  <p className="text-xs leading-relaxed opacity-90">{practice}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-0.5 mt-1">
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn("inline-flex items-center gap-1 text-xs font-medium transition-colors", colors.link)}
            >
              <ExternalLink className="w-3 h-3" />
              Search Microsoft Learn (AI)
            </a>
            <span className="text-[10px] text-muted-foreground italic ml-4">
              Sign in to Microsoft Learn for AI-powered search with more accurate, topic-specific results
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KeyTerms() {
  const [search, setSearch] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allSectionKeys = keyTermsData.flatMap((d) =>
    d.sections.map((s) => `${d.domain}-${s.title}`)
  );

  const expandAll = () => setCollapsedSections({});
  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    allSectionKeys.forEach((k) => { all[k] = true; });
    setCollapsedSections(all);
  };

  const filtered = search.trim().toLowerCase();

  const filteredData = keyTermsData
    .map((domain) => ({
      ...domain,
      sections: domain.sections
        .map((section) => ({
          ...section,
          terms: section.terms.filter(
            (t) =>
              !filtered ||
              t.term.toLowerCase().includes(filtered) ||
              t.def.toLowerCase().includes(filtered) ||
              (t.speed && t.speed.toLowerCase().includes(filtered)) ||
              (t.tip && t.tip.toLowerCase().includes(filtered)) ||
              (t.practice && t.practice.toLowerCase().includes(filtered))
          ),
        }))
        .filter((s) => s.terms.length > 0),
    }))
    .filter((d) => d.sections.length > 0);

  const totalTerms = keyTermsData.reduce(
    (acc, d) => acc + d.sections.reduce((a, s) => a + s.terms.length, 0),
    0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <BadgeGrantOnVisit badgeKey="key_terms" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">📊 PL-300 Key Terms & Features</h1>
          <p className="text-muted-foreground mt-1">
            {totalTerms} terms — click to expand speed notes, exam tips, best practices & AI search links
          </p>
        </div>
        <SyllabusSyncButton
          sectionLabel="Key Terms & Features"
          sectionKey="key-terms"
          itemType="key_term"
          mode="key-terms"
          progressItemTypes={["key_term"]}
          corpus={keyTermsData.flatMap(d => d.sections.flatMap(s => s.terms.map(t => t.term)))}
          itemCount={totalTerms}
        />
      </div>

      <ContentUpdateBanner sectionKey="key-terms" />

      <div className="flex gap-3 items-center">
        <button
          onClick={collapseAll}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground bg-card border border-border rounded-lg hover:bg-secondary transition-colors whitespace-nowrap"
        >
          <ChevronsUpDown className="w-3.5 h-3.5" /> Collapse All
        </button>
        <button
          onClick={expandAll}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground bg-card border border-border rounded-lg hover:bg-secondary transition-colors whitespace-nowrap"
        >
          <ChevronsUpDown className="w-3.5 h-3.5" /> Expand All
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search terms, definitions, speed notes, tips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground"
        />
      </div>

      {filteredData.map((domain) => {
        const colors = colorMap[domain.color];
        return (
          <div key={domain.domain} className="rounded-2xl overflow-hidden border border-border shadow-sm">
            <div className={cn("px-6 py-4 text-card", colors.header)}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {domain.emoji} {domain.domain}
                  </h2>
                  <p className="text-sm opacity-80 mt-0.5">Exam weight: {domain.weight}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-card/20 font-medium">
                  {domain.sections.reduce((a, s) => a + s.terms.length, 0)} terms
                </span>
              </div>
            </div>

            <div className="divide-y divide-border bg-card">
              {domain.sections.map((section) => {
                const sectionKey = `${domain.domain}-${section.title}`;
                const isCollapsed = collapsedSections[sectionKey];
                return (
                  <div key={section.title}>
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className="w-full px-5 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                    >
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <span className={cn("w-2 h-2 rounded-full flex-shrink-0", colors.dot)} />
                        {section.title}
                        <span className="text-xs font-normal text-muted-foreground">({section.terms.length})</span>
                      </h3>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform",
                          isCollapsed && "-rotate-90"
                        )}
                      />
                    </button>
                    {!isCollapsed && (
                      <div className="px-5 pb-5">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {section.terms.map(({ term, def, speed, tip, practice }) => (
                            <TermCard
                              key={term}
                              term={term}
                              def={def}
                              speed={speed}
                              tip={tip}
                              practice={practice}
                              colors={colors}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {filteredData.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No terms found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
