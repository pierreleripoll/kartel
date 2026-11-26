# CLAUDE.md

Site of Kartel, the collective of the professional associations of culture in
Valais (Switzerland).
Static Nuxt 4 + Nuxt Content + Sveltia CMS + Cloudflare. Made from site-kit
(`~/code/site-kit`, https://github.com/pierreleripoll/site-kit). Read
[README.md](README.md) and [docs/kit.md](docs/kit.md) first.

Benjamin (the admin of Kartel) edits the text and posts the news in the CMS at
`/admin`. He is not a developer: a field he needs must be in the CMS.

## Commands

```bash
pnpm install
pnpm dev | generate | preview | lint | typecheck
```

`pnpm generate` is the real test: it builds the site and checks the pages
(`scripts/check-build.mjs`, the list of pages is in `package.json`). There is
no other test.

## How the site works

### Two languages, two sets of URLs

A page is in French or in German, never the two. `<html lang>` and the
`hreflang` links follow the page.

| page | French | German |
|---|---|---|
| home | `/fr` | `/de` |
| tandem | `/fr/tandem` | `/de/tandem` |
| durabilité | `/fr/durabilite` | `/de/nachhaltigkeit` |
| news list | `/fr/actualites` | `/de/aktuelles` |
| news item | `/fr/actualites/<slug>` | `/de/aktuelles/<slug>` |

- `app/utils/i18n.ts` has the menu (the URL of each page in the two
  languages) and all the fixed texts of the interface. A new page goes in
  `menu`, with its label in `labels`.
- The content files have the same name in the two languages, the French one:
  `/de/nachhaltigkeit` is `content/de/durabilite.md`, and `/de/aktuelles/<slug>`
  is `content/de/actualites/<slug>.md`. The CMS needs this to show the two
  languages of a page in one entry. `contentPathOf` and `urlOfContent`
  (`app/utils/i18n.ts`) go from a URL to a file and back.
- `app/composables/useSiteNav.ts` makes the menu and the `Français / Deutsch`
  switch of the header. The switch goes to the same page in the other language.
- `/` has no page. `public/_redirects` sends it to `/fr`, and the old URLs
  (`/tandem`, `/durabilite`) to the French pages.

### Pages

The text of a page is `content/fr/<page>.md` and `content/de/<page>.md`. One
Vue page draws them all:
`app/pages/[lang]/[[slug]].vue`, with `app/components/PageBody.vue`.

In the text, a `::youtube-lite{id="..." title="..."}` block starts a block with
two columns: the video on the left, the text after it on the right. The block
stops at the next video, or at a `---` line. After `---` the text takes the
full width again. This is how the tandem pages are made.

### News

A news item is two Markdown files with the same name:
`content/fr/actualites/<slug>.md` and `content/de/actualites/<slug>.md`.
Fields: `title`, `date` (`YYYY-MM-DD`), `description`, `image` (`src`, `alt`,
`caption`, `credit`), then the text. The date and the photo are the same in
the two files, the CMS copies them.

- The menu has the news link in the two languages.
- Benjamin can turn German off for one item in the CMS. Then there is no German
  file: the item does not show on the German side, and the language switch of
  the French article goes to the German list.
- A list with no item is `noindex`.
- `app/components/NewsList.vue` and `NewsArticle.vue` do the work. The pages in
  `app/pages/fr/actualites/` and `app/pages/de/aktuelles/` only give them the
  language.

### CMS

`public/admin/config.yml` has 2 collections: the news and the pages. They use
the i18n of Sveltia: one entry shows the French text and the German text side
by side, and saves one file per language (`content/{{locale}}/...`).
`public/admin/site.js` adds the "Vidéo YouTube" button of the
text editor. `public/admin/aide.html` is the help page for Benjamin, in French.
Update it when the CMS changes.

### Design

Dark theme, VioletSans font. The colors and the sizes are in
`app/assets/css/tokens.css`, the global rules in `app/assets/css/main.css`.
`app/layouts/default.vue` has the header (logo, language switch, menu) and the
`ListMarquee` footer.

## Rules

- Image sizes never go in the content. They come from the manifest that the
  build makes (`modules/image-meta.ts`). No width, height or thumbhash field in
  the CMS.
- The build must fail on bad content, a broken link or a missing image. Don't
  set `failOnError: false`.
- A content schema is written twice: `content.schemas.ts` (Zod) and
  `public/admin/config.yml`. When you add a field, add it in the two files.
- In `content.config.ts`, write one `include` per language. A pattern with
  braces (`{fr,de}/*.md`) does not work: Nuxt Content finds no file.
- Never write a `vw` size with no screen (`sizes="100vw"`). Write `sm:100vw ...`.
- Don't mix the languages in one page. A fixed text of the interface goes in
  `labels` (`app/utils/i18n.ts`), in French and in German.
- You can change every file, also the kit files. When you change a kit file,
  say it in the commit message: the next sync must keep the change.

## Sync with site-kit

`site-kit.json` has the site-kit commit of the last sync, and the commits that
were skipped. To get the new changes, follow `docs/sync-site.md` in site-kit.
Never edit `site-kit.json` by hand out of a sync. Never write in
`~/code/site-kit` from this repo.

## Deploy

A push on `main` builds and deploys the site to the Cloudflare worker `kartel`
(`.github/workflows/deploy.yml`, `wrangler.jsonc`). Never run `pnpm deploy` or
`wrangler deploy` by hand.

## Dev servers and worktrees

Every branch has its own git worktree, tmux session and agent. The session is
`kartel/<branch>`, with the branch in lower case and dashes (`feat/Add_X` gives
`kartel/feat-add-x`), and its panes are `agent`, `frontend`, `shell`.

- Ports are per worktree and live in `.env.worktree`, which every pane exports.
  Never hardcode a port, read `FRONTEND_PORT` from the environment. The main
  checkout keeps 3000.
- The dev servers are already running in their own panes. Do not start them
  again. Read `.wt-logs/*.log` to see what they are doing, the sandbox cannot
  reach the tmux socket.
- `wtx curl <family> [path] [curl args]` is how you reach them. It fills in this
  worktree's port and never prompts, whatever the method: `wtx curl frontend
  /fr/tandem`. Plain curl runs in the sandbox and cannot reach a local port.
- Work on this branch only. Never push `main`. When the work is ready,
  commit it and say so. A human runs `wtx land <branch>` from the main
  checkout, and it refuses uncommitted changes.
- A pre-push hook enforces this. If it refuses a push, that is the design, not a
  bug to work around.
