# Bala Lab Website Guide

This is an Astro website for the Bala Lab at Mississippi State University.

Use this guide to know where to edit content, images, layout, styling, and site settings. The active website is built from the root `src/` and `public/` folders.

## 1. Project Structure

```text
Lab_website/
├── public/                 Files served directly: images, logos, downloadable assets
│   └── img/
├── src/
│   ├── components/         Reusable visual pieces: header, footer, cards, hero
│   ├── content/            Markdown content: people, projects, news
│   ├── data/               YAML content: teams, publications, facilities, etc.
│   ├── layouts/             Shared page shell and HTML metadata
│   ├── lib/                 Content loading, sorting, filtering, and URL helpers
│   ├── pages/               Website routes and page-specific layout/content
│   └── styles/              Global colors, fonts, spacing, responsive CSS
├── astro.config.mjs         Site URL and GitHub Pages base path
├── package.json             Development and build commands
├── README.md                Short setup and publishing notes
└── GUIDE.md                 This detailed editing guide
```

### Folders normally not edited

- `.astro/`: generated Astro files.
- `dist/`: generated production output.
- `node_modules/`: installed dependencies.
- `_archive_design_v1/`: archived older design. It does not control the current website.
- `.git/`: Git history and repository metadata.

## 2. Edit Content Without Editing Code

Most website content comes from Markdown and YAML. After changing these files, the page updates automatically while `npm run dev` is running.

### People

Edit or add files in [src/content/people/](src/content/people/).

- One Markdown file represents one person.
- Copy [src/content/people/_template.md](src/content/people/_template.md) for a new person.
- The filename becomes the default URL slug. For example, `jon-corser.md` becomes `/people/jon-corser/`.
- Set `status: alumni` to move a person out of the current team lists and into Alumni.
- Set `category: undergrad-intern` to list a person under Undergraduate Interns, which shows only their name and a small round photo.
- Keep incomplete profiles in `src/content/people/_drafts/`; files in that folder stay out of public listings and detail pages until they are complete.
- Set `order` to control ordering within lists.
- Set `photo` to an image path such as `/img/people/jon-corser.webp`.
- The Markdown body is a one-paragraph summary of the person's research, shown under "Research Interests" on their profile.
- `hometown`, `location`, and `position` appear as small chips under that paragraph.
- `timeline` lists education and positions, newest first, and is shown beside the paragraph.
- `first_author_articles` lists journal articles where the person is first author, shown under "Selected first-author articles".
- See [src/content/people/utsav-bhandari.md](src/content/people/utsav-bhandari.md) for a fully filled-in example.

Important fields include:

```yaml
name: Firstname Lastname
slug: firstname-lastname
role: PhD Student
team: digital
category: student
order: 10
status: current
photo: /img/people/person.webp
email: person@msstate.edu
program: PhD, Weed Science
cite_names: [Lastname, Firstname]
```

The people content appears on:

- `/people/`
- `/people/<slug>/`
- Homepage team/people sections
- Publication author highlighting when `cite_names` and `lab_authors` match

### Projects

Edit or add files in [src/content/projects/](src/content/projects/).

- One Markdown file represents one research project.
- The filename becomes the default project slug.
- The frontmatter controls the project card and metadata.
- The Markdown body controls the project detail page.

Example fields:

```yaml
title: Drone versus ground herbicide application
status: active
teams: [field, digital]
areas: [application-technology]
people: [reece-butler]
funding: Mississippi Soybean Promotion Board
start: 2025
end: ""
image: /img/placeholder-field.svg
summary: Short description shown on project cards.
```

Projects appear on `/research/` and `/research/projects/<slug>/`.

### News

Edit or add dated files in [src/content/news/](src/content/news/).

Recommended filename format:

```text
YYYY-MM-DD-short-title.md
```

The date at the start of the filename is used when no other date is supplied. The page removes the date prefix from the public URL, so `2025-12-01-weed-management.md` becomes `/news/weed-management/`.

Example fields:

```yaml
title: A clear news headline
category: outreach
image: /img/news/field-day.webp
people: [luis-avila]
summary: Short summary shown on news listings.
```

News appears on `/news/` and on each individual news page.

### Publications

Edit [src/data/publications.yml](src/data/publications.yml).

Publications are automatically sorted from newest to oldest by year. Common fields include:

