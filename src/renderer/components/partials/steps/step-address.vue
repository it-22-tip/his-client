<template>
  <md-step
    :id="id"
    :md-done="done"
    :md-editable="false"
    md-label="Alamat">
    <div class="padding-10">
      <address-form
        v-model="address.officialAddress"
        type="Official"/>
      <md-switch v-model="itemActive">Alamat Surat</md-switch>
      <address-form
        v-model="address.postalAddress"
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
      itemActive: false
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
    },
    hasPostalAddress: {
      get () {
        return false
      },
      set () {

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
