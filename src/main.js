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
  template: '<App/>',
  methods: {
    randomString (length) {
      var string = ''
      var crypto = window.crypto || window.msCrypto
      var values = new Uint32Array(length)
      crypto.getRandomValues(values)
      for (var i = 0; i < length; i++) {
        string += String.fromCharCode((values[i] % (127 - 32)) + 32)
      }
      return string
    }
  }
})