```yaml
year: 2025
title: Publication title
authors: Author list
venue: Journal name
volume: "12"
pages: 100-112
doi: 10.xxxx/example
lab_authors: [person-slug]
featured: true
```

Publications appear on `/publications/`, the homepage recent-work section, and publication links on project or news content where used.

### Research areas

Edit [src/data/research_areas.yml](src/data/research_areas.yml).

Each entry controls a research area card, description, icon, image, and research questions. These entries appear on `/research/` and in the homepage research-area section.

Keep each `id` unique because it is used for anchors such as `/research/#application-technology`.

### Teams

Edit [src/data/teams.yml](src/data/teams.yml).

Team IDs connect people and projects to a team. Do not change an existing `id` unless you also update the `team` fields in people and projects.

### Open positions

Edit [src/data/openings.yml](src/data/openings.yml).

- `status: open` displays a position.
- `status: closed` hides it automatically.
- Edit title, level, team, start term, description, requirements, and application instructions here.

Openings appear on `/opportunities/`.

### Facilities

Edit [src/data/facilities.yml](src/data/facilities.yml).

Facilities appear on `/facilities/`.

### Sponsors and donors

Edit [src/data/sponsors.yml](src/data/sponsors.yml).

Sponsor logos belong in [public/img/sponsors/](public/img/sponsors/). Reference them with a public path such as `/img/sponsors/logo.png`.

## 3. Edit Images and Logos

All browser-served images belong under [public/](public/). Use paths beginning with `/img/` in Markdown or YAML.

Current image locations:

- Lab logo: [public/img/bala-lab-logo.png](public/img/bala-lab-logo.png)
- Homepage hero image: [public/img/hero-placeholder.jpeg](public/img/hero-placeholder.jpeg)
- People photos: [public/img/people/](public/img/people/)
- Sponsor logos: [public/img/sponsors/](public/img/sponsors/)
- Placeholder field/lab art: [public/img/placeholder-field.svg](public/img/placeholder-field.svg) and [public/img/placeholder-lab.svg](public/img/placeholder-lab.svg)

Paths in frontmatter fields such as `photo:` get the `/bala` base path added automatically. Images placed inside a Markdown body (`![alt](...)`) do not, so write the full path there: `![Field day](/bala/img/news/field-day.jpg)`.

The shared logo component is [src/components/BrandMark.astro](src/components/BrandMark.astro). It is used in both the header and footer. If you replace the logo filename, update that component.

The homepage hero is controlled by [src/pages/index.astro](src/pages/index.astro). Its background image is currently referenced in the `.hero` CSS in that file.

## 4. Edit Layout and Design

### Header and navigation

Edit [src/components/Header.astro](src/components/Header.astro) to change:

- Navigation labels and links
- Header markup
- Mobile menu behavior
- Brand link structure

Edit the header section of [src/styles/global.css](src/styles/global.css) to change:

- Header height
- Logo size
- Navigation spacing
- Active-link underline
- Mobile navigation appearance

### Footer

Edit [src/components/Footer.astro](src/components/Footer.astro) to change:

- Footer text
- Contact information
- Footer links
- Copyright text

Footer styling is in the footer section of [src/styles/global.css](src/styles/global.css).

### Homepage

Edit [src/pages/index.astro](src/pages/index.astro) to change:

- Hero headline, description, and buttons
- Homepage section order
- Research-area presentation
- Mission text
- Recent publications section
- Join-the-lab call to action
- Homepage-specific CSS near the bottom of the file

### Inner page hero

Most inner pages use [src/components/PageHero.astro](src/components/PageHero.astro). Change it to update the shared page heading structure, back link, eyebrow, or description behavior.

The individual page files choose the text passed into `PageHero`, for example:

- [src/pages/research/index.astro](src/pages/research/index.astro)
- [src/pages/people/index.astro](src/pages/people/index.astro)
- [src/pages/publications.astro](src/pages/publications.astro)
- [src/pages/news/index.astro](src/pages/news/index.astro)
- [src/pages/opportunities.astro](src/pages/opportunities.astro)

### Shared page shell and metadata

Edit [src/layouts/Base.astro](src/layouts/Base.astro) to change:

- Shared HTML structure
- Page title format
- Default meta description
- Open Graph metadata
- Favicon
- Google font imports
- Header/footer placement

### Reusable components

