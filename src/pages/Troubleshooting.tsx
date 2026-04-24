import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { AlertTriangle, Zap, ChevronDown, ChevronRight, ExternalLink, Check } from "lucide-react";
import SyllabusSyncButton from "@/components/SyllabusSyncButton";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const issues = [
  {
    id: "slow-report",
    title: "Reports are running slowly",
    domain: "visualize_analyze",
    section: "Report performance optimization",
    severity: "high",
    description: "Users complain about slow report load times and interactions feel sluggish.",
    solutions: [
      "Check if visuals are querying too much data—use filters to reduce the dataset",
      "Optimize your data model: remove unnecessary columns, use fact tables appropriately",
      "Consider using DirectQuery with aggregations instead of Import mode for large datasets",
      "Disable visual interactions between visuals that aren't needed",
      "Use bookmarks instead of dynamic filters when possible to reduce query load",
    ],
    linkedTopics: ["Performance optimization", "Aggregations in Power BI", "DirectQuery mode", "Star schema design"],
  },
  {
    id: "refresh-failures",
    title: "Data refresh failures",
    domain: "deploy_maintain",
    section: "Refresh scheduling",
    severity: "high",
    description: "Scheduled refreshes fail intermittently or completely, breaking SLA expectations.",
    solutions: [
      "Verify gateway connectivity and credentials in Power BI Service",
      "Check data source availability and timeout settings",
      "Review Power Query steps for slow transformations—optimize or move to source database",
      "Increase refresh timeout limits if dealing with large datasets",
      "Monitor gateway logs for connection errors and authentication issues",
      "Consider breaking large models into multiple smaller refreshes",
    ],
    linkedTopics: ["Gateway setup and configuration", "Refresh scheduling", "Credential management", "Model optimization"],
  },
  {
    id: "rls-not-working",
    title: "Row-level security (RLS) not applying correctly",
    domain: "deploy_maintain",
    section: "Security implementation",
    severity: "high",
    description: "Users see data they shouldn't have access to, or RLS filters break relationships.",
    solutions: [
      "Verify RLS rules use the correct tables and columns (must be on fact tables typically)",
      "Ensure your data model relationships are correct and propagate filters properly",
      "Test RLS in Power BI Desktop with 'View as' before deploying",
      "Check that USERNAME() function references match user identities in your source data",
      "For dynamic RLS, verify the lookup table has the correct user mappings",
      "Avoid using RLS on highly normalized models—denormalize if necessary",
    ],
    linkedTopics: ["Row-level security (RLS)", "Dynamic RLS implementation", "Relationship modeling", "User authentication"],
  },
  {
    id: "blank-values",
    title: "Unexpected blank or null values in reports",
    domain: "model_data",
    section: "Data validation and cleaning",
    severity: "medium",
    description: "Reports show empty cells or missing values that shouldn't exist.",
    solutions: [
      "Profile your data in Power Query to identify nulls at the source",
      "Use 'Replace Values' in Power Query to handle missing data (replace with 0, 'Unknown', etc.)",
      "Check if relationships are weak or inactive—verify cardinality matches your data",
      "In DAX, use COALESCE() or IF(ISBLANK()) to handle nulls in calculations",
      "Verify column data types match—text vs. numbers can cause join failures",
      "Review filters applied—they may be hiding all values for certain combinations",
    ],
    linkedTopics: ["Data quality and profiling", "Power Query transformations", "Relationship cardinality", "DAX null handling"],
  },
  {
    id: "measure-wrong",
    title: "Calculations return unexpected values",
    domain: "model_data",
    section: "Advanced DAX",
    severity: "medium",
    description: "Measures or calculated columns show incorrect totals or percentages.",
    solutions: [
      "Use CALCULATE() with correct filter context—understand row vs. filter context",
      "Verify measure aggregation type: SUM works for additive measures, but not for ratios/averages",
      "For year-to-date (YTD) or similar, use date intelligence functions: TOTALYTD(), etc.",
      "Check if ALL() or REMOVEFILTERS() is needed to ignore user selections",
      "Debug with variables (VAR) to break complex formulas into steps",
      "Use SUMX() or FILTER() instead of SUM() when conditional logic is needed",
    ],
    linkedTopics: ["DAX functions (SUM, CALCULATE, etc.)", "Filter context vs. row context", "Time intelligence functions", "Advanced aggregations"],
  },
  {
    id: "data-source-issues",
    title: "Can't connect to data source",
    domain: "prepare_data",
    section: "Data connectivity",
    severity: "high",
    description: "Power BI can't establish connection to SQL Server, API, or cloud data source.",
    solutions: [
      "Verify firewall rules allow Power BI gateway/service to access the data source",
      "Check credentials—test with your data source's native client first",
      "For cloud sources (Azure SQL, Snowflake), ensure IP whitelisting if required",
      "Use a gateway if accessing on-premises data—configure service account correctly",
      "Test connection string in Power Query with 'Edit Queries'",
      "For APIs, check authentication tokens/keys haven't expired",
    ],
    linkedTopics: ["Data source connectivity", "Gateway configuration", "Authentication methods", "Privacy levels"],
  },
  {
    id: "large-file-slow",
    title: "PBIX file is large and slow to work with",
    domain: "model_data",
    section: "Model optimization",
    severity: "medium",
    description: "Power BI Desktop becomes unresponsive, slow to save, or the PBIX file size is huge.",
    solutions: [
      "Remove unnecessary columns in Power Query—only import what you need",
      "Reduce cardinality: use categories or bins instead of unique identifiers for fact dimensions",
      "Archive old data in a separate dataset—don't keep years of historical data in one model",
      "Use calculated tables sparingly—reference tables can often replace them",
      "Disable 'Load' for intermediate queries used only for transformation",
      "Consider splitting into separate models by department or use dataflows",
    ],
    linkedTopics: ["Data modeling best practices", "Query optimization", "Incremental refresh", "Dataflows"],
  },
  {
    id: "filtering-logic",
    title: "Filters apply incorrectly across visuals",
    domain: "visualize_analyze",
    section: "Interactive features",
    severity: "medium",
    description: "Clicking a slicer breaks other visuals or filter relationships aren't working as expected.",
    solutions: [
      "Verify visual interactions are set correctly—check which visuals filter which",
      "Disable unneeded visual interactions to simplify logic",
      "Ensure relationships between tables are active (not inactive/hidden)",
      "For slicers, check if they're filtering the right table and column",
      "Use bookmarks to create cleaner filtering logic for complex scenarios",
      "Test filter propagation by reviewing what tables are connected",
    ],
    linkedTopics: ["Visual interactions", "Slicer configuration", "Relationship design", "Bookmarks for interactivity"],
  },
  {
    id: "permission-issues",
    title: "Users can't access workspaces or apps",
    domain: "deploy_maintain",
    section: "Access management",
    severity: "high",
    description: "Team members don't have permission to view workspaces, reports, or datasets.",
    solutions: [
      "Verify user roles in the workspace—assign Editor, Contributor, Member, or Viewer as needed",
      "Check if the app is published and users are assigned access to the app",
      "For service principals, ensure they have the correct API permissions in Azure AD",
      "If using Premium capacity, verify licensing assignments",
      "Review workspace access lists and remove inactive accounts",
      "For delegated access, use service principal or managed service identity",
    ],
    linkedTopics: ["Workspace roles and permissions", "Sharing and publishing", "Service principals", "Premium capacity licensing"],
  },
  {
    id: "data-mismatch",
    title: "Data in Power BI doesn't match the source",
    domain: "prepare_data",
    section: "Data transformation",
    severity: "high",
    description: "Numbers in Power BI reports differ from the source system or business expectations.",
    solutions: [
      "Check if filters or WHERE clauses are being applied in Power Query",
      "Verify joins/merges haven't duplicated or lost rows—use group/aggregate to validate",
      "Review date filters—are they inclusive/exclusive of the date range you expect?",
      "Check for data type mismatches that prevent joins (e.g., '123' vs. 123)",
      "Compare row counts at each transformation step in Power Query",
      "For aggregations, ensure you're grouping by the right granularity level",
    ],
    linkedTopics: ["Power Query transformations", "Data validation", "Join/merge operations", "Aggregation logic"],
  },
  {
    id: "query-folding",
    title: "Query folding not working",
    domain: "prepare_data",
    section: "Power Query optimization",
    severity: "medium",
    description: "Transformations aren't being pushed to the source database—Power BI is pulling all data then filtering.",
    solutions: [
      "Check Power Query Diagnostics to see which steps fold—some operations break folding",
      "Avoid custom columns early in the process—move them to the end after all filters",
      "Don't use certain functions that break folding: Text.Combine, List.Contains, etc.",
      "For SQL, use native SQL queries instead of UI-based transforms when possible",
      "Filter at the source before importing—use 'Native Query' for complex WHERE clauses",
      "Keep transformations simple and as close to the source as possible",
    ],
    linkedTopics: ["Query folding", "Power Query performance", "Native queries", "Source-side transformations"],
  },
  {
    id: "ambiguous-relationships",
    title: "Relationships are ambiguous or inactive",
    domain: "model_data",
    section: "Relationship design",
    severity: "medium",
    description: "DAX gives errors about ambiguous relationships, or relationships aren't filtering as expected.",
    solutions: [
      "Review all relationship paths—ambiguity occurs when multiple paths exist between tables",
      "Use USERELATIONSHIP() to explicitly activate a specific inactive relationship in DAX",
      "Deactivate unnecessary relationships if only one path should be active",
      "For many-to-many scenarios, use bridging tables instead of direct relationships",
      "Check relationship directions (one-to-many vs. bidirectional)",
      "Test filter propagation with a simple visual before building complex reports",
    ],
    linkedTopics: ["Relationship cardinality", "Bidirectional relationships", "Many-to-many relationships", "DAX USERELATIONSHIP function"],
  },
  {
    id: "capacity-limits",
    title: "Premium capacity running out of memory",
    domain: "deploy_maintain",
    section: "Capacity management",
    severity: "high",
    description: "Reports are slow or fail to load when published to Premium capacity, but work fine in Desktop.",
    solutions: [
      "Check capacity metrics in Admin Portal—monitor memory and CPU usage over time",
      "Reduce dataset size: remove unnecessary columns and unused tables",
      "Use aggregations to pre-summarize large datasets for faster querying",
      "Split large models into separate datasets by domain or time period",
      "Enable incremental refresh to only load recent data, archive older data separately",
      "Consider upgrading to higher Premium SKU (P2, P3, etc.) if consistently hitting limits",
    ],
    linkedTopics: ["Premium capacity", "Aggregations", "Incremental refresh", "Model optimization"],
  },
  {
    id: "encoding-issues",
    title: "Text shows as garbled or incorrect characters",
    domain: "prepare_data",
    section: "Data quality",
    severity: "medium",
    description: "Unicode characters, special characters, or non-English text appears corrupted in Power BI.",
    solutions: [
      "Check source data encoding—CSV might be ANSI instead of UTF-8",
      "In Power Query, set file encoding when importing: 'File.Contents' with encoding parameter",
      "For CSV imports, explicitly set encoding in the import dialog",
      "Verify the source system exports data in UTF-8 format",
      "Use Data Type Detection carefully—it can misinterpret encoded text",
      "For databases, check collation settings and connection string encoding",
    ],
    linkedTopics: ["Data source connectivity", "Power Query encoding", "CSV import settings", "Text transformations"],
  },
  {
    id: "dax-errors",
    title: "DAX formulas throw errors or unexpected results",
    domain: "model_data",
    section: "Advanced DAX",
    severity: "medium",
    description: "Measures show error values like #ERROR, #DIV/0!, or return unexpected numbers.",
    solutions: [
      "Use IFERROR() or IFNA() to wrap problematic functions and return a default value",
      "Check data types—can't divide text by numbers; ensure proper casting",
      "Use SUMMARIZE or ADDCOLUMNS to debug complex calculations step-by-step",
      "For #DIV/0!, add a condition to check for zero before dividing",
      "Verify table and column names match exactly (DAX is case-insensitive but not space-sensitive)",
      "Check measure dependencies—circular references cause errors",
    ],
    linkedTopics: ["DAX error handling", "CALCULATE function", "Data type conversions", "Measure debugging"],
  },
  {
    id: "bookmarks-not-working",
    title: "Bookmarks don't work or don't save state",
    domain: "visualize_analyze",
    section: "Interactive features",
    severity: "medium",
    description: "Bookmarks don't restore filters, selections, or page state when clicked.",
    solutions: [
      "Verify bookmarks are set to capture the desired state: filters, selections, display mode",
      "Check button actions—ensure they're set to 'Bookmark' action, not 'Navigate'",
      "Bookmarks can't capture page-level filters—use slicers instead for persistent filtering",
      "Ensure visual interactions aren't overriding bookmark state",
      "Test bookmarks in viewing mode, not editing mode—they may behave differently",
      "For complex states, use multiple bookmarks and combine with buttons",
    ],
    linkedTopics: ["Bookmarks", "Button actions", "Visual interactions", "Report navigation"],
  },
  {
    id: "publishing-fails",
    title: "Report fails to publish to Power BI Service",
    domain: "deploy_maintain",
    section: "Deployment",
    severity: "high",
    description: "Publishing error occurs, blocking deployment to production workspaces.",
    solutions: [
      "Check file size—very large PBIX files may fail to publish; compress or split",
      "Verify you have Editor or Contributor role in the target workspace",
      "Check for unsupported features in Service (some Desktop features aren't supported)",
      "Review Power Query for privacy levels—conflicting privacy levels can block publishing",
      "Ensure data sources are accessible from the Service (use gateway if on-premises)",
      "Try republishing to a personal workspace first to isolate the issue",
    ],
    linkedTopics: ["Publishing and sharing", "Privacy levels", "Workspace roles", "Gateway configuration"],
  },
  {
    id: "slow-queries",
    title: "DAX queries are slow or time out",
    domain: "model_data",
    section: "Performance optimization",
    severity: "high",
    description: "Slicers take forever to load, or visuals hang when applied to large models.",
    solutions: [
      "Use calculation groups to centralize measure logic—more efficient than separate measures",
      "Reduce cardinality: consolidate dimension tables, use categories instead of unique values",
      "Use SUMMARIZE to pre-aggregate before applying filters",
      "For large date ranges, use aggregations to pre-summarize by month/year",
      "Avoid using ALL() across large tables—use REMOVEFILTERS on specific columns instead",
      "Enable query caching in Power BI Service to reuse results for repeated queries",
    ],
    linkedTopics: ["DAX performance", "Calculation groups", "Aggregations", "Query caching"],
  },
  {
    id: "service-principal-issues",
    title: "Service Principal can't access workspaces or deploy",
    domain: "deploy_maintain",
    section: "Automation and service principals",
    severity: "high",
    description: "Automated deployment or refresh via Service Principal fails with permission errors.",
    solutions: [
      "Assign Service Principal to workspace with Member or Admin role in Power BI",
      "Enable 'Service Principal can use Power BI APIs' in tenant admin settings",
      "Verify Azure AD app has necessary permissions: 'Tenant.ReadWrite.All', etc.",
      "For automation, use Service Principal credentials in scripts, not user credentials",
      "Create a security group in Azure AD and assign to the workspace for easier management",
      "Check API response logs to identify specific permission missing",
    ],
    linkedTopics: ["Service principals", "Workspace roles", "Automation APIs", "Azure AD integration"],
  },
  {
    id: "parameter-queries",
    title: "Dynamic data source parameters not working",
    domain: "prepare_data",
    section: "Advanced Power Query",
    severity: "medium",
    description: "Parameters in Power Query don't change the data source or cause privacy errors.",
    solutions: [
      "Ensure the parameter type matches the data source requirement (Text, Number, etc.)",
      "Set privacy levels to 'Organizational' for both the parameter and data source",
      "Use query parameters inside native queries for SQL sources instead of M expressions",
      "Avoid combining parameters with functions that break query folding",
      "Test parameters locally before publishing—Service may handle them differently",
      "For REST APIs, concatenate parameter values into the URL using Text.Combine()",
    ],
    linkedTopics: ["Power Query parameters", "Privacy levels", "Dynamic data sources", "Query folding"],
  },
  {
    id: "incremental-refresh",
    title: "Incremental refresh not reducing refresh time",
    domain: "prepare_data",
    section: "Refresh optimization",
    severity: "medium",
    description: "Incremental refresh is configured but refresh still takes as long as a full refresh.",
    solutions: [
      "Verify RangeStart and RangeEnd parameters are created correctly as Date/Time type",
      "Ensure the source query can fold the date filter—check query folding indicator",
      "The date column must be in the fact table, not a dimension table",
      "Check that the incremental refresh policy window is appropriate for your data volume",
      "In Power BI Service, verify the dataset shows partitions after publishing",
      "For SQL sources, ensure the date column is indexed for efficient filtering",
    ],
    linkedTopics: ["Incremental refresh", "Query folding", "Power Query parameters", "Dataset partitions"],
  },
  {
    id: "composite-model-errors",
    title: "Composite model with DirectQuery and Import errors",
    domain: "model_data",
    section: "Storage modes",
    severity: "high",
    description: "Mixing Import and DirectQuery tables causes errors, broken relationships, or unexpected results.",
    solutions: [
      "Review storage mode compatibility—DirectQuery tables can't reference Import tables in certain ways",
      "Set dimension tables to Dual mode so they can serve both Import and DirectQuery fact tables",
      "Ensure relationships between DirectQuery and Import tables use the correct cross-source group",
      "Check that aggregation tables are properly configured with precedence rules",
      "Monitor query performance—composite models can generate multiple source queries per visual",
      "Test thoroughly in Desktop before publishing, as Service behavior may differ",
    ],
    linkedTopics: ["Composite models", "DirectQuery", "Storage modes", "Aggregation tables"],
  },
  {
    id: "dataflow-failures",
    title: "Dataflows fail or produce stale data",
    domain: "prepare_data",
    section: "Dataflow management",
    severity: "high",
    description: "Dataflows in Power BI Service error during refresh or don't update downstream datasets.",
    solutions: [
      "Check dataflow refresh history for specific error messages in the Service",
      "Verify gateway credentials if the dataflow connects to on-premises sources",
      "Ensure downstream datasets are scheduled to refresh after the dataflow completes",
      "For linked entities, check that the source dataflow refreshes successfully first",
      "Review Power Query steps for timeouts—large transformations may exceed service limits",
      "Consider splitting complex dataflows into smaller, chained dataflows",
    ],
    linkedTopics: ["Dataflows", "Gateway configuration", "Refresh scheduling", "Linked entities"],
  },
  {
    id: "conditional-formatting",
    title: "Conditional formatting not applying correctly",
    domain: "visualize_analyze",
    section: "Report formatting",
    severity: "medium",
    description: "Conditional formatting rules don't highlight the expected values or colors are wrong.",
    solutions: [
      "Verify the field used for rules matches the visual's data context (measure vs. column)",
      "Check rule order—rules are evaluated top to bottom, first match wins",
      "For color scales, ensure min/max values are set correctly and data has enough variance",
      "Use a separate measure for conditional formatting if the logic is complex",
      "Test with 'Field value' rules instead of 'Rules' for simpler numeric thresholds",
      "Check if the visual type supports conditional formatting for that specific property",
    ],
    linkedTopics: ["Conditional formatting", "DAX measures", "Visual formatting", "Color scales"],
  },
  {
    id: "drillthrough-broken",
    title: "Drillthrough pages don't work or show no data",
    domain: "visualize_analyze",
    section: "Report navigation",
    severity: "medium",
    description: "Right-clicking to drill through shows no target pages, or the target page is empty.",
    solutions: [
      "Ensure the drillthrough filter field is added to the target page's drillthrough well",
      "Check that the source visual contains the same field used in the drillthrough filter",
      "Verify the drillthrough page isn't hidden—hidden pages can't be drillthrough targets",
      "For cross-report drillthrough, enable it in both source and target report settings",
      "Test that the filter context passes correctly—add a card visual showing the filter value",
      "Ensure the drillthrough field data types match between source and target",
    ],
    linkedTopics: ["Drillthrough", "Report navigation", "Cross-report drillthrough", "Filter context"],
  },
  {
    id: "gateway-offline",
    title: "On-premises data gateway goes offline frequently",
    domain: "deploy_maintain",
    section: "Gateway management",
    severity: "high",
    description: "The gateway shows as offline in the Service, blocking all on-premises data refreshes.",
    solutions: [
      "Check the gateway service is running on the host machine—restart if stopped",
      "Verify network connectivity and firewall rules allow outbound HTTPS on port 443",
      "Update the gateway to the latest version—older versions may lose connectivity",
      "Check gateway logs in the installation folder for specific error details",
      "Ensure the gateway machine doesn't sleep or hibernate during scheduled refreshes",
      "For high availability, install a second gateway and add it to the same cluster",
    ],
    linkedTopics: ["Gateway configuration", "Network requirements", "Gateway clustering", "Refresh scheduling"],
  },
  {
    id: "deployment-pipeline",
    title: "Deployment pipeline stages out of sync",
    domain: "deploy_maintain",
    section: "ALM and deployment",
    severity: "medium",
    description: "Development, Test, and Production stages show different versions or changes don't propagate.",
    solutions: [
      "Use the 'Compare' feature to see differences between pipeline stages",
      "Ensure you deploy to each stage sequentially—don't skip stages",
      "Check deployment rules for dataset parameters that change between environments",
      "Verify permissions—you need Pipeline Admin role to deploy between stages",
      "For dataset rules, ensure connection strings are set for each stage's data source",
      "After deploying, verify data sources are bound correctly in the target workspace",
    ],
    linkedTopics: ["Deployment pipelines", "ALM best practices", "Dataset rules", "Environment management"],
  },
  {
    id: "paginated-report-issues",
    title: "Paginated reports render incorrectly or fail to export",
    domain: "visualize_analyze",
    section: "Paginated reports",
    severity: "medium",
    description: "Paginated reports show layout issues, missing data, or fail during PDF/Excel export.",
    solutions: [
      "Check page size and margins—ensure content fits within the printable area",
      "For missing data, verify the dataset query returns results with the selected parameters",
      "Use fixed-size textboxes instead of auto-grow to prevent layout shifts in exports",
      "Check subreport references—broken paths cause blank sections",
      "For large exports, increase timeout settings in Power BI Service or Report Server",
      "Test exports in multiple formats—some visuals render differently in PDF vs. Excel",
    ],
    linkedTopics: ["Paginated reports", "Report rendering", "Export formats", "Report parameters"],
  },
  {
    id: "sensitivity-labels",
    title: "Sensitivity labels block sharing or export",
    domain: "deploy_maintain",
    section: "Data protection",
    severity: "medium",
    description: "Users can't share reports or export data because sensitivity labels restrict access.",
    solutions: [
      "Review the sensitivity label policy in Microsoft Purview to understand restrictions",
      "Check if the label allows export—some labels disable PDF, Excel, or PowerPoint export",
      "Ensure users have the correct license to view labeled content (E5 or equivalent)",
      "For sharing, verify the recipient's organization accepts the label's protection settings",
      "Admins can adjust label policies to allow specific export types if business requires it",
      "Use 'Publish to web' only for public data—it bypasses all sensitivity labels",
    ],
    linkedTopics: ["Sensitivity labels", "Data protection", "Microsoft Purview", "Sharing and permissions"],
  },
  {
    id: "visual-not-loading",
    title: "Custom visuals fail to load or show errors",
    domain: "visualize_analyze",
    section: "Custom visuals",
    severity: "medium",
    description: "Custom visuals from AppSource or organizational store show blank or error states.",
    solutions: [
      "Check if the custom visual is approved in your organization's admin settings",
      "Update the visual to the latest version from AppSource or the organizational store",
      "Verify the visual supports the data types you're passing to it",
      "Check browser console for JavaScript errors related to the visual",
      "For organizational visuals, ensure the .pbiviz file is uploaded correctly by the admin",
      "Some custom visuals require Premium capacity—verify your workspace assignment",
    ],
    linkedTopics: ["Custom visuals", "AppSource", "Organizational visuals", "Visual compatibility"],
  },
];

