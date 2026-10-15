HARRI.LA — RESEARCH ABSTRACT VISIBILITY FIX ONLY

Replace exactly this file in GitHub:
  _layouts/research.html

Source:
  last-good v7.4 restore state

Only code change:
  Research desktop intro height changes from fixed height:100% to height:auto,
  while keeping min-height:100%.

Effect:
  - If title + Abstract fit in the first Research viewport, existing first-screen
    bottom alignment remains unchanged.
  - If the real browser viewport/zoom/font metrics make the content taller,
    the intro can grow naturally instead of pushing the Abstract below the
    visible reading area.

Untouched:
  navigation, Research figures, 43.5vh hanging line, typography, columns,
  Work, About, Artistic Work, Harrilanpuisto, CMS configuration/content.
