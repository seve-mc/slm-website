# SLM website agent notes

## SEO (required)

Always add and keep SEO up to date:

- On **every new page**: full SEO head (title, meta description, canonical, robots, Open Graph, Twitter, favicon/manifest links, and relevant JSON-LD).
- When **content changes** on an existing page (copy, products, services, prices, images, contact details, hours, location): update matching SEO — title, description, canonical/OG/Twitter if needed, image alts, headings, structured data, and `sitemap.xml`.
- Prefer location-aware wording where natural (Lakeside, Swindon).
- Keep phone, hours, and area consistent with the live site.
- Site URL base: `https://www.slmgardens.co.uk`
- Thin/query-only pages (e.g. order/enquire with params) should use `noindex, follow` and canonical to the main category page.

## Links

- Use plain `.html` paths in `href`s and SEO URLs (e.g. `planters.html`, `contact.html`, `index.html`) so the site works when opened as static files without a local server.
