# Bala Lab website

Astro site for the Bala Lab, Department of Agricultural Science and Plant Protection, Mississippi State University.
(The earlier Jekyll draft is kept in `_archive_jekyll_v1/` for reference and can be deleted.
The previous, busier Astro design is kept in `_archive_design_v1/src/`; copy it back over `src/` to restore it.)

## Preview on your computer

Node.js is installed in `~/.local/node`. In Terminal, from this folder:

    export PATH="$HOME/.local/node/bin:$PATH"
    npm run dev

Open http://127.0.0.1:4321. Pages update automatically when you save a file.
To build the final static site: `npm run build` (output goes to `dist/`).

## Publishing

The live site is https://utsavbhandari027.github.io/bala/ — it rebuilds automatically
(≈1–2 min) on every push to `main` via `.github/workflows/deploy.yml`. To publish a change:

    git add -A
    git commit -m "Describe the change"
    git push

Small text edits can also be made directly on github.com (open the file → pencil icon → commit);
that triggers the same rebuild. Check progress under the repo's **Actions** tab.
If you move to a custom domain, set `site` to it and `base: '/'` in `astro.config.mjs`.

## Where content lives (no code editing needed)

| To change…            | Edit…                                                   |
|-----------------------|---------------------------------------------------------|
| A person              | `src/content/people/firstname-lastname.md` (copy `_template.md` for a new person) |
| A person's photo      | Put a square image in `public/img/people/` and set `photo: /img/people/<file>.jpg` |
| Publications          | `src/data/publications.yml`                             |
| Sponsors & donors     | `src/data/sponsors.yml` (logos go in `public/img/sponsors/`) |
| Teams                 | `src/data/teams.yml`                                    |
| Research areas        | `src/data/research_areas.yml`                           |
| Projects              | `src/content/projects/*.md`                             |
| News                  | `src/content/news/YYYY-MM-DD-short-title.md`            |
| Open positions        | `src/data/openings.yml` (set `status: closed` to hide)  |
| Facilities            | `src/data/facilities.yml`                               |

Design tokens (colors, fonts, spacing) are at the top of `src/styles/global.css` — change the colors there to re-brand (e.g. to MSU maroon).
Anything marked `TODO`, "Placeholder", or "Sample" is stand-in content to replace.
