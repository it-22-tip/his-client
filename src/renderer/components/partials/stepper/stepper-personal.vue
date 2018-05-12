<template>
  <md-step
    id="ext"
    md-label="Pribadi">
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
    'layout-one': () => import('@partials/layout-one'),
    'address-form': () => import('@partials/form/address-form'),
    'birthdateplace-form': () => import('@partials/form/birthdateplace-form'),
    'jobtitle-picker': () => import('@partials/picker/jobtitle-picker'),
    'gender-picker': () => import('@partials/picker/gender-picker'),
    'bloodtype-picker': () => import('@partials/picker/bloodtype-picker'),
    'mstepper': () => import('@partials/form/mstepper'),
    'mstep': () => import('@partials/form/mstep'),
    'education-form': () => import('@partials/form/education-form')
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
