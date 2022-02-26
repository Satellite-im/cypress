const { initPlugin } = require('cypress-plugin-snapshots/plugin')

module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu')
      return launchOptions
    }
  })
  initPlugin(on, config)
  return config
}
