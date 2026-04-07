const questions = [
  {
    id: 1,
    phase: "Select Appropriate Visuals",
    scenario: "A regional VP wants a visual that shows both individual salesperson performance (as bars) and the overall team target line on the same chart. They also want bars color-coded based on whether the salesperson is above or below target.",
    question: "What's the best visual configuration?",
    options: [
      "Clustered bar chart with a slicer for above/below target",
      "A clustered column chart for sales values combined with a line visual using a constant line for the target, plus conditional formatting on the bars based on comparison to target",
      "A scatter chart with Sales on X and Target on Y",
      "A KPI visual for each salesperson"
    ],
    correctIndex: 1,
    explanation: "Clustered column charts support overlaid analytics lines (constant lines, average lines) through the Analytics pane. Conditional formatting can color bars based on a measure that compares each salesperson to target. This gives you the bar + target line + color coding all in one visual.",
    microsoftLinks: [
      { text: "Conditional formatting", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-conditional-table-formatting" },
      { text: "Analytics pane", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-analytics-pane" }
    ]
  },
  {
    id: 2,
    phase: "Conditional Formatting",
    scenario: "Your sales table visual shows Revenue, Cost, and Margin % for each product. You want Margin % cells to show: red background below 10%, yellow between 10-20%, green above 20%. You have a measure that calculates Margin %.",
    question: "How do you apply this gradient conditional formatting?",
    options: [
      "Create three separate calculated columns for each color threshold",
      "Select the Margin % column in the visual, go to Format → Conditional formatting → Background color, choose 'Rules' mode, and define the three threshold ranges with their respective colors",
      "Use DAX to return hex color codes and add a separate color column",
      "Conditional formatting only works on numeric columns, not percentage measures"
    ],
    correctIndex: 1,
    explanation: "Conditional formatting Rules mode lets you define threshold-based colors without modifying the data model. You specify criteria (is less than, is between, etc.) and assign colors for each rule. This is evaluated dynamically based on each row's value.",
    microsoftLinks: [
      { text: "Conditional formatting", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-conditional-table-formatting" }
    ]
  },
  {
    id: 3,
    phase: "Copilot — Narrative Visual",
    scenario: "Your executive dashboard shows several charts with complex trends. Executives want a plain-English summary of the key insights without having to interpret charts themselves. You want this summary to update automatically when data changes.",
    question: "What Power BI feature provides AI-generated narrative summaries of report data?",
    options: [
      "Use the Q&A visual and type a summary question",
      "Add a Smart Narrative visual (also accessible via Copilot's narrative visual capability) — it auto-generates and updates text summaries of visuals or the entire report, including key values, trends, and anomalies",
      "Write a static text box with DAX-driven dynamic text",
      "Use Power Automate to email a summary from Power BI"
    ],
    correctIndex: 1,
    explanation: "The Smart Narrative visual (enhanced by Copilot's narrative features) generates dynamic text summaries that update as data changes. It identifies key values, trends, and outliers and writes them in plain English. With Copilot enabled, you can prompt it to create custom narrative descriptions of your report data.",
    microsoftLinks: [
      { text: "Smart narrative visual", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-smart-narrative" },
      { text: "Copilot narrative visual", url: "https://learn.microsoft.com/power-bi/create-reports/copilot-create-report" }
    ]
  },
  {
    id: 4,
    phase: "Copilot — Create Report Pages",
    scenario: "You have a semantic model published in Power BI Service. A business analyst needs to quickly create an exploratory report without building it from scratch. The organization has Copilot enabled in their Fabric capacity.",
    question: "How can Copilot assist in creating the report?",
    options: [
      "Copilot can only modify existing reports, not create new ones",
      "Use Copilot to suggest a report page — it analyzes the semantic model, suggests relevant visuals and layouts, and can create a full report page based on natural language description of your analytical goals",
      "Copilot generates DAX measures only",
      "Copilot only works with specific certified datasets"
    ],
    correctIndex: 1,
    explanation: "Copilot in Power BI can suggest and create report pages by analyzing the underlying semantic model structure. You describe your analytical goals in natural language (e.g., 'Show me sales trends by region with year-over-year comparison'), and Copilot proposes visuals, layouts, and measures. This accelerates report building significantly.",
    microsoftLinks: [
      { text: "Copilot in Power BI", url: "https://learn.microsoft.com/power-bi/create-reports/copilot-introduction" },
      { text: "Create reports with Copilot", url: "https://learn.microsoft.com/power-bi/create-reports/copilot-create-report" }
    ]
  },
  {
    id: 5,
    phase: "Configure Report Page",
    scenario: "Your report has 6 pages. Users are confused about navigation — they accidentally click through to technical detail pages meant only for analysts. You want to create a clean navigation experience with a custom home page and hide certain pages from casual users.",
    question: "What combination of features achieves this?",
    options: [
      "Delete the analyst pages and create separate reports",
      "Use page navigation buttons with bookmarks to create a custom navigation menu, hide analyst pages from navigation using View → Hide Page, and use drillthrough to let analysts access detail pages contextually",
      "Use a page slicer to control which page is visible",
      "Create separate workspaces for different user types"
    ],
    correctIndex: 1,
    explanation: "Page navigation buttons (configured with Page Navigation action type) create clickable navigation between pages. Hidden pages (View → Hide Page) don't appear in the page tab bar but remain accessible via buttons or drillthrough. Bookmarks capture report state for navigation. Combined, these create a professional, guided navigation experience.",
    microsoftLinks: [
      { text: "Report page navigation", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-buttons" },
      { text: "Hide report pages", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-multi-select#hide-pages" }
    ]
  },
  {
    id: 6,
    phase: "Bookmarks and Interactions",
    scenario: "Your report shows a complex chart. Executives want to see a 'clean' view with no slicers during presentations, then switch back to the full analytical view. They want a button that toggles between these two states.",
    question: "What's the correct implementation?",
    options: [
      "Create two separate report pages — one for presentation, one for analysis",
      "Create two bookmarks: one capturing the default state with all slicers visible, another capturing the clean state with slicers hidden or reset. Assign both bookmarks to buttons using the Action type 'Bookmark'",
      "Use conditional formatting to hide slicers based on a measure",
      "Use the Selection pane to show/hide elements, but this requires manual action each time"
    ],
    correctIndex: 1,
    explanation: "Bookmarks capture the complete state of a report page: slicer values, visual visibility (via Selection pane), filter pane state, and scroll position. By creating two bookmarks representing different states and assigning them to buttons, you create a one-click toggle for users. This is a core report storytelling pattern.",
    microsoftLinks: [
      { text: "Bookmarks in Power BI", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-bookmarks" },
      { text: "Buttons and actions", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-buttons" }
    ]
  },
  {
    id: 7,
    phase: "Slicing, Filtering, and Sync Slicers",
    scenario: "Your report has 5 pages and a 'Region' slicer on each page. When users change the region on Page 1, the other pages don't update. Users have to re-select the region on every page, which is frustrating.",
    question: "What feature synchronizes slicer selections across multiple report pages?",
    options: [
      "Copy and paste the slicer to each page manually",
      "Use Sync Slicers (View → Sync slicers) to specify which pages each slicer syncs to and whether it's visible on those pages",
      "Use page-level filters instead of slicers",
      "Create a parameter table linked across pages"
    ],
    correctIndex: 1,
    explanation: "Sync Slicers allow a slicer to synchronize its selection state across multiple report pages. You control which pages sync (share the selection) and which pages display the slicer visually. A slicer can be visible on some pages but sync silently on others, maintaining consistent filter context throughout the report.",
    microsoftLinks: [
      { text: "Sync slicers", url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-slicers#sync-and-use-slicers-on-other-pages" }
    ]
  },
  {
    id: 8,
    phase: "Custom Tooltips",
    scenario: "You have a bar chart showing Sales by Product. When users hover over a bar, you want to show a rich tooltip with a sparkline trend, YoY comparison, and market share % — much more than the default single-value tooltip allows.",
    question: "How do you create this enhanced tooltip?",
    options: [
      "Add more fields to the Tooltips well in the visual",
      "Create a separate report page, set its Page type to 'Tooltip' in Page information settings, design it with the desired visuals, then assign it as the tooltip page in the main visual's Format settings",
      "Use conditional formatting to show extended information on hover",
      "Custom tooltips require custom visuals from AppSource"
    ],
    correctIndex: 1,
    explanation: "Tooltip pages are dedicated report pages designated as tooltip canvases. You design them like any report page (with multiple visuals, DAX measures, etc.), mark them as tooltip type in Page settings, then assign them to specific visuals. When users hover, the entire tooltip page appears, enabling rich, multi-visual hover experiences.",
    microsoftLinks: [
      { text: "Custom tooltips", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-custom-tooltips" }
    ]
  },
  {
    id: 9,
    phase: "Drillthrough Navigation",
    scenario: "Your summary page shows Sales by Region. You want users to be able to right-click any region and navigate to a detail page filtered to that region, showing customer-level transactions.",
    question: "How do you configure drillthrough navigation?",
    options: [
      "Use page navigation buttons with dynamic filters",
      "On the detail page, add the 'Region' field to the Drillthrough well. This automatically creates a back button and allows users to right-click any Region value on other pages to drill through to this detail page, pre-filtered to that region",
      "Use bookmarks with filter states for each region",
      "Configure the visual interaction from Summary to Detail page"
    ],
    correctIndex: 1,
    explanation: "Drillthrough works by adding a field to the target page's Drillthrough well. This registers that page as a drillthrough destination for that field. Users then right-click any visual containing that field value and select 'Drillthrough → [page name]'. Power BI automatically filters the destination page to the selected value.",
    microsoftLinks: [
      { text: "Drillthrough in Power BI", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-drillthrough" }
    ]
  },
  {
    id: 10,
    phase: "Visual Calculations",
    scenario: "You want to add a running total column to a table visual without creating a new DAX measure in the model. The running total should be relative to the sort order displayed in the visual, not based on a fixed date order in the data.",
    question: "What feature enables visual-level calculations without modifying the data model?",
    options: [
      "Add a RUNNINGSUM calculated column in Power Query",
      "Create a DAX measure using CALCULATE with a cumulative date filter",
      "Use Visual Calculations (preview) — DAX calculations defined directly on a visual that operate on its visual matrix, enabling running totals, moving averages, and ranks relative to the visual's context",
      "Use the Analytics pane to add a trend line"
    ],
    correctIndex: 2,
    explanation: "Visual Calculations are a newer Power BI feature allowing DAX expressions defined at the visual level that reference the visual's data structure (rows, columns, values) rather than the underlying model. Functions like RUNNINGSUM, MOVINGAVERAGE, and RANK operate relative to the visual layout, not the underlying table order.",
    microsoftLinks: [
      { text: "Visual calculations", url: "https://learn.microsoft.com/power-bi/transform-model/desktop-visual-calculations-overview" }
    ]
  },
  {
    id: 11,
    phase: "Mobile Design",
    scenario: "Your desktop report is optimized for widescreen viewing with 10 visuals in a grid layout. Mobile users are complaining that the report is too small and requires horizontal scrolling. You need to create a mobile-friendly version.",
    question: "What's the best approach?",
    options: [
      "Create a separate report specifically for mobile devices",
      "In View → Mobile layout, design a phone-optimized layout by arranging and sizing visuals vertically for portrait view — the same report automatically serves both desktop and mobile layouts",
      "Enable responsive layout in the report settings",
      "Reduce the number of visuals in the main report to fit mobile screens"
    ],
    correctIndex: 1,
    explanation: "Mobile layout view (View → Mobile layout) lets you design a phone-optimized arrangement within the same .pbix file. You pick which visuals to include and arrange them in a vertical, full-width portrait layout. The Power BI mobile app detects the device type and serves the appropriate layout, so you maintain one report with two layout experiences.",
    microsoftLinks: [
      { text: "Design mobile reports", url: "https://learn.microsoft.com/power-bi/create-reports/power-bi-create-mobile-optimized-report-mobile-layout-view" }
    ]
  },
  {
    id: 12,
    phase: "Accessibility",
    scenario: "Your company's accessibility team requires all Power BI reports to be usable by people with visual impairments using screen readers. You need to audit and improve your report's accessibility.",
    question: "Which Power BI accessibility features should you configure?",
    options: [
      "Accessibility is handled automatically by the browser — no configuration needed in Power BI",
      "Configure alt text on visuals, ensure sufficient color contrast, add tab order (Selection pane → Tab order), enable keyboard navigation, add titles and data labels, and test with the Accessibility checker",
      "Use high contrast theme only",
      "Convert all visuals to accessible tables"
    ],
    correctIndex: 1,
    explanation: "Power BI offers multiple accessibility features: alt text on visuals (for screen readers), tab order configuration via the Selection pane, keyboard navigation support, the Accessibility checker tool to identify issues, focus mode for individual visuals, and high contrast theme. A comprehensive approach uses all of these.",
    microsoftLinks: [
      { text: "Accessibility in Power BI", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-accessibility-overview" },
      { text: "Design accessible reports", url: "https://learn.microsoft.com/power-bi/create-reports/desktop-accessibility-creating-reports" }
    ]
  }
];export default questions;
