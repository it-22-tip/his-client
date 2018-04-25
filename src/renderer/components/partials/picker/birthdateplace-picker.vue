<template>
  <md-content class="birthdateplace-picker md-layout">
    <md-content class="md-layout-item md-size-85">
      <date-picker v-model="BirthDate"/>
      <birthplace-picker v-model="BirthPlaceRegencyCode"/>
    </md-content>
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
          birthDate: '',
          birthPlaceRegencyCode: ''
        }
      }
    }
  },
  data () {
    return {
      BirthDate: '',
      BirthPlaceRegencyCode: ''
    }
  },
  mounted () {
  }
}
</script>
