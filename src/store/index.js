import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const state = { //要设置的全局访问的state对象
  isLogin: false,
  user: '',
  name: '',
  avatar: '',
  roles: [],
  routers: []
};

const getters = { //实时监听state值的变化(最新状态)\
  routers: () => {
    let arr = [];
    if (state.routers.length === 0) {
      return (JSON.parse(localStorage.getItem('routers'))) ? JSON.parse(localStorage.getItem('routers')) : arr
    } else {
      return state.routers
    }
  },
  State: () => {
    return state
  },
  isLogin: () => {
    return state.isLogin
  },
  token: () => {
    return state.token
  },
  user: () => {
    return state.user
  },
  name: () => {
    return state.name
  },
  avatar: () => {
    return state.avatar
  },
  roles: () => {
    let arr = [];
    if (state.roles.length===0) {
      return (JSON.parse(localStorage.getItem('user'))) ? JSON.parse(localStorage.getItem('user')).roles : arr
      // return JSON.parse(localStorage.getItem('user')).roles
    }else{
      return state.roles
    }
    
  }
};
const mutations = {
  setLogin(state, payload) {
    state.isLogin = payload.isLogin;
  },
  setToken(state, payload) {
    state.token = payload.token;
  },
  setUser(state, payload) {
    state.user = payload.user
  },
  setName(state, payload) {
    state.name = payload.name
  },
  setAvatar(state, payload) {
    state.avatar = payload.avatar
  },
  setRoles: (state, payload) => {
    state.roles = payload.roles
  },
  SetRouters: (state, payload) => {
    state.routers = payload.routers
    console.log('state.routers', state.routers)
  }
};
const actions =  {
  setState(content, payload) {// 获取用户信息
    return new Promise((resolve, reject) => {
      content.commit('setLogin', payload)
      content.commit('setToken', payload)
      content.commit('setUser', payload)
      content.commit('setName', payload)
      content.commit('setAvatar', payload)
      content.commit('setRoles', payload)
      resolve()
    }).catch(error => {
        reject(error)
    })
  },
  GenerateRoutes(content, payload) {
    return new Promise(resolve => {
      content.commit('SetRouters', payload) // 保存到vuex里面,渲染到页面
      resolve()
    }).catch(error => {
      reject(error)
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})