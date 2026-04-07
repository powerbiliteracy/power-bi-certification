// Content for "Enhance reports for usability and storytelling" section topics
export const enhanceReportsContent = {
  "Configure bookmarks": {
    overview: {
      title: "Creating Navigation Snapshots",
      concepts: [
        "Bookmarks capture current visual state including selections, filters, and page",
        "Page bookmarks jump to specific page; visual bookmarks save specific filter state",
        "Bookmark buttons enable interactive report navigation without coding",
        "Bookmarks enable storytelling by walking users through data analysis steps",
        "Users can create personal bookmarks for quick access to favorite views"
      ]
    },
    bestPractices: [
      "Create bookmarks for key insights or analytical flows",
      "Use clear, descriptive names for bookmarks",
      "Organize bookmarks logically (overview, details, comparisons)",
      "Create bookmark buttons with descriptive labels",
      "Test bookmarks to ensure they capture and restore correct state",
      "Document bookmark flow for users to understand navigation"
    ],
    commonMistakes: [
      "Creating too many bookmarks cluttering the interface",
      "Vague bookmark names that don't describe their purpose",
      "Bookmarks that include selections users don't want captured",
      "Not updating bookmarks when visual configurations change",
      "Forgetting to enable personal bookmarks for users",
      "Bookmark buttons placed inconsistently on page"
    ],
    keySteps: [
      "Set report to desired state (filters, selections, page)",
      "Go to View tab > Bookmarks > New bookmark",
      "Give bookmark clear, descriptive name",
      "Choose bookmark type: Display only (default) or includes current data",
      "Create bookmark button: Insert > Button > Bookmark action",
      "Link button to specific bookmark",
      "Test bookmark restores correct state"
    ],
    keyDecisions: [
      "**What to capture?** - Current filters and selections; Exclude personal preferences",
      "**Display-only or include data?** - Display: snapshots; Include data: live updated state",
      "**Bookmark buttons needed?** - Yes: improve navigation; No: users navigate manually",
      "**Enable personal bookmarks?** - Yes: help users navigate their way; No: only curated bookmarks"
    ],
    keyDefinitions: [
      "**Bookmark**: Snapshot of report state (filters, selections, page)",
      "**Page Bookmark**: Navigation to specific report page",
      "**Visual Bookmark**: Filters and selections on current page",
      "**Bookmark Button**: Interactive button that applies specific bookmark",
      "**Personal Bookmark**: User-created bookmark (if enabled)"
    ],
    risks: [
      "**State corruption**: Bookmarks become outdated if report structure changes",
      "**Confusion**: Too many bookmarks overwhelm users",
      "**Maintenance**: Bookmarks referencing deleted fields break",
      "**Performance**: Many bookmarks may affect report performance",
      "**Accidental changes**: Users accidentally change bookmarked state",
      "**Documentation**: Users don't understand available bookmarks"
    ],
    faqs: [
      {
        q: "What's the difference between page and visual bookmarks?",
        a: "Page bookmarks navigate to different report page. Visual bookmarks capture filters and selections on current page."
      },
      {
        q: "Can users create and save their own bookmarks?",
        a: "Yes - if you enable personal bookmarks. This gives users control over their preferred views."
      },
      {
        q: "Do bookmarks update when data changes?",
        a: "No - bookmarks are snapshots. They restore same state each time but filters apply to current data."
      }
    ],
    examTips: [
      "Know bookmarks capture visual state including filters and selections",
      "Understand page vs visual bookmarks",
      "Remember bookmark buttons enable interactive navigation"
    ],
    resources: [
      {
        title: "Create bookmarks in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-bookmarks",
        type: "Documentation"
      }
    ]
  },

  "Create custom tooltips": {
    overview: {
      title: "Enhanced Data Point Information Display",
      concepts: [
        "Tooltips display additional information when users hover over data points",
        "Custom tooltips can show measures, visuals, or formatted text",
        "Tooltip pages contain custom visuals showing detail for selected data point",
        "Smart narratives can generate tooltips explaining specific data values",
        "Tooltips reduce need for drill-through while keeping main visuals clean"
      ]
    },
    bestPractices: [
      "Use tooltips for supplementary information, not primary data",
      "Keep tooltip pages clean and focused on relevant details",
      "Test tooltips across different scenarios and data points",
      "Use consistent tooltip design across report",
      "Include measures that clarify the main visual's data point",
      "Add context or explanation if calculations aren't obvious"
    ],
    commonMistakes: [
      "Tooltips that are too complex or cluttered",
      "Showing data already visible in main visual",
      "Slow-rendering tooltips with unnecessary visuals",
      "Inconsistent tooltip design across report",
      "Tooltips that don't change based on selected data point",
      "Missing tooltips on key visuals where context would help"
    ],
    keySteps: [
      "Create tooltip page: Insert > New page > Blank (mark as tooltip page)",
      "Design tooltip page with relevant visuals and measures",
      "Configure source visual to use tooltip page: Visual > Formatting > Tooltip > Use page",
      "Select tooltip page from dropdown",
      "Test by hovering over data points in source visual",
      "Verify tooltip correctly reflects selected data point"
    ],
    keyDecisions: [
      "**Tooltip page or default tooltip?** - Simple: default; Detailed: custom page",
      "**What to show in tooltip?** - Related measures, explanations, mini-visuals",
      "**Filters vs context?** - Show all data vs filtered to selected point"
    ],
    keyDefinitions: [
      "**Tooltip Page**: Custom page displayed when hovering over data point",
      "**Hover Context**: Implicit filter applied to tooltip showing data for selected point",
      "**Default Tooltip**: Built-in tooltip showing field values",
      "**Custom Tooltip**: Formatted text or visuals shown on hover"
    ],
    risks: [
      "**Performance**: Complex tooltip pages slow rendering",
      "**Confusion**: Tooltips showing unexpected or unclear information",
      "**Maintenance**: Broken references in tooltips as report changes",
      "**Clutter**: Too many tooltips overwhelming users",
      "**Mobile**: Tooltips don't work well on touch devices",
      "**Accessibility**: Tooltip information not accessible to screen readers"
    ],
    faqs: [
      {
        q: "Can I show a custom visual in a tooltip?",
        a: "Yes - create tooltip page with any visuals you want, including custom visuals."
      },
      {
        q: "How do I make tooltip show data for only the selected point?",
        a: "Tooltip automatically filters to selected data point context - no additional configuration needed."
      }
    ],
    examTips: [
      "Know custom tooltips use dedicated tooltip pages",
      "Understand tooltips display contextual information on hover",
      "Remember tooltips should be supplementary, not primary data display"
    ],
    resources: [
      {
        title: "Create custom tooltips in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-custom-tooltips",
        type: "Documentation"
      }
    ]
  },

  "Configure sync slicers": {
    overview: {
      title: "Unified Filtering Across Report Pages",
      concepts: [
        "Sync slicers allow one slicer on source page to filter visuals on other pages",
        "Bi-directional sync enables two-way filtering between pages",
        "Sync settings apply same selection across consistent slicers",
        "Page-level and visual-level sync options provide flexibility",
        "Sync slicers reduce redundancy and ensure consistency across report"
      ]
    },
    bestPractices: [
      "Use sync slicers for consistent filtering across pages",
      "Label sync source and target pages clearly",
      "Test sync across pages with various selections",
      "Use consistent slicer designs across pages",
      "Document sync relationships for maintenance",
      "Consider bi-directional sync when appropriate for user workflow"
    ],
    commonMistakes: [
      "Creating sync relationships between unrelated slicers",
      "Not testing sync with actual data selections",
      "Over-using sync creating complex dependencies",
      "Forgetting to update sync when report structure changes",
      "Sync that doesn't reflect user expectations",
      "Complex sync chains that are hard to understand"
    ],
    keySteps: [
      "Create slicers on both source and target pages (same field or related fields)",
      "Select slicer on target page > Visual > Sync slicer",
      "Check 'Sync this slicer' to enable syncing",
      "Select source page and source slicer from dropdowns",
      "Choose sync direction: One way or Bi-directional",
      "Test by selecting values in both slicers on different pages"
    ],
    keyDecisions: [
      "**Sync direction?** - One-way: source drives target; Bi-directional: either drives other",
      "**Sync required?** - Yes: different pages need same filtering; No: independent pages fine",
      "**Visible on target?** - Show: user sees slicer; Hide: filtering happens behind scenes"
    ],
    keyDefinitions: [
      "**Sync Slicer**: Coordination between slicers on different pages",
      "**Source Slicer**: Slicer that initiates sync on another page",
      "**Target Slicer**: Slicer that receives sync from source page",
      "**Bi-directional Sync**: Two-way sync where either slicer can drive filtering",
      "**Sync Settings**: Configuration of which slicers sync and in what direction"
    ],
    risks: [
      "**Complexity**: Too many sync relationships hard to understand and maintain",
      "**Brittleness**: Sync breaks if fields renamed or removed",
      "**Performance**: Many sync slicers may impact interaction performance",
      "**Confusion**: Users don't understand why selections affect other pages",
      "**Inconsistency**: Different sync behaviors on different page pairs",
      "**User error**: Accidental selections propagate through sync"
    ],
    faqs: [
      {
        q: "Can I sync slicers on the same page?",
        a: "Sync is for different pages. On same page, use slicer interactions instead."
      },
      {
        q: "What if slicers are on different fields but related?",
        a: "You can still sync - Power BI handles cross-filtering based on relationships in your model."
      }
    ],
    examTips: [
      "Know sync slicers coordinate filtering across report pages",
      "Understand one-way vs bi-directional sync",
      "Remember sync reduces redundancy and ensures consistency"
    ],
    resources: [
      {
        title: "Sync slicers in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/power-bi-slicer-filter-responsive",
        type: "Documentation"
      }
    ]
  }
};
