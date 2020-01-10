import '@js1314/nativejs';

const config = {
  /**
   * @description 生产环境配置
   */
  production: {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: '后台管理系统',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description 是否使用国际化，默认为false
     */
    useI18n: false,
    /**
     * @description api请求基础路径
     */
    baseUrl: '/',
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'home',
    /**
     * @description 需要加载的插件
     */
    plugin: {
      'error-store': {
        showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
        developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
      }
    }
  },
  /**
   * @description 开发环境配置
   */
  development: {
    /**
     * @description api请求基础路径
     */
    baseUrl: '/api/',
  }
};

let env = process.env.NODE_ENV;
let _config = config[env];
_config[env] = true;
_config.development && Object.extend(_config, config.production);

export default _config;
