<template>
<div class="container">
  <h1 class="center">{{ user.username }}'s Profile</h1>
  <div class="form" v-if="hasTeam == false">
    <div class="tabs">
      <div class="tab" :class="{ 'active': tab === 'join' }" @click="tab = 'join'">Join Team</div><!--
      --><div class="tab" :class="{ 'active': tab === 'create' }" @click="tab = 'create'">Create Team</div>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <label>Team Name:</label><br>
    <input v-model="teamname" type="text" placeholder="team name">
    <label v-if="tab === 'create'">School:</label>
    <input v-if="tab === 'create'" v-model="school" type="text" placeholder="school">
    <label>Passcode:</label><br>
    <input v-model="passcode" type="text" placeholder="passcode">
    <button @click="join" v-if="tab === 'join'">Join Team</button>
    <button @click="create" v-if="tab === 'create'">Create Team</button>
  </div>
  <div class="cards">
    <div class="card" v-if="hasTeam">
      <h2 class="center">Team {{ team.name }}</h2>
      <table class="team-info">
        <tr><td><h3>Name</h3></td><td><p>{{ team.name }}</p></td></tr>
        <tr><td><h3>Passcode</h3></td><td><p>{{ team.passcode }}</p></td></tr>
        <tr><td><h3>Eligible</h3></td><td><p>{{ team.eligible ? "Yes" : "No" }}</p></td></tr>
        <tr><td><h3>School</h3></td><td><p>{{ team.affiliation ? team.affiliation : "None" }}</p></td></tr>
      </table>
      <h3>Members</h3>
      <ul>
        <li v-for="member in team.members">{{ member.username }}</li>
      </ul>
    </div>
  </div>

</div>
</template>

<style lang="scss" scoped>
  button {
    margin-top: 0.5em;
  }

  h3 {
    margin: 0.5em;
    margin-top: 0.7em;
  }

  ul {
    margin: 0 0 1em 1em;
  }

  table {
    border-collapse: collapse;
    width: 100%;

    h3, p {
      margin: 0.5em;
      margin-top: 0.7em;
    }

    p {
      margin-top: 0.5em;
    }

    td {
      border-bottom: 1px solid rgb(170, 170, 170);
    }

    h3 {
      margin-right: 1em;
    }
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
      school: null,
      error: false,
      tab: 'join'
    }
  },
  props: [
    'hasTeam',
    'loggedIn',
    'updateAll',
    'team',
    'user'
  ],
  mounted () {
    this.updateAll()
  },
  methods: {
    join () {
      if (this.teamname && this.passcode) {
        axios.patch(config.api_url + '/teams', {
          name: this.teamname,
          passcode: this.passcode
        }, {withCredentials: true}).then(function (response) {
          this.updateAll()
        }.bind(this)).catch(function () {
          this.setError('Invalid team name or passcode.')
        }.bind(this))
      } else {
        this.setError('Fill out all required fields.')
      }
    },
    create () {
      if (this.teamname && this.passcode) {
        axios.post(config.api_url + '/teams', {
          name: this.teamname,
          passcode: this.passcode,
          affiliation: this.school
        }, { withCredentials: true }).then(function (response) {
          this.updateAll()
        }.bind(this)).catch(function () {
          this.setError('Team already exists.')
        }.bind(this))
      } else {
        this.setError('Fill out all required fields.')
      }
    },
    setError (message) {
      setTimeout(function () { this.error = message }.bind(this), this.error ? 200 : 0)
      this.error = false
    }
  }
}
</script>
