const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Base-aware internal URL. Pass a path like "/roster/" or "photos/x.webp". */
export function url(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/** Absolute URL for canonical links, sitemap and structured data. */
export function absolute(path = '/'): string {
  return new URL(url(path), import.meta.env.SITE).href;
}

const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' });
const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const longFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function dateParts(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return { weekday: dayFmt.format(d), month: monthFmt.format(d), day: d.getUTCDate(), long: longFmt.format(d) };
}
