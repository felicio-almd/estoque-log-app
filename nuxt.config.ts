// https://nuxt.com/docs/api/configuration/nuxt-config
import { ptBR } from '@clerk/localizations'

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@clerk/nuxt'],
  css: ['~/assets/css/main.css'],
  ui: {
    //
  },
  colorMode: {
    preference: 'system',
    // preference: 'system',
    fallback: 'dark',
  },
  clerk: {
    localization: ptBR,
  },
})
