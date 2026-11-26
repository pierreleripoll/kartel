import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// The values of the site are `site`, `app.head` and `css`. The rest are the
// rules of the kit: images, content, admin, build. See docs/kit.md.
// The modules in ./modules are loaded by Nuxt without a line here.
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', '@nuxt/eslint'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // The layout sets the language of each page.
      htmlAttrs: { lang: 'fr' },
      title: 'Kartel',
      meta: [
        { name: 'description', content: 'collectif informel · informelles Kollektiv' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
      ],
    },
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  site: {
    url: 'https://kartel.ch',
    name: 'Kartel',
  },

  content: {
    // node:sqlite (Node >= 22.5), so better-sqlite3 is not compiled.
    experimental: { sqliteConnector: 'native' },
    // The titles of the text are not links to themselves.
    renderer: { anchorLinks: false },
  },

  sourcemap: false,

  devServer: {
    host: '0.0.0.0',
    port: Number(process.env.FRONTEND_PORT) || 3000,
  },

  compatibilityDate: '2026-11-01',

  nitro: {
    prerender: {
      crawlLinks: true,
      // A broken link or a missing image stops the build.
      failOnError: true,
      // The German news list is not in the menu when it is empty, so the
      // crawler does not find it.
      routes: ['/', '/fr', '/de', '/fr/actualites', '/de/aktuelles'],
      ignore: ['/admin', '/cdn-cgi/image'],
    },
  },

  typescript: { strict: true },

  image: {
    // "staticIpx" (default): IPX, sharp makes the images at build time, they
    // are static files. The URLs are made for Cloudflare, see kit/image-url.ts.
    // "cloudflare": /cdn-cgi/image/ URLs made at the edge. The zone must be on
    // Cloudflare with Images > Transformations on.
    provider: process.env.NUXT_IMAGE_PROVIDER || 'staticIpx',
    providers: {
      staticIpx: { provider: resolve('./app/providers/static-ipx.ts') },
    },
    // Tells @nuxt/image to set up the IPX server, also with a custom provider.
    ipx: {},
    quality: 80,
    format: ['webp'],
    // No `densities` here: Nuxt adds an array to the default one ([1, 2]), it
    // does not replace it. Set it per image, with the prop of <ThumbhashImage>.
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  robots: {
    disallow: ['/admin'],
  },
})
