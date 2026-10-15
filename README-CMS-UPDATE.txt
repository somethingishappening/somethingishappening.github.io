HARRI.LA — CMS CV / RESEARCH TYPOGRAPHY + SURPRISE FIT PATCH
Date: 2026-10-15

FILES TO REPLACE IN YOUR GITHUB REPOSITORY
1. _layouts/about.html
   - Mini-CV running text follows Research running-text responsive logic.
   - Desktop >1180px: 18px / 1.15.
   - Desktop/tablet 901–1180px: 17px / 1.15.
   - Mobile <=900px: 17px / 1.16.
   - CV section headings follow the Research heading sizing logic.
   - On tall desktop viewports, the complete visible CV scales uniformly upward only when its natural content would leave empty vertical space.
   - The surprise image is excluded from the fit calculation and cannot reveal on first load.
   - The surprise is armed only after real downward traversal/scrolling.
   - Desktop CV bottom padding and the hidden-image translate gap are removed, preventing a blank strip before the reveal.
   - Existing random surprise-image selection from the CMS is preserved.
   - Existing greeting/ASCII CMS fields remain editable.

2. .pages.yml
   - Included as the matching Pages CMS configuration.
   - No new CMS fields were required for this change.
   - If your current .pages.yml already matches, replacing it is optional.

UNCHANGED
- Research layout/scrolling/navigation/figure hanging line.
- Work / Artistic Work templates.
- Harrilanpuisto.
- Existing CMS content and project data.

IMPORTANT
This is a CMS-source patch, not the standalone preview. Keep the folder path exactly as shown when uploading to GitHub.
