# Search engine setup

## Already done

- Every page has a descriptive title, meta description, canonical URL, Open Graph and Twitter card tags.
- `index, follow` robots meta on every page except the 404 page.
- `sitemap.xml` and `robots.txt` are generated at build time:
  - https://joshualobert.github.io/bvn-mens-volleyball/sitemap.xml
  - https://joshualobert.github.io/bvn-mens-volleyball/robots.txt
- `SportsTeam` structured data (schema.org) on every page.
- HTTPS is enforced by GitHub Pages.
- IndexNow (Bing, Yandex, Seznam, Naver; Bing results also feed DuckDuckGo and Yahoo) was notified of all pages.
  The key file is `public/<key>.txt`.

## Google Search Console (needs the account owner, about 5 minutes)

Google requires a signed-in Google account to verify ownership, so this part has to be done by a person.

1. Go to https://search.google.com/search-console and sign in.
2. Click **Add property** and choose **URL prefix**. Enter:
   `https://joshualobert.github.io/bvn-mens-volleyball/`
3. Under **Other verification methods**, choose **HTML tag**. Google shows a tag like
   `<meta name="google-site-verification" content="abc123..." />`.
4. Copy only the `content` value and paste it into `googleSiteVerification` in `src/data/team.ts`, then commit and
   push to `main`. The site redeploys in about a minute.
   (Alternative: choose **HTML file**, download the file and put it in `public/` unchanged, then push.)
5. Back in Search Console, click **Verify**.
6. Open **Sitemaps**, enter `sitemap.xml`, and click **Submit**.
7. Open **URL inspection**, paste the homepage URL and click **Request indexing**. Repeat for `/roster/` and
   `/schedule/` if you like.

Indexing usually takes a few days to a few weeks, and Google decides ranking. The biggest single boost is links
from places people already visit: put the site URL in the @bvnorthmvb Instagram bio and link it from the team BAND.

## Bing Webmaster Tools (optional)

After Google verification, https://www.bing.com/webmasters can import the site directly from Search Console.
