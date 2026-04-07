// Content for interaction, navigation, and filtering topics
export const interactionAndNavigationContent = {
  "Apply conditional formatting": {
    overview: {
      title: "Rules-Based Visual Styling",
      concepts: [
        "Conditional formatting applies color, icons, or styling based on data values",
        "Rules highlight important values, exceptions, or trends without additional text",
        "Formatting can use value-based rules, color scales, or field values",
        "Icons (arrows, circles, flags) convey status or direction visually",
        "Conditional formatting improves readability and draws attention to insights"
      ]
    },
    bestPractices: [
      "Use meaningful color scales (red-yellow-green) that match data meaning",
      "Apply sparingly - too much formatting clutters the visual",
      "Test formatting with actual data to ensure color choices are accessible",
      "Document formatting rules so others understand the visual language",
      "Use icons for clear status indicators (good/bad, up/down)",
      "Combine with data labels for clarity"
    ],
    commonMistakes: [
      "Excessive color making table unreadable",
      "Color schemes that don't match data meaning (red for good)",
      "Inaccessible color combinations for color-blind viewers",
      "Conflicting formatting rules creating confusion",
      "Gradient color scales that hide important values",
      "Not testing formatting with diverse data ranges"
    ],
    keySteps: [
      "Select table or matrix visual with numeric column",
      "Go to Format > Conditional formatting",
      "Choose formatting type: Background color, Font color, Data bars, Icons",
      "Set rules: based on value, percentile, or field",
      "Configure colors or icons and thresholds",
      "Test with data to verify rules work as expected",
      "Preview to ensure formatting is clear and accessible"
    ],
    keyDecisions: [
      "**Color or icon formatting?** - Value highlight: color; Status: icon",
      "**Fixed rules or dynamic range?** - Same thresholds: fixed; Relative: percentile",
      "**Background or font color?** - Neutral background: font color; Prominent: background"
    ],
    keyDefinitions: [
      "**Conditional Formatting**: Rules-based styling applied to cells based on values",
      "**Color Scale**: Gradient from one color to another based on values",
      "**Icon Set**: Symbols indicating status or direction (arrows, circles, flags)",
      "**Threshold**: Value or percentile triggering formatting rule",
      "**Data Bar**: In-cell bar chart showing relative value magnitude"
    ],
    risks: [
      "**Accessibility**: Color-blind users can't distinguish red/green formatting",
      "**Overuse**: Too much color makes visual unreadable and overwhelming",
      "**Maintenance**: Formatting rules become hard to track and manage",
      "**Performance**: Extensive conditional formatting on large tables slows rendering",
      "**Confusion**: Inconsistent rules across similar columns create confusion",
      "**Misleading**: Wrong color associations mislead interpretation"
    ],
    faqs: [
      {
        q: "What color scale is best for conditional formatting?",
        a: "Use 3-color scale: red-yellow-green for performance; blue-white-red for diverging data; or single color gradients."
      },
      {
        q: "Can I use icons and colors together?",
        a: "Yes - use icons for status and background color for emphasis, but don't overdo it."
      }
    ],
    examTips: [
      "Know conditional formatting applies rules-based styling to values",
      "Understand color scales, icons, and data bars as formatting options",
      "Remember accessibility in color selection for formatting"
    ],
    resources: [
      {
        title: "Conditional formatting in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/service-conditional-formatting-by-color-scale",
        type: "Documentation"
      }
    ]
  },

  "Apply slicing and filtering": {
    overview: {
      title: "User-Controlled Data Filtering",
      concepts: [
        "Slicers provide visual controls for users to filter report data",
        "Filters include visual-level, page-level, and report-level options",
        "Slicer types: list, dropdown, between, relative date, timeline",
        "Filtering cascades through related tables via model relationships",
        "Clear and intuitive filter design improves report usability"
      ]
    },
    bestPractices: [
      "Use slicers for frequently filtered dimensions (date, region, product)",
      "Design slicer UX for ease of use (logical order, grouping)",
      "Provide default slicer values to guide users",
      "Use smart narrative or KPI cards to show filtered context",
      "Test slicers with all data scenarios",
      "Document slicer behavior and relationships"
    ],
    commonMistakes: [
      "Too many slicers cluttering the report",
      "Slicers in unclear order or grouping",
      "Filters that don't propagate as expected",
      "Missing default values causing blank results",
      "Slicers with poor UX (long lists, no search)",
      "Conflicting filters creating confusing results"
    ],
    keySteps: [
      "Insert slicer: Insert > Slicer and choose field",
      "Configure slicer: Select slicer type (list, dropdown, timeline)",
      "Set slicer options: sorting, defaultvalues, layout",
      "Position slicer on page logically",
      "Test filtering behavior across visuals",
      "Apply conditional visibility if needed (show when other filter active)"
    ],
    keyDecisions: [
      "**Which fields to slicer?** - Frequently filtered: yes; Rarely used: no",
      "**Slicer type?** - Many values: dropdown; Few values: list; Date: timeline",
      "**Default values?** - Provide reasonable defaults; Clear so users see all data initially"
    ],
    keyDefinitions: [
      "**Slicer**: Visual control allowing users to filter report data",
      "**Filter Context**: Row and column combinations selected by user via slicers",
      "**Cascading Filters**: Dependent filters where one filter affects another's options",
      "**Visual Filter**: Specific to one visual only",
      "**Page Filter**: Applies to all visuals on current page",
      "**Report Filter**: Applies across entire report (all pages)"
    ],
    risks: [
      "**Confusion**: Too many slicers overwhelm users",
      "**Unexpected behavior**: Filters not propagating as expected",
      "**Performance**: Many slicers with large option lists slow rendering",
      "**Incomplete data**: Users accidentally filter out important data",
      "**Maintenance**: Slicer relationships break if model changes",
      "**Mobile**: Slicers don't work well on touch devices"
    ],
    faqs: [
      {
        q: "Should every dimension have a slicer?",
        a: "No - only for dimensions users frequently filter on. Too many slicers clutter the report."
      },
      {
        q: "How do I cascade slicers so one affects another?",
        a: "Slicers automatically cascade through model relationships. No special configuration needed."
      }
    ],
    examTips: [
      "Know different slicer types: list, dropdown, timeline, between",
      "Understand filter context and how filters propagate through report",
      "Remember to set default values and test slicer behavior"
    ],
    resources: [
      {
        title: "Create slicers and filters in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/power-bi-visualization-slicers",
        type: "Documentation"
      }
    ]
  },

  "Edit and configure interactions between visuals": {
    overview: {
      title: "Cross-Visual Filtering Behavior",
      concepts: [
        "Visual interactions control how one visual filters or highlights others",
        "Interaction types: Filter, Highlight, or None",
        "Multiple visuals can interact creating complex filtering scenarios",
        "Edit interactions per page for report-specific behavior",
        "Interactions reduce clutter by filtering instead of showing all data"
      ]
    },
    bestPractices: [
      "Design interactions that match user's analytical workflow",
      "Test interactions with multiple selection scenarios",
      "Provide visual feedback (filters, highlighting) to show active selections",
      "Document interaction design for complex reports",
      "Keep interactions intuitive (don't hide them)",
      "Balance between filtering and showing context"
    ],
    commonMistakes: [
      "Too many interactions creating complex unexpected behavior",
      "Interactions that don't match user expectations",
      "No visual feedback showing what's being filtered",
      "Interactions that break analysis flow",
      "Forgetting to test interactions thoroughly",
      "Interactions only working one direction"
    ],
    keySteps: [
      "Select source visual (clicking this visual triggers interaction)",
      "Go to Format > Edit interactions",
      "For each target visual, choose interaction: Filter, Highlight, or None",
      "Test by clicking source visual to see interaction effect",
      "Configure interaction details (fields affected)",
      "Repeat for all source visuals with interactions"
    ],
    keyDecisions: [
      "**Filter or Highlight?** - Complete focus: Filter; Show context: Highlight",
      "**Bi-directional?** - Workflow requires both: yes; One-way sufficient: no",
      "**Default None?** - Most interactions should be configured, defaults might be None"
    ],
    keyDefinitions: [
      "**Interaction**: How one visual's selection affects another visual",
      "**Filter Interaction**: Selection in one visual hides unrelated data in others",
      "**Highlight Interaction**: Selection in one visual grays out unrelated data in others",
      "**None Interaction**: Selection in one visual doesn't affect others",
      "**Edit Interactions**: Configuration mode showing interaction paths between visuals"
    ],
    risks: [
      "**Confusion**: Complex interactions confuse users",
      "**Unexpected behavior**: Users don't understand filtering logic",
      "**Broken analysis**: Interactions prevent seeing required context",
      "**Performance**: Many interactions slow report responsiveness",
      "**Maintenance**: Complex interaction chains hard to track",
      "**Accessibility**: Keyboard navigation of interactions may be limited"
    ],
    faqs: [
      {
        q: "What's the difference between Filter and Highlight interaction?",
        a: "Filter removes unrelated data completely. Highlight grays out unrelated data but keeps it visible for context."
      },
      {
        q: "Can one visual interact with multiple other visuals?",
        a: "Yes - when selected, it can filter or highlight multiple visuals simultaneously."
      }
    ],
    examTips: [
      "Know interaction types: Filter, Highlight, None",
      "Understand filtering removes data, highlighting shows but grays out",
      "Remember to test interactions with realistic user scenarios"
    ],
    resources: [
      {
        title: "Configure visual interactions in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/service-reports-visual-interactions",
        type: "Documentation"
      }
    ]
  },

  "Configure navigation for a report": {
    overview: {
      title: "User-Friendly Report Page Navigation",
      concepts: [
        "Navigation allows users to move between report pages intuitively",
        "Page navigation can be via buttons, bookmarks, or drill-through",
        "Breadcrumbs and back buttons help users understand their location",
        "Navigation design improves user experience for multi-page reports",
        "Clear navigation prevents users from getting lost in complex reports"
      ]
    },
    bestPractices: [
      "Create clear navigation structure mirroring analytical workflow",
      "Use consistent navigation controls across pages",
      "Provide visual indication of current page",
      "Include back/home buttons for easy navigation",
      "Test navigation with diverse user scenarios",
      "Document page purpose and navigation paths"
    ],
    commonMistakes: [
      "Unclear navigation controls",
      "Inconsistent navigation across pages",
      "No way to return to previous page",
      "Over-complicated navigation menus",
      "Pages that are hard to find or access",
      "Navigation buttons not responding as expected"
    ],
    keySteps: [
      "Plan navigation structure and page hierarchy",
      "Create navigation buttons: Insert > Button > Page navigation",
      "Set button destinations to target pages",
      "Add visual feedback (highlighting, tooltips) for active buttons",
      "Include back buttons for easy return",
      "Test navigation flow and button responsiveness",
      "Consider breadcrumb indicators on complex paths"
    ],
    keyDecisions: [
      "**Navigation style?** - Buttons: explicit; Bookmarks: less obvious; Drill-through: contextual",
      "**Persistent nav?** - Header/footer: always visible; Page-specific: varies",
      "**Home button?** - Always provide way to return to main page"
    ],
    keyDefinitions: [
      "**Page Navigation**: Moving between report pages via controls",
      "**Navigation Button**: Button that navigates to specific page",
      "**Breadcrumb**: Trail showing current location in page hierarchy",
      "**Back Button**: Button returning user to previous page",
      "**Drill-through**: Context-based navigation passing filters to target page"
    ],
    risks: [
      "**User confusion**: Unclear navigation causes users to get lost",
      "**Broken links**: Navigation buttons pointing to deleted pages",
      "**Dead ends**: Pages without way to navigate back",
      "**Complexity**: Too many navigation options overwhelm users",
      "**Performance**: Complex navigation paths slow response",
      "**Mobile**: Navigation may not work well on touch devices"
    ],
    faqs: [
      {
        q: "Should every page have a navigation menu?",
        a: "Yes - provide consistent way to navigate between pages, even simple back button."
      },
      {
        q: "How do I show users which page they're on?",
        a: "Use visual highlighting of current navigation button or breadcrumb trail."
      }
    ],
    examTips: [
      "Know page navigation improves report usability",
      "Understand button navigation vs bookmark navigation",
      "Remember breadcrumbs and back buttons help users orient themselves"
    ],
    resources: [
      {
        title: "Add navigation in Power BI reports",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-buttons",
        type: "Documentation"
      }
    ]
  },

  "Apply sorting to visuals": {
    overview: {
      title: "Data Ordering and Ranking in Visuals",
      concepts: [
        "Sorting orders data by values, categories, or custom order",
        "Sort directions: ascending, descending, or custom",
        "Sorting by measure values highlights top/bottom performers",
        "Dynamic sorting based on user selection via sort buttons",
        "Proper sorting improves visual clarity and story"
      ]
    },
    bestPractices: [
      "Sort by most relevant dimension for the analysis",
      "Use descending for ranking (top X first)",
      "Use custom sort for logical order (small, medium, large)",
      "Test sorting with actual data ranges",
      "Document sorting logic so others understand the order",
      "Provide sort buttons for user-driven sorting"
    ],
    commonMistakes: [
      "Alphabetical sorting when value sorting is more insightful",
      "Inconsistent sorting across similar visuals",
      "Sorting that obscures important insights",
      "Custom sort order not matching data logic",
      "Not testing sort with real data",
      "Sort buttons that don't work reliably"
    ],
    keySteps: [
      "Select visual and identify field to sort by",
      "Right-click field or use Sort menu",
      "Choose sort order: ascending, descending, or custom",
      "For dynamic sorting: Insert sort buttons linked to visual",
      "Test sort with various data selections and filters",
      "Verify sort remains intuitive after filtering"
    ],
    keyDecisions: [
      "**Sort ascending or descending?** - Ranking: descending (largest first); Natural order: ascending",
      "**Sort by value or category?** - Insight focus: by value; Context: by category",
      "**Dynamic sort buttons?** - User control important: yes; Fixed view: no"
    ],
    keyDefinitions: [
      "**Sorting**: Reordering data in visual by specified field",
      "**Ascending Order**: Smallest to largest, A to Z, earliest to latest",
      "**Descending Order**: Largest to smallest, Z to A, latest to earliest",
      "**Custom Sort**: User-defined order (small/medium/large, low/med/high)",
      "**Sort Button**: Interactive control for user-driven sorting"
    ],
    risks: [
      "**Confusion**: Unexpected sort order confuses viewers",
      "**Lost insights**: Wrong sort hides important patterns",
      "**Inconsistency**: Different sort logic across similar visuals",
      "**Maintenance**: Custom sort logic needs documentation",
      "**Performance**: Sorting large datasets may slow rendering",
      "**Mobile**: Sort buttons may not work on touch devices"
    ],
    faqs: [
      {
        q: "Should I use alphabetical or value sorting?",
        a: "Alphabetical for navigational (looking for specific item). Value for analytical (seeing top performers)."
      },
      {
        q: "Can users change sorting in reports?",
        a: "Not directly by default. Provide sort buttons or allow users to edit reports for that control."
      }
    ],
    examTips: [
      "Know sorting arranges data for clarity and insight",
      "Understand ascending vs descending and custom sort",
      "Remember sort can be static or user-controlled via buttons"
    ],
    resources: [
      {
        title: "Sort and reorder visuals in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/power-bi-sort-by-column",
        type: "Documentation"
      }
    ]
  },

  "Configure drill through navigation": {
    overview: {
      title: "Contextual Navigation to Detailed Pages",
      concepts: [
        "Drill-through allows clicking data point to navigate to detail page with context",
        "Drill-through passes filters from source to target page automatically",
        "Drill-through pages are usually hidden from normal navigation",
        "Drill-through reduces need for duplicate visuals with different grain",
        "Back buttons allow returning to source after drill-through"
      ]
    },
    bestPractices: [
      "Create drill-through pages for detailed analysis of summary data",
      "Use clear field matching between source and drill-through pages",
      "Provide back button on drill-through page",
      "Test drill-through with various data selections",
      "Document drill-through behavior for users",
      "Ensure drill-through filters make sense contextually"
    ],
    commonMistakes: [
      "Drill-through page not receiving expected filters",
      "No back button to return to source",
      "Too many drill-through fields cluttering the interface",
      "Drill-through page with irrelevant content",
      "Not testing drill-through with different selections",
      "Forgetting to hide drill-through pages from normal navigation"
    ],
    keySteps: [
      "Create detail page for drill-through content",
      "On source visual, right-click > Drill through",
      "Add drill-through fields (fields that will filter detail page)",
      "Configure target page: which page to navigate to",
      "Match fields between source and target page",
      "Add back button on drill-through page",
      "Test drill-through with various data points"
    ],
    keyDecisions: [
      "**Which fields for drill-through?** - Keys identifying the detail: include those",
      "**Single or multiple targets?** - One detail page: single; Multiple detail types: configure each",
      "**How to return?** - Back button: explicit; Breadcrumb: navigational"
    ],
    keyDefinitions: [
      "**Drill-through**: Context-aware navigation to detail page with filters",
      "**Drill-through Field**: Field passed from source to target page as filter",
      "**Drill-through Page**: Hidden detail page accessed via drill-through",
      "**Back Button**: Navigation returning to source page after drill-through",
      "**Field Matching**: Connecting source fields to target page fields"
    ],
    risks: [
      "**Filter mismatch**: Drill-through fields don't match between pages",
      "**Confusion**: Users don't understand drill-through behavior",
      "**No back**: Users get stuck on drill-through page",
      "**Wrong data**: Drill-through shows unrelated detail",
      "**Performance**: Detail page slow to load with many visuals",
      "**Maintenance**: Drill-through breaks if field names change"
    ],
    faqs: [
      {
        q: "Do I need a back button on drill-through pages?",
        a: "Yes - always provide way to return. Use back button or breadcrumb."
      },
      {
        q: "What if drill-through page needs different filters than source?",
        a: "Map only the relevant fields for drill-through. Use other slicers for independent filtering."
      }
    ],
    examTips: [
      "Know drill-through navigates with contextual filters",
      "Understand field matching between source and target",
      "Remember back button essential for returning"
    ],
    resources: [
      {
        title: "Configure drill-through in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-drillthrough",
        type: "Documentation"
      }
    ]
  }
};
