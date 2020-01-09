import Main from '@/components/main';
import parentView from '@/components/parent-view';
import myadminRouters from './myadmin';

const queryTitle = (route, def) => {
  return route ? route.query._title || def : def;
};

const staticRouters = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: Component.lazyView('login/login.vue')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: Component.lazyView('error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: Component.lazyView('error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: Component.lazyView('error-page/404.vue')
  }
];

const dynamicRouters = [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: Component.lazyView('home/home.vue')
      }
    ]
  },
  {
    path: '/system_manage',
    name: 'system_manage',
    component: Main,
    meta: {
      icon: 'md-cog',
      title: '系统管理'
    },
    children: [{
      path: '/logout',
      name: 'logout',
      component: Component.lazyView('login/logout.vue'),
      meta: {
        icon: 'ios-log-out',
        title: '退出登录',
        hideInTag: true
      },
    }]
  },
];

export default process.env.NODE_ENV == 'production' ? [...staticRouters, ...dynamicRouters] : [...staticRouters, ...dynamicRouters, ...myadminRouters];
