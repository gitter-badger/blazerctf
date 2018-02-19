<template>
  <div class="container">
    <div class="form">
      <h1>Signup</h1>
      <p v-if="error" class="error">{{ error }}</p>
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
      confirmPassword: null,
      error: false
    }
  },
  props: [
    'updateAll'
  ],
  methods: {
    signup () {
      var elapsed = false
      if (!this.error) { elapsed = true }
      this.error = false
      setTimeout(function () { elapsed = true }, 100)
      if (this.formData.email && this.formData.username && this.formData.password && this.confirmPassword) {
        if (this.formData.password === this.confirmPassword) {
          if (/\S+@\S+\.\S+/.test(this.formData.email)) {
            axios.post(config.api_url + '/users', this.formData).then(function () {
              this.updateAll()
              this.$router.push('login')
            }.bind(this)).catch(function () {
              this.setError('Username or email address already in use.', true, elapsed)
            }.bind(this))
          } else {
            this.setError('Invalid email address.', true, elapsed)
          }
        } else {
          this.setError('Passwords do not match.', true, elapsed)
        }
      } else {
        this.setError('Fill out all required fields.', true, elapsed)
      }
    },
    setError (message, delayed, elapsed) {
      setTimeout(function () { this.error = message }.bind(this), delayed && !elapsed ? 200 : 0)
      this.error = false
    }
  }
}
</script>
