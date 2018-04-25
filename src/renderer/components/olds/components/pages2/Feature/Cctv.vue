<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <div
        slot="default"
        class="padding-20">
        <video src=""/>
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

  }
}
</script>

<style lang="scss" scoped>
  .padding-20 {
    padding: 20px;
    height: 2000px;
  }
</style>
