// PL-300 Questions: Visualize and Analyze the Data domain — 5 per topic

export const visualizeAnalyzeQuestions = [

  // topic: Select an appropriate visual
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Select an appropriate visual",
    question: "Which visual type is best for showing correlation between two numeric variables?",
    options: ["Bar chart","Line chart","Scatter chart","Pie chart"],
    correct: 2,
    explanation: "Scatter charts plot two numeric values on X and Y axes, making them ideal for identifying correlation or relationships between variables."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Select an appropriate visual",
    question: "Which visual type is best for showing a part-to-whole relationship across a small number of categories?",
    options: ["Scatter chart","Line chart","Pie or Donut chart","Waterfall chart"],
    correct: 2,
    explanation: "Pie and Donut charts are appropriate for showing proportions of a whole, but only when there are fewer than 5-6 categories — otherwise use a bar chart."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Select an appropriate visual",
    question: "What visual is best for showing how a value changes step-by-step (e.g. starting revenue, additions, subtractions, ending revenue)?",
    options: ["Bar chart","Waterfall chart","Line chart","Treemap"],
    correct: 1,
    explanation: "Waterfall charts show sequential positive and negative contributions to a running total — ideal for showing how a value arrives at its final amount."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Select an appropriate visual",
    question: "Which visual type is most appropriate for showing hierarchical data where proportions at each level matter?",
    options: ["Bar chart","Matrix","Treemap","Line chart"],
    correct: 2,
    explanation: "Treemaps display hierarchical data as nested rectangles sized by value — excellent for showing proportions within a category hierarchy."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Select an appropriate visual",
    question: "A report needs to show actual sales vs. a target for each product. Which visual most clearly communicates this comparison?",
    options: ["Pie chart","Clustered bar or column chart with two measures","Scatter plot","Treemap"],
    correct: 1,
    explanation: "Clustered bar/column charts excel at side-by-side comparisons — showing Actual and Target as two bars per product makes the comparison clear and immediate."
  },

  // topic: Format and configure visuals
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Format and configure visuals",
    question: "What do error bars on a visual represent?",
    options: ["Incorrect data that needs to be fixed","Data uncertainty, variance, or confidence intervals around values","Visual formatting errors","Missing data in the dataset"],
    correct: 1,
    explanation: "Error bars show the range of uncertainty or variability around data points — useful for statistical analysis and communicating confidence intervals."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Format and configure visuals",
    question: "Where do you configure a visual's title, legend, and axis labels in Power BI Desktop?",
    options: ["The Filters pane","The Format pane (paint roller icon) for the selected visual","The Visualizations pane > Values field well","The View tab > Format options"],
    correct: 1,
    explanation: "All visual formatting options — title, legend, axes, colors, labels, etc. — are found in the Format pane (paint roller icon) when the visual is selected."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Format and configure visuals",
    question: "What is the purpose of 'Data labels' on a bar chart?",
    options: ["They show the axis scale","They display the exact value for each bar directly on or near the bar","They add a legend to the chart","They highlight the largest value"],
    correct: 1,
    explanation: "Data labels display the numeric value for each data point directly on the visual, allowing readers to see exact values without estimating from the axis."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Format and configure visuals",
    question: "How do you set a consistent Y-axis range (e.g. 0 to 1000) so it doesn't auto-scale with filters?",
    options: ["Edit the measure to always return values in that range","In the Format pane, set a fixed Minimum and Maximum for the Y-axis","Use a report-level filter to limit values","Axis ranges cannot be manually set"],
    correct: 1,
    explanation: "Setting a fixed Minimum and Maximum in the Format pane's Y-axis section prevents the chart from auto-scaling when filters change — useful for consistent visual comparisons."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Format and configure visuals",
    question: "What does enabling 'Show items with no data' on a visual axis do?",
    options: ["Removes rows with no data from the visual","Displays all category values even when there is no corresponding data for the current filter","Converts blank values to zero","Shows nulls as a separate category called 'Blank'"],
    correct: 1,
    explanation: "'Show items with no data' displays all category axis values (e.g. all products) even if there are no sales for that item in the current filter context."
  },

  // topic: Create a narrative visual with Copilot
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create a narrative visual with Copilot",
    question: "What does the 'Narrative visual' created with Copilot do?",
    options: ["Creates a new data table","Generates AI-written natural language summaries of data trends and insights","Produces a speech-to-text transcription","Creates animated data stories"],
    correct: 1,
    explanation: "Copilot's Narrative visual automatically generates natural language text summaries that describe key trends, comparisons, and insights from the underlying data."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create a narrative visual with Copilot",
    question: "What capacity is required to use Copilot narrative visuals in Power BI?",
    options: ["Power BI Free","Power BI Pro only","Microsoft Fabric or Power BI Premium capacity","No special capacity — available in all editions"],
    correct: 2,
    explanation: "Copilot features in Power BI require Microsoft Fabric capacity (F64+) or Power BI Premium (P1+) — they are not available on Pro or Free licenses."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create a narrative visual with Copilot",
    question: "After Copilot generates a narrative visual, what should a report author do before publishing?",
    options: ["Publish immediately — Copilot narratives are always accurate","Review and edit the generated text to ensure it reflects correct business context and terminology","Delete it and write the narrative manually","Lock the narrative to prevent future changes"],
    correct: 1,
    explanation: "Copilot-generated narratives may use incorrect terminology or miss business context. Always review and edit the text before publishing to end users."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create a narrative visual with Copilot",
    question: "What data does the Copilot Narrative visual use to generate its summaries?",
    options: ["Only data visible in other visuals on the same page","The underlying semantic model fields and measures selected for the visual","External web data retrieved at runtime","Only the last 100 rows of the dataset"],
    correct: 1,
    explanation: "The Narrative visual analyzes the semantic model fields and measures connected to it, generating summaries based on the actual data rather than pre-written templates."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create a narrative visual with Copilot",
    question: "What is one limitation of the Copilot Narrative visual?",
    options: ["It only works with numeric data","It cannot be resized on the canvas","The narrative may not update automatically when filters change unless configured to do so","It requires an internet connection at all times"],
    correct: 2,
    explanation: "Whether the narrative auto-updates with filter changes depends on configuration. Users should verify that the narrative reflects the current filtered view correctly."
  },

  // topic: Apply and customize a theme
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply and customize a theme",
    question: "How can you apply a custom organizational theme to a Power BI report?",
    options: ["Edit each visual's format individually","Import a JSON theme file via View > Themes > Browse for themes","Themes cannot be customized — only built-in themes are available","Use DAX to define color values"],
    correct: 1,
    explanation: "Custom themes are defined in JSON files and imported via View > Themes > Browse for themes, applying consistent branding across all visuals at once."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply and customize a theme",
    question: "What does a Power BI theme JSON file control?",
    options: ["Only background colors","Visual colors, fonts, visual-level formatting defaults, and filter pane settings","Data refresh schedules","Security and RLS settings"],
    correct: 1,
    explanation: "Theme JSON files define the report's color palette, font families, default visual formatting, and other design tokens applied globally."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply and customize a theme",
    question: "When should you apply a report theme?",
    options: ["After completing all report design","At the very beginning of report design — changing the theme later may alter already-formatted visuals","Themes can only be applied after publishing","Themes only apply to new visuals added after the theme is set"],
    correct: 1,
    explanation: "Apply the theme at the start of report design so all new visuals automatically inherit the correct colors and fonts, avoiding rework later."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply and customize a theme",
    question: "Can you customize a theme directly within Power BI Desktop without editing JSON?",
    options: ["No — JSON editing is required for all theme changes","Yes — via View > Themes > Customize current theme, which provides a GUI for color and font changes","Themes are read-only once applied","Only Premium users can customize themes"],
    correct: 1,
    explanation: "Power BI Desktop's 'Customize current theme' dialog allows GUI-based customization of colors and fonts, which can then be exported as a JSON file for reuse."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply and customize a theme",
    question: "A report needs to match company brand colors. What is the most efficient approach?",
    options: ["Change each visual's color manually","Create a theme JSON file with the brand colors and import it — applies to all visuals at once","Use conditional formatting on every visual","Add a background image with the brand colors"],
    correct: 1,
    explanation: "A theme JSON file with brand colors applies across all visuals simultaneously — far more efficient than manually setting colors on each visual individually."
  },

  // topic: Apply conditional formatting
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply conditional formatting",
    question: "Which conditional formatting option creates horizontal bars inside table cells to compare values visually?",
    options: ["Background color","Data bars","Icons","Font color"],
    correct: 1,
    explanation: "Data bars create horizontal bars within table or matrix cells, giving users an instant visual comparison of relative values without leaving the table."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply conditional formatting",
    question: "What is the 'Rules' option in conditional formatting used for?",
    options: ["Applying different colors based on numeric threshold ranges (e.g. Red if < 50, Yellow if 50-75, Green if > 75)","Filtering which rows to show in a table","Sorting the table by the conditional column","Setting axis ranges based on data values"],
    correct: 0,
    explanation: "The Rules option lets you define threshold-based color coding (RAG status) — specifying different colors for different value ranges."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply conditional formatting",
    question: "Can you apply conditional formatting based on a measure rather than the column's own values?",
    options: ["No — conditional formatting only uses the column being formatted","Yes — you can base the formatting on a different field or measure value","Only with Premium capacity","Only for background color, not font color"],
    correct: 1,
    explanation: "Conditional formatting can be driven by any measure or field — e.g. color a sales column based on a separate 'Variance %' measure rather than the sales value itself."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply conditional formatting",
    question: "Which visual types support conditional formatting?",
    options: ["Only tables","Tables, matrices, and some chart visuals (bar/column colors can be conditionally formatted)","Only matrices","Only card visuals"],
    correct: 1,
    explanation: "Conditional formatting is available on tables, matrices, and on the fill colors of bar/column charts — allowing dynamic color coding across multiple visual types."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply conditional formatting",
    question: "What does 'Icon sets' conditional formatting add to a table column?",
    options: ["Interactive sort arrows","Small icons (e.g. traffic lights, arrows) based on value thresholds to visually indicate status","Hyperlinks to related reports","Sparkline charts within each cell"],
    correct: 1,
    explanation: "Icon sets display traffic light circles, directional arrows, or other symbols next to values — providing immediate visual status indicators based on threshold rules."
  },

  // topic: Apply slicing and filtering
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply slicing and filtering",
    question: "What is the difference between a slicer and a page-level filter?",
    options: ["No difference — both work the same way","Slicers are visible, interactive controls on the canvas; page-level filters work in the Filters pane and may be hidden","Slicers are always faster than page-level filters","Page-level filters apply to all report pages; slicers apply to all pages too"],
    correct: 1,
    explanation: "Slicers are visible canvas controls users interact with. Page-level filters work behind the scenes in the Filters pane and can be hidden from end users."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply slicing and filtering",
    question: "What is the scope of a report-level filter?",
    options: ["It applies to a single visual only","It applies to all visuals on the current page","It applies to all visuals on all pages in the report","It applies to all reports in the workspace"],
    correct: 2,
    explanation: "Report-level filters apply across all pages and all visuals in the report — useful for permanent constraints like 'only show active customers'."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply slicing and filtering",
    question: "What slicer type is most appropriate for filtering a date column by a relative time period (e.g. last 30 days)?",
    options: ["List slicer","Dropdown slicer","Relative date slicer","Between slicer"],
    correct: 2,
    explanation: "The Relative date slicer filters dates dynamically relative to today — e.g. 'last 30 days' updates automatically without manual adjustment."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply slicing and filtering",
    question: "What is 'cross-filtering' in the context of visuals and slicers?",
    options: ["When a slicer applies filters across multiple report pages","When selecting a value in one visual automatically filters other visuals on the same page","When a filter applies to all tables in the model","When two slicers filter the same column simultaneously"],
    correct: 1,
    explanation: "Cross-filtering occurs when interacting with one visual (clicking a bar, for example) automatically applies that selection as a filter to other visuals on the page."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Apply slicing and filtering",
    question: "How do you prevent a specific visual from being filtered by a slicer on the same page?",
    options: ["Delete the slicer","Use Edit Interactions to set the slicer's interaction to 'None' for that specific visual","Move the visual to a different page","Add a visual-level filter with the opposite condition"],
    correct: 1,
    explanation: "Edit Interactions (Format > Edit Interactions) lets you set a specific visual to 'None' for a slicer, so that slicer does not filter that visual."
  },

  // topic: Use Copilot to create a new report page
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Use Copilot to create a new report page",
    question: "What does 'Use Copilot to create a new report page' do in Power BI?",
    options: ["Imports a report template from Microsoft","Generates a complete report page with suggested visuals based on the semantic model and a user prompt","Creates a blank page with pre-set formatting","Duplicates the current report page"],
    correct: 1,
    explanation: "Copilot analyzes the semantic model and generates a full report page — including visuals, layout, and titles — based on the user's natural language prompt."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Use Copilot to create a new report page",
    question: "How do you improve the quality of pages generated by Copilot?",
    options: ["Use more measures in the model","Provide clear, specific natural language prompts and ensure field names and descriptions in the model are meaningful","Purchase a higher Power BI license","Copilot quality cannot be influenced by the user"],
    correct: 1,
    explanation: "Copilot uses field names and descriptions to generate relevant visuals. Clear, descriptive field names and good measure descriptions lead to better Copilot output."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Use Copilot to create a new report page",
    question: "After Copilot generates a report page, can you modify the generated visuals?",
    options: ["No — Copilot-generated pages are locked and read-only","Yes — the generated page is fully editable like any manually created page","Only the titles can be changed","Only visual types can be changed, not the data fields"],
    correct: 1,
    explanation: "Copilot-generated pages are regular Power BI pages — all visuals, fields, and formatting are fully editable after generation."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Use Copilot to create a new report page",
    question: "Where do you find the Copilot feature to create a new report page in Power BI Desktop?",
    options: ["File > New > Copilot Page","Home tab > Copilot button (Copilot pane)","View > Copilot","Insert > AI Page"],
    correct: 1,
    explanation: "The Copilot button on the Home tab opens the Copilot pane where you can enter a natural language prompt to generate a report page."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Use Copilot to create a new report page",
    question: "What happens if your semantic model has poorly named fields (e.g. 'Col1', 'Tbl_Fct_Rev') when using Copilot?",
    options: ["Copilot ignores field names and uses data patterns instead","Copilot may generate irrelevant or incorrect visuals because it relies on field names to understand context","The page generation fails with an error","Copilot automatically renames the fields"],
    correct: 1,
    explanation: "Copilot uses field names and descriptions to understand model context. Poorly named fields lead to lower quality or irrelevant visual suggestions."
  },

  // topic: Choose when to use a paginated report
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Choose when to use a paginated report",
    question: "When should you use a paginated report instead of a standard Power BI report?",
    options: ["For interactive dashboards with slicers and drill-through","For print-ready documents with precise layouts like invoices, statements, or certificates","For real-time streaming data","For mobile device optimization"],
    correct: 1,
    explanation: "Paginated reports are designed for pixel-perfect, print-ready output with exact page breaks and layouts — ideal for invoices, financial statements, and certificates."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Choose when to use a paginated report",
    question: "What tool is used to create paginated reports for Power BI?",
    options: ["Power BI Desktop","Power BI Report Builder (a separate desktop application)","Microsoft Excel","SQL Server Reporting Services only"],
    correct: 1,
    explanation: "Power BI Report Builder is the dedicated tool for creating paginated reports (.rdl files) for Power BI Service."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Choose when to use a paginated report",
    question: "What is a key characteristic of paginated reports regarding data volume?",
    options: ["They are limited to 100 rows","They are designed to render all rows — no row limit — making them ideal for complete data exports","They can only show data summaries","They require aggregated data"],
    correct: 1,
    explanation: "Paginated reports render every row of data, making them suitable for complete extracts and high-volume outputs like listing all 50,000 transactions in a period."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Choose when to use a paginated report",
    question: "Which of these scenarios should use a paginated report rather than a standard Power BI report?",
    options: ["An executive dashboard showing KPIs with drill-through","A monthly customer statement that must be printable with exact page breaks per customer","A real-time sales leaderboard","An interactive product performance analysis with slicers"],
    correct: 1,
    explanation: "Monthly customer statements require exact page layout, one customer per section with precise page breaks — this is a paginated report use case."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Choose when to use a paginated report",
    question: "Can paginated reports be embedded in Power BI apps alongside standard reports?",
    options: ["No — paginated reports are only available in SSRS","Yes — paginated reports published to Power BI Service can be included in Power BI apps alongside standard reports","Only with Premium capacity per user (PPU)","Only if they are converted to standard reports first"],
    correct: 1,
    explanation: "Paginated reports can be published to Power BI Service workspaces and included in Power BI apps, alongside standard interactive reports."
  },

  // topic: Create visual calculations by using DAX
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create visual calculations by using DAX",
    question: "What is unique about visual calculations compared to regular DAX measures?",
    options: ["Visual calculations are faster than measures","Visual calculations are scoped to the visual matrix — they can reference previous/next rows and running context","Visual calculations replace the need for measures","Visual calculations are only available in Premium workspaces"],
    correct: 1,
    explanation: "Visual calculations operate within the visual's matrix structure, enabling running totals, ranks, and row-relative comparisons that standard measures can't easily express."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create visual calculations by using DAX",
    question: "What is a key limitation of visual calculations?",
    options: ["They cannot use DAX functions","They are scoped to one visual and cannot be reused across other visuals or exported to the model","They only work on matrix visuals","They require Premium capacity"],
    correct: 1,
    explanation: "Visual calculations exist only within the specific visual — they are not model measures and cannot be reused in other visuals or shared across reports."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create visual calculations by using DAX",
    question: "Which DAX function in visual calculations references the value from the previous row in the visual matrix?",
    options: ["PREVIOUS()","LAG()","OFFSET(-1)","LOOKUPVALUE()"],
    correct: 2,
    explanation: "OFFSET(-1) in visual calculations references the value from the previous row within the visual's matrix context."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create visual calculations by using DAX",
    question: "What scenario is visual calculation RUNNINGSUM() most useful for?",
    options: ["Calculating total sales across all products","Creating a cumulative running total within the visual without adding a model measure","Comparing this year to last year","Applying conditional formatting based on values"],
    correct: 1,
    explanation: "RUNNINGSUM() creates a cumulative running total within the visual matrix context — ideal for waterfall/cumulative charts without requiring a separate model measure."
  },
  {
    domain: "visualize_analyze", section: "Create reports",
    topic: "Create visual calculations by using DAX",
    question: "Where do you add a visual calculation in Power BI Desktop?",
    options: ["In the Modeling tab > New Measure","By selecting the visual and clicking 'New visual calculation' in the visual's context menu or ribbon","In the Format pane","In Power Query Editor"],
    correct: 1,
    explanation: "Visual calculations are added by selecting the visual and using the 'New visual calculation' option, opening a formula bar scoped to that visual's matrix."
  },

  // topic: Configure bookmarks
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure bookmarks",
    question: "What does a bookmark capture in Power BI?",
    options: ["Only visual positions on the page","Current state of filters, visual visibility, slicer selections, and page navigation","Only the data at that point in time","User credentials and access settings"],
    correct: 1,
    explanation: "Bookmarks capture filters, slicer states, visual visibility, spotlight, and current page — enabling interactive navigation and storytelling."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure bookmarks",
    question: "How do you create a 'Reset Filters' button using bookmarks?",
    options: ["Add a button with the built-in 'Reset' action type","Create a bookmark with all slicers in their default state, then assign that bookmark to a button's action","Use a page-level filter that resets on click","Write DAX to clear all filters"],
    correct: 1,
    explanation: "Create a bookmark with default slicer states, then set a button's action to 'Bookmark' pointing to that bookmark — clicking the button restores the default state."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure bookmarks",
    question: "What are the three bookmark capture options and what do they control?",
    options: ["Red, Yellow, Green — color coding of the bookmark","Data (filter context), Display (visual visibility), and Current page — controlling what the bookmark captures","Save, Load, Delete — bookmark management options","High, Medium, Low — bookmark priority levels"],
    correct: 1,
    explanation: "Bookmarks can capture Data (filters/slicers), Display (visibility/spotlight), and Current page — allowing fine control over what each bookmark stores."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure bookmarks",
    question: "How do you use bookmarks to show/hide a panel or visual (e.g. an information overlay)?",
    options: ["Use the Delete key to remove the visual when not needed","Create two bookmarks — one with the panel visible, one hidden — and toggle between them with buttons","Bookmarks cannot control visual visibility","Use conditional formatting to hide visuals"],
    correct: 1,
    explanation: "Create two bookmarks capturing the Display state — one with the panel shown and one hidden. Assign each to a button to toggle the panel on/off."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure bookmarks",
    question: "When a bookmark is applied, which pane allows you to control which visuals' states are included?",
    options: ["Format pane","Selection pane — each visual can be individually included or excluded from the bookmark","Filters pane","Visualizations pane"],
    correct: 1,
    explanation: "The Selection pane shows all visuals on the page. When updating a bookmark, you can right-click individual visuals to include or exclude their state from the bookmark."
  },

  // topic: Create custom tooltips
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Create custom tooltips",
    question: "How do you create a custom tooltip page in Power BI?",
    options: ["Write HTML code in the tooltip field","Create a report page, enable 'Allow use as tooltip' in page settings, then reference it in the visual's tooltip settings","Custom tooltips require Premium capacity","Use JavaScript to define tooltip content"],
    correct: 1,
    explanation: "Create a dedicated page, turn on 'Allow use as tooltip' in Page settings, then select it as the tooltip page in the target visual's Format > Tooltips."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Create custom tooltips",
    question: "What canvas size should you use for a tooltip page?",
    options: ["The same size as the main report page","The Tooltip preset canvas size (approximately 320x240 pixels) for proper scaling","A widescreen 16:9 canvas","Custom tooltips use a fixed size that cannot be changed"],
    correct: 1,
    explanation: "Setting the tooltip page canvas to the 'Tooltip' preset ensures the page scales correctly when displayed as a hover tooltip on a visual."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Create custom tooltips",
    question: "What context does a custom tooltip page receive when a user hovers over a data point?",
    options: ["No context — it always shows the same data","The filter context of the hovered data point — the tooltip visuals are filtered to that specific value","All data from the model unfiltered","Only the data visible in the source visual"],
    correct: 1,
    explanation: "The custom tooltip page receives the filter context of the hovered data point, so all visuals on the tooltip page show data filtered to that specific item."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Create custom tooltips",
    question: "How do you assign a custom tooltip page to a specific visual?",
    options: ["Drag the tooltip page onto the visual","In the visual's Format pane > Tooltips, change Type to 'Report page' and select the tooltip page","Right-click the visual and select 'Set tooltip page'","Tooltip pages are automatically assigned to all visuals"],
    correct: 1,
    explanation: "In the Format pane for the target visual, under Tooltips, change Type from Default to Report page and select the desired tooltip page from the dropdown."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Create custom tooltips",
    question: "What visuals can you include on a custom tooltip page?",
    options: ["Only KPI cards","Any standard Power BI visuals — charts, tables, cards, images, etc.","Only text boxes","Only the same visual type as the source visual"],
    correct: 1,
    explanation: "Tooltip pages can contain any Power BI visual — charts, tables, cards, KPIs, images — enabling rich, context-aware hover experiences."
  },

  // topic: Edit and configure interactions between visuals
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Edit and configure interactions between visuals",
    question: "What are the three interaction types configurable between visuals?",
    options: ["Fast, Medium, Slow","Filter, Highlight, None","Include, Exclude, Ignore","Active, Inactive, Disabled"],
    correct: 1,
    explanation: "Visual interactions can be set to Filter (apply filter to other visual), Highlight (highlight subset), or None (no interaction between visuals)."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Edit and configure interactions between visuals",
    question: "How do you access the Edit Interactions mode in Power BI Desktop?",
    options: ["Right-click any visual > Edit Interactions","Select a visual, then go to Format tab > Edit Interactions","File > Edit Mode > Interactions","View tab > Interaction settings"],
    correct: 1,
    explanation: "Select the source visual, then click Format (or View) > Edit Interactions. Small interaction icons appear on all other visuals on the page."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Edit and configure interactions between visuals",
    question: "What is the difference between Filter and Highlight interactions?",
    options: ["No practical difference","Filter removes non-matching rows from the target visual; Highlight dims non-matching data but keeps the visual structure intact","Filter is faster than Highlight","Highlight only works on bar charts"],
    correct: 1,
    explanation: "Filter completely removes non-selected values from the target visual. Highlight dims non-selected values but keeps the visual context intact for comparison."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Edit and configure interactions between visuals",
    question: "Why might you set an interaction to 'None' between a summary card and detail visuals?",
    options: ["To improve performance","To prevent clicking the summary card from filtering detail visuals — the summary should always show totals regardless of other selections","None interactions cause errors on detail visuals","Summary cards cannot have interactions"],
    correct: 1,
    explanation: "Setting a summary card to 'None' interaction ensures it always displays the overall total even when users click other visuals — the card is unaffected by cross-filtering."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Edit and configure interactions between visuals",
    question: "Interaction settings are configured per source visual. If you have 5 visuals on a page, how many interaction configurations might exist?",
    options: ["1 global setting for all","Up to 5 × 4 = 20 pairwise configurations (each visual's effect on every other visual)","Only 5 — one per visual","Interactions cannot be configured between more than 2 visuals"],
    correct: 1,
    explanation: "Each visual can have different interaction settings (filter/highlight/none) for every other visual on the page — resulting in N × (N-1) possible pairwise configurations."
  },

  // topic: Configure drillthrough navigation
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure drillthrough navigation, including pages, filters, and buttons",
    question: "How does drillthrough navigation work in Power BI?",
    options: ["It expands a visual in place to show more detail","Right-clicking a data point navigates to a detail page pre-filtered by that value","It opens a new browser tab with filtered data","Drillthrough only works with hierarchy visuals"],
    correct: 1,
    explanation: "Drillthrough navigates to a dedicated detail page automatically pre-filtered by the selected value — configured by adding drillthrough fields to the target page."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure drillthrough navigation, including pages, filters, and buttons",
    question: "Where do you configure a drillthrough field on the target detail page?",
    options: ["In the source visual's Format pane","In the target page's Visualizations pane > Drillthrough field well","In the Filters pane of the source page","In the Modeling tab > Relationships"],
    correct: 1,
    explanation: "Drillthrough is configured on the target page — drag the drillthrough field (e.g. ProductName) into the Drillthrough field well in the Visualizations pane of the target page."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure drillthrough navigation, including pages, filters, and buttons",
    question: "What is automatically added to a drillthrough page after configuring a drillthrough field?",
    options: ["A table with all data for the drillthrough field","A Back button that returns users to the page they drilled from","A filter card showing the drillthrough context","An export button"],
    correct: 1,
    explanation: "Power BI automatically adds a Back button to drillthrough pages, allowing users to return to the page they came from while maintaining the previous filter state."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure drillthrough navigation, including pages, filters, and buttons",
    question: "What option allows users to drillthrough using a measure value rather than a dimension value?",
    options: ["Drillthrough on measures is not supported","Enable the 'Keep all filters' toggle on the drillthrough page","Add the measure to the drillthrough field well — measures can be drillthrough fields","Use a separate button with bookmarks"],
    correct: 2,
    explanation: "Measures can be added to the drillthrough field well, allowing users to right-click a measure value and navigate to a detail page filtered by that measure's context."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure drillthrough navigation, including pages, filters, and buttons",
    question: "What does enabling 'Keep all filters' on a drillthrough page do?",
    options: ["Prevents any filters from applying to the detail page","Passes all existing report filters (from slicers, etc.) to the drillthrough page in addition to the drillthrough context filter","Removes the drillthrough context filter","Locks all filters so users can't change them"],
    correct: 1,
    explanation: "'Keep all filters' passes all active report-level and page-level filters to the drillthrough page alongside the drillthrough field filter — giving users full context."
  },

  // topic: Design reports for mobile devices
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design reports for mobile devices",
    question: "Why is creating a mobile layout important?",
    options: ["Mobile layouts load faster on all devices","The desktop canvas layout doesn't scale well to portrait phone screens","Mobile layouts are required to publish to Power BI Service","Mobile users see different data than desktop users"],
    correct: 1,
    explanation: "The widescreen desktop layout doesn't adapt well to portrait mobile screens. The dedicated mobile layout lets you arrange visuals optimally for phones."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design reports for mobile devices",
    question: "How do you switch to the mobile layout editor in Power BI Desktop?",
    options: ["File > Mobile View","View tab > Mobile layout","Format > Mobile Preview","Insert > Mobile Canvas"],
    correct: 1,
    explanation: "The mobile layout editor is accessed via the View tab > Mobile layout in Power BI Desktop."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design reports for mobile devices",
    question: "In the mobile layout editor, which visuals are available to place on the mobile canvas?",
    options: ["Only new visuals must be created for mobile","All visuals already on the desktop page — you drag them from the available visuals panel onto the mobile canvas","Only table and card visuals work on mobile","Mobile layouts require a separate data connection"],
    correct: 1,
    explanation: "The mobile layout editor shows all visuals from the desktop page in a panel on the right. Drag the ones you want onto the portrait canvas and arrange them for mobile."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design reports for mobile devices",
    question: "What is best practice for mobile report design?",
    options: ["Include all visuals from the desktop version on mobile","Prioritize only the 3-4 most important KPIs and visuals for mobile — keep it simple and readable on a small screen","Use the same layout as desktop — mobile users expect consistency","Disable slicers on mobile"],
    correct: 1,
    explanation: "Mobile screens are small — show only the most critical KPIs and visuals. Dense desktop layouts are unusable on mobile. Keep the mobile experience simple and focused."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design reports for mobile devices",
    question: "What happens if a report doesn't have a mobile layout configured?",
    options: ["The report cannot be viewed on mobile","Power BI mobile apps display the desktop layout, which may not be optimised for portrait viewing","An error is shown to mobile users","The report auto-generates a mobile layout"],
    correct: 1,
    explanation: "Without a mobile layout, Power BI mobile apps display the desktop canvas, which users must zoom and scroll. It's functional but provides a poor experience."
  },

  // topic: Design and configure Power BI reports for accessibility
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design and configure Power BI reports for accessibility",
    question: "Which accessibility feature helps screen reader users navigate report visuals?",
    options: ["Setting tab order and adding alt text to visuals","Using bold fonts throughout the report","Adding a table of contents page","Using only high-contrast colors"],
    correct: 0,
    explanation: "Setting logical tab order via the Selection pane and adding descriptive alt text to visuals ensures screen readers (like Narrator) can meaningfully describe content."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design and configure Power BI reports for accessibility",
    question: "What should alt text for a bar chart contain?",
    options: ["'Bar chart'","A description of what the chart shows — e.g. 'Sales by Region bar chart showing Northeast leads at $1.2M for Q1 2024'","The name of the dataset","The visual's ID number"],
    correct: 1,
    explanation: "Alt text should describe what the visual shows, including key insights — not just the visual type. This helps screen reader users understand the data without seeing the chart."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design and configure Power BI reports for accessibility",
    question: "Why should you avoid using color alone to convey information in a report?",
    options: ["Color slows down report rendering","Users with color blindness may not distinguish colors — use shapes, patterns, or data labels alongside color","Color cannot be customised in Power BI","Report themes override color choices"],
    correct: 1,
    explanation: "Color-blind users (approximately 8% of males) may not distinguish red/green or other color pairs. Always use shapes, patterns, or text labels alongside color."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design and configure Power BI reports for accessibility",
    question: "Where do you set the tab order for visuals on a report page?",
    options: ["In the Format pane for each visual","In the Selection pane — use the tab order options to set the keyboard navigation sequence","In the View tab > Tab Order","In the Accessibility settings of Power BI Desktop"],
    correct: 1,
    explanation: "The Selection pane has a Tab order view where you can drag and reorder visuals to define the logical keyboard navigation sequence for screen readers."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Design and configure Power BI reports for accessibility",
    question: "What contrast ratio is recommended by WCAG 2.1 for normal text in a report to be accessible?",
    options: ["At least 1:1 (no requirement)","At least 3:1","At least 4.5:1","At least 10:1"],
    correct: 2,
    explanation: "WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text to ensure readability for low-vision users."
  },

  // topic: Configure automatic page refresh
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure automatic page refresh",
    question: "What data connection types support automatic page refresh in Power BI reports?",
    options: ["Import mode only","DirectQuery and DirectLake sources","All connection modes equally","Only Premium capacity datasets"],
    correct: 1,
    explanation: "Automatic page refresh requires DirectQuery or DirectLake connections — the data must be queried live. Import mode caches data, so page refresh doesn't reflect source changes."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure automatic page refresh",
    question: "Where do you configure automatic page refresh in Power BI Desktop?",
    options: ["File > Options > Refresh","Page information settings (Format pane when no visual is selected > Page refresh)","Modeling tab > Refresh settings","Home tab > Scheduled Refresh"],
    correct: 1,
    explanation: "Automatic page refresh is configured in the Page information format settings — click an empty area on the canvas, open the Format pane, and find Page refresh."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure automatic page refresh",
    question: "What are the two automatic page refresh types available in Power BI?",
    options: ["Fast and Slow","Fixed interval (refresh every N seconds/minutes) and Change detection (refresh when data changes)","Manual and Automatic","Push and Pull"],
    correct: 1,
    explanation: "Fixed interval refreshes the page at a regular interval. Change detection queries a specific measure and refreshes only when its value changes."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure automatic page refresh",
    question: "A Power BI admin can override minimum refresh intervals for automatic page refresh. Why is this important?",
    options: ["It prevents users from seeing live data","Very frequent page refresh can overload the data source — admins can set a minimum interval to protect source systems","Admins cannot override refresh intervals","It is only relevant for Premium capacity"],
    correct: 1,
    explanation: "Without a minimum interval limit, aggressive refresh rates could flood the data source with queries. Admins can set tenant-level or workspace-level minimum intervals to protect source systems."
  },
  {
    domain: "visualize_analyze", section: "Enhance reports for usability and storytelling",
    topic: "Configure automatic page refresh",
    question: "What is the 'Change detection' refresh type and when would you use it?",
    options: ["Refreshes only when the user manually clicks refresh","Monitors a specific measure and only triggers a page refresh when that measure's value changes — reduces unnecessary refresh cycles","Detects schema changes in the data source","Refreshes only when a new user opens the report"],
    correct: 1,
    explanation: "Change detection reduces unnecessary refreshes by only querying full data when a monitored measure value changes, rather than refreshing at fixed intervals regardless of data changes."
  },

  // topic: Use the Analyze feature in Power BI
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use the Analyze feature in Power BI",
    question: "What can you do with the 'Analyze' feature when right-clicking a data point?",
    options: ["Delete the data point from the dataset","Generate AI-driven explanations of increases, decreases, or distributions","Export only that data point to Excel","Change the visual type for that data point"],
    correct: 1,
    explanation: "The Analyze feature uses AI to automatically explain increases/decreases, find where a metric is different, or explain distributions — saving manual investigation time."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use the Analyze feature in Power BI",
    question: "On which visual type is the 'Analyze > Explain the increase' feature available?",
    options: ["Only scatter charts","Bar and column charts where the axis represents a date or sequential dimension","Only line charts","Only matrix visuals"],
    correct: 1,
    explanation: "The Explain the increase/decrease option is available on bar/column charts, analyzing which dimension values contributed most to the change between two data points."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use the Analyze feature in Power BI",
    question: "What does 'Analyze > Find where this distribution is different' do?",
    options: ["Removes outlier values from the distribution","Identifies which dimension slices show a statistically different distribution compared to the overall data","Shows the standard deviation of the distribution","Normalizes the distribution to a bell curve"],
    correct: 1,
    explanation: "This analysis finds dimension values (e.g. which regions, products, or segments) where the distribution of a metric differs significantly from the overall pattern."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use the Analyze feature in Power BI",
    question: "What does Power BI use to generate Analyze explanations?",
    options: ["Pre-written rule-based explanations","Machine learning and statistical analysis of the underlying model data","External web data","The user's recent browsing history in Power BI"],
    correct: 1,
    explanation: "Analyze uses automated ML and statistical analysis of the data model to identify the most significant contributing factors and generates explanations based on data patterns."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use the Analyze feature in Power BI",
    question: "What should you consider when interpreting results from the Analyze feature?",
    options: ["Results are always statistically correct and can be used without review","Results are AI-generated suggestions — they should be validated against business knowledge before being presented as facts","Results only apply to the current page filters","Results cannot be exported or shared"],
    correct: 1,
    explanation: "AI-generated analysis insights should be validated against business context — they provide hypotheses to investigate, not confirmed facts. Always review before presenting."
  },

  // topic: Use AI visuals
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use AI visuals",
    question: "What does the Key Influencers visual analyze?",
    options: ["Time-series trends","Which dimensions or factors most significantly affect a selected metric","Geographic distribution of values","Data quality and completeness"],
    correct: 1,
    explanation: "Key Influencers uses ML to identify which categorical dimensions (factors) have the greatest statistical impact on a selected numeric or categorical target metric."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use AI visuals",
    question: "What is the Decomposition Tree visual used for?",
    options: ["Showing organizational hierarchies","Interactively exploring and breaking down a measure by multiple dimensions to understand what drives the value","Displaying a decision tree model","Showing data lineage in the model"],
    correct: 1,
    explanation: "Decomposition Tree lets users interactively drill into a measure by choosing dimensions one at a time — excellent for ad-hoc root cause analysis without pre-built drill paths."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use AI visuals",
    question: "What is the Q&A visual and how does it work?",
    options: ["A visual that shows a FAQ list","A natural language query interface where users type questions in plain English and Power BI generates the appropriate visual","A chatbot for report navigation","A visual that shows data validation questions"],
    correct: 1,
    explanation: "The Q&A visual allows users to type natural language questions (e.g. 'total sales by region last year') and Power BI generates the appropriate visualization automatically."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use AI visuals",
    question: "In the Key Influencers visual, what does the 'Top segments' tab show?",
    options: ["The top-selling products","Groups (segments) of data where the target metric is significantly higher or lower than average","The top performing regions","The top contributing measures in the model"],
    correct: 1,
    explanation: "The Top segments tab in Key Influencers identifies clusters of data where the target metric behaves differently from the overall average."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use AI visuals",
    question: "When using Decomposition Tree, what does the 'AI split' option do?",
    options: ["Splits the visual into two separate charts","Automatically selects the next dimension that best explains the remaining variance in the measure","Applies an AI-generated filter to the tree","Exports the decomposition to an AI model"],
    correct: 1,
    explanation: "AI split automatically finds and selects the dimension that contributes the most to explaining the remaining variation — accelerating root cause exploration."
  },

  // topic: Use reference lines, error bars, and forecasting
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use reference lines, error bars, and forecasting",
    question: "Which advanced analytics feature predicts future values based on historical data patterns?",
    options: ["Clustering","Forecasting (exponential smoothing on line charts)","What-if parameters","Grouping and binning"],
    correct: 1,
    explanation: "Power BI's built-in Forecasting uses exponential smoothing on line charts to predict future values, with configurable confidence intervals."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use reference lines, error bars, and forecasting",
    question: "Where are analytics options like reference lines, trend lines, and forecasting found for a visual?",
    options: ["In the Visualizations pane Values well","In the Analytics pane (the magnifying glass icon in the Visualizations area)","In the Format pane > Analytics section","In the Data pane > Analytics options"],
    correct: 1,
    explanation: "The Analytics pane (magnifying glass icon) provides reference lines, trend lines, error bars, forecast, min/max lines, and percentile lines for applicable visual types."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use reference lines, error bars, and forecasting",
    question: "What configuration option for forecasting controls how far into the future the prediction extends?",
    options: ["Confidence interval","Forecast length (number of units forward to predict)","Seasonality","Ignore last N points"],
    correct: 1,
    explanation: "The Forecast length setting determines how many periods ahead the forecast line extends. Confidence interval controls the shaded uncertainty band around the prediction."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use reference lines, error bars, and forecasting",
    question: "What is a constant reference line and when would you use it?",
    options: ["A line that changes with each filter","A horizontal or vertical line at a fixed value — used to show targets, thresholds, or benchmarks","A line connecting two data points","A trend line based on statistical regression"],
    correct: 1,
    explanation: "A constant reference line shows a fixed value (e.g. a sales target of $500K) as a horizontal line across the chart — making above/below-target comparisons immediate."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Use reference lines, error bars, and forecasting",
    question: "What minimum data requirement does Power BI need to generate a forecast?",
    options: ["At least 2 data points","At least 4 data points — though more historical data produces more reliable forecasts","At least 24 months of data","No minimum — forecasting works with any amount of data"],
    correct: 1,
    explanation: "Power BI requires at least 4 data points to generate a forecast. More historical data (especially multiple seasonality cycles) produces significantly more accurate predictions."
  },

  // topic: Detect outliers and anomalies
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Detect outliers and anomalies",
    question: "What does the Anomaly Detection feature do in Power BI?",
    options: ["Removes outlier data points from the visual","Automatically identifies unexpected spikes or drops in time series data using AI","Highlights cells with data entry errors","Detects missing values in the dataset"],
    correct: 1,
    explanation: "Anomaly Detection is an AI-powered feature on line charts that automatically flags data points that deviate unexpectedly from the predicted range."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Detect outliers and anomalies",
    question: "On which visual type is Anomaly Detection available?",
    options: ["Bar charts and pie charts","Line charts with a continuous time axis","Scatter plots only","All visual types"],
    correct: 1,
    explanation: "Anomaly Detection is only available on line charts with a continuous date/time axis — it analyzes the time series pattern to identify deviations."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Detect outliers and anomalies",
    question: "What does clicking an anomaly marker on a line chart do?",
    options: ["Deletes the data point","Opens an explanation pane showing possible contributing factors identified by AI","Exports the anomaly data to Excel","Adds the anomaly to a watchlist"],
    correct: 1,
    explanation: "Clicking an anomaly marker opens the Anomalies pane on the right, showing AI-generated possible explanations based on which fields correlate with the anomalous value."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Detect outliers and anomalies",
    question: "How do you enable Anomaly Detection on a line chart?",
    options: ["Right-click the line > Add Anomaly Detection","In the Analytics pane > Add > Anomalies","In the Format pane > Anomaly Detection toggle","In the Modeling tab > AI Features"],
    correct: 1,
    explanation: "Anomaly Detection is added via the Analytics pane (magnifying glass icon) for the selected line chart — click Add under the Anomalies section."
  },
  {
    domain: "visualize_analyze", section: "Identify patterns and trends",
    topic: "Detect outliers and anomalies",
    question: "What does the 'Sensitivity' setting in Anomaly Detection control?",
    options: ["How sensitive the chart colors are to value changes","How strict the anomaly threshold is — higher sensitivity detects more anomalies; lower sensitivity only flags major deviations","How fast the anomaly detection algorithm runs","The confidence interval for the forecast"],
    correct: 1,
    explanation: "The Sensitivity slider adjusts the threshold for what is considered anomalous. Lower sensitivity shows only significant outliers; higher sensitivity shows more, potentially including minor fluctuations."
  }
];
