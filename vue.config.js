module.exports = {
  /* publicPath: process.env.NODE_ENV === 'production'
    ? '/healthscience/code/diyhstoolkit/dist/'
    : '/', */
  publicPath: process.env.NODE_ENV === 'production'
    ? '/diytoolkit/'
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
