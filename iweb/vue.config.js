const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: IS_PROD ? '/web' : '/',
  outputDir: '../web',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_a', resolve('src/api'))
      .set('_p', resolve('src/packages'))
      .set('_c', resolve('src/components'))
      .set('_v', resolve('src/view/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: IS_PROD ? {} : {
    port: 8080,
    inline: false,
    hotOnly: false,
    open: false,
    proxy: {
      '/static': {
        target: 'http://localhost:18100/static/',
        changeOrigin: true,
        pathRewrite: {
          '^/static': ''
        }
      },
      '/api': {    // search为转发路径
        target: 'http://localhost:18100/index.php/',  // 目标地址
        // ws: true, // 是否代理websockets
        changeOrigin: true,   // 设置同源  默认false，是否需要改变原始主机头为目标URL,
        pathRewrite: {  // 替换，通配/api的替换成/
          '^/api': ''
        }
      }
    },
  }
};
