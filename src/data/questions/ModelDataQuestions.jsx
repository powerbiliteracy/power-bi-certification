// PL-300 Questions: Model the Data domain — 5 per topic

export const modelDataQuestions = [

  // topic: Configure table and column properties
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Configure table and column properties",
    question: "Why should you hide technical columns (like surrogate keys) in the data model?",
    options: ["To reduce model file size","To improve DAX query performance","To simplify the field list for report authors","Hidden columns cannot be used in calculations"],
    correct: 2,
    explanation: "Hiding technical columns simplifies the field list for report authors. Hidden columns still work in relationships and DAX — they're just not visible."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Configure table and column properties",
    question: "What is the purpose of setting a 'Data Category' on a column in Power BI?",
    options: ["It changes the data type of the column","It tells Power BI the semantic meaning (e.g. Country, City, URL) to enable features like map plotting or image rendering","It hides the column from report authors","It applies automatic formatting"],
    correct: 1,
    explanation: "Data Category signals the semantic type of the column — setting Country, State, City enables geographic mapping; setting Image URL renders images in visuals."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Configure table and column properties",
    question: "How do you set a default summarization behaviour for a numeric column so it doesn't auto-sum in visuals?",
    options: ["Delete the column and re-add it","Change the Default Summarization to 'Don't summarize' in the column properties","Make the column a Text type","Hide the column"],
    correct: 1,
    explanation: "Setting Default Summarization to 'Don't summarize' prevents Power BI from automatically aggregating the column when dragged to a visual — important for IDs."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Configure table and column properties",
    question: "What does the 'Sort by Column' feature do in the data model?",
    options: ["Sorts table rows during data load","Allows a column to sort by another column's values (e.g. Month Name sorted by Month Number)","Removes duplicate rows","Changes the column display order in the field list"],
    correct: 1,
    explanation: "Sort by Column enables month names (Jan, Feb...) to sort in calendar order by setting Month Name to sort by Month Number."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Configure table and column properties",
    question: "You rename a column in the model view. What happens to existing DAX measures that reference the old column name?",
    options: ["They automatically update to the new name","They break and must be manually updated to use the new column name","Renaming columns in model view is not possible","They still work because DAX uses internal IDs"],
    correct: 0,
    explanation: "Power BI automatically updates DAX references when a column is renamed in the model view — all measures using that column update to the new name."
  },

  // topic: Implement role-playing dimensions
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Implement role-playing dimensions",
    question: "How do you implement a role-playing dimension (e.g., Date used as both Order Date and Ship Date)?",
    options: ["Create separate duplicate dimension tables for each role","Use one dimension table with multiple relationships — one active, others inactive — and use USERELATIONSHIP() in DAX","Use DAX to duplicate the table at query time","Role-playing dimensions are not supported in Power BI"],
    correct: 1,
    explanation: "Create one dimension table with multiple relationships. The active relationship filters by default; USERELATIONSHIP() activates the inactive one in specific measures."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Implement role-playing dimensions",
    question: "How many active relationships can exist between two tables in Power BI?",
    options: ["Unlimited","Two","One","Depends on the data types"],
    correct: 2,
    explanation: "Only one active relationship can exist between any two tables at a time. Additional relationships must be inactive and activated via USERELATIONSHIP() in DAX."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Implement role-playing dimensions",
    question: "What is the correct DAX syntax to use an inactive relationship in a measure?",
    options: ["ACTIVATERELATIONSHIP([ShipDate], DateTable[Date])","CALCULATE([Sales], USERELATIONSHIP(FactSales[ShipDate], DateTable[Date]))","SWITCH(USERELATIONSHIP(...))","RELATED(DateTable[Date], ShipDate)"],
    correct: 1,
    explanation: "USERELATIONSHIP() is used as a filter modifier inside CALCULATE to activate a specific inactive relationship for that measure's evaluation."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Implement role-playing dimensions",
    question: "What is the downside of duplicate dimension tables for role-playing dimensions?",
    options: ["Duplicate tables cannot have relationships","It increases model size because the dimension data is stored twice","Duplicate tables are not allowed in Power BI","Duplicate tables cause circular dependency errors"],
    correct: 1,
    explanation: "Duplicate tables store the dimension data twice, increasing model size. However, they simplify the model for users who don't need to understand USERELATIONSHIP()."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Implement role-playing dimensions",
    question: "In a model with Order Date and Delivery Date relationships to a Date table, which relationship is typically made active?",
    options: ["Delivery Date — because it's the most recent date","Order Date — because it's typically the primary business date for reporting","Both relationships can be active simultaneously","Neither — you must always use USERELATIONSHIP()"],
    correct: 1,
    explanation: "The Order Date relationship is typically active as it represents the primary business event. Delivery Date measures use USERELATIONSHIP() to activate the inactive path."
  },

  // topic: Define a relationship's cardinality and cross-filter direction
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Define a relationship's cardinality and cross-filter direction",
    question: "What is the most common relationship cardinality in a star schema?",
    options: ["One-to-One (1:1)","One-to-Many (1:*)","Many-to-Many (*:*)","Zero-to-Many (0:*)"],
    correct: 1,
    explanation: "One-to-Many is the most common — dimension tables (one side with unique keys) connect to fact tables (many side with repeated foreign keys)."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Define a relationship's cardinality and cross-filter direction",
    question: "What does 'bidirectional cross-filtering' mean in a relationship?",
    options: ["Filters only flow from the dimension to the fact table","Filters flow in both directions — selecting a value in either table filters the other","Both tables must have the same data type","The relationship applies to both Import and DirectQuery modes"],
    correct: 1,
    explanation: "Bidirectional cross-filtering allows filters to propagate in both directions across a relationship, which can be useful but may cause ambiguous filter paths."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Define a relationship's cardinality and cross-filter direction",
    question: "When is a Many-to-Many relationship cardinality appropriate?",
    options: ["Always — it is more flexible than One-to-Many","When neither side of the relationship has unique key values","When the fact table has fewer rows than the dimension","Never — it should always be avoided"],
    correct: 1,
    explanation: "Many-to-Many is needed when neither table has a unique key — e.g. a student-course mapping where students can take multiple courses and courses have multiple students."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Define a relationship's cardinality and cross-filter direction",
    question: "What is the risk of enabling bidirectional cross-filtering on every relationship in a model?",
    options: ["It makes relationships inactive","It can create ambiguous filter paths causing incorrect DAX results and performance degradation","It prevents slicers from working","It disables time intelligence functions"],
    correct: 1,
    explanation: "Bidirectional filtering on multiple relationships creates ambiguous filter paths where the engine may choose the wrong path, producing incorrect results and slower queries."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Define a relationship's cardinality and cross-filter direction",
    question: "In a standard star schema, what should the cross-filter direction be on the Products-Sales relationship?",
    options: ["Both (bidirectional)","Single — from Products to Sales (dimension filters fact)","Single — from Sales to Products (fact filters dimension)","No cross-filter direction is needed"],
    correct: 1,
    explanation: "Standard star schema relationships use single direction filtering from the dimension (Products) to the fact (Sales). This is the most efficient and unambiguous pattern."
  },

  // topic: Create a common date table
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Create a common date table",
    question: "Why should you create an explicit date table instead of relying on auto date/time?",
    options: ["Auto date/time is more accurate for time intelligence","Auto date/time creates hidden date tables for every date column, significantly bloating the model","Explicit date tables load faster","There is no practical difference"],
    correct: 1,
    explanation: "Auto date/time creates a hidden date table for each date column, bloating the model. One well-designed date table marked as a date table is far more efficient."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Create a common date table",
    question: "What DAX function generates a date table with one row for every date between a start and end date?",
    options: ["DATESBETWEEN()","CALENDAR(start_date, end_date)","CALENDARAUTO()","DATEADD()"],
    correct: 1,
    explanation: "CALENDAR(start_date, end_date) generates a table with one row per date. CALENDARAUTO() automatically determines the range from date columns in the model."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Create a common date table",
    question: "What is required after creating a date table for time intelligence DAX functions to work correctly?",
    options: ["Add a calculated column called 'Year'","Mark the table as a Date Table (right-click > Mark as date table) and specify the date column","Create a relationship to every fact table","Disable auto date/time only"],
    correct: 1,
    explanation: "The date table must be marked as a Date Table with the date column specified. This enables time intelligence functions like TOTALYTD and SAMEPERIODLASTYEAR."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Create a common date table",
    question: "What is the minimum requirement for a date table to support time intelligence calculations?",
    options: ["At least 10 years of dates","One row for every date in the range with no gaps, and no duplicate dates","At least Year, Month, and Quarter columns","A calculated column for fiscal year"],
    correct: 1,
    explanation: "The date table must have one row for every calendar date in the range with no gaps or duplicates. Time intelligence functions iterate over dates and require complete coverage."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Create a common date table",
    question: "A company's fiscal year runs from July 1 to June 30. How do you configure this in TOTALYTD?",
    options: ["Create a separate fiscal year date table","Use TOTALYTD([Measure], DateTable[Date], \"Jun 30\") with the optional fiscal year end argument","This is not supported — TOTALYTD only works for calendar years","Change the date table to start in July"],
    correct: 1,
    explanation: "TOTALYTD accepts an optional third argument for fiscal year end: TOTALYTD([Measure], DateTable[Date], \"Jun 30\") calculates YTD based on the fiscal year."
  },

  // topic: Identify use cases for calculated columns and calculated tables
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Identify use cases for calculated columns and calculated tables",
    question: "When should you use a calculated column instead of a measure?",
    options: ["For dynamic aggregations that respond to slicers","When you need row-level values for filtering, slicing, or hierarchies","For time intelligence calculations","Calculated columns should never be used — always use measures"],
    correct: 1,
    explanation: "Use calculated columns for row-by-row values needed in filtering, slicing, or creating hierarchies. Use measures for dynamic aggregations."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Identify use cases for calculated columns and calculated tables",
    question: "What is a key disadvantage of calculated columns compared to measures?",
    options: ["Calculated columns cannot reference other columns","Calculated columns are stored in the model, increasing file size — measures are calculated on the fly","Calculated columns cannot be used in relationships","Calculated columns do not support DAX functions"],
    correct: 1,
    explanation: "Calculated columns store their values in the model for every row, increasing model size. Measures are computed dynamically and don't use storage."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Identify use cases for calculated columns and calculated tables",
    question: "Which scenario requires a calculated column rather than a measure?",
    options: ["Calculating total sales for the current year","Creating a profit margin % displayed in a card visual","Creating a 'Price Tier' column (High/Medium/Low) to use as a slicer","Calculating year-over-year growth"],
    correct: 2,
    explanation: "A Price Tier column used as a slicer must be a calculated column — slicers require a column, not a measure. Row-level categorization needs a column."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Identify use cases for calculated columns and calculated tables",
    question: "When is a calculated table appropriate in Power BI?",
    options: ["To replace Power Query transformations for large datasets","For date tables, disconnected slicer tables, or combining tables with UNION/CROSSJOIN in DAX","For all lookup tables to improve performance","Calculated tables should never be used"],
    correct: 1,
    explanation: "Calculated tables are best for date tables (CALENDAR), disconnected parameter slicers, and combining/restructuring tables using DAX table functions."
  },
  {
    domain: "model_data", section: "Design and implement a data model",
    topic: "Identify use cases for calculated columns and calculated tables",
    question: "What is the main difference in evaluation context between a calculated column and a measure?",
    options: ["Calculated columns evaluate in filter context; measures evaluate in row context","Calculated columns evaluate row by row during data refresh; measures evaluate dynamically in the current filter context","There is no difference","Calculated columns only work in tables; measures work in any visual"],
    correct: 1,
    explanation: "Calculated columns use row context (evaluated per row at refresh). Measures use filter context (evaluated dynamically based on active filters when the report renders)."
  },

  // topic: Create single aggregation measures
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create single aggregation measures",
    question: "What is the correct syntax for a basic sum measure?",
    options: ["Total Sales = Sales[Amount]","Total Sales = SUM(Sales[Amount])","Total Sales = CALCULATE(Sales[Amount])","Total Sales = Sales.SUM(Amount)"],
    correct: 1,
    explanation: "Measures require an aggregation function. SUM(Sales[Amount]) correctly aggregates the column. A bare column reference without aggregation is invalid in a measure."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create single aggregation measures",
    question: "Which DAX function counts rows in a table including rows with blank values?",
    options: ["COUNT","COUNTA","COUNTROWS","COUNTBLANK"],
    correct: 2,
    explanation: "COUNTROWS counts every row in a table regardless of value. COUNT counts non-blank numeric values. COUNTA counts non-blank values of any type."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create single aggregation measures",
    question: "What is the difference between DISTINCTCOUNT and COUNT in DAX?",
    options: ["No difference","DISTINCTCOUNT counts unique values; COUNT counts all non-blank numeric values including duplicates","DISTINCTCOUNT is faster","COUNT only works on text columns"],
    correct: 1,
    explanation: "DISTINCTCOUNT returns the number of unique values, while COUNT counts all non-blank numeric values including duplicates — important for metrics like unique customers."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create single aggregation measures",
    question: "You want to find the single highest sales amount in a column. Which DAX function should you use?",
    options: ["SUMX","MAX(Sales[Amount])","CALCULATE(SUM(Sales[Amount]))","FIRST(Sales[Amount])"],
    correct: 1,
    explanation: "MAX returns the largest value in a column. It's a simple aggregation measure requiring no additional functions."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create single aggregation measures",
    question: "Where should you store measures in Power BI best practice?",
    options: ["In the fact table they relate to","In a dedicated hidden 'Measures' table for organisation","Measures cannot be moved between tables","In the date table"],
    correct: 1,
    explanation: "Best practice is to store all measures in a dedicated hidden table (often called '_Measures') to keep the model organised and field lists clean."
  },

  // topic: Use the CALCULATE function
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use the CALCULATE function",
    question: "What does the CALCULATE function do?",
    options: ["Performs mathematical calculations like addition and subtraction","Evaluates an expression in a modified filter context","Creates calculated columns in a table","Filters a table to return rows"],
    correct: 1,
    explanation: "CALCULATE evaluates an expression after modifying the filter context. It is the most powerful DAX function — used to override, add, or remove filters."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use the CALCULATE function",
    question: "What does ALL() do when used as a filter argument in CALCULATE?",
    options: ["Adds all rows from a related table","Removes filters from a specified table or column, ignoring slicer and visual selections","Returns all rows sorted by all columns","Applies all existing filters cumulatively"],
    correct: 1,
    explanation: "ALL() removes filters from the specified table or column(s), creating an 'ignore slicer' effect — commonly used to calculate percentage of total."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use the CALCULATE function",
    question: "What is the result of: Sales YTD = CALCULATE([Total Sales], DATESYTD(DateTable[Date]))?",
    options: ["Total sales for the entire year regardless of date filters","Cumulative total sales from the start of the year to the current date in context","Total sales for the current month only","Total sales with all date filters removed"],
    correct: 1,
    explanation: "DATESYTD returns dates from Jan 1 to the last date in the current filter context, giving a running year-to-date total."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use the CALCULATE function",
    question: "Which modifier in CALCULATE keeps the existing filter for a column while adding a new filter?",
    options: ["ALL()","KEEPFILTERS()","REMOVEFILTERS()","ALLEXCEPT()"],
    correct: 1,
    explanation: "KEEPFILTERS() intersects the new filter with the existing filter context rather than replacing it — useful when you want to add conditions without removing existing ones."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use the CALCULATE function",
    question: "What does ALLEXCEPT(Sales, Sales[Region]) do inside CALCULATE?",
    options: ["Removes all filters except the Region filter — Region filter from slicers is preserved","Removes the Region filter and keeps all others","Applies filters to all tables except Sales","Removes all filters from the Sales table completely"],
    correct: 0,
    explanation: "ALLEXCEPT removes all filters from the specified table except the listed columns — in this case Region filters from slicers/visuals are preserved."
  },

  // topic: Implement time intelligence measures
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Implement time intelligence measures",
    question: "Which DAX function calculates Year-To-Date totals?",
    options: ["TOTALYTD or DATESYTD with CALCULATE","YEAR()","DATEADD()","CALENDAR()"],
    correct: 0,
    explanation: "TOTALYTD or CALCULATE with DATESYTD calculates Year-To-Date values. Both require a properly marked date table to work correctly."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Implement time intelligence measures",
    question: "Which DAX function returns the sales for the same period in the prior year?",
    options: ["PREVIOUSYEAR()","CALCULATE([Sales], SAMEPERIODLASTYEAR(DateTable[Date]))","DATEADD(DateTable[Date], -12, MONTH)","LASTDATE(DateTable[Date])"],
    correct: 1,
    explanation: "SAMEPERIODLASTYEAR returns a table of dates one year earlier. Wrapping it in CALCULATE evaluates the measure over that prior year date range."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Implement time intelligence measures",
    question: "What prerequisite must be met for time intelligence functions like TOTALYTD to work correctly?",
    options: ["A date column in the fact table must be the primary key","There must be a dedicated date table marked as a Date Table with a Date column, with no gaps","Auto date/time must be enabled","The date column must be of DateTime type"],
    correct: 1,
    explanation: "Time intelligence requires a marked Date Table with a contiguous Date column covering all dates in the data range — no gaps or duplicates."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Implement time intelligence measures",
    question: "How would you calculate a rolling 3-month total using DAX?",
    options: ["TOTALQTD([Sales], DateTable[Date])","CALCULATE([Sales], DATESINPERIOD(DateTable[Date], LASTDATE(DateTable[Date]), -3, MONTH))","SUM(Sales[Amount]) * 3","CALCULATE([Sales], PREVIOUSQUARTER(DateTable[Date]))"],
    correct: 1,
    explanation: "DATESINPERIOD with a -3 MONTH offset returns dates for the 3-month window ending at the last date in context — giving a rolling 3-month sum."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Implement time intelligence measures",
    question: "What does DATEADD(DateTable[Date], -1, YEAR) return?",
    options: ["Dates shifted one day back","Dates shifted one year back from the current filter context dates","Dates for the first day of the prior year only","Dates for the last year in the date table"],
    correct: 1,
    explanation: "DATEADD shifts the current filter context dates by a specified interval — -1 YEAR shifts every date back exactly one year, enabling prior year comparisons."
  },

  // topic: Use basic statistical functions
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use basic statistical functions",
    question: "What is the difference between AVERAGE and AVERAGEX?",
    options: ["No difference — they return identical results","AVERAGE aggregates a column directly; AVERAGEX iterates over a table evaluating an expression per row","AVERAGEX is faster for large tables","AVERAGE is for numeric columns; AVERAGEX is for text"],
    correct: 1,
    explanation: "AVERAGE calculates the average of a column. AVERAGEX is an iterator that evaluates an expression for each row in a table, then averages the results."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use basic statistical functions",
    question: "Which DAX function calculates the statistical standard deviation of a column of values?",
    options: ["STDEV.P or STDEV.S depending on whether data is population or sample","MEDIAN()","VAR()","SQRT(AVERAGE())"],
    correct: 0,
    explanation: "STDEV.P calculates population standard deviation; STDEV.S calculates sample standard deviation. Choose based on whether your data is a full population or a sample."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use basic statistical functions",
    question: "What does RANKX([Table], [Measure]) return?",
    options: ["The sum of all measure values","The position/rank of the current row's measure value relative to all rows in the specified table","The minimum value in the measure","The percentage rank"],
    correct: 1,
    explanation: "RANKX returns the rank (1 = highest by default) of the current value relative to all values returned by evaluating the expression across the specified table."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use basic statistical functions",
    question: "Which function returns the middle value in a distribution (50th percentile)?",
    options: ["AVERAGE","MEDIAN","MODE","PERCENTILE"],
    correct: 1,
    explanation: "MEDIAN returns the middle value in a sorted distribution — more robust than AVERAGE when data has outliers that would skew the mean."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Use basic statistical functions",
    question: "You want to calculate the weighted average price (total revenue / total units). Which approach is correct?",
    options: ["AVERAGE(Sales[Price])","DIVIDE(SUM(Sales[Revenue]), SUM(Sales[Units]))","AVERAGEX(Sales, Sales[Price] / Sales[Units])","MEDIAN(Sales[Price])"],
    correct: 1,
    explanation: "Weighted average requires dividing the sum of revenue by the sum of units — AVERAGE would give an unweighted average of individual prices, which is incorrect."
  },

  // topic: Create semi-additive measures
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create semi-additive measures",
    question: "A bank account balance should show the end-of-period balance, not a sum over time. Which DAX pattern handles this?",
    options: ["SUM with a date filter","LASTNONBLANK or LASTDATE to get the final value in the period","AVERAGE of the period","COUNT of transactions"],
    correct: 1,
    explanation: "Semi-additive measures like balances use LASTNONBLANK or LASTDATE to return the value at period end rather than summing across time."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create semi-additive measures",
    question: "Which type of measure is considered 'semi-additive'?",
    options: ["Revenue (can be summed across all dimensions)","Headcount or inventory balance (can be summed across some dimensions but not time)","Count of transactions (can be summed across time)","Average price (cannot be summed at all)"],
    correct: 1,
    explanation: "Semi-additive measures like headcount and inventory can be summed across products or regions but not across time — you need the snapshot at a point in time."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create semi-additive measures",
    question: "What does LASTNONBLANK(DateTable[Date], [Measure]) return?",
    options: ["The last date in the date table","The last date for which the measure returns a non-blank/non-zero value","The most recent date in the fact table","The last date of the current month"],
    correct: 1,
    explanation: "LASTNONBLANK returns the last date (or value) for which a given expression evaluates to a non-blank result — useful for finding the most recent snapshot value."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create semi-additive measures",
    question: "A headcount report needs to show total employees at end of each month. Why can't you use SUM for this?",
    options: ["SUM doesn't work with date tables","Summing headcount across months gives a cumulative total rather than the snapshot at month end","SUM can only be used with revenue measures","SUM doesn't work with employee data"],
    correct: 1,
    explanation: "Headcount is a snapshot measure — you want the value at a specific point in time, not a running total. Summing across months gives a meaningless cumulative number."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create semi-additive measures",
    question: "What is the correct DAX measure for end-of-period inventory balance?",
    options: ["Inventory = SUM(Inventory[Balance])","Inventory = CALCULATE(SUM(Inventory[Balance]), LASTDATE(DateTable[Date]))","Inventory = MAX(Inventory[Balance])","Inventory = AVERAGE(Inventory[Balance])"],
    correct: 1,
    explanation: "LASTDATE returns the last date in the current period's context, and wrapping with CALCULATE evaluates the balance at that single end-of-period date."
  },

  // topic: Create a measure by using quick measures
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create a measure by using quick measures",
    question: "What is the best practice after creating a Quick Measure?",
    options: ["Never modify Quick Measure DAX — it is always optimal","Review and optimize the generated DAX code for performance and readability","Delete Quick Measures immediately and rewrite from scratch","Quick Measures cannot be edited"],
    correct: 1,
    explanation: "Quick Measures generate verbose DAX as a starting point. Always review and simplify the generated code for better performance and maintainability."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create a measure by using quick measures",
    question: "Where do you access Quick Measures in Power BI Desktop?",
    options: ["File > Options > Quick Measures","Home tab or right-clicking a table > New Quick Measure","Transform > Quick Measure","Format pane > Measures"],
    correct: 1,
    explanation: "Quick Measures are accessed via the Home tab > Quick Measure button, or by right-clicking a table in the Fields pane and selecting New Quick Measure."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create a measure by using quick measures",
    question: "Which calculation types can Quick Measures generate automatically?",
    options: ["Power Query transformations","Calculations like Year-over-Year change, Running total, Rolling average, and Percentage of total","Calculated tables","Data type conversions"],
    correct: 1,
    explanation: "Quick Measures can generate common calculations like YoY change, running totals, rolling averages, percentage of total, and more — without writing DAX manually."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create a measure by using quick measures",
    question: "Can a Quick Measure be used across multiple reports?",
    options: ["No — Quick Measures are report-specific","Yes — since they are stored in the semantic model, they can be used in any report connected to that model","Only if the report is in the same workspace","Only with Premium capacity"],
    correct: 1,
    explanation: "Quick Measures are stored in the data model like any other measure — once created, they're available to any report connected to that semantic model."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create a measure by using quick measures",
    question: "What should you check when a Quick Measure for 'Year-over-Year change' returns blank values?",
    options: ["The measure field must be a text column","The date table may not be marked as a date table, or the date range may not include the prior year","Quick Measures don't support YoY calculations","The visual type is incompatible with Quick Measures"],
    correct: 1,
    explanation: "YoY Quick Measures rely on time intelligence which requires a marked date table and sufficient date range (at least 2 years) to return prior year comparisons."
  },

  // topic: Create calculated tables or columns
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculated tables or columns",
    question: "When is it appropriate to use a calculated table?",
    options: ["For all data loading — calculated tables replace Power Query","For date tables, disconnected parameter tables, or combining tables with UNION/CROSSJOIN","Never — Power Query should always be used instead","Only for text lookup tables"],
    correct: 1,
    explanation: "Calculated tables are appropriate for date tables (CALENDAR/CALENDARAUTO), disconnected slicers, and combining tables. Prefer Power Query for ETL transformations."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculated tables or columns",
    question: "What DAX function creates a calculated table containing all combinations of rows from two tables?",
    options: ["UNION","INTERSECT","CROSSJOIN","NATURALINNERJOIN"],
    correct: 2,
    explanation: "CROSSJOIN returns every combination (Cartesian product) of rows from both tables — commonly used to create disconnected slicer tables with measure combinations."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculated tables or columns",
    question: "What is a key limitation of calculated columns vs Power Query columns?",
    options: ["Calculated columns can't reference other columns","Calculated columns are recalculated at each refresh, use DAX row context, and increase model storage","Calculated columns don't support text data types","Calculated columns can't be used in visuals"],
    correct: 1,
    explanation: "Calculated columns store values per row (increasing size), are recalculated at each refresh, and are limited to DAX row context (no M transformations)."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculated tables or columns",
    question: "You need a disconnected slicer with values 'Budget', 'Actual', 'Forecast'. How would you create this as a calculated table?",
    options: ["Create a Power Query query with these values","Use DAX: Scenarios = DATATABLE(\"Scenario\", STRING, {{\"Budget\"},{\"Actual\"},{\"Forecast\"}})","Use ROW() to create individual rows","Import from Excel"],
    correct: 1,
    explanation: "DATATABLE allows you to define a table with explicit values in DAX — perfect for small disconnected parameter tables used as slicers."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculated tables or columns",
    question: "What does RELATED() do in a calculated column context?",
    options: ["Creates a relationship between two tables","Retrieves a value from a related table via an existing relationship, traversing from the many side to the one side","Returns all related rows from the other table","Removes the relationship between tables"],
    correct: 1,
    explanation: "RELATED() fetches a single value from a related table (one side) using the existing model relationship — only valid in row context (calculated columns or iterators)."
  },

  // topic: Create calculation groups
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculation groups",
    question: "What is the primary benefit of calculation groups?",
    options: ["Faster query performance on large models","Apply the same calculation pattern (e.g. YTD, Prior Year) across multiple measures without duplicating DAX","Better visual formatting options","Simplified data refresh configuration"],
    correct: 1,
    explanation: "Calculation groups define reusable calculation items (like YTD, % Growth, Prior Year) that can be applied to any measure, eliminating DAX duplication."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculation groups",
    question: "Where can you create calculation groups in Power BI?",
    options: ["In Power Query Editor","In Power BI Desktop's Model view (via Tabular Editor external tool or DAX query view)","In the Format pane","In Power BI Service"],
    correct: 1,
    explanation: "Calculation groups are created in the semantic model — typically via Tabular Editor (an external tool) or the DAX model editor, not in the standard Power BI Desktop UI."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculation groups",
    question: "What DAX keyword in a calculation item refers to the measure being modified by the calculation group?",
    options: ["CURRENTMEASURE","THISMEASURE()","SELECTEDMEASURE()","MEASURE()"],
    correct: 2,
    explanation: "SELECTEDMEASURE() (or SELECTEDMEASURENAME() for the name) refers to whichever measure is being evaluated through the calculation group item."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculation groups",
    question: "A user creates a 'Time Intelligence' calculation group with items: Actual, YTD, Prior Year. What slicer appears in the report?",
    options: ["A date slicer","A slicer based on the calculation group's name column allowing users to select Actual, YTD, or Prior Year","A measure slicer","No slicer — calculation groups only work with existing slicers"],
    correct: 1,
    explanation: "The calculation group appears as a table in the field list with a Name column — dragging it to a slicer lets users switch between Actual, YTD, Prior Year, etc."
  },
  {
    domain: "model_data", section: "Create model calculations by using DAX",
    topic: "Create calculation groups",
    question: "How does a YTD calculation item in a calculation group look in DAX?",
    options: ["YTD = TOTALYTD([Total Sales], DateTable[Date])","YTD = CALCULATE(SELECTEDMEASURE(), DATESYTD(DateTable[Date]))","YTD = CALCULATE(SUM(Sales[Amount]), DATESYTD(DateTable[Date]))","YTD = SELECTEDMEASURE() + TOTALYTD()"],
    correct: 1,
    explanation: "CALCULATE(SELECTEDMEASURE(), DATESYTD(DateTable[Date])) applies the YTD date filter to whatever measure is currently selected — making it reusable across all measures."
  },

  // topic: Improve performance by identifying and removing unnecessary rows and columns
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by identifying and removing unnecessary rows and columns",
    question: "Where should you remove unnecessary columns for maximum performance benefit?",
    options: ["In the data model view using Hide","In Power Query before loading — prevents columns entering the model","Using DAX to exclude them","In the visual's field well"],
    correct: 1,
    explanation: "Removing columns in Power Query prevents them from loading into memory entirely. Hiding in the model still loads the data — it just isn't visible."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by identifying and removing unnecessary rows and columns",
    question: "Why do high-cardinality columns (like GUID or timestamp) hurt model performance?",
    options: ["They cause data type errors","High-cardinality columns compress poorly in VertiPaq, significantly increasing model size and slowing queries","They cannot be used in relationships","They always cause refresh failures"],
    correct: 1,
    explanation: "VertiPaq's compression is most effective on low-cardinality columns. High-cardinality columns like GUIDs or free-text have poor compression ratios."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by identifying and removing unnecessary rows and columns",
    question: "Which tool helps you identify which columns consume the most memory in a Power BI model?",
    options: ["Performance Analyzer","DAX Studio with VertiPaq Analyzer (or the built-in DAX query view)","Power Query Editor","SQL Server Management Studio"],
    correct: 1,
    explanation: "DAX Studio's VertiPaq Analyzer (or Power BI Desktop's DAX query view) shows detailed memory consumption per table and column — essential for model optimization."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by identifying and removing unnecessary rows and columns",
    question: "A fact table has a 'Notes' free-text column that is never used in analysis. What should you do?",
    options: ["Keep it — it doesn't impact performance","Remove it in Power Query to prevent it from loading into the model","Hide it in the model view","Change its data type to Integer"],
    correct: 1,
    explanation: "Free-text columns have very high cardinality and poor compression. Removing unused text columns in Power Query is one of the highest-impact size reduction steps."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by identifying and removing unnecessary rows and columns",
    question: "What is the benefit of filtering out historical data that users never query (e.g. data older than 5 years)?",
    options: ["No benefit — Power BI handles all row counts equally","Fewer rows means smaller model size, faster refresh, and faster query response","Reduces the number of measures needed","Allows more relationships to be created"],
    correct: 1,
    explanation: "Reducing row count reduces model size, refresh time, and query time. Filtering out unused historical rows in Power Query is a simple and effective optimization."
  },

  // topic: Identify poorly performing measures by using Performance Analyzer
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view",
    question: "What does Performance Analyzer measure in Power BI Desktop?",
    options: ["Only visual rendering time","DAX query duration, visual display time, and other query operations per visual","Only data refresh time","Network latency to Power BI Service"],
    correct: 1,
    explanation: "Performance Analyzer records timing for each visual broken into DAX query, visual display, and other operations, helping identify which visuals are slow."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view",
    question: "Where do you access Performance Analyzer in Power BI Desktop?",
    options: ["File > Options > Performance","View tab > Performance Analyzer","Modeling tab > Optimize","Format pane > Performance"],
    correct: 1,
    explanation: "Performance Analyzer is found in the View tab in Power BI Desktop. Click 'Start recording', then interact with the report to capture query timings."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view",
    question: "A visual shows 5 seconds for 'DAX query' and 0.1 seconds for 'Visual display'. What does this indicate?",
    options: ["The visual rendering engine is the bottleneck","The DAX measure or model query is the bottleneck — not the visual rendering","The data source connection is slow","The report theme is causing the delay"],
    correct: 1,
    explanation: "High DAX query time indicates the measure, model structure, or DAX itself is slow. High visual display time indicates the chart rendering is the bottleneck."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view",
    question: "What feature in Performance Analyzer allows you to test DAX query improvements directly?",
    options: ["The 'Copy Query' button exports the DAX query so you can analyze and optimize it in DAX Studio or the DAX query view","The 'Optimize' button automatically improves the query","The 'Export' button sends the query to SQL Server","The 'Benchmark' button runs the query multiple times"],
    correct: 0,
    explanation: "Performance Analyzer's 'Copy Query' button exports the auto-generated DAX query for a visual, which you can paste into DAX Studio or the DAX query view for optimization."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view",
    question: "Bidirectional cross-filtering on multiple relationships is identified as causing slow queries. What is the recommended fix?",
    options: ["Remove all relationships","Switch to single-direction filtering on relationships where bidirectionality is not required","Add more measures to compensate","Upgrade to Premium capacity"],
    correct: 1,
    explanation: "Bidirectional filtering on unnecessary relationships creates ambiguous filter paths that the engine must resolve, slowing queries. Use single direction unless bidirectional is truly needed."
  },

  // topic: Improve performance by reducing granularity
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by reducing granularity",
    question: "When should you pre-aggregate data to improve performance?",
    options: ["Always — pre-aggregation is always better","When users only need summary-level data and the full detail is too large to store efficiently","Never — always keep full granularity","Only for text columns"],
    correct: 1,
    explanation: "Pre-aggregate when users only need monthly totals but source data is daily transactions. This reduces row count and improves refresh and query speed."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by reducing granularity",
    question: "What is an 'aggregation table' in Power BI and how does it improve performance?",
    options: ["A table that stores all DAX measure results","A pre-summarized table at a higher granularity that Power BI automatically uses instead of the detail table when possible","A table that replaces the fact table for all queries","A table that stores query cache results"],
    correct: 1,
    explanation: "Aggregation tables store pre-computed summaries. Power BI's aggregation feature routes queries to the aggregation table when detail granularity isn't needed, dramatically improving speed."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by reducing granularity",
    question: "A time column stores data at the second level. Users only ever filter by date. What optimization should you apply?",
    options: ["Keep the timestamp — it provides more flexibility","Truncate the timestamp to date only (remove the time component) to reduce cardinality and improve compression","Convert to text","Change the visual to only show dates"],
    correct: 1,
    explanation: "Removing the time component from a date/time column dramatically reduces cardinality (from millions of unique timestamps to thousands of unique dates), improving compression."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by reducing granularity",
    question: "What is the impact of storing transaction-level data (50M rows) vs daily-aggregated data (5K rows) when users only need daily totals?",
    options: ["No difference — Power BI handles both sizes equally","50M rows loads slower, uses more memory, and queries run slower vs 5K rows which is dramatically faster for daily totals","The transaction data provides more accurate results","Daily aggregation is not supported in Power BI"],
    correct: 1,
    explanation: "Reducing from 50M to 5K rows through daily aggregation dramatically reduces model size, refresh time, and query time when daily granularity is all that's needed."
  },
  {
    domain: "model_data", section: "Optimize model performance",
    topic: "Improve performance by reducing granularity",
    question: "What is 'Incremental refresh' and how does it reduce load on a large table?",
    options: ["It refreshes only new or changed data rather than reloading the entire table, reducing refresh time and source load","It automatically aggregates data during refresh","It removes old rows during refresh to keep the table small","It compresses data during each refresh cycle"],
    correct: 0,
    explanation: "Incremental refresh loads only the recent window of data (e.g. last 2 days) rather than the entire table, dramatically reducing refresh duration and source database load."
  }
];
