import type { APIRoute } from 'astro';
import { url } from '../lib/site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: "Blue Valley North Men's Volleyball",
      short_name: 'BVN Volleyball',
      start_url: url('/'),
      display: 'browser',
      background_color: '#0a1a36',
      theme_color: '#0a1a36',
      icons: [
        { src: url('/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: url('/icon-512.png'), sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
