<template>
<div class="container">
  <h1 class="center">{{ user.username }}'s Profile</h1>
  <div class="form" v-if="hasTeam == false">
    <div class="tabs">
      <div class="tab" :class="{ 'active': tab === 'join' }" @click="tab = 'join'">Join Team</div><!--
      --><div class="tab" :class="{ 'active': tab === 'create' }" @click="tab = 'create'">Create Team</div>
    </div>
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
    <team-profile v-if="hasTeam" :team="team"></team-profile>
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
    }

    p {
      position: relative;
      bottom: 0.05em;
    }

    td {
      border-bottom: 1px solid rgb(170, 170, 170);
      padding-top: 0.3em;
    }

    h3 {
      margin-right: 1em;
    }
  }
</style>

<script>
import config from '@/config.js'
import axios from 'axios'
import TeamProfile from "./TeamProfile";

export default {
  components: {TeamProfile},
  data () {
    return {
      teamname: null,
      passcode: null,
      school: null,
      tab: 'join'
    }
  },
  props: [
    'hasTeam',
    'loggedIn',
    'updateAll',
    'team',
    'user',
    'toast'
  ],
  mounted () {
    this.updateAll()
  },
  methods: {
    join () {
      if (this.teamname && this.passcode) {
        var _csrf = this.$root.randomString(64).replace(/[;, ]/g, '')
        document.cookie = '_csrf=' + _csrf
        axios.patch(config.api_url + '/teams', {
          _csrf: _csrf,
          name: this.teamname,
          passcode: this.passcode
        }, {withCredentials: true}).then(function (response) {
          this.updateAll()
        }.bind(this)).catch(function () {
          this.toast('Invalid team name or passcode.')
        }.bind(this))
      } else {
        this.toast('Fill out all required fields.')
      }
    },
    create () {
      if (this.teamname && this.passcode) {
        var _csrf = this.$root.randomString(64).replace(/[;, ]/g, '')
        document.cookie = '_csrf=' + _csrf
        axios.post(config.api_url + '/teams', {
          _csrf: _csrf,
          name: this.teamname,
          passcode: this.passcode,
          affiliation: this.school
        }, { withCredentials: true }).then(function (response) {
          this.updateAll()
        }.bind(this)).catch(function () {
          this.toast('Team already exists.')
        }.bind(this))
      } else {
        this.toast('Fill out all required fields.')
      }
    }
  }
}
</script>
