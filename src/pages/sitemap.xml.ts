import type { APIRoute } from 'astro';
import { absolute } from '../lib/site';

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/schedule/', priority: '0.9' },
  { path: '/roster/', priority: '0.9' },
  { path: '/program/', priority: '0.7' },
  { path: '/media/', priority: '0.6' },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url><loc>${absolute(p.path)}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority></url>`)
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
