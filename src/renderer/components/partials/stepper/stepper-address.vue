<template>
  <md-step
    id="address-stepper"
    md-label="Alamat">
    <div>
      [alamat]
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
