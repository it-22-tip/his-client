<template>
  <md-step
    id="address-stepper"
    md-label="Alamat">
    <div class="padding-10">
      <md-switch v-model="itemActive">Alamat Surat</md-switch>
      <div class="md-layout md-gutter">
        <address-form
          v-model="officialAddress"
          type="Official"
          class="md-layout-item md-size-50"
          title="Alamat Resmi"/>
        <address-form
          v-model="postalAddress"
          type="Postal"
          class="md-layout-item md-size-50"
          title="Alamat Surat"/>
      </div>
    </div>
  </md-step>
</template>

<script>
export default {
  name: 'StepAddress',
  components: {
    'address-form': () => import('@partials/form/address-form')
  },
  data () {
    return {
      officialAddress: {},
      postalAddress: {},
      itemActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding-10 {
    padding: 30px;
  }
</style>
