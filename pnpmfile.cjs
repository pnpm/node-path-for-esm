const path = require('node:path')
const { pathToFileURL } = require('node:url');

module.exports = {
  hooks: {
    updateConfig: (config) => {
      // Resolve paths and convert to proper file URLs
      const loaderPath = path.resolve(__dirname, 'esm_loader.mjs')
      const loaderUrl = pathToFileURL(loaderPath).href
      const baseUrl = pathToFileURL(path.resolve('./')).href

      // Build the registration code
      const registrationCode = `import{register}from'node:module';register('${loaderUrl}','${baseUrl}');`

      // Create NODE_OPTIONS with properly encoded data URL
      const importFlag = `--import=data:text/javascript,${encodeURIComponent(registrationCode)}`
      config.extraEnv.NODE_OPTIONS = `${process.env.NODE_OPTIONS ? `${process.env.NODE_OPTIONS} ` : ''}${importFlag}`
      return config
    },
  },
}

