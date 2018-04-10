<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
      <h3 class="md-title" style="flex: 1">Title</h3>
       <menu-feature></menu-feature>
      </template>
      <md-toolbar md-elevation="0">
        <md-button @click="open">Search</md-button>
      </md-toolbar>
      <md-drawer class="md-right" :md-active.sync="drawOpen">
        <div>
          [SEARCH]
        </div>
      </md-drawer>
      <hr-table slot="default"></hr-table>
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
        drawOpen: false
      }
    },
    components: {
      'hr-table': () => import('./partials/contractTable')
    },
    methods: {
      open () {
        this.drawOpen = !this.drawOpen
      }
    }
  }
</script>
