<template>
  <div class="container">
    <div class="form">
      <h1>Signup</h1>
      <label>Email:</label>
      <input v-model="formData.email" type="email" placeholder="email">
      <label>Username:</label><br>
      <input v-model="formData.username" type="text" placeholder="username">
      <label>Password:</label><br>
      <input v-model="formData.password" type="password" placeholder="password">
      <label>Confirm Password:</label>
      <input v-model="confirmPassword" type="password" placeholder="password">
      <div class="checkbox-container">
        <div class="checkbox">
          <input v-model="formData.eligible" type="checkbox" id="eligible">
          <label for="eligible">
            <span class="check"></span>
          </label>
        </div>
        <span>I am a high-school or middle-school student living in the United States of America, and am therefore eligible for prizes.</span><br>
      </div>
      <button @click="signup">Sign Up</button>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
import axios from 'axios'

export default {
  data () {
    return {
      formData: {
        email: null,
        username: null,
        password: null,
        eligible: false
      },
      confirmPassword: null
    }
  },
  props: [
    'updateAll',
    'toast'
  ],
  methods: {
    signup () {
      if (this.formData.email && this.formData.username && this.formData.password && this.confirmPassword) {
        if (this.formData.password === this.confirmPassword) {
          if (/\S+@\S+\.\S+/.test(this.formData.email)) {
            var _csrf = this.$root.randomString(64).replace(/[;, ]/g, '')
            document.cookie = '_csrf=' + _csrf
            axios.post(config.api_url + '/users', Object.assign(this.formData, {_csrf: _csrf})).then(function () {
              this.updateAll()
              this.$router.push('login')
            }.bind(this)).catch(function () {
              this.toast('Username or email address already in use.')
            }.bind(this))
          } else {
            this.toast('Invalid email address.')
          }
        } else {
          this.toast('Passwords do not match.')
        }
      } else {
        this.toast('Fill out all required fields.')
      }
    }
  }
}
</script>
