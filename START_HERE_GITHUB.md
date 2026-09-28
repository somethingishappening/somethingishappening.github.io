# Harri.la — clean restart on GitHub Pages

Use the **CMS ZIP** as the live website source.  
The standalone HTML demo is only a visual/interaction preview. **Do not upload the demo as the live site.**

## 1. Create the repository

On GitHub, create a new repository named exactly:

`somethingishappening.github.io`

Use:
- Visibility: **Public** if you are using GitHub Free.
- Do not add a README/template at creation time.

## 2. Upload the CMS files

Download and unzip:

`harri-pages-cms-v84-audited-fixed.zip`

Open the unzipped folder and upload **its contents** to the repository root.

The repository root should directly contain things like:

- `_config.yml`
- `.pages.yml`
- `index.html`
- `about.md`
- `_layouts/`
- `_includes/`
- `_data/`
- `_research/`
- `_design/`
- `_artistic/`
- `assets/`

Do **not** upload the ZIP itself.
Do **not** put all of these inside another folder.

### If `.pages.yml` refuses to upload

On GitHub:
1. Click **Add file → Create new file**.
2. Name the file exactly `.pages.yml`.
3. Open `.pages.yml` on your Mac in a text editor.
4. Copy all of its contents into GitHub.
5. Commit it to `main`.

Do **not** create a `.nojekyll` file. This website needs Jekyll to process its layouts, collections, and Liquid templates.

## 3. Turn on GitHub Pages

Repository → **Settings → Pages**

Set:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Click **Save**.

Then open **Actions** and wait for **pages build and deployment** to finish with a green check.

Only after that, visit:

`https://somethingishappening.github.io`

If you see a 404, first check:
- repository name is exactly `somethingishappening.github.io`
- repository is public on GitHub Free
- `index.html` is at the repository root
- Pages is set to `main` + `/(root)`
- the latest Pages workflow in Actions is green

## 4. Connect Pages CMS only after the website works

Go to:

`https://app.pagescms.org`

1. Sign in with GitHub.
2. Install/authorize the Pages CMS GitHub App.
3. Give it access to `somethingishappening.github.io`.
4. Open that repository.
5. Make sure the branch is `main`.

`.pages.yml` at the repository root controls the CMS editor.

If you change `.pages.yml` and the CMS still looks old:
- leave the repository in Pages CMS
- reopen it
- hard-refresh the browser
- allow a few minutes for the config cache to refresh

## 5. Where to edit things in Pages CMS

### General → Site settings
You can edit:
- top-left site name (`Harri.la`)
- Design Research / Design Work / Artistic Work / Harrilanpuisto labels
- footer item 1
- footer item 2
- email/external/internal links

### General → About page
You can edit:
- greeting phrases
- morning-only greeting phrases
- fullscreen ASCII faces
- each ASCII color
- biography
- Mini-CV sections and entries
- links inside CV text
- surprise images

Surprise-image behavior:
- 1 image = always that image
- 2+ images = one is chosen randomly on each page load

### Design Research
Create/edit Research projects and:
- navigation title
- navigation order
- Research vs Work template
- article title
- article sections
- figures
- Project Overview navigation

For Research navigation, the menu item's **Linked Article Section ID** must exactly match the corresponding article **Section ID**.

### Design Work / Artistic Work
Create/edit projects, text, galleries, images, videos, and navigation order.

### Harrilanpuisto
Add images/videos and control whether it appears in navigation.

## 6. Adding links

For a clickable email in a footer slot:
- Link type: **Email**
- Link: `name@example.com`

Inside rich text, use the link button or Markdown:

`[Aalto University](https://www.aalto.fi/)`

Email inside rich text:

`[name@example.com](mailto:name@example.com)`

## 7. Adding your own domain later

First make sure the GitHub Pages URL works.

Then buy your domain.

In GitHub:
1. Verify the domain under your GitHub account's **Settings → Pages**.
2. In the website repository go to **Settings → Pages → Custom domain**.
3. Enter your domain and save.

For a root/apex domain, GitHub currently documents these A records:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For `www`, use a CNAME pointing to:

`somethingishappening.github.io`

After DNS is recognized, enable **Enforce HTTPS** in GitHub Pages settings.

## Important rule for future redesigns

Once the live repository contains your real portfolio content, **do not delete it and replace it with a fresh CMS ZIP**.

The GitHub repository becomes the master copy.

A future redesign should update the layout/CSS/JavaScript files while keeping your real content, uploaded images, projects, CV, and CMS data in place.
