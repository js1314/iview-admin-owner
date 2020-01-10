import Cookies from 'js-cookie';
// cookie保存的天数
import config from '@/config';
import {hasOneOf, objEqual} from '@/libs/tools';

const {title, cookieExpires, useI18n} = config;

const TOKEN_KEY = 'token';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1});
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY) || '';
};

export const hasChild = ({children}) => {
  return children && children.length !== 0;
};

const showThisMenuEle = ({meta}, access) => {
  return meta && meta.access && meta.access.length ? hasOneOf(meta.access, access) : true;
};

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = [];
  list.forEach(item => {
    let meta = item.meta || {};
    if (!meta || (meta && !meta.hideInMenu)) {
      let obj = {
        icon: meta.icon || '',
        name: item.name,
        meta: item.meta
      };
      if ((hasChild(item) || meta.showAlways) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access);
      }
      if (meta.href) {
        obj.href = meta.href;
      }
      if (showThisMenuEle(item, access)) {
        res.push(obj);
      }
    }
  });
  return res;
};

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = {...homeRoute, icon: homeRoute.meta.icon};
  let routeMetched = route.matched;
  if (routeMetched.some(item => item.name === homeRoute.name)) {
    return [homeItem];
  }
  let matched = routeMetched.filter(item => !item.meta || !item.meta.hideInBread).map(item => {
    let meta = {...item.meta};
    let $title = meta.title;
    if (Function.isFunction($title)) { // 动态标题
      item.meta.$title = meta.$title = $title;
      meta.title = $title(route);
    }
    return {
      name: item.name || '',
      icon: meta.icon || '',
      meta: meta
    };
  });
  return [{...homeItem, to: homeRoute.path}, ...matched];
};

export const getRouteTitleHandled = (route) => {
  let router = {...route};
  let meta = {...route.meta};
  let title = '';
  let $title = meta.title;
  if ($title) {
    if (Function.isFunction($title)) { // 动态标题
      route.meta.$title = meta.$title = $title;
      title = $title(router);
    } else {
      title = $title;
    }
  }
  meta.title = title;
  router.meta = meta;
  return router;
};

export const showTitle = (item, vm) => {
  let {title, $title} = item.meta;
  if (!useI18n) {
    title = $title ? $title(vm.$route, title) : title || item.name;
  } else if (title.includes('{{') && title.includes('}}') && useI18n) {
    title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())));
  } else {
    title = $title ? $title(vm.$route, title) : vm.$t(item.name);
  }
  return title || '';
};

/**
 * 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = (id, list) => {
  localStorage['tagNavList' + id] = JSON.stringify(list);
};
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = (id) => {
  const list = localStorage['tagNavList' + id];
  return list ? JSON.parse(list) : [];
};

/**
 * @param {Array} routers 路由列表数组
 * 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1;
  let len = routers.length;
  let homeRoute = {};
  while (++i < len) {
    let item = routers[i];
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName);
      if (res.name) {
        return res;
      }
    } else {
      if (item.name === homeName) {
        homeRoute = item;
      }
    }
  }
  return homeRoute;
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const {name, path, meta} = newRoute;
  let newList = [...list];
  if (newList.findIndex(item => item.name === name) < 0) {
    newList.push({name, path, meta});
  }
  return newList;
};

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  return route.meta && route.meta.access ? hasOneOf(access, route.meta.access) : true;
};

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children);
      } else if (item.name === name) {
        return hasAccess(access, item);
      }
    });
  };
  return routePermissionJudge(routes);
};

/**
 * @param {String} url
 * 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&');
  let paramObj = {};
  keyValueArr.forEach(item => {
    const keyValue = item.split('=');
    paramObj[keyValue[0]] = keyValue[1];
  });
  return paramObj;
};

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  if (list.length === 2) {
    return getHomeRoute(list);
  }
  const index = list.findIndex(item => routeEqual(item, route));
  return index === list.length - 1 ? list[list.length - 2] : list[index + 1];
};

/**
 * 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem);
  const pageTitle = showTitle(handledRoute, vm);
  const resTitle = pageTitle ? `${title} - ${pageTitle}` : title;
  window.document.title = resTitle;
};

/**
 * 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2);
};

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  return tagNavList.some(tag => routeEqual(tag, routeItem));
};

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode;
    } else {
      return findNodeUpper(ele.parentNode, tag);
    }
  }
};

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode;
  if (parentNode) {
    let classList = parentNode.classList;
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode;
    } else {
      return findNodeUpperByClasses(parentNode, classes);
    }
  }
};

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase();
  if (ele.childNodes.length) {
    let i = -1;
    let len = ele.childNodes.length;
    while (++i < len) {
      let child = ele.childNodes[i];
      if (child.tagName === tagName) {
        return child;
      } else {
        return findNodeDownward(child, tag);
      }
    }
  }
};

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  };
  scroll(from, to, step);
};

