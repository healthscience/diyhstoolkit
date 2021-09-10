module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
