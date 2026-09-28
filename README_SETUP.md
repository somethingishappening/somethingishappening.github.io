# Harri.la — Pages CMS setup

This is the CMS-ready version of the portfolio.

## Do I need to clone it?

No. You need a GitHub repository, but you do **not** need to use Git commands or clone the repo locally.

### Easiest setup

1. Create a new repository on GitHub, for example `harri-la`.
2. Extract `harri-pages-cms.zip`.
3. Upload the **contents inside the extracted folder** to the root of the GitHub repository.
   The repository root should contain `.pages.yml`, `_config.yml`, `_layouts/`, `_research/`, `_design/`, etc.
4. In GitHub open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then Save.
7. GitHub Pages will build this Jekyll site automatically whenever the repository changes.

## Connect Pages CMS

1. Open `https://app.pagescms.org`.
2. Sign in with GitHub.
3. Install the Pages CMS GitHub App when prompted.
4. Allow it to access your `harri-la` repository.
5. Open the repository in Pages CMS.
6. Pages CMS will read the included `.pages.yml`.

You should see:
- Design Research → Research projects
- Design Work → Design projects
- Artistic Work → Artistic projects
- General → Site settings / About page

## Adding Design / Artistic projects

Create a new project and fill in:
- Navigation title
- Navigation order
- Project type
- Large title lines
- Description
- Gallery

Inside **Gallery**, use `+ Add item` for as many images as you need. Gallery items can be removed or reordered.

The website navigation is generated automatically from the collection, so you never manually add a menu link.

## Adding Research projects

Create a Research project and add:
- Project title
- Large title lines
- Article sections
- Figures

Each Figure item is automatically numbered by its position in the Figures list.

Inside section text, type:

`[fig:1]`

The published site displays it as:

`(Fig. 1)`

and connects it to the first Figure image for desktop hover/focus, mobile inline display, lightbox, keyboard navigation and swipe navigation.

Use `[fig:12]` for Figure 12.

If you reorder figures, update the `[fig:X]` numbers in the text to match the new order.

## Uploaded images

Pages CMS stores project uploads in `assets/uploads/`.

The layouts continue to handle image proportions, responsive behavior, galleries, lightboxes and figure interactions.

## Publishing

Pages CMS edits the GitHub repository directly. Saving an edit creates a Git commit. GitHub Pages then rebuilds the live website.

There is no separate content database.

## Custom domain

After the GitHub Pages version is working, connect the final domain from:
GitHub repository → Settings → Pages → Custom domain.

## Research Project Overview: many titles and subtitles

The Research Project Overview is now structured like the two-column reference layout.

In Pages CMS, open:

**Design Research → Research projects → your project → Project Overview titles & subtitles**

You can use up to **two desktop columns**. Inside each column you can add:
- as many bold **Titles** as you want
- as many **Subtitles** as you want under each title

Each title may optionally link to an Article Section. Each subtitle links to an Article Section by its **Section ID**.

On mobile, the same navigation is shown as one scrollable vertical list. The top words "Project Overview" remain hidden in the mobile dropdown, as in the previous mobile design.



### Project Overview hierarchy

- **Project Overview** is a fixed, non-clickable navigation heading.
- **Header 1** entries are the bold group titles.
- **Header 2** entries are the clickable subtitles underneath each Header 1.

### Current-selection arrow

The arrow in a Research Project Overview follows the article section that is currently at the reading position. If the active subtitle is in the second desktop column, the arrow moves horizontally to that column as well. Clicking a subtitle moves the arrow to that exact subtitle immediately.

### Automatic Project Overview arrow

The Research Project Overview arrow follows the article as the reader scrolls. When the next linked Header 2 reaches the reading line near the top of the text column, the arrow automatically moves to that Header 2 in the navigation. Clicking a Header 2 moves the arrow there immediately; normal scrolling then takes over automatically.

### Typeface

The website now uses **Geist** throughout, loaded from Google Fonts. The fallback stack remains Arial, Helvetica, sans-serif in case the webfont cannot load.

## Harrilanpuisto

Harrilanpuisto is included as a separate image-only template but starts **hidden**.

In Pages CMS open **Harrilanpuisto**. You will see:

