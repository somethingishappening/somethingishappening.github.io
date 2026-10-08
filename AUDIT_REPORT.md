# Audit report

This package was rebuilt from the user's uploaded v83 CMS package and checked against the uploaded v75 standalone demo.

Fixed:
- malformed fullscreen shrug ASCII JavaScript that prevented the About-page script from running
- the same malformed fallback ASCII in the CMS About layout
- About-page Geist font stack now has safe sans-serif fallbacks
- fullscreen ASCII Geist stack now has safe fallbacks
- removed YAML anchors/aliases from `.pages.yml` for a simpler Pages CMS configuration

Checks completed:
- `_config.yml`, `.pages.yml`, data YAML, and Markdown front matter parse successfully
- JavaScript syntax passes for About, Research, Work, and Harrilanpuisto CMS layouts
- JavaScript syntax passes for all standalone demo pages
- all current `/assets/...` references point to files present in the package
- browser interaction test on the corrected About page:
  - greeting changes on click
  - navigation accordion opens
  - mobile menu opens
  - 10th click shows fullscreen ASCII
  - fullscreen ASCII is RGB(255, 0, 0)
  - Geist is first in the computed font stack

- FINAL v124 repository consolidation:
  * Built from the user's uploaded GitHub repository, preserving current project
    Markdown files, _data, and uploaded media.
  * Replaced _includes and _layouts with the complete latest v123 code baseline.
  * Corrected the malformed .pages.yml description that prevented Pages CMS from
    loading the new Research fields.
  * YAML parses successfully.
  * Research CMS includes descriptor, Abstract, Heading level, navigation controls,
    figure-number mapping, separate main-menu name and optional mobile Research name.
  * Latest navigation, Arabic typography, baseline alignment, short-height protection,
    mobile dual-menu behavior and Research divider spacing are included.

- v125 Research navigation hierarchy/rhythm:
  * H1 -> H2/H3 uses normal continuous leading with no extra group gap.
  * H2/H3 -> H2/H3 uses the same normal leading.
  * H2/H3 -> next H1 adds the existing navigation group gap:
    12px desktop / 10px mobile.
  * H1 remains bold in navigation.
  * H2 and H3 are visually identical in navigation: regular weight, no underline.
  * Article H1/H2/H3 typography is unchanged.

- v126 Research navigation spacing correction:
  * Restored the chapter-group gap between Abstract and the first H1.
  * Abstract -> first H1: 12px desktop / 10px mobile.
  * H1 -> H2/H3 remains normal leading.
  * H2/H3 -> H2/H3 remains normal leading.
  * H2/H3 -> next H1 remains 12px desktop / 10px mobile.
  * H3 remains visually identical to H2 in the navigation.

- v127 Research navigation arrow stability:
  * Replaced top-only arrow animation with translate3d transform animation.
  * Horizontal and vertical arrow movement now animate as one motion.
  * Arrow target is cached, so article scrolling does not repeatedly restart
    the same transition while the active navigation item is unchanged.
  * Geometry is force-recalculated on resize and mobile navigation scrolling.
  * Active-section detection, navigation spacing, typography and links are unchanged.

- v128 Research resize/text-overlap fix:
  * Fixed the structural cause of Research text overlapping after resize.
  * The Abstract flex panel can no longer shrink below its real content height.
  * Short Abstracts still occupy the first desktop screen and align to the footer.
  * Long Abstracts expand naturally; subsequent article sections start only
    after the Abstract's actual content ends.
  * Article sections/research-copy explicitly remain auto-height normal flow.
  * Desktop baseline alignment now disables its transform when the target text
    is taller than the available footer-alignment space; alignment resumes
    automatically once the content fits again.
  * No Research typography, navigation spacing, figure behavior, arrow logic,
    mobile navigation, or desktop column proportions changed.

- v129 Research navigation arrow:
  * Removed the old late CSS rule that still overrode the v127 transform
    animation with top/left transitions.
  * Arrow now uses one authoritative transform animation everywhere.
  * Glide changed to 460ms cubic-bezier(.16,1,.3,1) for a softer motion.
  * Desktop and mobile x/y positions use subpixel values rather than integer
    rounding, reducing visible stepping.
  * Initial placement and resize repositioning are instantaneous.
  * Only genuine active-section changes animate.
  * Navigation hierarchy, spacing, typography and active-section selection
    remain unchanged.

- v130 Research hierarchy arrow fallback + bullet indentation:
  * The Research arrow no longer defaults to Abstract when the current section
    is hidden from navigation.
  * Hidden H3 -> visible H2 parent; if H2 is hidden -> H1 chapter.
  * Hidden H2 -> H1 chapter.
  * Abstract is selected only while the reader is actually in Abstract.
  * currentSectionId now recognizes H3 headings explicitly.
  * CMS semantic bullet lists use a hanging indent.
  * Literal paragraphs beginning with `• ` are auto-detected and receive the
    same hanging-indent behavior, so wrapped lines align under the first
    letter after the bullet.

- v131 Research resize overlap + bullet geometry:
  * Removed transform-based footer alignment from the Research Abstract.
  * Research Abstract alignment now changes the intro container min-height,
    which participates in document flow and therefore moves subsequent article
    sections with it.
  * Long Abstracts naturally expand; no transformed Research text remains.
  * All Research sections/research-copy blocks are explicitly normal-flow,
    auto-height and non-contained.
  * Semantic CMS bullet lists now use native outside list markers.
  * Literal paragraphs beginning with `• ` are converted to real <ul>/<li>
    structures instead of approximated with text-indent.
  * Wrapped bullet lines therefore align exactly with the first letter after
    the bullet marker.
  * Research navigation, figures, heading hierarchy and arrow behavior remain
    unchanged.

- v132 Research cross-screen desktop/laptop consistency:
  * Replaced fixed Research desktop column assumptions with fluid columns.
  * Left rail scales between 170–220px; center/right proportions remain stable.
  * Large project-title lines may wrap within their own column instead of
    being clipped by white-space:nowrap.
  * Large title scales fluidly between laptop and large-desktop widths.
  * Right text navigation can shrink/wrap inside its own rail.
  * Figure stage is no longer absolutely positioned at 43.5vh.
  * Navigation and figure now occupy separate normal-flow grid rows, so a
    figure can never cover or hide the Research navigation.
  * Right rail can scroll internally only if its combined navigation/figure
    content is taller than the available viewport.
  * Removed Research Abstract resize-alignment JS; the first screen now uses
    pure normal-flow flex layout, eliminating resize timing glitches.
  * Short Abstracts still sit at the bottom of the first screen; long Abstracts
    expand naturally.
  * Mobile layout, Research menu behavior, arrow behavior, heading hierarchy,
    figures and CMS structure are unchanged.

- v134 Research interaction-model restoration:
  * Restored the original fixed viewport on desktop.
  * Restored the internally scrolling Research article column.
  * The whole webpage no longer scrolls on desktop.
  * Left navigation and right Research rail stay stationary as before.
  * Removed descriptor transform alignment to avoid resize-position glitches.
  * Large project-title lines may wrap inside their own column instead of clipping.
  * Restored original Research navigation placement.
  * Restored the exact shared figure hanging line at 43.5vh.
  * Long Research navigation scrolls within the space above the hanging line,
    preventing figures from covering it.
  * Mobile behavior is unchanged.
