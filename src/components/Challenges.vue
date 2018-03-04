<template>
  <div class="container">
    <h1 class="center">Challenges</h1>
    <div class="challenges">
      <div v-for="(challenge, index) in challenges" class="challenge-group">
        <challenge :id="challenge.id" :solved="challenge.solved" :index="index" :title="challenge.title" :points="challenge.value" :category="challenge.category"></challenge>
        <challenge-modal :update="update" :solved="challenge.solved" :toast="toast" :id="challenge.id" :ref="'modal'+challenge.id.toString()" :title="challenge.title" :points="challenge.value" :category="challenge.category" :description="challenge.description"></challenge-modal>
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
    'updateAll',
    'loggedIn'
  ],
  data () {
    return {
      challenges: []
    }
  },
  methods: {
    update (id) {
      if (!this.loggedIn) {
        return this.$router.push('/login')
      }
      return axios.get(config.api_url + '/challenges').then(function (response) {
        this.challenges = response.data
        this.$nextTick(function () {
          if (id || this.$route.params.id) {
            this.$refs['modal' + (id || this.$route.params.id).toString()][0].open = true
          }
        })
      }.bind(this))
    }
  },
  mounted () {
    this.update()
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    this.update(to.params.id)
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Challenge' || to.name === 'Challenges') {
      this.update(to.params.id)
    }
    next()
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
