// Content for "Model the data" domain topics - Design and implement a data model section

export const modelDataContent = {
  "Configure table and column properties": {
    overview: {
      title: "Optimizing Model Metadata and Behavior",
      concepts: [
        "Table and column properties control how data appears and behaves in reports",
        "Default summarization affects how measures aggregate in visuals",
        "Data categories enable map visualizations and specialized formatting",
        "Hidden columns reduce clutter while maintaining model functionality",
        "Sort by column allows proper ordering of text values (months, days)"
      ]
    },
    bestPractices: [
      "Set appropriate default summarization (None for IDs, Sum for amounts)",
      "Hide technical columns (keys, foreign keys) from report view",
      "Configure Data Category for geographic columns (City, Country, Postal Code)",
      "Use Sort By Column for text that should order differently (month names by month number)",
      "Set meaningful Display Folders to organize columns in logical groups",
      "Mark date tables to enable time intelligence functions"
    ],
    commonMistakes: [
      "Not setting summarization to None for ID columns (causes incorrect sums)",
      "Leaving foreign key columns visible confusing report authors",
      "Not using Sort By Column for months (sorts alphabetically: April, August...)",
      "Not marking date tables, breaking time intelligence",
      "Not setting data categories for geographic data (maps won't work)",
      "Poor naming conventions making columns hard to find"
    ],
    keySteps: [
      "Select table/column in Model view",
      "In Properties pane, configure: Name, Description, Data type",
      "Set Summarize By: None (IDs), Sum (amounts), Don't Summarize (text)",
      "Set Data Category: Address, City, State, Country, Postal Code, etc.",
      "For month names: Create month number column, set Sort By Column",
      "Hide technical columns: Is Hidden = Yes",
      "Mark date table: Table properties > Mark as date table"
    ],
    keyDecisions: [
      "**Summarize or not?** - Measures/amounts: Yes; IDs/text: No",
      "**Hide or show column?** - Technical/keys: Hide; User-facing: Show",
      "**Data category needed?** - Geographic data: Yes; Other: Optional",
      "**Sort by column needed?** - Text with logical order (months): Yes; Standard: No",
      "**Display folder needed?** - Many columns: Yes for organization; Few: Optional"
    ],
    keyDefinitions: [
      "**Default Summarization**: How column aggregates when added to visual (Sum, Average, None)",
      "**Data Category**: Metadata indicating column contains geographic or web data",
      "**Sort By Column**: Makes one column sort by values in another column",
      "**Is Hidden**: Hides column from report view while keeping in model",
      "**Display Folder**: Logical grouping for columns in field list",
      "**Mark as Date Table**: Designates table as calendar for time intelligence"
    ],
    risks: [
      "**Incorrect aggregations**: Wrong summarization causes misleading totals",
      "**Map visualization failures**: Missing data categories prevent maps from working",
      "**Sorting confusion**: Months/days sort alphabetically without Sort By Column",
      "**Time intelligence breaks**: Unmarked date table disables time functions",
      "**User confusion**: Poor organization makes model hard to use",
      "**Hidden dependencies**: Hiding columns used in relationships causes issues"
    ],
    faqs: [
      {
        q: "How do I stop IDs from summing in visuals?",
        a: "Select ID column > Properties > Summarize By > None. This prevents meaningless sum aggregations."
      },
      {
        q: "Why do my months sort incorrectly (April, August, December...)?",
        a: "Text sorts alphabetically. Create MonthNumber column (1-12), then set Month column Sort By Column to MonthNumber."
      },
      {
        q: "How do I enable map visualizations?",
        a: "Set Data Category on geographic columns: City > City, State > State/Province, Country > Country/Region."
      },
      {
        q: "What does 'Mark as date table' do?",
        a: "Enables time intelligence functions and optimizes date-based calculations. Required for proper date filtering."
      },
      {
        q: "Should I hide foreign key columns?",
        a: "Yes - they're technical columns for relationships. Hide them to keep report view clean."
      }
    ],
    examTips: [
      "Know to set Summarize By to None for ID columns",
      "Remember Sort By Column fixes month/day sorting issues",
      "Understand Data Category enables map visualizations",
      "Know that marking date table enables time intelligence",
      "Recognize hidden columns still work in relationships and calculations"
    ],
    resources: [
      {
        title: "Set table and column properties",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-data-categorization",
        type: "Documentation"
      },
      {
        title: "Sort by column in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-sort-by-column",
        type: "Documentation"
      }
    ]
  },

  "Implement role-playing dimensions": {
    overview: {
      title: "Managing Multiple Date Relationships",
      concepts: [
        "Role-playing dimensions serve multiple purposes in the same model",
        "Most common: Date dimension playing roles like Order Date, Ship Date, Due Date",
        "Only one active relationship allowed between two tables",
        "Inactive relationships used via USERELATIONSHIP in DAX",
        "Eliminates need for duplicate dimension tables"
      ]
    },
    bestPractices: [
      "Create single date dimension table, relate to fact table multiple times",
      "Make most frequently used relationship active (usually transaction/order date)",
      "Mark inactive relationships clearly in diagram",
      "Create measures for each date role using USERELATIONSHIP",
      "Name measures clearly to indicate which date role (Sales by Ship Date)",
      "Document which relationships are active vs inactive"
    ],
    commonMistakes: [
      "Creating duplicate date tables for each date role (wastes memory)",
      "Not using USERELATIONSHIP to activate inactive relationships in measures",
      "Making wrong relationship active (less common date role)",
      "Forgetting which relationship is active causing confusion",
      "Not naming measures to indicate date role",
      "Creating bidirectional relationships instead of using USERELATIONSHIP"
    ],
    keySteps: [
      "Create one date dimension table",
      "Create multiple relationships between date table and fact table (one per date column)",
      "First relationship is active by default, others are inactive (dashed line)",
      "To use inactive relationship: Create measure with USERELATIONSHIP function",
      "Example: Sales by Ship Date = CALCULATE([Total Sales], USERELATIONSHIP(Date[Date], Sales[ShipDate]))",
      "Test measures to verify correct date relationships are being used"
    ],
    keyDecisions: [
      "**Which date role most common?** - Make that relationship active, others inactive",
      "**One date table or multiple?** - Always one table with role-playing (better performance)",
      "**How many date roles needed?** - Analyze fact table for all date columns",
      "**Create separate measures or use field parameters?** - Few roles: separate; Many: consider parameters",
      "**Name measures explicitly or use calculation groups?** - Simple: explicit names; Complex: calculation groups"
    ],
    keyDefinitions: [
      "**Role-Playing Dimension**: Single dimension table serving multiple purposes in model",
      "**Active Relationship**: Default relationship used without DAX specification (solid line)",
      "**Inactive Relationship**: Relationship used only when explicitly activated in DAX (dashed line)",
      "**USERELATIONSHIP**: DAX function that activates an inactive relationship for a calculation",
      "**Date Role**: Specific purpose a date serves (Order Date, Ship Date, Due Date, etc.)",
      "**Relationship Cardinality**: One-to-Many between date dimension and fact table dates"
    ],
    risks: [
      "**Wrong active relationship**: If most common date isn't active, many measures need USERELATIONSHIP",
      "**Forgotten inactive relationships**: Forgetting to use USERELATIONSHIP gives wrong results",
      "**Ambiguous measures**: Not naming measures clearly causes confusion about which date is used",
      "**Performance impact**: USERELATIONSHIP has slight performance cost vs active relationship",
      "**Complexity**: Many date roles can make model complex to understand",
      "**Testing gaps**: Not testing all date roles can hide errors"
    ],
    faqs: [
      {
        q: "How many relationships can I have between two tables?",
        a: "Multiple relationships allowed, but only one can be active. Others must be activated using USERELATIONSHIP."
      },
      {
        q: "How do I create a measure using Ship Date instead of Order Date?",
        a: "Use USERELATIONSHIP: CALCULATE([Total Sales], USERELATIONSHIP(Date[Date], Sales[ShipDate]))"
      },
      {
        q: "Should I create separate date tables for each date role?",
        a: "No - use one date table with multiple relationships. More efficient and easier to maintain."
      },
      {
        q: "Which relationship should be active?",
        a: "Make your most frequently used date relationship active (usually transaction/order date)."
      },
      {
        q: "Can I have both date roles active simultaneously?",
        a: "No - only one relationship between two tables can be active. Use USERELATIONSHIP for others in measures."
      }
    ],
    examTips: [
      "Know role-playing dimensions eliminate need for duplicate dimension tables",
      "Understand only one relationship can be active between two tables",
      "Remember USERELATIONSHIP activates inactive relationships in DAX",
      "Know that active relationships are solid lines, inactive are dashed",
      "Recognize most common example is Date dimension with multiple date roles"
    ],
    resources: [
      {
        title: "Create and manage relationships",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-create-and-manage-relationships",
        type: "Documentation"
      },
      {
        title: "USERELATIONSHIP function",
        url: "https://learn.microsoft.com/dax/userelationship-function-dax",
        type: "Documentation"
      }
    ]
  },

  "Define a relationship's cardinality and cross-filter direction": {
    overview: {
      title: "Configuring Relationship Behavior",
      concepts: [
        "Cardinality defines how many matching rows exist on each side of relationship",
        "One-to-Many (1:*) most common: unique dimension to many fact rows",
        "Many-to-Many (*:*) allows multiple matches both sides (use sparingly)",
        "Cross-filter direction controls how filters propagate through relationships",
        "Single direction filters from one side only; Both filters from both sides"
      ]
    },
    bestPractices: [
      "Use One-to-Many for standard dimension-to-fact relationships",
      "Filter direction: Single from dimension (one-side) to fact (many-side)",
      "Avoid Both direction unless specifically needed (role-playing tables, bridge tables)",
      "Ensure one-side of relationship has unique values",
      "Test filter behavior to verify correct cross-filter direction",
      "Document any Both direction relationships and why they're needed"
    ],
    commonMistakes: [
      "Using Both direction unnecessarily (causes performance and ambiguity issues)",
      "Creating Many-to-Many when One-to-Many would work with proper modeling",
      "Not ensuring uniqueness on one-side of relationship",
      "Reversing filter direction (fact filtering dimension instead of dimension filtering fact)",
      "Using Both to solve problems better fixed with proper star schema",
      "Not understanding filter propagation in reports"
    ],
    keySteps: [
      "In Model view, double-click relationship line or right-click > Properties",
      "Set Cardinality: One-to-Many (most common), Many-to-One, or Many-to-Many",
      "Set Cross filter direction: Single (default, recommended) or Both",
      "Verify one-side table has unique values in key column",
      "Test: Apply slicer on dimension, verify fact table filters correctly",
      "Check for ambiguous relationships warning if using Both direction"
    ],
    keyDecisions: [
      "**Cardinality type?** - Dimension to fact: One-to-Many; Bridge table: Many-to-Many",
      "**Filter direction?** - Standard: Single; Role-playing or special: Both",
      "**Which side is one?** - Dimension (unique keys) is one-side, Fact (duplicates) is many-side",
      "**Both direction needed?** - Rarely - only for specific scenarios, not as default",
      "**Many-to-Many or fix model?** - Last resort: M:M; Better: create bridge table or improve design"
    ],
    keyDefinitions: [
      "**Cardinality**: Describes matching row quantities on each side of relationship",
      "**One-to-Many (1:*)**: One unique row on one side relates to many rows on other side",
      "**Many-to-Many (*:*)**: Multiple matching rows possible on both sides",
      "**Cross-filter Direction**: Controls how filters flow through relationships",
      "**Single Direction**: Filters flow one way only (dimension filters fact)",
      "**Both Direction**: Filters flow both ways (bidirectional relationship)"
    ],
    risks: [
      "**Ambiguous paths**: Both direction can create multiple filter paths causing errors",
      "**Performance degradation**: Both direction slower than single direction",
      "**Incorrect results**: Wrong cardinality gives wrong calculations",
      "**Circular dependencies**: Both direction can create filter loops",
      "**Complexity**: Many-to-Many relationships harder to understand and troubleshoot",
      "**Unexpected filtering**: Both direction can cause unintuitive filter behavior"
    ],
    faqs: [
      {
        q: "When should I use Both direction?",
        a: "Only when necessary: role-playing dimensions, bridge tables, or specific filtering requirements. Single direction is default and preferred."
      },
      {
        q: "What's the difference between One-to-Many and Many-to-One?",
        a: "Just the direction. One-to-Many means one-side is on left table. Many-to-One means one-side is on right table."
      },
      {
        q: "How do I know which cardinality to use?",
        a: "Check key uniqueness. Dimension (unique keys) = one-side. Fact (duplicate keys) = many-side. Usually One-to-Many."
      },
      {
        q: "Can I have multiple Many-to-Many relationships?",
        a: "Technically yes, but avoid if possible. Can cause ambiguity and performance issues."
      },
      {
        q: "Why am I getting 'ambiguous relationship' errors?",
        a: "Multiple filter paths exist (often from Both direction). Remove Both or create single clear path."
      }
    ],
    examTips: [
      "Know One-to-Many is standard for dimension-to-fact relationships",
      "Remember Single direction is default and recommended",
      "Understand Both direction is for special cases only",
      "Know that one-side must have unique values",
      "Recognize Many-to-Many is for bridge tables and complex scenarios"
    ],
    resources: [
      {
        title: "Relationship cardinality",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-create-and-manage-relationships#cardinality",
        type: "Documentation"
      },
      {
        title: "Bidirectional cross-filtering",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-bidirectional-filtering",
        type: "Documentation"
      }
    ]
  },

  "Create a common date table": {
    overview: {
      title: "Building Essential Date Dimension",
      concepts: [
        "Date table is required for time intelligence functions (YTD, Prior Year, etc.)",
        "Must contain continuous date column with no gaps",
        "Include calculated columns: Year, Quarter, Month, Day, Week, etc.",
        "Must be marked as date table in Power BI",
        "Typically spans all dates in fact tables plus future dates"
      ]
    },
    bestPractices: [
      "Create date table using CALENDAR or CALENDARAUTO DAX function",
      "Include columns: Year, Quarter, Month Number, Month Name, Day, Weekday",
      "Add fiscal year columns if business uses fiscal calendar",
      "Include helper columns: IsCurrentMonth, IsLastYear, WorkingDay flag",
      "Span complete years (Jan 1 to Dec 31) even if data doesn't",
      "Mark as date table and specify date column"
    ],
    commonMistakes: [
      "Not marking table as date table (time intelligence won't work)",
      "Gaps in date sequence breaking time intelligence",
      "Not including enough date range (missing historical or future dates)",
      "Using Power Query instead of DAX (DAX date tables perform better)",
      "Not adding fiscal year columns when business needs them",
      "Forgetting Sort By Column for month names"
    ],
    keySteps: [
      "Create new table using DAX: Date = CALENDAR(DATE(2020,1,1), DATE(2030,12,31))",
      "Or use: Date = CALENDARAUTO() to span fact table dates automatically",
      "Add columns: Year = YEAR(Date[Date]), Quarter = QUARTER(Date[Date])",
      "Add: MonthName = FORMAT(Date[Date], \"MMMM\"), MonthNum = MONTH(Date[Date])",
      "Set MonthName Sort By Column to MonthNum",
      "Mark as date table: Table properties > Mark as date table, select date column",
      "Create relationships to fact table date columns"
    ],
    keyDecisions: [
      "**CALENDAR or CALENDARAUTO?** - Fixed range: CALENDAR; Dynamic: CALENDARAUTO",
      "**Date range?** - Include historical data and future dates needed for forecasting",
      "**Fiscal or calendar year?** - Add fiscal columns if business uses fiscal calendar",
      "**Which helper columns?** - Add based on reporting needs (IsCurrentMonth, IsWorkingDay)",
      "**Create in DAX or Power Query?** - DAX preferred for better performance"
    ],
    keyDefinitions: [
      "**Date Table**: Dimension table containing continuous sequence of dates with attributes",
      "**CALENDAR**: DAX function creating date table with specified start and end dates",
      "**CALENDARAUTO**: DAX function creating date table spanning dates in fact tables",
      "**Mark as Date Table**: Setting that enables time intelligence functions",
      "**Time Intelligence**: DAX functions for period-based calculations (YTD, Prior Year, etc.)",
      "**Fiscal Year**: Financial year that may not match calendar year (e.g., July-June)"
    ],
    risks: [
      "**Time intelligence failure**: Unmarked date table breaks all time functions",
      "**Incomplete date range**: Missing dates cause gaps in time series",
      "**Performance issues**: Power Query date tables slower than DAX",
      "**Relationship problems**: Multiple date tables can create ambiguous relationships",
      "**Maintenance burden**: Hardcoded date ranges need updating periodically",
      "**Wrong calendar**: Using calendar year when fiscal year needed"
    ],
    faqs: [
      {
        q: "How do I create a date table?",
        a: "Use DAX: Date = CALENDAR(DATE(2020,1,1), DATE(2030,12,31)). Then add Year, Quarter, Month columns and mark as date table."
      },
      {
        q: "What's the difference between CALENDAR and CALENDARAUTO?",
        a: "CALENDAR uses specified dates. CALENDARAUTO automatically spans dates in your fact tables."
      },
      {
        q: "Why mark as date table?",
        a: "Required for time intelligence functions like TOTALYTD, SAMEPERIODLASTYEAR, etc. to work correctly."
      },
      {
        q: "Should I create date table in Power Query or DAX?",
        a: "DAX preferred - better performance and easier to maintain. Use CALENDAR or CALENDARAUTO."
      },
      {
        q: "How do I add fiscal year columns?",
        a: "If fiscal year starts July: FiscalYear = IF(MONTH(Date[Date]) >= 7, YEAR(Date[Date]) + 1, YEAR(Date[Date]))"
      }
    ],
    examTips: [
      "Know date table is required for time intelligence functions",
      "Remember to mark table as date table in properties",
      "Understand CALENDAR vs CALENDARAUTO difference",
      "Know date table must have continuous dates with no gaps",
      "Recognize common columns: Year, Quarter, Month, MonthName, Day"
    ],
    resources: [
      {
        title: "Create date tables in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/guidance/model-date-tables",
        type: "Documentation"
      },
      {
        title: "CALENDAR function",
        url: "https://learn.microsoft.com/dax/calendar-function-dax",
        type: "Documentation"
      }
    ]
  },

  "Identify use cases for calculated columns and calculated tables": {
    overview: {
      title: "When to Use Calculated Columns vs Tables",
      concepts: [
        "Calculated columns add static columns to tables evaluated row-by-row",
        "Calculated tables create entirely new tables using DAX",
        "Calculated columns stored in model and consume memory",
        "Use calculated columns for row-context calculations (categorization, concatenation)",
        "Use calculated tables for reference data, parameter tables, or restructured data"
      ]
    },
    bestPractices: [
      "Use Power Query for data shaping instead of calculated columns when possible",
      "Use measures instead of calculated columns for aggregations",
      "Use calculated columns for categories, flags, or row-level logic",
      "Use calculated tables for date tables, parameter tables, or small reference data",
      "Minimize calculated columns to reduce model size and refresh time",
      "Document calculated column/table logic clearly"
    ],
    commonMistakes: [
      "Creating calculated columns for aggregations (use measures instead)",
      "Using calculated columns when Power Query would work (wastes memory)",
      "Creating large calculated tables (impacts refresh performance)",
      "Not understanding calculated columns use row context not filter context",
      "Forgetting calculated columns are static (don't respond to filters like measures)",
      "Creating calculated tables that duplicate existing data"
    ],
    keySteps: [
      "**Calculated Column**: Select table > New Column > Enter DAX formula",
      "Example: Category = IF([Sales] > 1000, \"High\", \"Low\")",
      "**Calculated Table**: Modeling tab > New Table > Enter DAX formula",
      "Example: Date = CALENDAR(DATE(2020,1,1), DATE(2030,12,31))",
      "Test calculations with various data scenarios",
      "Monitor model size and refresh time impact"
    ],
    keyDecisions: [
      "**Power Query, Calculated Column, or Measure?** - Data prep: PQ; Row logic: Column; Aggregation: Measure",
      "**Calculated column needed?** - Row-by-row logic: Yes; Aggregation: No (use measure)",
      "**Calculated table needed?** - Small reference data: Yes; Large data: No (use Power Query)",
      "**Static or dynamic?** - Static row value: Column; Dynamic by filter: Measure",
      "**Memory impact acceptable?** - Small tables: Yes; Large: Minimize calculated columns"
    ],
    keyDefinitions: [
      "**Calculated Column**: DAX column added to existing table, evaluated row-by-row",
      "**Calculated Table**: Entirely new table created using DAX expression",
      "**Row Context**: Evaluation context for calculated columns (one row at a time)",
      "**Filter Context**: Evaluation context for measures (filtered by visuals/slicers)",
      "**Static Calculation**: Value computed once and stored (calculated columns)",
      "**Dynamic Calculation**: Value computed at query time based on filters (measures)"
    ],
    risks: [
      "**Memory bloat**: Many calculated columns significantly increase model size",
      "**Refresh performance**: Calculated columns recalculate during refresh, slowing it down",
      "**Wrong context**: Using aggregations in calculated columns gives row-level totals, not filtered totals",
      "**Maintenance burden**: Complex calculated columns hard to debug and update",
      "**Flexibility loss**: Calculated columns are static, can't respond to user interactions",
      "**Duplication**: Calculated tables duplicating source data waste storage"
    ],
    faqs: [
      {
        q: "When should I use a calculated column vs a measure?",
        a: "Calculated column for row-level logic (categories, flags). Measure for aggregations that change with filters (sums, averages)."
      },
      {
        q: "Should I create calculated columns in Power Query or DAX?",
        a: "Power Query preferred when possible - better performance and doesn't bloat model as much."
      },
      {
        q: "When should I create a calculated table?",
        a: "For date tables, parameter tables, small reference data, or restructuring existing data. Not for duplicating large datasets."
      },
      {
        q: "Why is my calculated column showing the same value for all rows?",
        a: "Probably using aggregation function. Calculated columns work row-by-row, not across rows. Use measure instead."
      },
      {
        q: "Do calculated columns recalculate with slicers?",
        a: "No - they're static, computed once during refresh. Use measures for dynamic calculations that respond to filters."
      }
    ],
    examTips: [
      "Know calculated columns are for row-level logic, measures for aggregations",
      "Understand calculated columns use row context, stored in model",
      "Remember calculated tables create new tables using DAX",
      "Know Power Query preferred over calculated columns when possible",
      "Recognize calculated columns are static, don't respond to filters"
    ],
    resources: [
      {
        title: "Calculated columns in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-calculated-columns",
        type: "Documentation"
      },
      {
        title: "Calculated tables in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-calculated-tables",
        type: "Documentation"
      }
    ]
  },

  "Create single aggregation measures": {
    overview: {
      title: "Building Basic DAX Measures",
      concepts: [
        "Measures are dynamic calculations evaluated in filter context",
        "Basic aggregations: SUM, AVERAGE, COUNT, MIN, MAX, DISTINCTCOUNT",
        "Measures respond to slicers, filters, and visual interactions",
        "Measures don't store data - they calculate at query time",
        "Implicit measures (dragging fields) vs explicit measures (DAX formulas)"
      ]
    },
    bestPractices: [
      "Always create explicit measures rather than using implicit measures",
      "Use SUM not SUMX for simple column aggregation (better performance)",
      "Name measures clearly with spaces (Total Sales, not TotalSales)",
      "Format measures appropriately (currency, percentage, whole number)",
      "Organize measures in display folders for better discoverability",
      "Test measures with various filter combinations to verify correctness"
    ],
    commonMistakes: [
      "Using calculated columns instead of measures for aggregations",
      "Not formatting measures (showing raw decimal numbers)",
      "Creating implicit measures that can't be reused across visuals",
      "Using SUMX when SUM is sufficient (performance hit)",
      "Forgetting to handle BLANK values in calculations",
      "Not organizing measures with display folders or naming conventions"
    ],
    keySteps: [
      "In Model view or Report view, select table for measure",
      "Home tab > New Measure (or right-click table > New Measure)",
      "Enter formula: Total Sales = SUM(Sales[Amount])",
      "Press Enter to create measure",
      "Format measure: select format (Currency, Percentage, etc.)",
      "Set decimal places and thousands separator as needed",
      "Test in visual with different filters"
    ],
    keyDecisions: [
      "**Which aggregation function?** - Total: SUM; Average: AVERAGE; Count records: COUNT; Unique: DISTINCTCOUNT",
      "**Measure or calculated column?** - Aggregation: Measure; Row-level: Calculated column",
      "**Simple or iterator function?** - Single column sum: SUM; Row-by-row: SUMX",
      "**Format as what?** - Money: Currency; Ratio: Percentage; Count: Whole number",
      "**Which table to place measure?** - Related fact table or dedicated measures table"
    ],
    keyDefinitions: [
      "**Measure**: Dynamic DAX calculation evaluated in filter context at query time",
      "**SUM**: Adds all numbers in a column",
      "**AVERAGE**: Calculates arithmetic mean of column values",
      "**COUNT**: Counts non-blank values in a column",
      "**DISTINCTCOUNT**: Counts unique non-blank values",
      "**Filter Context**: Filters applied by visuals, slicers, and report interactions"
    ],
    risks: [
      "**Performance issues**: Using iterator functions when simple aggregation suffices",
      "**Incorrect totals**: Not understanding how measures aggregate across groups",
      "**BLANK handling**: Not accounting for BLANK values in calculations",
      "**Context confusion**: Measures behave differently than calculated columns",
      "**Reusability**: Implicit measures can't be reused or modified centrally",
      "**Maintenance**: Scattered implicit measures hard to update and standardize"
    ],
    faqs: [
      {
        q: "What's the difference between a measure and a calculated column?",
        a: "Measure: calculated at query time, responds to filters, aggregates data. Calculated column: calculated once during refresh, static, row-level value."
      },
      {
        q: "When should I use SUM vs SUMX?",
        a: "SUM for simple column totals. SUMX when you need row-by-row calculations before summing (e.g., Quantity * Price)."
      },
      {
        q: "How do I create a measure?",
        a: "Select table > New Measure > Enter formula like: Total Sales = SUM(Sales[Amount]) > Press Enter."
      },
      {
        q: "Why does my measure show wrong total?",
        a: "Likely using calculated column instead of measure, or incorrect aggregation function for your scenario."
      },
      {
        q: "Can I reference one measure in another measure?",
        a: "Yes! Measures can reference other measures. Example: Profit = [Total Revenue] - [Total Cost]"
      }
    ],
    examTips: [
      "Know basic aggregation functions: SUM, AVERAGE, COUNT, DISTINCTCOUNT, MIN, MAX",
      "Remember measures are dynamic and respond to filters",
      "Understand SUM for simple aggregation, SUMX for row-level calculation",
      "Know that measures calculate at query time, not stored",
      "Recognize proper measure naming and formatting conventions"
    ],
    resources: [
      {
        title: "Create measures in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-measures",
        type: "Documentation"
      },
      {
        title: "DAX basics in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-quickstart-learn-dax-basics",
        type: "Documentation"
      }
    ]
  },

  "Use the CALCULATE function": {
    overview: {
      title: "Modifying Filter Context with CALCULATE",
      concepts: [
        "CALCULATE is the most important DAX function for measure creation",
        "CALCULATE modifies filter context before evaluating an expression",
        "Can add filters, remove filters, or replace filter context",
        "Essential for creating comparative measures (YoY, Prior Period, etc.)",
        "Enables advanced scenarios like filtered totals and conditional aggregations"
      ]
    },
    bestPractices: [
      "Use CALCULATE to apply specific filters to measures",
      "Combine with FILTER for complex row-level conditions",
      "Use REMOVEFILTERS or ALL to clear unwanted filters",
      "Layer filters logically - most restrictive first",
      "Test measures with various slicer combinations",
      "Document complex CALCULATE logic with comments"
    ],
    commonMistakes: [
      "Not understanding filter context modification",
      "Using FILTER when simple filter arguments work (performance hit)",
      "Forgetting that CALCULATE overwrites existing filters on same column",
      "Not using REMOVEFILTERS when all filters need clearing",
      "Creating circular dependencies with CALCULATE",
      "Over-complicating formulas when simpler approaches exist"
    ],
    keySteps: [
      "Basic syntax: CALCULATE(<expression>, <filter1>, <filter2>, ...)",
      "Example: Total Red Sales = CALCULATE(SUM(Sales[Amount]), Products[Color] = \"Red\")",
      "Multiple filters: CALCULATE([Total Sales], Products[Category] = \"Bikes\", Dates[Year] = 2024)",
      "Remove filters: CALCULATE([Total Sales], REMOVEFILTERS(Products[Color]))",
      "Replace all filters: CALCULATE([Total Sales], ALL(Products))",
      "Test with slicers to verify filter modification works correctly"
    ],
    keyDecisions: [
      "**Add, replace, or remove filters?** - Add: filter argument; Replace: ALL; Remove: REMOVEFILTERS",
      "**Simple or complex filter?** - Simple equality: filter argument; Complex logic: FILTER function",
      "**Which filters to modify?** - Analyze what context changes are needed for calculation",
      "**REMOVEFILTERS or ALL?** - Clear filters keep relationships: REMOVEFILTERS; Clear everything: ALL",
      "**Combine with other functions?** - Time intelligence: CALCULATE + date functions; Advanced: CALCULATE + FILTER"
    ],
    keyDefinitions: [
      "**CALCULATE**: Evaluates expression in modified filter context",
      "**Filter Context**: Current set of filters from slicers, visuals, and row/column context",
      "**Filter Argument**: Condition that modifies filter context (e.g., Products[Color] = \"Red\")",
      "**FILTER**: Returns filtered table for use in CALCULATE",
      "**REMOVEFILTERS/ALL**: Removes filters from specified columns or tables",
      "**Context Transition**: Automatic row-to-filter context conversion in CALCULATE"
    ],
    risks: [
      "**Unexpected results**: Not understanding filter context modification",
      "**Performance degradation**: Overusing FILTER function unnecessarily",
      "**Context confusion**: Mixing row context and filter context incorrectly",
      "**Circular references**: Measures referencing each other with CALCULATE",
      "**Over-filtering**: Too many filters making measures too specific/inflexible",
      "**Filter conflicts**: Conflicting filters producing empty results"
    ],
    faqs: [
      {
        q: "What does CALCULATE do?",
        a: "CALCULATE modifies filter context before evaluating an expression. It can add, remove, or replace filters."
      },
      {
        q: "How do I create a measure for only Red products?",
        a: "Red Sales = CALCULATE(SUM(Sales[Amount]), Products[Color] = \"Red\")"
      },
      {
        q: "What's the difference between ALL and REMOVEFILTERS?",
        a: "REMOVEFILTERS clears filters but keeps relationships. ALL removes filters and relationships. Use REMOVEFILTERS generally."
      },
      {
        q: "Can I use multiple filters in CALCULATE?",
        a: "Yes, separate with commas: CALCULATE([Total Sales], Products[Color] = \"Red\", Dates[Year] = 2024)"
      },
      {
        q: "When should I use FILTER function vs simple filter?",
        a: "Simple equality: use filter argument. Complex conditions or multiple columns: use FILTER function."
      }
    ],
    examTips: [
      "Know CALCULATE is used to modify filter context",
      "Remember simple filter syntax: Table[Column] = \"Value\"",
      "Understand REMOVEFILTERS clears filters from specified columns",
      "Know ALL removes all filters from table or columns",
      "Recognize CALCULATE is essential for comparative measures"
    ],
    resources: [
      {
        title: "CALCULATE function",
        url: "https://learn.microsoft.com/dax/calculate-function-dax",
        type: "Documentation"
      },
      {
        title: "Filter context in DAX",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-qanda-learn-dax",
        type: "Documentation"
      }
    ]
  },

  "Implement time intelligence measures": {
    overview: {
      title: "Date-Based Calculations in DAX",
      concepts: [
        "Time intelligence functions enable period-based calculations (YTD, QTD, Prior Year)",
        "Requires properly marked date table with continuous dates",
        "Common functions: TOTALYTD, DATESYTD, SAMEPERIODLASTYEAR, DATEADD",
        "Enable comparisons: current vs prior period, year-over-year growth",
        "Fiscal year support through date table configuration"
      ]
    },
    bestPractices: [
      "Always create and mark a proper date table first",
      "Use TOTALYTD, TOTALQTD for year/quarter-to-date calculations",
      "Use SAMEPERIODLASTYEAR for prior year comparisons",
      "Use DATEADD for flexible period shifts (days, months, quarters, years)",
      "Create growth/change measures alongside time calculations",
      "Test time intelligence with different date selections"
    ],
    commonMistakes: [
      "Not marking date table causing time intelligence to fail",
      "Using CALCULATE instead of built-in time functions (more complex)",
      "Not handling fiscal years when business uses them",
      "Forgetting that time intelligence needs proper date relationships",
      "Creating overly complex formulas when simple functions exist",
      "Not testing edge cases (year boundaries, fiscal year changes)"
    ],
    keySteps: [
      "Ensure date table is marked as date table",
      "YTD: Sales YTD = TOTALYTD(SUM(Sales[Amount]), 'Date'[Date])",
      "Prior Year: Sales PY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))",
      "Prior Month: Sales PM = CALCULATE([Total Sales], DATEADD('Date'[Date], -1, MONTH))",
      "YoY Growth: YoY % = DIVIDE([Total Sales] - [Sales PY], [Sales PY])",
      "Test with date slicers at different granularities"
    ],
    keyDecisions: [
      "**Which time intelligence needed?** - Cumulative: YTD/QTD; Comparison: Prior period; Shift: DATEADD",
      "**Year-to-date or specific period?** - Running total: YTD; Fixed comparison: Prior Year",
      "**Calendar or fiscal year?** - Fiscal: use year-end date parameter in YTD functions",
      "**Built-in or CALCULATE?** - Standard periods: built-in functions; Custom: CALCULATE with date logic",
      "**Show growth or just values?** - Both: create growth measure referencing base measures"
    ],
    keyDefinitions: [
      "**Time Intelligence**: DAX functions for period-based date calculations",
      "**TOTALYTD**: Calculates year-to-date total from start of year to current date",
      "**SAMEPERIODLASTYEAR**: Returns same period in prior year for comparison",
      "**DATEADD**: Shifts dates by specified number of periods (days, months, quarters, years)",
      "**DATESYTD**: Returns dates from year-to-date for custom calculations",
      "**Fiscal Year**: Business year that doesn't match calendar year (e.g., July-June)"
    ],
    risks: [
      "**Date table issues**: Unmarked or incomplete date table breaks all time intelligence",
      "**Relationship problems**: Multiple or inactive date relationships cause errors",
      "**Fiscal year confusion**: Using calendar YTD when fiscal year needed",
      "**Context conflicts**: Time intelligence with wrong filter context gives incorrect results",
      "**Performance**: Complex time calculations on large datasets can be slow",
      "**Edge cases**: Year/quarter boundaries may produce unexpected results"
    ],
    faqs: [
      {
        q: "How do I create a year-to-date measure?",
        a: "Sales YTD = TOTALYTD(SUM(Sales[Amount]), 'Date'[Date]). Requires marked date table."
      },
      {
        q: "Why isn't my time intelligence working?",
        a: "Most likely: date table not marked as date table, or no relationship between date table and fact table."
      },
      {
        q: "How do I calculate prior year sales?",
        a: "Sales PY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))"
      },
      {
        q: "How do I handle fiscal year in YTD?",
        a: "Add year-end date parameter: TOTALYTD([Total Sales], 'Date'[Date], \"6/30\") for fiscal year ending June 30."
      },
      {
        q: "Can I compare to 2 years ago?",
        a: "Yes: CALCULATE([Total Sales], DATEADD('Date'[Date], -2, YEAR))"
      }
    ],
    examTips: [
      "Know TOTALYTD, TOTALQTD for cumulative calculations",
      "Remember SAMEPERIODLASTYEAR for prior year comparison",
      "Understand DATEADD for flexible period shifting",
      "Know that time intelligence requires marked date table",
      "Recognize fiscal year parameter in YTD functions"
    ],
    resources: [
      {
        title: "Time intelligence functions",
        url: "https://learn.microsoft.com/dax/time-intelligence-functions-dax",
        type: "Documentation"
      },
      {
        title: "Create date tables in Power BI",
        url: "https://learn.microsoft.com/power-bi/guidance/model-date-tables",
        type: "Documentation"
      }
    ]
  },

  "Use basic statistical functions": {
    overview: {
      title: "Statistical Analysis in DAX",
      concepts: [
        "Statistical functions enable data distribution analysis",
        "Common functions: AVERAGE, MEDIAN, STDEV.P, STDEV.S, MIN, MAX, PERCENTILE",
        "AVERAGEX vs AVERAGE for different calculation scenarios",
        "VAR.P and VAR.S for variance calculations",
        "RANKX for ranking values within context"
      ]
    },
    bestPractices: [
      "Use AVERAGE for simple column averages",
      "Use AVERAGEX when calculation needed per row before averaging",
      "Use STDEV.P for entire population, STDEV.S for sample",
      "Use RANKX for rankings that respond to filters",
      "Format statistical measures appropriately (decimals for precision)",
      "Test with edge cases (all same values, single value, blanks)"
    ],
    commonMistakes: [
      "Using AVERAGE when AVERAGEX is needed (or vice versa)",
      "Not handling BLANK values in statistical calculations",
      "Using population functions when sample functions appropriate",
      "Forgetting to specify order (ascending/descending) in RANKX",
      "Not considering filter context in statistical measures",
      "Over-using statistical functions for simple scenarios"
    ],
    keySteps: [
      "Average: Avg Sales = AVERAGE(Sales[Amount])",
      "Average per row: Avg Profit = AVERAGEX(Sales, Sales[Revenue] - Sales[Cost])",
      "Standard deviation: StdDev = STDEV.P(Sales[Amount])",
      "Median: Median Sales = MEDIAN(Sales[Amount])",
      "Ranking: Rank = RANKX(ALL(Products[Name]), [Total Sales], , DESC)",
      "Percentile: P90 = PERCENTILE.INC(Sales[Amount], 0.90)"
    ],
    keyDecisions: [
      "**AVERAGE or AVERAGEX?** - Simple column: AVERAGE; Row-level calc: AVERAGEX",
      "**Population or sample?** - Entire dataset: .P functions; Sample: .S functions",
      "**Which ranking table?** - ALL for overall rank; ALLSELECTED for filtered rank",
      "**Dense or normal rank?** - Gaps after ties: RANKX; No gaps: use DENSE_RANK pattern",
      "**Statistical precision needed?** - High: use STDEV/VAR; Low: may suffice with simpler metrics"
    ],
    keyDefinitions: [
      "**AVERAGE**: Arithmetic mean of values in column",
      "**AVERAGEX**: Iterates rows, calculates expression, then averages results",
      "**STDEV.P**: Standard deviation of entire population",
      "**STDEV.S**: Standard deviation of sample",
      "**MEDIAN**: Middle value when sorted",
      "**RANKX**: Ranks values based on specified expression and order"
    ],
    risks: [
      "**Incorrect averages**: Using AVERAGE when AVERAGEX needed for correct calculation",
      "**BLANK handling**: Statistics may treat BLANKs unexpectedly",
      "**Performance**: Complex iterator functions on large tables slow",
      "**Context dependency**: Rankings change with filter context",
      "**Outlier sensitivity**: Mean and StdDev affected by outliers, median less so",
      "**Sample vs population**: Wrong choice gives incorrect variance/stdev"
    ],
    faqs: [
      {
        q: "When should I use AVERAGEX instead of AVERAGE?",
        a: "Use AVERAGEX when you need to calculate something per row first (like profit = revenue - cost) then average those results."
      },
      {
        q: "What's the difference between STDEV.P and STDEV.S?",
        a: "STDEV.P for entire population. STDEV.S for sample from population. Use .S when data represents a sample."
      },
      {
        q: "How do I create a ranking measure?",
        a: "Rank = RANKX(ALL(Products[Name]), [Total Sales], , DESC). ALL ensures rank across all products."
      },
      {
        q: "How do I calculate median?",
        a: "Median Sales = MEDIAN(Sales[Amount]). Returns middle value when sorted."
      },
      {
        q: "Can I rank by multiple columns?",
        a: "Not directly. Combine columns into single expression or use multiple RANKX measures."
      }
    ],
    examTips: [
      "Know AVERAGE for simple, AVERAGEX for row-level calculation",
      "Remember .P for population, .S for sample",
      "Understand RANKX for creating rankings",
      "Know MEDIAN returns middle value",
      "Recognize when statistical functions are appropriate"
    ],
    resources: [
      {
        title: "Statistical functions in DAX",
        url: "https://learn.microsoft.com/dax/statistical-functions-dax",
        type: "Documentation"
      },
      {
        title: "RANKX function",
        url: "https://learn.microsoft.com/dax/rankx-function-dax",
        type: "Documentation"
      }
    ]
  },

  "Create semi-additive measures": {
    overview: {
      title: "Measures That Don't Sum Across Time",
      concepts: [
        "Semi-additive measures aggregate across some dimensions but not time",
        "Common examples: inventory levels, account balances, headcount",
        "Sum across products/locations but show last/first/average value over time",
        "Use LASTDATE, FIRSTDATE, or AVERAGEX with time dimension",
        "Essential for snapshot-based data like balances and stock levels"
      ]
    },
    bestPractices: [
      "Use LASTDATE to get most recent value in time period",
      "Use FIRSTDATE to get opening balance/value",
      "Use AVERAGEX for average over time period",
      "Combine CALCULATE with date functions for semi-additive behavior",
      "Test with different time granularities (day, month, year)",
      "Document why measure is semi-additive for other developers"
    ],
    commonMistakes: [
      "Summing balances across time (double-counting)",
      "Not using proper date context functions",
      "Forgetting to use CALCULATE with time functions",
      "Not considering what happens at different time granularities",
      "Using simple SUM when semi-additive logic needed",
      "Not handling missing dates in snapshot data"
    ],
    keySteps: [
      "Identify measure type: inventory, balance, headcount = semi-additive",
      "Closing Balance: CALCULATE([Inventory], LASTDATE('Date'[Date]))",
      "Opening Balance: CALCULATE([Inventory], FIRSTDATE('Date'[Date]))",
      "Average Balance: AVERAGEX(VALUES('Date'[Date]), [Inventory])",
      "Changes: [Closing Balance] - [Opening Balance]",
      "Test at day, month, quarter, year levels"
    ],
    keyDecisions: [
      "**Last, First, or Average?** - Closing value: LASTDATE; Opening: FIRSTDATE; Period average: AVERAGEX",
      "**Which time dimension?** - Standard reporting: Date; Fiscal: Fiscal Date",
      "**Handle missing dates?** - Snapshots not daily: use LASTNONBLANK",
      "**Show change or just value?** - Both: create separate measures for value and change",
      "**Aggregate across what?** - Time: special logic; Other dimensions: normal SUM"
    ],
    keyDefinitions: [
      "**Semi-Additive Measure**: Aggregates normally across most dimensions but not time",
      "**LASTDATE**: Returns last date in current filter context",
      "**FIRSTDATE**: Returns first date in current filter context",
      "**LASTNONBLANK**: Returns last date where expression is not blank",
      "**Snapshot Data**: Point-in-time values (balances, inventory) not transactions",
      "**Stock/Flow**: Semi-additive measures are stocks; transactions are flows"
    ],
    risks: [
      "**Double counting**: Summing balances across time adds same money multiple times",
      "**Wrong totals**: Not using semi-additive logic gives meaningless year totals",
      "**Missing dates**: Snapshot data may have gaps causing incorrect values",
      "**Granularity issues**: Logic may work at day level but fail at month level",
      "**Performance**: AVERAGEX over many dates can be slow",
      "**User confusion**: Semi-additive behavior may seem wrong to users expecting sums"
    ],
    faqs: [
      {
        q: "What is a semi-additive measure?",
        a: "A measure that sums across some dimensions (products, locations) but not time. Examples: inventory, account balances, headcount."
      },
      {
        q: "How do I show closing inventory balance?",
        a: "Closing Inventory = CALCULATE([Inventory], LASTDATE('Date'[Date])). Shows last value in selected period."
      },
      {
        q: "Why shouldn't I sum balances across months?",
        a: "Summing balances double-counts the same money. Use LASTDATE to show ending balance instead."
      },
      {
        q: "How do I calculate average balance over time?",
        a: "Average Balance = AVERAGEX(VALUES('Date'[Date]), [Balance]). Averages daily balances."
      },
      {
        q: "What if I have snapshot data weekly not daily?",
        a: "Use LASTNONBLANK instead of LASTDATE to find last date with actual data."
      }
    ],
    examTips: [
      "Know semi-additive measures don't sum across time (inventory, balances)",
      "Remember LASTDATE for closing/ending values",
      "Understand FIRSTDATE for opening/beginning values",
      "Know AVERAGEX for period averages",
      "Recognize when semi-additive logic is needed vs normal SUM"
    ],
    resources: [
      {
        title: "Semi-additive measures",
        url: "https://learn.microsoft.com/power-bi/guidance/dax-measures",
        type: "Documentation"
      },
      {
        title: "LASTDATE function",
        url: "https://learn.microsoft.com/dax/lastdate-function-dax",
        type: "Documentation"
      }
    ]
  },

  "Create a measure by using quick measures": {
    overview: {
      title: "Accelerating Measure Creation with Templates",
      concepts: [
        "Quick Measures provide pre-built DAX templates for common calculations",
        "Categories: aggregations, filters, time intelligence, totals, text",
        "Generates DAX code that you can learn from and modify",
        "Faster than writing from scratch for standard calculations",
        "Great learning tool to understand DAX patterns"
      ]
    },
    bestPractices: [
      "Use Quick Measures for standard calculations to save time",
      "Review generated DAX code to learn patterns",
      "Modify generated code to customize for specific needs",
      "Create custom Quick Measures for organizational standards",
      "Test Quick Measure results same as hand-written measures",
      "Consider performance of generated code for large datasets"
    ],
    commonMistakes: [
      "Blindly accepting Quick Measure without understanding code",
      "Not reviewing generated DAX for optimization opportunities",
      "Using Quick Measures when simple measure would suffice",
      "Not customizing Quick Measures to match exact requirements",
      "Forgetting Quick Measures only available in Power BI Desktop",
      "Creating complex Quick Measures that are hard to maintain"
    ],
    keySteps: [
      "Select table for measure in Fields pane",
      "Right-click > Quick Measure (or Home tab > Quick Measure)",
      "Choose calculation type from categories",
      "Configure required fields (base value, filters, etc.)",
      "Click OK to generate measure",
      "Review DAX code in formula bar to understand logic",
      "Test measure in visual to verify correctness"
    ],
    keyDecisions: [
      "**Quick Measure or write DAX?** - Standard calc: Quick Measure; Custom logic: Write DAX",
      "**Which Quick Measure type?** - Time intelligence, filtering, aggregation based on need",
      "**Accept or modify code?** - Standard need: accept; Custom requirements: modify",
      "**Create custom Quick Measure?** - Org has standards: yes; One-off: no",
      "**Performance acceptable?** - Generated code efficient: use; Can optimize: modify"
    ],
    keyDefinitions: [
      "**Quick Measure**: Pre-built DAX template for common calculations",
      "**Time Intelligence Quick Measures**: YTD, QTD, Prior Period, Rolling Average, etc.",
      "**Filter Quick Measures**: Top N, Above/Below Average, filtered values",
      "**Aggregate Quick Measures**: Average per category, weighted average, etc.",
      "**Custom Quick Measure**: User-defined template for organizational patterns",
      "**Generated DAX**: Code automatically created by Quick Measure feature"
    ],
    risks: [
      "**Black box problem**: Not understanding generated code",
      "**Performance issues**: Some templates generate inefficient DAX",
      "**Inflexibility**: Templates may not fit exact requirements",
      "**Maintenance burden**: Complex generated code hard to modify later",
      "**Service limitation**: Quick Measures feature not available in Service",
      "**Over-reliance**: Not learning DAX by always using templates"
    ],
    faqs: [
      {
        q: "How do I create a Quick Measure?",
        a: "Right-click table > Quick Measure, choose calculation type, configure fields, click OK."
      },
      {
        q: "What types of Quick Measures are available?",
        a: "Time intelligence (YTD, Prior Period), filters (Top N), aggregations (Average per), totals (Running Total), and more."
      },
      {
        q: "Can I modify the generated DAX code?",
        a: "Yes - click measure in Fields, edit formula in formula bar. Great way to learn DAX patterns."
      },
      {
        q: "Are Quick Measures available in Power BI Service?",
        a: "No - Quick Measures feature only in Desktop. But measures created with it work in Service."
      },
      {
        q: "Should I use Quick Measures or write DAX myself?",
        a: "Quick Measures for common patterns to save time. Write DAX for custom logic or to learn deeply."
      }
    ],
    examTips: [
      "Know Quick Measures provide pre-built DAX templates",
      "Remember categories: time intelligence, filters, aggregations, totals",
      "Understand Quick Measures generate DAX code you can review/modify",
      "Know Quick Measures only available in Desktop, not Service",
      "Recognize when Quick Measures save time vs writing custom DAX"
    ],
    resources: [
      {
        title: "Use quick measures for common calculations",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-quick-measures",
        type: "Documentation"
      },
      {
        title: "Quick measures in Power BI",
        url: "https://learn.microsoft.com/power-bi/transform-model/quick-measures",
        type: "Documentation"
      }
    ]
  },

  "Create calculated tables or columns": {
    overview: {
      title: "When to Use Calculated Columns vs Tables",
      concepts: [
        "Calculated columns add static columns to tables evaluated row-by-row",
        "Calculated tables create entirely new tables using DAX",
        "Calculated columns stored in model and consume memory",
        "Use calculated columns for row-context calculations (categorization, concatenation)",
        "Use calculated tables for reference data, parameter tables, or restructured data"
      ]
    },
    bestPractices: [
      "Use Power Query for data shaping instead of calculated columns when possible",
      "Use measures instead of calculated columns for aggregations",
      "Use calculated columns for categories, flags, or row-level logic",
      "Use calculated tables for date tables, parameter tables, or small reference data",
      "Minimize calculated columns to reduce model size and refresh time",
      "Document calculated column/table logic clearly"
    ],
    commonMistakes: [
      "Creating calculated columns for aggregations (use measures instead)",
      "Using calculated columns when Power Query would work (wastes memory)",
      "Creating large calculated tables (impacts refresh performance)",
      "Not understanding calculated columns use row context not filter context",
      "Forgetting calculated columns are static (don't respond to filters like measures)",
      "Creating calculated tables that duplicate existing data"
    ],
    keySteps: [
      "**Calculated Column**: Select table > New Column > Enter DAX formula",
      "Example: Category = IF([Sales] > 1000, \"High\", \"Low\")",
      "**Calculated Table**: Modeling tab > New Table > Enter DAX formula",
      "Example: Date = CALENDAR(DATE(2020,1,1), DATE(2030,12,31))",
      "Test calculations with various data scenarios",
      "Monitor model size and refresh time impact"
    ],
    keyDecisions: [
      "**Power Query, Calculated Column, or Measure?** - Data prep: PQ; Row logic: Column; Aggregation: Measure",
      "**Calculated column needed?** - Row-by-row logic: Yes; Aggregation: No (use measure)",
      "**Calculated table needed?** - Small reference data: Yes; Large data: No (use Power Query)",
      "**Static or dynamic?** - Static row value: Column; Dynamic by filter: Measure",
      "**Memory impact acceptable?** - Small tables: Yes; Large: Minimize calculated columns"
    ],
    keyDefinitions: [
      "**Calculated Column**: DAX column added to existing table, evaluated row-by-row",
      "**Calculated Table**: Entirely new table created using DAX expression",
      "**Row Context**: Evaluation context for calculated columns (one row at a time)",
      "**Filter Context**: Evaluation context for measures (filtered by visuals/slicers)",
      "**Static Calculation**: Value computed once and stored (calculated columns)",
      "**Dynamic Calculation**: Value computed at query time based on filters (measures)"
    ],
    risks: [
      "**Memory bloat**: Many calculated columns significantly increase model size",
      "**Refresh performance**: Calculated columns recalculate during refresh, slowing it down",
      "**Wrong context**: Using aggregations in calculated columns gives row-level totals, not filtered totals",
      "**Maintenance burden**: Complex calculated columns hard to debug and update",
      "**Flexibility loss**: Calculated columns are static, can't respond to user interactions",
      "**Duplication**: Calculated tables duplicating source data waste storage"
    ],
    faqs: [
      {
        q: "When should I use a calculated column vs a measure?",
        a: "Calculated column for row-level logic (categories, flags). Measure for aggregations that change with filters (sums, averages)."
      },
      {
        q: "Should I create calculated columns in Power Query or DAX?",
        a: "Power Query preferred when possible - better performance and doesn't bloat model as much."
      },
      {
        q: "When should I create a calculated table?",
        a: "For date tables, parameter tables, small reference data, or restructuring existing data. Not for duplicating large datasets."
      },
      {
        q: "Why is my calculated column showing the same value for all rows?",
        a: "Probably using aggregation function. Calculated columns work row-by-row, not across rows. Use measure instead."
      },
      {
        q: "Do calculated columns recalculate with slicers?",
        a: "No - they're static, computed once during refresh. Use measures for dynamic calculations that respond to filters."
      }
    ],
    examTips: [
      "Know calculated columns are for row-level logic, measures for aggregations",
      "Understand calculated columns use row context, stored in model",
      "Remember calculated tables create new tables using DAX",
      "Know Power Query preferred over calculated columns when possible",
      "Recognize calculated columns are static, don't respond to filters"
    ],
    resources: [
      {
        title: "Calculated columns in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-calculated-columns",
        type: "Documentation"
      },
      {
        title: "Calculated tables in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-calculated-tables",
        type: "Documentation"
      }
    ]
  },

  "Create calculation groups": {
    overview: {
      title: "Reusable Calculation Patterns",
      concepts: [
        "Calculation groups apply calculation patterns to multiple measures",
        "Create time intelligence variations without duplicating measures",
        "Calculation items define different calculations (YTD, Prior Year, etc.)",
        "Reduce measure count and improve maintainability",
        "Users select calculation item in slicer or visual to change calculation"
      ]
    },
    bestPractices: [
      "Use calculation groups for time intelligence patterns (YTD, PY, etc.)",
      "Create format string expressions for dynamic formatting",
      "Set precedence when multiple calculation groups exist",
      "Document calculation group purpose and usage",
      "Test interactions with regular measures and filters",
      "Consider user experience when designing calculation items"
    ],
    commonMistakes: [
      "Creating calculation groups for simple scenarios (overkill)",
      "Not understanding how calculation groups modify measure behavior",
      "Forgetting to set format strings for calculation items",
      "Creating too many calculation groups causing conflicts",
      "Not testing calculation group interactions with model relationships",
      "Using calculation groups when separate measures would be clearer"
    ],
    keySteps: [
      "In Tabular Editor or Power BI Desktop (preview): Create Calculation Group",
      "Name group (e.g., 'Time Intelligence')",
      "Create calculation items (e.g., 'Current', 'Prior Year', 'YTD')",
      "Define DAX expression for each item",
      "Current: SELECTEDMEASURE()",
      "Prior Year: CALCULATE(SELECTEDMEASURE(), SAMEPERIODLASTYEAR('Date'[Date]))",
      "YTD: CALCULATE(SELECTEDMEASURE(), DATESYTD('Date'[Date]))",
      "Test by adding to visual and switching between items"
    ],
    keyDecisions: [
      "**Use calculation group or multiple measures?** - Many measures need same pattern: calculation group; Few: separate measures",
      "**Which patterns to include?** - Common user needs: YTD, Prior Period, Growth; Rare needs: skip",
      "**How many calculation groups?** - Keep minimal - multiple groups can conflict",
      "**Set precedence?** - Multiple groups: yes; Single: not needed",
      "**Dynamic formatting needed?** - Yes: create format string expressions; No: use base measure format"
    ],
    keyDefinitions: [
      "**Calculation Group**: Special table containing calculation items that modify measure behavior",
      "**Calculation Item**: Individual calculation pattern within a group (YTD, Prior Year, etc.)",
      "**SELECTEDMEASURE**: DAX function referencing the currently evaluated measure",
      "**Format String Expression**: Dynamic formatting based on calculation item",
      "**Precedence**: Order of application when multiple calculation groups exist",
      "**Time Intelligence Pattern**: Common calculation variation (Current, YTD, PY, YoY%)"
    ],
    risks: [
      "**Complexity**: Calculation groups add abstraction that can confuse users and developers",
      "**Conflicts**: Multiple calculation groups can interfere with each other",
      "**Debugging difficulty**: Harder to troubleshoot than individual measures",
      "**Tool support**: Not all tools support calculation groups fully",
      "**Performance**: Complex calculation items can impact query performance",
      "**Documentation need**: Requires clear documentation for team understanding"
    ],
    faqs: [
      {
        q: "What is a calculation group?",
        a: "A special table that applies calculation patterns (YTD, Prior Year) to multiple measures, reducing duplication."
      },
      {
        q: "How do I create a calculation group?",
        a: "Use Tabular Editor or Power BI Desktop (external tools). Create group, add items with DAX using SELECTEDMEASURE()."
      },
      {
        q: "When should I use calculation groups vs multiple measures?",
        a: "Calculation groups when many measures need same patterns (YTD, PY, etc.). Multiple measures when logic differs significantly."
      },
      {
        q: "What is SELECTEDMEASURE()?",
        a: "DAX function in calculation items that references whatever measure is currently being evaluated."
      },
      {
        q: "Can calculation groups affect all measures?",
        a: "Yes - when user selects calculation item, it modifies behavior of all measures in visuals."
      }
    ],
    examTips: [
      "Know calculation groups apply patterns to multiple measures",
      "Remember SELECTEDMEASURE() references current measure",
      "Understand calculation items are different variations (YTD, PY, etc.)",
      "Know calculation groups reduce measure duplication",
      "Recognize when calculation groups are appropriate vs separate measures"
    ],
    resources: [
      {
        title: "Create calculation groups",
        url: "https://learn.microsoft.com/power-bi/transform-model/calculation-groups",
        type: "Documentation"
      },
      {
        title: "Calculation groups in Power BI",
        url: "https://learn.microsoft.com/analysis-services/tabular-models/calculation-groups",
        type: "Documentation"
      }
    ]
  },

  "Improve performance by identifying and removing unnecessary rows and columns": {
    overview: {
      title: "Data Model Optimization Through Reduction",
      concepts: [
        "Smaller models load faster, refresh faster, and query faster",
        "Remove columns not used in reports, relationships, or calculations",
        "Filter unnecessary rows at data source or Power Query",
        "Historical data archiving for large fact tables",
        "Incremental refresh for large datasets with time dimension"
      ]
    },
    bestPractices: [
      "Remove all unused columns from tables before loading",
      "Filter out historical data not needed for analysis",
      "Use Query Folding to push filtering to data source",
      "Apply row filters in Power Query, not in DAX",
      "Hide columns instead of removing if might be needed later",
      "Document why specific rows/columns were excluded"
    ],
    commonMistakes: [
      "Loading all columns 'just in case' they're needed",
      "Not filtering historical data, loading years of unused history",
      "Filtering in DAX instead of Power Query (no performance benefit)",
      "Removing columns used in hidden calculations or relationships",
      "Not using incremental refresh for large time-based tables",
      "Loading test/staging data into production models"
    ],
    keySteps: [
      "**Remove Columns**: Power Query > Choose Columns > Select only needed columns",
      "**Filter Rows**: Power Query > Filter rows based on criteria (date range, status, etc.)",
      "**Verify Query Folding**: Right-click last step > View Native Query (if available, folding works)",
      "**Remove Hidden Columns**: Model view > Delete unused columns",
      "**Set Incremental Refresh**: Table settings > Configure incremental refresh policy",
      "**Test Performance**: Performance Analyzer before/after to measure impact"
    ],
    keyDecisions: [
      "**Which columns to remove?** - Not used in visuals, measures, relationships, or calculations",
      "**How much history to keep?** - Balance analysis needs vs performance (common: 2-3 years)",
      "**Filter in source or Power Query?** - Source capable: use views/stored procs; Otherwise: Power Query",
      "**Incremental refresh needed?** - Dataset > 1GB with time dimension: yes; Smaller: no",
      "**Remove or hide columns?** - Definitely unused: remove; Uncertain: hide"
    ],
    keyDefinitions: [
      "**Query Folding**: Power Query operations translated to source database queries for efficiency",
      "**Incremental Refresh**: Only refresh recent data, archive historical data in Service",
      "**Column Cardinality**: Number of distinct values (high cardinality = more memory)",
      "**Row-Level Filter**: Power Query filter applied before data loads to model",
      "**Unused Column**: Column not referenced in relationships, measures, or visuals",
      "**Data Reduction**: Techniques to minimize model size while preserving analytical value"
    ],
    risks: [
      "**Lost functionality**: Removing columns breaks hidden calculations or future needs",
      "**Incomplete analysis**: Filtering too aggressively limits analytical capability",
      "**Query folding break**: Some operations prevent folding, forcing local processing",
      "**Refresh complexity**: Incremental refresh adds configuration complexity",
      "**Documentation gap**: Not documenting exclusions causes confusion later",
      "**Business requirement changes**: Removed data needed when requirements evolve"
    ],
    faqs: [
      {
        q: "How do I identify unused columns?",
        a: "Use View > Column Dependencies tool or manually check: not in visuals, measures, relationships, or calculations."
      },
      {
        q: "Should I filter rows in Power Query or DAX?",
        a: "Always Power Query. DAX filters don't reduce model size - data is already loaded. Power Query prevents loading."
      },
      {
        q: "What is incremental refresh?",
        a: "Feature that only refreshes recent data (e.g., last 30 days) while archiving historical data in Service. Reduces refresh time."
      },
      {
        q: "How much performance improvement can I expect?",
        a: "Varies by model. Removing 50% of columns/rows typically reduces model size 30-50% and improves refresh/query speed proportionally."
      },
      {
        q: "Can I add columns back after removing them?",
        a: "Yes, but requires editing Power Query. Better to hide uncertain columns initially, remove only when confirmed unused."
      }
    ],
    examTips: [
      "Know to remove unused columns and filter unnecessary rows in Power Query",
      "Remember query folding pushes operations to data source for better performance",
      "Understand incremental refresh for large time-based datasets",
      "Know that filtering in DAX doesn't improve performance (data already loaded)",
      "Recognize smaller models = faster refresh, load, and query performance"
    ],
    resources: [
      {
        title: "Power BI optimization guide",
        url: "https://learn.microsoft.com/power-bi/guidance/power-bi-optimization",
        type: "Documentation"
      },
      {
        title: "Incremental refresh in Power BI",
        url: "https://learn.microsoft.com/power-bi/connect-data/incremental-refresh-overview",
        type: "Documentation"
      }
    ]
  },

  "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view": {
    overview: {
      title: "Diagnosing Performance Bottlenecks",
      concepts: [
        "Performance Analyzer captures timing for visual rendering and queries",
        "DAX Query View shows generated queries and execution details",
        "Three phases: DAX query, Visual display, Other (overhead)",
        "Export and analyze performance data for optimization insights",
        "Identify slow measures, complex relationships, or inefficient visuals"
      ]
    },
    bestPractices: [
      "Run Performance Analyzer before optimization to establish baseline",
      "Test with realistic data volumes and filter selections",
      "Focus on visuals taking >1 second to load",
      "Analyze exported queries in DAX Studio for detailed metrics",
      "Test after changes to verify improvements",
      "Document performance issues and resolutions"
    ],
    commonMistakes: [
      "Testing with small sample data not representative of production",
      "Not establishing baseline before making changes",
      "Focusing on millisecond differences instead of major bottlenecks",
      "Not considering network latency in Service vs Desktop",
      "Optimizing measures that are rarely used",
      "Making multiple changes at once (can't identify what helped)"
    ],
    keySteps: [
      "View tab > Performance Analyzer > Start Recording",
      "Interact with report: change filters, click visuals to refresh",
      "Stop recording and review results",
      "Sort by duration to find slowest visuals",
      "Expand visual to see: DAX query time, Visual display time, Other",
      "Copy query and analyze in DAX Studio for detailed execution plan",
      "Use DAX Query View: Home > Query view to see all queries"
    ],
    keyDecisions: [
      "**Which visuals to optimize?** - Slowest visuals with highest user interaction",
      "**Optimize measure or visual?** - Long DAX time: measure; Long visual time: simplify visual",
      "**Which measures to review?** - Used in slow visuals or complex calculations",
      "**Desktop or Service testing?** - Both - Desktop for dev, Service for real-world conditions",
      "**How much improvement needed?** - Target <1 second per visual for good UX"
    ],
    keyDefinitions: [
      "**Performance Analyzer**: Tool that captures and displays timing for report visual rendering",
      "**DAX Query Time**: Time to execute DAX query and get data from engine",
      "**Visual Display Time**: Time to render visual after data received",
      "**Other Time**: Overhead like serialization, data transfer",
      "**DAX Query View**: Interface showing generated queries and execution details",
      "**Query Plan**: Execution details showing which tables, columns accessed and timing"
    ],
    risks: [
      "**Misleading results**: Cache effects make subsequent runs appear faster",
      "**Incomplete testing**: Not testing with various filter combinations",
      "**Network factors**: Service performance affected by network latency",
      "**User concurrency**: Single-user testing doesn't reflect multi-user load",
      "**Data volume changes**: Performance degrades as data grows",
      "**Complex interdependencies**: Optimizing one measure may affect others"
    ],
    faqs: [
      {
        q: "How do I use Performance Analyzer?",
        a: "View tab > Performance Analyzer > Start Recording. Interact with report, then Stop. Review timing for each visual."
      },
      {
        q: "What does DAX query time include?",
        a: "Time to execute DAX calculation and retrieve data from VertiPaq engine. High time indicates complex/inefficient measure or query."
      },
      {
        q: "What's considered good performance?",
        a: "Visuals loading in <1 second provide good user experience. >3 seconds feels slow. Aim for <1 second per visual."
      },
      {
        q: "Why is Visual display time high?",
        a: "Too many data points, complex visual type, or formatting. Simplify visual, reduce data points, or use simpler chart type."
      },
      {
        q: "How do I export queries for DAX Studio analysis?",
        a: "In Performance Analyzer, expand visual > Copy query. Paste into DAX Studio for detailed execution plan and server timings."
      }
    ],
    examTips: [
      "Know Performance Analyzer shows timing for visuals: DAX query, Visual display, Other",
      "Remember to start recording, interact with report, then stop to capture data",
      "Understand DAX Query View shows generated queries and execution details",
      "Know that long DAX time = measure optimization needed; long Visual time = simplify visual",
      "Recognize Performance Analyzer helps identify bottlenecks for optimization"
    ],
    resources: [
      {
        title: "Use Performance Analyzer",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-performance-analyzer",
        type: "Documentation"
      },
      {
        title: "Optimize Power BI performance",
        url: "https://learn.microsoft.com/power-bi/guidance/power-bi-optimization",
        type: "Documentation"
      }
    ]
  },

  "Improve performance by reducing granularity": {
    overview: {
      title: "Aggregating Data for Performance",
      concepts: [
        "Lower granularity (higher aggregation level) = fewer rows = better performance",
        "Aggregation tables store pre-calculated summaries for large fact tables",
        "DirectQuery benefits most from aggregations",
        "Balance between analytical detail and performance",
        "Automatic aggregation matching by Power BI engine"
      ]
    },
    bestPractices: [
      "Create aggregation tables at common query levels (monthly, category)",
      "Use Import mode for aggregation tables even with DirectQuery facts",
      "Configure aggregation table relationships and properties correctly",
      "Test queries hit aggregations using Performance Analyzer",
      "Document aggregation strategy for maintenance",
      "Consider user query patterns when designing aggregations"
    ],
    commonMistakes: [
      "Not creating aggregations for large DirectQuery tables",
      "Wrong aggregation granularity (too detailed or too summary)",
      "Not hiding detail table from report view when aggregations exist",
      "Incorrect aggregation table configuration preventing matching",
      "Not testing that queries actually use aggregations",
      "Creating too many aggregation tables (complexity vs benefit)"
    ],
    keySteps: [
      "Identify large fact tables causing performance issues",
      "Determine common query granularity (e.g., monthly sales by product category)",
      "Create aggregation table in Power Query (Group By at desired grain)",
      "Load aggregation table to model",
      "Right-click aggregation table > Manage aggregations",
      "Map aggregation columns to detail table columns",
      "Set summarization functions (Sum, Count, GroupBy)",
      "Hide detail table from report view (users query aggregations automatically)"
    ],
    keyDecisions: [
      "**Which granularity for aggregations?** - Common queries: monthly/category; Rare queries: daily/product",
      "**How many aggregation tables?** - Start with one common grain, add more if needed",
      "**Import or DirectQuery for aggregations?** - Import (fast) even if detail table is DirectQuery",
      "**Which columns to aggregate?** - Numeric measures: Sum/Count; Dimensions: GroupBy",
      "**Hide detail table?** - Yes, unless users need access to detailed data directly"
    ],
    keyDefinitions: [
      "**Aggregation Table**: Pre-calculated summary table at higher grain than detail table",
      "**Granularity**: Level of detail in data (daily = fine grain, monthly = coarse grain)",
      "**Aggregation Matching**: Engine automatically uses aggregation when query matches grain",
      "**Detail Table**: Original fact table with finest granularity",
      "**GroupBy Column**: Dimension column in aggregation (Product Category, Month)",
      "**Summarization**: How numeric columns aggregated (Sum, Count, Min, Max, Average)"
    ],
    risks: [
      "**Wrong results**: Incorrect aggregation configuration gives wrong totals",
      "**Unused aggregations**: Queries don't match aggregation grain, not used",
      "**Maintenance burden**: Multiple aggregations increase refresh complexity",
      "**Lost detail**: Users can't drill to detail if table hidden",
      "**Storage increase**: Aggregations consume additional storage",
      "**Complexity**: Understanding when aggregations used vs detail table"
    ],
    faqs: [
      {
        q: "What are aggregation tables?",
        a: "Pre-calculated summary tables at higher grain (e.g., monthly vs daily) that improve query performance, especially for DirectQuery."
      },
      {
        q: "How do I create an aggregation table?",
        a: "Duplicate fact table query, Group By at desired grain (e.g., Year-Month, Category), load to model, configure as aggregation."
      },
      {
        q: "How does Power BI know when to use aggregations?",
        a: "Engine automatically matches queries to aggregation grain. If query can be satisfied by aggregation, it uses it transparently."
      },
      {
        q: "Can I have multiple aggregation tables?",
        a: "Yes - create multiple grains (monthly, yearly, by category). Engine picks most appropriate for each query."
      },
      {
        q: "Do aggregations work with Import mode?",
        a: "Yes, but benefit is smaller. Greatest performance improvement is with DirectQuery detail tables using Import aggregations."
      }
    ],
    examTips: [
      "Know aggregation tables improve performance by reducing row count",
      "Remember aggregations especially beneficial for DirectQuery models",
      "Understand aggregation tables configured via Manage aggregations dialog",
      "Know that engine automatically matches queries to appropriate aggregation",
      "Recognize common aggregation grains: monthly, category level vs daily, product level"
    ],
    resources: [
      {
        title: "Aggregations in Power BI",
        url: "https://learn.microsoft.com/power-bi/transform-model/aggregations-advanced",
        type: "Documentation"
      },
      {
        title: "User-defined aggregations",
        url: "https://learn.microsoft.com/power-bi/transform-model/aggregations-auto",
        type: "Documentation"
      }
    ]
  }
};
