// Content for Visualization topics in "Create reports" section
export const visualizationTopicsContent = {
  "Select an appropriate visual": {
    overview: {
      title: "Choosing the Right Visualization Type",
      concepts: [
        "Different chart types suit different data patterns and analytical questions",
        "Line charts show trends over time, bar charts compare categories, scatter plots reveal relationships",
        "Small multiples (faceting) allow comparison across dimensions without chart clutter",
        "Understanding data distribution helps choose between binned histograms and unbinned scatter plots",
        "Accessibility considerations guide visual choices (color-blind friendly palettes, high contrast)"
      ]
    },
    bestPractices: [
      "Choose visuals based on the analytical question, not personal preference",
      "Use line charts for continuous data over time (trends)",
      "Use bar/column charts for categorical comparisons",
      "Use scatter plots to show relationships between two continuous variables",
      "Use pie charts sparingly (only for part-to-whole with few categories)",
      "Use maps when geographic location is meaningful to analysis",
      "Test visuals with stakeholders to ensure interpretation matches intent"
    ],
    commonMistakes: [
      "Using pie charts with many small slices that are hard to compare",
      "3D charts that look fancy but distort perception (especially pie/doughnut)",
      "Wrong chart type for the question (line chart for discrete categories)",
      "Cramming too much data into one visual making it unreadable",
      "Dual-axis charts with mismatched scales misleading viewers",
      "Ignoring color-blind accessibility in chart design"
    ],
    keySteps: [
      "Define the analytical question you're trying to answer",
      "Consider your data type: categorical, continuous, temporal, or geographic",
      "Consider the relationship you're showing: trend, comparison, composition, distribution, relationship",
      "Select appropriate visual from Power BI visuals gallery",
      "Configure visual with relevant fields for your data structure",
      "Test with actual data to verify the message comes through clearly"
    ],
    keyDecisions: [
      "**Showing trends over time?** - Line chart for continuous trends; Column for period comparison",
      "**Comparing categories?** - Bar chart (horizontal) or Column chart (vertical)",
      "**Showing relationships?** - Scatter plot for continuous variables; Bubble for three dimensions",
      "**Part-to-whole composition?** - Stacked bar/column; Pie only if few categories; Tree map for hierarchy",
      "**Geographic data?** - Map visual if location is meaningful; Otherwise use other chart types"
    ],
    keyDefinitions: [
      "**Line Chart**: Shows trends over time with connected points, best for temporal data",
      "**Bar/Column Chart**: Compares values across categories, horizontal (bar) or vertical (column)",
      "**Scatter Plot**: Shows relationship between two continuous variables with dots",
      "**Pie Chart**: Shows part-to-whole percentages (use sparingly, few slices only)",
      "**Map Visual**: Geographic representation of data based on location",
      "**Table/Matrix**: Detailed view of underlying data, good for precision and drill-down"
    ],
    risks: [
      "**Misinterpretation**: Wrong chart type leads viewers to wrong conclusions",
      "**Accessibility**: Color choices exclude color-blind viewers, small text hard to read",
      "**Clutter**: Too much data in one visual makes it unreadable and confusing",
      "**Distortion**: 3D effects or misleading axes exaggerate differences",
      "**Cognitive overload**: Dual-axis with different scales confuses interpretation",
      "**Poor performance**: Complex visuals with many data points render slowly"
    ],
    faqs: [
      {
        q: "When should I use a pie chart?",
        a: "Only for part-to-whole percentages with 2-3 categories. For more categories, use stacked bar chart or treemap."
      },
      {
        q: "What's better for comparison: bar or column chart?",
        a: "Column (vertical) for time series and fewer categories. Bar (horizontal) for many category labels that need readability."
      },
      {
        q: "How do I show trends and comparisons together?",
        a: "Use combo chart (line for trend, column for comparison) or create separate visuals for clarity."
      },
      {
        q: "Should I use dual-axis charts?",
        a: "Rarely. Better to use separate visuals. If necessary, ensure scales are comparable to avoid misleading viewers."
      },
      {
        q: "What visual shows the relationship between variables?",
        a: "Scatter plot for two continuous variables, bubble chart for three dimensions (X, Y, size)."
      }
    ],
    examTips: [
      "Know which chart types fit different data relationships (trend, comparison, composition, relationship)",
      "Understand line charts show trends, bars show comparisons, scatter shows relationships",
      "Remember pie charts should be used sparingly (few categories only)",
      "Know geographic data uses map visuals",
      "Recognize accessibility matters in visual selection (color-blind friendly)"
    ],
    resources: [
      {
        title: "Visualization types in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a",
        type: "Documentation"
      },
      {
        title: "Tips for designing better reports",
        url: "https://learn.microsoft.com/training/modules/power-bi-effective/",
        type: "Microsoft Learn"
      }
    ]
  },

  "Format and configure visuals": {
    overview: {
      title: "Visual Appearance and Behavior Configuration",
      concepts: [
        "Format options control colors, fonts, borders, backgrounds, and other appearance elements",
        "Visual properties (axis ranges, data label displays) affect interpretation",
        "Conditional formatting applies rules-based formatting based on data values",
        "Legend, title, and label configurations improve clarity and storytelling",
        "Interaction settings control how visuals respond to other visuals' filters"
      ]
    },
    bestPractices: [
      "Use consistent colors across report (brand colors, logical groupings)",
      "Apply data labels where they add clarity without clutter",
      "Use conditional formatting to highlight important values or exceptions",
      "Format axes with meaningful ranges and labels",
      "Include clear titles and descriptions for visuals",
      "Enable/disable legends based on whether they add value",
      "Test formatting with actual data to ensure colors and labels remain readable"
    ],
    commonMistakes: [
      "Too many colors making the visual look busy and confusing",
      "Data labels on every data point cluttering the visual",
      "Axis ranges that distort or minimize differences (too wide or too narrow)",
      "Inconsistent formatting across similar visuals",
      "Light colors on light backgrounds or dark on dark making text unreadable",
      "Conditional formatting with arbitrary thresholds that don't match business logic"
    ],
    keySteps: [
      "Select visual and access Format pane (usually paint bucket icon)",
      "Configure title: text, background, font size, alignment",
      "Format legend: show/hide, position, title, size",
      "Set data labels: show/hide, position, number format, background",
      "Configure axes: titles, ranges, labels, formatting",
      "Apply colors: data colors, background, borders",
      "Test formatting with data to verify readability and impact"
    ],
    keyDecisions: [
      "**Show legend?** - Multiple series: yes; Single series: no; Too many categories: maybe right edge",
      "**Data labels?** - Critical values: yes; Too many points: no; Use selectively",
      "**Axis ranges?** - Auto: let Power BI decide; Manual: only if there's a business reason",
      "**Color scheme?** - Default: usually good; Custom: ensure accessibility and consistency",
      "**Title/subtitle?** - Always include; Clear and descriptive, not redundant"
    ],
    keyDefinitions: [
      "**Format Pane**: Configuration interface for visual appearance and behavior",
      "**Data Labels**: Text showing data values directly on visual elements",
      "**Legend**: Key showing what colors/symbols represent in the visual",
      "**Axis Formatting**: Range, labels, and appearance of chart axes",
      "**Conditional Formatting**: Rules-based appearance changes based on data values",
      "**Visual Interaction**: Settings controlling how visual responds to other selections"
    ],
    risks: [
      "**Readability**: Too many formatting options make visual hard to read",
      "**Accessibility**: Color choices that exclude color-blind viewers",
      "**Clutter**: Too many labels and legend items overwhelm the visual",
      "**Misleading**: Axis range manipulation exaggerates or minimizes differences",
      "**Inconsistency**: Different formatting for similar visuals confuses interpretation",
      "**Performance**: Complex formatting with many conditional rules slow refresh"
    ],
    faqs: [
      {
        q: "How do I apply brand colors to my visuals?",
        a: "In Format pane, go to Data colors and set each series to your brand color palette."
      },
      {
        q: "Should I show all data labels?",
        a: "No - only on data points that are critical to your message. Too many labels clutter the visual."
      },
      {
        q: "How do I make unimportant values less visible?",
        a: "Use conditional formatting with lower opacity for values below a threshold, keeping them visible but de-emphasized."
      },
      {
        q: "Where should the legend go?",
        a: "Top/bottom for wide visuals, right side for tall visuals. Right-align for easier eye movement. Hide if only one series."
      },
      {
        q: "Can I format individual data points differently?",
        a: "Limited in standard visuals. Use conditional formatting rules or custom visuals for granular control."
      }
    ],
    examTips: [
      "Know where to access Format pane for visual configuration",
      "Understand data labels, legends, axes formatting options",
      "Remember conditional formatting highlights values by rules",
      "Recognize consistency in formatting across similar visuals",
      "Know accessibility matters in color and label choices"
    ],
    resources: [
      {
        title: "Format visualizations in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/service-getting-started-with-color-formatting-and-axis-properties",
        type: "Documentation"
      }
    ]
  },

  "Apply and customize a theme": {
    overview: {
      title: "Consistent Report Styling with Themes",
      concepts: [
        "Themes apply consistent colors, fonts, and styling across all report pages",
        "Power BI includes built-in themes or you can create custom JSON-based themes",
        "Theme consistency improves professionalism and brand alignment",
        "Custom themes can enforce organizational color palettes and typography",
        "Accessibility requirements (contrast ratios) should inform theme design"
      ]
    },
    bestPractices: [
      "Choose or create a theme before designing report for consistency",
      "Use organizational brand colors in custom themes",
      "Ensure sufficient contrast ratios for accessibility (WCAG AA standard)",
      "Apply font selections that are readable in both digital and printed formats",
      "Test theme on different monitor types and brightness settings",
      "Document custom theme decisions for team consistency",
      "Review theme colors against color-blind friendly requirements"
    ],
    commonMistakes: [
      "Mixing themes across report pages (inconsistent styling)",
      "Using light text on light backgrounds reducing readability",
      "Too many colors in theme overwhelming the design",
      "Ignoring accessibility contrast requirements",
      "Not testing theme colors on different displays",
      "Creating overly complex custom themes hard for others to maintain"
    ],
    keySteps: [
      "Go to View tab > Themes menu in Power BI Desktop",
      "Select built-in theme or 'Browse for themes' for custom JSON themes",
      "To create custom theme: export current theme > edit JSON file > upload modified theme",
      "Configure colors: background, text, accent colors for data visualization",
      "Set fonts: title, label, and general fonts for consistency",
      "Test theme on sample report to verify appearance and readability",
      "Apply theme to report (all pages automatically adopt theme styling)"
    ],
    keyDecisions: [
      "**Use built-in or custom theme?** - Standard: built-in; Brand alignment: custom theme",
      "**Light or dark background?** - Digital display: either works; Print: light better; Check brand guidelines",
      "**How many colors?** - Minimal: 5-7 colors; Standard: 10-15; Too many: hard to distinguish",
      "**Accessible color combinations?** - Check WCAG contrast ratios for text/background",
      "**Font selection?** - Sans-serif: modern, digital-friendly; Serif: traditional, formal"
    ],
    keyDefinitions: [
      "**Theme**: Predefined set of colors, fonts, and styling applied to entire report",
      "**Custom Theme**: JSON file defining colors, fonts, and visual properties",
      "**Built-in Theme**: Power BI provided themes (default, dark, colorblind, etc.)",
      "**Contrast Ratio**: Measure of readability between text and background colors",
      "**Brand Color Palette**: Organizational colors used in custom themes",
      "**Theme Consistency**: Uniform styling across all report pages"
    ],
    risks: [
      "**Accessibility**: Poor color contrast makes visuals unreadable for low-vision users",
      "**Inconsistency**: Manual color changes break theme consistency",
      "**Performance**: Overly complex custom themes may impact rendering",
      "**Outdated**: Outdated brand colors in custom themes need maintenance",
      "**Confusion**: Too many colors in theme make it hard to distinguish categories",
      "**Maintenance**: Complex custom themes require documentation and support"
    ],
    faqs: [
      {
        q: "How do I create a custom theme with brand colors?",
        a: "Export current theme > Edit JSON with your brand colors > Upload modified theme to Power BI."
      },
      {
        q: "Can I apply different themes to different report pages?",
        a: "No - themes apply to entire report. Create separate reports for different themes if needed."
      },
      {
        q: "Where can I find custom themes to download?",
        a: "Microsoft provides theme gallery. Many organizations create custom themes matching brand guidelines."
      },
      {
        q: "How do I ensure my theme is accessible?",
        a: "Check text-to-background contrast ratios meet WCAG AA standards (4.5:1 for text, 3:1 for large text)."
      },
      {
        q: "Can I mix built-in and custom color overrides?",
        a: "Yes - apply theme then override specific visual colors, but consistent theme approach is preferred."
      }
    ],
    examTips: [
      "Know themes apply colors, fonts, and styling across entire report",
      "Understand built-in vs custom themes and when to use each",
      "Remember custom themes are JSON-based configuration files",
      "Know accessibility contrast requirements for theme design",
      "Recognize themes ensure consistency and brand alignment"
    ],
    resources: [
      {
        title: "Create and customize themes in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-report-themes",
        type: "Documentation"
      }
    ]
  }
};
