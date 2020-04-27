module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? '/': '/',
  lintOnSave: true,
  configureWebpack: config => {
    Object.assign(config, {
      externals: {
        Vue: "Vue"
      }
    });
  },
  devServer: {
    open: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:8888/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

