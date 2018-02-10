<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar: Navbar
  }
}
</script>

<style lang="scss">
  @import "styles/main.scss";

  #app {
    margin-top: 4em;
  }

  footer {
    margin: 1em;
    text-align: center;
  }
</style>
