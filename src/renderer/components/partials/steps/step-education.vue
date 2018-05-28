<template>
  <md-step
    id="education-stepper"
    :md-editable="false"
    md-label="Pendidikan">
    <div class="padding-10">
      <education-form/>
    </div>
  </md-step>
</template>

<script>
export default {
  name: 'StepEducation',
  components: {
    'education-form': () => import('@partials/form/education-form')
  }
}
</script>

<style lang="scss" scoped>
  .padding-10 {
    padding: 30px;
  }
</style>
