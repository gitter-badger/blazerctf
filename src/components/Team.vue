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
    <h3>Eligible</h3>
    <p>{{ team.eligible ? "Yes" : "No" }}</p>
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
      passcode: null
    }
  },
  props: [
    'hasTeam',
    'loggedIn',
    'updateAll',
    'team'
  ],
  mounted () {
    this.updateAll()
  },
  methods: {
    join () {
      axios.patch(config.api_url + '/teams', {
        name: this.teamname,
        passcode: this.passcode
      }, { withCredentials: true }).then(function (response) {
        this.updateAll()
      }.bind(this))
    },
    create () {
      axios.post(config.api_url + '/teams', {
        name: this.teamname,
        passcode: this.passcode
      }, { withCredentials: true }).then(function (response) {
        this.updateAll()
      }.bind(this))
    }
  }
}
</script>