- **Show in website** — ON/OFF
- **Images** — add, remove and reorder images

Publishing rules are intentionally strict:

1. `Show in website` must be **ON**
2. there must be **at least one image**

Only when both conditions are true does **Harrilanpuisto** appear in the main navigation.

If the toggle is OFF, or if the image list is empty:
- the navigation link is omitted
- the Harrilanpuisto route redirects to the homepage
- the page is marked `noindex,nofollow`

This lets you prepare the image dump in the CMS before making it public.

The Harrilanpuisto layout uses the same site shell, Geist typography, mobile navigation, natural image proportions, fullscreen lightbox, keyboard arrows and swipe navigation as the other portfolio pages.



## Demo v6 media behavior

This package matches the Demo v6 branch.

### Design Work and Artistic Work
Gallery items can now be either **Image** or **Video**. Videos have an optional poster image and only load the actual video file after the visitor opens the lightbox.

### Harrilanpuisto
Harrilanpuisto starts hidden. It appears in navigation only when:
1. **Show in website** is ON, and
2. at least one image or video exists.

Add new Harrilanpuisto media at the end of the CMS list. The public page reverses the list automatically so the newest item appears first.

Desktop Harrilanpuisto uses the same 18px visible spacing horizontally and vertically.

Harrilanpuisto captions are visible only inside the lightbox.

### Loading performance
Gallery images below the first item use native lazy loading and asynchronous decoding. Videos use `preload="none"` and are assigned a source only when opened in the lightbox. This avoids downloading the full gallery/video set immediately.

## Editing the About page

In Pages CMS open **General → About page**.

You can edit:
- **Greeting phrases** — the large random greeting used on the About page.
- **Biography** — the large “I’m Harri…” text.
- **Mini-CV title**.
- **Mini-CV sections** — add, remove, reorder, or rename sections.
- **Entries** inside every Mini-CV section.
- **Surprise image** and its alt text.

For both the Biography and Mini-CV entries, the browser wraps text naturally according to the column width. Do not manually insert line breaks to control wrapping. Press **Enter** only when you intentionally want a hard line break.

The desktop About layout automatically keeps the biography at the bottom of its center column, keeps the Mini-CV independently scrollable, and lets wheel/trackpad scrolling anywhere on the About page control the Mini-CV. Mobile uses normal page scrolling.

The contact links are edited separately under **General → Site settings**:
- **Email**
- **Instagram URL**

Design Research, Design Work, and Artistic Work project links are generated automatically from their CMS collections. You do not need to manually create navigation links when adding a project.

## Renaming the main navigation sections

In Pages CMS open **General → Site settings**.

The following website navigation labels are editable:
- **Design Research section name**
- **Design Work section name**
- **Artistic Work section name**
- **Harrilanpuisto section name**

Changing one of these fields changes the displayed section name across the website. It does **not** change the underlying project collection or URL structure, so existing projects continue to work normally.

For example, you can rename **Design Work** to **Selected Design**, and all projects already stored in the Design Work collection will simply appear under **Selected Design** in the navigation.

The Harrilanpuisto setting changes its navigation label and browser page title while keeping the existing `/harrilanpuisto/` URL intact.

## Choosing a template for a Design Research project

Each item under **Design Research → Research projects** now has a **Project template** dropdown.

Choose:
- **Research template** for the long-form research layout with Project Overview, article sections, figure references, and the figure rail.
- **Work template** for the shorter portfolio layout with project type, large title, description, and an image/video gallery.

A project remains inside the **Design Research** navigation section regardless of which template you choose. Changing the template changes only that project's page layout.

When **Work template** is selected, fill the fields beginning with **Work template —**. When **Research template** is selected, fill the fields beginning with **Research template —**.

Existing Design Research projects are explicitly set to **Research template**, so nothing changes unless you choose a different template for a specific project.

## Adding links inside Mini-CV entries

In Pages CMS open **General → About page → Mini-CV sections** and open an entry.

Mini-CV entries now use the rich-text editor, so you can select any word or phrase and add a link to it. The rest of the entry remains normal text.

For example, an entry can contain a linked **Aalto University** while the rest of the sentence remains unlinked.

