import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import message from '../src/plugin/message'
import VueSocketIO from 'vue-socket.io'
import {
  baseURL
} from './api/api'
Vue.use(
  new VueSocketIO({
    // debug: true,
    // 服务器端地址
    connection: baseURL
    // vuex: {
    //   store,
    //   actionPrefix: 'SOCKET_',
    //   mutationPrefix: 'SOCKET_'
    // }
  })
)

Vue.use(message)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
