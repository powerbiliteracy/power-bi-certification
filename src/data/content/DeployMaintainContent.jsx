// Content for Manage and secure Power BI domain
export const deployMaintainContent = {
  "Create and configure a workspace": {
    overview: {
      title: "Power BI Workspace Management",
      concepts: [
        "Workspaces are containers for Power BI content (reports, dashboards, datasets)",
        "Personal workspace (My workspace) for individual development",
        "Premium workspaces enable advanced features and capacity management",
        "Workspace configuration controls app publishing, refresh schedules, and access",
        "Security and collaboration are managed at workspace level"
      ]
    },
    bestPractices: [
      "Create separate workspaces for different business units or teams",
      "Use descriptive names that clearly indicate workspace purpose",
      "Set appropriate admin and member permissions based on roles",
      "Enable Premium capacity for production workspaces with heavy usage",
      "Configure refresh schedules during off-peak hours",
      "Document workspace purpose and content ownership",
      "Use workspace apps to share content with users"
    ],
    commonMistakes: [
      "Creating too many workspaces causing confusion and fragmentation",
      "Not assigning appropriate roles leading to security issues",
      "Scheduling refresh during peak hours impacting performance",
      "Forgetting to configure workspace storage limits",
      "Not setting up workspace backup or disaster recovery",
      "Allowing unlimited app creation without governance"
    ],
    keySteps: [
      "Power BI Service > Workspaces > New workspace",
      "Name workspace and add description",
      "Choose workspace capacity (Shared or Premium)",
      "Add members and assign roles (Admin, Member, Contributor, Viewer)",
      "Configure settings: refresh schedules, apps, pipelines",
      "Set up workspace OneDrive for file storage",
      "Create and publish workspace app for distribution"
    ],
    keyDecisions: [
      "**Premium or Shared capacity?** - Heavy usage: Premium; Light usage: Shared sufficient",
      "**Who needs access?** - Limit to necessary users; use security groups for teams",
      "**Which role for each user?** - Admin: management; Member: create/edit; Contributor: limited; Viewer: read-only",
      "**Publish workspace app?** - Share with users: yes; Internal only: no",
      "**Refresh schedule?** - During off-peak: better; Daily sufficient: balance with freshness"
    ],
    keyDefinitions: [
      "**Workspace**: Container for Power BI content accessible by team members",
      "**Premium Capacity**: Dedicated resources for workspace (higher performance, more features)",
      "**Shared Capacity**: Shared resources across multiple workspaces (free tier)",
      "**Workspace App**: Published view of workspace content for end users",
      "**Admin Role**: Full control over workspace and its content",
      "**Workspace OneDrive**: Cloud storage connected to workspace"
    ],
    risks: [
      "**Access control**: Too broad permissions expose sensitive data",
      "**Performance issues**: Shared capacity may throttle heavy usage",
      "**Orphaned content**: Workspaces without clear ownership become unmaintained",
      "**Cost overruns**: Premium capacity more expensive than shared",
      "**Fragmentation**: Too many workspaces become difficult to manage",
      "**Refresh conflicts**: Multiple workspaces refreshing simultaneously overload capacity"
    ],
    faqs: [
      {
        q: "What's the difference between Premium and Shared capacity?",
        a: "Premium provides dedicated resources (faster, more features), while Shared spreads resources across workspaces. Premium costs more but better for high-volume production."
      },
      {
        q: "How many members can a workspace have?",
        a: "Unlimited members. Assign appropriate roles: Admins manage, Members create, Contributors edit existing content, Viewers consume only."
      },
      {
        q: "Can I move content between workspaces?",
        a: "Yes, using Power BI API or by republishing reports/dashboards. Not as straightforward as copy-paste."
      },
      {
        q: "What happens if I delete a workspace?",
        a: "All content in workspace is deleted permanently (after 30-day recovery period). Archive or backup important content first."
      },
      {
        q: "How do I share workspace content with users?",
        a: "Publish workspace app. Users see reports/dashboards without needing workspace access. Alternative: grant users workspace Viewer role."
      }
    ],
    examTips: [
      "Know workspace is container for team collaboration",
      "Understand difference between Premium and Shared capacity",
      "Know four roles: Admin, Member, Contributor, Viewer",
      "Remember workspace app for sharing content with users",
      "Recognize Premium capacity enables advanced features"
    ],
    resources: [
      {
        title: "Create and manage workspaces",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-new-workspaces",
        type: "Documentation"
      },
      {
        title: "Workspace roles and permissions",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-roles-spo-compare",
        type: "Documentation"
      }
    ]
  },

  "Assign workspace roles": {
    overview: {
      title: "Role-Based Access Control in Workspaces",
      concepts: [
        "Four workspace roles control what users can do: Admin, Member, Contributor, Viewer",
        "Admin: Full control over workspace settings and content",
        "Member: Create and edit reports, share content",
        "Contributor: Edit and organize content (limited creation)",
        "Viewer: View and consume reports only (read-only)",
        "Granular permissions available for reports, dashboards, and datasets"
      ]
    },
    bestPractices: [
      "Follow principle of least privilege: assign minimum permissions needed",
      "Use Azure AD security groups for bulk role assignment",
      "Assign Admin role sparingly to responsible individuals only",
      "Use Member for core team, Contributor for external partners",
      "Regular audit of who has access and their current role",
      "Document role assignments and update when team changes",
      "Separate read-only access (Viewer) for stakeholders"
    ],
    commonMistakes: [
      "Assigning Admin to too many users (security risk)",
      "Not using security groups (hard to manage individually)",
      "Keeping users with roles they no longer need",
      "Not considering app permissions (app has separate permissions from workspace)",
      "Forgetting that Admin in one workspace can't edit another",
      "Not understanding limitations of each role"
    ],
    keySteps: [
      "Workspace > Access or Workspace settings",
      "Search for user or security group to add",
      "Assign role: Admin, Member, Contributor, or Viewer",
      "Save changes (apply immediately)",
      "For fine-grained control: select specific report/dashboard > Share",
      "Review and audit roles periodically",
      "Remove users when role no longer needed"
    ],
    keyDecisions: [
      "**Individual or group assignment?** - Group: easier management; Individual: precise control",
      "**Admin or Member for creators?** - Both create/edit equally; Admin for workspace settings",
      "**Contributor or Member?** - Member more powerful; Contributor for limited editing",
      "**App vs workspace access?** - App for end users; Workspace for creators",
      "**Dashboard-specific permissions?** - Yes available via Share button"
    ],
    keyDefinitions: [
      "**Admin Role**: Create, edit, delete all content; manage workspace settings; assign members; publish apps",
      "**Member Role**: Create, edit, publish reports/dashboards; organize content; manage datasets; share content",
      "**Contributor Role**: Edit and organize existing content; cannot create new items from scratch",
      "**Viewer Role**: View and consume reports/dashboards only; cannot edit or create (read-only)",
      "**Security Group**: Azure AD group for managing role assignments in bulk",
      "**Granular Permissions**: Report or dashboard-specific permissions beyond workspace role"
    ],
    risks: [
      "**Over-permissioning**: Admin role to non-admins enables accidental deletion",
      "**Access creep**: Users keep roles long after project ends",
      "**Security gaps**: Viewer role doesn't prevent access via Power BI API",
      "**Group complexity**: Nested security groups can cause permission confusion",
      "**Audit trail**: Limited logging of who changed what",
      "**Ownership risk**: Sole admin without backup causes dependency"
    ],
    faqs: [
      {
        q: "What's the difference between Member and Contributor?",
        a: "Member can create new reports/dashboards from scratch; Contributor can only edit existing ones. Both can organize and update."
      },
      {
        q: "Can viewers see data behind visuals?",
        a: "No - viewers see published reports/dashboards only. RLS (row-level security) further restricts data they see."
      },
      {
        q: "How do I give someone access to just one report?",
        a: "Use Share button on the specific report. They get access without needing workspace role."
      },
      {
        q: "Can I assign different roles in workspace app vs workspace?",
        a: "Yes - app has separate permissions. Workspace role doesn't grant app access automatically."
      },
      {
        q: "What if I accidentally remove an Admin?",
        a: "Another Admin can re-add them. Ensure at least 2 Admins for each workspace to prevent lockout."
      }
    ],
    examTips: [
      "Know four roles and what each can do",
      "Remember Admin manages workspace, Member creates, Contributor edits, Viewer reads",
      "Understand use of security groups for management",
      "Know principle of least privilege",
      "Recognize report-specific sharing separate from workspace role"
    ],
    resources: [
      {
        title: "Give access to your semantic model",
        url: "https://learn.microsoft.com/power-bi/connect-data/service-datasets-share",
        type: "Documentation"
      },
      {
        title: "Share Power BI dashboards and reports",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-share-dashboards",
        type: "Documentation"
      }
    ]
  },

  "Configure and refresh a semantic model": {
    overview: {
      title: "Dataset Refresh Configuration and Management",
      concepts: [
        "Semantic model (formerly dataset) contains data, relationships, and measures",
        "Scheduled refresh loads data from source into Power BI service on fixed schedule",
        "Refresh types: Full, Incremental (Premium only), Real-time (DirectQuery/Live Connection)",
        "Gateway required for on-premises data sources",
        "Refresh failures notify owners via email",
        "Dataflow sources can reduce refresh frequency if using intermediate staging"
      ]
    },
    bestPractices: [
      "Schedule refresh during off-peak hours to avoid performance impact",
      "Limit refresh frequency to business needs (not always hourly)",
      "Use incremental refresh for large datasets (Premium capacity)",
      "Monitor refresh success rate and investigate failures",
      "Set up email notifications for refresh failures",
      "Document refresh dependencies between datasets",
      "Use gateway if accessing on-premises data",
      "Test refresh with full data volume before production"
    ],
    commonMistakes: [
      "Scheduling refresh during peak usage hours",
      "Refreshing more frequently than data changes (wastes resources)",
      "Not configuring credentials, causing silent refresh failures",
      "Ignoring refresh errors until reports show stale data",
      "Not setting up failure notifications",
      "Using wrong capacity tier for refresh requirements",
      "Overlapping refresh schedules for dependent datasets"
    ],
    keySteps: [
      "Power BI Service > Dataset > Settings (gear icon)",
      "Scheduled refresh section > On",
      "Configure frequency: Daily, Weekly, or Monthly",
      "Set time(s) for refresh (recommend off-peak hours)",
      "Set timezone (important for global teams)",
      "Configure failure notifications (send me an email)",
      "Save and monitor first refresh"
    ],
    keyDecisions: [
      "**Refresh frequency?** - Business needs: daily usually sufficient; Real-time: DirectQuery required",
      "**Full or incremental refresh?** - Premium capacity: incremental for large datasets; Shared: full only",
      "**Timezone?** - Match business timezone; important for scheduled times",
      "**Failure notification?** - Yes: stay informed of issues; No: check manually",
      "**Gateway needed?** - On-premises data: yes; Cloud sources: direct connectivity"
    ],
    keyDefinitions: [
      "**Semantic Model**: Data structure with tables, relationships, measures, and calculations",
      "**Scheduled Refresh**: Automatic data loading on fixed schedule",
      "**Full Refresh**: Loads all data from source (slower but safer)",
      "**Incremental Refresh**: Loads only changed data (faster, Premium only)",
      "**Refresh Failure**: When refresh doesn't complete successfully",
      "**Gateway**: Component enabling access to on-premises data sources"
    ],
    risks: [
      "**Refresh overload**: Too many datasets refreshing simultaneously overwhelm capacity",
      "**Stale data**: Infrequent refresh leaves reports showing outdated information",
      "**Credential expiration**: Passwords changing causes refresh failures",
      "**Source unavailability**: Source database down during refresh window fails",
      "**Timeout issues**: Large datasets exceed timeout limits",
      "**Silent failures**: Failures not detected until users complain about stale data"
    ],
    faqs: [
      {
        q: "How often should I refresh my dataset?",
        a: "Depends on business needs. Daily sufficient for most. Hourly if near real-time needed. DirectQuery for true real-time."
      },
      {
        q: "Why is my refresh taking so long?",
        a: "Large dataset, slow source, complex transformations, or capacity constraints. Consider incremental refresh or optimizing queries."
      },
      {
        q: "What time should I schedule refresh?",
        a: "Off-peak hours: nights/weekends. Avoid 7-10am and 12-2pm (peak usage). Coordinate with other dataset refreshes."
      },
      {
        q: "How do I know if refresh failed?",
        a: "Check Power BI Service > Dataset > Refresh history. Or enable email notifications for immediate alert."
      },
      {
        q: "Can I refresh on-premises data?",
        a: "Yes - install and configure On-premises Data Gateway. Gateway computer must be running 24/7 for scheduled refresh."
      }
    ],
    examTips: [
      "Know refresh loads data from source into Power BI service",
      "Remember full refresh loads all data, incremental loads changes only",
      "Understand scheduling refresh during off-peak hours",
      "Know gateway required for on-premises sources",
      "Recognize failure notifications help catch issues early"
    ],
    resources: [
      {
        title: "Configure scheduled refresh",
        url: "https://learn.microsoft.com/power-bi/connect-data/refresh-scheduled-refresh",
        type: "Documentation"
      },
      {
        title: "Incremental refresh overview",
        url: "https://learn.microsoft.com/power-bi/connect-data/incremental-refresh-overview",
        type: "Documentation"
      }
    ]
  },

  "Create and manage a Power BI deployment pipeline": {
    overview: {
      title: "Application Lifecycle Management (ALM) with Deployment Pipelines",
      concepts: [
        "Deployment pipelines enable moving content through Dev > Test > Production stages",
        "Separate workspaces for each stage with controlled promotion",
        "Rules can update parameters and dataset connections between stages",
        "Automate or control content promotion manually",
        "Premium capacity required",
        "Git integration available for enhanced version control"
      ]
    },
    bestPractices: [
      "Use three stages: Dev (development), Test (testing), Production (live)",
      "Deploy only tested and validated content to Production",
      "Use deployment rules to update parameters between stages",
      "Automate or require approvals based on deployment policies",
      "Test thoroughly in Test stage before Production",
      "Keep development work in Dev workspace only",
      "Monitor deployment success and rollback if needed",
      "Document deployment process and responsibilities"
    ],
    commonMistakes: [
      "Deploying directly to Production without testing",
      "Not configuring deployment rules (parameters don't update)",
      "Forgetting to update credentials/connections between stages",
      "Not using separate workspaces for each stage",
      "Allowing developers direct access to Production workspace",
      "Not testing deployment rules thoroughly",
      "Skipping approval step for Production deployments"
    ],
    keySteps: [
      "Create three workspaces: DevWorkspace, TestWorkspace, ProductionWorkspace",
      "Premium capacity > Deployment settings > Enable pipelines",
      "Create pipeline: link Dev > Test > Production workspaces",
      "Set up deployment rules for parameters and connections",
      "Developers work in Dev workspace",
      "Deploy (copy) content to Test when ready",
      "Review and test in Test workspace",
      "Deploy to Production when approved"
    ],
    keyDecisions: [
      "**Three stages or two?** - Three (Dev/Test/Prod) best practice; Two acceptable for small teams",
      "**Automated or manual deployment?** - Automated: faster; Manual: more control",
      "**Deployment rules needed?** - Different parameters/connections per stage: yes; Same config: no",
      "**Require approval?** - Production deployments: yes; Other stages: optional",
      "**Git integration?** - Large teams: recommended; Small teams: optional"
    ],
    keyDefinitions: [
      "**Deployment Pipeline**: ALM framework for promoting content through stages",
      "**Dev Stage**: Development workspace where creators build content",
      "**Test Stage**: Testing workspace for validation before production",
      "**Production Stage**: Live workspace serving end users",
      "**Deployment Rule**: Automatic parameter/connection updates between stages",
      "**Premium Capacity**: Required for deployment pipeline feature"
    ],
    risks: [
      "**No rollback**: Can't easily revert bad deployments",
      "**Lost changes**: Deploying overwrites existing content without backup",
      "**Configuration mismatch**: Wrong parameters deployed to stage",
      "**Access control**: Misconfigured workspace roles allow unauthorized deployments",
      "**Testing gaps**: Incomplete testing in Test stage reaches Production",
      "**Dependency issues**: Dependent content not deployed together fails"
    ],
    faqs: [
      {
        q: "Do I need Premium capacity for deployment pipelines?",
        a: "Yes - Premium capacity required. Deployment pipelines not available on Shared capacity."
      },
      {
        q: "Can I deploy individual reports or only entire workspaces?",
        a: "Deploy by content type (all reports together, all dashboards together, etc.). Not selective at report level."
      },
      {
        q: "What happens to data in Test when I deploy from Dev?",
        a: "Dataset is overwritten (Dev data replaces Test data). Configure deployment rules to keep Test connection."
      },
      {
        q: "How do I roll back a bad deployment?",
        a: "No automatic rollback. Redeploy previous version from Test, or manually restore from backup."
      },
      {
        q: "Can users see deployment history?",
        a: "Yes - pipeline shows deployment history with timestamps and who deployed."
      }
    ],
    examTips: [
      "Know deployment pipeline enables Dev > Test > Prod progression",
      "Remember Premium capacity required",
      "Understand deployment rules update parameters between stages",
      "Know separate workspaces for each stage",
      "Recognize testing in Test stage before Production critical"
    ],
    resources: [
      {
        title: "Deployment pipelines overview",
        url: "https://learn.microsoft.com/power-bi/create-reports/deployment-pipelines-overview",
        type: "Documentation"
      },
      {
        title: "Get started with deployment pipelines",
        url: "https://learn.microsoft.com/power-bi/create-reports/deployment-pipelines-get-started",
        type: "Documentation"
      }
    ]
  },

  "Implement row-level security": {
    overview: {
      title: "Controlling Data Access with Row-Level Security",
      concepts: [
        "Row-level security (RLS) restricts data visible to users based on their identity",
        "RLS rules defined in DAX using CALCULATE and USERNAME/USERPRINCIPALNAME functions",
        "Roles created in Power BI model with filters applied",
        "Test roles before publishing to ensure they work correctly",
        "RLS applies automatically to reports and dashboards"
      ]
    },
    bestPractices: [
      "Create user/region/team mapping tables for flexible RLS rules",
      "Test RLS with actual user accounts before production",
      "Use simple, maintainable RLS logic (avoid complex nested formulas)",
      "Document RLS rules and which roles restrict what data",
      "Review RLS rules regularly as organization changes",
      "Use USERPRINCIPALNAME for AD-based assignments",
      "Avoid hardcoding usernames in RLS (use mapping tables instead)"
    ],
    commonMistakes: [
      "Not testing RLS thoroughly (appears to work in Desktop but fails in Service)",
      "Hardcoding usernames (breaks when users change)",
      "Creating overly complex RLS logic (hard to maintain)",
      "Forgetting to assign users to roles in Service",
      "RLS applying to some visuals but not all (check relationships)",
      "Performance issues from inefficient RLS filtering"
    ],
    keySteps: [
      "Model tab > Manage roles > Create role > Name it (e.g., 'Regional Manager')",
      "Add DAX filter: [Region] = USERNAME() or use mapping table",
      "Test role in Desktop: Modeling > Manage roles > View as role",
      "Test with multiple users before publishing",
      "Publish to Power BI Service",
      "Service > Workspace > Semantic model > Security > Assign users to roles",
      "Verify users see only appropriate data"
    ],
    keyDecisions: [
      "**Username or mapping table?** - AD-based: USERNAME(); Custom: mapping table",
      "**Filter at fact or dimension table?** - At smallest grain for accuracy",
      "**One role or multiple?** - Multiple roles per user possible; use smallest needed",
      "**Test in Desktop before Service?** - Always; Service has different evaluation",
      "**Dynamic based on AD groups?** - If using Azure, can leverage AD membership"
    ],
    keyDefinitions: [
      "**Row-Level Security (RLS)**: Restricts data rows visible to users based on identity",
      "**RLS Role**: Named role with DAX filter rules applied",
      "**USERNAME()**: DAX function returning current user's login",
      "**USERPRINCIPALNAME()**: Returns UPN format (user@domain.com)",
      "**Mapping Table**: Table linking users to regions/teams for RLS filtering",
      "**Test Role**: Previewing how data appears with RLS applied"
    ],
    risks: [
      "**RLS bypass**: Users accessing data via APIs or Power BI Embedded may bypass RLS",
      "**Performance impact**: Complex RLS rules slow query performance",
      "**Test gaps**: RLS works in Desktop but fails in Service (different evaluation context)",
      "**Maintenance burden**: Hardcoded usernames must be updated as staff changes",
      "**Security gaps**: Incomplete RLS allows data leakage to wrong users",
      "**Audit issues**: No logging of RLS enforcement or who viewed what"
    ],
    faqs: [
      {
        q: "How do I test RLS in Power BI Desktop?",
        a: "Modeling tab > Manage roles > View as role. Choose role and user to simulate. Reports show filtered data."
      },
      {
        q: "Why does RLS work in Desktop but not in Service?",
        a: "Service and Desktop evaluate RLS differently. Test with actual Service users. Check role assignments in Service."
      },
      {
        q: "Can I assign a user to multiple roles?",
        a: "No - user gets data from union of all assigned roles. Design roles carefully to avoid conflicts."
      },
      {
        q: "How do I update RLS without republishing?",
        a: "Mapping table approach: update table data. DAX role: must republish model with new rules."
      },
      {
        q: "Does RLS apply to exported data?",
        a: "Yes - users export only data visible to them per RLS rules."
      }
    ],
    examTips: [
      "Know RLS restricts rows visible to users",
      "Remember to test in Desktop View as role",
      "Understand USERNAME() and mapping tables",
      "Know RLS assignment in Service Security tab",
      "Recognize RLS applies to all visuals in reports"
    ],
    resources: [
      {
        title: "Row-level security (RLS) with Power BI",
        url: "https://learn.microsoft.com/power-bi/admin/service-admin-rls",
        type: "Documentation"
      },
      {
        title: "Restrict data access with row-level security",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-rls",
        type: "Documentation"
      }
    ]
  },

  "Apply sensitivity labels": {
    overview: {
      title: "Data Protection with Sensitivity Labels",
      concepts: [
        "Sensitivity labels classify content by data sensitivity (Public, Internal, Confidential, Highly Confidential)",
        "Labels inherited from data sources (SQL Server, Azure Information Protection)",
        "Downstream inheritance applies parent labels to derived content",
        "Export controls prevent downloading of sensitive content",
        "Integrated with Microsoft Information Protection (MIP)"
      ]
    },
    bestPractices: [
      "Establish consistent labeling policy across organization",
      "Apply labels to semantic models and reports based on data sensitivity",
      "Enable downstream inheritance to propagate labels automatically",
      "Use export restrictions to prevent sensitive data downloads",
      "Train users on label meanings and proper application",
      "Regularly audit labels and compliance",
      "Document labeling policy and exceptions"
    ],
    commonMistakes: [
      "Inconsistent labeling making labels meaningless",
      "Forgetting to label all sensitive reports and models",
      "Applying labels without configuring restrictions",
      "Not enabling downstream inheritance (manual labeling burden)",
      "Too many label levels confusing users",
      "Not communicating label meanings to users"
    ],
    keySteps: [
      "Admin Portal > Information Protection > Sensitivity labels",
      "Create labels: Public, Internal, Confidential, Highly Confidential",
      "Configure restrictions: Export, Print, Allow user-defined permissions",
      "Enable downstream inheritance in settings",
      "Apply labels: Report > File > Info > Sensitivity",
      "Verify inheritance: Derived reports automatically labeled",
      "Monitor compliance via audit logs"
    ],
    keyDecisions: [
      "**How many labels?** - Start with 3-4; too many confuses users",
      "**Export restrictions?** - Confidential+: restrict; Public/Internal: allow",
      "**Downstream inheritance?** - Enable: automatic protection; Disable: manual labeling",
      "**What to label?** - Sensitive data models and derived reports",
      "**Exceptions allowed?** - Yes but document and audit carefully"
    ],
    keyDefinitions: [
      "**Sensitivity Label**: Classification of content by data sensitivity level",
      "**Downstream Inheritance**: Child content inherits parent's label automatically",
      "**Export Control**: Restriction preventing labeled content from being downloaded",
      "**Microsoft Information Protection (MIP)**: Microsoft's data classification and protection framework",
      "**Public Label**: No restrictions, content can be freely shared",
      "**Confidential Label**: Restricted access, export prevention, audit logging"
    ],
    risks: [
      "**Over-restriction**: Too strict labels reduce usability",
      "**Under-restriction**: Too lenient labels don't protect sensitive data",
      "**Bypass methods**: Users share via alternative methods (screenshots, email)",
      "**Maintenance burden**: Updating labels requires governance process",
      "**Compliance gaps**: Incomplete labeling leaves data unprotected",
      "**User confusion**: Unclear label purposes leads to inconsistent application"
    ],
    faqs: [
      {
        q: "What do sensitivity labels actually do in Power BI?",
        a: "Labels classify content. Restrictions can prevent export/print. Primarily for organization and compliance tracking."
      },
      {
        q: "Do labels prevent users from seeing reports?",
        a: "No - labels don't block access. Use RLS for access control. Labels are for data classification and compliance."
      },
      {
        q: "How do I enforce sensitivity labels organization-wide?",
        a: "Set in Admin Portal, communicate policy, train users, monitor compliance via audit logs."
      },
      {
        q: "Can users remove sensitivity labels?",
        a: "Depends on configuration. Admin can allow/prevent label changes. Audit logs track modifications."
      },
      {
        q: "What happens with downstream inheritance?",
        a: "New reports based on sensitive data automatically inherit parent label. Reduces manual labeling."
      }
    ],
    examTips: [
      "Know sensitivity labels classify data sensitivity",
      "Remember downstream inheritance propagates labels",
      "Understand export controls restrict downloads",
      "Know labels integrated with Microsoft Information Protection",
      "Recognize labels mainly for classification, use RLS for access control"
    ],
    resources: [
      {
        title: "Sensitivity labels in Power BI",
        url: "https://learn.microsoft.com/power-bi/admin/service-security-sensitivity-label-overview",
        type: "Documentation"
      },
      {
        title: "Enable sensitivity labels in Power BI",
        url: "https://learn.microsoft.com/power-bi/admin/service-security-enable-sensitivity-labels",
        type: "Documentation"
      }
    ]
  }
};
