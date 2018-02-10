<template>
  <div class="challenge" @click="openModal">
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
    'index'
  ],
  methods: {
    openModal () {
      this.$parent.$refs['modal' + this.index.toString()][0].open = true
    }
  }
}
</script>

<style lang="scss">
  .challenge {
    font-size: 0.8em;
    text-align: center;
    padding: 1em;
    min-height: 9em;
    max-width: 18em;
    margin: 1em;
    background-color: rgba(230, 230, 230, 0.5);
    box-shadow: rgba(200, 200, 200, 0.8) 0.2em 0.2em;

    &:hover {
      cursor: pointer;
    }
  }
</style>
