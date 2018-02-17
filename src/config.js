import Home from '@/components/Home'
import About from '@/components/About'
import Challenges from '@/components/Challenges'
import Scoreboard from '@/components/Scoreboard'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

export default {
  pages: [
    {
      route: {
        path: '/',
        name: 'Home',
        component: Home
      },
      hidden: true
    },
    {
      route: {
        path: '/about',
        name: 'About',
        component: About
      }
    },
    {
      route: {
        path: '/challenges',
        name: 'Challenges',
        component: Challenges
      },
      competition: true
    },
    {
      route: {
        path: '/scoreboard',
        name: 'Scoreboard',
        component: Scoreboard
      },
      competition: true
    },
    {
      route: {
        path: '/login',
        name: 'Login',
        component: Login
      },
      rightdivide: true,
      registration: true
    },
    {
      route: {
        path: '/signup',
        name: 'Signup',
        component: Signup
      },
      registration: true
    }
  ],
  competition: {
    start: Infinity,
    end: Infinity,
    name: 'BlazerCTF',
    registration: false
  }
}