const domainLabelMap: Record<string, string> = {
  prepare_data: "Prepare the Data",
  model_data: "Model the Data",
  visualize_analyze: "Visualize & Analyze",
  deploy_maintain: "Manage & Secure",
};

export default function Troubleshooting() {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [filterDomain, setFilterDomain] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("troubleshooting-completed");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });

  const toggleComplete = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("troubleshooting-completed", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const filtered = issues.filter(
    (issue) =>
      (filterDomain === "all" || issue.domain === filterDomain) &&
      (filterSeverity === "all" || issue.severity === filterSeverity)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Power BI Troubleshooting</h1>
          <p className="text-muted-foreground">Common challenges and solutions for Power BI developers</p>
          <p className="text-sm text-primary font-medium mt-1">{completed.size}/{issues.length} completed</p>
        </div>
        <SyllabusSyncButton
          sectionLabel="Troubleshooting"
          corpus={issues.flatMap(i => [i.title, i.description, i.section, ...(i.linkedTopics || []), ...(i.solutions || [])])}
          itemCount={issues.length}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase">Domain</label>
          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="mt-1 block px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Domains</option>
            {Object.entries(domainLabelMap).map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase">Severity</label>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="mt-1 block px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Severities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((issue) => {
          const isExpanded = expandedIssue === issue.id;
          return (
            <Card key={issue.id} className={cn("overflow-hidden", completed.has(issue.id) && "border-chart-4/40")}>
              <button
                onClick={() => setExpandedIssue(isExpanded ? null : issue.id)}
                className="w-full p-4 text-left hover:bg-secondary/50 transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={cn(
                      "inline-block w-2 h-2 rounded-full",
                      issue.severity === "high" ? "bg-destructive" : "bg-chart-5"
                    )} />
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {domainLabelMap[issue.domain]}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {issue.severity === "high" ? "High Priority" : "Medium Priority"}
                    </Badge>
                    {completed.has(issue.id) && <Badge className="bg-chart-4/10 text-chart-4">✓ Done</Badge>}
                  </div>
                  <h3 className={cn("font-semibold", completed.has(issue.id) ? "text-muted-foreground" : "text-foreground")}>{issue.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                )}
              </button>

              {isExpanded && (
                <CardContent className="p-4 border-t border-border bg-secondary/20 space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-chart-5" />
                      Best Approach to Solve
                    </h4>
                    <ul className="space-y-2">
                      {issue.solutions.map((solution, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="font-semibold text-primary flex-shrink-0">{idx + 1}.</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={(e) => toggleComplete(issue.id, e)}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      completed.has(issue.id)
                        ? "bg-chart-4/10 text-chart-4 hover:bg-destructive/10 hover:text-destructive"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    <Check className="w-4 h-4" />
                    {completed.has(issue.id) ? "Completed — click to undo" : "Mark as Complete"}
                  </button>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-primary" />
                      Related Syllabus Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {issue.linkedTopics.map((topic, idx) => (
                        <Link
                          key={idx}
                          to={`${createPageUrl("Syllabus")}?domain=${issue.domain}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors"
                        >
                          {topic}
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No issues match your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
