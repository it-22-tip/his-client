<template>
  <div class="md-toolbar-section-end">
    <md-field
      class="page-md-field"
      md-inline
      md-dense>
      <md-input
        v-model="currentPage"
        :max="totalPage"
        min="1"
        class="page-input"
        type="number"/>
    </md-field>
    <span>
      Dari {{ totalPage }} Halaman
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    totalPage: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      currentPage: null
    }
  },
  watch: {
    currentPage (value) {
      this.$emit('input', parseInt(value))
    }
  }
}
</script>

<style lang="scss" scoped>
  .transparent {
    background-color: transparent;
    padding: 0 10px;
  }
  .page-md-field.md-field {
    width: 64px;
    margin-top: 0px;
    margin-bottom: 12px;
    padding-top: 12px;
    min-height: 44px;
  }
  .page-md-field.md-field::before,
  .page-md-field.md-field::after {
    display: none;
    width: 64px !important;
  }
  .page-input {
    width: 64px !important;
    padding: 5px;
    background-color: white;
    border-radius: 3px !important;
  }
</style>
