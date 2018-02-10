<template>
  <nav class="navbar">
    <router-link @click.native="collapse" class="item" to="/">BlazerCTF</router-link>
    <div @click="toggle" class="hamburger">
      <div></div>
    </div>
    <router-link @click.native="collapse" class="item" :class="{collapsed: collapsed}" to="/about">About</router-link>
    <router-link @click.native="collapse" class="item" :class="{collapsed: collapsed}" to="/challenges">Challenges</router-link>
    <router-link @click.native="collapse" class="item" :class="{collapsed: collapsed}" to="/scoreboard">Scoreboard</router-link>
    <router-link @click.native="collapse" class="item right-divide" :class="{collapsed: collapsed}" to="/login">Login</router-link>
    <router-link @click.native="collapse" class="item" :class="{collapsed: collapsed}" to="/signup">Signup</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    collapse () {
      this.collapsed = true
    },
    toggle () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/colors.scss";

  .navbar {
    z-index: 999;
    display: flex;
    position: absolute;
    top: 0;
    background-color: #c84b4b;
    width: 100%;
    height: 3em;
    text-align: left;

    .hamburger {
      display: none;
      align-items: center;
      border-top: 2px solid white;
      border-bottom: 2px solid white;
      height: 0.75em;
      width: 1.5em;
      div {
        height: 2px;
        width: 100%;
        background-color: white;
      }
      position: absolute;
      right: 0.5em;
      top: 48%;
      transform: translateY(-50%);
      z-index: 1000;

      &:hover {
        cursor: pointer;
      }
    }

    .item {
      background-color: #c84b4b;
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

      @media screen and (max-width: 700px) {
        width: 100%;
      }
    }

    @media screen and (max-width: 700px) {
      flex-flow: row wrap;

      .item {
        width: 100%;

        &.collapsed {
          display: none;
        }
      }

      .hamburger {
        display: flex;
      }
    }
  }
</style>
