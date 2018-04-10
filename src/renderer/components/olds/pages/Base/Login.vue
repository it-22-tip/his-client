<template>
  <div class="login-page" :style="style()">
    <md-card class="md-flex-50 md-flex-small-100 login-form">
    <md-card-header class="login-header">

    </md-card-header>
      <md-card-content>
        <img :src="`static/svg/logo.svg`" />

        <md-field>
          <md-icon>email</md-icon>
          <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
        </md-field>

        <md-field>
          <md-icon>vpn_key</md-icon>
          <md-input type="password" name="key" id="key" v-model="form.key" :disabled="sending" />
        </md-field>

      </md-card-content>

      <md-card-actions>
        <div>{{ error }}</div>
        <md-button tabindex="10" @click="onClickInstall" class="md-raised md-primary">Install</md-button>
        <md-button tabindex="11" @click="onClickLogin" class="md-raised md-primary">Masuk</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
  import os from 'os'
  export default {
    name: 'Login',
    data () {
      return {
        form: {
          email: null,
          key: null
        },
        sending: false
      }
    },
    computed: {
      error () {
        return this.$store.getters['Users/errorMessage']
      }
    },
    methods: {
      style () {
        return {
          backgroundImage: `url('static/jpg/login.jpg')`,
          backgroundSize: 'cover'
        }
      },
      onClickInstall () {
        this.$router.push({ name: 'page.install.database' })
      },
      onClickLogin () {
        this.$store.dispatch('Users/LOGIN', this.form)
          .then(() => { this.$router.push({ name: 'page.base.dashboard' }) })
          .catch(error => { console.log(error) })
      }
    },
    mounted () {
      console.log(this.$store)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  .login-page {
    width: 100vw;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }
  .login-form {
    position: absolute;
    width: 400px;
    height: 400px;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    background: rgba(white, .7) !important;
  }
  .login-form .md-field.md-theme-default > .md-icon::after {
    background: transparent !important;
  }
  .md-title {
    text-align: center;
  }
</style>
