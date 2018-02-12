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
      }
    },
    {
      route: {
        path: '/scoreboard',
        name: 'Scoreboard',
        component: Scoreboard
      }
    },
    {
      route: {
        path: '/login',
        name: 'Login',
        component: Login
      },
      rightdivide: true
    },
    {
      route: {
        path: '/signup',
        name: 'Signup',
        component: Signup
      }
    }
  ]
}
