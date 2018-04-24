<template>
  <layout-one>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-33">
        <md-card>
          <md-card-content>
            <gender-chart></gender-chart>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-33">
        <md-card>
          <md-card-content>
            <education-chart></education-chart>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-33">
        <md-card>
          <md-card-content>
            <intime-chart></intime-chart>
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
      'gender-chart': () => import('@partials/chart/gender-chart'),
      'education-chart': () => import('@partials/chart/education-chart'),
      'intime-chart': () => import('@partials/chart/intime-chart')
    },
    methods: {
      logOut () {
        this.$router.push({ name: 'base.login' })
      }
    }
  }
</script>
