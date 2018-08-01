<template>
  <md-list>
    <md-subheader>Golongan Darah</md-subheader>
    <md-list-item
      v-for="item in bloodTypes"
      :key="item">
      <md-radio
        v-model="bloodType"
        :value="item">{{ item }}</md-radio>
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
      bloodType: 'N/A',
      bloodTypes: [
        'A', 'B', 'AB', 'O', 'N/A'
      ]
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
