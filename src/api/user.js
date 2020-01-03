// 请求接口
import axios from 'axios'
// 设置默认访问路径
import {
  baseURL
} from './api'
axios.defaults.baseURL = baseURL

// 请求拦截 响应拦截 Interceptors 拦截器
axios.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  Promise.reject(err)
})

// 注册
export let setRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data: data
  })
}
// 登录
export let getLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data: data
  })
}
// 验证
export let getinfo = (token) => {
  return axios({
    method: 'get',
    url: '/info',
    params: token
  })
}
// 修改头像
export let Headportrait = (data) => {
  return axios({
    method: 'post',
    url: '/headportrait',
    data: data
  })
}
// 查找好友
export let getlookforsb = (data) => {
  return axios({
    method: 'post',
    url: '/lookforsb',
    // url: '/friendslist',

    data: data
  })
}
// 添加好友
export let setaddfriends = (data) => {
  return axios({
    method: 'post',
    // url: '/addfriends',
    url: '/addfriend',
    data: data
  })
}
// 获取好友
export let getaddfriendstates = (data) => {
  return axios({
    method: 'post',
    // url: '/addfriendstates',
    url: '/friendslist',
    data: data
  })
}
// newfriendlist
// 获取添加好友
export let getNewFriendlist = (data) => {
  return axios({
    method: 'post',
    // url: '/addfriendstates',
    url: '/newfriendlist',
    data: data
  })
}
// 同意
export let setAgrees = (data) => {
  return axios({
    method: 'post',
    url: '/consentfriend',
    data: data
  })
}

// 同意
export let getprivatechat = (data) => {
  return axios({
    method: 'post',
    url: '/privatechat',
    data: data
  })
}

// 创建群聊
export let setCreategroup = (data) => {
  console.log(data)
  return axios({
    method: 'post',
    url: '/creategroup',
    data: data
  })
}

// 获取群列表
export let getgroupList = (data) => {
  return axios({
    method: 'post',
    url: '/getgrouplist',
    data: data
  })
}
// 群查询
export let getaddgroup = (data) => {
  return axios({
    method: 'post',
    url: '/getaddgroup',
    data: data
  })
}

// 添加消息列表
export let setmessagelist = (data) => {
  return axios({
    method: 'post',
    url: '/setmessagelist',
    data: data
  })
}
// 获取消息列表
export let getmessagelist = (data) => {
  return axios({
    method: 'post',
    url: '/getmessagelist',
    data: data
  })
}
// 修改密码
export let upadatapassword = (data) => {
  console.log(data)

  return axios({
    method: 'post',
    url: '/upadatapassword',
    data: data
    // username:username
  })
}
