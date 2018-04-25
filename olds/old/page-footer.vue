<template>
  <md-toolbar class="page-container-footer">
    <div class="md-toolbar-section-start">
      <p style="color: #ffcc00; margin-right: 10px;">Processing ...</p>
      <md-progress-spinner
        :md-diameter="10"
        :md-stroke="1"
        class="md-primary"
        md-mode="indeterminate"/>
    </div>
    <div class="md-toolbar-section-end">
      <p style="color: #ffcc00; margin-right: 10px;">Processing ...</p>
      <md-progress-spinner
        :md-diameter="10"
        :md-stroke="1"
        class="md-primary"
        md-mode="indeterminate"/>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    this.message = ''
  }
}
</script>

<style lang="scss" scoped>
  .page-container-footer {
    height: 32px !important;
    max-height: 32px !important;
    min-height: 32px;
    background: grey;
  }
</style>
