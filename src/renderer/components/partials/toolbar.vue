<template>
  <md-toolbar
    class="md-primary md-dense"
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
</style>
