// Content for advanced report design and accessibility topics
export const advancedReportDesignContent = {
  "Group and layer visuals by using the Selection pane": {
    overview: {
      title: "Organizing and Controlling Visual Display",
      concepts: [
        "Selection pane shows all objects on page and their stacking order",
        "Grouping visuals together for organization and coordinated selection",
        "Layering controls which visuals appear on top (z-order)",
        "Visibility toggle hides objects without removing them",
        "Selection pane improves navigation in crowded pages"
      ]
    },
    bestPractices: [
      "Name objects descriptively for easy selection in pane",
      "Group related visuals (e.g., title with chart) for organization",
      "Use layering strategically (backgrounds behind, controls in front)",
      "Hide decorative objects if they clutter the selection pane",
      "Document grouping and layering logic for team"
    ],
    commonMistakes: [
      "Unclear object names in selection pane",
      "Accidental visibility changes",
      "Layering that obscures important visuals",
      "Over-grouping reducing flexibility",
      "Not using selection pane for complex pages"
    ],
    keySteps: [
      "Go to View > Selection pane to open pane",
      "See all objects listed (visuals, shapes, buttons, images)",
      "Click objects to select them on canvas",
      "Rename objects: right-click > Rename for clarity",
      "Group objects: Ctrl+click multiple, right-click > Group",
      "Change layer order: drag objects in pane to reorder",
      "Toggle visibility: click eye icon to hide/show"
    ],
    keyDecisions: [
      "**Group or leave separate?** - Move together: group; Independent positioning: separate",
      "**Visibility needed?** - Show always: leave visible; Optional: toggle as needed"
    ],
    keyDefinitions: [
      "**Selection Pane**: Panel showing all page objects and hierarchy",
      "**Grouping**: Combining multiple objects for coordinated selection/movement",
      "**Layering (Z-order)**: Stacking order determining which objects appear on top",
      "**Visibility Toggle**: Hidden objects still exist but don't display",
      "**Object Naming**: Descriptive names for easy identification in pane"
    ],
    risks: [
      "**Confusion**: Unclear naming makes objects hard to find",
      "**Locked objects**: Grouped objects lose individual positioning control",
      "**Hidden content**: Users don't know hidden objects exist",
      "**Performance**: Many objects on page slow rendering",
      "**Maintenance**: Complex grouping hard to modify later",
      "**Mobile**: Layering may break on small screens"
    ],
    faqs: [
      {
        q: "Should I group all visuals together?",
        a: "No - only group visuals that move together. Keep others separate for flexibility."
      },
      {
        q: "Can I ungroup visuals later?",
        a: "Yes - right-click grouped object in selection pane and choose Ungroup."
      }
    ],
    examTips: [
      "Know selection pane shows all page objects",
      "Understand grouping and layering control visual organization",
      "Remember visibility toggles hide without deleting objects"
    ],
    resources: [
      {
        title: "Selection pane in Power BI Desktop",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-selection-pane",
        type: "Documentation"
      }
    ]
  },

  "Configure export settings": {
    overview: {
      title: "Controlling Report Output Formats",
      concepts: [
        "Export options: PDF, PowerPoint, Excel, image formats",
        "Current page vs all pages export selection",
        "Bookmarked views can be exported as separate snapshots",
        "Export settings control what visuals and data are included",
        "Export functionality requires appropriate licensing and permissions"
      ]
    },
    bestPractices: [
      "Test exports with actual reports to verify appearance",
      "Configure visual titles and descriptions for context in exports",
      "Use bookmarks to enable exporting specific filtered views",
      "Document export options and file format guidance for users",
      "Ensure sensitive data is properly protected in exports",
      "Test export formatting on target devices/applications"
    ],
    commonMistakes: [
      "Not testing how exports look in different formats",
      "Visuals that don't render well in PDF/PowerPoint",
      "Exporting with formatting that doesn't translate",
      "Large files from exporting high-resolution",
      "No guidance on export options for users",
      "Forgetting to include context in exported files"
    ],
    keySteps: [
      "Go to File > Export to see export options",
      "Choose format: PDF, PowerPoint, Excel, or Image",
      "Select scope: Current page or All pages",
      "Choose visual display options (current, all visuals, etc.)",
      "Test export in target application (Word, Outlook, etc.)",
      "Review formatting and adjust if needed"
    ],
    keyDecisions: [
      "**Allow export?** - Public report: yes; Sensitive: restrict or deny",
      "**Which formats?** - PDF: most universal; PPT: presentations; Excel: data analysis"
    ],
    keyDefinitions: [
      "**Export**: Save report in different format for use outside Power BI",
      "**PDF Export**: Formatted snapshot suitable for sharing and printing",
      "**PowerPoint Export**: Visuals embedded in PPT for presentations",
      "**Excel Export**: Data table suitable for further analysis",
      "**Bookmarked Export**: Export of specific filtered view"
    ],
    risks: [
      "**Formatting loss**: Export may not preserve formatting exactly",
      "**File size**: High-resolution exports create large files",
      "**Data security**: Exports may contain sensitive data",
      "**Compatibility**: Export format may not open in all applications",
      "**Licensing**: Some export options require premium licensing",
      "**Outdated data**: Exported snapshots become stale"
    ],
    faqs: [
      {
        q: "Can users export from reports they have access to?",
        a: "Yes by default - but admins can restrict export in Power BI admin settings if needed for data security."
      },
      {
        q: "What's the best format for sharing reports?",
        a: "PDF for static sharing and printing. PowerPoint for presentations. Excel for data analysis."
      }
    ],
    examTips: [
      "Know export formats: PDF, PowerPoint, Excel, images",
      "Understand licensing may affect export availability",
      "Remember to test exports in target formats"
    ],
    resources: [
      {
        title: "Export reports from Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/end-user-export",
        type: "Documentation"
      }
    ]
  },

  "Design reports for mobile devices": {
    overview: {
      title: "Mobile-First Report Optimization",
      concepts: [
        "Mobile layout differs from desktop with single-column design",
        "Touch-friendly controls (large buttons, spacing) for mobile users",
        "Mobile visuals should work with smaller screens and touch input",
        "Auto-fit views adapt to device orientation and size",
        "Mobile reports optimize for performance on slower connections"
      ]
    },
    bestPractices: [
      "Design mobile-first, then adapt for desktop if possible",
      "Use larger touch targets (buttons, slicers) for finger input",
      "Stack visuals vertically for readability on narrow screens",
      "Test on actual mobile devices and various screen sizes",
      "Optimize performance for mobile networks",
      "Simplify visuals (fewer data points, clearer labels)"
    ],
    commonMistakes: [
      "Designing desktop-first, mobile broken afterwards",
      "Too small buttons and controls for touch",
      "Overwhelming mobile screens with too many visuals",
      "Not testing on actual devices",
      "Complex interactions that don't work on touch",
      "Large file sizes slow on mobile"
    ],
    keySteps: [
      "Go to View > Mobile layout to access mobile design view",
      "Arrange visuals for single-column mobile layout",
      "Remove or hide non-essential visuals on mobile",
      "Enlarge touch targets (buttons, slicer items)",
      "Test with mobile device browser or Power BI mobile app",
      "Optimize images and visuals for file size"
    ],
    keyDecisions: [
      "**Show all visuals on mobile?** - Essential: yes; Nice-to-have: hide for space",
      "**Vertical or horizontal?** - Usually vertical for mobile (portrait orientation)",
      "**Zoom needed?** - Simple content: no; Complex: allow pan/zoom"
    ],
    keyDefinitions: [
      "**Mobile Layout**: Separate layout optimized for small screens",
      "**Touch Target**: Minimum size for easy finger interaction (44x44px standard)",
      "**Responsive Design**: Adapts to various screen sizes automatically",
      "**Portrait/Landscape**: Vertical or horizontal device orientation",
      "**Mobile Optimization**: Performance and UX improvements for mobile devices"
    ],
    risks: [
      "**Poor usability**: Touch controls too small for finger",
      "**Slow performance**: Large file sizes on mobile networks",
      "**Broken interactions**: Touch gestures not working as expected",
      "**Content loss**: Important content hidden on mobile",
      "**Inconsistency**: Mobile version shows different data than desktop",
      "**Device variation**: Works on one device, broken on another"
    ],
    faqs: [
      {
        q: "Do I need separate mobile and desktop layouts?",
        a: "Yes - Power BI supports separate mobile layout for optimization. Desktop layout used by default."
      },
      {
        q: "What's the minimum screen size to consider for mobile?",
        a: "Design for phones (5-6 inch) as minimum. Test on tablets and larger screens too."
      }
    ],
    examTips: [
      "Know mobile layout is separate from desktop layout",
      "Understand touch-friendly design principles for mobile",
      "Remember performance optimization important for mobile"
    ],
    resources: [
      {
        title: "Create mobile-optimized Power BI reports",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-mobile-optimized-reporting",
        type: "Documentation"
      }
    ]
  },

  "Design and configure Power BI reports for accessibility": {
    overview: {
      title: "Inclusive Design for All Users",
      concepts: [
        "Accessibility ensures reports usable by people with disabilities",
        "Visual accessibility: color contrast, text size, visual clarity",
        "Navigation accessibility: keyboard navigation, screen readers",
        "Cognitive accessibility: clear language, logical structure",
        "Standards: WCAG guidelines, accessibility checkers"
      ]
    },
    bestPractices: [
      "Use accessible color combinations (sufficient contrast ratios)",
      "Provide alt text for visuals and images",
      "Use semantic headings and logical tab order",
      "Ensure keyboard navigation works throughout report",
      "Test with accessibility tools (color contrast checker, screen readers)",
      "Document accessibility considerations for team"
    ],
    commonMistakes: [
      "Low contrast text hard to read (light text, light background)",
      "Missing alt text on visuals",
      "Poor keyboard navigation (tab order wrong)",
      "Over-reliance on color alone to convey information",
      "Not testing with actual assistive technologies",
      "Small text sizes excluding low-vision users"
    ],
    keySteps: [
      "Check color contrast: WCAG AA (4.5:1 text, 3:1 graphics) minimum",
      "Add alt text to all visuals: right-click visual > Alt text",
      "Ensure keyboard navigation: Tab, Enter work throughout report",
      "Use themes with accessible color palettes",
      "Test with screen reader (NVDA free tool)",
      "Validate with accessibility checker tools"
    ],
    keyDecisions: [
      "**Alt text for every visual?** - Yes - screen reader users need descriptions",
      "**Keyboard-only navigation sufficient?** - Yes - essential accessibility",
      "**Color alone to convey meaning?** - No - use additional indicators (icons, patterns)"
    ],
    keyDefinitions: [
      "**Accessibility**: Usability by people with disabilities",
      "**Color Contrast**: Ratio between text and background brightness",
      "**Alt Text (Alternative Text)**: Description of visual for screen readers",
      "**Screen Reader**: Software that reads text aloud for blind/low-vision users",
      "**Keyboard Navigation**: Using Tab, Enter, arrow keys instead of mouse",
      "**WCAG (Web Content Accessibility Guidelines)**: Standards for web accessibility"
    ],
    risks: [
      "**Legal**: Failing accessibility standards may violate regulations (ADA, etc.)",
      "**Exclusion**: Inaccessible reports exclude users with disabilities",
      "**Frustration**: Poor accessibility frustrates assistive technology users",
      "**Missed insights**: Important users can't access critical data",
      "**Compliance**: Organizations may face penalties for non-compliance",
      "**Reputation**: Poor accessibility damages organizational reputation"
    ],
    faqs: [
      {
        q: "What color contrast ratio do I need?",
        a: "WCAG AA standard: 4.5:1 for normal text, 3:1 for large text and graphics."
      },
      {
        q: "Do all visuals need alt text?",
        a: "Yes - all visuals should have alt text describing key insights and data patterns."
      },
      {
        q: "How do I test accessibility of my reports?",
        a: "Use tools: color contrast checker, WAVE accessibility plugin, screen reader (NVDA free)."
      }
    ],
    examTips: [
      "Know accessibility standards: color contrast (WCAG AA), alt text, keyboard navigation",
      "Understand assistive technologies: screen readers, voice input, magnification",
      "Remember testing with actual users with disabilities is crucial"
    ],
    resources: [
      {
        title: "Create accessible Power BI reports",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-accessibility-overview",
        type: "Documentation"
      },
      {
        title: "WCAG guidelines for accessibility",
        url: "https://www.w3.org/WAI/WCAG21/quickref/",
        type: "External Standard"
      }
    ]
  },

  "Configure automatic page refresh": {
    overview: {
      title: "Real-Time Data Updates in Reports",
      concepts: [
        "Automatic refresh updates visuals on schedule without manual refresh",
        "Refresh types: Fixed interval (every 5 minutes) or detect data changes",
        "Premium features enable faster refresh (auto and 1-minute intervals)",
        "Refresh preserves user filters and selections",
        "Power consumption and performance considerations for frequent refresh"
      ]
    },
    bestPractices: [
      "Set appropriate refresh intervals (not too frequent to impact performance)",
      "Use auto refresh only when data freshness is critical",
      "Provide user indication when data was last refreshed",
      "Test refresh behavior with actual data changes",
      "Document refresh configuration for users",
      "Monitor refresh impact on performance and resources"
    ],
    commonMistakes: [
      "Too-frequent refresh (excessive power consumption, slowdowns)",
      "Refresh not happening (wrong settings or permissions)",
      "Users unaware of refresh timing (thinking data is stale)",
      "Refresh breaking visuals (formula errors after refresh)",
      "Not testing refresh behavior",
      "Refresh on wrong page scope"
    ],
    keySteps: [
      "Go to View > Page refresh",
      "Choose refresh type: Fixed interval or Auto (Premium only)",
      "Set refresh interval (minimum 5 minutes without Premium)",
      "Enable: Report page refreshes automatically at set interval",
      "Test refresh by waiting for interval or triggering manually",
      "Verify filters and selections preserved after refresh"
    ],
    keyDecisions: [
      "**Refresh needed?** - Static data: no; Real-time requirements: yes",
      "**Refresh interval?** - Business critical: 5-15 min; Standard: 30+ min; Non-urgent: hourly",
      "**Page or report level?** - All pages: report level; Specific page: page level"
    ],
    keyDefinitions: [
      "**Automatic Refresh**: Scheduled data refresh without user action",
      "**Fixed Interval**: Refresh every N minutes (5 min minimum without Premium)",
      "**Auto Refresh**: Detect and refresh when underlying data changes (Premium only)",
      "**Refresh Interval**: Time between automatic refresh cycles",
      "**Preserve State**: Filters and selections maintained through refresh"
    ],
    risks: [
      "**Performance**: Frequent refresh slows report responsiveness",
      "**Power consumption**: Excessive refresh impacts resource usage",
      "**Stale data**: Refresh too infrequent leaves data outdated",
      "**Refresh failures**: Network issues prevent refresh",
      "**User confusion**: Refresh timing unclear to users",
      "**License limits**: Frequent refresh may exceed Premium refresh limits"
    ],
    faqs: [
      {
        q: "How frequently should I set automatic refresh?",
        a: "Depends on business need. Critical real-time: 5-15 minutes. Standard: 30+ minutes. Non-urgent: hourly or manual."
      },
      {
        q: "Do filters stay after automatic refresh?",
        a: "Yes - user selections and filters are preserved through refresh."
      },
      {
        q: "Can I refresh more frequently than 5 minutes?",
        a: "Yes, with Power BI Premium license (down to 1-minute intervals)."
      }
    ],
    examTips: [
      "Know refresh types: fixed interval and auto (Premium only)",
      "Understand refresh preserves user state",
      "Remember minimum interval without Premium is 5 minutes"
    ],
    resources: [
      {
        title: "Configure page refresh in Power BI",
        url: "https://learn.microsoft.com/power-bi/create-reports/desktop-automatic-page-refresh",
        type: "Documentation"
      }
    ]
  }
};
