<template>
  <md-step
    :id="id"
    :md-done="done"
    :md-editable="false"
    md-label="Alamat">
    <div class="padding-10">
      <address-form
        v-model="officialAddress"
        type="Official"/>
      <md-switch v-model="hasPostalAddress">Alamat Surat</md-switch>
      <address-form
        v-model="postalAddress"
        :disabled="!hasPostalAddress"
        type="Postal"
        title="Alamat Surat"/>
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
  name: 'StepAddress',
  components: {
    'address-form': () => import('@partials/form/address-form')
  },
  props: {
    value: {
      type: Object,
      default () {
        return this.address
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
      officialAddress: {},
      postalAddress: {},
      hasPostalAddress: false
    }
  },
  computed: {
    address: {
      get () {
        return {}
      },
      set (value) {
        console.log(value)
      }
    }
  },
  validations: {

  },
  watch: {
    officialAddress: {
      handler: function (value) {
        console.log(value)
      },
      deep: true
    },
    hasPostalAddress: {
      handler: function (value) {
        console.log(value)
      }
    }
  },
  methods: {
    nextButton () {
      this.$emit('forth', this.address)
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
