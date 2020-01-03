import Vue from 'vue'
import Vuex from 'vuex'
import {
  getLogin,
  getinfo,
  getgroupList,
  getaddfriendstates,
  getmessagelist

} from '../api/user'
import Router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    username: '',
    portrait: '',
    sex: '',
    age: '',
    autograph: '',
    RoomList: [],
    loginState: 0,
    // 聊天数据
    infodata: {},
    // 好友列表数据
    friendsData: [],
    friendsList: [],
    friendsShow: [],
    // 群好友列表
    GroupObj: {},
    messageList: []
  },
  mutations: {
    // 聊天数据
    chatdatas (state, data) {
      state.infodata = data
    },

    getinfoss (state, data) {
      state.user = data.user
      state.username = data.username
      state.portrait = data.portrait
      state.sex = data.sex
      state.age = data.age
      state.autograph = data.autograph
    },

    RoomArr (state, data) {
      let room = state.RoomList.includes(data.roomNumber)
      if (!room) {
        state.RoomList = [...state.RoomList, data.roomNumber]
      }
    },
    loginStates (state, data) {
      state.loginState = data
    },
    getfriendstates (state, data) {
      let arr = []
      let showArr = []
      data.map(item => {
        arr.push(item.title)
        showArr.push(false)
      })
      state.friendsData = data
      state.friendsList = arr
      state.friendsShow = showArr
    },
    showBtn (state, id) {
      let arr = JSON.parse(JSON.stringify(state.friendsShow))
      arr[id] = !arr[id]
      state.friendsShow = arr
    },
    getgroupLista (state, data) {
      state.GroupObj = data
    },
    getmessagelis (state, data) {
      state.messageList = data
    }

  },
  actions: {
    // 聊天数据共享
    chatdata ({
      commit
    }, data) {
      commit('chatdatas', data)
    },

    // 获取群列表
    async getgroupLists ({
      commit,
      state
    }, userId) {
      let username = userId ? userId.username : state.username
      let data = await getgroupList({
        username
      })

      if (data.code === 3230) {
        this.dispatch('getgroupLists')
      }
      if (data.code === 20000) {
        commit('getgroupLista', data.data)
      }
    },
    // 获取好友列表
    async getfriendstate ({
      commit,
      state
    }, userId) {
      let username = userId ? userId.username : state.username
      let data = await getaddfriendstates({
        username: username
      })
      if (data.code === 3230) {
        this.dispatch('getfriendstate')
      }
      if (data.code === 20000) {
        commit('getfriendstates', data.data)
      }
    },
    // 获取消息列表
    async getmessagelists ({
      commit,
      state
    }, userId) {
      let username = userId ? userId.username : state.username
      let messagelist = await getmessagelist({
        username: username
      })
      if (messagelist.code === 20000) {
        commit('getmessagelis', messagelist.data)
      }
    },

    // 登录
    async logins ({
      commit
    }, data) {
      await getLogin(data).then(item => {
        if (item.code === 444) {
          this._vm.$message({
            title: item.message
          })
          return
        }
        if (item.code === 20000) {
          this.dispatch('getfriendstate', {
            username: data.username
          })
          this.dispatch('getgroupLists', {
            username: data.username
          })
          localStorage.setItem('token', item.data.token)
          commit('loginStates', 2000)
        }
      })
    },
    loginStates ({
      commit
    }, data) {
      commit('loginStates', 0)
    },
    // 验证登录
    async getinfos ({
      commit
    }) {
      let token = localStorage.getItem('token')
      await getinfo({
        token
      }).then(item => {
        if (item.code === 20000) {
          commit('getinfoss', item.data)
        } else if (item.code === 5005) {
          localStorage.removeItem('token')
          this._vm.$message({
            title: item.message
          })
          Router.push('/login')
          commit('loginStates', 0)
        }
      })
    }

  },
  modules: {}
})
