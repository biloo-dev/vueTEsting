module.exports = {
  devServer: {
    disableHostCheck: true,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'ar',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
