<template>
  <nav class="navbar">
    <router-link class="item" to="/">BlazerCTF</router-link>
    <router-link class="item" to="/about">About</router-link>
    <router-link class="item" to="/challenges">Challenges</router-link>
    <router-link class="item" to="/scoreboard">Scoreboard</router-link>
  </nav>
</template>

<style lang="scss">
  @import "../styles/colors.scss";

  .navbar {
    position: absolute;
    top: 0;
    background-color: #c84b4b;
    width: 100%;
    height: 3em;
    text-align: left;

    .item {
      height: 3em;
      vertical-align: middle;
      display: table-cell;
      padding: 0 1em;
      color: white;
      text-decoration: none;

      &:hover {
        background-color: $primary;
      }
    }
  }
</style>
