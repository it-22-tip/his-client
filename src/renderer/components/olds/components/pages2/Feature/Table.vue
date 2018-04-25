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
        class="test">
        <table-viewer :json="json"/>
      </div>
      <template slot="footer">
        <div>FOOTER</div>
      </template>
    </page-container>
  </app-wrapper>
</template>

<script>
export default {
  data () {
    return {
      json: null
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .test {
    height: 1500px;
  }
</style>
