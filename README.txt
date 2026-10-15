HARRI.LA — v7.2 Abstract first-screen + Mini-CV fill

Replace ONLY:
  _layouts/about.html
  _layouts/research.html

RESEARCH ABSTRACT
• No alignment code is allowed to increase the first-screen height anymore.
• The intro remains a one-screen composition.
• Last actual Abstract prose baseline is measured against the last visible footer baseline.
• The Abstract copy is translated by exactly that difference inside the fixed first screen.
• Works upward or downward without changing document flow or pushing the article down.
• Initial hidden-until-settled behavior remains, so there is no opening jump.
• Existing list-size and navigation-arrow fixes are preserved.

ABOUT / MINI-CV
• Unified v7 site scaling remains unchanged.
• Bio stays bottom-aligned and never rises above the midpoint.
• If the visible Mini-CV ends above the bottom, the unused height is distributed
  between CV sections, so the final visible CV entry reaches the bottom line.
• No fake padding is placed below the final CV item.
• CV typography remains unchanged.
• When the CV needs this expansion, the large bio reduces slightly (max 8%)
  for visual balance, then its existing midpoint-fit rule still applies.
• If the CV already fills/overflows the column, no vertical stretching is added.
• Surprise image and greeting game remain active.
• When surprise image appears, the CV balance is recalculated automatically.

UNCHANGED
• _includes/upper-resolution-layer.html
• .pages.yml
• Work / Harrilanpuisto / navigation
• mobile layout
