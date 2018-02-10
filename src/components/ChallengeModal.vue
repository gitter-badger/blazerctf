<template>
  <div class="modal-container" :class="{ 'hidden': !open }">
    <div class="modal">
      <div class="problem-header">
        <h1>{{ title }}</h1>
        <h4>{{ points }} points</h4>
        <h4>{{ category }}</h4>
      </div>
      <div class="description"><p>{{ description }}</p></div>
      <div class="flag-input"><label>Flag: </label><input type="text" placeholder="flag{}"><div class="submit"><button>Submit</button></div></div>
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
  },
}
</script>

<style lang="scss">
  .problem-header {
    text-align: center;
  }

  .modal-bg {
    height: 100vh;
    width: 100vw;
    background-color: rgba(200, 200, 200, 0.8);
    position: absolute;
    top: 0;
    left: 0;

    &:hover {
      cursor: pointer;
     }
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 2em;
    min-height: 30vh;
    max-width: 30em;
    margin: 1em;
    background-color: white;
    box-shadow: darken(white, 30%) 0.2em 0.2em;

    h1 {
      margin-bottom: 0;
    }

    .description {
      display: flex;
      margin-bottom: 1em;
      align-items: center;
    }

    .flag-input {
      display: flex;
      label {
        margin-right: 0.5em;
      }

      input {
        flex: 2;
      }
    }
    .submit {
      margin-left: 0.5em;
    }
  }
</style>
