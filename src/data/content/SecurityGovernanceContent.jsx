// Content for security, access control, and governance topics
export const securityGovernanceContent = {
  "Configure a semantic model scheduled refresh": {
    overview: {
      title: "Automating Data Updates",
      concepts: [
        "Scheduled refresh automatically updates imported data on defined schedule",
        "DirectQuery doesn't need refresh (queries source in real-time)",
        "Refresh frequencies: up to 8x daily with Power BI Pro, 48x with Premium",
        "Gateway required for on-premises data sources",
        "Refresh failures cause stale data requiring investigation"
      ]
    },
    bestPractices: [
      "Set refresh frequency matching data latency requirements",
      "Schedule off-peak hours to minimize service impact",
      "Monitor refresh failures with alerts",
      "Test refresh with realistic data volumes first",
      "Document refresh schedule and dependencies",
      "Coordinate refresh timing across dependent models"
    ],
    commonMistakes: [
      "Refresh frequency too frequent wasting resources",
      "Refresh during peak hours impacting performance",
      "Not monitoring refresh failures",
      "Missing dependencies (data source down, gateway offline)",
      "Not testing before enabling scheduled refresh",
      "Forgetting to configure credentials for refresh"
    ],
    keySteps: [
      "In Power BI Service, go to dataset settings",
      "Scroll to 'Scheduled refresh'",
      "Enable scheduled refresh toggle",
      "Set timezone matching your location",
      "Choose refresh frequency (daily, weekly specific days, etc.)",
      "Set refresh time (off-peak recommended)",
      "Configure data source credentials if needed",
      "Test refresh by clicking 'Refresh now'",
      "Set up email alerts for refresh failures"
    ],
    keyDecisions: [
      "**How often to refresh?** - Daily: operational data; Weekly: summary data; 8x daily: critical KPIs",
      "**Retry failures?** - Yes: automatic retry recommended; No: manual investigation only"
    ],
    keyDefinitions: [
      "**Scheduled Refresh**: Automatic update of imported data at specified time/frequency",
      "**Refresh Frequency**: How often data updates (daily, weekly, custom)",
      "**Refresh Window**: Maximum time allowed for refresh before timeout",
      "**Stale Data**: Data older than expected due to refresh failure",
      "**Incremental Refresh**: Updating only new/changed data vs full reload"
    ],
    risks: [
      "**Refresh failure**: Data becomes stale if refresh doesn't complete",
      "**Timeout**: Large datasets exceed refresh time window",
      "**Credential expiration**: Passwords change breaking refresh",
      "**Gateway dependency**: On-premises source requires gateway running",
      "**Performance impact**: Refresh consuming gateway/service resources",
      "**Silent failures**: Refresh failures not noticed without monitoring"
    ],
    faqs: [
      {
        q: "What's the maximum refresh frequency?",
        a: "Pro license: 8x daily. Premium: 48x daily. Free: 8x daily but not guaranteed."
      },
      {
        q: "Why did my refresh fail?",
        a: "Common causes: invalid credentials, gateway offline, data source unavailable, timeout. Check refresh history logs."
      }
    ],
    examTips: [
      "Know refresh frequency varies by license (Pro 8x, Premium 48x)",
      "Understand scheduled refresh only for Import mode",
      "Remember gateway required for on-premises refresh"
    ],
    resources: [
      {
        title: "Configure scheduled refresh",
        url: "https://learn.microsoft.com/power-bi/connect-data/refresh-scheduled-refresh",
        type: "Documentation"
      }
    ]
  },

  "Assign workspace roles": {
    overview: {
      title: "Role-Based Access Control in Workspaces",
      concepts: [
        "Workspace roles control what users can do: Admin, Member, Contributor, Viewer",
        "Admin: full control including adding users and deleting workspace",
        "Member: can create content but not manage workspace",
        "Contributor: can edit content but not publish or delete",
        "Viewer: read-only access to view reports and dashboards"
      ]
    },
    bestPractices: [
      "Follow least-privilege principle: assign minimum necessary role",
      "Use groups for bulk role assignment (AD groups recommended)",
      "Document role assignments and business justification",
      "Review permissions quarterly",
      "Use Admin role sparingly (only true admins)",
      "Educate users on their role capabilities"
    ],
    commonMistakes: [
      "Assigning Admin to everyone (security risk)",
      "Not using groups for permission management",
      "No documentation of why roles assigned",
      "Roles persist after user changes positions",
      "Over-permissioning (too many editors)",
      "Not reviewing stale permissions"
    ],
    keySteps: [
      "Go to workspace > Access",
      "Click 'Add people' or 'Groups'",
      "Enter email or group name",
      "Select role from dropdown: Admin, Member, Contributor, Viewer",
      "Click Add",
      "Review current role assignments in list",
      "To change role: click role dropdown and select new role",
      "To remove: click X next to user/group"
    ],
    keyDecisions: [
      "**Which role?** - Content creator: Member; Viewer only: Viewer; Admin duties: Admin (sparingly)",
      "**User or group?** - Multiple users: group (easier management); Single user: individual"
    ],
    keyDefinitions: [
      "**Workspace Role**: Permission level controlling user capabilities",
      "**Admin**: Full workspace control including delete/remove users",
      "**Member**: Create content, publish, manage settings",
      "**Contributor**: Edit content but cannot publish or delete",
      "**Viewer**: Read-only access to reports and dashboards"
    ],
    risks: [
      "**Over-permissioning**: Too many admins/editors increases risk",
      "**Stale permissions**: Users retain old roles after position change",
      "**Accidental deletions**: Admin access allows workspace deletion",
      "**Security breach**: Compromised admin account affects entire workspace",
      "**Compliance**: Inability to audit role assignments",
      "**User confusion**: Unclear what role allows/disallows"
    ],
    faqs: [
      {
        q: "Can I give different roles to same person in different workspaces?",
        a: "Yes - roles are per-workspace. Same person can be Admin in one, Viewer in another."
      },
      {
        q: "What can a Contributor do that Viewer cannot?",
        a: "Contributor can edit reports/dashboards. Viewer can only view and interact."
      }
    ],
    examTips: [
      "Know four roles: Admin, Member, Contributor, Viewer",
      "Understand Admin for full control, Member for creators, Viewer for consumers",
      "Remember use groups for efficient permission management"
    ],
    resources: [
      {
        title: "Workspace roles in Power BI",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-roles-spo-workspace-roles",
        type: "Documentation"
      }
    ]
  },

  "Configure item-level access": {
    overview: {
      title: "Granular Permissions for Reports and Dashboards",
      concepts: [
        "Item-level access: granular permissions on individual reports/dashboards",
        "Share reports/dashboards with specific users/groups",
        "Control read, edit, or reshare permissions per item",
        "Different from workspace roles (item vs container permissions)",
        "Enables sharing without adding to workspace"
      ]
    },
    bestPractices: [
      "Use item-level sharing for external users or limited internal access",
      "Prefer workspace roles for team collaboration",
      "Document sharing rationale (who, what, why)",
      "Review shared items regularly for stale access",
      "Use groups instead of individuals when possible",
      "Consider sensitivity of content when sharing"
    ],
    commonMistakes: [
      "Sharing sensitive dashboards too widely",
      "Not documenting item-level sharing decisions",
      "Stale sharing after user role changes",
      "Sharing without understanding permission implications",
      "No audit trail of who has access",
      "Mixing workspace and item-level access confusing permissions"
    ],
    keySteps: [
      "Open report or dashboard in Power BI Service",
      "Click 'Share' button (top right)",
      "Enter email or group name",
      "Select permissions: View, Edit, Reshare, Manage permissions",
      "Optional: allow recipients to reshare",
      "Click Share",
      "View existing access: 'Access' dropdown shows current shares",
      "Revoke: click X next to user/group to remove access"
    ],
    keyDecisions: [
      "**View or Edit permission?** - Read-only: View; Content editing needed: Edit",
      "**Allow reshare?** - Internal trusted users: yes; External: no"
    ],
    keyDefinitions: [
      "**Item-Level Access**: Granular permissions on individual reports/dashboards",
      "**View**: Read-only access to view and interact with item",
      "**Edit**: Permission to modify reports/dashboards",
      "**Reshare**: Allow recipient to share with others",
      "**Manage Permissions**: Allow recipient to manage who else has access"
    ],
    risks: [
      "**Over-sharing**: Sensitive content shared too widely",
      "**Stale access**: Sharing persists after relevance expires",
      "**Confusion**: Item vs workspace permissions hard to manage",
      "**Compliance**: Audit trail may be insufficient",
      "**Accidental changes**: Edit permission allows unintended modifications",
      "**Cascading shares**: Reshare spreads access beyond intent"
    ],
    faqs: [
      {
        q: "What's the difference between workspace role and item share?",
        a: "Workspace role: access to all workspace items. Item share: access to specific items only."
      },
      {
        q: "Can external users get item-level access?",
        a: "Yes - with Azure B2B guest access or Power BI embedded licensing."
      }
    ],
    examTips: [
      "Know item-level access more granular than workspace roles",
      "Understand View/Edit/Reshare/Manage permissions",
      "Remember item sharing independent of workspace membership"
    ],
    resources: [
      {
        title: "Share reports and dashboards in Power BI",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-share-dashboards",
        type: "Documentation"
      }
    ]
  },

  "Configure access to semantic models": {
    overview: {
      title: "Dataset Permission Management",
      concepts: [
        "Semantic model (dataset) permissions control who can use data",
        "Build permissions: allow using model for new reports",
        "Read permissions: view data values in existing reports",
        "Share model vs share reports using model",
        "Separate from item-level report access"
      ]
    },
    bestPractices: [
      "Share semantic models with report creators for consistency",
      "Use groups for model access rather than individuals",
      "Document model access decisions",
      "Review model permissions when ownership changes",
      "Balance access with data governance",
      "Consider impact on data privacy"
    ],
    commonMistakes: [
      "Sharing model not understanding implications",
      "Too many Build permissions (creates duplicate reports)",
      "Not revoking access for departed users",
      "Mixing model and report sharing confusing users",
      "No documentation of model sharing strategy",
      "Sharing confidential models without control"
    ],
    keySteps: [
      "In Power BI Service, go to dataset settings",
      "Click 'Sharing and permissions' or 'Share'",
      "View current access list",
      "Add access: enter email/group, select 'Build' or 'Read'",
      "Build: users can create reports from model",
      "Read: users see values in reports only",
      "Manage: edit other user's permissions",
      "Click Share and notify recipients",
      "Revoke: click three dots > Remove access"
    ],
    keyDecisions: [
      "**Build or Read?** - Report creators: Build; Report viewers: Read",
      "**Share model or just reports?** - Consistency needed: model; Ad-hoc: reports only"
    ],
    keyDefinitions: [
      "**Semantic Model Access**: Permissions controlling dataset use",
      "**Build**: Permission to create new reports from model",
      "**Read**: Permission to view data in reports from model",
      "**Model Sharing**: Granting access to underlying dataset",
      "**Managed Permissions**: Central permission management on dataset"
    ],
    risks: [
      "**Data exposure**: Build permission allows unrestricted data access",
      "**Duplicate reports**: Too many Build permissions create redundancy",
      "**Stale access**: Permissions not revoked for departed users",
      "**Compliance**: Uncontrolled model access violates policy",
      "**Performance**: Unexpected reports from model impact load",
      "**Security**: Sensitive data exposed through model sharing"
    ],
    faqs: [
      {
        q: "Should I share the model or just the report?",
        a: "If consistency needed (official source): share model to creators. Otherwise share just reports."
      },
      {
        q: "What can someone with Build permission do?",
        a: "Create new reports from model without restrictions. They see all data the model contains."
      }
    ],
    examTips: [
      "Know Build permission allows creating reports; Read allows viewing",
      "Understand model access different from report sharing",
      "Remember Build permission is powerful, use sparingly"
    ],
    resources: [
      {
        title: "Manage access to semantic models",
        url: "https://learn.microsoft.com/power-bi/connect-data/service-datasets-manage-access-permissions",
        type: "Documentation"
      }
    ]
  },

  "Implement row-level security roles": {
    overview: {
      title: "Data-Level Security Using DAX",
      concepts: [
        "Row-level security (RLS) restricts data visible to users based on identity",
        "RLS roles defined in Power BI using DAX filters",
        "Users assigned to roles, see only data matching role filters",
        "Dynamic RLS: filters based on USERNAME() or USERPRINCIPALNAME()",
        "Essential for multi-tenant or sensitive data scenarios"
      ]
    },
    bestPractices: [
      "Design RLS at dimension table level for performance",
      "Use dynamic RLS with USERNAME() for automatic filtering",
      "Test RLS thoroughly with multiple user scenarios",
      "Document role definitions and business logic",
      "Avoid complex RLS logic that slows queries",
      "Combine with item-level access for defense in depth"
    ],
    commonMistakes: [
      "Complex RLS logic that impacts performance severely",
      "Not testing RLS with actual user accounts",
      "Over-relying on RLS without item-level security",
      "RLS filters that don't match reality",
      "Hard-coded user names (not dynamic)",
      "Forgetting to assign users to roles"
    ],
    keySteps: [
      "In Power BI Desktop, go to Modeling > Manage Roles",
      "Click New to create role",
      "Name role (e.g., 'SalesRegion_East')",
      "Select table to apply filters",
      "Enter DAX filter (e.g., [Region] = 'East')",
      "Add multiple filters if needed",
      "For dynamic: use USERNAME() or USERPRINCIPALNAME()",
      "Test role: Modeling > View As > select role + user",
      "Publish to Service and assign users to roles"
    ],
    keyDecisions: [
      "**Static or dynamic RLS?** - Fixed roles: static; User-based: dynamic USERNAME()",
      "**Which table to filter?** - Dimension at key level: better performance",
      "**Multiple role membership?** - User in multiple roles: all filters apply (union)"
    ],
    keyDefinitions: [
      "**Row-Level Security (RLS)**: Data-level access control using DAX roles",
      "**RLS Role**: Named role with DAX filters restricting visible data",
      "**Dynamic RLS**: Filters based on logged-in user (USERNAME/USERPRINCIPALNAME)",
      "**Static RLS**: Fixed role assignments not changing by user"
    ],
    risks: [
      "**Performance degradation**: Complex RLS logic slows queries significantly",
      "**Incorrect filtering**: RLS logic missing edge cases or wrong logic",
      "**User confusion**: Users see different data but don't understand why",
      "**False security**: Over-relying on RLS without other controls",
      "**Role bypass**: Users gaming system or circumventing roles",
      "**Maintenance burden**: Complex RLS hard to maintain and audit"
    ],
    faqs: [
      {
        q: "How do I test RLS before publishing?",
        a: "Modeling > View As > select role and test user, verify appropriate data visible."
      },
      {
        q: "Can user belong to multiple RLS roles?",
        a: "Yes - all role filters apply (logical OR). User sees union of all role data."
      }
    ],
    examTips: [
      "Know RLS filters data using DAX roles",
      "Understand dynamic RLS uses USERNAME/USERPRINCIPALNAME",
      "Remember to test RLS thoroughly before deploying"
    ],
    resources: [
      {
        title: "Row-level security in Power BI",
        url: "https://learn.microsoft.com/power-bi/admin/service-admin-rls",
        type: "Documentation"
      }
    ]
  },

  "Configure row-level security group membership": {
    overview: {
      title: "Assigning Users to RLS Roles",
      concepts: [
        "After defining RLS roles, assign users/groups to roles",
        "Users assigned in Power BI Service, not Desktop",
        "Can assign Azure AD security groups (preferred) or individuals",
        "Users see only data matching their role's filters",
        "Configuration in dataset security settings"
      ]
    },
    bestPractices: [
      "Use Azure AD security groups instead of individuals",
      "Name groups clearly showing RLS role mapping",
      "Document role membership for audit trail",
      "Verify group membership through Azure AD",
      "Test access after assigning users",
      "Maintain group membership accuracy"
    ],
    commonMistakes: [
      "Assigning individuals instead of groups (hard to manage)",
      "Not verifying group membership in Azure AD",
      "Wrong group assigned to role",
      "No documentation of role assignments",
      "Forgetting to assign users to any role",
      "Stale group memberships not updated"
    ],
    keySteps: [
      "In Power BI Service, go to dataset settings",
      "Click 'Row-level security'",
      "Select role from dropdown",
      "Click 'Add members'",
      "Search for Azure AD group or user",
      "Select and click Add",
      "Verify in members list",
      "Test: user logs in and sees appropriate data",
      "Remove members: click X next to name if needed"
    ],
    keyDecisions: [
      "**Group or individual?** - Multiple users: group (easier); Single: individual acceptable",
      "**How to verify membership?** - Azure AD groups automatically synced"
    ],
    keyDefinitions: [
      "**RLS Group Membership**: Assigning users to security roles",
      "**Azure AD Group**: Cloud directory group for permission management",
      "**Role Assignment**: Linking users to RLS role for data filtering"
    ],
    risks: [
      "**Wrong group assignment**: Users see incorrect data",
      "**Stale membership**: Group members outdated in Power BI",
      "**Accidental exposure**: Users added to wrong role",
      "**No audit trail**: Changes not logged without tracking",
      "**Synchronization delay**: Azure AD changes don't sync immediately",
      "**Over-access**: User accidentally in multiple roles"
    ],
    faqs: [
      {
        q: "How do I change which role a user belongs to?",
        a: "Remove from old role, then add to new role using the RLS menu."
      },
      {
        q: "How long does group membership sync to Power BI?",
        a: "Usually immediate but can take up to 24 hours. Test manually if needed."
      }
    ],
    examTips: [
      "Know role membership configured in Service not Desktop",
      "Understand use Azure AD groups for efficient management",
      "Remember verify group membership for accuracy"
    ],
    resources: [
      {
        title: "Configure RLS group membership",
        url: "https://learn.microsoft.com/power-bi/admin/service-admin-configure-role-group-membership",
        type: "Documentation"
      }
    ]
  },

  "Apply sensitivity labels": {
    overview: {
      title: "Data Classification and Protection",
      concepts: [
        "Sensitivity labels classify data (Public, Internal, Confidential, Highly Confidential)",
        "Labels inherited from Microsoft Purview (formerly Information Protection)",
        "Labels trigger protection policies: download restrictions, user restrictions",
        "Help users understand data sensitivity",
        "Enable compliance with organizational policies"
      ]
    },
    bestPractices: [
      "Establish clear labeling policy with business terms",
      "Label all datasets according to sensitivity",
      "Train users on label meanings and implications",
      "Use labels consistently across organization",
      "Review and update labels as data sensitivity changes",
      "Combine labels with RLS for sensitive data"
    ],
    commonMistakes: [
      "No clear labeling policy causing inconsistency",
      "Labels not enforced (no consequences for violations)",
      "Over-labeling everything (reduces label effectiveness)",
      "Under-labeling reducing protection",
      "Not communicating label meanings to users",
      "Labels that don't match actual data sensitivity"
    ],
    keySteps: [
      "Ensure Purview (or AIP) configured with sensitivity labels",
      "In Power BI, go to dataset > settings",
      "Find 'Sensitivity label' dropdown",
      "Select appropriate label: Public, Internal, Confidential, etc.",
      "Labels set by tenant admin or dataset owner",
      "Label appears on item indicating sensitivity",
      "Protection policies apply automatically based on label"
    ],
    keyDecisions: [
      "**Which label?** - Public: no restrictions; Confidential: limited sharing; Highly Confidential: very restricted",
      "**Enforce restrictions?** - Depends on policy and data sensitivity"
    ],
    keyDefinitions: [
      "**Sensitivity Label**: Classification indicating data sensitivity level",
      "**Label Protection**: Policies applied based on sensitivity (download restrictions, etc.)",
      "**Purview (AIP)**: Microsoft service managing sensitivity labels",
      "**Policy Enforcement**: Automatic restrictions based on label"
    ],
    risks: [
      "**False security**: Labels alone don't protect - policies must enforce",
      "**User circumvention**: Users may ignore labels or export despite restrictions",
      "**Over-restriction**: Labels too restrictive limit usefulness",
      "**Under-protection**: Important data not properly labeled/protected",
      "**Complexity**: Too many labels confuses users",
      "**Compliance failure**: Inconsistent labeling violates policy"
    ],
    faqs: [
      {
        q: "What happens when I label data as Confidential?",
        a: "Policies apply: may restrict downloads, limit sharing, or require justification depending on config."
      },
      {
        q: "Can users change labels on items they don't own?",
        a: "No - only owner can change. Users can propose changes through workflow if enabled."
      }
    ],
    examTips: [
      "Know sensitivity labels classify data sensitivity",
      "Understand labels trigger protection policies",
      "Remember labels must be configured in Purview first"
    ],
    resources: [
      {
        title: "Sensitivity labels in Power BI",
        url: "https://learn.microsoft.com/power-bi/admin/service-security-sensitivity-label-overview",
        type: "Documentation"
      }
    ]
  }
};
