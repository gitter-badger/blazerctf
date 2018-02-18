<template>
  <div class="container">
    <div class="form">
      <h1>Login</h1>
      <label>Username:</label><br>
      <input v-model="formData.username" type="text" placeholder="username">
      <label>Password:</label><br>
      <input v-model="formData.password" type="password" placeholder="password">
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
    'updateAll'
  ],
  methods: {
    login () {
      axios.post(config.api_url + '/auth', this.formData, {withCredentials: true}).then(function () {
        this.updateAll()
        this.$router.push('/')
      }.bind(this))
    }
  }
}
</script>
