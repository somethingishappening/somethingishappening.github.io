HARRI Research v6.7 stability fix

Replace BOTH files together:
- _layouts/research.html
- _includes/upper-resolution-layer.html

This package keeps the v6.5 responsive typography/scaling layer and adds:
1. Direct rendered-line alignment between the Abstract's final prose line and the footer email line.
2. Alignment based on the actual resolved intro height, including naturally-tall Abstract cases.
3. Re-alignment after late font/layout size changes.
4. Iterative Research figure fitting so caption reflow is re-measured after the image shrinks.

Unchanged:
- mobile layout
- 43.5vh Research figure hanging line
- CMS figure size/alignment controls
- Research navigation/arrow behavior
- Work spacing fixes
