<template>
  <div class="modal-container" :class="{ 'hidden': !open }">
    <div class="modal">
      <div @click="open = false" class="close">&times;</div>
      <div class="problem-header">
        <h1>{{ title }}</h1>
        <h4>{{ points }} points</h4>
        <h4>{{ category }}</h4>
      </div>
      <div class="description"><p>{{ description }}</p></div>
      <div class="flag-input"><input type="text" placeholder="flag{}"><div class="submit"><button>Submit</button></div></div>
    </div>
    <div class="modal-bg" @click="open = false"></div>
  </div>
</template>

<script>
export default {
  name: 'ChallengeModal',
  props: [
    'title',
    'points',
    'category',
    'description'
  ],
  data () {
    return {
      open: false
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
    position: fixed;
    top: 48%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 2;
    padding: 2em;
    min-height: 30vh;
    max-width: 30em;
    background-color: white;
    box-shadow: darken(white, 30%) 0.2em 0.2em;

    .close {
      color: $primary;
      position: fixed;
      top: 0.1em;
      right: 0.5em;
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
      margin-bottom: 1em;
      align-items: center;
    }

    .flag-input {
      font-size: 1.5em;

      display: flex;
      label {
        margin-right: 0.5em;
      }

      input {
        flex: 2;
      }

      .submit {
        margin-left: 0.3em;

        button {
          height: 100%;
          position: relative;
          bottom: 0.3em;
        }
      }
    }
  }
</style>
