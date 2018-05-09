<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-33">
        <province-picker v-model="ProvinceCode"/>
      </div>
      <div class="md-layout-item md-size-33">
        <regency-picker
          v-model="RegencyCode"
          :where-code="ProvinceCode"/>
      </div>
      <div class="md-layout-item md-size-33">
        <date-picker v-model="BirthDate"/>
      </div>
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
    },
    preDefined: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      formTitle: this.title,
      ProvinceCode: null,
      RegencyCode: null,
      BirthDate: null,
      input: {
        RegencyCode: null,
        BirthDate: null
      }
    }
  },
  watch: {
    VillageCode: {
      handler: function (val) {
        this.$emit('input', {
          RegencyCode: this.RegencyCode,
          BirthDate: this.BirthDate
        })
      }
    }
  }
}
</script>
