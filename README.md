# Blue Valley North Men's Volleyball

Team website for Blue Valley North Men's Volleyball (BVN Boys Volleyball), Overland Park, Kansas.

Live site: https://joshualobert.github.io/bvn-mens-volleyball/

Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Updating content

Everything the team changes season to season lives in one file: `src/data/team.ts`.

- **Roster:** edit `roster.groups`. Positions use the codes in `positionNames`.
- **Schedule:** edit `varsitySchedule` and `jvSchedule` (ISO dates, `Home` or `Away`, two opponents per match day).
- **Postseason and records:** edit `postseason` and `seasons`.

Only publish information the team has announced or the league has published. Each block in
`team.ts` notes its source.

## Photos

Photos come from the team's shared Google Drive. To add or swap photos:

1. Put the original JPGs in a folder (originals are never modified).
2. Add an entry to `PHOTOS` in `scripts/process-photos.py` with a descriptive slug and alt text.
3. Run `python3 -I scripts/process-photos.py <originals-folder> <raw-previews-folder>` (needs Pillow).

This writes responsive WebP files to `public/photos/` and the manifest to `src/data/photos.json`.
Reference a photo anywhere with `<Photo slug="..." />`.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/bvn-mens-volleyball/
npm run build    # static output in dist/
```

## Custom domain

If the team gets a domain, set `SITE` (and `BASE=/`) in `astro.config.mjs` or as environment variables
in the workflow, add a `public/CNAME` file, and configure the domain in the repository's Pages settings.

## Disclaimer

Blue Valley North Men's Volleyball is an independent program. The team and this website are not
affiliated with or endorsed by Blue Valley North High School or Blue Valley Schools.
