HARRI.LA — unified resolution system v7

REPLACE ONLY:
  _includes/upper-resolution-layer.html
  _layouts/about.html
  _layouts/research.html

CORE RULE
All desktop templates use ONE scale derived from the 1680×900 reference.
Typography and the main structural shell shrink/grow together.

Scale examples:
  1280×800  -> 0.7619×
  1366×768  -> 0.8131×
  1440×900  -> 0.8571×
  1512×982  -> 0.9000×
  1680×1050 -> 1.0000×
  1728×1117 -> 1.0286×
  1920×1200 -> 1.1429×
  3840×2160 -> capped at 2.0000×
  4096×2304 -> 2.0000× checkpoint
  5120×2880 -> 2.5000× continuation

ABOUT
  • Bio remains bottom-aligned.
  • Bio can NEVER begin above the middle of the centre column.
  • If necessary, only the bio is reduced further until it fits the lower half.
  • Mini-CV width and typography use the same global scale.
  • Last CV section has no trailing margin.
  • Hidden surprise image uses display:none, so it reserves ZERO blank space.
  • Surprise image becomes part of the document only after the visitor really
    reaches the end, then stays revealed for that page visit.

SITEWIDE TYPOGRAPHY
The same scale controls:
  • Harri.la brand
  • welcome/greeting sizes
  • navigation section labels
  • project links
  • footer
  • project type/title
  • main H1 sizes
  • Work/Artistic/Harrilanpuisto descriptions
  • Research chapter/H2/H3/body/TOC/caption
  • Mini-CV body and headings

SITEWIDE STRUCTURE
The same scale controls:
  • left column
  • About right/CV column
  • page padding
  • main grid gap
  • major title/copy max-widths

RESEARCH ABSTRACT
  • stays invisible but measurable while initial geometry settles
  • waits for fonts
  • clean-layout frame
  • baseline-alignment frame
  • reveal frame only after the final geometry is committed
  • no fade and no visible correction jump
  • re-aligns after the shared resolution scale changes

UNCHANGED
  • mobile <=900px
  • CMS
  • Work layout file
  • Harrilanpuisto layout / 3-column masonry
  • Research figure controls and 43.5vh hanging line
  • menu underline behavior
