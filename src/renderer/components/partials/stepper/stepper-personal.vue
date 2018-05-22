<template>
  <md-step
    id="personal-stepper"
    md-label="Data Personal">
    <div>
      <md-field>
        <label>Nama</label>
        <md-input v-model="saved.Person.Name"/>
      </md-field>
      <gender-picker v-model="saved.Person.Gender"/>
      <bloodtype-picker v-model="saved.Person.BloodType"/>
      <md-subheader>Tempat Tanggal Lahir</md-subheader>
      <birthdateplace-form
        v-model="birthDatePlace"
        title="Alamat Resmi"/>
    </div>
  </md-step>
</template>

<script>
export default {
  components: {
    'birthdateplace-form': () => import('@partials/form/birthdateplace-form'),
    'gender-picker': () => import('@partials/picker/gender-picker'),
    'bloodtype-picker': () => import('@partials/picker/bloodtype-picker'),
    'mstep': () => import('@partials/form/mstep')
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
