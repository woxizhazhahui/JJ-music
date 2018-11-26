import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import  lazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

fastClick.attach(document.body)

Vue.use(lazyLoad,{
  loading: require('common/img/star-empty.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
