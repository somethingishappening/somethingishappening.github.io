HARRI.LA — v7.3 CV rebalance + Abstract + arrow lock

REPLACE ONLY:
  _layouts/about.html
  _layouts/research.html

ABOUT / MINI-CV
• Keeps unified v7 site scaling unchanged.
• When the Mini-CV genuinely underfills its viewport:
    1. the CV/right column widens;
    2. the centre bio column automatically becomes narrower;
    3. the large bio reduces modestly for balance;
    4. any remaining vertical underfill is distributed between the actual
       CV sections, so the last section reaches the bottom.
• No padding or fake spacer is placed below the final CV item.
• If the CV already fills or overflows the viewport, the original column width
  and scrolling behavior are preserved.
• Surprise image and greeting-click game are preserved.

RESEARCH ABSTRACT
• Intro height is explicitly locked to exactly one visible paper viewport.
• Alignment can never lengthen the first screen.
• Last real Abstract prose baseline is matched to the last visible footer
  baseline with up to four sub-pixel residual passes.
• Alignment uses a transform only on Abstract copy, so the following article
  section is never pushed down.
• Existing hidden-until-settled initial paint behavior is preserved.

RESEARCH SIDE-NAV ARROW
• Exact EPS arrow retained.
• Arrow width is now a constant 14 CSS px at every resolution.
• Arrow gap has an 8px minimum and can increase with larger TOC text.
• Reading threshold now follows the unified site scale.
• Arrow coordinates are recomputed even when the active section is unchanged.
• Arrow is explicitly refreshed after unified desktop scaling.
• Existing hidden-section H2 fallback remains.

RESEARCH LISTS
• Existing v7.1 body-size list lock remains intact.

UNCHANGED
• _includes/upper-resolution-layer.html
• .pages.yml
• Work
• Harrilanpuisto
• shared navigation/menu underline
• mobile breakpoint / mobile layout
