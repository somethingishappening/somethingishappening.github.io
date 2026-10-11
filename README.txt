HARRI.LA — Research load-jump fix

Based on the current Research baseline and keeps the existing
{% include upper-resolution-layer.html %} hook intact.

Replace only:
  _layouts/research.html

What changed:
- opening scroll/reset happens before the visible frame instead of two rAFs later
- Abstract/footer baseline calculation is performed in one layout cycle
- the Research layout is withheld for a single initialization frame so the first
  visible frame already has the final geometry

Untouched:
- upper-resolution-layer.html itself (keep your current v6.2 file)
- Work/About/Harrilanpuisto
- Research 43.5vh figure hanging line
- figure CMS controls and fit logic
- hidden-section arrow fallback
- Abstract nav scrollTop:0 behavior
- mobile layout/navigation
