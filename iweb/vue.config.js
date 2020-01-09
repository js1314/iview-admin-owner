const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const IS_PROD = process.env.NODE_ENV === 'production';
const BASE_URL = IS_PROD ? '/web' : '/';

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  outputDir: '../web',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_p', resolve('src/packages'))
      .set('_c', resolve('src/components'));
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
