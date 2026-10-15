HARRI.LA — v7.1 interaction + Research correction

Replace ONLY:
  _layouts/about.html
  _layouts/research.html

ABOUT
• Restores the greeting click game.
• Restores the fullscreen ASCII event.
• Restores automatic greeting timing.
• Restores the Mini-CV surprise image.
• Root cause fixed: the v7 About file declared `aboutCopy` twice in the same
  JavaScript scope, causing the entire About controller to fail parsing.
• About JavaScript is syntax-validated in this package.
• A real downward wheel/trackpad gesture now counts as CV traversal even when
  the visible CV happens to fit exactly in a tall viewport, so the surprise
  remains reachable without appearing automatically.
• Existing unified responsive scaling and bio-fit rule are preserved.

RESEARCH ABSTRACT
• Keeps flow-safe alignment (no transforms).
• Aligns the last actual Abstract prose baseline to the last visible footer
  baseline in BOTH directions.
• If Abstract is too high, intro height increases.
• If Abstract is too low, Abstract panel bottom inset moves it upward.
• Uses up to four tiny correction passes for fractional/Safari rounding.
• Old valid alignment stays visible until resize has settled.
• Initial hidden-until-settled behavior remains.

RESEARCH LISTS
• Bullet and numbered-list text now inherit the exact body-text size and
  leading at every desktop resolution.
• Mobile remains 17px / 1.16.
• Only ordered-list marker numerals retain lining + tabular numeral features.

RESEARCH SIDE-NAV ARROW
• Keeps the exact supplied EPS arrow.
• Desktop reference gap is now 8px at a 13px TOC size and scales with TOC text.
• Mobile gutter is also slightly increased.
• Existing cap-height vertical alignment remains unchanged.

UNCHANGED
• unified v7 scaling system
• .pages.yml
• navigation file
• Work layout
• Harrilanpuisto layout
• Research figure controls / hanging line
