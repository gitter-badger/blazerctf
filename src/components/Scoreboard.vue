<template>
  <div class="container">
    <h1>Scoreboard</h1>
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
        <tr v-for="team in teams">
          <td>{{ team.place }}</td>
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
      updateInterval: null
    }
  },
  methods: {
    update () {
      axios.get(config.api_url + '/teams').then(function (response) {
        this.teams = response.data
        this.teamsLoaded = true
      }.bind(this))
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

<style lang="scss">
  @import '../styles/colors.scss';

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
