// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import icont from './assets/icont/iconfont.css'
import echarts from 'echarts'

// import {
//   SwipeCell
// } from 'vant';

// Vue.use(SwipeCell);
//全局注册
// axios.defaults.header['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  icont,
  // SwipeCell,
  components: {
    App
  },
  template: '<App/>'
})
