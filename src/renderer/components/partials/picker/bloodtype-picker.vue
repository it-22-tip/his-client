<template>
  <md-list>
    <md-subheader>Golongan Darah</md-subheader>
    <md-list-item>
      <md-radio
        v-model="bloodType"
        value="A">A</md-radio>
    </md-list-item>
    <md-list-item>
      <md-radio
        v-model="bloodType"
        value="B">B</md-radio>
    </md-list-item>
    <md-list-item>
      <md-radio
        v-model="bloodType"
        value="AB">AB</md-radio>
    </md-list-item>
    <md-list-item>
      <md-radio
        v-model="bloodType"
        value="O">O</md-radio>
    </md-list-item>
    <md-list-item>
      <md-radio
        v-model="bloodType"
        value="N/A">N/A</md-radio>
    </md-list-item>
  </md-list>
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
