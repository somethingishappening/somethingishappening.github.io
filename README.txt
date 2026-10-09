HARRI.LA — UPPER RESOLUTION LAYER v3

Replace only:
  _includes/upper-resolution-layer.html

No layout files need replacing if v2 is already installed.

Checked target behaviour:
- <= 1680px wide, including 1680x1050: upper-resolution layer is inactive.
- 1920x1080: gentle proportional enlargement begins.
- 2560x1440: horizontal grid keeps the 1680 reference proportions.
- 3440x1440 ultrawide: side rails/gaps/padding continue scaling horizontally;
  typography/vertical rhythm is limited by 1440px height.
- 4096x2304: layout continues to use the screen proportionally; typography is
  capped at 2x to avoid runaway enlargement.

Preserved:
- Work media/gallery 18px spacing
- About baseline proportions
- Research top:43.5vh figure hanging line
- Research figure-fit/CMS width controls
- Mobile/tablet behavior
- Existing navigation/scroll logic
