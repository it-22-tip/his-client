<template>
  <page-wrapper id="page-dashboard">
    <page-layout>
      <page-menu slot="menu"/>
      <split-pane>
        <md-content slot="left">
          <md-content class="padding-10">
            [left]
          </md-content>
        </md-content>
        <section slot="right">
          <md-content>
            <md-toolbar
              class="md-primary md-dense"
              md-elevation="0">
              Toolbar
            </md-toolbar>
            <md-content>
              [right]
            </md-content>
          </md-content>
        </section>
      </split-pane>
    </page-layout>
  </page-wrapper>
</template>

<script>
export default {
  name: 'PageDashboard',
  components: {
    'page-layout': () => import('@shared/page-layout'),
    'page-wrapper': () => import('@shared/page-wrapper'),
    'split-pane': () => import('@shared/split-pane'),
    'page-menu': () => import('@menus/main')
  }
}
</script>

<style lang="scss" scoped>
  .padding-10 {
    padding: 10px;
  }
</style>
