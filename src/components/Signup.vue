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
      <input type="password" placeholder="password">
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
      }
    }
  },
  methods: {
    signup () {
      axios.post(config.api_url + '/users', this.formData)
    }
  }
}
</script>
