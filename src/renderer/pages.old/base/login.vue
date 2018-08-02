<template>
  <div>
    <login-form
      @login="onLogin"
      @install="onInstall"
    />
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  components: {
    'login-form': () => import('@components/login-form'),
    'base-button': () => import('@components/base-button')
  },
  data () {
    return {
      person: null,
      employee: null
    }
  },
  mounted () {
  },
  methods: {
    onLogin () {
      this.$store.commit('Users/LOGIN_SUCCESS')
      this.$router.push({ name: 'base.dashboard' })
    },
    onInstall ($event) {
      this.$router.push({ name: 'base.install' })
    }
  }
}
</script>
