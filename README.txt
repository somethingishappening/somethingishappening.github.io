HARRI.LA Research — numbered-list crop fix

Replace:
  _layouts/research.html

Changes:
  • Replaces native ordered-list markers with custom CSS counters.
  • 1. 2. 3. still use OpenType lining + tabular numerals.
  • Explicit marker width + overflow:visible prevents clipping.
  • List text keeps normal Geist numerals.
  • Bullet lists and all other Research behavior remain unchanged.
