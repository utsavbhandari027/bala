// Loads all site content. Lab members edit the YAML files in src/data and the
// Markdown files in src/content — never this file.
import { load as parseYaml } from 'js-yaml';

const yamlFiles = import.meta.glob('../data/*.yml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const loadYaml = (name: string): any[] => (parseYaml(yamlFiles[`../data/${name}.yml`]) as any[]) ?? [];

export const teams = loadYaml('teams');
export const researchAreas = loadYaml('research_areas');
export const facilities = loadYaml('facilities');
export const openings = loadYaml('openings').filter((o) => o.status === 'open');
export const sponsors = loadYaml('sponsors');
export const publications = loadYaml('publications').sort((a, b) => b.year - a.year);

type MdModule = { frontmatter: Record<string, any>; Content: any; file: string; rawContent: () => string };
const slugOf = (file: string) => file.split('/').pop()!.replace(/\.md$/, '');
// hasBody is false when the Markdown body is empty or only an <!-- instructions --> comment.
const collect = (mods: Record<string, MdModule>) =>
  Object.values(mods)
    .filter((m) => !slugOf(m.file).startsWith('_'))
    .map((m) => ({
      ...m.frontmatter, slug: m.frontmatter.slug || slugOf(m.file), Content: m.Content,
      hasBody: m.rawContent().replace(/<!--[\s\S]*?-->/g, '').trim() !== '',
    }));

const allPeople = collect(import.meta.glob('../content/people/*.md', { eager: true }))
  .sort((a: any, b: any) => a.order - b.order) as any[];
export const people = allPeople.filter((p) => p.status !== 'draft');
export const currentPeople = people.filter((p) => p.status !== 'alumni');
export const alumni = people.filter((p) => p.status === 'alumni');

export const projects = collect(import.meta.glob('../content/projects/*.md', { eager: true }))
  .sort((a: any, b: any) => b.start - a.start) as any[];

export const news = collect(import.meta.glob('../content/news/*.md', { eager: true }))
  .map((n: any) => ({ ...n, date: new Date(n.date ?? n.slug.slice(0, 10)), slug: n.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '') }))
  .sort((a: any, b: any) => b.date - a.date) as any[];

export const personBySlug = (slug: string) => people.find((p) => p.slug === slug);
export const teamById = (id: string) => teams.find((t) => t.id === id);

/** Prefix internal links with the site base path (needed for GitHub Pages project sites). */
export const url = (path: string) => {
  if (!path || /^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return (import.meta.env.BASE_URL.replace(/\/$/, '') + path).replace(/\/{2,}/g, '/');
};

/** Tiny inline Markdown: *italic* and **bold** only (used for YAML text fields). */
export const inlineMd = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

/** Drop inline "TODO: …" notes from YAML text so they don't show on the page. */
export const clean = (s = '') => s.replace(/^TODO\s*[—-]\s*/, '').replace(/\s*TODO\b.*$/s, '').trim();

export const initials = (name = '') => {
  const parts = name.replace(/^Dr\.\s*/, '').split(' (')[0].trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

export const shortName = (name = '') => name.split(' (')[0];

export const fmtDate = (d: Date, long = false) =>
  d.toLocaleDateString('en-US', { month: long ? 'long' : 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Bold lab members inside an author string, using each person's cite_names. */
export const boldAuthors = (pub: any) => {
  let a = pub.authors.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const tokens: [string, string][] = [];
  for (const slug of pub.lab_authors ?? []) {
    for (const n of personBySlug(slug)?.cite_names ?? []) {
      const tok = `@@${tokens.length}@@`;
      if (a.includes(n)) { a = a.split(n).join(tok); tokens.push([tok, n]); }
    }
  }
  for (const [tok, n] of tokens) a = a.split(tok).join(`<strong>${n}</strong>`);
  return a;
};

export const pubLink = (pub: any) => (pub.doi ? `https://doi.org/${pub.doi}` : pub.url || '');

export const citation = (pub: any) =>
  `${pub.authors} (${pub.year}). ${pub.title}${/[?!.]$/.test(pub.title) ? '' : '.'} ${pub.venue}${pub.volume ? ' ' + pub.volume : ''}${pub.pages ? ':' + pub.pages : ''}.${pub.doi ? ' https://doi.org/' + pub.doi : ''}`;
