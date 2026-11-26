# Kartel

Site of Kartel, the collective of the professional associations of culture in
Valais (Switzerland).

Static Nuxt site, made from [site-kit](https://github.com/pierreleripoll/site-kit).
The content is in Markdown in `content/`. Benjamin edits it in Sveltia CMS at
`/admin`. The site is hosted on Cloudflare Workers.

## Commands

```bash
pnpm install
pnpm dev          # on port 3000
pnpm generate     # build in .output/public, then check the pages
pnpm preview      # serve the build with wrangler, like in production
pnpm lint
pnpm typecheck
```

You need Node 24 (`.nvmrc`) and pnpm.

## Languages

The site has a French version and a German version. Each one has its own URLs,
and no page mixes the two.

| page | French | German |
|---|---|---|
| home | `/fr` | `/de` |
| tandem | `/fr/tandem` | `/de/tandem` |
| durabilité | `/fr/durabilite` | `/de/nachhaltigkeit` |
| news | `/fr/actualites` | `/de/aktuelles` |

- `/` redirects to `/fr`. The old URLs `/tandem` and `/durabilite` redirect to
  the French pages. The redirects are in `public/_redirects`.
- The `Français / Deutsch` switch of the header goes to the same page in the
  other language.
- The menu and the fixed texts of the interface are in `app/utils/i18n.ts`.

## Content

```text
content/
  fr/
    index.md  tandem.md  durabilite.md
    actualites/<slug>.md
  de/
    index.md  tandem.md  durabilite.md
    actualites/<slug>.md
```

The files have the same name in the two languages, the French one. The CMS
needs this to show the two languages of a page in one entry. The German URLs
keep their German words: `/de/nachhaltigkeit` reads `content/de/durabilite.md`.

The fields of each file are in `content.schemas.ts`. The build fails when a
file has a bad field.

### Pages

A page has a `title`, a `description` and the text. In the text, a YouTube
block starts a block with two columns, with the video on the left and the text
after it on the right:

```md
::youtube-lite{id="TPsCd9tatRg" title="Tandem Presentation"}
::

### Comment ça se passe ?

The text on the right of the video.

---

The text after the line takes the full width again.
```

### News

A news item has a `title`, a `date`, a short `description`, a photo and the
text. The photo has a `src`, an `alt`, a `caption` and a `credit`. The credit
shows under the photo.

A news item is written in the two languages, in two files with the same name.
An item with no German file does not show on the German side.

## The CMS

Benjamin logs in at `/admin` with his GitHub account. He needs the Write role
on this repo. Each save is a commit on `main`, and the site is online 2 to 3
minutes later.

- `public/admin/config.yml`: the collections and the fields (news and pages).
  One entry has the French text and the German text side by side. Keep the
  fields the same as `content.schemas.ts`.
- `public/admin/site.js`: the "Vidéo YouTube" button of the text editor.
- `public/admin/aide.html`: the help page of the CMS, in French.

The login goes through the shared `sveltia-cms-auth` worker. The domain of the
site must be in its `ALLOWED_DOMAINS` variable.

## Deploy

A push on `main` builds and deploys the site to the Cloudflare worker `kartel`
(`.github/workflows/deploy.yml`). The workflow needs two secrets in the GitHub
repo: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`.

The URL of the site is written in two files: `site.url` in `nuxt.config.ts` and
`site_url` in `public/admin/config.yml`.

## The kit

The images, the content checks, the admin page and the build rules come from
site-kit. All the code is in this repo, and you can change every file. The
list of the kit files and how they work: [docs/kit.md](docs/kit.md).

`site-kit.json` has the site-kit commit of the last sync. To get the new
changes of site-kit, follow `docs/sync-site.md` in site-kit.
