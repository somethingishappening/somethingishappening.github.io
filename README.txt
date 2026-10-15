Harri.la — surprise image behavior only

Replace ONLY:
  _layouts/about.html

Source baseline:
  harri-about-cv-stable-size-v3/_layouts/about.html

Changed behavior only:
- Removed the later display:none/display:block override for .cv-surprise.
- Restored the v57 end-of-CV reveal logic.
- Surprise remains opacity:0 / visibility:hidden / translateY(8px) until the end.
- At the end it eases to opacity:1 / translateY(0) using the existing v57 0.12s ease-out transition.
- Moving away from the end hides it again, matching v57.

Unchanged:
- Mini-CV typography, sizing, spacing, and content
- CMS fields and random surprise-image selection
- Surprise-image optional link support
- Greeting/game
- Navigation
- Biography
- All other layouts and files
