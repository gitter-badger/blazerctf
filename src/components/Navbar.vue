<template>
  <nav class="navbar">
    <router-link class="item" to="/">BlazerCTF</router-link>
    <router-link class="item" to="/about">About</router-link>
    <router-link class="item" to="/challenges">Challenges</router-link>
    <router-link class="item" to="/scoreboard">Scoreboard</router-link>
    <router-link class="item right-divide" to="/login">Login</router-link>
    <router-link class="item" to="/signup">Signup</router-link>
  </nav>
</template>

<style lang="scss">
  @import "../styles/colors.scss";

  .navbar {
    display: flex;
    position: absolute;
    top: 0;
    background-color: #c84b4b;
    width: 100%;
    height: 3em;
    text-align: left;

    .item {
      height: 3em;
      display: flex;
      align-items: center;
      padding: 0 1em;
      color: white;
      text-decoration: none;

      &.right-divide {
        margin-left: auto;
      }

      &:hover {
        background-color: $primary;
      }
    }
  }
</style>
