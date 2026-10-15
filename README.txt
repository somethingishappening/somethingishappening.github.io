Replace only: _layouts/about.html

This patch changes only the surprise-image reveal animation.
The Mini-CV layout, typography, sizing, spacing and responsive behavior are unchanged.
The surprise remains display:none before its existing reveal trigger, so it reserves no space.
At reveal it is inserted at opacity 0, then fades to opacity 1 over 0.55s with easing.
