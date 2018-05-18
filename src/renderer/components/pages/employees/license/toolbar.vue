<template>
  <md-toolbar
    class="md-primary md-dense"
    md-elevation="0">
    <div class="md-toolbar-section-start">
      <md-button
        class="md-icon-button"
        @click="showSearchPanel = !showSearchPanel">
        <md-icon>search</md-icon>
      </md-button>
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
          :max="totalPage"
          class="page-input"
          type="number"
          min="1"/>
      </md-field>
      <md-content class="transparent">
        Dari {{ totalPage }} Halaman
      </md-content>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data () {
    return {
      totalPage: 10,
      activePage: 1,
      showSearchPanel: false
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
