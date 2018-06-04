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
          <gender-picker v-model="sv.Gender"/>
          <bloodtype-picker v-model="sv.BloodType"/>
          <md-subheader>Tempat Tanggal Lahir</md-subheader>
          <birthdateplace-form
            v-model="birthDatePlace"
            title="Alamat Resmi"/>
        </div>
      </div>
      <md-button
        :disabled="$v.$invalid"
        class="md-raised"
        @click="nextButton">Next</md-button>
    </div>
  </md-step>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'StepPersonal',
  components: {
    'birthdateplace-form': () => import('@partials/form/birthdateplace-form'),
    'gender-picker': () => import('@partials/picker/gender-picker'),
    'bloodtype-picker': () => import('@partials/picker/bloodtype-picker')
  },
  mixins: [validationMixin],
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
      sv: {
        Name: '',
        Gender: 'P',
        BirthDate: null,
        BirthPlaceRegencyCode: null,
        BloodType: 'N/A'
      }
    }
  },
  validations: {
    sv: {
      Name: {
        required,
        minLength: minLength(4)
      },
      BirthPlaceRegencyCode: {
        required
      }
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
        this.sv.BirthPlaceRegencyCode = v.BirthPlaceRegencyCode
        this.sv.BirthDate = v.BirthDate
      }
    }
  },
  methods: {
    nextButton () {
      this.$emit('forth', this.sv)
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
