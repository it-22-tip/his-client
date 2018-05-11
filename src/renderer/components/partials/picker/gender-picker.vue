<template>
  <div>
    <md-radio
      v-model="gender"
      value="L">L</md-radio>
    <md-radio
      v-model="gender"
      value="P">P</md-radio>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: 'P'
    }
  },
  data () {
    return {
      gender: 'P'
    }
  },
  watch: {
    value: {
      handler: function (value) {
        this.gender = value
      }
    },
    gender: {
      handler: function (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
