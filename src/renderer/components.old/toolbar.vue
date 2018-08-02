<template>
  <md-toolbar
    class="md-primary md-dense bottom-toolbar"
    md-elevation="0">
    <div class="md-toolbar-section-start">
      <md-button
        class="md-icon-button"
        @click="$router.push({ name: 'employee.new' })">
        <md-icon>add</md-icon>
      </md-button>
    </div>

    <div class="md-toolbar-section-end">
      <md-field
        class="page-md-field"
        md-inline
        md-dense>
        <md-input
          v-model="activePage"
          :max="total"
          :min="1"
          class="page-input"
          type="number"/>
      </md-field>
      <md-content class="transparent">
        Dari {{ total }} Halaman
      </md-content>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  computed: {
    activePage: {
      get () {
        return this.page
      },
      set (v) {
        this.$emit('change-page', parseInt(v))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.md-toolbar.md-theme-default.md-primary.bottom-toolbar {
  background: rgb(235,111,165); /* Old browsers */
  background: -moz-linear-gradient(-45deg, rgba(235,111,165,1) 0%, rgba(255,153,153,1) 50%, rgba(232,46,123,1) 100%);
  background: -webkit-linear-gradient(-45deg, rgba(235,111,165,1) 0%,rgba(255,153,153,1) 50%,rgba(232,46,123,1) 100%);
  background: linear-gradient(135deg, rgba(235,111,165,1) 0%,rgba(255,153,153,1) 50%,rgba(232,46,123,1) 100%);
}
.transparent {
  background-color: transparent;
  padding: 0 10px;
}
.page-md-field.md-field {
  width: 64px;
  margin-top: 0px;
  margin-bottom: 6px;
  padding-top: 6px;
  min-height: 36px;
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
</style>
