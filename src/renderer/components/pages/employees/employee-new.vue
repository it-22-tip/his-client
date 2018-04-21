<template>
  <layout-one>
    <md-toolbar class="md-dense md-toolbar md-primary" md-elevation="0">
        <md-button @click="$router.go(-1)" class="md-icon-button md-dense">
            <md-icon>close</md-icon>
        </md-button>
    </md-toolbar>
    <md-content class="ctc">
        <md-field>
          <label>Nama</label>
          <md-input/>
        </md-field>
        <md-field>
          <label>Posisi</label>
          <md-input/>
        </md-field>
        <calendar>
          <md-field>
            <label>Tanggal Lahir</label>
            <md-input/>
          </md-field>
        </calendar>
    </md-content>
  </layout-one>
</template>

<script>
  export default {
    components: {
      'layout-one': () => import('@partials/layout-one')
    },
    data () {
      return {
        pageTitle: null
      }
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
.ctc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

