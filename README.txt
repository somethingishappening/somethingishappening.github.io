HARRI.LA Research — numbered list typography/rhythm fix

Replace:
  _layouts/research.html

Fix:
  • Numbered-list text now matches Research running/bullet text:
      desktop: 18px / 1.2
      narrower desktop: 17px / 1.2
      mobile: 17px / 1.16
  • List-item vertical spacing now matches bullet-list rhythm (14px).
  • Only the 1. 2. 3. marker uses tabular lining numerals.
  • Numbers inside list text remain normal Geist numerals.
  • Custom counters remain, so markers are not cropped.
