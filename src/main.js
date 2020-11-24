// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import '@/permission' // permission control
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/iconfont.css';
import "babel-polyfill";
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(ElementUI, { locale })
 
import 'vue-animate-fullpage/dist/animate.css'
import VueAnimateFullpage from 'vue-animate-fullpage/dist/index'

Vue.use(VueAnimateFullpage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
