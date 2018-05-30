<template>
  <md-step
    id="fin-stepper"
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
  methods: {
    saveButton () {
      this.$emit('save')
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
