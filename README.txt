HARRI.LA — resolution restoration + Research Abstract opening stability

Replace ONLY:
  _includes/nav.html
  _layouts/about.html
  _layouts/research.html
  _layouts/harrilanpuisto.html

WHAT WAS WRONG
1. About and Harrilanpuisto had lost:
     {% include upper-resolution-layer.html %}
   Work and Research still had it.
   This made About/Harrilanpuisto behave differently across desktop resolutions.

2. The previous menu-consistency patch forced navigation text to 17px from
   901–1680px, overriding the established responsive scaling layer.

3. Research's correct Abstract baseline adjustment happened after first paint,
   so the intermediate position could briefly flash as a visible jump.

FIXES
• Restores upper-resolution-layer.html to About and Harrilanpuisto.
• Removes the forced 17px desktop-menu lock.
• Menu type once again follows the established shared resolution scale:
    901–1680 scales toward the 1680 reference;
    >1680 follows the existing upper-resolution continuation.
• Work/Research/About/Harrilanpuisto therefore use the same scaling system.
• Keeps the existing project-name underline animation.
• Keeps the latest About ASCII timing/game fix.
• Keeps content links / optional image-link behavior.
• Research final Abstract alignment is unchanged.
• The Research Abstract is hidden only during its tiny opening measurement
  window, then revealed at its final aligned position, eliminating the jump.

NOT CHANGED
• .pages.yml
• Research typography/hierarchy
• Research figure fitting
• Work layout
• Harrilanpuisto 3-column masonry
• mobile breakpoint (<=900px)