The link keeps the same visual typography as the Mini-CV copy and does not gain a hover underline.

## Configuring the final navigation footer item

Open **General → Site settings** in Pages CMS. The final footer item—the position currently showing `marhaba@harri.la`—can now be changed completely without changing its typography, spacing, or position.

You can edit:
- **Show final footer item** — turn it on or off.
- **Footer item display text** — the visible label.
- **Footer item link type** — Email, External URL, Internal website path, or No link.
- **Footer item link** — the destination used by the selected type.

Examples:
- `marhaba@harri.la` + **Email** + `marhaba@harri.la`
- `Contact` + **Internal website path** + `/about/`
- `Behance` + **External URL** + `https://www.behance.net/...`
- `Based in Helsinki` + **No link**

With **Email**, clicking the item opens the visitor's configured mail app. With **External URL**, the destination opens in a new tab. The visual styling and exact footer position remain unchanged.

## Two configurable navigation footer items

In **General → Site settings**, the two footer positions after **About** are independently configurable.

**About is permanent**: it cannot be renamed, repurposed, or hidden.

For **Footer item 1** and **Footer item 2** you can independently:
- show or hide the item;
- change its display text;
- choose Email, External URL, Internal website path, or No link;
- change its destination.

The footer is bottom-anchored. Its **last visible row always stays on the same baseline**. Therefore:
- with About + two items, item 2 occupies the bottom baseline;
- with About + one item, that remaining item occupies the bottom baseline;
- with both optional items hidden, **About moves down onto exactly that same bottom baseline**.

This changes no typography, spacing, or horizontal position.

## Design Research figure sizing

Desktop Design Research figures now follow one automatic sizing rule:

1. The image first tries to span from the exact same desktop left edge used by the Design Work and Artistic Work media columns to the website's right content edge, stopping before the normal page margin.
2. The image always keeps its original aspect ratio and is never cropped or stretched.
3. The caption remains directly underneath with its existing spacing.
4. If the full-width image plus caption would extend below the normal bottom page margin, the image is reduced proportionally until the complete image and caption fit comfortably.
5. Smaller images remain aligned to the same left figure edge; the unused space stays on their right.

Mobile inline figures keep their existing full-column behavior.

## Unified desktop media grid

The desktop Work-template media alignment uses Harrilanpuisto as the master grid. Design Research figures keep their earlier figure-area left edge.

Harrilanpuisto's media area spans the complete content region and has two equal columns separated by its existing 18px gutter. The **left edge of its second media column** is now the shared media line used by:

- Design Work media;
- Artistic Work media;
- Design Research projects that use the Work template.

The right edge of these figures/media remains aligned with the website's normal right content margin.

This changes only the desktop horizontal media alignment. About, the left navigation, mobile layouts, the Research text column, figure aspect-ratio preservation, caption fitting, and Harrilanpuisto itself remain unchanged.

## Page position when returning to a project

Every page now starts from its original content position whenever the visitor returns to it after visiting another page.

This resets:
- the main page scroll;
- Design Research article text to the beginning;
- the Design Research preview back to the first figure;
- Work / Artistic Work / Harrilanpuisto media to the beginning;
- the About Mini-CV to the beginning;
- any open image/video lightbox.

The persistent desktop navigation accordion state is not reset. Mobile navigation keeps its existing route-specific behavior.

### Research template reset detail

The Research template has an additional explicit reset because its desktop figure preview and reading navigation keep JavaScript state between scrolls. Returning to a Research project now resets:

- article text to the top;
- the automatic figure to the first referenced figure;
- any hover/focus figure override;
- the desktop and mobile text-navigation selection;
- the mobile project TOC;
- the figure lightbox;
- any pending figure transition from the previous visit.

This avoids relying on a synthetic scroll event, which can fail when a page/iframe was hidden before its pending animation frame completed.

## Desktop navigation label sizing

On desktop, the main navigation labels **Design Research**, **Design Work**, **Artistic Work**, and **Harrilanpuisto** all use the same 17px size and 18.7px line height as the project names listed beneath them. This includes the standalone Harrilanpuisto link class used by the project templates.

This is a desktop-only typography change. Mobile sizing and all navigation behavior remain unchanged.

