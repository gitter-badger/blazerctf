<template>
  <div class="container">
    <h1 class="center">User {{ user.username }}</h1>
    <div class="cards">
      <user-profile :user="user"></user-profile>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'
import UserProfile from './UserProfile'

export default {
  name: 'team',
  data () {
    return {
      user: {}
    }
  },
  components: {
    UserProfile
  },
  mounted () {
    axios.get(config.api_url + '/users/' + this.$route.params.id).then(function (response) {
      this.user = response.data
      console.log(this.user)
    }.bind(this)).catch(function (error) {
      if (error.response.status === 404) {
        this.user = {username: 'Not Found'}
      }
    }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
</style>
