# How the kit works

The kit is the code that all the sites share: images, content checks, admin
page, build rules. It lives in the site itself, in the normal Nuxt folders, so
Nuxt loads it with no line in the config. A site can change every file.

## The kit files

| file | what |
|---|---|
| `nuxt.config.ts` | The rules of the build, after the values of the site (`site`, `app.head`, `css`). |
| `app/components/ThumbhashImage.vue` | Image with a placeholder, see below. |
| `app/components/LightboxGallery.vue`, `LightboxItem.vue` | Images full screen. |
| `app/components/content/ProseImg.vue` | Images of the Markdown body. |
| `app/components/content/YoutubeLite.vue` | YouTube video loaded at the click. |
| `app/composables/useImageMeta.ts` | Size and thumbhash of an image, from the manifest. |
| `app/providers/static-ipx.ts` | Writes the image URLs. |
| `modules/image-meta.ts` | Makes the image manifest at each build. |
| `modules/ipx-cache.ts` | Keeps the derived images in `.ipx-cache/`. |
| `server/routes/_img/[...path].ts` | Answers an image URL. |
| `server/plugins/prerender-images.ts` | Tells the prerender to make the images of each page. |
| `kit/image-url.ts` | The format of the image URL, and the path of an image in the cache. |
| `kit/schemas.ts` | `imageSchema`, for the content schemas. |
| `kit/validate-content.ts` | `defineValidateContent`, the build fails on bad content. |
| `scripts/check-build.mjs` | Checks the pages after the build. |
| `scripts/resize-images.mjs` | Makes big images smaller. |
| `public/admin/index.html`, `aide.html`, `site.js` | The admin page. |
| `.github/workflows/deploy.yml` | Build and deploy. |

The other files are the site: `app/app.vue`, `app/pages/`, `app/assets/css/`,
`content/`, `content.config.ts`, `content.schemas.ts`,
`modules/validate-content.ts`, `public/admin/config.yml`, `public/uploads/`,
`wrangler.jsonc`.

`site-kit.json` has the site-kit commit of the last sync. See
`docs/sync-site.md` in site-kit.

## Images

### The manifest

`modules/image-meta.ts` reads each image file in `public/uploads` at build
time and writes a manifest:

```js
{ "/uploads/photo.jpg": { width: 1800, height: 1200, thumbhash: "XygG..." } }
```

- The content only has the path of the image (`src`). No `width`, `height` or
  `thumbhash` in the frontmatter, and no such field in the CMS config.
- A replaced image is measured again, because the cache key is the hash of the
  file. The cache is `node_modules/.cache/site-kit/image-meta.json`.
- In dev, a new or changed file updates the manifest.
- To scan other folders: `imageMeta: { dirs: ['uploads', 'logos'] }` in
  `nuxt.config.ts` (paths in `public/`).
- An image that sharp can't read stops the build.

### `<ThumbhashImage>`

```vue
<ThumbhashImage :image="{ src, alt, caption }" sizes="sm:100vw md:600px" priority />
<ThumbhashImage src="/uploads/photo.jpg" alt="..." />
```

| prop | what |
|---|---|
| `image` or `src` | An image entry of the content, or the path alone. |
| `alt` | Wins over `image.alt` and `image.caption`. |
| `sizes` | Width of the image on the page, per screen. `sm:100vw md:600px` is full width under 640 px, then 600 px. |
| `densities` | `x1 x2` by default. `x1` halves the build work. |
| `priority` | For the first image of the page: loaded at once. The others are lazy. |
| `aspectRatio` | Forces the ratio of the box. |

Rules:

- The root of the component is a `<span>` shown as a block, so an image in a
  Markdown paragraph is valid HTML. Don't change it to a `<div>`.
- The component fills its parent (`width: 100%; height: 100%`) and keeps the
  photo whole and centered. Give the parent a height for a fixed box. With no
  height, the ratio of the photo gives the height.
- Never write a `vw` size with no screen (`sizes="100vw"`). `@nuxt/image` then
  makes 1 px images. Write `sm:100vw ...`.
- A path with no folder (`photo.jpg`) means `/uploads/photo.jpg`.
- A local image that is not in the manifest is a missing file. The build
  stops, and the log names the image and the page.
- An SVG, a `blob:` URL (CMS preview) or an external URL is shown as it is,
  with no derived images.

Images written in the Markdown body go through the same component
(`app/components/content/ProseImg.vue`).

### Lightbox

```vue
<LightboxGallery>
  <LightboxItem v-for="image in images" :key="image.src" :image="image">
    <ThumbhashImage :image="image" />
  </LightboxItem>
</LightboxGallery>
```

