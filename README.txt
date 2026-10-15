HARRI.LA — RESEARCH ABSTRACT FIT RETRY

Replace only:
  _layouts/research.html

Source:
  Exact last-good v7.4 Research template.

Only two functional changes were made:
1. Desktop Research intro CSS: height:100% -> height:auto, while keeping min-height:100%.
2. The Research baseline-alignment JavaScript now applies height:auto instead of restoring height:100%.

Effect:
- If the title + Abstract fit in one Research viewport, the existing bottom-aligned first-screen appearance remains.
- If they do not fit, the intro may grow naturally so the Abstract begins after the title instead of being pushed below the visible first screen.

No navigation, typography, figure, column, CMS, mobile, Work, About, or Harrilanpuisto files are changed.