- [src/components/Avatar.astro](src/components/Avatar.astro): person image or initials fallback.
- [src/components/BrandMark.astro](src/components/BrandMark.astro): shared Bala Lab logo.
- [src/components/FieldArt.astro](src/components/FieldArt.astro): decorative field-line artwork used in dark sections.
- [src/components/Icon.astro](src/components/Icon.astro): shared icons used by cards and buttons.
- [src/components/PubItem.astro](src/components/PubItem.astro): publication list item layout.

Changing a shared component can affect many pages at once.

### Global colors, fonts, and spacing

Edit [src/styles/global.css](src/styles/global.css).

Design tokens are at the top of the file, including:

- `--maroon`: Mississippi State primary maroon.
- `--gold`: Mississippi State gold accent.
- `--deep`: dark maroon background.
- `--grey-light` and `--grey-dark`: supporting greys.
- `--font-display` and `--font-sans`: heading and body fonts.
- `--max`, `--gutter`, `--space`, and `--radius`: layout scale.

This stylesheet also contains the responsive rules for desktop, tablet, and mobile screens.

## 5. Page and File Map

| Website area | Main file or data source |
|---|---|
| Homepage `/` | [src/pages/index.astro](src/pages/index.astro) |
| People listing `/people/` | [src/pages/people/index.astro](src/pages/people/index.astro) + `src/content/people/` |
| Person detail | [src/pages/people/[slug].astro](src/pages/people/[slug].astro) + person Markdown |
| Research `/research/` | [src/pages/research/index.astro](src/pages/research/index.astro) + `research_areas.yml` + projects |
| Project detail | `src/pages/research/projects/[slug].astro` + project Markdown |
| Publications `/publications/` | [src/pages/publications.astro](src/pages/publications.astro) + `publications.yml` |
| News `/news/` | `src/pages/news/index.astro` + news Markdown |
| News detail | `src/pages/news/[slug].astro` + news Markdown |
| Opportunities `/opportunities/` | [src/pages/opportunities.astro](src/pages/opportunities.astro) + `openings.yml` |
| Facilities `/facilities/` | [src/pages/facilities.astro](src/pages/facilities.astro) + `facilities.yml` |
| Contact `/contact/` | [src/pages/contact.astro](src/pages/contact.astro) |
| Acknowledgments | [src/pages/acknowledgments.astro](src/pages/acknowledgments.astro) |
| 404 page | [src/pages/404.astro](src/pages/404.astro) |
| Search data | [src/pages/search.json.ts](src/pages/search.json.ts) |

## 6. How Content Becomes a Page

[src/lib/data.ts](src/lib/data.ts) is the content loading layer.

- YAML files in `src/data/` are loaded automatically.
- Markdown files in `src/content/` are collected automatically.
- Files beginning with `_` are ignored as templates.
- People are sorted by `order`.
- Projects are sorted by newest `start` year.
- News is sorted by date.
- Publications are sorted by year.
- Openings with `status: closed` are filtered out.
- `url()` adds the `/bala` base path required by GitHub Pages.

Normally you should edit Markdown/YAML content rather than editing `src/lib/data.ts`.

## 7. Local Development

From the project root:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm install
npm run dev
```

Open http://127.0.0.1:4321.

The browser updates automatically when you save a file. Stop the server with `Ctrl+C`.

### Check a production build

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm run build
```

To preview the generated production site:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm run preview
```

## 8. Publishing Changes

The live site is hosted at:

```text
https://utsavbhandari027.github.io/bala/
```

After checking the site locally:

```bash
git add -A
git commit -m "Describe the change"
git push
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` rebuilds and publishes the site after a push to `main`. Deployment usually takes one or two minutes. Check the repository's **Actions** tab if the update does not appear.

## 9. Common Editing Rules

1. Use `src/content/` for people, projects, and news writing.
2. Use `src/data/` for structured lists and collections.
3. Use `public/img/` for images referenced by pages or content.
4. Use `src/pages/` when changing page structure or adding a route.
5. Use `src/components/` for shared UI used in multiple places.
6. Use `src/styles/global.css` for site-wide design changes.
7. Do not edit `dist/`, `.astro/`, or `node_modules/` directly.
8. Replace text marked `TODO`, `Placeholder`, or `Sample` before publishing.
9. Run `npm run build` before pushing.
10. Keep the `/bala` base path in internal links and image paths compatible with GitHub Pages.
