const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/v1": {
        target:'http://117.172.236.74:30866/api',
        changeOrigin: true, // 是否改变域名
        ws: true
      }
    }
  }
})
