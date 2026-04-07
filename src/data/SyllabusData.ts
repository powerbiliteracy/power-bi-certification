// Official PL-300 Exam Study Guide - Updated January 15, 2026
export const pl300Syllabus = {
  examInfo: {
    code: "PL-300",
    title: "Microsoft Power BI Data Analyst",
    passingScore: "700/1000",
    questionCount: "40-60",
    duration: "100 minutes",
    lastUpdated: "January 15, 2026"
  },
  domains: [
    {
      id: "prepare_data",
      title: "Prepare the data",
      weight: "25-30%",
      sections: [
        {
          title: "Get or connect to data",
          topics: [
            "Identify and connect to data sources or a shared semantic model",
            "Change data source settings, including credentials and privacy levels",
            "Choose between DirectLake, DirectQuery, and Import",
            "Create and modify parameters"
          ]
        },
        {
          title: "Profile and clean the data",
          topics: [
            "Evaluate data, including data statistics and column properties",
            "Resolve inconsistencies, unexpected or null values, and data quality issues",
            "Resolve data import errors"
          ]
        },
        {
          title: "Transform and load the data",
          topics: [
            "Select appropriate column data types",
            "Create and transform columns",
            "Group and aggregate rows",
            "Pivot, unpivot, and transpose data",
            "Convert semi-structured data to a table",
            "Create fact tables and dimension tables",
            "Identify when to use reference or duplicate queries and the resulting impact",
            "Merge and append queries",
            "Identify and create appropriate keys for relationships",
            "Configure data loading for queries"
          ]
        }
      ]
    },
    {
      id: "model_data",
      title: "Model the data",
      weight: "25-30%",
      sections: [
        {
          title: "Design and implement a data model",
          topics: [
            "Configure table and column properties",
            "Implement role-playing dimensions",
            "Define a relationship's cardinality and cross-filter direction",
            "Create a common date table",
            "Identify use cases for calculated columns and calculated tables"
          ]
        },
        {
          title: "Create model calculations by using DAX",
          topics: [
            "Create single aggregation measures",
            "Use the CALCULATE function",
            "Implement time intelligence measures",
            "Use basic statistical functions",
            "Create semi-additive measures",
            "Create a measure by using quick measures",
            "Create calculated tables or columns",
            "Create calculation groups"
          ]
        },
        {
          title: "Optimize model performance",
          topics: [
            "Improve performance by identifying and removing unnecessary rows and columns",
            "Identify poorly performing measures, relationships, and visuals by using Performance Analyzer and DAX query view",
            "Improve performance by reducing granularity"
          ]
        }
      ]
    },
    {
      id: "visualize_analyze",
      title: "Visualize and analyze the data",
      weight: "25-30%",
      sections: [
        {
          title: "Create reports",
          topics: [
            "Select an appropriate visual",
            "Format and configure visuals",
            "Create a narrative visual with Copilot",
            "Apply and customize a theme",
            "Apply conditional formatting",
            "Apply slicing and filtering",
            "Use Copilot to create a new report page",
            "Use Copilot to suggest content for a new report page",
            "Configure the report page",
            "Choose when to use a paginated report",
            "Create visual calculations by using DAX"
          ]
        },
        {
          title: "Enhance reports for usability and storytelling",
          topics: [
            "Configure bookmarks",
            "Create custom tooltips",
            "Edit and configure interactions between visuals",
            "Configure navigation for a report",
            "Apply sorting to visuals",
            "Configure sync slicers",
            "Group and layer visuals by using the Selection pane",
            "Configure drillthrough navigation, including pages, filters, and buttons",
            "Configure export settings",
            "Design reports for mobile devices",
            "Enable personalization in a report, including personalized visuals",
            "Design and configure Power BI reports for accessibility",
            "Configure automatic page refresh"
          ]
        },
        {
          title: "Identify patterns and trends",
          topics: [
            "Use the Analyze feature in Power BI",
            "Use grouping, binning, and clustering",
            "Use AI visuals",
            "Use reference lines, error bars, and forecasting",
            "Detect outliers and anomalies",
            "Use Copilot to summarize the underlying semantic model"
          ]
        }
      ]
    },
    {
      id: "deploy_maintain",
      title: "Manage and secure Power BI",
      weight: "15-20%",
      sections: [
        {
          title: "Create and manage workspaces and assets",
          topics: [
            "Create and configure a workspace",
            "Configure and update an app",
            "Publish, import, or update items in a workspace",
            "Create dashboards",
            "Choose a distribution method",
            "Configure subscriptions and data alerts",
            "Promote or certify Power BI content",
            "Identify when a gateway is required",
            "Configure a semantic model scheduled refresh"
          ]
        },
        {
          title: "Secure and govern Power BI items",
          topics: [
            "Assign workspace roles",
            "Configure item-level access",
            "Configure access to semantic models",
            "Implement row-level security roles",
            "Configure row-level security group membership",
            "Apply sensitivity labels"
          ]
        }
      ]
    }
  ]
};

export const learningPaths = [
  {
    id: "data-analytics-microsoft",
    title: "Get started with Microsoft data analytics",
    url: "https://learn.microsoft.com/training/paths/data-analytics-microsoft/",
    duration: "1 hr 44 min",
    modules: 4,
    description: "Discover the core concepts of data analytics and how Microsoft Power BI enables organizations to derive insights from their data.",
  },
  {
    id: "prepare-data-power-bi",
    title: "Prepare data for analysis with Power BI",
    url: "https://learn.microsoft.com/training/paths/prepare-data-power-bi/",
    duration: "4 hr 33 min",
    modules: 3,
    description: "Learn how to get, clean, and transform data from various sources using Power Query to prepare it for analysis.",
  },
  {
    id: "model-data-power-bi",
    title: "Model data with Power BI",
    url: "https://learn.microsoft.com/training/paths/model-data-power-bi/",
    duration: "6 hr 59 min",
    modules: 7,
    description: "Create sophisticated data models using relationships, hierarchies, and DAX calculations to enable powerful analytics.",
  },
  {
    id: "power-bi-effective",
    title: "Design effective reports in Power BI",
    url: "https://learn.microsoft.com/training/paths/power-bi-effective/",
    duration: "5 hr 7 min",
    modules: 4,
    description: "Build compelling, interactive reports and dashboards that tell data stories and enable business decisions.",
  },
  {
    id: "manage-secure-power-bi",
    title: "Manage and secure Power BI",
    url: "https://learn.microsoft.com/training/paths/manage-secure-power-bi/",
    duration: "2 hr 48 min",
    modules: 5,
    description: "Learn how to deploy, manage, and secure Power BI content across your organization.",
  }
];

export default pl300Syllabus;
