module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? '/': '/',
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:8888/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
    },
  },
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('vue')
  //     .tap(options => options);
  // },
};
