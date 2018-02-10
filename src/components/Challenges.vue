<template>
  <div class="container">
    <h1 class="center">Challenges</h1>
    <div class="challenges">
      <div v-for="challenge in challenges" class="challenge-group">
        <challenge :title="challenge.title" :points="challenge.points" :category="challenge.category"></challenge>
        <challenge-modal :title="challenge.title" :points="challenge.points" :category="challenge.category" :description="challenge.description"></challenge-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Challenge from './Challenge'
import ChallengeModal from './ChallengeModal'

export default {
  name: 'Challenges',
  components: {
    Challenge: Challenge,
    ChallengeModal: ChallengeModal
  },
  data () {
    return {
      challenges: [{
        title: 'A Very Cool Website',
        points: 80,
        category: 'Web',
        description: 'A challenge where you must solve a problem in order to get points.'
      }]
    }
  }
}
</script>

<style lang="scss">
  .challenges {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
</style>
