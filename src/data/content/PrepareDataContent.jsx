// Content for "Prepare the data" domain topics

export const prepareDataContent = {
  "Identify and connect to data sources or a shared semantic model": {
    overview: {
      title: "Understanding Data Connectivity in Power BI",
      concepts: [
        "Power BI connects to 100+ data sources including databases, files, cloud services, and APIs",
        "Shared semantic models (formerly datasets) enable reusable data models across multiple reports",
        "Connection methods vary by source: Import loads data into Power BI, DirectQuery queries source in real-time",
        "Authentication and credentials are required for most data sources",
        "Data gateways enable secure access to on-premises data sources from Power BI Service"
      ]
    },
    bestPractices: [
      "Identify all required data sources before starting development",
      "Use shared semantic models when multiple reports need the same data",
      "Test connectivity and permissions before building complex transformations",
      "Document data source locations and connection requirements",
      "Use data gateways for on-premises sources that need scheduled refresh",
      "Consider data freshness requirements when choosing connection mode"
    ],
    commonMistakes: [
      "Not verifying data source access before building reports",
      "Recreating semantic models instead of reusing existing ones",
      "Forgetting to configure gateways for on-premises data sources",
      "Not understanding the difference between Import and DirectQuery",
      "Hardcoding server names instead of using parameters",
      "Not securing credentials properly"
    ],
    keySteps: [
      "Click 'Get Data' in Power BI Desktop and select data source type",
      "Enter connection details (server, database, file path, etc.)",
      "Provide authentication credentials when prompted",
      "Select tables or data to import, or connect to shared semantic model",
      "Preview data to verify correct source is connected",
      "Choose Import or DirectQuery mode based on requirements"
    ],
    keyDecisions: [
      "**New semantic model or reuse existing?** - Reuse when data model already exists and meets needs",
      "**Import or DirectQuery?** - Import for best performance, DirectQuery for real-time data",
      "**Single or multiple data sources?** - Combine sources as needed for complete analysis",
      "**On-premises or cloud data?** - On-premises requires data gateway for Service refresh",
      "**Authentication method?** - Windows, database, OAuth, or service account depending on source"
    ],
    keyDefinitions: [
      "**Data Source**: Origin system containing data to be analyzed (database, file, API, etc.)",
      "**Semantic Model**: Reusable data model published to Power BI Service that multiple reports can connect to",
      "**Import Mode**: Data copied into Power BI for fast queries (requires scheduled refresh)",
      "**DirectQuery**: Real-time connection where queries sent to source database",
      "**Data Gateway**: Secure bridge between on-premises data and Power BI cloud service",
      "**Credentials**: Authentication information required to access data sources"
    ],
    risks: [
      "**Access issues**: Insufficient permissions prevent data loading",
      "**Performance problems**: Wrong connection mode impacts report speed",
      "**Security concerns**: Improperly stored credentials create vulnerabilities",
      "**Refresh failures**: Missing gateway or expired credentials break scheduled refresh",
      "**Data inconsistency**: Multiple semantic models for same data cause version conflicts",
      "**Connectivity loss**: Network issues or source changes break connections"
    ],
    faqs: [
      {
        q: "What's the difference between a semantic model and a dataset?",
        a: "They're the same thing - Microsoft renamed 'dataset' to 'semantic model' in 2023. It's a reusable data model in Power BI Service."
      },
      {
        q: "How do I connect to a shared semantic model?",
        a: "In Get Data, choose 'Power BI semantic models', select the published semantic model from your workspace, and click Create."
      },
      {
        q: "What is a data gateway and when do I need it?",
        a: "A gateway securely connects Power BI Service to on-premises data sources. You need it for scheduled refresh of on-premises data."
      },
      {
        q: "Can I combine data from multiple sources?",
        a: "Yes, Power BI can combine data from different sources using Power Query merge/append or model relationships."
      },
      {
        q: "Which connection mode should I choose?",
        a: "Use Import for best performance and when data doesn't need to be real-time. Use DirectQuery when you need up-to-the-second data."
      },
      {
        q: "How do I know which data sources are available?",
        a: "Click Get Data in Power BI Desktop to see 100+ connectors including databases, files, online services, and more."
      }
    ],
    examTips: [
      "Know the difference between Import and DirectQuery connection modes",
      "Understand when to use shared semantic models vs creating new ones",
      "Remember that data gateways are required for on-premises sources in Service",
      "Know that Power BI supports 100+ data source connectors",
      "Understand authentication and credentials are required for most sources",
      "Recognize the importance of testing connectivity before building reports"
    ],
    resources: [
      {
        title: "Data sources in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-data-sources",
        type: "Documentation"
      },
      {
        title: "Connect to semantic models in the Power BI service",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-report-lifecycle-datasets",
        type: "Documentation"
      },
      {
        title: "What is an on-premises data gateway?",
        url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-onprem",
        type: "Documentation"
      }
    ]
  },

  "Change data source settings, including credentials and privacy levels": {
    overview: {
      title: "Managing Connection Configuration",
      concepts: [
        "Data source settings control how Power BI connects to and refreshes data",
        "Credentials store authentication information for accessing data sources",
        "Privacy levels prevent unintended data combination across security boundaries",
        "Connection strings can be updated without rebuilding queries",
        "Power BI Service requires separate credential configuration from Desktop"
      ]
    },
    bestPractices: [
      "Set privacy levels appropriately (Private, Organizational, Public)",
      "Use Windows credentials or service accounts for automated refresh",
      "Update data source settings rather than recreating queries when servers change",
      "Document privacy level choices for compliance and security",
      "Test refresh after changing credentials to verify they work",
      "Use parameters for data sources that change between environments"
    ],
    commonMistakes: [
      "Not setting privacy levels causing \"Formula.Firewall\" errors",
      "Using personal credentials for scheduled refresh (they expire)",
      "Forgetting to update credentials in Power BI Service after publishing",
      "Setting all sources to Public without considering data security",
      "Not testing data source changes before publishing",
      "Hardcoding credentials in connection strings"
    ],
    keySteps: [
      "In Power BI Desktop: File > Options and settings > Data source settings",
      "Select data source and click 'Edit Permissions'",
      "Update credentials by clicking 'Edit' under Credentials section",
      "Set Privacy Level: Private (internal), Organizational (corporate), or Public (internet)",
      "In Power BI Service: Dataset Settings > Data source credentials > Edit credentials",
      "For gateways: Configure credentials in gateway settings"
    ],
    keyDecisions: [
      "**Which privacy level?** - Sensitive data: Private; Corporate data: Organizational; Public data: Public",
      "**Personal or service account?** - Service account for production, personal for development",
      "**Embed credentials or prompt?** - Automated refresh: embed; Interactive use: prompt",
      "**Windows or database auth?** - Depends on data source security configuration",
      "**Update settings or recreate?** - Simple changes (server name): update settings; Major changes: consider recreating"
    ],
    keyDefinitions: [
      "**Data Source Settings**: Configuration for how Power BI connects to and authenticates with data sources",
      "**Privacy Levels**: Security boundaries that control how data can be combined (Private, Organizational, Public)",
      "**Credentials**: Authentication information (username/password, keys, tokens) for accessing data",
      "**Formula.Firewall**: Privacy protection that prevents combining data across privacy boundaries",
      "**Service Account**: Non-personal account used for automated processes like scheduled refresh",
      "**Connection String**: Technical specification of server, database, and connection parameters"
    ],
    risks: [
      "**Credential expiration**: Personal passwords expire causing refresh failures",
      "**Privacy violations**: Incorrect privacy levels may allow unauthorized data combination",
      "**Security exposure**: Embedded credentials in reports create security risks",
      "**Refresh failures**: Wrong credentials or privacy settings break scheduled refresh",
      "**Compliance issues**: Not documenting privacy levels may violate data governance",
      "**Access loss**: Changing credentials without testing breaks existing reports"
    ],
    faqs: [
      {
        q: "What are privacy levels and why do they matter?",
        a: "Privacy levels (Private, Organizational, Public) prevent accidentally combining sensitive data with less secure sources. Set based on data sensitivity."
      },
      {
        q: "Why am I getting a 'Formula.Firewall' error?",
        a: "Privacy levels are blocking data combination. Review privacy settings for each source and adjust if appropriate."
      },
      {
        q: "How do I change the server name without rebuilding my queries?",
        a: "File > Options > Data source settings, select source, click Edit, update connection details. Or use parameters for flexibility."
      },
      {
        q: "What's the difference between Desktop and Service credentials?",
        a: "Desktop stores credentials locally for development. Service needs separate credential configuration for scheduled refresh."
      },
      {
        q: "Should I use my personal account for scheduled refresh?",
        a: "No - use a service account. Personal credentials may expire when you change password, breaking scheduled refresh."
      },
      {
        q: "Can I update data source settings after publishing?",
        a: "Yes, in Power BI Service go to Dataset Settings > Data source credentials to update credentials and settings."
      }
    ],
    examTips: [
      "Know the three privacy levels: Private, Organizational, Public",
      "Understand Formula.Firewall errors come from privacy level conflicts",
      "Remember data source settings can be updated without rebuilding queries",
      "Know Service requires separate credential configuration from Desktop",
      "Understand service accounts are preferred for automated refresh",
      "Recognize the importance of testing after changing credentials"
    ],
    resources: [
      {
        title: "Manage data sources",
        url: "https://learn.microsoft.com/power-bi/connect-data/desktop-data-sources",
        type: "Documentation"
      },
      {
        title: "Privacy levels in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/admin/desktop-privacy-levels",
        type: "Documentation"
      },
      {
        title: "Configure scheduled refresh",
        url: "https://learn.microsoft.com/power-bi/connect-data/refresh-scheduled-refresh",
        type: "Documentation"
      }
    ]
  }
};
