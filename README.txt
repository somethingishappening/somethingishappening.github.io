HARRI.LA Research v6.8 — true cross-browser baseline fix

Replace only:
  _layouts/research.html

Keep your current _includes/upper-resolution-layer.html unchanged.

Change:
- The final prose line and footer email are measured with zero-size inline baseline markers.
- Markers are inserted immediately after the final visible character, before whitespace / (Fig. n).
- This measures the browser's real typographic baseline rather than DOM Range line-box bottoms.
- Existing Research scaling, figures, CMS controls, hanging line, navigation and mobile rules are unchanged.
