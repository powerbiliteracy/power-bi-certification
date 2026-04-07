const questions = [
  {
    id: 1,
    phase: "Design a Data Model",
    scenario: "Your data model has a Date dimension related to both a Sales fact table and a Budget fact table. When a user selects a year from a slicer, they want the same date filter to apply to both fact tables simultaneously. The default single-direction relationship only filters one table at a time.",
    question: "What's the correct approach to enable cross-filter on both fact tables from the Date dimension?",
    options: [
      "Set both relationships to bidirectional cross-filter",
      "Keep single-direction relationships on both; write measures that explicitly use CALCULATE with USERELATIONSHIP to force the filter",
      "Create a second Date table and relate it to the Budget table",
      "Use a bridge table between Sales and Budget"
    ],
    correctIndex: 0,
    explanation: "When a single dimension needs to filter multiple fact tables simultaneously (a 'shared dimension' or 'conformed dimension' scenario), setting both relationships' cross-filter direction to 'Both' allows slicers on the dimension to propagate into both facts. Be cautious with bidirectional filters in complex models — validate there are no ambiguous paths.",
    microsoftLinks: [
      { text: "Relationships and cardinality", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-create-and-manage-relationships" },
      { text: "Cross-filter direction", url: "https://learn.microsoft.com/power-bi/guidance/relationships-bidirectional-filtering" }
    ]
  },
  {
    id: 2,
    phase: "Role-Playing Dimensions",
    scenario: "Your Sales fact table has three date foreign keys: OrderDate, ShipDate, and DeliveryDate. All three should relate to the same Date dimension. You set up three relationships, but Power BI only allows one active relationship between any two tables.",
    question: "What's the correct modeling approach?",
    options: [
      "Create three separate Date tables: DimOrderDate, DimShipDate, DimDeliveryDate — each a duplicate of the same Date table",
      "Use one active relationship (OrderDate) and create inactive relationships for ShipDate and DeliveryDate; use USERELATIONSHIP in specific measures",
      "Add a Type column to the Date table and filter by it in measures",
      "Use bidirectional relationships on all three Date-to-Sales paths"
    ],
    correctIndex: 1,
    explanation: "Role-playing dimensions use the same underlying dimension table with multiple relationships. Only one can be active at a time (used for default filtering). Inactive relationships are activated for specific measures using USERELATIONSHIP inside CALCULATE. This avoids data duplication while enabling all three date perspectives.",
    microsoftLinks: [
      { text: "Role-playing dimensions", url: "https://learn.microsoft.com/power-bi/guidance/star-schema#role-playing-dimensions" },
      { text: "USERELATIONSHIP function", url: "https://learn.microsoft.com/dax/userelationship-function-dax" }
    ]
  },
  {
    id: 3,
    phase: "Create a Date Table",
    scenario: "Your model has a Sales table with an OrderDate column. You need to enable time intelligence DAX functions like TOTALYTD, SAMEPERIODLASTYEAR, and DATEADD. These functions require a proper Date table marked as a date table.",
    question: "What are the minimum requirements for a Date table to work correctly with time intelligence?",
    options: [
      "The table just needs a column named 'Date' of type Date",
      "The table must contain one row for every date in a contiguous range with no gaps, have a Date column with unique values, be marked as a Date Table in Power BI, and the date range must cover all dates in your fact tables",
      "The table must be created using CALENDARAUTO() function",
      "The table requires Year, Month, and Quarter columns in addition to the Date column"
    ],
    correctIndex: 1,
    explanation: "Time intelligence functions rely on a contiguous, gap-free date table. The requirements are: unique date values, contiguous range covering all fact table dates, Date column of Date type, and marking it as 'Mark as Date Table' in Power BI. Without this, DAX time intelligence won't produce correct results.",
    microsoftLinks: [
      { text: "Mark as date table", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-date-tables" },
      { text: "Create date tables", url: "https://learn.microsoft.com/power-bi/guidance/model-date-tables" }
    ]
  },
  {
    id: 4,
    phase: "DAX — CALCULATE Function",
    scenario: "You want a measure that shows Total Sales for the product 'Widget A' regardless of any product slicer selections on the report. Currently when users filter by 'Widget B', your measure returns blank.",
    question: "Which DAX expression is correct?",
    options: [
      "Widget A Sales = FILTER(Sales, Product[Name] = \"Widget A\") * [Total Sales]",
      "Widget A Sales = CALCULATE([Total Sales], Product[Name] = \"Widget A\")",
      "Widget A Sales = CALCULATE([Total Sales], ALL(Product), Product[Name] = \"Widget A\")",
      "Widget A Sales = SUMX(FILTER(Sales, RELATED(Product[Name]) = \"Widget A\"), Sales[Amount])"
    ],
    correctIndex: 2,
    explanation: "CALCULATE evaluates [Total Sales] in a modified filter context. Adding ALL(Product) first removes any existing product filter (from slicers), then Product[Name] = 'Widget A' applies your specific filter. Without ALL(Product), if the slicer filters to 'Widget B', the measure returns blank because both filters intersect to nothing.",
    microsoftLinks: [
      { text: "CALCULATE function", url: "https://learn.microsoft.com/dax/calculate-function-dax" },
      { text: "Filter context", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-tutorial-create-measures" }
    ]
  },
  {
    id: 5,
    phase: "Time Intelligence Measures",
    scenario: "Your fiscal year runs October 1 to September 30. You need a 'Fiscal YTD Sales' measure. Using TOTALYTD([Total Sales], Dates[Date]) returns January-to-date results, not your fiscal year.",
    question: "How do you configure the fiscal year in TOTALYTD?",
    options: [
      "Add a FiscalYear calculated column to your Date table and use it in a CALCULATE filter",
      "Use TOTALYTD([Total Sales], Dates[Date], \"9/30\") — the year_end_date parameter tells the function when your fiscal year ends",
      "Create a separate fiscal calendar table with a different date range",
      "Use DATESBETWEEN with dynamic start and end dates calculated from TODAY()"
    ],
    correctIndex: 1,
    explanation: "TOTALYTD accepts an optional year_end_date parameter for non-calendar fiscal years. Specifying \"9/30\" tells the function that the fiscal year ends on September 30, so YTD calculations start from October 1. This applies to TOTALQTD, TOTALMTD, and other cumulative time intelligence functions as well.",
    microsoftLinks: [
      { text: "TOTALYTD function", url: "https://learn.microsoft.com/dax/totalytd-function-dax" },
      { text: "Fiscal year time intelligence", url: "https://learn.microsoft.com/power-bi/guidance/dax-time-intelligence-simple" }
    ]
  },
  {
    id: 6,
    phase: "Semi-Additive Measures",
    scenario: "You're building a bank balance report. The Balance column should sum across accounts but NOT sum across time — you want the balance as of the last day of the period, not the sum of all days' balances. Standard SUM([Balance]) aggregates across time incorrectly.",
    question: "What DAX pattern correctly calculates a semi-additive balance measure?",
    options: [
      "Balance = SUM(Accounts[Balance])",
      "Balance = LASTDATE(Dates[Date]) aggregated by account",
      "Balance = CALCULATE(SUM(Accounts[Balance]), LASTDATE(Dates[Date]))",
      "Balance = AVERAGEX(Dates, SUM(Accounts[Balance]))"
    ],
    correctIndex: 2,
    explanation: "Semi-additive measures are additive across some dimensions (accounts) but not others (time). CALCULATE with LASTDATE modifies the time filter context to show only the last date in the current period, then SUM aggregates across accounts for that date. This returns the correct end-of-period balance.",
    microsoftLinks: [
      { text: "Semi-additive measures", url: "https://learn.microsoft.com/power-bi/guidance/dax-semi-additive-measures" },
      { text: "LASTDATE function", url: "https://learn.microsoft.com/dax/lastdate-function-dax" }
    ]
  },
  {
    id: 7,
    phase: "Calculated Columns vs Measures",
    scenario: "Your manager asks you to add a 'Profit Margin %' to your Sales table so it appears in every row of a table visual. A colleague suggests using a measure instead. The Sales table has 8 million rows.",
    question: "When should you use a calculated column vs. a measure?",
    options: [
      "Always use measures — calculated columns are never appropriate",
      "Use a calculated column when you need a value on every row (for filtering, grouping, or row-level display), and a measure when you need aggregated values that respond to filter context",
      "Use a calculated column when performance is critical, as they're always faster",
      "Calculated columns are for text fields, measures are for numeric calculations"
    ],
    correctIndex: 1,
    explanation: "Calculated columns materialize a value per row and are stored in the model — use them for grouping, filtering, or when a row-level value is needed in visuals. Measures are computed dynamically based on filter context — use them for aggregations. For Profit Margin % on every row, a calculated column is appropriate, but be mindful of the 8M row storage cost.",
    microsoftLinks: [
      { text: "Calculated columns vs measures", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-calculated-columns" },
      { text: "Create measures", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-tutorial-create-measures" }
    ]
  },
  {
    id: 8,
    phase: "Quick Measures",
    scenario: "A business analyst with limited DAX knowledge needs to create a 'Year-over-Year Sales Growth %' measure. They know what the calculation should mean but don't know the DAX syntax. They need a solution that doesn't require writing DAX from scratch.",
    question: "What Power BI feature should they use?",
    options: [
      "Ask the BI team to write the DAX measure for them",
      "Use Quick Measures — it provides a catalog of common calculation patterns (YoY, running total, etc.) through a UI, generates the DAX automatically, and shows the code for learning",
      "Use the Q&A visual and type the question in natural language",
      "Use Calculation Groups to apply time intelligence automatically"
    ],
    correctIndex: 1,
    explanation: "Quick Measures provides a UI-driven way to create common DAX calculations without writing code. It includes time intelligence (YoY, running totals, moving averages), filtering, text operations, and more. It generates the DAX which you can inspect and learn from, making it ideal for business users who are building DAX skills.",
    microsoftLinks: [
      { text: "Quick measures", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-quick-measures" }
    ]
  },
  {
    id: 9,
    phase: "Optimize Model Performance",
    scenario: "After publishing your report, users report slow load times. You open Performance Analyzer and see a matrix visual has: DAX Query: 8,200ms, Visual Display: 450ms. The matrix shows 12 months × 50 products × 5 measures.",
    question: "What should you investigate first to address the 8.2-second DAX query?",
    options: [
      "Reduce the number of visuals on the page",
      "Open the DAX query view or copy the DAX from Performance Analyzer to DAX Studio, profile the query, and look for measure logic using expensive functions like FILTER on large tables or non-optimized iterators",
      "Switch the visual to DirectQuery mode",
      "Enable aggregations on the visual"
    ],
    correctIndex: 1,
    explanation: "When Performance Analyzer shows a slow DAX query, the next step is to examine the DAX itself. Performance Analyzer lets you copy the query to clipboard. DAX Studio (or the DAX query view in Desktop) can analyze the query plan, identify expensive operations, and show which measures are slow. Common culprits are FILTER on large tables, missing indexes, and row-by-row iterators.",
    microsoftLinks: [
      { text: "Performance Analyzer", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-performance-analyzer" },
      { text: "DAX query view", url: "https://learn.microsoft.com/power-bi/transform-model/dax-query-view" }
    ]
  },
  {
    id: 10,
    phase: "Optimize Model Performance",
    scenario: "Your dataset is 4.2GB and takes 45 minutes to refresh. You notice the Sales table has a ProductDescription column (long text, ~500 characters average), a ProductImage column (base64-encoded images), and several internal tracking columns not used in any report.",
    question: "What's the most impactful optimization?",
    options: [
      "Switch to DirectQuery to eliminate the refresh time",
      "Compress the model using third-party tools",
      "Remove ProductDescription, ProductImage, and unused tracking columns from Power Query before loading — this directly reduces model size and compression overhead",
      "Move to Premium capacity for faster refresh"
    ],
    correctIndex: 2,
    explanation: "VertiPaq struggles to compress high-cardinality text and binary columns. A 500-char description column on 10M rows stores a massive dictionary. Base64 images are even worse. Removing unused columns in Power Query is the most impactful optimization — it reduces model size, refresh time, and improves query performance. Always apply the principle: don't load what you don't need.",
    microsoftLinks: [
      { text: "Reduce model size", url: "https://learn.microsoft.com/power-bi/guidance/import-modeling-data-reduction" },
      { text: "Optimization guide", url: "https://learn.microsoft.com/power-bi/guidance/power-bi-optimization" }
    ]
  },
  {
    id: 11,
    phase: "Calculation Groups",
    scenario: "You have 20 base measures and need 4 time intelligence variations for each: Current Period, Prior Year, YoY Change, and YoY %. Creating 80 separate measures is becoming impossible to maintain.",
    question: "How do calculation groups solve this, and what DAX function is central to them?",
    options: [
      "Calculation groups aren't applicable here — use separate measures for maintainability",
      "Create one calculation group with 4 calculation items; each item uses SELECTEDMEASURE() to reference whichever base measure is being evaluated — reducing 80 measures to 20 base + 4 items",
      "Create a parameter table with time period names and use SWITCH in every measure",
      "Use field parameters to dynamically select which time period measure is shown"
    ],
    correctIndex: 1,
    explanation: "Calculation groups apply a transformation to whatever measure is in context using SELECTEDMEASURE(). A YoY item would contain: CALCULATE(SELECTEDMEASURE(), SAMEPERIODLASTYEAR(Dates[Date])). This single item works for all 20 base measures automatically. You maintain 4 items instead of 80 measures.",
    microsoftLinks: [
      { text: "Calculation groups", url: "https://learn.microsoft.com/analysis-services/tabular-models/calculation-groups" },
      { text: "SELECTEDMEASURE function", url: "https://learn.microsoft.com/dax/selectedmeasure-function-dax" }
    ]
  },
  {
    id: 12,
    phase: "Cardinality and Cross-Filter",
    scenario: "You're building a model where Students can enroll in many Courses, and each Course has many Students. You create an Enrollment bridge table. When you set up relationships, you're asked to choose cardinality between Enrollment and each dimension.",
    question: "What's the correct cardinality configuration?",
    options: [
      "Many-to-many between Students and Courses directly",
      "One-to-many from Students to Enrollment, One-to-many from Courses to Enrollment — the bridge table handles the many-to-many relationship",
      "One-to-one between all three tables",
      "Many-to-many from each dimension to Enrollment"
    ],
    correctIndex: 1,
    explanation: "A bridge table resolves many-to-many relationships. The correct configuration is: Students → Enrollment (1:M, one student has many enrollment records) and Courses → Enrollment (1:M, one course has many enrollment records). This avoids the performance and ambiguity issues of direct M:M relationships while enabling filtering in both directions through the bridge.",
    microsoftLinks: [
      { text: "Many-to-many relationships", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-many-to-many-relationships" },
      { text: "Relationship cardinality", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-create-and-manage-relationships" }
    ]
  }
];export default questions;
