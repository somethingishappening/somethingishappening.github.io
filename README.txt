HARRI.LA — CMS/game/greetings/links/menu underline update

Replace:
  .pages.yml
  _layouts/about.html
  _layouts/work.html
  _layouts/research.html
  _layouts/harrilanpuisto.html
  _includes/nav.html

NEW ABOUT CMS CONTROLS
  • Seconds between automatic greetings
    - default: 30
  • Clicks before fullscreen ASCII appears
    - default: 10

LINK BEHAVIOR
  • Content links added inside portfolio text open in a new tab.
  • The website's own main navigation still stays in the same tab.
  • mailto:, tel:, and # anchor links are not forced into a new tab.

OPTIONAL IMAGE LINKS
  • Research figures: Image link (optional)
  • Research Work-template gallery images: Image link (optional)
  • Design Work gallery images: Image link (optional)
  • Artistic Work gallery images: Image link (optional)
  • Harrilanpuisto images: Image link (optional)
  • About surprise images: Image link (optional)

  Leave Image link blank:
    -> existing image/lightbox behavior remains unchanged.

  Add a URL:
    -> clicking that image opens the URL in a new tab.

MAIN MENU UNDERLINE
  • Restored the original project-name-only draw animation.
  • scaleX(0 -> 1), left origin, .16s ease.
  • 1px line close to the baseline.
  • Section labels and footer links do not get the project-name underline.

PRESERVED
  • Harrilanpuisto 3-column variable-span masonry.
  • Research mobile/desktop figure controls.
  • Research numbered-list typography.
  • Artistic Work visibility toggle.
  • Existing navigation/mobile behavior.
