import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Challenges from '@/components/Challenges'
import Scoreboard from '@/components/Scoreboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/challenges',
      name: 'Challenges',
      component: Challenges
    },
    {
      path: '/scoreboard',
      name: 'Scoreboard',
      component: Scoreboard
    }
  ]
})
