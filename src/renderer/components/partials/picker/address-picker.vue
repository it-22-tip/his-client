<template>
  <div class="-picker">
    <province-picker v-model="ProvinceCode"/>
    <regency-picker v-model="RegencyCode" :province-code="ProvinceCode"/>
    <district-picker v-model="DistrictCode" :regency-code="RegencyCode"/>
    <village-picker v-model="VillageCode" :district-code="DistrictCode"/>
  </div>
</template>

<script>
  export default {
    name: 'Picker',
    components: {
      'province-picker': () => import('./province-picker'),
      'regency-picker': () => import('./regency-picker'),
      'district-picker': () => import('./district-picker'),
      'village-picker': () => import('./village-picker')
    },
    props: [
      'value'
    ],
    data () {
      return {
        ProvinceCode: '',
        RegencyCode: '',
        DistrictCode: '',
        VillageCode: ''
      }
    },
    watch: {
      VillageCode: {
        handler: function (val) {
          this.$emit('input', val)
        }
      },
      DistrictCode: {
        handler: function (val) {
          if (val === '') {
            this.VillageCode = ''
          }
        }
      },
      RegencyCode: {
        handler: function (val) {
          if (val === '') {
            this.DistrictCode = ''
          }
        }
      },
      ProvinceCode: {
        handler: function (val) {
          if (val === '') {
            this.RegencyCode = ''
          }
        }
      }
    },
  }
</script>
