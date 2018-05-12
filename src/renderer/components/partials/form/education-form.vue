<template>
  <div class="education-form">
    <div
      v-for="item in form"
      :key="item.title"
      :style="{ background: item.active ? 'transparent' : '#cccccc' }">
      <div class="md-layout">
        <div class="md-layout-item md-size-25">
          <md-switch v-model="item.active">{{ item.title }}</md-switch>
        </div>
        <div class="md-layout-item md-size-25">
          <birthplace-picker v-model="item.model.RegencyCode"/>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label>Almamater</label>
            <md-input :disabled="!item.active"/>
          </md-field>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EducationForm',
  components: {
    'birthplace-picker': () => import('@partials/picker/birthplace-picker')
  },
  data () {
    return {
      form: [
        {
          title: 'SD',
          active: false,
          model: {
            Name: null,
            Level: 'SD',
            RegencyCode: null
          }
        },
        {
          title: 'SMP',
          active: false,
          model: {
            Name: null,
            Level: 'SMP',
            RegencyCode: null
          }
        },
        {
          title: 'SMA',
          active: false,
          model: {
            Name: null,
            Level: 'SMA',
            RegencyCode: null
          }
        },
        {
          title: 'S1',
          active: false,
          model: {
            Name: null,
            Level: 'S1',
            RegencyCode: null
          }
        }
      ]
    }
  }
}
</script>
