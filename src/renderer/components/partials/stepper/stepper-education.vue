<template>
  <mstep
    id="education-stepper"
    md-label="Pendidikan">
    <div class="padding-10">
      <education-form/>
    </div>
  </mstep>
</template>

<script>
export default {
  name: 'StepperEducation',
  components: {
    'mstep': () => import('@partials/form/mstep'),
    'education-form': () => import('@partials/form/education-form')
  }
}
</script>

<style lang="scss" scoped>
  .padding-10 {
    padding: 30px;
  }
</style>
