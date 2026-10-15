HARRI.LA — About bio midpoint + Mini-CV bottom-space fix

Replace ONLY:
  _layouts/about.html

BIO
• Desktop bio still uses the page's existing intended font size.
• Its final text baseline still aligns to the footer.
• New hard rule: the TOP of the bio may never rise above 50% of the viewport.
• If the preferred font size would violate that rule, JavaScript reduces the
  font size only as much as necessary.
• The largest font size that fits is selected.
• Recalculates on viewport resize/orientation change.
• Mobile is unchanged.
• Bio is measured while optically hidden on first load, so the fitting itself
  is not shown as a visible jump.

MINI-CV
• The hidden surprise image now uses display:none until it is genuinely
  revealed, so it occupies ZERO invisible space below the CV.
• Desktop CV bottom padding is zero, removing the remaining artificial tail.
• Once the visitor genuinely reaches the end, the surprise image can still
  reveal normally.
• No About content or CMS settings changed.

NOT CHANGED
• _includes/upper-resolution-layer.html
• navigation
• Research
• Work
• Harrilanpuisto
• .pages.yml
