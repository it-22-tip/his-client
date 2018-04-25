<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <md-toolbar md-elevation="0">
        <md-button @click="open">Search</md-button>
      </md-toolbar>
      <md-drawer
        :md-active.sync="drawOpen"
        class="md-right">
        <div>
          [SEARCH]
        </div>
      </md-drawer>
      <hr-table slot="default"/>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
export default {
  components: {
    'hr-table': () => import('./partials/contractTable')
  },
  data () {
    return {
      drawOpen: false
    }
  },
  methods: {
    open () {
      this.drawOpen = !this.drawOpen
    }
  }
}
</script>
