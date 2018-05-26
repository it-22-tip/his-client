<template>
  <md-step
    id="personal-stepper"
    :md-done="mdDone"
    md-label="Data Personal">
    <div class="padding-10">
      <div class="md-layout">
        <div class="md-layout-item md-size-50">
          <md-field>
            <label>Nama</label>
            <md-input v-model="saved.Person.Name"/>
          </md-field>
          <md-subheader>Jenis Kelamin</md-subheader>
          <gender-picker v-model="saved.Person.Gender"/>
          <md-subheader>Golongan Darah</md-subheader>
          <bloodtype-picker v-model="saved.Person.BloodType"/>
          <md-subheader>Tempat Tanggal Lahir</md-subheader>
          <birthdateplace-form
            v-model="birthDatePlace"
            title="Alamat Resmi"/>
        </div>
      </div>
    </div>
  </md-step>
</template>

<script>
export default {
  name: 'StepPersonal',
  components: {
    'birthdateplace-form': () => import('@partials/form/birthdateplace-form'),
    'gender-picker': () => import('@partials/picker/gender-picker'),
    'bloodtype-picker': () => import('@partials/picker/bloodtype-picker')
  },
  props: {
    mdDone: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageTitle: null,
      birthDatePlace: {
        BirthDate: '',
        BirthPlaceRegency: ''
      },
      saved: {
        Person: {
          Name: '',
          Gender: 'P',
          BirthDate: null,
          BirthPlaceRegencyCode: null,
          BloodType: 'N/A',
          AddressHistories: [
            {
              Id: null,
              Type: 'Official',
              Address: null,
              Rt: null,
              Rw: null,
              VillageCode: null
            }
          ]
        },
        JobTitleId: null
      },
      officialAddress: {
        Id: null,
        Type: 'Official',
        Address: null,
        Rt: null,
        Rw: null,
        VillageCode: null
      },
      postalAddress: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding-10 {
    padding: 30px;
  }
</style>
