<template>
  <div :class="{ active: active }" class="toast">
    <div class="toast-box">
      <div class="toast-content">{{ message }} <span @click="close" class="close-toast">&times;</span></div>
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
    },
    close () {
      this.active = false
      clearTimeout(this.timeout2)
      clearTimeout(this.timeout)
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/colors.scss';
  $height: 3em;

  .toast {
    position: fixed;
    top: 0;
    width: 100%;
    transition: top 0.3s;

    &.active {
      top: 3em;
    }

    .toast-box {
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      height: 100%;
      background-color: darken($primary, 1%);
      height: $height;
      margin: auto;
    }

    .close-toast {
      position: absolute;
      right: 0.5em;
      font-size: 2em;
      top: -0.05em;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
