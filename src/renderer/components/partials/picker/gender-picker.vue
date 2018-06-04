<template>
  <md-list>
    <md-subheader>Jenis Kelamin</md-subheader>
    <md-list-item>
      <md-radio
        v-model="gender"
        value="L">Laki - Laki</md-radio>
    </md-list-item>
    <md-list-item>
      <md-radio
        v-model="gender"
        value="P">Perempuan</md-radio>
    </md-list-item>
  </md-list>
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
