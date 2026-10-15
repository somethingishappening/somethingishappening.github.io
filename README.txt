Harri.la About — exact v57 surprise-image behavior

Replace ONLY:
  _layouts/about.html

Source baseline:
  harri-about-cv-stable-size-v3/_layouts/about.html

Only surprise-image behavior was changed:
1. Removed the later desktop display:none/display:block override for .cv-surprise.
2. Restored the exact v57 reveal calculation and class toggle.
3. Restored the v57 desktop wheel behavior so the CV scroll event drives reveal.

Unchanged:
- Mini-CV typography, size, spacing, content, and CMS structure
- biography
- greeting/game
- navigation
- random surprise-image selection
- optional surprise-image link
- all other layouts/includes
