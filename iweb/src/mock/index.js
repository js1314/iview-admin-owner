import Mock from 'mockjs';
import {login, logout, relogin} from './api';
import {user_detail, user_list} from './user';

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
});

// 登录相关和获取用户信息
Mock.mock(/\/login/, login);
Mock.mock(/\/logout/, logout);
Mock.mock(/\/relogin/, relogin);
Mock.mock(/\/user\/detail/, user_detail);
Mock.mock(/\/user\/list/, user_list);

export default Mock;
