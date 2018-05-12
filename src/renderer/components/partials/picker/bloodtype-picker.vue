<template>
  <div>
    <md-radio
      v-model="bloodType"
      value="A">A</md-radio>
    <md-radio
      v-model="bloodType"
      value="B">B</md-radio>
    <md-radio
      v-model="bloodType"
      value="AB">AB</md-radio>
    <md-radio
      v-model="bloodType"
      value="O">O</md-radio>
    <md-radio
      v-model="bloodType"
      value="N/A">N/A</md-radio>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: 'N/A'
    }
  },
  data () {
    return {
      bloodType: 'N/A'
    }
  },
  watch: {
    value: {
      handler: function (value) {
        this.bloodType = value
      }
    },
    bloodType: {
      handler: function (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
