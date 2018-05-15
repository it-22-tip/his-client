<template>
  <md-content class="wrapper">
    <md-content class="right">
      <md-content class="right-top">
        <md-toolbar
          class="md-dense md-primary"
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
      </md-content>
      <md-content class="right-bottom">
        <md-content class="padding-10">
          <slot/>
        </md-content>
      </md-content>
    </md-content>
  </md-content>
</template>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  .left {
    width: 0px;
    height: 100vh;
    background: pink;
  }
  .right {
    flex: 1;
    flex-direction: column;
    display: flex;
    height: 100vh;
  }
  .left-content {
    height: 100vh;
    width: 250px;
    position: relative;
  }
  .right-top {
    height: 48px;
    width: 100%;
    background-color: grey;
  }
  .right-bottom {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: grey
  }
  .padding-10 {
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: grey;
  }
  .right-table {
    height: 100% !important;
    display: flex;
    flex-direction: column;
  }
  .right-table .md-table-content {
    display: flex;
    flex: 1;
    overflow-y: scroll !important;
    height: 100% !important;
    max-height: none !important;
  }
</style>

<script>
export default {
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
        {
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
