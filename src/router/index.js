import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
Vue.use(VueRouter)
const routes = [{
  path: '/chat',
  name: 'chat',
  component: () => import('../views/Chat.vue')
},
{
  path: '/',
  name: 'home',
  component: () => import('../views/Home.vue'),
  meta: {
    keepAlive: true // 需要被缓存的组件
  }
},
{
  path: '/setchatlist',
  name: 'setchatlist',
  component: () => import('../views/Setchatlist.vue')
},
{
  path: '/total',
  name: 'total',
  component: () => import('../views/Total.vue')
},

{
  path: '/addto',
  name: 'addto',
  component: () => import('../views/Addto.vue')
},
{
  path: '/addfriends',
  name: 'addfriends',
  component: () => import('../views/Addfriends.vue')
},
{
  path: '/grouplist/:id',
  name: 'grouplist',
  component: () => import('../views/GroupList.vue')
},

{
  path: '/newfriend',
  name: 'newfriend',
  component: () => import('../views/NewFriend.vue')
},
{
  path: '/frienddetails',
  name: 'frienddetails',
  component: () => import('../views/Frienddetails.vue')
},
{
  path: '/contacts',
  name: 'contacts',
  component: () => import('../views/Contacts.vue'),
  meta: {
    keepAlive: true // 需要被缓存的组件
  }
},
{
  path: '/creategroup',
  name: 'creategroup',
  component: () => import('../views/Creategroup.vue')
},
{
  path: '/login',
  name: 'login',
  component: () => import('../views/user/Login.vue')
},
{
  path: '/register',
  name: 'register',
  component: () => import('../views/user/Register.vue')
},
{
  path: '/information',
  name: 'information',
  component: () => import('../views/Information.vue')
},
{
  path: '/editinfo',
  name: 'editinfo',
  component: () => import('../views/Editinfo.vue')
},
{
  path: '/modifypwd',
  name: 'modifypwd',
  component: () => import('../views/Modifypwd.vue')
},
{
  path: '/editportrait',
  name: 'editportrait',
  component: () => import('../views/Editportrait.vue')
}

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token) {
    if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  } else {
    store.dispatch('getinfos')
    if (to.path === '/login') {
      next('/')
      return
    }
    next()
  }
})

export default router
