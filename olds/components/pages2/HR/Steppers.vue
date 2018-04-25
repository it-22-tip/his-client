<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <hr-steppers/>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
export default {
  components: {
    'hr-steppers': () => import('./partials/steppers')
  },
  props: ['id'],
  data () {
    return {
    }
  }
}
</script>
