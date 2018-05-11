<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-25">
      <md-checkbox v-model="sd">SD</md-checkbox>
    </div>
    <div class="md-layout-item md-size-50">
      <md-field>
        <label>SD</label>
        <md-input/>
      </md-field>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EducationForm',
  data () {
    return {
      sd: false
    }
  }
}
</script>
