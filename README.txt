Mobile project-title fitting + Research Geist arrow

Replace:
  _layouts/research.html
  _layouts/work.html

Changes only:
- Mobile main project titles (<=900px): measure the real visible title width after layout.
  * If a CMS title line exceeds the available width by no more than ~3 average letters and needs no more than a 10% reduction, the entire H1 shrinks uniformly and the CMS line stays on one line.
  * Otherwise the normal mobile font size is kept and that title line wraps naturally.
- Research desktop/mobile TOC arrow is explicitly rendered with Geist at weight 400.

Desktop title sizing/layout is unchanged.
