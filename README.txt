HARRI.LA — CV Research typography + Abstract alignment fix

Replace these files in the repository:
  _layouts/about.html
  _layouts/research.html

Changes:
- Mini-CV body matches Research running text exactly:
  18px / 1.2 on wide desktop, 17px / 1.2 at 901–1180px, 17px / 1.16 mobile.
- Mini-CV section titles use Research H2 typography, but retain zero top margin
  so the first title stays top-aligned as before.
- Clicking Abstract in the desktop Research navigation returns the internal
  article scroller to scrollTop 0, matching the initial project-opening alignment.
- Existing surprise-image behavior and hidden-section arrow fallback are preserved.
