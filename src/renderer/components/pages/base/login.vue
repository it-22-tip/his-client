<template>
  <div>
    <login-form
      @login="onLogin"
      @install="onInstall"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  console.log(Promise.version)
  export default {
    name: 'LoginForm',
    components: {
      'login-form': () => import('@partials/login-form'),
      'base-button': () => import('@partials/base-button')
    },
    mounted () {
    },
    data () {
      return {
        person: null,
        employee: null
      }
    },
    methods: {
      onLogin () {
        this.$store.commit('Users/LOGIN_SUCCESS')
        this.$router.push({ name: 'base.dashboard' })
      },
      onInstall($event) {
        this.$router.push({ name: 'base.install' })
      }
    }
  }
</script>
