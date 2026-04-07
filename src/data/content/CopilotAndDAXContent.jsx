// Content for Copilot and DAX-related topics
export const copilotAndDAXContent = {
  "Create a narrative visual with Copilot": {
    overview: {
      title: "AI-Powered Narrative Generation",
      concepts: [
        "Copilot in Power BI generates natural language summaries of data insights",
        "Narrative visuals automatically update as data changes and filters are applied",
        "Copilot identifies key insights, trends, and anomalies to highlight",
        "Text summaries can be edited to customize the narrative for your audience",
        "Narrative visuals help non-technical users understand complex data patterns"
      ]
    },
    bestPractices: [
      "Use narrative visuals to supplement (not replace) charts and numbers",
      "Review auto-generated narratives to ensure accuracy before sharing",
      "Edit narrative text to match your organization's communication style",
      "Combine with visuals to create complete story of your data",
      "Test narratives with actual data changes to verify they remain accurate",
      "Use for executive summaries and reports where natural language explanation adds value"
    ],
    commonMistakes: [
      "Relying entirely on AI-generated narratives without review",
      "Not editing narratives to match audience or context",
      "Using narrative visuals for data that doesn't benefit from explanation",
      "Forgetting narratives update dynamically (may change when data refreshes)",
      "Including narrative visual when simple chart with title suffices",
      "Not validating that generated insights actually match the data"
    ],
    keySteps: [
      "Create the data visualization (chart) you want to explain",
      "From Visualizations pane, select Narrative visual (text icon)",
      "Configure narrative: select fields to analyze, set narrative length",
      "Review auto-generated narrative text",
      "Edit narrative text to customize tone and focus as needed",
      "Apply filters to test how narrative updates dynamically",
      "Include on report page alongside supporting visuals"
    ],
    keyDecisions: [
      "**Use narrative visual?** - Simple metric: no; Complex pattern: yes; Exec summary: yes",
      "**What to explain?** - Key insights, trends, comparisons, exceptions to norms",
      "**Narrative length?** - Brief: one sentence; Standard: few sentences; Detailed: longer explanation",
      "**Update automatically or static?** - Live: updates with filters; Static: snapshot at publish time"
    ],
    keyDefinitions: [
      "**Narrative Visual**: Text-based visual generating natural language summary of data",
      "**Copilot**: AI assistant in Power BI that generates insights and explanations",
      "**AI-Generated Insight**: Automatically identified pattern, trend, or anomaly in data",
      "**Natural Language**: Human-readable explanation vs. raw numbers or code"
    ],
    risks: [
      "**Inaccuracy**: AI misinterprets patterns or makes incorrect conclusions",
      "**Hallucination**: Generated insights don't match actual data patterns",
      "**Outdated**: Static narratives not updated when data changes",
      "**Bias**: AI reflects training data biases in generated language",
      "**Maintenance**: Multiple narrative visuals become hard to maintain",
      "**Overuse**: Too many narrative visuals clutter the report"
    ],
    faqs: [
      {
        q: "Does narrative text update automatically when data changes?",
        a: "Yes - narratives regenerate when data refreshes, so explanations stay current."
      },
      {
        q: "Can I control what narrative focuses on?",
        a: "Partially - configure fields analyzed and narrative length, but not specific insights to highlight."
      },
      {
        q: "Should I edit auto-generated narratives?",
        a: "Yes - review for accuracy and edit for tone/audience. AI-generated text is a starting point."
      }
    ],
    examTips: [
      "Know narrative visuals use Copilot AI to generate text explanations",
      "Understand narratives automatically update with data changes",
      "Remember to review and edit AI-generated narratives for accuracy"
    ],
    resources: [
      {
        title: "Create a narrative visual in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-narrative",
        type: "Documentation"
      }
    ]
  },

  "Use Copilot to create a new report page": {
    overview: {
      title: "AI-Assisted Report Page Generation",
      concepts: [
        "Copilot can suggest and generate entire report pages based on natural language requests",
        "Page generation saves time by automating chart creation and layout",
        "Copilot suggests relevant visuals based on your data and semantics",
        "Generated pages can be edited to customize layout, visuals, and styling",
        "Copilot learns from your design patterns and feedback to improve suggestions"
      ]
    },
    bestPractices: [
      "Provide clear, specific descriptions of what the page should show",
      "Review generated page and edit visuals to match report theme and style",
      "Test all visuals to ensure they display correctly with your actual data",
      "Use generated pages as starting point, then customize for specific needs",
      "Provide feedback to Copilot to improve future suggestions",
      "Combine Copilot-generated pages with manually designed pages for best results"
    ],
    commonMistakes: [
      "Using auto-generated page without review or customization",
      "Vague requests that result in irrelevant suggestions",
      "Not testing visuals on actual data before finalizing",
      "Over-relying on Copilot without applying design judgment",
      "Not matching theme/styling of generated page to rest of report",
      "Forgetting generated layouts may not match best practices"
    ],
    keySteps: [
      "Open report and request new page from Copilot (or right-click Blank page)",
      "Describe the page in natural language (e.g., 'Show sales trends and top products')",
      "Copilot generates page with suggested visuals and layout",
      "Review generated visuals and layout",
      "Edit visuals, resize, reorder as needed to customize",
      "Apply consistent theme and formatting with rest of report",
      "Test page with filters and interactions"
    ],
    keyDecisions: [
      "**Use Copilot or manual design?** - Exploratory: Copilot fast; Specific requirements: manual better",
      "**Trust suggested layout?** - Simple pages: usually good; Complex: review carefully",
      "**Customize generated page?** - Yes - always match theme and requirements"
    ],
    keyDefinitions: [
      "**Copilot Page Generation**: AI-powered creation of report pages from descriptions",
      "**Suggested Visuals**: Charts/visuals recommended by AI based on data analysis",
      "**Layout Suggestion**: Automatic arrangement of visuals on page by AI",
      "**Customization**: Editing and refining AI-generated page after creation"
    ],
    risks: [
      "**Misalignment**: Generated page doesn't match report design or requirements",
      "**Irrelevance**: Suggested visuals don't answer business questions",
      "**Accuracy**: Generated visuals may misrepresent data patterns",
      "**Inconsistency**: Auto-generated formatting differs from rest of report",
      "**Inefficiency**: Faster to manually create for specific use cases",
      "**Dependency**: Over-relying on AI without applying design judgment"
    ],
    faqs: [
      {
        q: "How specific should my request be to Copilot?",
        a: "Clear and specific works better - 'Show sales by region and product category' vs vague 'Show sales'."
      },
      {
        q: "Can I regenerate a different page if I don't like the suggestion?",
        a: "Yes - request again or edit the current page. Copilot improves with feedback."
      }
    ],
    examTips: [
      "Know Copilot can generate entire report pages from natural language",
      "Understand generated pages serve as starting point for customization",
      "Remember to review and edit AI-generated content before sharing"
    ],
    resources: [
      {
        title: "Use Copilot to generate report pages in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/copilot-create-report-pages",
        type: "Documentation"
      }
    ]
  },

  "Create visual calculations by using DAX": {
    overview: {
      title: "Aggregating Data Directly in Visuals",
      concepts: [
        "Visual calculations perform computations at visual query time without measures",
        "Calculations at visual level (row, pane, table) enable flexible aggregation",
        "DAX formulas in visual calculations access underlying table and dimension context",
        "Performance benefits from calculating only what's shown in visual",
        "Visual calculations useful for quick calculations not needed as measures"
      ]
    },
    bestPractices: [
      "Use visual calculations for temporary or specific calculations",
      "Use measures for calculations needed across multiple visuals",
      "Keep visual calculations simple and readable",
      "Test visual calculations with different visual contexts and filters",
      "Document visual calculation purposes and dependencies",
      "Monitor performance - complex visual calculations may slow rendering"
    ],
    commonMistakes: [
      "Creating visual calculations that should be measures for reusability",
      "Complex DAX in visual calculations reducing readability",
      "Not testing visual calculations with actual filter contexts",
      "Creating redundant calculations available as measures",
      "Visual calculations that reference measures inconsistently",
      "Not considering performance impact of complex visuals calculations"
    ],
    keySteps: [
      "Create or select visual where you want the calculation",
      "In Visual tab of Visualizations pane, look for Visual calculations section",
      "Click + to add new visual calculation",
      "Enter DAX formula for your calculation",
      "Specify calculation level: row, pane, or table",
      "Test with data and filters to verify correct results",
      "Format results if needed (currency, percentage, etc.)"
    ],
    keyDecisions: [
      "**Visual calculation or measure?** - Specific to visual: VizCalc; Multiple visuals: Measure",
      "**Calculation level?** - Row: per row; Pane: per axis level; Table: entire visual",
      "**Performance acceptable?** - Simple calculation: yes; Complex DAX: test first"
    ],
    keyDefinitions: [
      "**Visual Calculation**: DAX formula evaluated in context of specific visual",
      "**Calculation Level**: Scope of calculation (row, pane, or table level)",
      "**Visual Query Time**: When calculation is evaluated as visual displays",
      "**Filter Context**: Row and column filters affecting calculation results"
    ],
    risks: [
      "**Performance**: Complex visual calculations slow visual rendering",
      "**Inconsistency**: Different calculations in different visuals for same concept",
      "**Maintenance**: Hard to track all visual calculations across report",
      "**Context issues**: Misunderstanding filter context leads to wrong results",
      "**Complexity**: DAX formulas hard to understand months later",
      "**Brittle**: Visual calculations break if fields are renamed or removed"
    ],
    faqs: [
      {
        q: "When should I use visual calculations instead of measures?",
        a: "For quick, visual-specific calculations. Use measures for reusable calculations across multiple visuals."
      },
      {
        q: "How do I reference row data in visual calculations?",
        a: "Use the table and column context directly in DAX formula - they're implicitly available."
      }
    ],
    examTips: [
      "Know visual calculations perform computations at visual display time",
      "Understand difference between visual calculations and measures",
      "Remember visual calculations have access to filter context"
    ],
    resources: [
      {
        title: "Visual calculations in Power BI",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-visual-calculations-overview",
        type: "Documentation"
      }
    ]
  }
};
