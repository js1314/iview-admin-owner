import axios from '@/libs/api.request';

export const log_insert = (data = {}, config = {}) => axios.request({
  url: 'login',
  method: 'post',
  data, ...config
});
