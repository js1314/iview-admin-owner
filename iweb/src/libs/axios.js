import axios from 'axios';
import store from '@/store';
import {getToken} from '@/libs/util';
// import { Spin } from 'view-design'
import router from '@/router';
import {Message, Modal} from 'view-design';
import md5 from 'js-md5';

const CIPHER = 'demo';

function addErrorLog(errorInfo) {
  const {statusText, status, request: {responseURL}} = errorInfo;
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  };
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info);
}

function randStr(length) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

function cipherData(data) {
  const result = {};
  const cipher = {...data, cipher: CIPHER};
  Object.keys(cipher).sort().forEach(function (key) {
    let val = cipher[key];
    if (val === 0 || val === '0') {
    } else if (!val || Object.isObject(val) || Object.isArray(val)) { // object, array
      return;
    } else if (Object.isDate(val)) { // 日期对象转换成时间戳
      val = val.getTime() / 1000;
      data[key] = val;
    }
    result[key] = val;
  });
  // console.log(result);
  return result;
}

function checkReLogin(url, status, statusText) {
  if (status == 404) { // 请求接口不存在
    Message.error(url + '：' + statusText);
    return true;
  }
  if (status == 400 || status == 401) { // 登录超时
    Modal.confirm({
      title: '登录超时',
      okText: '重新登录',
      cancelText: '退出登录',
      content: '确定重新登录吗？',
      onCancel: () => router.push('logout'),
      onOk: () => store.dispatch('handleReLogin').then(data => {
        Message.success('重新登录成功，可继续操作了~');
      }).catch(error => {
        setTimeout(() => {
          Modal.error({
            title: '重新登录失败，请退出登录后在试！',
            okText: '退出登录',
            closable: false,
            onOk: () => router.push('logout')
          });
        }, 300);
      })
    });
    return true;
  }
  return false;
}

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      'Content-Type': 'application/json',
      headers: {
        'access-token': getToken()
      }
    };
    return config;
  }

  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true;
      return config;
    }, error => {
      return Promise.reject(error);
    });
    // 响应拦截
    instance.interceptors.response.use(response => {
      this.destroy(url);
      const {data, status, statusText} = response;
      checkReLogin(url, status, statusText);
      return {data, status};
    }, error => {
      this.destroy(url);
      let response = error.response;
      if (response) {
        checkReLogin(url, response.status, response.statusText);
      } else {
        const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error));
        response = {statusText, status, request: {responseURL: config.url}};
        checkReLogin(url, status, statusText);
      }
      // addErrorLog(error);
      return response.data ? response : Promise.reject(error);
    });
  }

  /**
   * 请求加密（会有CIPHER暴露问题）
   * @param options
   * @returns {*}
   */
  md5Options(options) {
    options = options || {};
    Object.assign(options, this.getInsideConfig());
    let isGet = options.method === 'get';
    let key = isGet ? 'params' : 'data';
    let data = {...options[key]};
    Object.assign(data, {time: Math.floor(Date.now() / 1000), rand: randStr(6)});
    const checkData = cipherData(data);
    // console.log(checkData);
    data._check = md5(Object.values(checkData).join('&'));
    options[key] = data;
    return options;
  }

  /**
   * 检测是否根据参数进行过缓存
   * 前置条件：get请求,params.$cache=true
   * @param options
   * @return {*}
   */
  isCached(options) {
    let cache = {cached: false};
    if (options.method !== 'get') {
      return cache;
    }
    let params = options.params;
    let id = params ? params.$cache : options.$cache;
    if (id === undefined) {
      return cache;
    }
    if (params) {
      delete params.$cache;
    } else {
      delete options.$cache;
    }
    if (id === false) {
      return cache;
    }
    if (id === true) { // 如果$cache=true,则用参数作为缓存id
      cache.id = JSON.stringify(params);
    } else {
      cache.id = id;
    }
    let url = options.url;
    let items = store.getters.apiCacheList[url];
    if (!items) {
      store.dispatch('apiInitCache', {url, cache});
    } else {
      for (let i = 0, l = items.length; i < l; i++) {
        if (items[i].id === cache.id) {
          return items[i];
        }
      }
      store.dispatch('apiAddCache', {url, cache});
    }
    return cache;
  }

  request(options) {
    let cache = this.isCached(options);
    if (!cache.cached) {
      let instance = axios.create();
      const _options = this.md5Options(options);
      this.interceptors(instance, _options.url);
      cache.promise = instance(_options);
      cache.cached = !!cache.id;
    }
    return cache.promise;
  }
}

export default HttpRequest;
