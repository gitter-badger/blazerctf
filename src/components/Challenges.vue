<template>
  <div class="container">
    <h1 class="center">Challenges</h1>
    <div class="challenges">
      <div v-for="(challenge, index) in challenges" class="challenge-group">
        <challenge :solved="challenge.solved" :index="index" :title="challenge.title" :points="challenge.value" :category="challenge.category"></challenge>
        <challenge-modal :update="update" :solved="challenge.solved" :toast="toast" :id="challenge.id" :ref="'modal'+index.toString()" :title="challenge.title" :points="challenge.value" :category="challenge.category" :description="challenge.description"></challenge-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Challenge from './Challenge'
import ChallengeModal from './ChallengeModal'
import axios from 'axios'
import config from '../config'

export default {
  name: 'Challenges',
  components: {
    Challenge: Challenge,
    ChallengeModal: ChallengeModal
  },
  props: [
    'toast',
    'updateAll'
  ],
  data () {
    return {
      challenges: []
    }
  },
  methods: {
    update () {
      axios.get(config.api_url + '/challenges').then(function (response) {
        this.challenges = response.data
      }.bind(this))
    }
  },
  created () {
    this.update()
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
