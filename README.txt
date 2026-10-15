Harri.la — surprise image responsive display fix

Replace ONLY:
  _includes/upper-resolution-layer.html

Change made:
- Removed only the desktop override that forced:
    .cv-surprise:not(.revealed) { display:none !important; }
    .cv-surprise.revealed      { display:block !important; }

Nothing else in the responsive scaling layer was changed.

Keep your current _layouts/about.html unchanged.
