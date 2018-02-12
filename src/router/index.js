import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config.js'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: config.pages.map(page => page.route)
})
