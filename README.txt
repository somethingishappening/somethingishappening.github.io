HARRI.LA — Sitewide IBM Plex Sans Arabic consistency fix

Replace only:
  _includes/arabic-typography.html

What this does:
  • Latin typography remains Geist.
  • Arabic text anywhere on the site is rendered in IBM Plex Sans Arabic.
  • Works for mixed Arabic/Latin sentences by wrapping only the Arabic run.
  • Works for Research, Work, About, Harrilanpuisto, CV, captions and navigation.
  • Handles all Arabic greetings, not only one hard-coded greeting.
  • Handles dynamically injected CMS/JavaScript content and later text changes.
  • Predominantly Arabic blocks automatically receive RTL direction.
  • No layout/template/CMS fields are changed.

All current layouts already include arabic-typography.html and already load
IBM Plex Sans Arabic from Google Fonts, so no other files need replacing.
