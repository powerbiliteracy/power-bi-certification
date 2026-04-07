const questions = [
  {
    id: 1,
    phase: "Workspaces and Roles",
    scenario: "Your team has 3 report developers, 2 data engineers, 1 QA analyst, and 20 business users who only view reports. You're setting up a new workspace in Power BI Service. You need to assign the minimum permissions each group needs.",
    question: "What's the correct workspace role assignment?",
    options: [
      "Everyone gets Admin — it's easiest to manage",
      "Developers and engineers: Member (can publish, edit content); QA analyst: Contributor (can edit but not publish to Apps); Business users: Viewer (read-only access to workspace content)",
      "Developers: Admin; Engineers: Member; QA: Contributor; Business users should not be in the workspace — use an App instead",
      "All technical staff: Admin; Business users: Viewer"
    ],
    correctIndex: 2,
    explanation: "Best practice is to keep workspaces for development/deployment and distribute to business users via Apps. Business users shouldn't have workspace access — they should access published Apps (which provide a governed, curated experience). Within the workspace, Admin has full control, Member can publish and manage content, Contributor can edit but not publish to Apps.",
    microsoftLinks: [
      { text: "Workspace roles", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-roles-new-workspaces" },
      { text: "Distribute with apps", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-create-distribute-apps" }
    ]
  },
  {
    id: 2,
    phase: "Configure and Update an App",
    scenario: "You've published a workspace App to 500 business users. You need to update the app to add a new report page and remove an outdated report. Users should automatically see the updates without re-subscribing.",
    question: "What's the correct procedure?",
    options: [
      "Delete the app and create a new one — users must re-subscribe",
      "Make changes in the workspace (add/remove reports), then Update App in the App settings — existing subscribers automatically receive the updated version without needing to re-subscribe",
      "Send a sharing link for the new report separately",
      "Create a new workspace for the updated reports"
    ],
    correctIndex: 1,
    explanation: "Apps are updated by modifying workspace content and then clicking 'Update App'. This pushes the new version to all existing subscribers automatically. Users don't need to re-subscribe or receive new links. This is why Apps are preferred over direct workspace sharing for broad distribution — updates are seamless.",
    microsoftLinks: [
      { text: "Update Power BI apps", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-create-distribute-apps#update-a-published-app" }
    ]
  },
  {
    id: 3,
    phase: "Row-Level Security",
    scenario: "You're implementing RLS for a sales team where each salesperson sees only their own territory. You have 200 salespeople. Creating 200 static RLS filters would be unmanageable. The Users table has an email column and the Sales table has a TerritoryEmail column.",
    question: "What's the dynamic RLS approach?",
    options: [
      "Create 200 static RLS roles, one per salesperson",
      "Create one dynamic RLS role with the DAX filter: [TerritoryEmail] = USERPRINCIPALNAME() — Power BI automatically matches the logged-in user's UPN to the territory, requiring only one role for all 200 salespeople",
      "Use a separate report per salesperson",
      "Apply username-based filters in Power Query before loading"
    ],
    correctIndex: 1,
    explanation: "Dynamic RLS uses USERPRINCIPALNAME() or USERNAME() functions that return the currently logged-in user's identity at query time. A single role with [TerritoryEmail] = USERPRINCIPALNAME() automatically filters each user to their own territory. This scales to any number of users without creating new roles.",
    microsoftLinks: [
      { text: "Dynamic RLS", url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls#using-userprincipalname" },
      { text: "Row-level security", url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls" }
    ]
  },
  {
    id: 4,
    phase: "Configure RLS Group Membership",
    scenario: "You've created an RLS role called 'RegionEast' in Power BI Desktop. After publishing, you need to assign 50 users to this role. Adding each user individually would take too long.",
    question: "What's the most scalable way to configure RLS role membership?",
    options: [
      "Add each of the 50 users individually to the role in Power BI Service",
      "Assign an Azure Active Directory (Entra ID) security group to the RLS role in Power BI Service — all members of the AD group automatically inherit the role, and group membership changes apply without re-configuring Power BI",
      "Include usernames in a table in the dataset and manage them via data refresh",
      "Create a group workspace for RegionEast users"
    ],
    correctIndex: 1,
    explanation: "RLS role assignments in Power BI Service support Azure AD security groups. Adding a group to a role means all group members get the RLS filter applied. When HR adds or removes users from the AD group, Power BI RLS is automatically updated. This is the enterprise-scalable approach to RLS management.",
    microsoftLinks: [
      { text: "Configure RLS group membership", url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls#manage-security-on-your-model" }
    ]
  },
  {
    id: 5,
    phase: "Sensitivity Labels",
    scenario: "Your organization uses Microsoft Purview Information Protection. Finance reports contain PII and highly confidential financial data. Your governance team requires that sensitive data in Power BI is classified and protected consistently with other Microsoft 365 content.",
    question: "How do sensitivity labels work in Power BI?",
    options: [
      "Sensitivity labels in Power BI are visual-only — they don't affect security",
      "Apply sensitivity labels (Confidential, Highly Confidential, etc.) to datasets and reports — labels are inherited by exports (Excel, PDF), restrict who can access or export content, integrate with Microsoft Purview policies, and provide classification visibility across the data estate",
      "Sensitivity labels are only available in Microsoft 365 apps, not Power BI",
      "Labels encrypt Power BI .pbix files but don't affect Service reports"
    ],
    correctIndex: 1,
    explanation: "Sensitivity labels from Microsoft Purview apply to Power BI datasets, reports, dashboards, and dataflows. They propagate to downstream exports (Excel files inherit the label, preventing unauthorized sharing). Labels enforce encryption and access restrictions based on your organization's Purview policies, creating end-to-end data protection.",
    microsoftLinks: [
      { text: "Sensitivity labels in Power BI", url: "https://learn.microsoft.com/power-bi/enterprise/service-security-sensitivity-label-overview" }
    ]
  },
  {
    id: 6,
    phase: "Promote or Certify Content",
    scenario: "Your data engineering team has created a high-quality, IT-approved dataset that all business units should use as the official source of truth. You want to distinguish this dataset from dozens of other user-created datasets in the organization.",
    question: "What Power BI endorsement features are available?",
    options: [
      "Rename the dataset to include 'OFFICIAL' in the name",
      "Use Promoted (self-service endorsement by workspace members) or Certified (admin-controlled, requires formal approval process) endorsement labels — certified datasets appear prominently in dataset search and Data Hub, signaling trustworthiness",
      "Move the dataset to a special 'certified' workspace",
      "Apply a sensitivity label to indicate official status"
    ],
    correctIndex: 1,
    explanation: "Power BI has two endorsement levels: Promoted (any workspace Member+ can apply, indicates quality) and Certified (requires organizational policy, applied by authorized endorsers, highest trust). Certified datasets appear with a badge in dataset discovery and the Data Hub, encouraging reuse of trusted, governed data.",
    microsoftLinks: [
      { text: "Dataset endorsement", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-endorse-content" }
    ]
  },
  {
    id: 7,
    phase: "Configure Scheduled Refresh",
    scenario: "You have a dataset connecting to an on-premises SQL Server. You need data refreshed at 6 AM and 12 PM daily. After configuring scheduled refresh in Power BI Service, the 6 AM refresh fails with 'Data source credentials are not set'.",
    question: "What's the resolution?",
    options: [
      "Reinstall the gateway",
      "In the dataset settings in Power BI Service, expand Data Source Credentials and enter/re-enter the credentials for each data source — the gateway manages network connectivity but credentials must be stored separately in the Service",
      "Change the refresh schedule to avoid early morning times",
      "The gateway service account is used automatically for SQL Server authentication"
    ],
    correctIndex: 1,
    explanation: "The gateway provides network access to on-premises data sources, but Power BI Service stores credentials separately. For each data source in the dataset, you must configure authentication (Windows, Basic, OAuth) in Dataset Settings → Data Source Credentials. The gateway alone doesn't supply credentials.",
    microsoftLinks: [
      { text: "Configure scheduled refresh", url: "https://learn.microsoft.com/power-bi/connect-data/refresh-scheduled-refresh" },
      { text: "Data source credentials", url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-data-sources" }
    ]
  },
  {
    id: 8,
    phase: "Configure Subscriptions and Alerts",
    scenario: "A sales manager wants to receive an email alert immediately when their team's daily sales drops below $50,000 on the sales dashboard. They also want a weekly PDF snapshot of the full report on Monday mornings.",
    question: "What Power BI features address these two needs?",
    options: [
      "Both requirements can be met with report subscriptions",
      "Data alert on a card visual (set threshold at $50,000, notifies when value goes below) for the immediate alert; Report subscription configured for Monday 8 AM for the weekly PDF snapshot",
      "Power Automate for both scenarios",
      "Data alerts require Premium capacity"
    ],
    correctIndex: 1,
    explanation: "Data alerts are set on dashboard tiles (cards, KPI visuals) and trigger notifications when values cross defined thresholds — ideal for operational monitoring. Report subscriptions send email snapshots (PDF or image) on a configured schedule. These are complementary features serving different needs.",
    microsoftLinks: [
      { text: "Data alerts in Power BI", url: "https://learn.microsoft.com/power-bi/consumer/end-user-alerts" },
      { text: "Report subscriptions", url: "https://learn.microsoft.com/power-bi/consumer/end-user-subscribe" }
    ]
  },
  {
    id: 9,
    phase: "Item-Level Access",
    scenario: "Your workspace has 8 reports: 3 are for the Finance team, 3 for Sales, and 2 are shared. Finance and Sales should not see each other's reports. You don't want to create separate workspaces for each team.",
    question: "How do you implement item-level access control?",
    options: [
      "This is only possible with separate workspaces",
      "Share individual reports directly to specific users or security groups using the Share feature or report-level permissions — this grants access to specific items without workspace membership",
      "Use RLS to hide data from unauthorized users",
      "Create separate Apps for Finance and Sales, including only their respective reports in each App"
    ],
    correctIndex: 3,
    explanation: "Apps are the cleanest solution for item-level access in shared workspaces. Each App can include a different subset of workspace content — a Finance App contains only Finance reports, a Sales App contains only Sales reports. Users with access to one App don't see the other. Direct item sharing is also possible but Apps provide a better governed, curated experience.",
    microsoftLinks: [
      { text: "Share Power BI reports", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-share-reports" },
      { text: "Power BI apps", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-create-distribute-apps" }
    ]
  },
  {
    id: 10,
    phase: "When a Gateway Is Required",
    scenario: "Your colleague is setting up three different data connections: (1) Azure SQL Database, (2) an on-premises Oracle database, (3) a SharePoint Online list. They're confused about which connections require a gateway.",
    question: "Which connections require an on-premises data gateway for scheduled refresh?",
    options: [
      "All three require a gateway",
      "None — all cloud sources are handled automatically",
      "Only the on-premises Oracle database requires a gateway; Azure SQL and SharePoint Online are cloud services and connect directly without a gateway",
      "Azure SQL and Oracle require gateways; SharePoint does not"
    ],
    correctIndex: 2,
    explanation: "Gateways are required for on-premises data sources that Power BI Service cannot directly access. Azure SQL Database and SharePoint Online are cloud services accessible directly from Power BI Service. An on-premises Oracle database sits behind a corporate firewall and requires a gateway to bridge the connection.",
    microsoftLinks: [
      { text: "When is a gateway required?", url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-onprem" },
      { text: "Data gateway types", url: "https://learn.microsoft.com/data-integration/gateway/service-gateway-onprem-faq" }
    ]
  },
  {
    id: 11,
    phase: "Create Dashboards",
    scenario: "Your executive team wants a single-page overview pulling the most important KPIs from 5 different reports across 3 different workspaces. They want it pinned to a single view they can check each morning.",
    question: "What Power BI feature is designed for this cross-report aggregation scenario?",
    options: [
      "Create a new report that re-builds all the visuals from scratch",
      "Create a dashboard in Power BI Service — pin specific tiles from multiple reports, workspaces, and datasets to a single dashboard canvas. Dashboards aggregate content across reports and auto-update as underlying data refreshes",
      "Use composite models to combine all 5 reports into one",
      "Use bookmarks to jump between the 5 reports"
    ],
    correctIndex: 1,
    explanation: "Dashboards in Power BI Service are single-page canvases where you pin tiles from multiple reports, datasets (via Q&A), or streaming data. Unlike reports, dashboards pull from multiple sources and auto-update. They're ideal for executive monitoring views that consolidate KPIs from different subject areas.",
    microsoftLinks: [
      { text: "Create dashboards", url: "https://learn.microsoft.com/power-bi/create-reports/service-dashboard-create" },
      { text: "Pin tiles to dashboard", url: "https://learn.microsoft.com/power-bi/create-reports/service-dashboard-pin-tile-from-report" }
    ]
  },
  {
    id: 12,
    phase: "Configure Access to Semantic Models",
    scenario: "Your team has published a shared semantic model (dataset) that 15 report builders across different workspaces use to create their own reports. A new team member needs to connect to this model from their workspace. You want to grant minimal access.",
    question: "What permission model should you use?",
    options: [
      "Add the new team member as Admin of the workspace containing the dataset",
      "Grant 'Build' permission on the semantic model — this allows the user to create new reports connected to the model from any workspace, without granting workspace membership or the ability to modify the model itself",
      "Share the dataset using the Share dialog which gives full access",
      "Publish a copy of the dataset to the user's workspace"
    ],
    correctIndex: 1,
    explanation: "The 'Build' permission grants the ability to create reports and export data from a semantic model without workspace membership. Users with Build permission can connect from Power BI Desktop, create reports in other workspaces, and use Analyze in Excel. It's the minimum permission needed for self-service report creation on shared models.",
    microsoftLinks: [
      { text: "Semantic model permissions", url: "https://learn.microsoft.com/power-bi/connect-data/service-datasets-build-permissions" },
      { text: "Build permission", url: "https://learn.microsoft.com/power-bi/collaborate-share/service-datasets-build-permissions" }
    ]
  }
];export default questions;
