Mobile main project title smart-fit

Replace:
  _layouts/work.html
  _layouts/research.html

Rule at <= 900px:
- Existing CMS-authored title lines remain the preferred lines.
- If a line exceeds the available width by about 2.5 average glyphs or less,
  the entire H1 is reduced uniformly just enough to keep that line intact.
- The automatic reduction is capped at 12% (minimum scale 0.88).
- If more reduction would be needed, the existing mobile font size is kept
  and the line wraps naturally instead.
- Desktop behavior is unchanged.
