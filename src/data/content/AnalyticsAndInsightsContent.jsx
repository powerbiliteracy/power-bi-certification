// Content for analytics, AI visuals, and pattern detection topics
export const analyticsAndInsightsContent = {
  "Use the Analyze feature in Power BI": {
    overview: {
      title: "AI-Powered Insight Generation",
      concepts: [
        "Analyze feature uses AI to generate insights about selected data point",
        "Insights include decomposition, key influencers, comparisons, trends",
        "Insights appear in side panel showing relevant visuals and analysis",
        "Users can interact with suggested insights to explore further",
        "Analyze works on any visual allowing point selection"
      ]
    },
    bestPractices: [
      "Enable Analyze feature to give users self-service insights",
      "Ensure visuals contain enough data for meaningful analysis",
      "Test Analyze across different data scenarios",
      "Document available Analyze features for user training",
      "Use Analyze results to inform report design",
      "Monitor AI insights for accuracy and relevance"
    ],
    commonMistakes: [
      "Not enabling Analyze feature for users",
      "Visuals with too little data for meaningful analysis",
      "Not testing AI insights accuracy",
      "Ignoring insights that contradict expectations",
      "Not using Analyze to improve report design",
      "Over-relying on AI without validation"
    ],
    keySteps: [
      "Right-click data point in visual",
      "Select 'Analyze' from context menu",
      "Review AI-generated insights in side panel",
      "Explore suggested visuals and analysis",
      "Click insights to drill into details",
      "Validate AI findings against your knowledge",
      "Use insights to inform further analysis"
    ],
    keyDecisions: [
      "**Enable Analyze?** - Self-service needed: yes; Controlled analysis: consider limiting",
      "**Trust AI insights?** - Validate first; Don't assume correctness without review"
    ],
    keyDefinitions: [
      "**Analyze Feature**: AI-powered insight generation about selected data",
      "**Decomposition**: Breaking down values by dimensions",
      "**Key Influencers**: Factors affecting selected metric most significantly",
      "**Comparison**: How selected value compares to others",
      "**Trend**: Direction and pattern of value over time"
    ],
    risks: [
      "**Inaccuracy**: AI may identify spurious correlations",
      "**Hallucination**: Insights don't match actual data patterns",
      "**Confusion**: Users misinterpret AI-generated insights",
      "**Over-reliance**: Users trust AI without validation",
      "**Performance**: Heavy analysis on large datasets slow",
      "**User confusion**: Feature not discoverable without explanation"
    ],
    faqs: [
      {
        q: "How accurate are AI insights from Analyze?",
        a: "Generally good but not perfect. Always validate against your knowledge before relying on findings."
      },
      {
        q: "Can I disable Analyze for specific visuals?",
        a: "Analyze is feature-wide or disabled at report level. Specific visual disabling not available."
      }
    ],
    examTips: [
      "Know Analyze generates AI-powered insights about data points",
      "Understand insights include decomposition and trend analysis",
      "Remember validation important for AI-generated insights"
    ],
    resources: [
      {
        title: "Analyze feature in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-analyze-visuals",
        type: "Documentation"
      }
    ]
  },

  "Use AI visuals": {
    overview: {
      title: "Advanced AI-Powered Visualizations",
      concepts: [
        "AI visuals: Key Influencers, Decomposition Tree, Q&A, Visuals from AI",
        "Key Influencers identifies factors most affecting metric",
        "Decomposition Tree breaks down metrics by dimensions hierarchically",
        "Q&A visual lets users ask natural language questions about data",
        "Visuals from AI generates visuals from natural language descriptions"
      ]
    },
    bestPractices: [
      "Use AI visuals for exploratory analysis and discovery",
      "Key Influencers to understand drivers of business metrics",
      "Decomposition Tree for root cause analysis",
      "Q&A for enabling non-technical users",
      "Test AI visuals with realistic scenarios",
      "Document AI visual purpose and interpretation"
    ],
    commonMistakes: [
      "Misinterpreting AI visual insights",
      "Using AI visuals without understanding their logic",
      "Expecting AI visuals to answer complex questions",
      "Not enabling users to access Q&A",
      "Over-cluttering reports with too many AI visuals",
      "Trusting AI visual without validation"
    ],
    keySteps: [
      "Insert AI visual from Visualizations pane",
      "Configure metric (value to analyze) and dimensions",
      "Select analysis type: factors, decomposition, trend, etc.",
      "Review generated insights and visuals",
      "Interact with visual to explore further",
      "Validate findings against your knowledge"
    ],
    keyDecisions: [
      "**Which AI visual?** - Find factors: Key Influencers; Hierarchical breakdown: Decomposition; Questions: Q&A",
      "**Include in report?** - Exploration: maybe not; Key finding: include"
    ],
    keyDefinitions: [
      "**Key Influencers**: Visual showing factors most affecting metric value",
      "**Decomposition Tree**: Hierarchical breakdown of metric by dimensions",
      "**Q&A Visual**: Natural language question interface for data exploration",
      "**Visuals from AI**: AI-generated visualizations from text descriptions"
    ],
    risks: [
      "**Misinterpretation**: Users misunderstand AI findings",
      "**False causation**: AI suggests causation that's only correlation",
      "**Bias**: AI findings reflect training data biases",
      "**Performance**: Complex analysis slow on large datasets",
      "**Over-simplification**: AI reduces complexity to misleading conclusions",
      "**Trust**: Over-reliance without understanding limitations"
    ],
    faqs: [
      {
        q: "How do Key Influencers identify important factors?",
        a: "Statistical analysis of correlation between dimensions and metric. Not causation."
      },
      {
        q: "Can anyone use Q&A visual?",
        a: "Yes - great for non-technical users, but depends on data model semantic labels."
      }
    ],
    examTips: [
      "Know Key Influencers, Decomposition, Q&A as AI visuals",
      "Understand each AI visual's purpose and use case",
      "Remember correlation vs causation distinction"
    ],
    resources: [
      {
        title: "AI visuals in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-influencers",
        type: "Documentation"
      }
    ]
  },

  "Use grouping, binning, and clustering": {
    overview: {
      title: "Transforming Continuous and Categorical Data",
      concepts: [
        "Grouping combines categories (e.g., small/medium/large from numbers)",
        "Binning divides continuous data into ranges (age groups, salary bands)",
        "Clustering groups similar data points together for pattern recognition",
        "Transformations reduce complexity and improve visual clarity",
        "Can create custom groups or use built-in binning logic"
      ]
    },
    bestPractices: [
      "Use grouping/binning when many unique values create cluttered visuals",
      "Create meaningful groups matching business logic",
      "Document grouping/binning logic for reproducibility",
      "Test with actual data ranges to verify appropriate bin sizes",
      "Use clustering to identify natural data groupings",
      "Consider impact on granularity and precision"
    ],
    commonMistakes: [
      "Bin sizes too small (too many bins) or too large (loss of detail)",
      "Groups that don't match business understanding",
      "Grouping without documenting the logic",
      "Clustering with too many variables making it slow",
      "Using automatic binning without verification",
      "Not testing clustering across different data scenarios"
    ],
    keySteps: [
      "For grouping: Right-click field in data > Group > New group",
      "Define groups: assign values to named groups",
      "For binning: Right-click field > Bin > Size (or # of bins)",
      "Set bin size or number of bins",
      "Test binning with different values",
      "For clustering: Use Clustering visual from Visualizations pane",
      "Verify grouping/binning results in visual"
    ],
    keyDecisions: [
      "**Grouping or binning?** - Categories: grouping; Continuous: binning",
      "**Bin size?** - Too small: clutter; Too large: loss of detail; Business relevant: best",
      "**Custom groups or automatic?** - Business specific: custom; General: automatic"
    ],
    keyDefinitions: [
      "**Grouping**: Combining multiple categories into named groups",
      "**Binning**: Dividing continuous values into ranges or bins",
      "**Clustering**: Unsupervised grouping of similar data points",
      "**Bin Size**: Range of values in each bin (e.g., 10-20, 20-30)",
      "**Custom Group**: User-defined grouping with meaningful business names"
    ],
    risks: [
      "**Information loss**: Excessive binning loses important detail",
      "**Misleading**: Groups that don't match data distribution",
      "**Clustering instability**: Results vary with parameter changes",
      "**Complexity**: Over-binned data hard to interpret",
      "**Performance**: Clustering computationally expensive on large data",
      "**Maintenance**: Custom groups require documentation and updates"
    ],
    faqs: [
      {
        q: "How do I choose bin size?",
        a: "Depends on data distribution and analysis goals. Start with automatic, adjust if needed. Test multiple sizes."
      },
      {
        q: "Can I create overlapping groups?",
        a: "Grouping creates exclusive categories. Overlapping would require separate calculated field."
      }
    ],
    examTips: [
      "Know grouping for categories, binning for continuous data",
      "Understand bin size impacts detail and readability",
      "Remember clustering identifies natural data groupings"
    ],
    resources: [
      {
        title: "Grouping and binning in Power BI",
        url: "https://learn.microsoft.com/power-bi/transform-model/desktop-grouping-and-binning",
        type: "Documentation"
      }
    ]
  },

  "Use reference lines, error bars, and forecasting": {
    overview: {
      title: "Adding Context and Predictions to Visuals",
      concepts: [
        "Reference lines show targets, benchmarks, or averages for comparison",
        "Error bars show variability or confidence intervals around values",
        "Forecasting projects future trends based on historical patterns",
        "Analytics pane in line/column charts adds these statistical elements",
        "Context enhances interpretation and story"
      ]
    },
    bestPractices: [
      "Use reference lines for meaningful benchmarks (target, average, threshold)",
      "Add error bars when variability is important to understanding",
      "Use forecasting for trends with clear historical patterns",
      "Document what reference lines and error bars represent",
      "Test forecasting assumptions match your data patterns",
      "Balance context with visual clarity"
    ],
    commonMistakes: [
      "Reference lines without clear meaning or label",
      "Too many reference lines cluttering the visual",
      "Error bars without explanation of what they measure",
      "Forecasting beyond data reliability (too far into future)",
      "Not validating forecast assumptions",
      "Using reference elements incorrectly to mislead"
    ],
    keySteps: [
      "Select line or column chart",
      "Go to Format > Analytics pane to enable analytics",
      "Add reference line: Set value (target/average), color, label",
      "Add error bars: Choose type (percentage, standard deviation, etc.)",
      "Add forecast: Set forecast length, confidence interval",
      "Label and format analytics elements for clarity",
      "Verify visual clearly shows analytics intent"
    ],
    keyDecisions: [
      "**Reference line type?** - Target: specify value; Average: calculate from data; Custom: business-driven",
      "**Error bars needed?** - Uncertainty important: yes; Fixed value: no",
      "**Forecast?** - Clear trend pattern: yes; Volatile/unclear: no"
    ],
    keyDefinitions: [
      "**Reference Line**: Static line showing target, benchmark, or average",
      "**Error Bar**: Visual representation of variability or uncertainty around value",
      "**Confidence Interval**: Range of values containing true value with specified confidence",
      "**Forecast**: Projection of future values based on historical trend",
      "**Forecast Length**: Number of periods into future to project"
    ],
    risks: [
      "**Misinterpretation**: Users misunderstand reference lines/error bars",
      "**Misleading forecasts**: Predictions wrong due to assumption violations",
      "**Clutter**: Too many analytics elements obscure the main data",
      "**False confidence**: Forecasts presented with unwarranted certainty",
      "**Outdated references**: Reference lines become stale or irrelevant",
      "**Performance**: Complex analytics slow visual rendering"
    ],
    faqs: [
      {
        q: "What error bar type should I use?",
        a: "Depends on context. Percentage: relative error. Standard deviation: distribution spread. Custom: business-specific."
      },
      {
        q: "How far into the future can I forecast?",
        a: "Generally 1-2 forecast periods safe. Further out, uncertainty increases significantly."
      }
    ],
    examTips: [
      "Know reference lines, error bars, forecasting found in Analytics pane",
      "Understand each element's purpose: context, variability, prediction",
      "Remember forecasting assumes historical patterns continue"
    ],
    resources: [
      {
        title: "Analytics pane in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/analytics-pane-power-bi-visual",
        type: "Documentation"
      }
    ]
  },

  "Detect outliers and anomalies": {
    overview: {
      title: "Identifying Unusual Data Patterns",
      concepts: [
        "Anomaly detection identifies values that deviate from expected patterns",
        "Outliers are extreme values that don't fit normal distribution",
        "Detection methods: statistical thresholds, trend deviation, clustering",
        "Anomalies may indicate errors, unusual events, or important insights",
        "Visual indication highlights anomalies for user attention"
      ]
    },
    bestPractices: [
      "Investigate anomalies to understand causes (error or insight)",
      "Use anomaly detection on metrics with established patterns",
      "Document anomaly thresholds and methods used",
      "Combine automated detection with domain knowledge",
      "Create alerts for critical anomalies",
      "Track anomalies over time for trend analysis"
    ],
    commonMistakes: [
      "Ignoring anomalies without investigation",
      "Assuming all anomalies are errors (some are insights)",
      "Detection thresholds too sensitive (noise) or too loose (miss patterns)",
      "Not documenting anomaly detection logic",
      "Anomaly detection without domain context",
      "Over-reacting to isolated anomalies"
    ],
    keySteps: [
      "Identify metrics where anomalies matter (critical KPIs)",
      "Use Analyze feature to detect unusual values",
      "Investigate anomalies: cause (error/event/insight)?",
      "Set detection thresholds (standard deviations, percentiles)",
      "Create alerts for critical anomalies if available",
      "Document anomalies for audit trail",
      "Take corrective action if error-based"
    ],
    keyDecisions: [
      "**Investigate all anomalies?** - Critical metrics: yes; Secondary: sample",
      "**Automated detection?** - High volume: yes; Manual: acceptable; Real-time needed: automate",
      "**Threshold sensitivity?** - Data variability: adjust accordingly"
    ],
    keyDefinitions: [
      "**Anomaly**: Unexpected deviation from established pattern",
      "**Outlier**: Extreme value outside normal distribution range",
      "**Threshold**: Value at which data point is considered anomalous",
      "**Detection Method**: Statistical approach to identifying anomalies",
      "**Seasonality**: Regular recurring patterns requiring adjustment in detection"
    ],
    risks: [
      "**False positives**: Detecting anomalies that aren't real",
      "**False negatives**: Missing real anomalies",
      "**Overcorrection**: Reacting to isolated anomalies vs real trends",
      "**Data quality**: Anomalies from errors vs business insights",
      "**Seasonality**: Patterns mistaken for anomalies",
      "**Alert fatigue**: Too many false alerts ignored"
    ],
    faqs: [
      {
        q: "How do I determine if anomaly is error or insight?",
        a: "Investigate root cause. Check data quality, business events, external factors. Domain knowledge crucial."
      },
      {
        q: "What threshold should I use for anomaly detection?",
        a: "Common: 2-3 standard deviations from mean. Adjust based on data variability and sensitivity needs."
      }
    ],
    examTips: [
      "Know anomaly detection identifies unusual deviations from patterns",
      "Understand outliers and anomalies may indicate errors or insights",
      "Remember investigation important to determine cause"
    ],
    resources: [
      {
        title: "Anomaly detection in Power BI",
        url: "https://learn.microsoft.com/power-bi/visuals/power-bi-anomaly-detection",
        type: "Documentation"
      }
    ]
  },

  "Use Copilot to summarize the underlying semantic model": {
    overview: {
      title: "AI-Generated Data Model Documentation",
      concepts: [
        "Copilot analyzes semantic model and generates natural language description",
        "Summary includes tables, measures, and relationships in model",
        "Helps new users understand model structure and available metrics",
        "Generated summary can be edited and customized",
        "Documentation improves model discoverability and usage"
      ]
    },
    bestPractices: [
      "Use Copilot summary to document models automatically",
      "Review and edit generated summary for accuracy and clarity",
      "Include in report documentation for user reference",
      "Update summary when model structure changes",
      "Share summary with team for consistent understanding",
      "Combine with other documentation for completeness"
    ],
    commonMistakes: [
      "Accepting AI summary without review",
      "Not editing summary to match business terminology",
      "Ignoring outdated summaries after model changes",
      "Over-relying on AI summary vs detailed documentation",
      "Not sharing summary with users",
      "Summary that doesn't match actual model"
    ],
    keySteps: [
      "Open semantic model in Power BI Desktop or Service",
      "Select Copilot feature (varies by interface)",
      "Request summary of data model",
      "Review generated description",
      "Edit summary for accuracy and business language",
      "Save or export summary for documentation",
      "Share with team and stakeholders"
    ],
    keyDecisions: [
      "**Use AI summary?** - Complex model: yes; Simple: optional",
      "**Customize summary?** - Yes: always refine for your context",
      "**Include in documentation?** - Yes: helpful for users"
    ],
    keyDefinitions: [
      "**Model Summary**: Natural language description of semantic model",
      "**Semantic Model**: Tables, relationships, and measures in Power BI",
      "**Copilot Summary**: AI-generated documentation of model structure",
      "**Model Documentation**: Description helping users understand data"
    ],
    risks: [
      "**Inaccuracy**: AI-generated summary may misrepresent model",
      "**Outdated**: Summary not updated after model changes",
      "**Misuse**: Users follow summary instead of exploring model",
      "**Over-reliance**: Summary insufficient without detail documentation",
      "**Confusion**: Unclear summary worse than no summary",
      "**Maintenance**: Keeping summary current with model"
    ],
    faqs: [
      {
        q: "How detailed should model summary be?",
        a: "Should cover key tables, important measures, and major relationships. Details in separate documentation."
      },
      {
        q: "Do I need other documentation if I have Copilot summary?",
        a: "Summary is good start but detailed documentation on calculations and business logic still valuable."
      }
    ],
    examTips: [
      "Know Copilot can generate model summaries",
      "Understand summary helps users understand available data",
      "Remember to review and customize AI-generated content"
    ],
    resources: [
      {
        title: "Copilot in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/copilot-overview",
        type: "Documentation"
      }
    ]
  }
};
