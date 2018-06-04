<template>
  <div>
    <div>
      <province-picker v-model="ProvinceCode"/>
      <regency-picker
        v-model="RegencyCode"
        :where-code="ProvinceCode"/>
      <date-picker v-model="BirthDate"/>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    'province-picker': () => import('@partials/picker/province-picker'),
    'regency-picker': () => import('@partials/picker/regency-picker'),
    'date-picker': () => import('@partials/picker/date-picker')
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return this.input
      }
    }
  },
  data () {
    return {
      formTitle: this.title,
      ProvinceCode: null,
      RegencyCode: null,
      BirthDate: null,
      input: {
        BirthPlaceRegencyCode: null,
        BirthDate: null
      },
      iv: {
        BirthPlaceRegencyCode: null,
        BirthDate: null
      }
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.RegencyCode = val.BirthPlaceRegencyCode
        this.BirthDate = val.BirthDate
      }
    },
    RegencyCode: {
      handler: function (val) {
        this.$emit('input', {
          BirthPlaceRegencyCode: this.RegencyCode,
          BirthDate: this.BirthDate
        })
      }
    },
    BirthDate: {
      handler: function (val) {
        this.$emit('input', {
          BirthPlaceRegencyCode: this.RegencyCode,
          BirthDate: this.BirthDate
        })
      }
    }
  }
}
</script>
