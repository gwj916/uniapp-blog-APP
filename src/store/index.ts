import { createStore } from 'vuex'

export default createStore({
  state: {
    UserInfo: uni.getStorageSync('UserInfo') || null,
    historyList: uni.getStorageSync('historyList') || [],
  },
  mutations: {
    //: 修改用户信息
    updateUserInfo(state, UserInfo) {
      uni.setStorageSync('UserInfo', UserInfo)
      state.UserInfo = UserInfo
    },
    //: 修改历史记录
    sethistoryList(state, val) {
      let list = state.historyList;
      if (list.length > 0 && list.findIndex((item:any) => item === val) > -1)  return
      list.unshift(val);
      uni.setStorageSync('historyList', list)
      state.historyList = list;
    },
    clearhistory(state) {
      uni.removeStorageSync('historyList')
      state.historyList = [];
    }
  },
  actions: {
  },
  modules: {
  }
})
