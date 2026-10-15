Harri.la — proportional Mini-CV + Research typography fit

Replace ONLY these three files:
  _layouts/about.html
  _layouts/research.html
  _includes/upper-resolution-layer.html

Desktop behavior:
- Start from the established responsive typography at fit = 1.
- Measure the bottom of the LAST VISIBLE Mini-CV section, excluding the surprise image.
- If the last CV section already reaches/passes the bottom, keep fit = 1.
- If there is genuine white space below the last CV entry, scale the Mini-CV typography
  AND its internal vertical spacing proportionally until the last section reaches/slightly
  passes the bottom.
- Do not distribute blank space as extra section gaps.
- Do not shrink the CV when more CMS content is added.
- The surprise-image logic remains unchanged.

Research synchronization:
- The exact fitted Mini-CV multiplier is stored for the current desktop viewport.
- Research uses that same multiplier when navigating from About at that viewport.
- The established Research hierarchy is preserved:
    project title
    main H1
    chapter H1
    H2/H3/body
    TOC
    captions
  all grow by the same multiplier.
- Research body/H2/H3 therefore continue to match Mini-CV typography.

Mobile:
- <= 900px remains unchanged.

Validated desktop sample using the working About structure:
  1024x768   fit 1.118
  1280x720   fit 1.000
  1366x768   fit 1.000
  1440x900   fit 1.000
  1512x982   fit 1.003
  1680x1050  fit 1.000
  1728x1117  fit 1.000
  1920x1200  fit 1.000
  2560x1440  fit 1.000
  3440x1440  fit 1.000
  3840x2160  fit 1.000
  4096x2304  fit 1.040
  5120x2880  fit 1.040

These fit values depend on the actual CV content at runtime; the website measures them automatically.
