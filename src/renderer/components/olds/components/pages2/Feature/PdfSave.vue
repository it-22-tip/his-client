<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
      <h3 class="md-title" style="flex: 1">PDF</h3>
       <menu-feature></menu-feature>
      </template>
      <div slot="default">
        <pdf-viewer></pdf-viewer>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    mounted () {
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
