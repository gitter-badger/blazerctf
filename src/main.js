import Vue from 'vue'
import App from './App'
import router from './router'
import VueEsc from 'vue-esc'

Vue.config.productionTip = false
Vue.use(VueEsc)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
