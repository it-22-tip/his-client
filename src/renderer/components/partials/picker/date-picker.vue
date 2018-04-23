<template>
  <v-date-picker :value="model" @input="onInput">
    <md-field slot-scope="props">
      <md-input :value="showValue()" />
    </md-field>
  </v-date-picker>
</template>

<script>
  import moment from 'moment'
  import { setupCalendar, DatePicker } from 'v-calendar'
  setupCalendar({
    locale: 'id-ID'
  })
  export default {
    name: 'DatePicker',
    components: {
      'v-date-picker': DatePicker
    },
    props: [
      'value'
    ],
    data () {
      return {
        model: null
      }
    },
    watch: {
      value: {
        handler: function (val) {
          this.model = moment(val).toDate()
        }
      }
    },
    methods: {
      showValue () {
        return moment(this.model).format('D MMMM YYYY')
      },
      onInput ($event) {
        // this.model = $event
        let ret = moment($event).format('YYYY-MM-DD')
        // this.$emit('input', moment($event).format('YYYY-MM-DD'))
        this.$emit('input', ret)
      }
    },
    mounted () {
      this.model = moment(this.value).toDate()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~v-calendar/lib/v-calendar.min.css';
</style>


