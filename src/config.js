import Home from '@/components/Home'
import About from '@/components/About'
import Challenges from '@/components/Challenges'
import Scoreboard from '@/components/Scoreboard'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Team from '@/components/Team'
import User from '@/components/User'

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
      competition: true,
      team: true
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
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      loggedIn: true,
      rightdivide: true
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
    },
    {
      route: {
        path: '/teams/:id',
        component: Team
      },
      hidden: true
    },
    {
      route: {
        path: '/users/:id',
        component: User
      },
      hidden: true
    },
    {
      route: {
        name: 'Challenge',
        path: '/challenges/:id',
        component: Challenges
      },
      hidden: true
    }
  ],
  competition: {
    start: 0,
    end: Infinity,
    name: 'BlazerCTF',
    registration: true
  },
  api_url: '/api'
}
