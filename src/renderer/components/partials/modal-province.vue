<template>
  <md-dialog
    :md-active.sync="show"
    class="test">
    <md-dialog-title>Provinsi</md-dialog-title>
    <md-content>
      Pilih Provinsi
    </md-content>
  </md-dialog>
</template>

<script>
export default {
  name: 'ModalProvince',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
  .test {
    height: 600px;
  }
</style>
