Harri.la — v57-faithful surprise behavior

Replace ONLY:
  _layouts/about.html

Built from:
  harri-about-cv-stable-size-v3/_layouts/about.html

Changes are limited to the surprise image:
- removed the later desktop display:none/display:block override that conflicts with v57
- restored the exact v57 bottom-of-scroll class-toggle logic
- restored the exact v57 desktop wheel behavior
- changed only the surprise image loading attribute from lazy to eager so CMS images are already loaded like v57's embedded image

No CV typography, sizing, section spacing, navigation, biography, greeting, CMS schema, Research, Work, Artistic Work, or Harrilanpuisto code was changed.
