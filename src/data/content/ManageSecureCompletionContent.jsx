// Content for remaining manage and secure Power BI topics
export const manageSecureCompletionContent = {
  "Configure and update a workspace app": {
    overview: {
      title: "Distributing Content Through Workspace Apps",
      concepts: [
        "Workspace apps package reports and dashboards for distribution",
        "Apps simplify access - users navigate curated content not full workspace",
        "App update process: modify in workspace, publish new version",
        "Apps can have custom branding and navigation",
        "Audience can include organizational groups or everyone"
      ]
    },
    bestPractices: [
      "Organize reports logically within app for user navigation",
      "Create custom app landing page introducing content",
      "Update app regularly as content changes",
      "Use app for public-facing content; workspace for development",
      "Document app purpose and update frequency",
      "Test app installation as users would experience"
    ],
    commonMistakes: [
      "Too many reports in app confusing users",
      "Not updating app when workspace content changes",
      "No clear navigation or organization within app",
      "Publishing incomplete content to app",
      "Not communicating app updates to users",
      "App without clear purpose or audience"
    ],
    keySteps: [
      "In workspace, go to 'Create app' button",
      "Configure app details: name, description, icon, color",
      "Set app landing page (navigation, overview, etc.)",
      "Select reports and dashboards to include",
      "Organize content with sections and custom navigation",
      "Set audience: specific groups or everyone",
      "Publish app",
      "To update: return to workspace, modify content, republish app"
    ],
    keyDecisions: [
      "**Custom landing page?** - Large app: yes, helps navigation; Small: optional",
      "**Who can access?** - Public: everyone; Internal: specific groups; Restricted: admins only"
    ],
    keyDefinitions: [
      "**App**: Published collection of reports and dashboards from workspace",
      "**Landing Page**: First page users see when opening app",
      "**App Update**: Publishing new version with changed content",
      "**App Audience**: Users who can access and install the app"
    ],
    risks: [
      "**Outdated app**: Users see stale content if app not updated",
      "**Confusion**: Poor navigation in app reduces usability",
      "**Access control**: App sharing with wrong audience",
      "**Performance**: Too many items in app slow loading",
      "**Maintenance burden**: Complex apps require significant upkeep",
      "**User adoption**: If not clearly communicated, users may not find app"
    ],
    faqs: [
      {
        q: "How often should I update my app?",
        a: "Update whenever significant changes made to included reports. Communicate updates to users."
      },
      {
        q: "Can I control which workspace members see the app?",
        a: "Yes - set audience during app creation. Can be specific groups or everyone."
      }
    ],
    examTips: [
      "Know app is curated collection from workspace for distribution",
      "Understand app simplifies access vs exposing full workspace",
      "Remember app must be republished when workspace content changes"
    ],
    resources: [
      {
        title: "Create and publish apps in Power BI",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-create-distribute-apps",
        type: "Documentation"
      }
    ]
  },

  "Publish, import, or update items in a workspace": {
    overview: {
      title: "Managing Content in Workspaces",
      concepts: [
        "Publish: upload new items (reports, datasets) from Desktop to Service",
        "Import: bring content from files or other sources",
        "Update: replace existing items with newer versions",
        "Publish replaces previous version automatically or creates new",
        "Versioning allows rolling back to previous versions if needed"
      ]
    },
    bestPractices: [
      "Publish to development workspace first, test, then promote",
      "Use meaningful names making versions traceable",
      "Document what changed in each publish/update",
      "Test published content in Service before making live",
      "Use deployment pipelines for multi-stage promotion",
      "Keep backups of critical versions"
    ],
    commonMistakes: [
      "Publishing directly to production without testing",
      "Not documenting changes between versions",
      "Confusing which file/version is current",
      "Overwriting production content unintentionally",
      "Not testing after publish/update",
      "Losing previous versions when updating"
    ],
    keySteps: [
      "**Publish from Desktop**: File > Publish > select workspace",
      "**Import file**: Service Home > Import > upload PBIX or other file",
      "**Update dataset**: Service > workspace > dataset > Refresh",
      "**Update report**: Republish from Desktop with same file name",
      "Version history: Service > dataset > Version history > Previous versions",
      "Restore previous: Version history > restore version"
    ],
    keyDecisions: [
      "**Publish directly or via pipeline?** - Development: publish; Production: deployment pipeline",
      "**New or update existing?** - Breaking changes: new; Minor changes: update"
    ],
    keyDefinitions: [
      "**Publish**: Upload content from Desktop to Service workspace",
      "**Import**: Bring content from file or other source into workspace",
      "**Update**: Replace existing item with newer version",
      "**Version History**: Previous published versions available for rollback"
    ],
    risks: [
      "**Accidental overwrites**: Publishing same file name replacing production",
      "**Broken references**: Importing items with external dependencies",
      "**Loss of work**: Overwriting without backup",
      "**Downtime**: Publishing breaking changes to production",
      "**Credential issues**: Imported items may have different credentials",
      "**Data freshness**: Updated datasets not refreshing properly"
    ],
    faqs: [
      {
        q: "What happens when I publish with same file name?",
        a: "Updates existing item in workspace. Previous version saved in version history."
      },
      {
        q: "Can I publish to multiple workspaces?",
        a: "Yes - each publish dialog lets you select target workspace."
      }
    ],
    examTips: [
      "Know Publish uploads from Desktop; Import brings from files/sources",
      "Understand Update replaces existing item",
      "Remember version history enables rollback"
    ],
    resources: [
      {
        title: "Publish datasets and reports",
        url: "https://learn.microsoft.com/power-bi/connect-data/service-datasets-publish",
        type: "Documentation"
      }
    ]
  },

  "Create dashboards": {
    overview: {
      title: "Building Dashboard Views from Report Visuals",
      concepts: [
        "Dashboards: single-page summary view pinned from reports",
        "Pin visuals from reports to build dashboard",
        "Dashboards interactive but don't contain original data",
        "Dashboard tiles link back to source report pages",
        "Dashboards ideal for executive summary and KPI monitoring"
      ]
    },
    bestPractices: [
      "Create focused dashboards for specific audience or purpose",
      "Pin most important visuals for quick scanning",
      "Arrange tiles logically (top: most important)",
      "Include 5-10 key visuals (avoid overwhelming)",
      "Test interactivity and visual clarity",
      "Update dashboard when reports change significantly"
    ],
    commonMistakes: [
      "Too many visuals overwhelming the dashboard",
      "Unrelated visuals making dashboard confusing",
      "Not organizing tiles logically",
      "Dashboard visuals too small to read",
      "Not updating when underlying reports change",
      "Dashboard with no clear purpose"
    ],
    keySteps: [
      "Create new dashboard: Service > Create > Dashboard",
      "Pin visuals: Open report > click pin icon on visual",
      "Select target dashboard, visual appears on dashboard",
      "Arrange tiles: drag to reposition",
      "Resize tiles: drag corner to adjust size",
      "Add text boxes or images to dashboard",
      "Test interactivity and appearance"
    ],
    keyDecisions: [
      "**How many visuals?** - 5-10 optimal; 15+ too crowded",
      "**Refresh frequency?** - Real-time: automated; Static: manual"
    ],
    keyDefinitions: [
      "**Dashboard**: Single-page visual summary with pinned report visuals",
      "**Pin**: Adding report visual to dashboard",
      "**Tile**: Individual visual on dashboard",
      "**Dashboard Interaction**: User filtering/clicking affecting connected visuals"
    ],
    risks: [
      "**Information overload**: Too many visuals reduce usability",
      "**Stale data**: Dashboard not refreshing with underlying data",
      "**Broken links**: Pinned visuals from deleted reports",
      "**Performance**: Too many tiles slow dashboard loading",
      "**Confusion**: Unclear dashboard purpose or audience",
      "**Maintenance**: Orphaned dashboards after reports deleted"
    ],
    faqs: [
      {
        q: "What's the difference between dashboard and report?",
        a: "Dashboard: summary view, single page, tiles pinned from reports. Report: detailed view, multiple pages, drill-through."
      },
      {
        q: "Can dashboards be shared with external users?",
        a: "Yes - but users need Power BI license. Sharing via link or specific users/groups."
      }
    ],
    examTips: [
      "Know dashboards are summary views pinned from reports",
      "Understand dashboards are single-page, interactive",
      "Remember tiles link back to source reports"
    ],
    resources: [
      {
        title: "Create dashboards in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/service-dashboards-create-and-configure",
        type: "Documentation"
      }
    ]
  },

  "Choose a distribution method": {
    overview: {
      title: "Strategies for Sharing Power BI Content",
      concepts: [
        "Distribution methods: apps, sharing links, email, embedded, public web",
        "Apps: best for curated organizational content",
        "Sharing: direct access to reports/dashboards",
        "Email subscriptions: scheduled delivery of snapshots",
        "Embedding: Power BI content in apps or portals",
        "Public web: making content accessible to anyone"
      ]
    },
    bestPractices: [
      "Match distribution method to audience type and use case",
      "Use apps for organizational content, sharing for individuals",
      "Document distribution method for maintenance",
      "Test each method before large rollout",
      "Consider user skill level in choosing method",
      "Monitor adoption and adjust if needed"
    ],
    commonMistakes: [
      "Wrong method for audience (e.g., sharing vs app)",
      "Not considering security implications of distribution",
      "Over-complicated setup deterring users",
      "No guidance for users on accessing content",
      "Distributing to wrong audience",
      "Not updating distribution when content changes"
    ],
    keySteps: [
      "Define audience: internal, external, mixed",
      "Assess requirements: interactive vs snapshot, curated vs ad-hoc",
      "Choose method: App (curated), Share (direct), Email (delivery), Embed (integration)",
      "Configure security: who can access, licensing requirements",
      "Test with sample users",
      "Document process and train users",
      "Monitor usage and adoption"
    ],
    keyDecisions: [
      "**App, share, email, or embed?** - Curated/public: app; Individual: share; Scheduled: email; Integrated: embed",
      "**Internal or external users?** - Internal: app/share; External: embed/public web; Both: consider multiple methods"
    ],
    keyDefinitions: [
      "**App**: Curated collection published from workspace",
      "**Share**: Direct access grant to reports/dashboards",
      "**Email Subscription**: Scheduled delivery of visual snapshots",
      "**Embedding**: Power BI content embedded in external application",
      "**Public Web**: Published reports accessible to anyone via link"
    ],
    risks: [
      "**Wrong audience**: Content reaching unintended users",
      "**Security exposure**: Over-sharing sensitive data",
      "**User confusion**: Multiple distribution methods causing access issues",
      "**Licensing**: Users without proper licenses accessing content",
      "**Maintenance**: Multiple distribution channels hard to manage",
      "**Stale content**: Distribution not updated when content changes"
    ],
    faqs: [
      {
        q: "Which distribution method is most secure?",
        a: "Apps with workspace roles - control who can access exactly. Sharing is more flexible but less centralized."
      },
      {
        q: "Can external users access Power BI content?",
        a: "Yes - with proper licensing (Power BI license, Azure B2B, or embedded)."
      }
    ],
    examTips: [
      "Know app is best for curated organizational content",
      "Understand sharing for direct individual access",
      "Remember email subscriptions for scheduled delivery",
      "Recognize embedding for integration scenarios"
    ],
    resources: [
      {
        title: "Share Power BI work",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-share-dashboards",
        type: "Documentation"
      }
    ]
  },

  "Configure subscriptions and data alerts": {
    overview: {
      title: "Automated Notifications and Delivery",
      concepts: [
        "Subscriptions: scheduled email delivery of report/dashboard snapshots",
        "Data alerts: triggered notifications when metric exceeds threshold",
        "Subscriptions pull data at schedule interval",
        "Alerts push notification when condition met",
        "Both require appropriate Power BI licenses"
      ]
    },
    bestPractices: [
      "Use subscriptions for regular scheduled reports to stakeholders",
      "Set alerts for critical KPIs needing immediate attention",
      "Document subscription purpose and frequency",
      "Test subscriptions/alerts before large rollout",
      "Review recipient lists regularly to avoid sending to wrong people",
      "Monitor alert volume - too many reduces effectiveness"
    ],
    commonMistakes: [
      "Over-scheduling subscriptions creating inbox fatigue",
      "Alert thresholds too sensitive (false positives)",
      "Alert thresholds too loose (missing real issues)",
      "Not documenting why alert exists",
      "Sending subscriptions to wrong recipients",
      "Forgetting to remove subscriptions after content deleted"
    ],
    keySteps: [
      "**Create subscription**: Dashboard/Report > Share > Subscribe",
      "Set frequency: daily, weekly, monthly",
      "Add recipient emails",
      "**Create alert**: Card visual > click three dots > Set data alert",
      "Configure trigger: value exceeds/drops below threshold",
      "Set notification frequency: upon trigger or per day",
      "Test subscription/alert before finalizing"
    ],
    keyDecisions: [
      "**Subscription frequency?** - Weekly typical; Daily for operational; Monthly for executive",
      "**Alert threshold?** - Realistic business trigger; not false positive prone; not too loose"
    ],
    keyDefinitions: [
      "**Subscription**: Scheduled email delivery of report/dashboard snapshot",
      "**Data Alert**: Notification triggered when metric exceeds threshold",
      "**Alert Threshold**: Value at which alert triggers",
      "**Notification**: Email or in-app alert informing user"
    ],
    risks: [
      "**Alert fatigue**: Too many alerts, users ignore them",
      "**False positives**: Alerts triggering on expected fluctuations",
      "**Missed alerts**: Thresholds too loose, missing real issues",
      "**Email spam**: Over-subscription creates inbox fatigue",
      "**License requirements**: Users without proper licenses can't create",
      "**Stale alerts**: Not removed when underlying data changes"
    ],
    faqs: [
      {
        q: "How often can I set subscriptions?",
        a: "Up to 24 per year per report. For more frequent, consider Power Automate."
      },
      {
        q: "Can I alert on multiple metrics?",
        a: "Data alerts work on individual card visuals. For multiple, set separate alerts."
      }
    ],
    examTips: [
      "Know subscriptions deliver scheduled report snapshots",
      "Understand data alerts trigger when threshold exceeded",
      "Remember both require appropriate Power BI licenses"
    ],
    resources: [
      {
        title: "Subscribe to reports and dashboards",
        url: "https://learn.microsoft.com/power-bi/consumer/end-user-subscribe",
        type: "Documentation"
      }
    ]
  },

  "Promote or certify Power BI content": {
    overview: {
      title: "Content Governance Through Endorsement",
      concepts: [
        "Promotion: marks content as reliable and ready for use",
        "Certification: formal approval by admin (highest trust)",
        "Endorsed content appears with badge in Power BI service",
        "Helps users find trusted, quality content",
        "Governance mechanism for organizational standards"
      ]
    },
    bestPractices: [
      "Establish clear criteria for promotion/certification",
      "Promote trusted content from reliable sources",
      "Only admins should certify (governance)",
      "Document why content is promoted/certified",
      "Regularly review endorsed content for continued appropriateness",
      "Remove endorsement if content quality decreases"
    ],
    commonMistakes: [
      "Promoting mediocre content reducing credibility",
      "No clear standards for endorsement",
      "Not documenting endorsement decisions",
      "Excessive promotions (everything endorsed = nothing special)",
      "Non-admins certifying (should only be promotion)",
      "Not removing endorsement from outdated content"
    ],
    keySteps: [
      "Navigate to dataset or report in Power BI Service",
      "Click three dots > Promote (for workspace members with permissions)",
      "Promotion requires manual approval but no special role",
      "Certification: click three dots > Certify (admin only)",
      "Certify dialog: confirm dataset meets standards",
      "Certified badge appears on content",
      "To remove: click three dots > Remove endorsement"
    ],
    keyDecisions: [
      "**Promote or certify?** - Trusted quality: promote; Formal governance: certify",
      "**Who can do it?** - Promotion: workspace members; Certification: admins only"
    ],
    keyDefinitions: [
      "**Promotion**: Mark content as reliable and ready for use",
      "**Certification**: Formal admin approval of content quality",
      "**Endorsement**: Promotion or certification badge on content",
      "**Trust Level**: Hierarchy of endorsed vs unendorsed content"
    ],
    risks: [
      "**Credibility loss**: Endorsing poor quality content",
      "**Over-endorsement**: Too much endorsed content reduces usefulness",
      "**User confusion**: Inconsistent endorsement criteria",
      "**Governance**: Non-admins certifying (should be promotion)",
      "**Stale endorsements**: Not removing old/outdated content",
      "**Security**: Endorsed content getting additional access"
    ],
    faqs: [
      {
        q: "Who can promote vs certify?",
        a: "Promote: workspace members. Certify: workspace/tenant admins only."
      },
      {
        q: "How often should I audit endorsed content?",
        a: "Quarterly minimum, or whenever organizational changes occur."
      }
    ],
    examTips: [
      "Know Promote is quality indicator, Certify is admin approval",
      "Understand certification requires admin role",
      "Remember endorsement helps users find trusted content"
    ],
    resources: [
      {
        title: "Promote or certify datasets",
        url: "https://learn.microsoft.com/power-bi/collaborate-share/service-endorsement-promote-certify",
        type: "Documentation"
      }
    ]
  },

  "Identify when a gateway is required": {
    overview: {
      title: "On-Premises Data Connectivity",
      concepts: [
        "Gateway bridges Power BI Service and on-premises data sources",
        "Required when source is not accessible from cloud",
        "Personal gateway: single user, single machine",
        "Enterprise gateway: multi-user, high availability",
        "Handles authentication and encryption"
      ]
    },
    bestPractices: [
      "Use enterprise gateway for production (not personal)",
      "Keep gateway server near data source for performance",
      "Use service account for gateway (not personal account)",
      "Monitor gateway health and performance",
      "Implement redundancy/clustering for availability",
      "Document gateway configuration and dependencies"
    ],
    commonMistakes: [
      "Using personal gateway in production",
      "Gateway server too far from data source",
      "Using personal credentials for gateway",
      "Not monitoring gateway status",
      "Single gateway with no redundancy",
      "Not updating gateway when new data sources added"
    ],
    keySteps: [
      "Assess: is data source accessible from Power BI cloud? If no, gateway needed.",
      "Install gateway: Download from Power BI > Install local",
      "Configure: gateway name, region, authentication account",
      "For DirectQuery: gateway required to forward queries",
      "For Import: gateway needed for refresh",
      "Test connection from Power BI to gateway",
      "Monitor gateway status in Power BI Service"
    ],
    keyDecisions: [
      "**Personal or enterprise gateway?** - Single user/dev: personal; Production: enterprise",
      "**Which gateway version?** - Always latest for security/stability"
    ],
    keyDefinitions: [
      "**Gateway**: Bridge software enabling Power BI to connect on-premises data",
      "**Personal Gateway**: Single-user gateway on individual machine",
      "**Enterprise Gateway**: Shared gateway supporting multiple users",
      "**Cluster**: Multiple gateways for redundancy and load balancing"
    ],
    risks: [
      "**No connectivity**: Missing gateway breaks on-premises access",
      "**Gateway down**: Single gateway failure stops all refresh/queries",
      "**Performance**: Slow gateway impacts report performance",
      "**Security**: Gateway with weak credentials exposes data",
      "**Maintenance**: Unmonitored gateway may fail silently",
      "**Version mismatch**: Old gateway incompatible with service"
    ],
    faqs: [
      {
        q: "Do I need a gateway for cloud data (Azure, Office 365)?",
        a: "No - cloud data accessible directly from Power BI. Gateway only for on-premises."
      },
      {
        q: "Can I run personal and enterprise gateway together?",
        a: "Not recommended. Use enterprise gateway for all production access."
      }
    ],
    examTips: [
      "Know gateway required for on-premises data sources",
      "Understand personal vs enterprise gateway use cases",
      "Remember gateway handles authentication and encryption"
    ],
    resources: [
      {
        title: "On-premises data gateway",
        url: "https://learn.microsoft.com/data-integration/gateway/service-gateway-onprem",
        type: "Documentation"
      }
    ]
  }
};
