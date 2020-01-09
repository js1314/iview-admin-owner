import {user_detail} from "./user";

export const login = user_detail;

export const relogin = user_detail;

export const logout = req => {
  return {
    msg: 'success',
    code: 200,
    result: null
  };
};
