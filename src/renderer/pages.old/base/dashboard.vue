<template>
  <layout-one>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-33">
        <md-card>
          <md-card-content>
            <gender-chart/>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-33">
        <md-card>
          <md-card-content>
            <education-chart/>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-33">
        <md-card>
          <md-card-content>
            <intime-chart/>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </layout-one>
</template>

<script>
export default {
  components: {
    'base-button': () => import('@components/base-button'),
    'layout-one': () => import('@components/layout-one'),
    'gender-chart': () => import('@components/chart/gender-chart'),
    'education-chart': () => import('@components/chart/education-chart'),
    'intime-chart': () => import('@components/chart/intime-chart')
  },
  methods: {
    logOut () {
      this.$router.push({ name: 'base.login' })
    }
  }
}
</script>
