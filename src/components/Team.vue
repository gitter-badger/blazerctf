<template>
<div class="container">
  <h1 class="center">Team</h1>
  <div class="form" v-if="hasTeam == false">
    <label>Team Name:</label><br>
    <input v-model="teamname" type="text" placeholder="team name">
    <label>Passcode:</label><br>
    <input v-model="passcode" type="text" placeholder="passcode">
    <button @click="join">Join Team</button>
    <button @click="create">Create Team</button>
  </div>
  <div class="team-info" v-if="hasTeam">
    <h3>Team Name</h3><p>{{ team.name }}</p>
    <h3>Passcode</h3>
    <p>{{ team.passcode }}</p>
    <h3>Members</h3>
    <ul>
      <li v-for="member in team.members">{{ member.username }}</li>
    </ul>
  </div>
</div>
</template>

<style lang="scss" scoped>
  button {
    &:last-child {
      margin-left: 0.3em;
    }
    margin-top: 0.5em;
  }
  h3 {
    margin-bottom: -0.6em;
  }
  p {
    margin-left: 1em;
  }
</style>

<script>
import config from '@/config.js'
import axios from 'axios'

export default {
  data () {
    return {
      teamname: null,
      passcode: null,
      hasTeam: null,
      team: {
        name: null,
        passcode: null,
        members: [],
        school: null,
        score: null
      }
    }
  },
  mounted () {
    this.update()
  },
  methods: {
    join () {
      axios.patch(config.api_url + '/teams', {
        name: this.teamname,
        passcode: this.passcode
      }, { withCredentials: true }).then(function (response) {
        this.update()
      }.bind(this))
    },
    create () {
      axios.post(config.api_url + '/teams', {
        name: this.teamname,
        passcode: this.passcode
      }, { withCredentials: true }).then(function (response) {
        this.update()
      }.bind(this))
    },
    update () {
      axios.get(config.api_url + '/teams/self', { withCredentials: true }).then(function (response) {
        if (response.status === 200) {
          this.hasTeam = true
          this.team = response.data
        }
      }.bind(this)).catch(function (error) {
        this.hasTeam = false
      }.bind(this))
    }
  }
}
</script>
