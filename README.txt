HARRI.LA — menu/footer consistency + About ASCII game fix

Replace ONLY:
  _includes/nav.html
  _layouts/about.html

MENU / FOOTER
  • One shared navigation typography source on every template.
  • Desktop 901–1680:
      section labels 17px / 18.7px
      project names 17px / 18.7px
      Harrilanpuisto 17px / 18.7px
      footer 13px / 1.15
  • Above 1680 the same menu/footer scale is applied to ALL templates.
  • Mobile footer leading is identical across templates.
  • Existing project-name underline animation is untouched.
  • Existing menu accordion/open-close logic is untouched.

ABOUT GAME
  • Fullscreen ASCII is fitted before it becomes visible, removing the size jump.
  • Automatic greeting changes can no longer collide with manual game transitions.
  • After the ASCII closes, a complete greeting interval starts fresh.
  • CMS click-count and greeting-timing controls remain unchanged.

No .pages.yml changes.
No Research/Work/Harrilanpuisto layout files changed.
