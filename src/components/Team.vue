<template>
  <div class="container">
    <h1 class="center">Team {{ team.name }}</h1>
    <div class="cards">
      <team-profile :team="team"></team-profile>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'
import TeamProfile from './TeamProfile'

export default {
  name: 'team',
  data () {
    return {
      team: {}
    }
  },
  components: {
    TeamProfile
  },
  mounted () {
    axios.get(config.api_url + '/teams/' + this.$route.params.id).then(function (response) {
      this.team = response.data
      console.log(this.team)
    }.bind(this)).catch(function (error) {
      if (error.response.status === 404) {
        this.team = {name: 'Not Found'}
      }
    }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
</style>