## Arabic rotating welcome

The rotating desktop project greeting now includes **يا هلا!** alongside Tervetuloa!, Bienvenue!, Välkommen!, and Welcome!.

Only **يا هلا!** uses Google Font **IBM Plex Sans Arabic**. All other welcome messages and the rest of the website continue to use Geist.

The Arabic font is applied automatically whenever the welcome message is exactly `يا هلا!`. The existing 30-second timing, random placement, and animation are unchanged.

## About greeting: regular and morning-only phrases

The About-page greeting rotation now includes **مرحبا!** as a regular phrase.

It also includes **صباحو!** as a morning-only phrase. That phrase is eligible only from **12:00 AM (midnight) through 11:59 AM** according to the visitor's own device/browser time. At 12:00 PM (noon) it is automatically excluded from the rotation.

In Pages CMS under **General → About page**:
- **Greeting phrases** contains the normal all-day rotation.
- **Morning-only greeting phrases** contains phrases that should only be eligible before noon.

The eligibility is recalculated every time the 30-second greeting changes, so a page left open across noon will stop showing morning-only phrases after 12:00 PM.

## About Arabic greeting font

On the About page, **مرحبا!** and **صباحو!** use Google Font **IBM Plex Sans Arabic**.

All non-Arabic About greetings continue to use Geist.

**صباحو!** remains morning-only: it can appear from midnight through 11:59 AM according to the visitor's local device/browser time, and is excluded from the rotation from 12:00 PM (noon) onward.

## Research first-figure opening state

The Research template now explicitly clears any interrupted `figure-changing` fade state when a page opens or is reset on return. This guarantees that the first referenced figure is visible immediately on desktop when the project opens, while preserving the existing scroll- and hover-driven figure behavior afterward.

## Mobile header attachment, About greeting size, and Harri.la link

Three mobile/navigation refinements are applied:

1. On **Research-template pages**, the sticky project-name / Project Overview bar overlaps the Harri.la/main-navigation sticky bar by 2px. This prevents mobile browsers—especially Safari—from revealing a thin strip of scrolling content between the two sticky surfaces.
2. The large animated **About** greetings are 25% smaller on mobile: 70.875px instead of 94.5px. Desktop sizing is unchanged.
3. **Harri.la** is a link on every page and points explicitly to `/about/`.

## Mobile Research brand size

On Research-template pages at mobile widths, **Harri.la** now uses the same 25px font size as the sticky project name beside its `+` control. The existing sticky-bar attachment and spacing remain unchanged.

## About as homepage + greeting secret game

The website root now opens the **About** page instead of the first Research project. Direct project URLs remain available for sharing.

The large About greeting is now a small interactive game. Clicking or tapping it fades the current greeting away and replaces it with a different greeting in a noticeably different position and at a different size. Repeated clicks keep changing both the size and location. Enter and Space trigger the same behavior for keyboard users.

The normal 30-second automatic greeting rotation remains active. The existing `صباحو!` before-noon rule and IBM Plex Sans Arabic styling for Arabic greetings are unchanged.

## Mobile Harri.la size

At mobile widths, **Harri.la is 25px across the entire website**: About, Research, Design Work, Artistic Work, and Harrilanpuisto. This matches the mobile Research project-name size.

## Desktop About greeting-game size range

On desktop only, the clickable About greeting can now grow up to **228px**, which is three times the previous 76px maximum.

The mobile greeting-game size range is unchanged.

## Desktop About greeting-game maximum

The desktop-only maximum size for the clickable About greeting is now **182.4px**, which is 20% smaller than the previous 228px maximum.

The mobile greeting-game size range is unchanged.

## Desktop About greeting playground up to Harri.la level

On desktop, the About greeting game now uses the full safe white-space area of the center column from the **Harri.la vertical level** down to the protected gap above the biography.

The greeting still cannot enter the left navigation, Mini-CV column, or biography. Oversized random greetings are automatically reduced if necessary to remain fully inside that safe area.

Mobile behavior is unchanged.

## About Mini-CV heading

The visible **Mini-CV** heading has been removed from the About page. The CV sections now begin directly at the top of the right column. The unused Mini-CV title field has also been removed from Pages CMS.

