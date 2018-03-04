<template>
  <div class="container">
    <div class="form">
      <h1>Login</h1>
      <label>Username:</label><br>
      <input v-model="formData.username" type="text" placeholder="username">
      <label>Password:</label><br>
      <input @keydown.enter="login" v-model="formData.password" type="password" placeholder="password">
      <button @click="login">Log In</button>
    </div>
  </div>
</template>

<style scoped>
  button {
    margin-top: 0.5em;
  }
</style>

<script>
import config from '@/config.js'
import axios from 'axios'

export default {
  data () {
    return {
      formData: {
        username: null,
        password: null
      }
    }
  },
  props: [
    'updateAll',
    'toast'
  ],
  methods: {
    login () {
      if (this.formData.username && this.formData.password) {
        var _csrf = this.$root.randomString(64).replace(/[;, ]/g, '')
        document.cookie = '_csrf=' + _csrf
        axios.post(config.api_url + '/auth', Object.assign(this.formData, {_csrf: _csrf}), {withCredentials: true}).then(function () {
          this.updateAll()
          this.$router.push('/')
          this.toast('Successfully logged in!')
        }.bind(this)).catch(function (error) {
          if (error.response.status === 401) {
            this.toast('Wrong username or password.')
          }
        }.bind(this))
      } else {
        this.toast('Enter both a username and a password.')
      }
    }
  }
}
</script>
