import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie; 
// 完整引入
// 引入ElementUI组件库
import ElementUI from 'element-ui';
// 引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.http.headers.post['Content-Type']='application/x-www-form-urlencoded'
//自定义指令
Vue.directive('rainbow',{
  //bing(el,binding,vonde)元素   参数binding.value 
  bind:function(el,binding,vnode){
    el.style.color="#" + Math.random().toString(16).slice(2,8);
  }
})

const vm = new Vue({
  beforeCreate () {
    Vue.prototype.$bus = new Vue()
  },
  el:"#app",
  render: h => h(App),
  router:router
})
