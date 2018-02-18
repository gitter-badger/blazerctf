<template>
  <div id="app">
    <navbar :updateAll="update" :loggedIn="loggedIn" :hasTeam="hasTeam"></navbar>
    <router-view :team="team" :updateAll="update" :loggedIn="loggedIn" :hasTeam="hasTeam"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import axios from 'axios'
import config from './config'

export default {
  name: 'App',
  data () {
    return {
      hasTeam: null,
      loggedIn: null,
      team: {
        name: null,
        passcode: null,
        members: [],
        school: null,
        score: null
      }
    }
  },
  components: {
    Navbar: Navbar
  },
  methods: {
    update () {
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
