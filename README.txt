HARRI.LA — corrected minimal feature patch (layout preserved)

IMPORTANT
This rebuild starts from the latest pre-regression files rather than older layouts.

Replace:
  .pages.yml
  _layouts/about.html
  _layouts/work.html
  _layouts/research.html
  _layouts/harrilanpuisto.html
  _includes/nav.html

Preserved exact current layout lineages:
  • About: Mini-CV Research-text / Abstract-alignment baseline
  • Work: latest mobile smart-title / Geist-arrow version
  • Research: v6.12.14 numbered-list rhythm version
  • Harrilanpuisto: v7 three-column variable-span masonry
  • Navigation underline: exact v6.12.4 project-only animated underline
  • Artistic Work navigation toggle preserved

New controls:
  • About -> Seconds between greeting changes
  • About -> Clicks before ASCII appears

Links:
  • Content links open in a new tab.
  • Main site navigation remains in the same tab.
  • Optional image links are available for:
      Research figures
      Research Work-template galleries
      Design Work galleries
      Artistic Work galleries
      Harrilanpuisto images
      About surprise images
  • Blank image-link field keeps the existing lightbox behavior.

NO new CSS layout overrides were added.
NO typography sizes, columns, spacing, grid widths, figure fitting,
mobile geometry or navigation underline animation were redesigned.
