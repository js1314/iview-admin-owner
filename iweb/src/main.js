// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import config from '@/config';
import router from './router';
import store from './store';
import i18n from '@/locale';
import importDirective from '@/directive';
import installPlugin from '@/plugin';
import {directive as clickOutside} from 'v-click-outside-x';
import iView from 'view-design';

import './index.less';
import '@/assets/icons/iconfont.css';
import 'v-org-tree/dist/v-org-tree.css';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import 'viewerjs/dist/viewer.css';

import 'kindeditor/themes/default/default.css';
import 'kindeditor/kindeditor-all-min.js';

import TreeTable from 'tree-table-vue';
import VOrgTree from 'v-org-tree';
import AdminTable from 'iview-admin-table';
import KindEditor from 'vue-kindeditor';
import TreeSelect from '@riophae/vue-treeselect';
import Viewer from 'v-viewer';

/* eslint-disable */
// 实际打包时应该不引入mock
config.production || require('@/mock');

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(TreeTable);
Vue.use(VOrgTree);
Vue.use(KindEditor);
Vue.use(Viewer);

Vue.component('TreeSelect', TreeSelect);
Vue.component('AdminTable', AdminTable);

/**
 * @description 注册插件
 */
installPlugin(Vue);

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;

/**
 * 注册指令
 */
importDirective(Vue);
Vue.directive('clickOutside', clickOutside);

// 替换window.alert
window.alert = content => {
  iView.Modal.warning({
    title: '提示',
    content
  });
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
});
