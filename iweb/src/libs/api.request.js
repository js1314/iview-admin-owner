import HttpRequest from '@/libs/axios';
import config from '@/config';

const axios = new HttpRequest(config.baseUrl);
export default axios;