A click on an item opens the image full screen (PhotoSwipe), with the arrows,
the zoom and the swipe on a phone.

- The open image is a WebP made by the build, 2000 px wide at most
  (`maxWidth` prop of `LightboxItem`). Never the original file.
- The text under the open image is the `caption` and the `credit` of the
  image, or the `caption` prop.
- `LightboxGallery` takes an `options` prop for the options of PhotoSwipe.
  The layout of the gallery is the job of the site (`class` on the gallery).
- An image with no known size (SVG, external URL) is shown with no link.
- PhotoSwipe is loaded at the first click, not with the page.

### YouTube

```md
::youtube-lite{id="aqz-KE-bpKQ" title="Le titre de la vidéo"}
::
```

Works in a Markdown body and in a Vue file (`<YoutubeLite id="..." />`). The
page only loads the poster image. The player comes at the click, from
`youtube-nocookie.com`.

### Derived images

With the default provider (`staticIpx`), sharp makes the WebP files at
prerender time. They are static files in production. The URL is:

```
/_img/f_webp~q_80~s_800x533/uploads/photo.jpg.webp
```

It is the IPX URL with two changes, both for Cloudflare static assets:

- `~` between the modifiers. Cloudflare answers a path with `&` or `,` with a
  redirect to its encoded form first, so each image costs one more request.
- The format at the end. Cloudflare takes the type from the extension, and
  `photo.jpg` with WebP inside is sent as `image/jpeg`.

The pieces:

| file | what |
|---|---|
| `kit/image-url.ts` | The format of the URL, and the path of an image in the cache. |
| `app/providers/static-ipx.ts` | Writes the URLs (a provider of `@nuxt/image`). |
| `server/routes/_img/[...path].ts` | Answers a URL: from the cache, else from IPX. |
| `server/plugins/prerender-images.ts` | At prerender, tells Nitro to generate the images of each page. |
| `modules/ipx-cache.ts` | Keeps each generated image in `.ipx-cache/`. |

The cache key has the hash of the source file, so a replaced image is made
again. The deploy workflow keeps `.ipx-cache/` between the runs.

`NUXT_IMAGE_PROVIDER=cloudflare` makes `/cdn-cgi/image/` URLs, resized by
Cloudflare on demand. The zone must have Images > Transformations on.

### Upload

The CMS config resizes photos at upload (2400 px, WebP) and cleans the file
names. For images added by hand, run `pnpm resize-images` (default:
`public/uploads`, 2400 px). Other folder or size:
`pnpm resize-images public/logos 1200`.

## Content checks

Nuxt Content only skips a file that does not match its schema. To stop the
build, the site has `modules/validate-content.ts`:

```ts
import { defineValidateContent } from '../kit/validate-content'
import { schemas } from '../content.schemas'

export default defineValidateContent(schemas)
```

`schemas` is `{ <collection name>: <Zod schema> }`. A second argument can
check rules that a schema can't say. It gets `{ collection, file, content }`
and returns the problem as text.

`imageSchema` (`src`, `alt`, `caption`, `credit`) is in `kit/schemas.ts`.

After the build, `scripts/check-build.mjs` checks that the pages exist, are not
empty, and have a given text. The pages are in the `generate` script of
`package.json`:

```json
"generate": "nuxt generate && node scripts/check-build.mjs / /agenda \"/agenda:<li\""
```

## Admin

| file | what | a site changes it? |
|---|---|---|
| `public/admin/index.html` | Loads Sveltia CMS at a pinned version, and the help button. | Rarely. The Sveltia version comes with the sync. |
| `public/admin/site.js` | Empty. For custom fields and previews. | When needed. |
| `public/admin/aide.html` | Base help page for the editors, in French. | When the site has its own things to explain. |
| `public/admin/config.yml` | The collections and fields of the CMS. | Always. |

To change the Sveltia version: `public/admin/index.html`, one line.

## Config defaults

In `nuxt.config.ts`: prerender with `crawlLinks` and `failOnError: true`, no
sourcemaps, strict TypeScript, WebP at quality 80, `robots.txt` without
`/admin`, a sitemap, `node:sqlite` for Nuxt Content.

Do not set `image.densities` in the config: Nuxt adds the array to the default
one, it does not replace it. Use the `densities` prop.

## Not in the kit yet

- Login without a GitHub account (Sveltia CMS Additions, or an own worker).
- Live preview of the real site in the CMS (from faiscommecheztoi).
- Markdown in frontmatter fields rendered on the server (from mariaclaracastioni).
- Sitemap with image entries.
