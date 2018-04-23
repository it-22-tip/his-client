<template>
  <tab-view>
    <md-content class="ctc">
      [psg]
    </md-content>
  </tab-view>
</template>

<script>
  export default {
    name: 'Ej',
    components: {
      'tab-view': () => import('./tab')
    }
  }
</script>

<style lang="scss" scoped>
.transparent {
  background-color: transparent;
  padding: 0 10px;
}
.page-md-field.md-field {
  width: 64px;
  margin-top: 0px;
  margin-bottom: 12px;
  padding-top: 12px;
  min-height: 44px;
}
.page-md-field.md-field::before,
.page-md-field.md-field::after {
  display: none;
  width: 64px !important;
}
.page-input {
  width: 64px !important;
  padding: 5px;
  background-color: white;
  border-radius: 3px !important;
}
.ctc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.psg {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.search {
  width: 300px;
}
.search input {
  background-color: #fff;
}
.right-table {
}
</style>