## Research Project Overview chapter titles

Every bold chapter title in the Research-template **Project Overview** is now clickable on both desktop and mobile.

Each chapter has a **Linked Chapter Section ID** field in Pages CMS. Set it to the ID of the Article Section that the chapter title should scroll to. Chapter titles use the same navigation/scroll behavior as the existing linked Header 1 example, while subtitle links continue to work independently underneath.

## Research chapter titles use the same link system as Header 2

Research Project Overview chapter titles no longer use a separate chapter-link field/system.

A chapter title now has the **same two pieces of data as a Header 2 link**:
- **label**
- **Linked Article Section ID**

Both render as ordinary navigation anchors and scroll to the matching Article Section ID. The only visual difference is that chapter titles are displayed **bold**.

## Research Header 1 / Header 2 hierarchy

The Research template now uses the Project Overview hierarchy directly:

- A **bold chapter title** in Project Overview links to an Article Section that is automatically rendered as a **large Header 1** in the text.
- A regular **subtitle / Header 2** link points to a normal **Header 2** section.
- Both use the same existing `label + Linked Article Section ID` navigation mechanism.

There is no separate heading-type field to manage. The bold-vs-regular hierarchy in Project Overview determines the corresponding text heading style.

## Five-chapter Research example

The included Research demo now contains a temporary five-chapter example so the hierarchy is easy to inspect:

1. Ways of Looking
2. The Shape of a Letter
3. Printed Memory
4. Systems in Motion
5. What Remains

Each bold chapter title links to a large Header 1 in the article, and each smaller subtitle links to its matching Header 2.

## Research navigation starts directly with titles

This version returns to the five-chapter v35 example and removes the visible **Project Overview** heading. The Research navigation now begins directly with the clickable bold chapter titles on desktop and mobile.

The unused Project Overview title field has also been removed from Pages CMS. Everything else remains as in v35.

## Research navigation arrow initial state

When a Research page first loads, the navigation arrow is now always shown beside the **first clickable title**. If introductory text appears before that first linked title, the arrow remains on the first title until the reader reaches another linked section. The same behavior is restored when returning to the page.

## Research figure demo

The Research example now contains several figure references throughout the article:

- **Fig. 1** in *Ways of Looking*
- **Fig. 2** in *The Shape of a Letter*
- **Fig. 3** in *Printed Memory*
- **Fig. 1** referenced again later in *Reproduction and Loss*

In Pages CMS, type `[fig:1]`, `[fig:2]`, etc. inside a paragraph. On desktop it becomes the interactive `(Fig. n)` reference used by the right-hand figure preview. On mobile the corresponding figure is automatically inserted directly below the paragraph containing the reference.

Figures 2 and 3 in this demo are temporary derived images and can be replaced normally through the CMS.

## Research navigation chapter spacing

The blank space between chapter groups in the Research text navigation has been tightened to better match the supplied reference image. Subtitle line spacing is unchanged; only the gap before the next bold chapter title is reduced.

## Longer Research article demo text

The Header 2 sections in the included Research demo now contain substantially longer, multi-paragraph dummy article copy. This is only demonstration content, intended to make the scrolling rhythm, Header 1 / Header 2 hierarchy, figure behavior, and moving navigation arrow easier to judge with page lengths closer to a real research article.

## About greeting tenth-click easter egg

Desktop only: activations 1–9 use the normal random phrase / size / position game. Activation **10** makes the greeting extremely large and places it above the whole site, including the menu, biography, and Mini-CV. Activation **11** returns to the normal sequence and resets the counter. Automatic rotation pauses during the giant state. Mobile behavior is unchanged.

## About giant greeting duration

Desktop only: the giant greeting still appears on the **10th activation**, but it now stays full-screen for exactly **5 seconds** and then automatically returns to the normal random greeting sequence.

The regular 30-second automatic greeting rotation is no longer paused during the giant state. Extra clicks while the giant greeting is visible do not shorten its five-second duration. Mobile behavior is unchanged.

## Two figures in one Research paragraph

The Research demo now includes a paragraph in **The Shape of a Letter** containing both `[fig:2]` and `[fig:3]`.

