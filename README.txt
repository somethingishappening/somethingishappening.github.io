HARRI.LA — Upper-resolution layer v2

Baseline: harri-cv-research-text-abstract-alignment-fix.zip

This revision fixes the large-screen trigger and resize jump in v1.

What changed from v1:
- no hard min-height trigger
- scaling starts smoothly above the 1680px desktop reference
- every scaled measurement uses the smaller of viewport-width and viewport-height growth
- this prevents wide/short windows from suddenly enlarging and prevents a jump at the breakpoint
- growth is capped at 4/3

Preserved exactly:
- Work media/gallery spacing
- About baseline proportions
- Research figure hanging line (43.5vh)
- CMS controls/content logic
- mobile rules and mobile layout
- Mini-CV/Abstract/surprise-image/hidden-section-arrow fixes from the chosen baseline

Install:
Copy _includes/upper-resolution-layer.html and the four _layouts files into the same paths in the repository.
