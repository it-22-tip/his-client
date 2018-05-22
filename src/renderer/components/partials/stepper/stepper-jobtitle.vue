<template>
  <md-step
    id="jobtitle-stepper"
    md-label="Pekerjaan">
    <div>
      [job title]
    </div>
  </md-step>
</template>

<script>
export default {
  components: {
    'mstep': () => import('@partials/form/mstep')
  }
}
</script>
