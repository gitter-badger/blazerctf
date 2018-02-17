import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config.js'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: config.pages.filter(page => ((!page.competition || (config.competition.start <= +new Date() && config.competition.end >= +new Date())) && (!page.registration || config.competition.registration))).map(page => page.route)
})
