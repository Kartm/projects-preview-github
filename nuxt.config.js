export default {
  loading: { color: '#fff' },

  plugins: [
    // .client will only be run client side on initial app load
    '~/plugins/init.client.ts'
  ],

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/dotenv'],

  modules: ['@nuxtjs/axios'],

  typescript: {
    typeCheck: {
      eslint: true
    }
  }
};
