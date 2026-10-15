HARRI.LA — Research arrow + About Mini-CV auto-fit

Replace ONLY:
- _layouts/research.html
- _layouts/about.html

Research:
- Keeps the current deterministic Abstract fix.
- The exact EPS navigation arrow now scales directly with the rendered TOC font size.
- 13px TOC = 14px arrow (unchanged reference size).
- Arrow-to-text gap scales by the same ratio.

About:
- Desktop/laptop/TV only (>900px).
- Starts from the existing unified site scale.
- If visible Mini-CV content leaves unused space below it, CV body type, headings, item spacing and section spacing grow together until the last visible CV line reaches the bottom of the column.
- If the natural CV is already taller than the column, no extra scale is applied and normal CV scrolling remains.
- Surprise image is excluded from the fit and stays hidden until the existing user-traversal reveal logic.
- Mobile is untouched.

No other files are changed.
