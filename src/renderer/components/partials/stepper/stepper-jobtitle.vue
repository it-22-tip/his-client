<template>
  <md-step
    id="jobtitle-stepper"
    md-label="Pekerjaan">
    <div class="padding-10">
      <md-subheader>Data Pekerjaan</md-subheader>
      <jobtitle-picker v-model="JobTitleId"/>
    </div>
  </md-step>
</template>

<script>
export default {
  name: 'StepperJobtitle',
  components: {
    'mstep': () => import('@partials/form/mstep'),
    'jobtitle-picker': () => import('@partials/picker/jobtitle-picker')
  },
  data () {
    return {
      JobTitleId: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding-10 {
    padding: 30px;
  }
</style>
