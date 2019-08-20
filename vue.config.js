const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
  publicPath: process.env.BASE_URL,
  devServer: {
    port: 3001,
    proxy: {
      '/api': {
        target: process.env.PROXY_TARGET,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      // 会导致 AntDesignVue 表单出错
      // new LodashModuleReplacementPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    ],
  },
};
