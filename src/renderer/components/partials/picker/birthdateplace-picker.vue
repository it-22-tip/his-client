<template>
  <md-content class="birthdateplace-picker">
    [hellow]
    <date-picker v-model="BirthDate"/>
    <birthplace-picker v-model="BirthPlaceRegency"/>
  </md-content>
</template>

<script>
export default {
  name: 'BirthdateplacePicker',
  components: {
    'birthplace-picker': () => import('./birthplace-picker'),
    'date-picker': () => import('./date-picker')
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          BirthDate: '',
          BirthPlaceRegency: ''
        }
      }
    }
  },
  data () {
    return {
      BirthDate: '',
      BirthPlaceRegency: ''
    }
  },
  watch: {
    BirthDate: {
      handler: function (value) {
        console.log(value)
      }
    },
    BirthPlaceRegency: {
      handler: function (value) {
        this.$emit('input', {
          BirthDate: this.BirthDate,
          BirthPlaceRegency: value
        })
      }
    }
  },
  mounted () {
  }
}
</script>
