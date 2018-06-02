<template>
  <md-step
    :id="id"
    :md-done="done"
    :md-editable="false"
    md-label="Simpan Data">
    <div class="padding-10">
      [FIN]
      <md-button
        class="md-raised"
        @click="backButton">Back</md-button>
      <md-button
        class="md-raised"
        @click="saveButton">Save</md-button>
    </div>
  </md-step>
</template>

<script>
export default {
  name: 'StepFin',
  props: {
    value: {
      type: Object,
      default () {
        return this.default
      }
    },
    id: {
      type: String,
      default: null
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      default: {}
    }
  },
  methods: {
    saveButton () {
      this.$emit('forth')
    },
    backButton () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding-10 {
    padding: 30px;
  }
</style>
