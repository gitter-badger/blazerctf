<template>
  <div class="container">
    <div class="form">
      <h1>Login</h1>
      <p v-if="error" class="error">{{ error }}</p>
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
      },
      error: false
    }
  },
  props: [
    'updateAll'
  ],
  methods: {
    login () {
      if (this.formData.username && this.formData.password) {
        axios.post(config.api_url + '/auth', this.formData, {withCredentials: true}).then(function () {
          this.updateAll()
          this.$router.push('/')
          this.error = false
        }.bind(this)).catch(function (error) {
          if (error.response.status === 401) {
            this.setError('Wrong username or password.')
          }
        }.bind(this))
      } else {
        this.setError('Enter both a username and a password.')
      }
    },
    setError (message) {
      setTimeout(function () { this.error = message }.bind(this), this.error ? 200 : 0)
      this.error = false
    }
  }
}
</script>
