<template>
  <md-step
    :id="id"
    :md-done="active"
    :md-editable="false"
    md-label="Alamat">
    <div class="padding-10">
      <md-switch v-model="itemActive">Alamat Surat</md-switch>
      <div class="md-layout md-gutter">
        <address-form
          v-model="officialAddress"
          type="Official"
          class="md-layout-item md-size-50"
          title="Alamat Resmi"/>
        <address-form
          v-model="postalAddress"
          type="Postal"
          class="md-layout-item md-size-50"
          title="Alamat Surat"/>
      </div>
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
    active: {
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
