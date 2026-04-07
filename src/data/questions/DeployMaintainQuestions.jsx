// PL-300 Questions: Manage and Secure Power BI domain — 5 per topic

export const deployMaintainQuestions = [

  // topic: Create and configure a workspace
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Create and configure a workspace",
    question: "What workspace is required for team collaboration and app publishing?",
    options: ["Personal workspace (My Workspace)","A standard App workspace (not My Workspace)","A public workspace","A classic workspace"],
    correct: 1,
    explanation: "App workspaces (other than My Workspace) enable team collaboration, role assignments, and publishing Power BI apps to end users."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Create and configure a workspace",
    question: "What is 'My Workspace' in Power BI Service and what are its limitations?",
    options: ["A workspace for enterprise reporting","A personal sandbox for individual development — it cannot be shared with others or used to publish apps","A premium workspace for large datasets","A workspace that supports all collaboration features"],
    correct: 1,
    explanation: "My Workspace is a personal space for development and testing. It cannot be shared with colleagues, does not support team roles, and cannot be used to publish apps."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Create and configure a workspace",
    question: "What license is required to create a workspace (other than My Workspace) in Power BI Service?",
    options: ["Power BI Free","Power BI Pro or higher (or Premium Per User)","Microsoft 365 E3","Azure subscription"],
    correct: 1,
    explanation: "Creating and using standard workspaces requires Power BI Pro (or Premium Per User) license. Power BI Free is limited to My Workspace only."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Create and configure a workspace",
    question: "What is a deployment pipeline in Power BI and how does it relate to workspaces?",
    options: ["A tool for importing data from external pipelines","A feature that links Development, Test, and Production workspaces to manage the lifecycle of Power BI content","A data pipeline for ETL operations","A version control system for DAX code"],
    correct: 1,
    explanation: "Deployment pipelines link up to 3 workspaces (Dev, Test, Prod) allowing controlled promotion of content through stages — requiring Premium capacity or PPU."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Create and configure a workspace",
    question: "What happens to content in a workspace when a user with the Admin role is removed?",
    options: ["All content is deleted","The content remains in the workspace — workspace content is owned by the workspace, not individual users","The content is transferred to the removed user's My Workspace","Content is automatically archived"],
    correct: 1,
    explanation: "Workspace content persists independently of individual user accounts — removing a user doesn't delete content. This is a key benefit of workspaces over My Workspace."
  },

  // topic: Assign workspace roles
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Assign workspace roles",
    question: "Which workspace role can create and edit content but cannot publish apps?",
    options: ["Admin","Member","Contributor","Viewer"],
    correct: 2,
    explanation: "Contributor can create, edit, and delete workspace content but cannot publish apps or manage workspace settings. Admin and Member can publish apps."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Assign workspace roles",
    question: "What is the minimum workspace role that allows a user to view content in the workspace?",
    options: ["Contributor","Member","Viewer","No role needed — all workspace content is public"],
    correct: 2,
    explanation: "Viewer is the minimum role for accessing workspace content. Viewers can view but not create, edit, or publish content."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Assign workspace roles",
    question: "Which workspace role has full control, including adding/removing members and deleting the workspace?",
    options: ["Owner","Admin","Member","Contributor"],
    correct: 1,
    explanation: "Admin has full control — can add/remove users at any role level, publish apps, and delete the workspace. There are no 'Owner' roles in Power BI workspaces."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Assign workspace roles",
    question: "A report developer needs to publish and update content in a workspace, but should not be able to add new workspace members. Which role should they receive?",
    options: ["Admin","Member","Contributor","Viewer"],
    correct: 2,
    explanation: "Contributor can create, edit, publish, and delete content but cannot manage workspace members or publish apps — perfect for developers who don't need administrative control."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Assign workspace roles",
    question: "Can Azure AD security groups be assigned workspace roles in Power BI?",
    options: ["No — only individual users can be assigned roles","Yes — Azure AD security groups can be assigned any workspace role, making access management scalable","Only in Premium workspaces","Only Admin and Member roles can be assigned to groups"],
    correct: 1,
    explanation: "Azure AD security groups can be assigned any workspace role — when users are added/removed from the AD group, their workspace access updates automatically."
  },

  // topic: Configure a semantic model scheduled refresh
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Configure a semantic model scheduled refresh",
    question: "How many scheduled refreshes per day are allowed with Power BI Pro?",
    options: ["4 refreshes","8 refreshes","16 refreshes","48 refreshes"],
    correct: 1,
    explanation: "Power BI Pro allows up to 8 scheduled refreshes per day. Premium capacity (or PPU) allows up to 48 refreshes per day."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Configure a semantic model scheduled refresh",
    question: "Where do you configure scheduled refresh in Power BI Service?",
    options: ["In Power BI Desktop > Publish settings","In Power BI Service, go to the dataset settings > Scheduled refresh","In the workspace > Refresh all","In the report settings > Data source"],
    correct: 1,
    explanation: "Scheduled refresh is configured in the dataset (semantic model) settings in Power BI Service — click the three dots next to the dataset > Settings > Scheduled refresh."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Configure a semantic model scheduled refresh",
    question: "What happens when a scheduled refresh fails multiple times in a row?",
    options: ["The dataset is deleted","Power BI automatically disables the scheduled refresh and notifies the dataset owner by email","The dataset is rolled back to the last successful refresh","Nothing — Power BI keeps retrying indefinitely"],
    correct: 1,
    explanation: "After consecutive refresh failures, Power BI disables the scheduled refresh to prevent resource waste and sends an email notification to the dataset owner."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Configure a semantic model scheduled refresh",
    question: "What is required for a semantic model using an on-premises data source to support scheduled refresh?",
    options: ["The data source must be migrated to the cloud","An on-premises data gateway must be installed, configured, and connected to the data source","The dataset must use DirectQuery instead of Import","Power BI Premium is required for on-premises refresh"],
    correct: 1,
    explanation: "An on-premises data gateway bridges Power BI Service and on-premises data sources — it must be installed on a server that can reach both the internet and the data source."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Configure a semantic model scheduled refresh",
    question: "You need a dataset to refresh every hour throughout the business day (8am-6pm, 10 refreshes). What Power BI license is required?",
    options: ["Power BI Free","Power BI Pro (8 refreshes/day covers this with some margin)","Power BI Premium (needed for more than 8 refreshes/day)","Only an Azure subscription is needed"],
    correct: 2,
    explanation: "10 hourly refreshes from 8am-6pm exceeds the 8/day Pro limit. Power BI Premium or Fabric capacity (up to 48/day) is required for higher refresh frequency."
  },

  // topic: Choose a distribution method
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Choose a distribution method",
    question: "What is the most appropriate way to distribute reports to a large group of read-only consumers?",
    options: ["Share individual reports with each person","Publish a Power BI App from the workspace","Export to PDF and email","Give all consumers Contributor access to the workspace"],
    correct: 1,
    explanation: "Power BI Apps provide a curated, stable experience for consumers. They access reports via the app without needing workspace access or being affected by workspace changes."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Choose a distribution method",
    question: "What is the benefit of distributing reports via a Power BI App versus direct workspace access?",
    options: ["Apps are free to use — no Pro license required","Apps show a stable, published version — workspace changes don't affect app users until the app is republished","Apps automatically refresh data more frequently","Apps support more concurrent users than workspaces"],
    correct: 1,
    explanation: "Apps decouple development from consumption — report authors can work on updated versions in the workspace without affecting app users until deliberately republished."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Choose a distribution method",
    question: "How do end users access a Power BI App?",
    options: ["Via a direct link to the workspace","From the Apps section in Power BI Service, or via a direct app link shared by the app publisher","By being assigned a workspace role","Via the Power BI Desktop publish option"],
    correct: 1,
    explanation: "End users access apps via the Apps section in Power BI Service or a direct deep link. They don't need workspace access — the app provides a separate consumption experience."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Choose a distribution method",
    question: "When is embedding a report in Microsoft Teams an appropriate distribution method?",
    options: ["When users don't have Power BI accounts","When the target audience uses Teams as their primary collaboration tool and wants to view reports without leaving Teams","When the report contains sensitive financial data","When the dataset needs to refresh in real-time"],
    correct: 1,
    explanation: "Embedding in Teams is ideal for audiences who live in Teams — they can view reports in the flow of work without switching to Power BI Service."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Choose a distribution method",
    question: "What is 'Publish to web' and why should it be used carefully?",
    options: ["A secure way to share reports with external business partners","A feature that creates a publicly accessible embed code — anyone with the link can view the report without authentication","A method to publish to Power BI Service only","A way to embed reports in SharePoint securely"],
    correct: 1,
    explanation: "'Publish to web' creates a public embed code with NO authentication — the report and its data are visible to anyone. It must never be used for sensitive or internal data."
  },

  // topic: Identify when a gateway is required
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Identify when a gateway is required",
    question: "When is an on-premises data gateway required?",
    options: ["When using any cloud data source","When Power BI Service needs to connect to on-premises or private network data sources","For all scheduled refreshes regardless of source","Only for DirectQuery connections"],
    correct: 1,
    explanation: "A gateway is required when Power BI Service needs to reach data sources that aren't publicly accessible — on-premises databases, private servers, or VPN-secured systems."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Identify when a gateway is required",
    question: "Which type of gateway should you use for shared team use in an enterprise environment?",
    options: ["Personal mode gateway","Standard (enterprise) mode gateway","Virtual network gateway — VNet data gateway","No gateway is needed for enterprise environments"],
    correct: 1,
    explanation: "The standard (enterprise) mode gateway supports multiple users, multiple data sources, and both scheduled refresh and DirectQuery connections — designed for shared enterprise use."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Identify when a gateway is required",
    question: "A report connects to Azure SQL Database (a cloud service). Does it require a gateway for scheduled refresh in Power BI Service?",
    options: ["Yes — all data sources require a gateway","No — publicly accessible cloud data sources like Azure SQL do not require a gateway","Yes — but only a personal mode gateway","Only if the Azure SQL database uses private endpoints"],
    correct: 1,
    explanation: "Publicly accessible cloud services (Azure SQL, SharePoint Online, etc.) don't require a gateway — Power BI Service can reach them directly without an intermediary."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Identify when a gateway is required",
    question: "What is a VNet data gateway and when would you use it?",
    options: ["A gateway for very large networks","A cloud-based gateway that allows Power BI to connect to Azure data sources secured within a Virtual Network (private endpoint) without on-premises hardware","A backup gateway for high availability","A gateway specifically for Fabric workloads only"],
    correct: 1,
    explanation: "VNet data gateway is a Microsoft-managed cloud gateway for connecting to Azure services within a private VNet — no on-premises server needed, unlike the standard gateway."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Identify when a gateway is required",
    question: "A data analyst connects Power BI Desktop directly to an on-premises SQL Server successfully. Why might the scheduled refresh in Power BI Service fail?",
    options: ["Power BI Service cannot use SQL Server","The analyst's laptop is not always on, and there is no enterprise gateway configured to connect Power BI Service to the on-premises server","Power BI Service requires Azure SQL, not on-premises SQL","The dataset must use DirectQuery for the refresh to work"],
    correct: 1,
    explanation: "Desktop works because it runs locally and can reach the on-premises server directly. Service runs in Microsoft's cloud and cannot reach the on-premises server without a gateway installed on an always-on server."
  },

  // topic: Promote or certify Power BI content
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Promote or certify Power BI content",
    question: "What is the difference between 'Promoted' and 'Certified' endorsement in Power BI?",
    options: ["No difference — both are identical endorsement levels","Promoted can be set by the content owner; Certified requires a designated certifier and is the highest trust level","Certified is set by the content owner; Promoted requires admin approval","Promoted is for datasets only; Certified is for reports only"],
    correct: 1,
    explanation: "Promoted is a self-endorsement by the owner recommending their content. Certified requires a designated organizational certifier and signals the highest level of trustworthiness."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Promote or certify Power BI content",
    question: "Where are endorsed datasets shown to stand out from others in Power BI Service?",
    options: ["They are highlighted in My Workspace only","Endorsed content appears with a badge in search results, dataset pickers, and the data hub — making it easier to discover trusted content","Endorsement only affects how content is sorted — no visual badge","Endorsed content is only visible to admins"],
    correct: 1,
    explanation: "Endorsed content displays a Promoted or Certified badge throughout Power BI Service — in the data hub, dataset pickers when creating reports, and search results."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Promote or certify Power BI content",
    question: "Who can mark content as 'Promoted'?",
    options: ["Only Power BI admins","Anyone with write access (Admin, Member, or Contributor role) on the workspace item","Only the original creator","Only users with a Premium license"],
    correct: 1,
    explanation: "Any user with write access to the content (Admin, Member, or Contributor role) can promote it — it's self-service endorsement with no approval required."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Promote or certify Power BI content",
    question: "What does an organization need to set up before users can certify content?",
    options: ["Premium capacity must be purchased","A Power BI admin must designate specific users or groups as certified reviewers in the tenant settings","All content must be promoted first","Certification requires a Microsoft partner to review the content"],
    correct: 1,
    explanation: "Certification requires a Power BI administrator to configure certified reviewers in the tenant admin portal — only designated certifiers can apply the Certified badge."
  },
  {
    domain: "deploy_maintain", section: "Create and manage workspaces and assets",
    topic: "Promote or certify Power BI content",
    question: "What content types can be endorsed (Promoted or Certified) in Power BI?",
    options: ["Datasets only","Datasets, dataflows, datamarts, and reports","Only reports and dashboards","Only datasets and dataflows"],
    correct: 1,
    explanation: "Endorsement applies to datasets, dataflows, datamarts, and reports — allowing organizations to flag trusted content across all content types in Power BI Service."
  },

  // topic: Implement row-level security roles
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Implement row-level security roles",
    question: "How do you test row-level security in Power BI Desktop before publishing?",
    options: ["Publish to Service and check manually","Use 'View as role' in the Modeling tab to simulate what a role sees","Row-level security cannot be tested before publishing","Use DAX Studio to simulate RLS"],
    correct: 1,
    explanation: "'View as role' in the Modeling tab simulates the filter a user assigned to that role would see — essential for validating RLS before deployment."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Implement row-level security roles",
    question: "Where do you create RLS roles in Power BI Desktop?",
    options: ["File > Security Settings","Modeling tab > Manage roles","Home tab > Row-Level Security","Format pane > Security"],
    correct: 1,
    explanation: "RLS roles are created via the Modeling tab > Manage roles in Power BI Desktop, where you define roles and their DAX filter expressions."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Implement row-level security roles",
    question: "What DAX expression would restrict the 'East Region' role to only see data where Region = 'East'?",
    options: ["FILTER(ALL(Sales), Sales[Region] = \"East\")","[Region] = \"East\" applied as a table filter on the dimension table containing Region","CALCULATE(ALL(Sales[Region]))","USERELATIONSHIP(Sales[Region], \"East\")"],
    correct: 1,
    explanation: "RLS DAX filter expressions are defined as row filters on tables — [Region] = \"East\" on the Region table filters the model so only East region data is accessible."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Implement row-level security roles",
    question: "What is 'Dynamic RLS' and how is it implemented?",
    options: ["RLS that changes based on the time of day","RLS that uses the logged-in user's identity (via USERPRINCIPALNAME()) to filter data from a security mapping table — no separate role per user needed","RLS that only works in DirectQuery mode","RLS that automatically detects user permissions from Active Directory"],
    correct: 1,
    explanation: "Dynamic RLS uses USERPRINCIPALNAME() in the DAX filter to match the logged-in user's email against a security table, applying the correct row filter per user dynamically."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Implement row-level security roles",
    question: "If a user is not assigned to any RLS role on a dataset, what data do they see?",
    options: ["No data — unassigned users see a blank report","All data — RLS only restricts users explicitly assigned to roles (unless they are also dataset owners/workspace admins who bypass RLS)","Only the first 100 rows","An error message"],
    correct: 1,
    explanation: "Users not assigned to an RLS role see all data. RLS only restricts access for users assigned to roles. Dataset owners and workspace admins bypass RLS entirely."
  },

  // topic: Configure row-level security group membership
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure row-level security group membership",
    question: "How should you assign users to RLS roles at scale in an organization?",
    options: ["Add individual email addresses to each role","Assign Azure AD security groups to RLS roles in Power BI Service","Create separate datasets for each user group","Use dynamic RLS only — no group assignment needed"],
    correct: 1,
    explanation: "Assigning Azure AD security groups to RLS roles is the scalable approach — when users join or leave groups, access is automatically managed without updating the Power BI dataset."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure row-level security group membership",
    question: "Where do you assign users or groups to RLS roles after publishing to Power BI Service?",
    options: ["In Power BI Desktop after publishing","In Power BI Service > Dataset settings > Security tab","In Azure Active Directory directly","In the report's Format pane > Security"],
    correct: 1,
    explanation: "After publishing, RLS membership is managed in Power BI Service via the dataset's Security settings — accessible from the workspace or the dataset's three-dot menu."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure row-level security group membership",
    question: "Can you test RLS in Power BI Service for a specific user without logging in as them?",
    options: ["No — you must log in as the user to test","Yes — in the dataset Security settings, use 'Test as role' or 'Test as user' to simulate what that user sees","Only workspace admins can test as other users","This feature requires Premium capacity"],
    correct: 1,
    explanation: "Power BI Service provides a 'Test as role' feature in the Security settings, allowing admins to verify what a specific user or role would see without needing their credentials."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure row-level security group membership",
    question: "What happens to a user's RLS access when they are removed from an Azure AD group assigned to an RLS role?",
    options: ["Their access is revoked at the next dataset refresh only","Their access is revoked almost immediately — Azure AD group membership changes propagate quickly to Power BI","Their access remains until manually removed from the RLS role","Their access is revoked only after the report is republished"],
    correct: 1,
    explanation: "Azure AD group membership changes propagate quickly to Power BI — removing a user from an AD group effectively removes their access without any manual changes in Power BI."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure row-level security group membership",
    question: "A dataset owner (workspace Admin role) views a report that has RLS configured. Do they see filtered or full data?",
    options: ["Filtered data — RLS applies to all users including admins","Full, unfiltered data — workspace admins and dataset owners bypass RLS","Filtered data — admins must explicitly be added to a full-access role","It depends on whether the admin is also assigned to an RLS role"],
    correct: 1,
    explanation: "Workspace admins and dataset owners bypass RLS by default and see all data. This is by design to allow them to manage and troubleshoot the dataset."
  },

  // topic: Apply sensitivity labels
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Apply sensitivity labels",
    question: "What do sensitivity labels control in Power BI content?",
    options: ["Visual color schemes and fonts","Data classification and downstream protection policies (export, download, sharing restrictions)","Report page refresh intervals","DAX query performance thresholds"],
    correct: 1,
    explanation: "Sensitivity labels from Microsoft Purview classify data (e.g. Confidential, Public) and can enforce downstream protections like preventing export or restricting sharing."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Apply sensitivity labels",
    question: "Where are sensitivity labels defined and managed?",
    options: ["In Power BI Desktop settings","In Microsoft Purview (Microsoft Information Protection) and configured for Power BI by a tenant admin","In Azure Active Directory","In the Power BI Service tenant settings only"],
    correct: 1,
    explanation: "Sensitivity labels are defined in Microsoft Purview (formerly MIP) and enabled for Power BI by the tenant admin. The labels available in Power BI come from the Purview configuration."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Apply sensitivity labels",
    question: "If you apply a 'Confidential' sensitivity label to a dataset, what happens to reports built on that dataset?",
    options: ["Nothing — labels do not propagate","The label automatically propagates to reports and dashboards built from the dataset (label inheritance)","The reports are deleted","The reports require Premium capacity to open"],
    correct: 1,
    explanation: "Sensitivity labels propagate downstream — applying a label to a dataset causes it to be inherited by reports and dashboards built from it, ensuring consistent data classification."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Apply sensitivity labels",
    question: "What export protection might a 'Highly Confidential' sensitivity label enforce?",
    options: ["No export protection — labels are only informational","The label's protection policy may encrypt exported files and restrict who can open them, even outside Power BI","Exports are blocked entirely regardless of user permissions","Only PDF exports are affected"],
    correct: 1,
    explanation: "Sensitivity labels with encryption policies protect exported content — Excel or PDF exports inherit the label's encryption, restricting access to authorized users even outside Power BI."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Apply sensitivity labels",
    question: "Can a user apply a lower sensitivity label than the one inherited from the dataset?",
    options: ["Yes — users can freely change any label","No — users cannot downgrade a sensitivity label to a less restrictive one without justification (enforced by policy and audited)","Only admins can change sensitivity labels","Labels cannot be changed after initial assignment"],
    correct: 1,
    explanation: "Label downgrade protection prevents users from reducing the classification of content (e.g. from Confidential to Public) without a justified reason — and such actions are audited."
  },

  // topic: Configure access to semantic models
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure access to semantic models",
    question: "What does the 'Build' permission on a semantic model allow a user to do?",
    options: ["Edit the data model and add measures","Create new reports in Power BI Service using that semantic model as the data source","Modify scheduled refresh settings","Delete the semantic model"],
    correct: 1,
    explanation: "Build permission allows users to create new reports and composite models on top of a shared semantic model — separate from Read (view) or Write (edit) permissions."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure access to semantic models",
    question: "What is the difference between 'Read' and 'Build' permissions on a semantic model?",
    options: ["No difference — they are identical","Read allows viewing reports built on the model; Build allows creating new reports, queries, and composite models on top of it","Build includes Read but also allows editing the dataset","Read is for admins; Build is for regular users"],
    correct: 1,
    explanation: "Read lets users view existing reports using the dataset. Build lets users create new content (reports, Analyze in Excel, composite models) using the dataset as a source."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure access to semantic models",
    question: "How do you grant Build permission to a user on a dataset?",
    options: ["Assign them Admin role in the workspace","Go to the dataset settings > Permissions > Grant access with Build checked","Add them to an RLS role","Share the underlying data source credentials with them"],
    correct: 1,
    explanation: "Build permission is granted via the dataset's Permissions settings in Power BI Service — it can be granted independently of workspace role."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure access to semantic models",
    question: "A user needs to analyze Power BI data in Excel using Analyze in Excel. What permission is required on the dataset?",
    options: ["Workspace Contributor role","Build permission on the semantic model","Read permission only","Admin permission on the workspace"],
    correct: 1,
    explanation: "Analyze in Excel creates a live connection to the Power BI dataset — this requires Build permission to establish the connection and query the model from Excel."
  },
  {
    domain: "deploy_maintain", section: "Secure and govern Power BI items",
    topic: "Configure access to semantic models",
    question: "What is a composite model and what permission does a user need to create one?",
    options: ["A model with more than 10 tables — requires Premium capacity","A model that combines data from one or more existing semantic models with additional local data — requires Build permission on the source semantic models","A model that uses both Import and DirectQuery — requires Admin workspace role","A model with calculation groups — requires PPU license"],
    correct: 1,
    explanation: "Composite models combine a published semantic model with additional local tables. The user needs Build permission on the source semantic model(s) to create the composite connection."
  }
];
