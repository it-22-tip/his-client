<template>
  <md-card
    :style="style()"
    class="form login"
    md-elevation="0">
    <md-card-content>
      <div
        :style="{ backgroundImage: `url(` + logo + `)`, backgroundSize: 'cover' }"
        class="logo"/>
      <md-field>
        <md-icon>email</md-icon>
        <md-input
          id="email"
          v-model="value.name"
          type="email"
          name="email"
          autocomplete="email" />
      </md-field>
      <md-field>
        <md-icon>vpn_key</md-icon>
        <md-input
          id="key"
          v-model="value.key"
          type="password"
          name="key" />
      </md-field>
    </md-card-content>
    <md-card-actions>
      <md-button
        class="md-raised md-primary"
        @click="clickLogin">Masuk</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'FormLogin',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          name: '',
          key: ''
        }
      }
    },
    logo: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 350
    }
  },
  methods: {
    clickLogin () {
      this.$emit('input', this.value)
      this.$emit('click-login')
    },
    style () {
      return {
        'border-radius': '0 !important',
        'position': 'absolute',
        'width': this.width + 'px',
        'height': this.height + 'px',
        'top': 'calc(50% - ' + this.height / 2 + 'px)',
        'left': 'calc(50% - ' + this.width / 2 + 'px)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .form.login {
    background-color: rgba(white, .7) !important
  }
  .form.login .md-field.md-theme-default > .md-icon::after {
    background: transparent !important;
  }
  .form.login .logo {
    text-align: center;
    height: 110px;
    width: 368px;
    display: block;
  }
  .form.login .logo img {
    margin: 0 auto;
  }
  .form.login .md-button {
    border-radius: 0;
  }
</style>
