// Content for remaining visualization and reporting topics
export const remainingTopicsContent = {
  "Use Copilot to suggest content for a new report page": {
    overview: {
      title: "AI-Assisted Report Content Recommendations",
      concepts: [
        "Copilot analyzes data and suggests relevant visuals for new pages",
        "Suggestions based on data relationships, measures, and dimensions",
        "Reduces time creating pages by proposing good visualizations",
        "Suggested content matches data patterns and relationships",
        "Can be customized further after suggestion"
      ]
    },
    bestPractices: [
      "Use suggestions as starting point, customize to specific needs",
      "Review suggested visuals for relevance to page purpose",
      "Test suggestions with actual data and filters",
      "Edit suggestion if it doesn't match business requirements",
      "Provide feedback to improve future suggestions",
      "Document why visuals were chosen vs suggested alternatives"
    ],
    commonMistakes: [
      "Using suggestions without reviewing relevance",
      "Not customizing suggestions to match requirements",
      "Trusting suggestions without data validation",
      "Keeping irrelevant suggested visuals",
      "Not testing suggestions thoroughly"
    ],
    keySteps: [
      "Request new page content from Copilot",
      "Describe page purpose and analysis goals",
      "Review suggested visuals and layout",
      "Keep relevant suggestions, remove unnecessary ones",
      "Customize fields and formatting as needed",
      "Test with data and filters",
      "Document final configuration"
    ],
    keyDecisions: [
      "**Use all suggestions?** - No - only those supporting page purpose",
      "**Customize extensively?** - Yes - adapt to specific requirements"
    ],
    keyDefinitions: [
      "**Content Suggestion**: AI-recommended visualizations for page",
      "**Relevance**: How well suggestions match page purpose",
      "**Customization**: Adapting suggestions to specific needs"
    ],
    resources: [
      {
        title: "Copilot suggestions in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/copilot-create-report-pages",
        type: "Documentation"
      }
    ]
  },

  "Configure the report page": {
    overview: {
      title: "Page-Level Settings and Properties",
      concepts: [
        "Page configuration: size, orientation, background, canvas settings",
        "Page-level filters apply to all visuals on the page",
        "Page refresh settings control data update timing",
        "Page tooltips and interactions affect all visuals",
        "Page properties affect appearance and user experience"
      ]
    },
    bestPractices: [
      "Set page size/orientation matching usage (desktop vs mobile)",
      "Use page-level filters consistently",
      "Configure backgrounds and styling for branding",
      "Set appropriate refresh timing for page data",
      "Document page-level settings for team",
      "Test page configuration on target devices"
    ],
    commonMistakes: [
      "Inconsistent page sizes across pages",
      "Over-complicated page configurations",
      "Not testing page appearance on different devices",
      "Page-level filters affecting unintended visuals",
      "Refresh settings not matching data requirements"
    ],
    keySteps: [
      "Right-click page tab > Page settings",
      "Set page size: preset (4:3, 16:9) or custom",
      "Choose orientation: portrait or landscape",
      "Set background: color or image",
      "Configure page-level filters if needed",
      "Set page refresh interval if applicable",
      "Test appearance on target devices"
    ],
    keyDecisions: [
      "**Page size?** - Standard: 16:9 modern; 4:3 legacy; Custom: specific requirements",
      "**Orientation?** - Desktop: landscape; Mobile: portrait; Multi: both versions"
    ],
    keyDefinitions: [
      "**Page Settings**: Configuration of page size, orientation, appearance",
      "**Page-Level Filter**: Filter applied to all visuals on page",
      "**Canvas Settings**: Background, margins, padding configuration",
      "**Page Refresh**: Automatic refresh timing for page data"
    ],
    resources: [
      {
        title: "Configure page settings in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-page-view",
        type: "Documentation"
      }
    ]
  },

  "Choose when to use a paginated report": {
    overview: {
      title: "Paginated vs Standard Reports",
      concepts: [
        "Paginated reports: pixel-perfect formatting, print-optimized, large datasets",
        "Standard reports: interactive exploration, dynamic filtering, responsive",
        "Paginated for: invoices, statements, formal reports",
        "Standard for: executive dashboards, operational monitoring",
        "Choose based on use case and user needs"
      ]
    },
    bestPractices: [
      "Use paginated for formal, pixel-perfect deliverables",
      "Use standard for interactive, exploratory analysis",
      "Consider user device (print vs screen) in choice",
      "Test rendering in target format before finalizing",
      "Document report type in report documentation",
      "Train users on differences and appropriate use"
    ],
    commonMistakes: [
      "Using wrong report type for use case",
      "Forcing interactivity into paginated reports",
      "Expecting pixel-perfect from standard reports",
      "Not understanding format limitations",
      "Choosing based on preference vs requirements"
    ],
    keySteps: [
      "Define report requirements and use case",
      "Assess: formal vs interactive, print vs screen, static vs dynamic",
      "Choose: Paginated if formal/print, Standard if interactive",
      "Design accordingly: layout-focused vs visual-focused",
      "Test in target format",
      "Document type and reasoning"
    ],
    keyDecisions: [
      "**Paginated or standard?** - Formal/print: paginated; Interactive: standard",
      "**Large dataset?** - Paginated handles better; Standard good for reasonable size"
    ],
    keyDefinitions: [
      "**Paginated Report**: Pixel-perfect, print-optimized report",
      "**Standard Report**: Interactive, responsive, filtered-based report",
      "**Rendering**: Conversion to final format (PDF, web, print)"
    ],
    resources: [
      {
        title: "Paginated vs standard reports",
        url: "https://learn.microsoft.com/power-bi/paginated-reports/paginated-reports-report-designer-concept",
        type: "Documentation"
      }
    ]
  },

  "Enable personalized visuals in a report": {
    overview: {
      title: "User-Specific Visual Customization",
      concepts: [
        "Personalized visuals save user preferences (colors, filters, layouts)",
        "Users can customize visuals without affecting others' views",
        "Preferences persist across sessions for same user",
        "Bookmarks vs personalization for saving preferences",
        "Improves user experience by remembering preferences"
      ]
    },
    bestPractices: [
      "Enable personalization for frequently used filters",
      "Document personalization options available",
      "Test personalization saving and loading",
      "Balance personalization with consistency",
      "Monitor if users discover personalization feature",
      "Provide guidance in report documentation"
    ],
    commonMistakes: [
      "Over-personalizing reducing consistency",
      "Users unaware of personalization feature",
      "Personalization not persisting (cache issues)",
      "Too many customization options overwhelming users",
      "Personalization settings lost on logout"
    ],
    keySteps: [
      "Reports support personalization by default in Power BI",
      "Users right-click slicer > Personalize",
      "Configure personalization: pin, reorder, filter defaults",
      "Users make personalized selections",
      "Selections saved to their account",
      "Test personalization across devices/sessions"
    ],
    keyDecisions: [
      "**Allow personalization?** - Standard: yes; Highly controlled: consider restrictions",
      "**Document feature?** - Yes - users may not discover otherwise"
    ],
    keyDefinitions: [
      "**Personalized Visual**: Visual with user-specific customization",
      "**Preference Persistence**: Saving preferences across sessions",
      "**Personalization Scope**: What users can customize (filters, layout, etc.)"
    ],
    resources: [
      {
        title: "Personalized visuals in Power BI",
        url: "https://learn.microsoft.com/power-bi/consumer/end-user-personalize-visuals",
        type: "Documentation"
      }
    ]
  }
};
