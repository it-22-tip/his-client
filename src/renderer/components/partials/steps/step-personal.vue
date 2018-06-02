<template>
  <md-step
    :id="id"
    :md-done="done"
    :md-editable="false"
    md-label="Data Personal">
    <div class="padding-10">
      <div class="md-layout">
        <div class="md-layout-item md-size-50">
          <md-field>
            <label>Nama</label>
            <md-input v-model="sv.Name"/>
          </md-field>
          <md-subheader>Jenis Kelamin</md-subheader>
          <gender-picker v-model="sv.Gender"/>
          <md-subheader>Golongan Darah</md-subheader>
          <bloodtype-picker v-model="sv.BloodType"/>
          <md-subheader>Tempat Tanggal Lahir</md-subheader>
          <birthdateplace-form
            v-model="birthDatePlace"
            title="Alamat Resmi"/>
        </div>
      </div>
      <md-button
        class="md-raised"
        @click="nextButton">Next</md-button>
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
    value: {
      type: Object,
      default () {
        return this.default
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
      /* birthDatePlace: {
        BirthDate: '',
        BirthPlaceRegency: ''
      }, */
      default: {
        Name: '',
        Gender: 'P',
        BirthDate: null,
        BirthPlaceRegencyCode: null,
        BloodType: 'N/A'
      },
      sv: {
        Name: '',
        Gender: 'P',
        BirthDate: null,
        BirthPlaceRegencyCode: null,
        BloodType: 'N/A'
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
  },
  computed: {
    birthDatePlace: {
      get () {
        return {
          BirthDate: '',
          BirthPlaceRegency: ''
        }
      },
      set (v) {
        console.log(v)
        this.sv.BirthPlaceRegencyCode = v.BirthPlaceRegency
        this.sv.BirthDate = v.BirthDate
      }
    }
  },
  watch: {
    'sv.Name': {
      handler: function (v) {
        console.log(v)
      }
    }
  },
  methods: {
    nextButton () {
      console.log(this.sv)
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
