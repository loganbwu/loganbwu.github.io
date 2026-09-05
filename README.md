# CV

Raw HTML/CSS/JS web-based CV for Logan Wu, hosted on GitHub Pages at https://loganbwu.github.io/.

## Purpose

This is used two ways:

- Send the link directly to someone.
- Open it in a browser and print/save as PDF (File > Print > Save as PDF) to attach to job applications, since most application systems still expect a PDF file.

When exporting to PDF, use a browser print preview and check that sections haven't been cut awkwardly across pages before saving.

## Structure

- `index.html` - all CV content (work history, education, skills, awards). Sections are plain HTML (`<section id='work'>`, `#education`, `#skills`, `#awards`) - edit this file directly to update content.
- `boids.html` - standalone demo page for the boids background animation, not linked from the CV.
- `resources/css/` - stylesheets, one per feature area (`index.css` for layout/typography, `map.css`, `tooltips.css`, `field.css`, `slide.css`, `more.css`, `boids.css`).
- `resources/js/` - matching scripts:
  - `boids.js` - the animated flocking triangles in the page background.
  - `field.js` - canvas field/particle animation.
  - `map.js` - Leaflet map shown in the "Where's Logan?" modal (currently commented out in `index.html`).
  - `more.js` - "Show N more" expand/collapse behaviour for long lists.
  - `slide.js` - slide-in animation for sections as the page is scrolled.
  - `tooltips.js` - enables Bootstrap tooltips on any element with a `title` attribute.

## Dependencies

Loaded via CDN, no build step or local install required:

- Bootstrap 5.1.1 (CSS + modal/tooltip JS)
- Google Fonts (Roboto)
- Font Awesome (icons)
- GSAP (boids animation)
- Leaflet (map modal)

## Editing

1. Edit content directly in `index.html`.
2. Open the file in a browser (double-click, or `open index.html` on macOS) to preview changes - no server or build step needed.
3. Commit and push to `main`; GitHub Pages serves the site directly from the repo.

## Cover letters

`cover-letters/` holds application-specific cover letters, styled to match the CV. These are personal/one-off documents, not part of the public site, so only the template and build tooling are tracked in git - actual letters (`*.md`, generated `*.html`/`*.pdf`) are gitignored and stay local only.

Workflow:

1. Copy `cover-letters/template.md` to `cover-letters/2026-companyname.md` and fill it in (edit as Markdown - update the `company`/`role` front matter and write the body).
2. Run `./cover-letters/build.sh 2026-companyname.md` (requires `pandoc`, installed via `brew install pandoc`) to generate the matching `2026-companyname.html`, styled with the CV's fonts/colours (`resources/css/index.css` + `cover-letters/letter.css`). Run `./cover-letters/build.sh` with no arguments to rebuild every letter in the directory.
3. Open the generated `.html` in Chrome and save as PDF to attach to the application.

## Roadmap / notes

- Map modal is currently commented out in `index.html` - re-enable if the interactive location map is wanted again.