On desktop, each `(Fig. 2)` / `(Fig. 3)` reference remains independently hoverable/focusable and switches the right-hand figure preview to that figure. On mobile, both corresponding figures are inserted directly after the same paragraph, in the order in which they are referenced.

## Desktop Research figure priority

When two or more `(Fig. n)` references are simultaneously visible in the desktop Research reading area, the **first reference mentioned in the text** now controls the right-hand figure preview.

When that earlier reference scrolls out of the reading area, the next visible reference takes over. Hover/focus preview behavior remains unchanged, and mobile behavior remains unchanged.

## About greeting game on mobile

The About greeting click/tap game now uses the same easter-egg logic on mobile as on desktop:

- activations 1–9 use the normal random greeting game;
- activation 10 makes the greeting enormous and places it above the whole interface;
- the giant state remains for 5 seconds;
- it then automatically returns to the normal sequence and resets the counter;
- the regular 30-second automatic greeting rotation continues as before;
- taps during the giant five-second state do not dismiss it early.

## Mobile Research text-navigation target positioning

When a reader taps a title in the mobile Research text navigation, the project text menu now closes first and the selected Header 1 / Header 2 heading is then positioned **inside the visible reading area**, directly below the sticky Harri.la bar and closed project-name bar.

The offset is measured from the actual project-title row at runtime rather than using a fixed number, so the selected heading remains visible even if a project name wraps onto more than one line. Desktop behavior is unchanged.

## Tighter mobile hamburger icon

The closed mobile hamburger icon has been vertically compressed slightly so the three horizontal lines sit closer together. The button size, position, hit area, and open-menu **×** icon are unchanged.

## Final unified mobile header icon

This version is rebuilt from **v48**.

The previous inconsistency came from two separate causes: About used a raw `☰` character while other templates used a `.hamburger-glyph` span with different inherited font rules, and several templates had their own mobile button positioning CSS.

Both are now removed as sources of variation:

1. every page uses the same hamburger-button markup;
2. the old font glyph is hidden everywhere;
3. the hamburger and × are drawn from the same CSS geometry everywhere;
4. every mobile template uses the same 34px Harri.la row and the same `top: 4px; height: 34px` button row.

This makes the icon shape, spacing, size, right position, and vertical center identical across About, Research, Design Work, Artistic Work, Research-as-Work, and Harrilanpuisto.

## Slightly larger and bolder mobile hamburger

The unified sitewide mobile hamburger now uses slightly larger and heavier geometry:

- bar width: **22px**;
- bar thickness: **2.5px**;
- vertical centers: **±5.5px** around the middle bar, preserving the same tight visual spacing;
- the open **×** uses the same 22px × 2.5px geometry.

The 34px button, right alignment, and exact vertical centering with Harri.la remain unchanged on every page.

## More spacing between hamburger lines

The unified mobile hamburger keeps the same **22px width** and **2.5px stroke thickness**, but the top and bottom bars are now positioned **7px above/below** the center bar instead of 5.5px. This adds more breathing room while keeping the icon identical and aligned consistently across every page.

## Research project titles: navigation vs. article title

Research projects now present the title fields more clearly in the CMS:

- **Navigation title** — shown in the main site navigation and in the mobile Research project-name bar.
- **Article title — line 1** — first line of the large title inside the article.
- **Article title — line 2** — optional second line of the large title inside the article.

These fields are intentionally independent, so the navigation name can be shorter or different from the large editorial/article title if desired.

The standalone demo's old hardcoded `Tahriir Project` menu label has also been synchronized with the current example title, `Letters, Memory, and Motion`.

## Top-left site name

In Pages CMS, open **General → Site settings → Top-left site name**.

This field controls the `Harri.la` label shown at the top-left of every site page. The same value is also used in browser/page titles.

## GitHub publishing manual

See `GITHUB_PUBLISHING_MANUAL.md` for a beginner-friendly walkthrough covering:

- free GitHub Pages hosting,
- uploading the website without Terminal,
- connecting Pages CMS,
- editing content,
- and adding a custom domain later.



## Random surprise images

Use **General → About page → Surprise images** in Pages CMS.
One image stays fixed; multiple images are randomized on each About-page load.
