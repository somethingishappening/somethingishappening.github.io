HARRI.LA Research navigation arrow fix

Replace these files in the repository:
- _layouts/research.html
- research_0.js

The live layout fix is in _layouts/research.html. research_0.js is included as the matching source/snapshot so the repository stays consistent.

Changes:
1. Sections set to "Do not show" no longer become arrow stops. The arrow stays on the nearest preceding visible navigation item (Abstract is the initial fallback).
2. The modern per-section Show in navigation settings take precedence over legacy toc_columns data, including when every article section is hidden.
3. Mobile Research links no longer trigger two competing smooth-scroll handlers.
