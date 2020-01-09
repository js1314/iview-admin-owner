import {login, logout, relogin} from '@/api/api';
import {user_detail} from '@/api/user';
import {setToken, getToken} from '@/libs/util';

export default {
  state: {
    userId: '',
    userName: '',
    avatar: '',
    token: getToken(),
    access: [],
    hasGetInfo: false,
    displayMode: {}
  },
  mutations: {
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    setUserId(state, id) {
      state.userId = id;
    },
    setUserName(state, name) {
      state.userName = name;
    },
    setAccess(state, access) {
      state.access = access;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status;
    }
  },
  actions: {
    // 登录
    handleLogin({commit}, {username, password}) {
      username = username.trim();
      return new Promise((resolve, reject) => {
        login({username, password}).then(res => {
          let data = res.data;
          if (data.code == 200) {
            data = data.result;
            commit('setToken', data.token);
            commit('setUserId', data.id);
            commit('setUserName', data.name);
            commit('setAvatar', data.logo);
            commit('setHasGetInfo', true);
            commit('setAccess', []);
            resolve(data);
          } else {
            reject({response: {data}});
          }
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 重新登录
    handleReLogin({commit}) {
      return new Promise((resolve, reject) => {
        relogin().then(res => {
          let data = res.data;
          if (data.code == 200) {
            data = data.result;
            commit('setToken', data.token);
            resolve(data);
          } else {
            reject({response: {data}});
          }
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 退出登录
    handleLogOut({state, commit}) {
      return new Promise((resolve, reject) => {
        logout({token: state.token}).then(() => {
          commit('setToken', '');
          commit('setUserId', '');
          commit('setUserName', '');
          commit('setAvatar', '');
          commit('setHasGetInfo', false);
          commit('setAccess', []);
          // 暂时没有必要清除会话数据
          // sessionStorage.clear();
          resolve();
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 获取用户相关信息
    getUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        user_detail().then(res => {
          const data = res.data.result;
          commit('setUserId', data.id);
          commit('setUserName', data.name);
          commit('setAvatar', data.logo);
          commit('setHasGetInfo', true);
          commit('setAccess', []);
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    }
  }
};
