// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Kartel",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "collectif informel · informelles Kollektiv",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/icon.png" },
      ],
    },
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/image"],
  nitro: {
    preset: 'github-pages'
  },
});
