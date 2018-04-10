<template>
  <page-wrapper id="page-login" :page-style="{ backgroundImage: `url('static/jpg/login.jpg')`, backgroundSize: 'cover' }">
    <form-login :logo="`static/svg/logo.svg`" v-model="credentials" class="form-login" @click-login="clickLogin"></form-login>
  </page-wrapper>
</template>

<script>
  export default {
    name: 'PageLogin',
    components: {
      'page-wrapper': () => import('@shared/page-wrapper'),
      'form-login': () => import('@shared/form.login')
    },
    data () {
      return {
        credentials: {
          name: '',
          key: ''
        }
      }
    },
    methods: {
      clickLogin () {
        this.$store.dispatch('Users/LOGIN', this.credentials)
          .then(() => { this.$router.push({ name: 'page.dashboard' }) })
          .catch(error => { console.log(error) })
      }
    }
  }
</script>
