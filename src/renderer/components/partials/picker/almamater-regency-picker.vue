<template>
  <div class="birthplace-picker">
    <province-picker v-model="ProvinceCode"/>
    <regency-picker
      v-model="RegencyCode"
      :province-code="ProvinceCode"/>
  </div>
</template>

<script>
export default {
  name: 'BirthplacePicker',
  components: {
    'province-picker': () => import('./province-picker'),
    'regency-picker': () => import('./regency-picker')
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      ProvinceCode: '',
      RegencyCode: ''
    }
  },
  watch: {
    RegencyCode: {
      handler: function (val) {
        this.$emit('input', val)
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
  }
}
</script>
