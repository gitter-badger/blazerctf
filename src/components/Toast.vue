<template>
  <div :class="{ active: active }" class="toast">
    <div class="toast-box">
      <div class="toast-content">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      active: false,
      timeout: null,
      timeout2: null
    }
  },
  methods: {
    show (message) {
      clearTimeout(this.timeout2)
      var changed = false
      if (this.timeout != null) {
        clearTimeout(this.timeout)
        this.timeout = null
        this.active = false
        changed = true
      }
      this.timeout2 = setTimeout(function () {
        this.message = message
        this.active = true
        this.timeout = setTimeout(function () {
          this.active = false
          this.timeout = null
        }.bind(this), 3000)
      }.bind(this), changed ? 300 : 0)
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/colors.scss';

  .toast {
    position: fixed;
    bottom: -4em;
    width: 100%;
    transition: bottom 0.3s;

    &.active {
      bottom: 0;
    }

    .toast-box {
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      height: 100%;
      background-color: $primary;
      max-width: 50em;
      height: 4em;
      border-radius: 1em 1em 0 0;
      margin: auto;
    }
  }
</style>
