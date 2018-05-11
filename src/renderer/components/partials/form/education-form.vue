<template>
  <div>
    <div
      v-for="item in form"
      :key="item.title">
      <div class="md-layout">
        <div class="md-layout-item md-size-25">
          <md-checkbox v-model="item.model">{{ item.title }}</md-checkbox>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label>{{ item.title }}</label>
            <md-input/>
          </md-field>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EducationForm',
  data () {
    return {
      form: [
        {
          title: 'SD',
          model: false
        },
        {
          title: 'SMP',
          model: false
        },
        {
          title: 'SMA',
          model: false
        },
        {
          title: 'S1',
          model: false
        }
      ]
    }
  }
}
</script>
