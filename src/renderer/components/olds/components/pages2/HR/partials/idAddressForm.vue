<template>
  <div>
    <md-content>
      <md-divider/>
      <md-subheader>Alamat</md-subheader>
      <md-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <province-field
              label="Provinsi"
              default="JAWA TENGAH"
              @selected="provinceSelected"/>
          </div>
          <div class="md-layout-item">
            <regency-field
              label="Regency"
              province="JAWA TENGAH" />
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <province-field
              label="Provinsi"
              default="JAWA TENGAH"
              @selected="provinceSelected"/>
          </div>
          <div class="md-layout-item">
            <regency-field
              label="Regency"
              province="JAWA TENGAH" />
          </div>
        </div>
        <md-field>
          <label>Nama Jalan Dan Atau RT / RW</label>
          <md-input v-model="initial"/>
        </md-field>
      </md-content>
    </md-content>
  </div>
</template>

<script>
export default {
  name: 'IdAddressForm',
  components: {
    'province-field': () => import('./provinceField'),
    'regency-field': () => import('./regencyField'),
    'district-field': () => import('./districtField'),
    'village-field': () => import('./villageField')
  },
  data () {
    return {
      initial: '',
      act: false,
      selected: {
        province: null,
        regency: null,
        district: null,
        village: null
      },
      regencyDisabled: true,
      districtDisabled: true,
      villageDisable: true
    }
  },
  methods: {
    provinceSelected ($event) {
      this.regencyDisabled = true,
      this.selected.province = $event
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
