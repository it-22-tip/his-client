<template>
  <layout-one>
    <md-content class="dp">
      <md-toolbar
        class="md-dense md-primary"
        md-elevation="0">
        <md-button
          class="md-icon-button"
          @click="$router.go(-1)">
          <md-icon>close</md-icon>
        </md-button>
        <md-button
          class="md-icon-button"
          @click="save()">
          <md-icon>save</md-icon>
        </md-button>
      </md-toolbar>
      <md-content class="fc">
        <md-content class="scr md-scrollbar">
          <div class="hi">
            <div :style="{ padding: '10px' }">
              <textarea
                v-model="savedView"
                :style="{ padding: '10px', lineHeight: '20px', width: '100%', resize: 'none', height: '100px', border: '0 none' }"/>
            </div>
            <mstepper>
              <stepper-personal/>
              <md-step
                id="second"
                :md-done="false"
                md-label="Alamat Resmi">
                <address-form
                  v-model="officialAddress"
                  type="Official"
                  title="Alamat Resmi"/>
              </md-step>
              <md-step
                id="postal_address"
                md-label="Alamat Surat">
                <div class="md-layout md-gutter">
                  <address-form
                    v-model="officialAddress"
                    type="Postal"
                    class="md-layout-item md-size-50"
                    title="Alamat Resmi"/>
                </div>
              </md-step>
              <mstep
                id="job"
                md-label="Pekerjaan">
                <div>
                  <md-subheader>Data Pekerjaan</md-subheader>
                  <jobtitle-picker v-model="saved.JobTitleId"/>
                </div>
              </mstep>
              <stepper-fin/>
            </mstepper>
          </div>
        </md-content>
      </md-content>
    </md-content>
  </layout-one>
</template>

<script>
import orm from '@/mixins/orm'
import { map } from 'lodash'
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
    'education-form': () => import('@partials/form/education-form'),
    'stepper-education': () => import('@partials/stepper/stepper-education'),
    'stepper-fin': () => import('@partials/stepper/stepper-fin'),
    'stepper-personal': () => import('@partials/stepper/stepper-personal')
  },
  mixins: [
    orm
  ],
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
  },
  computed: {
    savedView: {
      get () {
        return JSON.stringify(this.saved, 4)
      }
    }
  },
  watch: {
    'birthDatePlace.BirthDate': {
      handler: function (val) {
        this.saved.Person.BirthDate = val
      }
    },
    'birthDatePlace.BirthPlaceRegency': {
      handler: function (val) {
        this.saved.Person.BirthPlaceRegencyCode = val
      }
    },
    officialAddress: {
      handler: function (val) {
        this.saved.Person.AddressHistories = map(this.saved.Person.AddressHistories, item => {
          if (item.Type === 'Official') {
            return val
          } else {
            return item
          }
        })
      }
    }
  },
  methods: {
    save () {
      this.saving()
    },
    async transaction (transaction) {
      const { Persons, Employees, JobTitles, AddressHistories } = this.connection.models
      let data
      try {
        data = await Employees.create(this.saved, {
          transaction: transaction,
          // logging: console.log,
          include: [
            {
              model: Persons,
              include: [
                {
                  model: AddressHistories
                }
              ]
            },
            {
              model: JobTitles
            }
          ]
        })
      } catch (error) {
        throw error
      }
      return data
    },
    async saving () {
      this.connection = (new this.$orm()).connect()
      try {
        await this.connection.transaction(this.transaction)
      } catch (error) {
        console.log(error)
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>

<style lang="scss">
.dp {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.fc {
  flex: 1;
  position: relative;
}
.scr {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.hi {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.hi>.md-steppers {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.hi>.md-steppers>.md-steppers-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container {
  height: 100%;
  flex: 1;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content {
  padding: 0;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content::-webkit-scrollbar {
  border-radius: 0;
  height: 8px;
  width: 8px;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content::-webkit-scrollbar-thumb {
  border-radius: 0;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content::-webkit-scrollbar-thumb {
  background: rgba(#757575, .5) !important;
}

.big {
  height: 1000px;
}
.mo:hover {
  text-decoration: underline;
}
</style>
