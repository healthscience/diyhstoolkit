// const fs = require('fs')

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    hotOnly: false
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // ? '/hop/code/diyhstoolkit/dist/'
  // : '/hop/code/diyhstoolkit/dist/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true
    },
    electronBuilder: {
      // preload: 'dist_electron/preload.js',
      // Or, for multiple preload files:
      // preload: { preload: 'dist_electron/preload.js' }
      builderOptions:{
        "win": {
          "target": "NSIS",
          "icon": "./public/assets/icon.ico"
        },
        "mac": {
          "target": "default",
          "icon": "./public/assets/icon.icns"
        },
        extraResources: [
          {
            "from": "peerlink/",
            "to": "./peerlink"
            // "filter": ["**/*"]
          },
          {
            "from": "public/assets/icon.ico",
            "to": "./assets/icon.ico"
            // "filter": ["**/*"]
          }
        ]
      }
    }
  }
}
