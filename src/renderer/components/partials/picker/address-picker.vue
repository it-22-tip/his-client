<template>
  <div class="-picker">
    <province-picker v-model="ProvinceCode"/>
    <regency-picker v-model="RegencyCode" :province-code="ProvinceCode"/>
    <district-picker v-model="DictrictCode" :regency-code="RegencyCode"/>
    <village-picker v-model="VillageCode" :regency-code="DisctrictCode"/>
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
        },
        deep: true
      },
      DistrictCode: {
        handler: function (val) {
          if (val === '') {
            this.VillageCode = ''
          }
        },
        deep: true
      },
      RegencyCode: {
        handler: function (val) {
          if (val === '') {
            this.DistrictCode = ''
          }
        },
        deep: true
      },
      ProvinceCode: {
        handler: function (val) {
          if (val === '') {
            this.RegencyCode = ''
          }
        },
        deep: true
      }
    },
  }
</script>
