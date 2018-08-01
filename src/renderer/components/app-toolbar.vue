<template>
  <md-toolbar
    class="md-dense md-primary ccc"
    md-elevation="0">
    <div class="md-toolbar-section-start">
      <img :src="`static/png/32x32.png`">
      <h1 class="md-title">Hospital Information System</h1>
    </div>
    <div class="md-toolbar-section-end">
      <md-button
        v-for="item in link"
        :key="item.title"
        :to="item.to"
        class="md-icon-button">
        <md-icon>{{ item.icon }}</md-icon>
        <md-tooltip md-direction="bottom">{{ item.title }}</md-tooltip>
      </md-button>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  name: 'Mtoolbar',
  data () {
    return {
      link: [
        {
          to: { name: 'base.dashboard' },
          icon: 'dashboard',
          title: 'Dasbor'
        },
        {
          to: { name: 'employees.employee.list', params: { page: 1, sort: 'Ein', order: 'desc' } },
          icon: 'face',
          title: 'Human Resources'
        },
        {
          to: { name: 'masterdata.provinces', params: { page: 1, sort: 'Name', order: 'desc' } },
          icon: 'layers',
          title: 'Master Data'
        },
        /* {
          to: { name: 'documents.list' },
          icon: 'settings',
          title: 'Documents'
        },
        {
          to: { name: 'base.settings' },
          icon: 'settings',
          title: 'Settings'
        },
        {
          to: { name: 'base.tree', params: { num: 1 } },
          icon: 'settings',
          title: 'Tree'
        }, */
        {
          to: { name: 'base.ocr' },
          icon: 'settings',
          title: 'OCR'
        },
        {
          to: { name: 'base.login' },
          icon: 'close',
          title: 'Out'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-toolbar.md-primary.ccc {
    background: rgb(235,111,165); /* Old browsers */
    background: -moz-linear-gradient(-45deg, rgba(235,111,165,1) 0%, rgba(255,153,153,1) 50%, rgba(232,46,123,1) 100%);
    background: -webkit-linear-gradient(-45deg, rgba(235,111,165,1) 0%,rgba(255,153,153,1) 50%,rgba(232,46,123,1) 100%);
    background: linear-gradient(135deg, rgba(235,111,165,1) 0%,rgba(255,153,153,1) 50%,rgba(232,46,123,1) 100%);
  }
</style>
