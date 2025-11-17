// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/icon', '@nuxt/image'],

  icon: {
    provider: 'iconify',
    serverBundle: {
      collections: ['heroicons'],
    },
  },
  ui: {
    icons: {
      dynamic: true,
    },
  },

  // Increase timeout if needed
  vite: {
    optimizeDeps: {
      include: ['@iconify/vue'],
    },
  },

  colorMode: {
    preference: 'light',
  },

  i18n: {
    locales: [
      { code: 'fr', file: 'fr.json', name: 'Français' },
      { code: 'en', file: 'en.json', name: 'English' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'fr',
    strategy: 'no_prefix',
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  css: ['~/assets/css/main.css'],
  tailwindcss: {
    exposeConfig: false,
    viewer: false,
  },

  compatibilityDate: '2024-01-01',
  app: {
    head: {
      title: 'Wink',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'description', content: 'Wink Lab Onboarding Platform' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
});
