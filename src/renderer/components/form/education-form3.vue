<template>
  <div class="education-form">
    <md-list>
      <md-list-item
        v-for="item in form"
        :key="item.title">
        <md-switch v-model="item.active">{{ item.title }}</md-switch>
        <div class="md-layout cdc">
          <div class="md-layout-item md-size-25">
            <almamater-picker v-model="item.model.RegencyCode"/>
          </div>
          <div class="md-layout-item md-size-50">
            <md-field>
              <label>Almamater</label>
              <md-input :disabled="!item.active"/>
            </md-field>
          </div>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>
<script>
export default {
  name: 'EducationForm',
  components: {
    'almamater-picker': () => import('@components/picker/almamater-picker')
  },
  data () {
    return {
      notification: null,
      form: [
        {
          title: 'SD',
          active: false,
          model: {
            Name: null,
            Level: 'SD',
            RegencyCode: {
              BirthDate: '',
              BirthPlaceRegency: ''
            }
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

<style lang="scss" scoped>
.cdc {
  flex: 1;
}
</style>
