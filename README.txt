HARRI.LA — upper-resolution layer v4 (5K-only fix)

This package is based on the previously working v3 wide-screen layer.
It changes only genuine 5K-class viewports:

  min-width: 4800px AND min-height: 2500px

Why:
At 5120×2880 the v3 horizontal shell continued scaling, but typography,
vertical spacing, and several content max-widths were still capped at 2×.
That made the composition fall out of proportion only at 5K.

What remains untouched:
- all sizes below the 5K query, including 1680, 1920, 2560, 3440, 4096
- mobile/tablet
- Work 18px media spacing
- Research 43.5vh hanging line
- Research CMS figure fit/width controls
- all content/CMS data

Replace only:
  _includes/upper-resolution-layer.html
