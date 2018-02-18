<template>
  <nav class="navbar">
    <router-link @click.native="collapse" class="item" to="/">{{ config.competition.name }}</router-link>
    <div @click="toggle" class="hamburger">
      <div></div>
    </div>
    <router-link v-for="page in config.pages" v-show="hasTeam != null && ((!page.team && !page.registration && !page.loggedIn) || (!loggedIn && page.registration) || (hasTeam && page.team) || (loggedIn && page.loggedIn))" v-if="!page.hidden && (!page.competition || config.competition.start<=+new Date() && config.competition.end>=+new Date()) && (!page.registration || config.competition.registration)"  @click.native="collapse" class="item" :class="{collapsed: collapsed, 'right-divide': page.rightdivide}" :to="page.route.path">{{ page.route.name }}</router-link>
    <a :class="{collapsed: collapsed}" v-if="loggedIn" class="item" @click="logout">Logout</a>
  </nav>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'Navbar',
  props: [
    'hasTeam',
    'loggedIn',
    'updateAll'
  ],
  data () {
    return {
      collapsed: true,
      config: config
    }
  },
  methods: {
    collapse () {
      this.collapsed = true
    },
    toggle () {
      this.collapsed = !this.collapsed
    },
    logout () {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      this.updateAll()
      this.$router.push('/login')
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
    background-color: $primary;
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
      right: 0.7em;
      top: 48%;
      transform: translateY(-50%);
      z-index: 1000;

      &:hover {
        cursor: pointer;
      }
    }

    .item {
      background-color: $primary;
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
        background-color: darken($primary, 3%);
        cursor: pointer;
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
