HARRI.LA — Research mobile figure controls

Replace these two files in the repository:
  .pages.yml
  _layouts/research.html

New per-figure CMS controls:
  • Desktop / default image
  • Mobile image (optional; falls back to desktop image)
  • Desktop display size
  • Mobile display size (Same as desktop / 100% / 75% / 50% / 33%)
  • Desktop justification (Left / Center / Right)
  • Mobile justification (Same as desktop / Left / Center / Right)
  • Caption
  • Alt text

Behavior:
  • Desktop/laptop continues to use the existing hanging-line and figure-fit system.
  • Phone uses the mobile image when supplied.
  • Mobile size and justification can be independent from desktop.
  • “Same as desktop” keeps existing figures backward-compatible.
  • The mobile caption keeps the mobile CMS allocation width even if the image itself
    becomes narrower inside that allocation.
  • Mobile lightbox opens the mobile-specific image when one exists.
