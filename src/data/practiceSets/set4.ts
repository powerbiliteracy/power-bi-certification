const questions = [
  {
    id: 1,
    phase: "AI Visuals",
    scenario: "Your product team wants to understand what factors most influence whether a customer churns. You have a dataset with dozens of customer attributes (age, region, contract type, support tickets, usage frequency). They want visual exploration of influencing factors, not just a static chart.",
    question: "Which Power BI AI visual is best suited for this?",
    options: [
      "Decomposition tree — it breaks down a metric by multiple dimensions simultaneously",
      "Key Influencers visual — it analyzes what factors statistically correlate with a target metric (churn = yes), ranks the most impactful factors, and shows their direction and strength",
      "Smart Narrative — it writes a text summary of the churn data",
      "Scatter chart with trend line"
    ],
    correctIndex: 1,
    explanation: "The Key Influencers visual is designed specifically for factor analysis. It analyzes all provided fields to find which attributes most predict the target variable (churn), calculates relative likelihood, and presents ranked factors with plain-English descriptions like 'Contract type = Month-to-month makes churn 2.5x more likely'. It requires no ML expertise.",
    microsoftLinks: [
      { text: "Key influencers visual", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-influencers" },
      { text: "AI visuals in Power BI", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-decomposition-tree" }
    ]
  },
  {
    id: 2,
    phase: "AI Visuals",
    scenario: "Your finance team wants to analyze what drives total revenue variance. They want to start at the top level (Total Revenue) and interactively drill down into different breakdown dimensions — sometimes by Region, sometimes by Product Category, sometimes by Channel — in the same session.",
    question: "Which visual enables this dynamic, user-driven hierarchical exploration?",
    options: [
      "A matrix with row-level drilldown enabled",
      "Decomposition tree — users can interactively add breakdown levels from any available field, or use AI to automatically find the dimension that explains the most variance at each level",
      "Key Influencers visual with multiple categories",
      "A clustered column chart with page drillthrough"
    ],
    correctIndex: 1,
    explanation: "The Decomposition Tree visual allows users to start with a value and interactively decompose it step-by-step by choosing which field to split by at each level. The 'AI split' option automatically identifies which dimension has the highest/lowest contribution, making root cause analysis intuitive without predefined hierarchies.",
    microsoftLinks: [
      { text: "Decomposition tree visual", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-decomposition-tree" }
    ]
  },
  {
    id: 3,
    phase: "Reference Lines and Forecasting",
    scenario: "You have a line chart showing monthly revenue over 24 months. The business wants to see projected revenue for the next 6 months with confidence intervals, displayed directly on the same chart without creating new measures.",
    question: "How do you add forecasting to the line chart?",
    options: [
      "Create DAX measures using linear regression formulas and extend the date table 6 months forward",
      "Open the Analytics pane for the line chart, add a Forecast, configure forecast length (6 periods), confidence interval (95%), and seasonality — Power BI calculates the prediction automatically",
      "Use a custom Python visual with scikit-learn forecasting",
      "Forecasting requires importing a separate forecasting model"
    ],
    correctIndex: 1,
    explanation: "The Analytics pane for line charts includes built-in forecasting (powered by exponential smoothing). You configure forecast length, confidence interval percentage, and seasonality. The forecast line and shaded confidence interval appear directly on the chart with no custom code or model required.",
    microsoftLinks: [
      { text: "Analytics pane forecasting", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-analytics-pane" },
      { text: "Forecasting in Power BI", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a" }
    ]
  },
  {
    id: 4,
    phase: "Grouping, Binning, and Clustering",
    scenario: "You have a scatter chart with 10,000 customer data points. Visually identifying groups is impossible. You want Power BI to automatically identify clusters of similar customers based on their position in the scatter chart without writing custom ML code.",
    question: "What built-in feature provides this?",
    options: [
      "Apply grouping manually by drawing regions on the scatter chart",
      "Use the scatter chart's built-in Cluster groups option — right-click the chart and select 'Automatically find clusters' or use the Clusters field well to let Power BI's k-means algorithm identify natural groupings",
      "Use the Key Influencers visual on the customer data",
      "Export to Python and use scikit-learn clustering"
    ],
    correctIndex: 1,
    explanation: "Power BI scatter charts support automatic clustering using k-means. You can right-click and find clusters, or use the Clusters field. Power BI determines the optimal number of clusters and assigns each data point to a cluster, creating a new group field that can be used elsewhere in the report.",
    microsoftLinks: [
      { text: "Grouping and binning", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-grouping-and-binning" },
      { text: "Scatter chart clustering", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-grouping-and-binning#using-grouping" }
    ]
  },
  {
    id: 5,
    phase: "Detect Outliers and Anomalies",
    scenario: "You have a time series line chart showing daily website traffic. You want the chart to automatically highlight days where traffic was unusually high or low — without manually setting thresholds.",
    question: "What Power BI feature automates anomaly detection on time series data?",
    options: [
      "Add a constant line at ±2 standard deviations from the mean",
      "Use the Anomalies feature in the Analytics pane — it uses a machine learning model to detect statistically unusual data points and displays them with markers and explanatory tooltips",
      "Apply conditional formatting to color bars above/below average",
      "Use the Key Influencers visual pointed at the traffic metric"
    ],
    correctIndex: 1,
    explanation: "The Anomaly Detection feature (Analytics pane → Find anomalies) applies automated ML-based detection to identify data points that deviate from expected patterns. It considers seasonality and trends, marks anomalies with diamonds on the line, and can suggest which related fields might explain the anomaly.",
    microsoftLinks: [
      { text: "Anomaly detection", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-anomaly-detection" }
    ]
  },
  {
    id: 6,
    phase: "Paginated Reports",
    scenario: "Your accounting team needs a monthly invoice report that must print exactly on letter-size paper, with perfect page breaks at each customer boundary, rendered with pixel-perfect formatting, and sometimes contains 50,000+ rows. They need to export it to PDF.",
    question: "Which type of report is appropriate, and why?",
    options: [
      "A standard Power BI report with a table visual — it handles large datasets well",
      "A paginated report built in Power BI Report Builder — designed for pixel-perfect, print-ready output with controlled page breaks, rendering all rows (not limited like table visuals), and optimal for invoice/statement layouts",
      "A Power BI report exported to PDF",
      "An Excel report generated by Power Automate"
    ],
    correctIndex: 1,
    explanation: "Paginated reports (built with Power BI Report Builder, based on SSRS technology) are designed for print-ready, pixel-perfect documents. They handle unlimited rows, support precise page break control, sub-reports, and complex layouts like invoices and financial statements. Standard Power BI reports are interactive and analytical — not designed for pagination-precise print output.",
    microsoftLinks: [
      { text: "Paginated reports", url: "https://learn.microsoft.com/power-bi/paginated-reports/paginated-reports-report-builder-power-bi" },
      { text: "When to use paginated reports", url: "https://learn.microsoft.com/power-bi/guidance/report-paginated-or-power-bi" }
    ]
  },
  {
    id: 7,
    phase: "Identify Patterns — Analyze Feature",
    scenario: "You're reviewing a bar chart and notice that March had unusually high sales compared to other months. You want Power BI to automatically explain what drove that difference without building a separate investigation report.",
    question: "What feature provides instant AI-driven explanations of data changes?",
    options: [
      "Right-click the March bar and select 'Explain the increase' — Power BI's Analyze feature uses ML to identify which dimensions and values most contributed to the variance and shows a visual breakdown",
      "Use the Key Influencers visual on the date dimension",
      "Create a DAX measure comparing March to the average",
      "Drillthrough to a detail page filtered to March"
    ],
    correctIndex: 0,
    explanation: "The Analyze feature (right-click a data point → 'Explain the increase/decrease') uses automated ML to analyze what segments or field values drove a particular value change. It evaluates all related fields and presents the most impactful contributors in a visual format, enabling instant root cause analysis without additional modeling.",
    microsoftLinks: [
      { text: "Analyze feature", url: "https://learn.microsoft.com/power-bi/consumer/end-user-analyze-visuals" }
    ]
  },
  {
    id: 8,
    phase: "Apply and Customize a Theme",
    scenario: "Your company has a brand identity guide with specific hex colors (#003366 for primary, #FF6600 for accent) and fonts. You need all 12 reports in your workspace to follow this branding consistently without manually formatting each visual on each page.",
    question: "What's the most efficient approach?",
    options: [
      "Manually format every visual on every page to match brand colors",
      "Create a custom JSON theme file with brand colors and fonts, import it via View → Themes, and apply it across reports — the theme sets defaults for all visual types automatically",
      "Use a company-wide Power BI template (.pbit) file",
      "Set default colors in each visual's format pane"
    ],
    correctIndex: 1,
    explanation: "Power BI themes are JSON files that define default colors, fonts, background colors, and visual-specific formatting properties. Importing a theme applies these defaults to all visuals simultaneously. Creating a brand theme file and sharing it across the team ensures consistency. Template files (.pbit) also help but themes are more granularly controllable.",
    microsoftLinks: [
      { text: "Power BI themes", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-report-themes" },
      { text: "Create JSON theme", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-report-themes#setting-structural-formatting-with-json" }
    ]
  },
  {
    id: 9,
    phase: "Selection Pane",
    scenario: "Your report page has a logo, a background shape, 3 title text boxes, and 6 data visuals. During a presentation, you want to gradually reveal visuals one by one using bookmarks. You need to control the layering order (z-index) and hide certain elements.",
    question: "How do you manage the visibility and order of elements?",
    options: [
      "Use the Format pane on each visual to set visibility",
      "Use the Selection pane (View → Selection) — it lists all page objects, lets you rename them, control their visibility (eye icon), set tab order, and group/layer elements using drag-and-drop reordering",
      "Bookmarks automatically handle element ordering",
      "Use a theme file to specify z-index of visuals"
    ],
    correctIndex: 1,
    explanation: "The Selection pane is the control center for report layout management. It shows all objects on the page, lets you toggle visibility, rename items for easier bookmark management, reorder z-index by dragging, create groups, and set accessibility tab order. Combined with bookmarks, it enables sophisticated progressive revelation storytelling.",
    microsoftLinks: [
      { text: "Selection pane", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-select-and-selection-pane" }
    ]
  },
  {
    id: 10,
    phase: "Personalized Visuals",
    scenario: "Different business units need to explore data differently — Sales wants to see results by Region, Finance wants by Cost Center, Operations by Facility. You don't want to create separate pages for each. Users should be able to customize visuals themselves.",
    question: "What feature allows report consumers to personalize visuals?",
    options: [
      "Publish separate reports per department",
      "Enable 'Personalize visuals' in report settings — consumers can then change visual type, swap fields, adjust aggregations, and apply their own formatting, saving their view without affecting the original report",
      "Use field parameters to switch dimensions",
      "Give users Edit permissions to the report"
    ],
    correctIndex: 1,
    explanation: "Personalize Visuals is a report setting (File → Options → Report settings → Allow report readers to personalize visuals) that gives consumers a 'Personalize' button on each visual. Users can change visual types, add/remove fields, and modify formatting. Their customizations are saved per-user and don't affect the original report.",
    microsoftLinks: [
      { text: "Personalized visuals", url: "https://learn.microsoft.com/power-bi/create-reports/power-bi-personalize-visuals" }
    ]
  },
  {
    id: 11,
    phase: "Automatic Page Refresh",
    scenario: "Your operations team has a real-time monitoring dashboard in DirectQuery mode. They need data to refresh automatically every 30 seconds without manually pressing refresh. Scheduled dataset refresh only goes to 8 times per day.",
    question: "What Power BI feature enables sub-minute, automatic visual refresh?",
    options: [
      "Set the dataset scheduled refresh to every 30 minutes and ask users to reload the browser",
      "Enable Automatic Page Refresh in Page settings — it automatically re-queries the DirectQuery source at a configured interval (minimum varies by capacity), without manual user action",
      "Use a Power Automate flow to trigger dataset refresh every 30 seconds",
      "Switch to Import mode with a 30-second scheduled refresh"
    ],
    correctIndex: 1,
    explanation: "Automatic Page Refresh is available for DirectQuery and some streaming datasets. Configured in Format → Page → Page refresh, it sends queries to the source at the specified interval. 'Fixed interval' refreshes on a schedule; 'Change detection' refreshes only when a designated measure changes value. Import mode doesn't support sub-minute refresh.",
    microsoftLinks: [
      { text: "Automatic page refresh", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-automatic-page-refresh" }
    ]
  },
  {
    id: 12,
    phase: "Export Settings",
    scenario: "Your company has a strict data governance policy: users should not be able to export underlying row-level data from sensitive reports. However, summarized visual data exports are acceptable. You need to configure this restriction without disabling all export capabilities.",
    question: "How do you configure granular export permissions?",
    options: [
      "Disable exports entirely for the workspace",
      "In the report's Settings in Power BI Service, configure 'Export data' to allow summarized data only (visual-level aggregates) but disable 'Underlying data' export, preventing row-level data extraction",
      "Apply RLS to restrict data access, which automatically restricts exports",
      "Use sensitivity labels to prevent all data exports"
    ],
    correctIndex: 1,
    explanation: "Power BI reports have granular export control. In Service settings, you can allow or disable: Summarized data (what's in the visual), Underlying data (full row-level data), and Export to Excel. This lets governance teams permit exploratory data access while preventing bulk data extraction from sensitive reports.",
    microsoftLinks: [
      { text: "Configure export settings", url: "https://learn.microsoft.com/power-bi/admin/service-admin-portal-export-sharing" },
      { text: "Data export options", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-export-data" }
    ]
  }
];export default questions;
