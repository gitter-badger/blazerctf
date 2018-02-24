<template>
  <div v-esc="close" class="modal-container" :class="{ 'closed': !open, 'closing': closing }">
    <div class="modal">
      <div @click="close" class="close">&times;</div>
      <div class="problem-header">
        <h1>{{ title }}</h1><br>
        <h4>{{ points }} points</h4>
        <h4>{{ category }}</h4>
      </div>
      <div class="description"><p>{{ description }}</p></div>
      <div class="flag-input"><input v-model="flag" type="text" @keydown.enter="submit" placeholder="flag{}"><div class="submit"><button @click="submit">Submit</button></div></div>
    </div>
    <div class="modal-bg" @click="close"></div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'

export default {
  name: 'ChallengeModal',
  props: [
    'title',
    'points',
    'category',
    'description',
    'id',
    'toast'
  ],
  data () {
    return {
      open: false,
      closing: false,
      flag: ''
    }
  },
  methods: {
    close () {
      this.closing = true
      setTimeout(function () {
        this.closing = false
        this.open = false
      }.bind(this), 100)
    },
    submit () {
      axios.post(config.api_url + '/challenges/' + this.id.toString() + '/submissions', { flag: this.flag }).then(function (response) {
        if (response.data.correct) {
          this.toast('Nice! You got it.')
        } else {
          this.toast('Nope, that\'s not it.')
        }
        this.flag = ''
      }.bind(this))
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/colors.scss';

  .problem-header {
    text-align: center;
  }

  .modal-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    transition: opacity 0.1s;

    &.closing {
      opacity: 0;
    }

    &.closed {
      opacity: 0;
      visibility: hidden;
    }
  }

  .modal-bg {
    height: 100vh;
    width: 100vw;
    background-color: rgba(200, 200, 200, 0.8);
    position: fixed;
    top: 0;
    left: 0;

    &:hover {
      cursor: pointer;
     }
  }

  .modal {
    h1, h4 {
      font-weight: 200;
    }

    h4 {
      margin: 0;
      margin-top: 0.5em;
    }

    position: fixed;
    top: 48%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    box-shadow: 0 0 0.5em 0.1em rgba(0, 0, 0, 0.2);
    z-index: 2;
    padding: 3em;
    border-radius: 1em;
    min-height: 30vh;
    max-width: 30em;
    background-color: white;

    .close {
      color: $primary;
      position: fixed;
      top: 0.1em;
      right: 0.6em;
      font-size: 2em;

      &:hover {
        cursor: pointer;
      }
    }

    h1 {
      margin-bottom: 0;
    }

    .description {
      display: flex;
      margin: 1.5em 0;
      align-items: center;
    }

    .flag-input {

      font-size: 1.5em;

      display: flex;
      label {
        margin-right: 0.5em;
      }

      input {
        font-size: 1rem;
        flex: 2;
      }

      .submit {
        margin-left: 0.3em;

        button {
          font-size: 1rem;
          height: 100%;
          position: relative;
          bottom: 0.1em;
          padding-bottom: 0.3em;
        }
      }
    }

    @media screen and (max-width: 500px) {
      width: 60vw;
      height: 60vh;
      position: fixed;
      left: 50%;
      top: 50%;
      overflow: auto;

      .flag-input {
        display: block;
        input {
          font-size: 0.8em;
          height: 1.5em;
          width: 97%;
        }
        .submit {
          width: 100%;
          margin-left: 0;
          button {
            padding: 0.1em;
            margin-top: 0.5em;
            font-size: 0.8em;
            width: 100%;
          }
        }
      }
    }
  }
</style>
