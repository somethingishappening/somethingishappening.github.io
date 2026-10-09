HARRI.LA — UPPER-RESOLUTION LAYER ONLY
======================================

BASELINE
--------
This package starts from the state represented by:
  harri-cv-research-text-abstract-alignment-fix.zip
for About + Research, combined with the current GitHub Work and
Harrilanpuisto layouts.

WHAT CHANGED
------------
Only one new include is added to the four desktop templates:
  {% include upper-resolution-layer.html %}

All upper-resolution CSS is isolated in:
  _includes/upper-resolution-layer.html

WHEN IT RUNS
------------
Only when BOTH are true:
  viewport width  > 2000 CSS px
  viewport height >= 1000 CSS px

Normal desktop, laptop, tablet and mobile output is unchanged.
Growth is proportional from the existing 1920px reference and capped
at 4/3 scale by 2560px.

EXPLICITLY PRESERVED
--------------------
- Work media/gallery spacing remains exactly 18px.
- About keeps the same 220 : flexible : 300 column relationship,
  scaled proportionally only in the upper-resolution layer.
- Research figure hanging line remains exactly top: 43.5vh.
- CMS controls and content logic are untouched.
- Mobile rules are untouched.
- Existing Research navigation/arrow/Abstract fixes are untouched.
- Existing Mini-CV typography/alignment and surprise-image fix remain.

FILES TO COPY
-------------
Replace:
  _layouts/about.html
  _layouts/work.html
  _layouts/research.html
  _layouts/harrilanpuisto.html

Add:
  _includes/upper-resolution-layer.html
