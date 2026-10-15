SURPRISE IMAGE BEHAVIOR ONLY

Replace only: _layouts/about.html

Base: exact harri-about-cv-stable-size-v3 About layout.
Changed only surprise-image reveal behavior:
- preserves all CV typography/sizing/spacing
- preserves current CMS image selection and links
- loads surprise image while hidden (needed for CMS URL images)
- uses existing v57 0.12s opacity + translateY(8px) ease-out reveal
- once revealed, it stays visible for that About visit, avoiding the CMS image-load scroll-height race

No other layout, navigation, greeting, CMS field, or content logic changed.
