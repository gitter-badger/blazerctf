<template>
  <div class="challenge" :class="{ 'solved': solved }" @click="openModal">
    <h1>{{ title }}</h1>
    <h4>{{ points }} points</h4>
    <h4>{{ category }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Challenge',
  props: [
    'title',
    'points',
    'category',
    'index',
    'solved',
    'id'
  ],
  methods: {
    openModal () {
      this.$router.push('/challenges/' + this.id)
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/colors.scss';

  .challenge {
    h1 {
      font-size: 1.5em;
    }

    &.solved {
      background-color: $primary;

      h1, h4 {
        color: $secondary;
      }

      box-shadow: darken($primary, 10%) 0.2em 0.2em;
    }

    h4 {
      margin: 0;
      margin-top: 0.5em;
    }

    h1, h4 {
      font-weight: 200;
    }
    border-radius: 1em;
    font-size: 1em;
    text-align: center;
    padding: 1em;
    min-height: 9em;
    max-width: 14em;
    margin: 1em;
    background-color: $secondary;
    box-shadow: rgba(200, 200, 200, 0.8) 0.2em 0.2em;

    &:hover {
      cursor: pointer;
    }
  }
</style>
