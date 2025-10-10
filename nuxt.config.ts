// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    //
  },
  colorMode: {
    preference: 'system',
    // preference: 'system',
    fallback: 'dark',
  },
})
