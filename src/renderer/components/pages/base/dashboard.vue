<template>
  <layout-one>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-card>
          <md-card-content>
            <pie-chart></pie-chart>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
          <md-card-content>
            <horizontal-bar-chart></horizontal-bar-chart>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </layout-one>
</template>

<script>
  export default {
    components: {
      'base-button': () => import('@partials/base-button'),
      'layout-one': () => import('@partials/layout-one'),
      'pie-chart': () => import('@extras/charts/pie'),
      'horizontal-bar-chart': () => import('@extras/charts/horizontal-bar')
    },
    methods: {
      logOut () {
        this.$router.push({ name: 'base.login' })
      }
    }
  }
</script>
