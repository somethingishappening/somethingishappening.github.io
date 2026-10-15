HARRI.LA — restore approved desktop scaling + Research Abstract no-jump

REPLACE ONLY:
  _includes/upper-resolution-layer.html
  _layouts/research.html

ABOUT / RESOLUTION RESTORATION
This returns to the earlier accepted scaling architecture:

1. 901–1680px
   • upper-resolution layer does NOT scale the layout at all
   • original page layouts are the source of truth
   • fixes regressions at:
       1280×800
       1280×832
       1440×900
       1512×982
       1680×1050

2. Above 1680px
   • preserves the established 1680×900 reference scaling
   • horizontal shell follows viewport width
   • type/vertical rhythm follows the limiting width/height scale
   • existing 4K cap and 4096→5120 continuation are preserved
   • fixes/returns the previously working behavior at:
       1728×1117
       1920×1200
       3840×2160
       4096×2304
       5120×2880

3. Preserved later fixes
   • Research high-resolution hierarchy rules
   • Research column-proportion fixes
   • Work high-resolution copy-width correction
   • Harrilanpuisto natural-height/gap fix
   • no v6.16 About/CV override remains

RESEARCH ABSTRACT
• preserves current v6.12.14 Research layout/features
• preserves optional image links
• preserves last-prose-line baseline target (Fig. refs are ignored)
• preserves Abstract -> scrollTop 0 behavior
• preserves Safari resize safety logic
• on initial navigation:
    - Abstract stays optically hidden while measurable
    - waits for actual font metrics
    - calculates final footer baseline once
    - reveals directly in final position
• no fade and no visible correction jump

UNCHANGED
• .pages.yml
• About layout file/content/game
• Work layout
• Harrilanpuisto layout/masonry
• mobile <=900px
