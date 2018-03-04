<template>
  <div class="card" v-if="team.members">
    <h2 class="center">Team</h2>
    <table class="team-info">
      <tr><td><h3>Name</h3></td><td><p>{{ team.name }}</p></td></tr>
      <tr v-if="team.passcode"><td><h3>Passcode</h3></td><td><p>{{ team.passcode }}</p></td></tr>
      <tr><td><h3>Eligible</h3></td><td><p>{{ team.eligible ? "Yes" : "No" }}</p></td></tr>
      <tr><td><h3>Score</h3></td><td><p>{{ team.score }} points</p></td></tr>
      <tr><td><h3>School</h3></td><td><p>{{ team.affiliation ? team.affiliation : "None" }}</p></td></tr>
    </table>
    <h3>Members</h3>
    <ul>
      <li v-for="member in team.members"><router-link :to="'/users/'+member.id">{{ member.username }}</router-link></li>
    </ul>
    <h3>Solves</h3>
    <ul>
      <li v-for="solve in sortedSolves"><router-link :to="'/challenges/'+solve.challenge.id">{{ solve.challenge.title }}</router-link> @ {{ new Date(solve.time).toLocaleString() }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'team'
  ],
  computed: {
    sortedSolves () {
      var sortedSolves = this.team.solves.slice()
      sortedSolves.sort((a, b) => +new Date(b.time) - +new Date(a.time))
      return sortedSolves
    }
  }
}
</script>

<style lang="scss" scoped>
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
