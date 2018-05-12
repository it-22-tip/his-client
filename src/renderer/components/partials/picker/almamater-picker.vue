<template>
  <md-content class="almamater-picker md-layout">
    <md-content class="md-layout-item md-size-85">
      <almamater-regency-picker v-model="ar"/>
    </md-content>
  </md-content>
</template>

<script>
export default {
  name: 'AlmamaterdateplacePicker',
  components: {
    'almamater-regency-picker': () => import('./almamater-regency-picker')
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          AlmamaterDate: '',
          AlmamaterRegency: ''
        }
      }
    }
  },
  data () {
    return {
      AlmamaterDate: '',
      ar: ''
    }
  },
  watch: {
    AlmamaterDate: {
      handler: function (value) {
        console.log(value)
      }
    },
    AlmamaterPlaceRegency: {
      handler: function (value) {
        this.$emit('input', {
          AlmamaterDate: this.AlmamaterDate,
          AlmamaterPlaceRegency: value
        })
      }
    }
  },
  mounted () {
  }
}
</script>
