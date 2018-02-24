<template>
  <div id="app">
    <navbar :updateAll="update" :loggedIn="loggedIn" :hasTeam="hasTeam"></navbar>
    <router-view :toast="toast" :user="user" :team="team" :updateAll="update" :loggedIn="loggedIn" :hasTeam="hasTeam"/>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Toast from '@/components/Toast'
import axios from 'axios'
import config from './config'

export default {
  name: 'App',
  data () {
    return {
      hasTeam: null,
      loggedIn: null,
      user: {
        username: null,
        id: null,
        eligible: null,
        team: null
      },
      team: {
        name: null,
        passcode: null,
        members: [],
        affiliation: null,
        score: null,
        id: null,
        eligible: null
      }
    }
  },
  components: {
    Navbar: Navbar,
    Toast: Toast
  },
  methods: {
    update () {
      axios.get(config.api_url + '/users/self', { withCredentials: true }).then(function (response) {
        if (response.status === 200) {
          this.loggedIn = true
          this.user = response.data
        }
      }.bind(this)).catch(function (error) {
        if (error) {
          this.loggedIn = false
        }
      }.bind(this))

      axios.get(config.api_url + '/teams/self', { withCredentials: true }).then(function (response) {
        if (response.status === 200) {
          this.hasTeam = true
          this.loggedIn = true
          this.team = response.data
        }
      }.bind(this)).catch(function (error) {
        if (error.response.status === 404) {
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
        this.hasTeam = false
      }.bind(this))
    },
    toast (message) {
      this.$refs.toast.show(message)
    }
  },
  mounted () {
    this.update()
  }
}
</script>

<style lang="scss">
  @import "styles/main.scss";

  #app {
    margin-top: 4em;
  }

  footer {
    margin: 1em;
    text-align: center;
  }
</style>
