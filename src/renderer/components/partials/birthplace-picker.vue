<template>
  <div class="birthplace-picker">
    <province-picker v-model="birthPlaceProvinceCode"/>
    <regency-picker v-model="birthPlaceRegencyCode" :province-code="birthPlaceProvinceCode"/>
  </div>
</template>

<script>
  export default {
    name: 'BirthplacePicker',
    components: {
      'province-picker': () => import('@partials/province-picker'),
      'regency-picker': () => import('@partials/regency-picker')
    },
    props: [
      'value'
    ],
    data () {
      return {
        birthPlaceProvinceCode: '',
        birthPlaceRegencyCode: ''
      }
    },
    watch: {
      birthPlaceRegencyCode: {
        handler: function (val) {
          this.$emit('input', val)
        },
        deep: true
      },
      birthPlaceProvinceCode: {
        handler: function (val) {
          if (val === '') {
            this.birthPlaceRegencyCode = ''
          }
        },
        deep: true
      }
    },
  }
</script>
