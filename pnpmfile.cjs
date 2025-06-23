const path = require('node:path')

module.exports = {
  hooks: {
    updateConfig (config) {
      const loader = path.join(__dirname, 'esm_loader.mjs')
      config.extraEnv.NODE_OPTIONS = `${process.env.NODE_OPTIONS ? `${process.env.NODE_OPTIONS} ` : ''}--import=data:text/javascript,import{register}from\'node:module\';import{pathToFileURL}from\'node:url\';register(\'${loader}\',pathToFileURL(\'./\'));`
      return config
    },
  },
}

