<template>
  <div class="container">
    <h1>Scoreboard</h1>
    <table class="scoreboard">
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
          <td>{{ team.school }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'scoreboard',
  data () {
    return {
      teams: [{
        place: 1,
        name: 'First Example Team',
        school: 'Fake School',
        points: 987
      }, {
        place: 2,
        name: 'Second Example Team',
        school: 'Not A Real School',
        points: 923
      }, {
        place: 3,
        name: 'Third Example Team',
        school: 'Nonexistant School',
        points: 642
      }, {
        place: 4,
        name: 'Fourth Example Team',
        school: 'School That Doesn\'t Exist',
        points: 12
      }, {
        place: 5,
        name: 'Fifth Example Team',
        school: 'No School',
        points: 3
      }]
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/colors.scss';

  .scoreboard {
    font-size: 1.3em;
    width: 100%;

    tr {
      width: 100%;
      text-align: left;
    }

    tbody tr {
      &:nth-child(odd) {
        background: transparentize(#c8c8c8, .8);
      }
    }

    &, th, td {
      padding: 0.5em;
      border-collapse: collapse;
    }

    @media only screen and (max-width: 768px) {
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
