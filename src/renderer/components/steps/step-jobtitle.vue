<template>
  <md-step
    :id="id"
    :md-done="done"
    :md-editable="false"
    md-label="Pekerjaan">
    <div class="padding-10">
      <md-subheader>Data Pekerjaan</md-subheader>
      <jobtitle-picker v-model="JobTitleId"/>
      <md-button
        class="md-raised"
        @click="backButton">Back</md-button>
      <md-button
        class="md-raised"
        @click="nextButton">Next</md-button>
    </div>
  </md-step>
</template>

<script>
export default {
  name: 'StepJobtitle',
  components: {
    'jobtitle-picker': () => import('@components/picker/jobtitle-picker')
  },
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
      JobTitleId: null,
      default: {}
    }
  },
  methods: {
    nextButton () {
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
