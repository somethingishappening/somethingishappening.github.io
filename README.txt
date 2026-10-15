HARRI.LA — About / Mini-CV resolution coherence v6.16

Replace ONLY:
  _includes/upper-resolution-layer.html

WHY
The About Mini-CV was using different scaling systems for text and column
width. This changed its line wrapping and proportions across resolutions,
especially 1920, 3840, 4096 and 5120. The lower-desktop layer also shrank
the CV below its established 17px/18px sizes.

NORMAL DESKTOP (901–1680)
  • Restores the established About desktop shell rather than continuously
    shrinking it.
  • 901–1100 keeps the compact 270px right column / 22px gap.
  • CV = 17px through 1180.
  • CV = 18px from 1181–1680.
  • Main-menu section names and project names = 17px / 18.7px.
  • Footer = 13px / 1.15.

HIGH RESOLUTION (>1680)
  • About uses one shared scale factor for:
      left column
      CV/right column
      gaps
      page padding
      greeting geometry
      About copy
      Mini-CV text and spacing
      About navigation
  • CV width and CV body size retain the exact same ratio at every resolution.
  • Scaling caps coherently at 2× through 4096×2304.
  • Above the 4096 checkpoint it continues proportionally:
      5120×2880 = exactly 1.25× the 4096 state.

TARGETED RESOLUTIONS
  1280×800
  1280×832
  1440×900
  1512×982
  1680×1050
  1728×1117
  1920×1200
  3840×2160
  4096×2304
  5120×2880

UNCHANGED
  • About content/game logic
  • .pages.yml
  • Work/Research/Harrilanpuisto layouts
  • Research figure/Abstract behavior
  • Harrilanpuisto masonry
  • mobile <=900px
