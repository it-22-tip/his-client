<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
      <h3 class="md-title" style="flex: 1">Title</h3>
       <menu-feature></menu-feature>
      </template>
      <hr-steppers></hr-steppers>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
      }
    },
    components: {
      'hr-steppers': () => import('./partials/steppers')
    }
  }
</script>
