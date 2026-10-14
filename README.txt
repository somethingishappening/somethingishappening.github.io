HARRI.LA — IBM Plex Sans Arabic sitewide v2

Replace only:
  _includes/arabic-typography.html

Why v1 could miss text:
  It relied too much on recognizing larger Arabic phrases/blocks.

v2 behavior:
  • Every contiguous Arabic-script run is explicitly wrapped.
  • Each Arabic run receives IBM Plex Sans Arabic with an inline !important
    declaration, so template-level Geist rules cannot override it.
  • Mixed Arabic/Latin paragraphs retain normal mixed-script order.
  • Predominantly Arabic paragraphs receive RTL direction.
  • IBM Plex Sans Arabic is loaded by this include itself.
  • Dynamic CMS/JavaScript content and rotating greetings are reprocessed.
  • Latin text remains Geist.

No layout, CMS, figure, scaling, navigation or typography sizes are changed.
