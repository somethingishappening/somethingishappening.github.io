HARRI.LA — RESEARCH ABSTRACT DETERMINISTIC FIRST-SCREEN FIX

Replace ONLY:
  _layouts/research.html

What changed:
- The desktop Research intro no longer relies on a percentage min-height resolving
  at a particular moment during font / unified-scale / viewport settling.
- It measures the actual visible .paper height and uses that as the intro min-height.
- Short abstracts remain bottom-aligned within the first Research screen.
- Long abstracts expand naturally and are never pushed below the first screen.
- Initial resize/visualViewport events can no longer cancel the initial reveal.
- A ResizeObserver keeps the first-screen height synchronized with the real paper area.

Nothing else is included or replaced.
