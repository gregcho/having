const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy : {
      '/parts':{
        target:'http://127.0.0.1:8080',
        changeOrigin: true
      },
      '/output':{
        target:'http://49.254.96.114:8080',
        changeOrigin: true
      },
      '/code1-api':{
        target:'http://49.254.96.114:8080',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
})
