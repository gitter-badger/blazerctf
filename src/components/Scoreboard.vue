<template>
  <div class="container">
    <h1>Scoreboard</h1>
    <div class="checkbox-container form">
      <div class="checkbox">
        <input v-model="showIneligible" type="checkbox" id="ineligible">
        <label @click="update" for="ineligible">
          <span class="check"></span>
        </label>
      </div>
      <span>Show ineligible teams.</span><br>
    </div>
    <table class="scoreboard" v-if="teamsLoaded">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>School</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in teams">
          <td>{{ index+1 }}</td>
          <td>{{ team.name }}</td>
          <td>{{ team.affiliation ? team.affiliation : "―" }}</td>
          <td>{{ team.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import config from '@/config.js'
import axios from 'axios'

export default {
  name: 'scoreboard',
  data () {
    return {
      teams: [],
      teamsLoaded: false,
      updateInterval: null,
      showIneligible: true
    }
  },
  methods: {
    update () {
      axios.get(config.api_url + '/teams').then(function (response) {
        this.teams = response.data
        if (!this.showIneligible) {
          this.teams = this.teams.filter(team => team.eligible)
        }
        this.teamsLoaded = true
        this.number()
      }.bind(this))
    },
    number () {
      this.teams.sort(function (a, b) {
        return b.score - a.score
      })
    }
  },
  mounted () {
    this.update()
    this.updateInterval = setInterval(this.update, 10000)
  },
  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/colors.scss';

  .form {
    margin: 0;
    .checkbox {
      font-size: 0.6em;
      bottom: 0.2em;
    }
  }

  .scoreboard {
    font-size: 1em;
    width: 100%;
    margin-bottom: 1em;

    tr {
      width: 100%;
      text-align: left;
    }

    tbody tr {
      &:nth-child(odd) {
        background: $secondary;
      }
    }

    &, th, td {
      padding: 0.5em;
      border-collapse: collapse;
    }

    @media only screen and (max-width: 767px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }

      thead tr {
        display: none;
      }

      td {
        poistion: relative;
      }

      td:nth-of-type(1) {
        font-weight: 400;

        &:before { content: "#" }
      }
      td:nth-of-type(4):after { content: " points" }

    }
  }
</style>
