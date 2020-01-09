import {getParams} from '@/libs/util';

export const login = () => {
  return {
    data: {
      msg: 'success',
      code: 200,
      result: {
        id: 1,
        name: 'iview-admin-owner',
        token: 'iview-admin-owner',
        avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
      }
    }
  };
};

export const relogin = () => {
  return {
    data: {
      msg: 'success',
      code: 200,
      result: {
        id: 1,
        name: 'iview-admin-owner',
        token: 'iview-admin-owner',
        avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
      }
    }
  };
};

export const logout = req => {
  return {
    data: {
      msg: 'success',
      code: 200,
      result: null
    }
  };
};
