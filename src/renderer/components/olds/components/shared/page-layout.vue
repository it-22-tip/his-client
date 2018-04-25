<template>
  <div class="page-layout">
    <layout-toolbar/>
    <md-content class="layout-content">
      <slot/>
    </md-content>
    <layout-footer/>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
  components: {
    'layout-toolbar': () => import('@shared/layout-toolbar'),
    'layout-footer': () => import('@shared/layout-footer')
  }
}
</script>

<style lang="scss" scoped>
  .page-layout {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }

  .layout-toolbar .md-icon {
    color: #ffffff;
  }
  .layout-content {
    flex: 1;
  }
  .layout-footer {
    height: 32px !important;
    max-height: 32px !important;
    min-height: 32px;
    background: grey;
  }
</style>
