import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' 
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Loading } from 'element-ui';

Vue.use(ElementUI)
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
//请求拦截
axios.interceptors.request.use(config=>{
  // console.log(config);
  let loadingtest=Loading.service({
    text:'loading...',
    fullscreen:false,
    // background:' rgba(200,200,200,.5)',
    customClass:'change'
  })
  setTimeout(loadingtest.close(),1000)
  return config
})
// console.log(store.state.token ==true);

localStorage.setItem('loginToken',store.state.token)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
