<template>
  <div class="card" v-if="user.eligible === false || user.eligible === true">
    <table class="team-info">
      <tr><td><h3>Username</h3></td><td><p>{{ user.username }}</p></td></tr>
      <tr><td><h3>Eligible</h3></td><td><p>{{ user.eligible ? "Yes" : "No" }}</p></td></tr>
      <tr><td><h3>Team</h3></td><td><p><router-link :to="'/teams/'+user.team.id">{{ user.team ? user.team.name : "None" }}</router-link></p></td></tr>
    </table>
  </div>
</template>

<script>
export default {
  props: [
    'user'
  ]
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

    tr:last-child {
      td {
        border-bottom: none;
      }
    }

    h3 {
      margin-right: 1em;
    }
  }
</style>
