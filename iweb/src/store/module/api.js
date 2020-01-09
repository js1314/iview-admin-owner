export default {
  state: {
    apiCacheList: {},
    apiErrorList: []
  },
  mutations: {
    addError: (state, error) => {
      state.apiErrorList.push(error);
    },
    addCache: (state, {url, cache}) => {
      state.apiCacheList[url].push(cache);
    },
    initCache: (state, {url, cache}) => {
      state.apiCacheList[url] = [cache];
    },
    clearCache: (state) => {
      state.apiCacheList = {};
    }
  },
  getters: {
    apiCacheList: state => state.apiCacheList,
    apiLastError: state => state.apiErrorList.end()
  },
  actions: {
    apiAddError({commit}, error) {
      return new Promise(resolve => {
        commit('addError', error);
      });
    },
    apiAddCache({commit}, {url, cache}) {
      commit('addCache', {url, cache});
    },
    apiInitCache({commit}, {url, cache}) {
      commit('initCache', {url, cache});
    },
    apiClearCache({commit}) {
      commit('clearCache');
    }
  }
};

