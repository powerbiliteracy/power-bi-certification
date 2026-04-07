// Content for "Visualize and analyze the data" domain topics

export const visualizeAnalyzeContent = {
  "Add visualizations to a report": {
    overview: {
      title: "Building Interactive Reports with Visuals",
      concepts: [
        "Visuals are the primary way users interact with data in Power BI reports",
        "Drag fields from Fields pane to canvas or visual field wells",
        "Each visual type has specific field wells (Axis, Values, Legend, etc.)",
        "Multiple visuals on same page interact through cross-filtering",
        "Report canvas is 16:9 ratio by default, customizable"
      ]
    },
    bestPractices: [
      "Start with clear objective for each visual (what question does it answer?)",
      "Use appropriate visual type for data and message",
      "Limit visuals per page to 5-7 for readability and performance",
      "Align and size visuals consistently using alignment tools",
      "Test cross-filtering interactions between visuals",
      "Use visual headers and titles to provide context"
    ],
    commonMistakes: [
      "Too many visuals on one page (cluttered, slow)",
      "Wrong visual type for data (pie chart for 20 categories)",
      "Not aligning visuals properly (looks unprofessional)",
      "Forgetting to add titles or making titles unclear",
      "Not considering mobile layout when adding visuals",
      "Overlapping visuals or inconsistent spacing"
    ],
    keySteps: [
      "Select visual type from Visualizations pane",
      "Drag fields to appropriate field wells (Axis, Values, Legend, etc.)",
      "Resize visual by dragging corners or edges",
      "Move visual by clicking and dragging",
      "Format visual using Format pane (colors, labels, titles)",
      "Add title: Format visual > General > Title > On",
      "Test interactions with filters and other visuals"
    ],
    keyDecisions: [
      "**Which visual type?** - Based on data type and analytical goal (trends, comparison, composition, distribution)",
      "**How many visuals per page?** - 3-7 optimal; More: consider multiple pages",
      "**Desktop or mobile priority?** - Desktop: standard layout; Mobile: mobile-optimized layout",
      "**Interactive or static?** - Interactive: enable cross-filtering; Static: disable interactions",
      "**Custom or standard visuals?** - Standard sufficient: use built-in; Special needs: custom visuals from AppSource"
    ],
    keyDefinitions: [
      "**Visual**: Graphical representation of data (chart, table, map, etc.)",
      "**Field Well**: Drop zone where you place fields to configure visual (Axis, Values, Legend)",
      "**Canvas**: Report page surface where visuals are placed",
      "**Cross-filtering**: When selecting data in one visual filters other visuals",
      "**Visual Header**: Menu appearing on hover with filter, focus mode, and export options",
      "**Custom Visual**: Third-party visualization from AppSource marketplace"
    ],
    risks: [
      "**Performance issues**: Too many visuals slow report loading",
      "**User confusion**: Unclear purpose or too complex visuals",
      "**Poor mobile experience**: Desktop-only design doesn't work on mobile",
      "**Accessibility issues**: Visuals without alt text or proper colors",
      "**Data security**: Accidentally exposing sensitive data in visuals",
      "**Maintenance burden**: Complex custom visuals may break with updates"
    ],
    faqs: [
      {
        q: "How do I add a visual to my report?",
        a: "Click visual type in Visualizations pane, then drag fields from Fields pane to the visual's field wells."
      },
      {
        q: "How many visuals should I have on one page?",
        a: "5-7 visuals is optimal for readability and performance. More visuals = slower loading and cluttered page."
      },
      {
        q: "Can I copy visuals between pages?",
        a: "Yes - Ctrl+C to copy, navigate to other page, Ctrl+V to paste. Or right-click > Copy visual, then Paste."
      },
      {
        q: "How do I align multiple visuals?",
        a: "Select multiple visuals (Ctrl+Click), then Format tab > Align > choose alignment option (left, center, distribute, etc.)."
      },
      {
        q: "What's the difference between built-in and custom visuals?",
        a: "Built-in: included with Power BI, fully supported. Custom: from AppSource, created by Microsoft or third parties."
      }
    ],
    examTips: [
      "Know how to add visuals by clicking type then dragging fields to wells",
      "Remember field wells vary by visual type (Axis, Values, Legend, etc.)",
      "Understand cross-filtering between visuals on same page",
      "Know alignment tools help create professional-looking reports",
      "Recognize 5-7 visuals per page as best practice for performance"
    ],
    resources: [
      {
        title: "Visualization types in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a",
        type: "Documentation"
      },
      {
        title: "Add visualizations to a Power BI report",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-report-add-visualizations-i",
        type: "Documentation"
      }
    ]
  },

  "Choose an appropriate visualization type": {
    overview: {
      title: "Selecting the Right Visual for Your Data Story",
      concepts: [
        "Different visual types serve different analytical purposes",
        "Choose based on data type (categorical, time series, geographic, hierarchical)",
        "Consider message: comparison, trend, composition, distribution, relationship",
        "Some visuals work better for few categories, others for many",
        "User familiarity matters - common charts are easier to understand"
      ]
    },
    bestPractices: [
      "Bar/Column charts: Compare categories (3-15 categories optimal)",
      "Line charts: Show trends over time",
      "Pie/Donut charts: Show composition (maximum 5-6 slices)",
      "Tables/Matrix: Display detailed data or exact values",
      "Cards: Highlight single important KPI",
      "Maps: Geographic data analysis",
      "Scatter charts: Show correlation between two measures"
    ],
    commonMistakes: [
      "Pie charts with too many slices (use bar chart instead)",
      "Line charts for non-time data (use bar/column instead)",
      "3D charts (distort perception, use 2D)",
      "Choosing flashy over functional (clarity > style)",
      "Not considering colorblind accessibility",
      "Using wrong chart creating misleading visualizations"
    ],
    keySteps: [
      "Identify analytical goal (comparison, trend, composition, distribution, relationship)",
      "Consider data characteristics (categorical, time series, number of categories)",
      "Select visual type from Visualizations pane",
      "Add data to appropriate field wells",
      "Review if message is clear - if not, try different visual type",
      "Format for clarity (labels, colors, titles)"
    ],
    keyDecisions: [
      "**Comparison?** - Bar/Column chart (few categories) or Table (many categories)",
      "**Trend over time?** - Line chart (continuous) or Column chart (discrete periods)",
      "**Composition/Part-to-whole?** - Pie/Donut (few parts) or Stacked bar (many parts)",
      "**Distribution?** - Histogram or Box plot for statistical distribution",
      "**Relationship/Correlation?** - Scatter chart for two measures",
      "**Geographic data?** - Map (Filled map for regions, Bubble map for locations)"
    ],
    keyDefinitions: [
      "**Comparison Visual**: Shows relative values across categories (bar, column)",
      "**Trend Visual**: Displays changes over time (line, area)",
      "**Composition Visual**: Shows part-to-whole relationships (pie, donut, stacked bar)",
      "**Distribution Visual**: Shows data spread and frequency (histogram)",
      "**Relationship Visual**: Shows correlation between variables (scatter, bubble)",
      "**Geospatial Visual**: Displays data on maps (map, filled map, shape map)"
    ],
    risks: [
      "**Misleading visualizations**: Wrong chart type distorts message",
      "**User confusion**: Unfamiliar chart types require explanation",
      "**Accessibility issues**: Some visuals harder for visually impaired users",
      "**Performance problems**: Complex visuals slow on large datasets",
      "**Mobile incompatibility**: Some visuals don't work well on small screens",
      "**Data overload**: Too much data in single visual loses clarity"
    ],
    faqs: [
      {
        q: "What's the best chart for comparing sales across products?",
        a: "Bar or column chart. Bar for many products (easier to read labels), column for fewer products with time dimension."
      },
      {
        q: "When should I use a pie chart?",
        a: "Only for part-to-whole with 2-6 categories maximum. For more categories, use bar chart instead."
      },
      {
        q: "What's the difference between bar and column charts?",
        a: "Bar = horizontal bars, better for long category names. Column = vertical bars, better for time-based data."
      },
      {
        q: "How do I show trends over time?",
        a: "Line chart for continuous trends. Column chart for discrete periods (monthly, yearly) comparison."
      },
      {
        q: "What chart shows correlation between two measures?",
        a: "Scatter chart with one measure on X-axis, another on Y-axis. Add size/color for third dimension."
      }
    ],
    examTips: [
      "Know bar/column for comparison, line for trends, pie for composition",
      "Remember pie charts only for 2-6 categories maximum",
      "Understand scatter charts show correlation between two measures",
      "Know maps for geographic data analysis",
      "Recognize tables/matrix for detailed data or exact values"
    ],
    resources: [
      {
        title: "Visualization types in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a",
        type: "Documentation"
      },
      {
        title: "Tips for choosing visualizations",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-report-visualizations",
        type: "Documentation"
      }
    ]
  },

  "Configure and format visualizations, including reference lines and error bars": {
    overview: {
      title: "Enhancing Visuals with Formatting and Analytics",
      concepts: [
        "Format pane controls visual appearance (colors, labels, titles, legends)",
        "Analytics pane adds statistical features (reference lines, forecasting, trend lines)",
        "Reference lines show targets, averages, or thresholds",
        "Error bars display confidence intervals or standard deviation",
        "Formatting improves clarity and aligns with brand guidelines"
      ]
    },
    bestPractices: [
      "Use reference lines to highlight targets or benchmarks",
      "Add data labels when exact values are important",
      "Choose accessible color palettes (colorblind-friendly)",
      "Add meaningful titles that describe insight, not just field name",
      "Use consistent formatting across similar visuals",
      "Enable error bars for statistical analysis to show confidence"
    ],
    commonMistakes: [
      "Over-formatting creating visual clutter",
      "Using inaccessible color combinations (red/green for colorblind)",
      "Not labeling reference lines (unclear what they represent)",
      "Inconsistent formatting across report pages",
      "Hiding axes or labels making data hard to interpret",
      "Adding too many reference lines (confusing)"
    ],
    keySteps: [
      "Select visual > Format pane (paint roller icon)",
      "Configure sections: Visual > General > Title, Legend, Data labels",
      "Add reference line: Analytics pane > Add > Constant line, Average line, etc.",
      "Configure reference line: Value, Color, Label",
      "Add error bars: Analytics pane > Add > Error bars (select standard deviation or confidence interval)",
      "Apply theme: View tab > Themes for consistent formatting"
    ],
    keyDecisions: [
      "**Which reference line type?** - Fixed target: Constant; Benchmark: Average/Median/Min/Max",
      "**Show data labels?** - Precise values important: yes; Trend matters more: no",
      "**Error bars needed?** - Statistical analysis: yes; Simple reporting: no",
      "**Custom or theme colors?** - Brand consistency: theme; Specific needs: custom",
      "**Legend position?** - Few categories: top/bottom; Many: side; None if obvious"
    ],
    keyDefinitions: [
      "**Format Pane**: Controls visual appearance (colors, fonts, labels, titles)",
      "**Analytics Pane**: Adds analytical features (reference lines, forecasting, trend lines)",
      "**Reference Line**: Horizontal or vertical line showing target, average, or threshold",
      "**Error Bars**: Lines showing data variability, confidence intervals, or standard deviation",
      "**Data Labels**: Values displayed on data points in visual",
      "**Theme**: Pre-defined color and formatting scheme applied across report"
    ],
    risks: [
      "**Accessibility violations**: Poor color choices exclude colorblind users",
      "**Visual clutter**: Too much formatting reduces clarity",
      "**Misleading visuals**: Incorrect reference lines or error bars misrepresent data",
      "**Performance impact**: Heavy formatting on many visuals slows rendering",
      "**Inconsistency**: Different formatting confuses users",
      "**Lost context**: Missing titles or labels make visuals ambiguous"
    ],
    faqs: [
      {
        q: "How do I add a target line to my chart?",
        a: "Select chart > Analytics pane > Add > Constant line > Set value to target > Configure color and label."
      },
      {
        q: "What types of reference lines are available?",
        a: "Constant (fixed value), Min, Max, Average, Median, Percentile. Can be horizontal or vertical depending on chart."
      },
      {
        q: "How do I add error bars?",
        a: "Select visual > Analytics pane > Add > Error bars > Choose standard deviation, standard error, or confidence interval."
      },
      {
        q: "Can I format multiple visuals at once?",
        a: "No directly, but apply report theme for consistent colors/fonts, or use Format Painter (preview feature)."
      },
      {
        q: "How do I make visuals accessible for colorblind users?",
        a: "Use colorblind-safe palettes, add data labels, use patterns/shapes in addition to colors."
      }
    ],
    examTips: [
      "Know reference lines show targets, averages, or thresholds",
      "Remember Analytics pane for reference lines, error bars, trend lines",
      "Understand Format pane for colors, labels, titles, legends",
      "Know error bars display confidence intervals or standard deviation",
      "Recognize consistent formatting improves report professionalism"
    ],
    resources: [
      {
        title: "Format visualizations in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-customize-title-background-and-legend",
        type: "Documentation"
      },
      {
        title: "Use the Analytics pane",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-analytics-pane",
        type: "Documentation"
      }
    ]
  },

  "Apply slicing and filtering": {
    overview: {
      title: "Interactive Data Filtering in Reports",
      concepts: [
        "Slicers are visual filters users can interact with on report pages",
        "Filter pane has three levels: Visual, Page, and Report (all pages)",
        "Filters can be basic (list), advanced (conditions), or top N",
        "Slicers provide better user experience than filter pane for common filters",
        "Sync slicers across pages for consistent filtering"
      ]
    },
    bestPractices: [
      "Use slicers for filters users change frequently (Date, Category, Region)",
      "Use filter pane for background filters users don't need to see",
      "Place slicers consistently in same location across pages",
      "Sync slicers across pages when same filter applies to multiple pages",
      "Use date slicer with relative date filtering (Last 30 days, This Month)",
      "Limit slicers to 3-5 per page to avoid clutter"
    ],
    commonMistakes: [
      "Too many slicers cluttering the page",
      "Not syncing slicers across pages (inconsistent filtering)",
      "Using filter pane when slicer would be more user-friendly",
      "Not setting default filter values for common scenarios",
      "Forgetting to clear slicer selections during testing",
      "Not considering mobile layout for slicers"
    ],
    keySteps: [
      "**Add Slicer**: Select Slicer icon in Visualizations > Add field",
      "**Format Slicer**: Format pane > Slicer settings (dropdown, list, date range, etc.)",
      "**Apply Filter**: Filters pane > Drag field to Visual/Page/Report level",
      "**Advanced Filter**: Set filter type (Basic, Advanced, Top N, Relative date)",
      "**Sync Slicers**: View tab > Sync slicers > Select pages to sync",
      "**Default Selection**: Edit interactions or use bookmarks for default state"
    ],
    keyDecisions: [
      "**Slicer or Filter pane?** - User controls: Slicer; Background filter: Filter pane",
      "**Slicer style?** - Few values: List; Many: Dropdown; Dates: Date range slider",
      "**Filter level?** - One visual: Visual-level; Page: Page-level; All pages: Report-level",
      "**Sync across pages?** - Same filter applies: Yes; Page-specific: No",
      "**Default selection?** - Common scenario: Set default; User choice: No default"
    ],
    keyDefinitions: [
      "**Slicer**: Visual filter control users interact with on report page",
      "**Filter Pane**: Panel with Visual, Page, and Report level filters",
      "**Visual-level Filter**: Filters single visual only",
      "**Page-level Filter**: Filters all visuals on current page",
      "**Report-level Filter**: Filters all pages in report",
      "**Sync Slicers**: Feature that keeps slicer selections synchronized across pages"
    ],
    risks: [
      "**User confusion**: Too many slicers or unclear filter state",
      "**Performance issues**: Complex filters on large datasets slow visuals",
      "**Inconsistent filtering**: Not syncing slicers causes confusion",
      "**Hidden data**: Aggressive filters may hide relevant data",
      "**Mobile problems**: Slicers may not work well on small screens",
      "**Filter conflicts**: Multiple filters creating empty results"
    ],
    faqs: [
      {
        q: "What's the difference between slicer and filter?",
        a: "Slicer: visible on report page, users interact with. Filter pane: background filters, typically hidden from users."
      },
      {
        q: "How do I sync slicers across pages?",
        a: "View tab > Sync slicers > Check pages where slicer should appear and sync to."
      },
      {
        q: "What are the three filter levels?",
        a: "Visual-level (one visual), Page-level (all visuals on page), Report-level (all pages in report)."
      },
      {
        q: "How do I create a date range slicer?",
        a: "Add slicer > Add date field > Format slicer > Style > Between (for date range slider)."
      },
      {
        q: "Can I set default slicer selections?",
        a: "Yes - make selection, create bookmark, set as default. Or use Page load actions with bookmarks."
      }
    ],
    examTips: [
      "Know three filter levels: Visual, Page, Report",
      "Remember slicers are visual filters users interact with",
      "Understand sync slicers feature for consistent filtering across pages",
      "Know filter types: Basic (list), Advanced (conditions), Top N, Relative date",
      "Recognize when to use slicers vs filter pane"
    ],
    resources: [
      {
        title: "Add a slicer to a report",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-slicers",
        type: "Documentation"
      },
      {
        title: "Sync and use slicers on other pages",
        url: "https://learn.microsoft.com/power-bi/create-reports/power-bi-slicer-sync",
        type: "Documentation"
      }
    ]
  },

  "Configure conditional formatting": {
    overview: {
      title: "Dynamic Visual Formatting Based on Values",
      concepts: [
        "Conditional formatting changes visual appearance based on data values",
        "Available for tables, matrix, and some chart visuals",
        "Types: Background color, Font color, Data bars, Icons",
        "Rules-based (greater than, between) or field-based (color from column)",
        "Highlights important values, trends, or outliers automatically"
      ]
    },
    bestPractices: [
      "Use color scales to show gradients (heat maps)",
      "Use icons (arrows, shapes) for status indicators",
      "Use data bars to show magnitude within cells",
      "Choose accessible color combinations",
      "Don't over-use - too much formatting creates visual noise",
      "Test conditional formatting with various data scenarios"
    ],
    commonMistakes: [
      "Using too many conditional formatting rules (cluttered)",
      "Inaccessible color choices (red/green only for colorblind users)",
      "Not setting appropriate min/max values for color scales",
      "Applying conditional formatting to wrong field",
      "Forgetting to test with different data ranges",
      "Inconsistent conditional formatting across similar visuals"
    ],
    keySteps: [
      "Select table/matrix visual",
      "Click dropdown arrow on field in Values well",
      "Choose Conditional formatting option (Background color, Font color, Data bars, Icons)",
      "Select format style: Gradient, Rules, or Field value",
      "Configure rules (greater than, less than, between) or color scale",
      "Set colors, icons, or bar styles",
      "Preview and adjust thresholds as needed"
    ],
    keyDecisions: [
      "**Which type?** - Magnitude: Data bars; Categories: Icons; Continuous scale: Color gradient",
      "**Rules or gradient?** - Fixed thresholds: Rules; Relative values: Gradient",
      "**Which colors?** - Negative/Positive: Red/Green (with patterns); Performance: Red/Yellow/Green",
      "**Apply to values or totals?** - Data only: Values only; Include summaries: Values and totals",
      "**Background or font color?** - Subtle: Font color; Prominent: Background color"
    ],
    keyDefinitions: [
      "**Conditional Formatting**: Dynamic formatting applied based on data values or rules",
      "**Background Color**: Cell background color based on value",
      "**Font Color**: Text color based on value",
      "**Data Bars**: Horizontal bars within cells showing magnitude",
      "**Icons**: Symbols (arrows, shapes, indicators) based on value ranges",
      "**Color Scale**: Gradient from min to max value colors"
    ],
    risks: [
      "**Accessibility issues**: Color-only formatting excludes colorblind users",
      "**Misleading formatting**: Wrong thresholds misrepresent data significance",
      "**Visual overload**: Too much formatting reduces clarity",
      "**Performance impact**: Complex rules on large tables slow rendering",
      "**Maintenance burden**: Hardcoded thresholds need updating as data changes",
      "**Context loss**: Formatting without legend confuses users"
    ],
    faqs: [
      {
        q: "How do I add conditional formatting to a table?",
        a: "Select table > Click dropdown on field in Values well > Conditional formatting > Choose type (Background color, Icons, etc.)."
      },
      {
        q: "What types of conditional formatting are available?",
        a: "Background color, Font color, Data bars, Icons. Available on tables, matrix, and some chart visuals."
      },
      {
        q: "Can I use conditional formatting based on another column?",
        a: "Yes - in conditional formatting dialog, choose 'Field value' and select the column containing values or colors."
      },
      {
        q: "How do I create a heat map?",
        a: "Use matrix with conditional formatting > Background color > Gradient from low to high values."
      },
      {
        q: "Can I combine multiple conditional formatting rules?",
        a: "Yes - apply different formatting types to same or different fields (e.g., background color + icons)."
      }
    ],
    examTips: [
      "Know conditional formatting types: Background color, Font color, Data bars, Icons",
      "Remember conditional formatting available on tables, matrix, and some charts",
      "Understand gradient vs rules-based formatting",
      "Know icons used for status indicators (arrows, shapes)",
      "Recognize field-based formatting uses values from another column"
    ],
    resources: [
      {
        title: "Conditional formatting in tables and matrix",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-conditional-table-formatting",
        type: "Documentation"
      },
      {
        title: "Use conditional formatting in visuals",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-conditional-formatting",
        type: "Documentation"
      }
    ]
  },

  "Use built-in AI visuals": {
    overview: {
      title: "Leveraging AI-Powered Analytics Visuals",
      concepts: [
        "AI visuals use machine learning to provide insights automatically",
        "Key Influencers: Identifies factors affecting a metric",
        "Decomposition Tree: Interactive drill-down to explore data hierarchies",
        "Q&A: Natural language query interface for data exploration",
        "Smart Narrative: Auto-generated text summary of visual insights",
        "Anomaly Detection: Identifies unusual patterns in time series"
      ]
    },
    bestPractices: [
      "Use Key Influencers to explain what drives KPIs up or down",
      "Use Decomposition Tree for exploratory analysis of hierarchies",
      "Add Q&A visual for power users who prefer natural language",
      "Use Smart Narrative to explain insights in reports",
      "Anomaly Detection for monitoring time series data",
      "Test AI visuals with clean, quality data for best results"
    ],
    commonMistakes: [
      "Using AI visuals with insufficient data (need enough rows)",
      "Not explaining how to use Q&A to users",
      "Overusing AI visuals when simple charts suffice",
      "Not reviewing AI-generated insights for accuracy",
      "Poor data quality leading to meaningless AI insights",
      "Not configuring Q&A synonyms for domain-specific terms"
    ],
    keySteps: [
      "**Key Influencers**: Add visual > Set Analyze field and Explain by fields > Review influences",
      "**Decomposition Tree**: Add visual > Set Analyze field > Add Explain by fields > Expand tree interactively",
      "**Q&A**: Add Q&A visual > Users type questions naturally",
      "**Smart Narrative**: Add Smart Narrative visual > Auto-generates insights summary",
      "**Anomaly Detection**: Line chart > Analytics pane > Find anomalies > Configure sensitivity"
    ],
    keyDecisions: [
      "**Which AI visual?** - Explain metric: Key Influencers; Explore hierarchy: Decomposition Tree; Natural language: Q&A",
      "**Enough data for AI?** - Need sufficient rows and variance for meaningful insights",
      "**Configure Q&A synonyms?** - Domain-specific terms: Yes; Standard terms: Default works",
      "**Smart Narrative where?** - Dashboard: Good summary; Detail page: May be redundant",
      "**Anomaly detection sensitivity?** - High sensitivity: More anomalies; Low: Only major anomalies"
    ],
    keyDefinitions: [
      "**Key Influencers**: AI visual showing factors that increase/decrease a metric",
      "**Decomposition Tree**: Interactive visual for drilling down through data hierarchies",
      "**Q&A**: Natural language interface where users type questions to get visuals",
      "**Smart Narrative**: Auto-generated text summary of data insights",
      "**Anomaly Detection**: AI feature identifying unusual patterns in time series",
      "**Explain By**: Fields used by AI to analyze what influences target metric"
    ],
    risks: [
      "**Insufficient data**: AI needs enough data points for meaningful analysis",
      "**Misleading insights**: AI may find spurious correlations",
      "**User confusion**: AI visuals require explanation for some users",
      "**Performance impact**: AI calculations can be slow on large datasets",
      "**Over-reliance**: Users may trust AI insights without validation",
      "**Data quality issues**: Garbage in, garbage out with AI analysis"
    ],
    faqs: [
      {
        q: "What does the Key Influencers visual do?",
        a: "Analyzes what factors increase or decrease a metric. Shows top influencers and compares segments automatically."
      },
      {
        q: "How do I use the Decomposition Tree?",
        a: "Add visual, set metric to analyze, add dimensions to Explain by. Users click + icon to drill down different paths."
      },
      {
        q: "What is Q&A in Power BI?",
        a: "Natural language interface where users type questions (e.g., 'sales by region') and get visualizations automatically."
      },
      {
        q: "How does Smart Narrative work?",
        a: "Automatically generates text summary of key insights from data in context of current page/filters."
      },
      {
        q: "What data is needed for AI visuals?",
        a: "Key Influencers needs 100+ rows minimum. More data = better insights. Clean, quality data essential."
      }
    ],
    examTips: [
      "Know Key Influencers identifies factors affecting a metric",
      "Remember Decomposition Tree for interactive drill-down exploration",
      "Understand Q&A uses natural language queries",
      "Know Smart Narrative auto-generates text insights",
      "Recognize Anomaly Detection for time series monitoring"
    ],
    resources: [
      {
        title: "Key Influencers visual",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-influencers",
        type: "Documentation"
      },
      {
        title: "Decomposition Tree visual",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-decomposition-tree",
        type: "Documentation"
      },
      {
        title: "Q&A in Power BI",
        url: "https://learn.microsoft.com/power-bi/natural-language/q-and-a-intro",
        type: "Documentation"
      }
    ]
  },

  "Design and configure Power BI paginated reports": {
    overview: {
      title: "Creating Pixel-Perfect Printed Reports",
      concepts: [
        "Paginated reports designed for printing and PDF export",
        "Pixel-perfect layout with precise control over placement",
        "Support for multi-page documents with headers, footers, page breaks",
        "Created in Power BI Report Builder (separate tool)",
        "Best for operational reports, invoices, statements, labels"
      ]
    },
    bestPractices: [
      "Use paginated reports for documents that need to print well",
      "Design for paper size (Letter, A4, etc.)",
      "Include page numbers, headers, and footers",
      "Use parameters for flexible filtering",
      "Test print layout and page breaks",
      "Consider data volume - paginated reports handle thousands of pages"
    ],
    commonMistakes: [
      "Using paginated report when interactive report better suited",
      "Not designing for target paper size",
      "Forgetting page headers/footers",
      "Not testing actual printing or PDF export",
      "Inconsistent formatting across pages",
      "Not optimizing query performance for large reports"
    ],
    keySteps: [
      "Download and install Power BI Report Builder",
      "Create new report or use wizard",
      "Connect to data source (Power BI dataset, SQL Server, etc.)",
      "Design report layout with tables, charts, text boxes",
      "Configure page settings (size, margins, orientation)",
      "Add parameters for user inputs",
      "Publish to Power BI Service (Premium required)"
    ],
    keyDecisions: [
      "**Paginated or interactive report?** - Print/PDF: Paginated; Interactive dashboard: Standard report",
      "**Which data source?** - Power BI dataset, SQL Server, or other supported sources",
      "**Page size?** - Letter (US), A4 (International), or custom",
      "**Orientation?** - Portrait (standard), Landscape (wide tables)",
      "**Subscription delivery?** - Yes: Configure scheduled subscriptions in Service"
    ],
    keyDefinitions: [
      "**Paginated Report**: Report optimized for printing with precise page layout control",
      "**Power BI Report Builder**: Desktop tool for creating paginated reports",
      "**RDL**: Report Definition Language - file format for paginated reports (.rdl)",
      "**Page Break**: Control that forces content to start on new page",
      "**Report Parameter**: User input that filters or customizes report",
      "**Subscription**: Scheduled delivery of report to email or file share"
    ],
    risks: [
      "**Premium requirement**: Paginated reports require Premium capacity or PPU",
      "**Learning curve**: Different tool and paradigm than standard Power BI",
      "**Limited interactivity**: Not designed for drill-through or cross-filtering",
      "**Performance issues**: Large reports with many pages slow to generate",
      "**Mobile limitations**: Optimized for print, not mobile viewing",
      "**Maintenance complexity**: Separate tool means separate development workflow"
    ],
    faqs: [
      {
        q: "When should I use paginated reports?",
        a: "For documents that need to print perfectly: invoices, statements, operational reports, labels, multi-page documents."
      },
      {
        q: "What's the difference between paginated and regular reports?",
        a: "Paginated: Print-optimized, precise layout, multi-page. Regular: Interactive, cross-filtering, dashboard-style."
      },
      {
        q: "Do I need Premium to use paginated reports?",
        a: "Yes - paginated reports require Power BI Premium capacity or Premium Per User (PPU) license."
      },
      {
        q: "Can I export regular reports to PDF?",
        a: "Yes, but layout not optimized for printing. Paginated reports designed specifically for print/PDF."
      },
      {
        q: "How do I create a paginated report?",
        a: "Use Power BI Report Builder (free download), design report, publish to Power BI Service Premium workspace."
      }
    ],
    examTips: [
      "Know paginated reports for printing, invoices, multi-page documents",
      "Remember created with Power BI Report Builder, not Desktop",
      "Understand paginated reports require Premium capacity or PPU",
      "Know paginated reports use .rdl file format",
      "Recognize paginated vs interactive report use cases"
    ],
    resources: [
      {
        title: "What are paginated reports?",
        url: "https://learn.microsoft.com/power-bi/paginated-reports/paginated-reports-report-builder-power-bi",
        type: "Documentation"
      },
      {
        title: "Create a paginated report",
        url: "https://learn.microsoft.com/power-bi/paginated-reports/paginated-reports-quickstart-aw",
        type: "Documentation"
      }
    ]
  },

  "Configure bookmarks, report navigation, and drill through": {
    overview: {
      title: "Creating Interactive Navigation Experiences",
      concepts: [
        "Bookmarks capture report state (filters, slicers, visual visibility)",
        "Navigation enables users to move between pages easily",
        "Drill through lets users jump to detail pages with context",
        "Buttons trigger actions like bookmarks, page navigation, or drill through",
        "Creates storytelling experiences and guided analysis flows"
      ]
    },
    bestPractices: [
      "Use bookmarks to show/hide visuals for alternate views",
      "Create navigation menu on each page for easy access",
      "Configure drill through for detail analysis (click to see details)",
      "Use button actions for interactive experiences",
      "Group bookmarks for bookmark navigator control",
      "Test all navigation paths work correctly"
    ],
    commonMistakes: [
      "Creating too many bookmarks that confuse users",
      "Not providing way to return from drill through pages",
      "Inconsistent navigation across pages",
      "Forgetting to test bookmark with various filter states",
      "Not naming bookmarks clearly",
      "Drill through without proper context filters"
    ],
    keySteps: [
      "**Bookmark**: Configure view > View tab > Add bookmark > Name it",
      "**Navigation**: Insert button > Action > Page navigation > Select target page",
      "**Drill Through**: Target page > Add field to Drill through well > Configure pass filters",
      "**Button Action**: Insert button > Action > Choose type (Bookmark, Page nav, Drill through, etc.)",
      "**Bookmark Navigator**: Add Bookmark navigator visual > Select bookmarks to display",
      "Test navigation flow from user perspective"
    ],
    keyDecisions: [
      "**Bookmarks for what?** - Show/hide visuals, capture filter state, create stories",
      "**Navigation style?** - Buttons, bookmark navigator, or page tabs",
      "**Drill through to where?** - Detail page with related context",
      "**Back button needed?** - Always provide way back from drill through",
      "**Default bookmark?** - Set initial view users see on page load"
    ],
    keyDefinitions: [
      "**Bookmark**: Saved report state including filters, slicers, visibility",
      "**Drill Through**: Navigation from summary to detail with context filters",
      "**Button Action**: Interactive element triggering bookmarks, navigation, or other actions",
      "**Page Navigation**: Moving between report pages via buttons or links",
      "**Bookmark Navigator**: Visual displaying bookmarks as navigation menu",
      "**Back Button**: Returns from drill through to source page"
    ],
    risks: [
      "**Navigation confusion**: Too complex navigation overwhelms users",
      "**Broken paths**: Links to non-existent pages or bookmarks",
      "**Lost context**: Drill through without proper filters loses meaning",
      "**Performance issues**: Many bookmarks with complex states slow report",
      "**Maintenance burden**: Complex navigation hard to update",
      "**Mobile problems**: Navigation may not work well on mobile"
    ],
    faqs: [
      {
        q: "How do I create a bookmark?",
        a: "Configure desired view (filters, visible visuals) > View tab > Bookmarks pane > Add > Name bookmark."
      },
      {
        q: "How do I add page navigation buttons?",
        a: "Insert > Buttons > Blank > Format > Action > On > Type: Page navigation > Destination: Select page."
      },
      {
        q: "What is drill through?",
        a: "Right-click data point > Drill through > Detail page. Target page shows details filtered to that data point."
      },
      {
        q: "How do I configure drill through?",
        a: "On target detail page: add field(s) to Drill through well. Source pages automatically get drill through option."
      },
      {
        q: "Can I create a bookmark that shows/hides visuals?",
        a: "Yes - configure visibility in Selection pane, create bookmark with 'Data' unchecked (captures layout only)."
      }
    ],
    examTips: [
      "Know bookmarks capture report state (filters, slicers, visibility)",
      "Remember drill through navigates to detail page with context",
      "Understand buttons can trigger bookmarks, navigation, or drill through",
      "Know bookmark navigator displays bookmarks as menu",
      "Recognize bookmarks enable storytelling and alternate views"
    ],
    resources: [
      {
        title: "Create bookmarks in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-bookmarks",
        type: "Documentation"
      },
      {
        title: "Use drill through in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-drillthrough",
        type: "Documentation"
      }
    ]
  },

  "Configure tooltips": {
    overview: {
      title: "Adding Contextual Information on Hover",
      concepts: [
        "Tooltips appear when hovering over data points in visuals",
        "Default tooltips show field names and values",
        "Custom tooltips use report pages as tooltip content",
        "Tooltips can show additional metrics, charts, or context",
        "Improve user understanding without cluttering main view"
      ]
    },
    bestPractices: [
      "Use report page tooltips for rich contextual information",
      "Keep tooltip pages small (recommend 320x240 pixels)",
      "Show relevant metrics not visible in main visual",
      "Use clear titles and labels in tooltip content",
      "Test tooltips work correctly with all data points",
      "Don't overload tooltips with too much information"
    ],
    commonMistakes: [
      "Tooltip pages too large (doesn't fit on screen)",
      "Not enabling 'Allow use as tooltip' on tooltip page",
      "Showing same information as main visual (redundant)",
      "Too much content making tooltip slow to load",
      "Not testing tooltips with various data points",
      "Forgetting to set appropriate tooltip filters"
    ],
    keySteps: [
      "**Default Tooltip**: Visual already has default tooltips automatically",
      "**Customize Fields**: Format visual > Tooltips > Add/remove fields",
      "**Report Page Tooltip**: Create new page > Format > Page information > Allow use as tooltip: On",
      "**Set Size**: Tooltip page > Canvas settings > Type: Tooltip > Size: Small",
      "**Apply to Visual**: Format visual > Tooltips > Type: Report page > Page: Select tooltip page",
      "Test by hovering over data points in visual"
    ],
    keyDecisions: [
      "**Default or custom tooltip?** - Simple: Default; Rich context: Custom report page",
      "**What to show in tooltip?** - Additional metrics, mini charts, explanatory text",
      "**Tooltip size?** - Small (320x240) for most cases, adjust as needed",
      "**Which visuals get custom tooltips?** - Complex visuals benefit most",
      "**Tooltip page filters?** - Ensure tooltip filters correctly by hover context"
    ],
    keyDefinitions: [
      "**Tooltip**: Information box appearing on hover over data points",
      "**Default Tooltip**: Automatic tooltip showing field names and values",
      "**Report Page Tooltip**: Custom tooltip using separate report page as content",
      "**Tooltip Filter**: Context from hover point passed to tooltip page",
      "**Canvas Settings**: Page properties including tooltip designation",
      "**Tooltip Size**: Recommended 320x240 pixels for standard tooltips"
    ],
    risks: [
      "**Performance issues**: Complex tooltips slow visual interaction",
      "**Information overload**: Too much content in tooltip confuses users",
      "**Mobile problems**: Tooltips don't work well on touch devices",
      "**Filter mismatch**: Tooltip showing wrong data due to filter issues",
      "**Size problems**: Tooltip too large doesn't fit on screen",
      "**Maintenance burden**: Many custom tooltips hard to update"
    ],
    faqs: [
      {
        q: "How do I create a custom tooltip?",
        a: "Create report page > Format page > Allow use as tooltip: On > Set type to Tooltip > Apply to visual via Format > Tooltips."
      },
      {
        q: "What size should tooltip pages be?",
        a: "Recommended 320x240 pixels (small). Canvas settings > Type: Tooltip > Size: Small."
      },
      {
        q: "Can tooltips show charts?",
        a: "Yes - using report page tooltips. Add any visuals to tooltip page (mini charts, cards, etc.)."
      },
      {
        q: "How do tooltip filters work?",
        a: "Hover context (e.g., Product: Bikes) automatically filters tooltip page content to that context."
      },
      {
        q: "Do tooltips work on mobile?",
        a: "Limited - hover doesn't work on touch. Tap and hold may show tooltip on some devices."
      }
    ],
    examTips: [
      "Know default tooltips show automatically on all visuals",
      "Remember report page tooltips for rich contextual content",
      "Understand tooltip page must have 'Allow use as tooltip' enabled",
      "Know recommended tooltip size is 320x240 pixels (small)",
      "Recognize tooltips filtered by hover context automatically"
    ],
    resources: [
      {
        title: "Create tooltips based on report pages",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-tooltips",
        type: "Documentation"
      },
      {
        title: "Customize tooltips in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-custom-tooltips",
        type: "Documentation"
      }
    ]
  },

  "Edit and configure interactions between visuals": {
    overview: {
      title: "Controlling Cross-Filtering Behavior",
      concepts: [
        "Visuals on same page interact through cross-filtering by default",
        "Clicking data point filters other visuals to that selection",
        "Three interaction types: Filter, Highlight, None",
        "Edit interactions to customize which visuals affect others",
        "Control creates intentional data exploration paths"
      ]
    },
    bestPractices: [
      "Use Filter for related visuals that should update together",
      "Use Highlight to compare selection vs total",
      "Use None when visual shouldn't be affected by others",
      "Disable interactions from slicers when appropriate",
      "Test interaction behavior from user perspective",
      "Document intentional interaction design decisions"
    ],
    commonMistakes: [
      "Leaving default interactions without considering impact",
      "Creating confusing interaction patterns",
      "Not disabling interactions where they don't make sense",
      "Forgetting to test all interaction combinations",
      "Having KPI cards filtered by other visuals (usually should be None)",
      "Inconsistent interaction behavior across similar pages"
    ],
    keySteps: [
      "Select source visual (the one users will click)",
      "Format tab > Edit interactions",
      "Icons appear above other visuals showing interaction type",
      "Click icon to change: Filter, Highlight, or None",
      "Repeat for each visual that needs custom interactions",
      "Turn off Edit interactions when done"
    ],
    keyDecisions: [
      "**Filter or Highlight?** - Detail view: Filter; Overview with comparison: Highlight",
      "**Which visuals interact?** - Related analysis: interact; Independent: None",
      "**KPI cards filtered?** - Total metrics: None; Filtered metrics: Filter",
      "**Slicer interactions?** - Most visuals: Filter; Comparison charts: sometimes None",
      "**Default or custom?** - Simple reports: Default often fine; Complex: Custom interactions"
    ],
    keyDefinitions: [
      "**Cross-Filtering**: Selecting data in one visual filters others on same page",
      "**Filter Interaction**: Clicked data filters target visual to selection only",
      "**Highlight Interaction**: Shows selection highlighted while keeping rest visible",
      "**None Interaction**: Target visual not affected by selection",
      "**Edit Interactions**: Mode for configuring interaction behavior between visuals",
      "**Source Visual**: Visual being clicked that triggers interaction"
    ],
    risks: [
      "**User confusion**: Unexpected interactions confuse analysis",
      "**Lost context**: Over-filtering hides important comparison data",
      "**Performance issues**: Complex interaction chains slow report",
      "**Analysis errors**: Wrong interactions lead to incorrect conclusions",
      "**Inconsistent behavior**: Different pages behave differently without reason",
      "**Accessibility problems**: Interactions may not work with screen readers"
    ],
    faqs: [
      {
        q: "How do I edit visual interactions?",
        a: "Select visual > Format tab > Edit interactions > Icons appear on other visuals > Click to change (Filter/Highlight/None)."
      },
      {
        q: "What's the difference between Filter and Highlight?",
        a: "Filter shows only selected data. Highlight shows selected data emphasized while keeping rest visible (grayed)."
      },
      {
        q: "Should KPI cards be filtered by other visuals?",
        a: "Usually no - set to None so they show total metrics. Exception: if card specifically shows filtered value."
      },
      {
        q: "Can I disable slicer interactions?",
        a: "Yes - select slicer > Edit interactions > Set visuals to None that shouldn't be filtered by slicer."
      },
      {
        q: "Do interactions work on mobile?",
        a: "Yes - tap visual on mobile to filter/highlight others according to configured interactions."
      }
    ],
    examTips: [
      "Know three interaction types: Filter, Highlight, None",
      "Remember Edit interactions mode configures visual behavior",
      "Understand Filter shows selection only, Highlight shows comparison",
      "Know that None prevents visual from being affected",
      "Recognize KPI cards usually set to None interaction"
    ],
    resources: [
      {
        title: "Change how visuals interact",
        url: "https://learn.microsoft.com/power-bi/create-reports/service-reports-visual-interactions",
        type: "Documentation"
      },
      {
        title: "Visual interactions in reports",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-visual-interactions",
        type: "Documentation"
      }
    ]
  },

  "Configure report filters and mobile layout": {
    overview: {
      title: "Multi-Device Report Optimization",
      concepts: [
        "Report filters apply to all pages in report",
        "Mobile layout separate from desktop - design specifically for phones",
        "Mobile view uses portrait orientation and touch interactions",
        "Not all visuals work well on mobile - simplify for small screens",
        "Test on actual devices or mobile emulator"
      ]
    },
    bestPractices: [
      "Use report-level filters for global filters (Year, Region)",
      "Design mobile layout specifically - don't just rely on auto-layout",
      "Simplify visuals for mobile (fewer categories, larger fonts)",
      "Use card visuals for KPIs on mobile (easy to read)",
      "Limit visuals per mobile page to 3-5",
      "Test mobile layout in Power BI mobile app or emulator"
    ],
    commonMistakes: [
      "Not creating mobile layout at all (poor mobile experience)",
      "Using too many visuals on mobile page",
      "Small fonts that are unreadable on mobile",
      "Complex visuals that don't work well on small screens",
      "Not testing actual mobile devices",
      "Forgetting that mobile is portrait, desktop is landscape"
    ],
    keySteps: [
      "**Report Filters**: Filters pane > Report level > Add filters that apply to all pages",
      "**Mobile Layout**: View tab > Mobile layout",
      "**Add Visuals to Mobile**: Drag visuals from Visuals pane to mobile canvas",
      "**Resize for Mobile**: Size visuals appropriately for phone screen",
      "**Reorder**: Arrange visuals in logical reading order (top to bottom)",
      "**Test**: Use mobile app or Power BI service mobile view to test"
    ],
    keyDecisions: [
      "**Which report-level filters?** - Common across all pages: Year, Region, Department",
      "**Create mobile layout?** - Yes for reports users access on mobile",
      "**Which visuals for mobile?** - Most important visuals only (3-5 per page)",
      "**Simplify for mobile?** - Reduce categories, increase font sizes, use simpler charts",
      "**Mobile-first or desktop-first?** - Depends on primary user base"
    ],
    keyDefinitions: [
      "**Report-level Filter**: Filter that applies to all pages in report",
      "**Mobile Layout**: Separate portrait-oriented design for phone viewing",
      "**Mobile Emulator**: Tool in Power BI service to preview mobile view",
      "**Touch Interaction**: Tap and swipe gestures for mobile users",
      "**Responsive Visual**: Visual that adapts to different screen sizes",
      "**Mobile Canvas**: Portrait-oriented canvas for mobile layout design"
    ],
    risks: [
      "**Poor mobile experience**: No mobile layout means bad phone experience",
      "**Unreadable content**: Small fonts, complex visuals fail on mobile",
      "**Touch problems**: Interactions that work with mouse fail on touch",
      "**Performance issues**: Too many visuals slow mobile devices",
      "**Filter conflicts**: Report filters may conflict with page filters",
      "**Maintenance burden**: Maintaining both desktop and mobile layouts"
    ],
    faqs: [
      {
        q: "How do I create a mobile layout?",
        a: "View tab > Mobile layout > Drag visuals from Visuals pane to mobile canvas > Resize and arrange for portrait view."
      },
      {
        q: "Do I need to create mobile layout for every page?",
        a: "Recommended for important pages users access on mobile. Desktop layout shown if no mobile layout exists."
      },
      {
        q: "What's a report-level filter?",
        a: "Filter that applies to all pages in report. Set in Filters pane under 'Filters on all pages' section."
      },
      {
        q: "How many visuals should I have on mobile page?",
        a: "3-5 visuals maximum. Mobile screens small, so prioritize most important information."
      },
      {
        q: "Can users edit mobile layout?",
        a: "No - mobile layout is designed by report creator. Users see optimized mobile view but can't change it."
      }
    ],
    examTips: [
      "Know report-level filters apply to all pages",
      "Remember mobile layout is separate from desktop layout",
      "Understand mobile layout designed specifically for portrait/phone",
      "Know to limit 3-5 visuals per mobile page",
      "Recognize importance of testing on actual mobile devices"
    ],
    resources: [
      {
        title: "Create reports optimized for mobile",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-create-phone-report",
        type: "Documentation"
      },
      {
        title: "View Power BI reports on mobile",
        url: "https://learn.microsoft.com/power-bi/consumer/mobile/mobile-apps-view-phone-report",
        type: "Documentation"
      }
    ]
  },

  "Use the Analyze feature": {
    overview: {
      title: "Automated Insights Discovery",
      concepts: [
        "Analyze feature provides AI-powered insights on visuals",
        "Right-click data point > Analyze > Choose analysis type",
        "Options: Explain increase/decrease, Find where distribution is different",
        "Automatically creates explanation visuals showing key factors",
        "Helps discover insights without manual exploration"
      ]
    },
    bestPractices: [
      "Use Analyze to explore unexpected trends or outliers",
      "Review AI-generated explanations for data quality issues",
      "Combine Analyze with your domain knowledge for validation",
      "Use as starting point for deeper analysis",
      "Share Analyze insights with stakeholders",
      "Test Analyze with sufficient data for meaningful results"
    ],
    commonMistakes: [
      "Trusting AI analysis without validation",
      "Using with insufficient data (need meaningful sample)",
      "Not reviewing explanations for accuracy",
      "Expecting Analyze to work on all visual types (limited support)",
      "Not having appropriate dimensions for AI to analyze",
      "Forgetting Analyze creates temporary visuals (not saved automatically)"
    ],
    keySteps: [
      "Right-click data point in visual (bar, column, line charts)",
      "Select 'Analyze' from context menu",
      "Choose analysis type: 'Explain the increase/decrease' or 'Find where distribution is different'",
      "Review AI-generated explanation visuals",
      "Add relevant insights to report if useful",
      "Validate findings with domain knowledge"
    ],
    keyDecisions: [
      "**Which analysis type?** - Trend change: Explain increase/decrease; Compare segments: Find distribution differences",
      "**Enough data for analysis?** - Need sufficient rows and variance for meaningful insights",
      "**Trust AI findings?** - Use as hypothesis, validate with domain knowledge",
      "**Add to report?** - Valuable insight: add visual; Exploration only: temporary",
      "**Which dimensions to analyze?** - Include relevant attributes AI can use for explanation"
    ],
    keyDefinitions: [
      "**Analyze Feature**: AI-powered tool that automatically explains trends and patterns",
      "**Explain Increase/Decrease**: Analysis showing factors contributing to metric changes",
      "**Find Distribution Differences**: Identifies segments where pattern differs significantly",
      "**AI-Generated Visual**: Temporary visual created by Analyze showing explanations",
      "**Contributing Factors**: Dimensions that most influence observed trend",
      "**Statistical Significance**: Measure of whether observed difference is meaningful"
    ],
    risks: [
      "**Spurious correlations**: AI may find coincidental patterns not causally related",
      "**Insufficient data**: Small samples produce unreliable insights",
      "**Overfitting**: AI may find patterns specific to sample not generalizable",
      "**Missing context**: AI lacks business knowledge to validate findings",
      "**Data quality issues**: Bad data produces misleading analysis",
      "**Over-reliance**: Users may trust AI without critical thinking"
    ],
    faqs: [
      {
        q: "How do I use the Analyze feature?",
        a: "Right-click data point in bar, column, or line chart > Analyze > Choose analysis type > Review AI explanations."
      },
      {
        q: "What visuals support Analyze?",
        a: "Bar charts, column charts, and line charts. Not available for all visual types."
      },
      {
        q: "What does 'Explain the increase' show?",
        a: "AI identifies dimensions (categories) that most contributed to the increase in your metric."
      },
      {
        q: "Are Analyze results saved automatically?",
        a: "No - they're temporary. Manually add generated visuals to report if you want to keep them."
      },
      {
        q: "How much data is needed for Analyze?",
        a: "More is better - need sufficient rows and variance. At least 100+ rows recommended for meaningful analysis."
      }
    ],
    examTips: [
      "Know Analyze feature provides AI-powered insights",
      "Remember accessed via right-click on data point",
      "Understand two types: Explain increase/decrease, Find distribution differences",
      "Know it works on bar, column, and line charts",
      "Recognize generated visuals are temporary unless manually added"
    ],
    resources: [
      {
        title: "Use Analyze to explain fluctuations",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-insights",
        type: "Documentation"
      }
    ]
  },

  "Use grouping and binning": {
    overview: {
      title: "Simplifying Data for Analysis",
      concepts: [
        "Grouping combines multiple categories into single group",
        "Binning divides continuous numeric values into ranges",
        "Grouping reduces visual clutter by consolidating categories",
        "Binning enables histogram-style analysis of distributions",
        "Created in data model, available across all visuals"
      ]
    },
    bestPractices: [
      "Group small categories into 'Other' to reduce visual noise",
      "Bin ages into ranges (18-25, 26-35, etc.) for demographic analysis",
      "Bin prices into ranges for pricing tier analysis",
      "Use meaningful group names that describe contents",
      "Test bin sizes to find meaningful patterns",
      "Document grouping logic for transparency"
    ],
    commonMistakes: [
      "Creating too many bins (defeats purpose of simplification)",
      "Arbitrary bin sizes that don't match business logic",
      "Grouping unrelated categories together",
      "Not naming groups clearly",
      "Forgetting grouped items can't be ungrouped in visuals",
      "Using binning when granular data is needed"
    ],
    keySteps: [
      "**Grouping**: Right-click field in visual or Fields pane > Group > Select items > Group",
      "**Rename Group**: Double-click group name to rename",
      "**Binning**: Right-click numeric field > New group > Type: Bin > Set bin size",
      "**Configure Bins**: Choose bin size or number of bins",
      "Use grouped/binned field in visuals like regular field"
    ],
    keyDecisions: [
      "**Group or keep separate?** - Many small categories: Group into 'Other'; Important distinctions: Keep separate",
      "**Bin size?** - Match business logic (decades, price tiers, etc.)",
      "**Number of bins?** - 5-10 bins typical for clear patterns; Too many defeats purpose",
      "**Auto or manual binning?** - Even distribution: Auto; Business logic: Manual",
      "**Which field to bin?** - Age, price, quantity, or other continuous numeric fields"
    ],
    keyDefinitions: [
      "**Grouping**: Combining multiple category values into single group",
      "**Binning**: Dividing continuous numeric values into ranges (buckets)",
      "**Bin Size**: Width of each range in binning (e.g., 10 for age groups of 10 years)",
      "**Histogram**: Chart showing distribution across bins",
      "**Other Group**: Common group name for miscellaneous small categories",
      "**Range**: Min to max values included in each bin"
    ],
    risks: [
      "**Information loss**: Grouping/binning loses granular detail",
      "**Misleading patterns**: Wrong bin sizes hide or create false patterns",
      "**Inflexibility**: Groups/bins fixed, can't drill to detail",
      "**Business misalignment**: Arbitrary ranges don't match business logic",
      "**Comparison issues**: Different bin sizes prevent valid comparisons",
      "**User confusion**: Unclear group contents or bin ranges"
    ],
    faqs: [
      {
        q: "How do I group categories?",
        a: "Right-click field > Group > Select items to group > Group > Rename group. Or Ctrl+Click items in visual, right-click > Group."
      },
      {
        q: "What's the difference between grouping and binning?",
        a: "Grouping: combines categories (text). Binning: divides numeric values into ranges. Both simplify analysis."
      },
      {
        q: "How do I create age ranges?",
        a: "Right-click Age field > New group > Type: Bin > Bin size: 10 (for 10-year ranges) > OK."
      },
      {
        q: "Can I ungroup items later?",
        a: "Delete group from Fields pane to remove. Can't selectively ungroup within visuals."
      },
      {
        q: "What's a good bin size?",
        a: "Depends on data range and business logic. Try different sizes to find meaningful patterns. 5-10 bins typical."
      }
    ],
    examTips: [
      "Know grouping combines categories, binning divides numbers into ranges",
      "Remember right-click field > Group or New group > Bin",
      "Understand binning creates histogram-style distributions",
      "Know bin size determines width of each range",
      "Recognize grouping reduces visual clutter in charts"
    ],
    resources: [
      {
        title: "Use grouping and binning",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-grouping-and-binning",
        type: "Documentation"
      }
    ]
  },

  "Use the Key Influencers and Decomposition Tree visuals": {
    overview: {
      title: "AI-Powered Root Cause Analysis",
      concepts: [
        "Key Influencers identifies factors that increase/decrease a metric",
        "Shows top influencers ranked by impact",
        "Decomposition Tree enables interactive drill-down through dimensions",
        "Both use AI to analyze relationships in data",
        "Help answer 'why' questions about business metrics"
      ]
    },
    bestPractices: [
      "Use Key Influencers to understand what drives KPIs",
      "Add many Explain by fields for richer analysis",
      "Use Decomposition Tree for exploratory hierarchical analysis",
      "Interpret AI findings with business knowledge",
      "Need 100+ rows minimum for meaningful insights",
      "Test with clean, quality data for accurate results"
    ],
    commonMistakes: [
      "Insufficient data for reliable AI analysis",
      "Not adding enough Explain by fields",
      "Trusting AI correlations as causation",
      "Using with dirty or incomplete data",
      "Not validating AI findings with domain expertise",
      "Expecting insights from small datasets"
    ],
    keySteps: [
      "**Key Influencers**: Add visual > Analyze: metric to analyze > Explain by: dimensions",
      "Review top influencers (factors increasing/decreasing metric)",
      "Switch between Increase and Decrease tabs",
      "**Decomposition Tree**: Add visual > Analyze: metric > Explain by: multiple dimensions",
      "Click + icon to drill down by different dimensions",
      "Explore multiple paths through hierarchy"
    ],
    keyDecisions: [
      "**Key Influencers or Decomposition Tree?** - Automatic ranking: Key Influencers; Interactive exploration: Decomposition Tree",
      "**Which metric to analyze?** - Business KPI or measure of interest",
      "**Which Explain by fields?** - Add all relevant dimensions (more = better analysis)",
      "**Enough data?** - Need 100+ rows minimum, more for reliable insights",
      "**Continuous or categorical target?** - Both work, influences visual display"
    ],
    keyDefinitions: [
      "**Key Influencers**: AI visual showing factors that increase/decrease a metric",
      "**Decomposition Tree**: Interactive visual for drilling through data hierarchies",
      "**Influencer**: Factor (dimension value) that affects target metric",
      "**Explain By**: Dimensions used by AI to find influencers",
      "**Analyze Field**: Target metric being analyzed",
      "**Impact Score**: Measure of how much factor influences target"
    ],
    risks: [
      "**Spurious correlations**: AI finds coincidental patterns not causal",
      "**Insufficient data**: Small samples produce unreliable insights",
      "**Data quality issues**: Bad data yields misleading analysis",
      "**Over-interpretation**: Correlation doesn't equal causation",
      "**Missing variables**: Important factors not in Explain by fields",
      "**Performance issues**: Heavy AI calculations on large datasets"
    ],
    faqs: [
      {
        q: "What does Key Influencers show?",
        a: "Factors (dimension values) that most increase or decrease your target metric, ranked by impact with AI-calculated probabilities."
      },
      {
        q: "What's the difference between Key Influencers and Decomposition Tree?",
        a: "Key Influencers: automatic ranking of top factors. Decomposition Tree: interactive exploration choosing your own drill path."
      },
      {
        q: "How much data is needed?",
        a: "Minimum 100 rows. More is better - 1000+ rows recommended for reliable, statistically significant insights."
      },
      {
        q: "How do I use Decomposition Tree?",
        a: "Click + icon on any value to drill down by dimension. Explore different paths to understand hierarchical relationships."
      },
      {
        q: "Can I trust AI findings?",
        a: "Use as starting point. Validate with domain knowledge. AI shows correlations, not necessarily causation."
      }
    ],
    examTips: [
      "Know Key Influencers shows factors affecting metric",
      "Remember Decomposition Tree for interactive drill-down",
      "Understand both use AI analysis of relationships",
      "Know minimum 100+ rows needed for reliable insights",
      "Recognize Explain by fields are dimensions AI uses for analysis"
    ],
    resources: [
      {
        title: "Key Influencers visual",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-influencers",
        type: "Documentation"
      },
      {
        title: "Decomposition Tree visual",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-decomposition-tree",
        type: "Documentation"
      }
    ]
  },

  "Use the Analyze feature to find anomalies": {
    overview: {
      title: "Automated Anomaly Detection in Time Series",
      concepts: [
        "Anomaly detection identifies unusual patterns in time series data",
        "AI determines expected range based on historical patterns",
        "Highlights points outside expected range as anomalies",
        "Configurable sensitivity for anomaly detection",
        "Available through Analytics pane on line charts"
      ]
    },
    bestPractices: [
      "Use on line charts with time series data",
      "Set appropriate sensitivity level (balance false positives vs misses)",
      "Investigate anomalies for data quality or business events",
      "Combine with explanations of what caused anomalies",
      "Use for monitoring dashboards and alerts",
      "Validate anomalies aren't data errors"
    ],
    commonMistakes: [
      "Using on non-time series data",
      "Setting sensitivity too high (too many false positives)",
      "Not investigating whether anomalies are errors or real events",
      "Insufficient historical data for pattern detection",
      "Forgetting seasonal patterns affect anomaly detection",
      "Not documenting known anomalies (holidays, events)"
    ],
    keySteps: [
      "Create line chart with time series data (date on axis)",
      "Select line chart",
      "Analytics pane > Add > Find anomalies",
      "Configure sensitivity slider (higher = more anomalies detected)",
      "Review detected anomalies (marked on chart)",
      "Hover over anomaly for expected range and actual value"
    ],
    keyDecisions: [
      "**Sensitivity level?** - High: detect subtle changes; Low: only major anomalies",
      "**Enough historical data?** - Need sufficient time series for pattern learning",
      "**Real anomaly or error?** - Validate data quality vs actual business event",
      "**Add to report?** - Monitoring use: yes; One-time analysis: no",
      "**Explain anomalies?** - Use Analyze feature to understand causes"
    ],
    keyDefinitions: [
      "**Anomaly**: Data point outside expected range based on historical patterns",
      "**Expected Range**: AI-calculated normal range for values at that time",
      "**Sensitivity**: Threshold for anomaly detection (higher = more anomalies)",
      "**Time Series**: Sequential data points over time periods",
      "**Anomaly Detection**: AI technique for identifying unusual patterns",
      "**False Positive**: Normal variation incorrectly flagged as anomaly"
    ],
    risks: [
      "**False positives**: Too sensitive, normal variation flagged as anomaly",
      "**Missed anomalies**: Too low sensitivity misses real issues",
      "**Insufficient data**: Short time series produces unreliable detection",
      "**Data quality**: Errors in data create false anomalies",
      "**Seasonality ignored**: Regular patterns may be flagged incorrectly",
      "**Over-reliance**: Users may not investigate flagged anomalies"
    ],
    faqs: [
      {
        q: "How do I detect anomalies in my data?",
        a: "Create line chart with time series > Analytics pane > Add > Find anomalies > Adjust sensitivity > Review detected points."
      },
      {
        q: "What types of charts support anomaly detection?",
        a: "Line charts with time series data (date/time on axis). Not available for other chart types."
      },
      {
        q: "How does sensitivity work?",
        a: "Higher sensitivity detects more anomalies (including minor variations). Lower detects only significant deviations."
      },
      {
        q: "What should I do when anomaly is detected?",
        a: "Investigate: Is it data error or real event? Use Analyze feature to understand causes. Document known events."
      },
      {
        q: "How much data is needed?",
        a: "Enough time periods to establish pattern - at least several weeks/months depending on data frequency."
      }
    ],
    examTips: [
      "Know anomaly detection identifies unusual time series patterns",
      "Remember accessed via Analytics pane on line charts",
      "Understand sensitivity controls detection threshold",
      "Know AI calculates expected range from historical data",
      "Recognize need for sufficient time series data"
    ],
    resources: [
      {
        title: "Anomaly detection",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-anomaly-detection",
        type: "Documentation"
      }
    ]
  },

  "Apply advanced analytic features, including quick measures, grouping, binning, and clustering": {
    overview: {
      title: "Advanced Analytics Without Code",
      concepts: [
        "Quick Measures: Pre-built DAX calculations without writing code",
        "Grouping: Combine categories into groups",
        "Binning: Divide numeric ranges into buckets",
        "Clustering: AI groups similar data points automatically",
        "Enable sophisticated analysis for non-technical users"
      ]
    },
    bestPractices: [
      "Use Quick Measures for common calculations (YTD, running total, % difference)",
      "Use clustering to discover natural segments in data",
      "Start with Quick Measures, customize DAX if needed",
      "Name clusters meaningfully after reviewing characteristics",
      "Test cluster results with different numbers of clusters",
      "Validate clustering makes business sense"
    ],
    commonMistakes: [
      "Not exploring Quick Measures library (may already exist)",
      "Using too many clusters (defeats segmentation purpose)",
      "Not validating cluster logic with domain knowledge",
      "Forgetting Quick Measures create DAX you can edit",
      "Using clustering on inappropriate data types",
      "Not renaming default cluster names to meaningful labels"
    ],
    keySteps: [
      "**Quick Measures**: Right-click table in Fields > New quick measure > Select calculation > Configure > OK",
      "**Clustering**: Right-click table > Cluster > Select fields for clustering > Set number of clusters > OK",
      "Review generated DAX from Quick Measure",
      "Analyze cluster characteristics to understand segments",
      "Rename clusters for business meaning",
      "Use in visuals like any other field"
    ],
    keyDecisions: [
      "**Quick Measure or custom DAX?** - Common calculation: Quick Measure; Custom logic: Write DAX",
      "**How many clusters?** - Try 3-5 initially; Too many loses insight",
      "**Which fields for clustering?** - Numeric fields defining similarity (sales, quantity, demographics)",
      "**Keep or customize Quick Measure?** - Works as-is: keep; Needs tweaking: edit DAX",
      "**Clustering appropriate?** - Finding natural segments: yes; Known categories: no"
    ],
    keyDefinitions: [
      "**Quick Measure**: Pre-built DAX calculation template",
      "**Clustering**: AI grouping of similar data points into segments",
      "**K-means Clustering**: Algorithm that groups data into K clusters",
      "**Cluster Field**: New field created showing cluster assignment",
      "**Centroid**: Center point of cluster defining its characteristics",
      "**Calculation Template**: Quick Measure pattern for common calculations"
    ],
    risks: [
      "**Inappropriate clustering**: AI may create segments without business meaning",
      "**Over-clustering**: Too many clusters too granular to be useful",
      "**Quick Measure limitations**: May not fit exact business logic needed",
      "**Performance impact**: Complex Quick Measures slow reports",
      "**Maintenance issues**: Customized Quick Measures need DAX knowledge to update",
      "**Clustering instability**: Results may change with new data"
    ],
    faqs: [
      {
        q: "What are Quick Measures?",
        a: "Pre-built DAX calculation templates for common analyses (YTD, running totals, % of total, etc.) without writing code."
      },
      {
        q: "How do I create a Quick Measure?",
        a: "Right-click table > New quick measure > Select category and calculation > Configure fields > OK. DAX created automatically."
      },
      {
        q: "What is clustering?",
        a: "AI-powered grouping of similar records into segments based on selected numeric fields."
      },
      {
        q: "How many clusters should I create?",
        a: "Start with 3-5. Too few loses nuance, too many defeats purpose of segmentation. Try different numbers."
      },
      {
        q: "Can I edit Quick Measure DAX?",
        a: "Yes - Quick Measure creates DAX code you can view and modify in measure properties."
      }
    ],
    examTips: [
      "Know Quick Measures create pre-built DAX calculations",
      "Remember clustering uses AI to group similar data points",
      "Understand grouping for categories, binning for numeric ranges",
      "Know to right-click table for Quick Measures and Clustering",
      "Recognize Quick Measures good for common time intelligence and calculations"
    ],
    resources: [
      {
        title: "Use quick measures",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-quick-measures",
        type: "Documentation"
      },
      {
        title: "Use clustering in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-clustering",
        type: "Documentation"
      }
    ]
  }
};
