import { people, projects, publications, url, pubLink, shortName } from '../lib/data';

export function GET() {
  const index = [
    ...people.map((p) => ({ t: shortName(p.name), k: 'Person', d: p.role, u: url(`/people/${p.slug}/`) })),
    ...projects.map((p) => ({ t: p.title, k: 'Project', d: p.summary, u: url(`/research/projects/${p.slug}/`) })),
    ...publications.map((p) => ({ t: p.title, k: 'Publication', d: `${p.authors} (${p.year})`, u: pubLink(p) || url('/publications/') })),
  ];
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}
