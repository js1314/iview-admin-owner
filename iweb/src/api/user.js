import axios from '@/libs/api.request';

export const user_detail = (params = {}, config = {}) => axios.request({
  url: 'user/detail',
  method: 'get',
  params, ...config
});
