HARRI.LA — v7.4 Research + Mini-CV source correction

REPLACE ONLY:
  _layouts/about.html
  _layouts/research.html

WHY THIS PATCH IS DIFFERENT
This does not change the unified desktop scaling layer.
It removes two concrete conflicts in the current files rather than adding
another layout system.

1. RESEARCH ABSTRACT
Current bug:
  The alignment JavaScript tries to translate the Abstract, while the current
  CSS simultaneously forces:
    .research-abstract-copy { transform:none !important; }
  Therefore the correction is blocked by CSS.

New behavior:
  • No transform is used.
  • Research first screen remains exactly one .paper viewport.
  • The normal trailing paragraph gap is removed only from the final Abstract
    block.
  • A tiny residual baseline difference is corrected through the last block's
    bottom margin while the Abstract remains bottom-aligned by flexbox.
  • The intro is never lengthened.
  • Following Research sections are never pushed farther down.
  • Fig. references are ignored when finding the final prose baseline.
  • Initial alignment is measured while the intro is hidden-but-laid-out, then
    the intro is revealed; no visible opening jump.

Local checks with the current unified scale:
  1280x800   residual baseline difference: 0px
  1440x900   residual baseline difference: ~0.02px
  1920x1200  residual baseline difference: ~0.02px
  3840x2160  residual baseline difference: 0px
  5120x2880  residual baseline difference: 0px

2. MINI-CV = RESEARCH BODY TYPOGRAPHY
Current mismatch removed:
  • no separate CV desktop size breakpoint
  • no viewport-dependent CV section-gap stretching
  • no separate CV body rhythm

Desktop Mini-CV now consumes exactly the same unified body source as Research:
  • font-size: --harri-u-body
  • line-height: 1.2
  • paragraph/item gap: --harri-u-space-14
  • H2 title size: --harri-u-body
  • H2 line-height: 1.2
  • H2 weight: 700
  • section spacing: --harri-u-space-26

Mobile remains:
  • 17px
  • line-height 1.16

The large About bio still follows the existing hard rule:
  • bottom aligned
  • never begins above the vertical midpoint
  • shrinks only if required to satisfy that rule

The greeting-click game and surprise-image behavior are preserved.

3. RESEARCH LISTS
Research ordered/unordered lists use exactly the same scaled body size and
1.2 leading as Research paragraphs.

4. RESEARCH SIDE-NAV ARROW
  • exact EPS shape preserved
  • constant 14 CSS px width across desktop resolutions
  • minimum 8px optical gap from text
  • active position is recalculated even if the active section did not change
  • reading threshold follows the unified site scale

UNCHANGED
  _includes/upper-resolution-layer.html
  .pages.yml
  _includes/nav.html
  _layouts/work.html
  _layouts/harrilanpuisto.html
  unified desktop scaling system
  Research figure hanging line / figure controls
  mobile breakpoint
