<template>
  <md-step
    :id="id"
    :md-done="done"
    :md-editable="false"
    md-label="Pendidikan">
    <div class="padding-10">
      <education-form/>
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
  name: 'StepEducation',
  components: {
    'education-form': () => import('@partials/form/education-form')
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
      default: {}
    }
  },
  mounted () {
    console.log('mounted')
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
