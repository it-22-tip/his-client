<template>
  <v-date-picker
    :value="model"
    :is-inline="true"
    :available-dates="availableDate"
    @input="onInput"/>
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
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      model: null,
      availableDate: {
        start: null,
        end: null
      }
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    onInput ($event) {
      let ret = moment($event).format('YYYY-MM-DD')
      this.$emit('input', ret)
    },
    async setData () {
      await this.$nextTick()
      let model = moment(this.value)
      console.log(model)
      this.model = moment().subtract(20, 'year').toDate()
      this.availableDate.start = this.getStartDate(50)
      this.availableDate.end = this.getEndDate(18)
    },
    getStartDate (value) {
      return moment().subtract(value, 'year').toDate()
    },
    getEndDate (value) {
      return moment().subtract(value, 'year').toDate()
    }
  }
}
/* import moment from 'moment'
import { setupCalendar, DatePicker } from 'v-calendar'
setupCalendar({
  locale: 'id-ID'
})
export default {
  name: 'DatePicker',
  components: {
    'v-date-picker': DatePicker
  },
  data () {
    return {
      model: null,
      minDate: null,
      maxDate: null
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.model = moment(val).toDate()
      }
    }
  },
  mounted () {
    let model
    try {
      model = this.model
      model = moment(model)
      model = model.isValid() ? model : moment()
    } catch (error) {
      console.log(error)
    }
    console.log(model)
    // this.model = model.toDate()
    this.model = moment().subtract(20, 'day').toDate()
    this.minDate = moment().subtract(30, 'day').toDate()
    this.maxDate = moment().subtract(20, 'day').toDate()
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
  }
} */
</script>

<style lang="scss" scoped>
  @import '~v-calendar/lib/v-calendar.min.css';
</style>
