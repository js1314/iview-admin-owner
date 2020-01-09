import axios from '@/libs/api.request';

export const login = (data = {}, config = {}) => axios.request({
  url: 'login',
  method: 'post',
  data, ...config
});

export const logout = (params = {}, config = {}) => axios.request({
  url: 'logout',
  method: 'get',
  params, ...config
});

export const relogin = (params = {}, config = {}) => axios.request({
  url: 'relogin',
  method: 'get',
  params, ...config
});
