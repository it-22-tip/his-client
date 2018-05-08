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
      </md-toolbar>
      <md-content class="fc">
        <md-content class="scr md-scrollbar">
          <div class="hi">
            <h1>{{ Person.Name }}</h1>
            <h2>{{ JobTitle }}</h2>
            <p>{{ BirthDate }}  {{ BirthPlaceRegency }}</p>
            <p>{{ Person.Age }} Tahun</p>
            <p>{{ Person.Faith }}</p>
            <p>{{ OfficialAddress }}</p>
            <!-- <p class="mo" @click="modalProvince = true">{{ detail.Address }}</p> -->
            <!-- <calendar v-model="detail.BirthDate.dateObj" :attributes='attrs'>
              <div slot-scope="props">
                <md-icon>date</md-icon>{{ detail.BirthDate.human }}
              </div>
            </calendar> -->
          </div>
        </md-content>
      </md-content>
    </md-content>
    <md-dialog :md-active.sync="modalProvince">
      <md-dialog-title>Provinsi</md-dialog-title>
      <md-content>
        Pilih Provinsi
      </md-content>
    </md-dialog>
  </layout-one>
</template>

<script>
import Vue from 'vue'
import PdfTk from '@/extras/PdfTk'
import orm from '@/mixins/orm'
import { startCase, toLower } from 'lodash'
import {setupCalendar, DatePicker as dp} from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import moment from 'moment'
import ModalProvince from '@partials/modal-province'
Vue.component('modal-province', ModalProvince)
setupCalendar({
  locale: 'id-ID'
  // firstDayOfWeek: 2 // Monday,
})
Vue.component('calendar', dp)
export default {
  name: 'EmployeeDetail',
  components: {
    'layout-one': () => import('@partials/layout-one')
  },
  mixins: [
    orm
  ],
  props: {
    employeeId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      model: {},
      connection: null,
      detail: {
        Name: '',
        Address: '',
        BirthDate: {}
      },
      showDialog: false,
      attrs: [{}],
      selectedDate: new Date(2018, 0, 9),
      showedDate: null,
      modalProvince: false,
      Person: {},
      OfficialAddress: '',
      JobTitle: '',
      BirthPlaceRegency: '',
      BirthDate: null
    }
  },
  watch: {
    'detail.BirthDate.dateObj': {
      handler: function (val) {
        this.detail.BirthDate.human = moment(val).format('DD MMMM YYYY')
        this.detail.BirthDate.age = Math.abs(parseInt(moment(val).diff(moment(), 'years')))
      }
    }
  },
  mounted () {
    this.populate()
  },
  methods: {
    editAddress () {
      try {
        console.log(this.detail.PersonId)
        this.$router.push(
          {
            name: 'persons.edit.address',
            params: {
              personId: this.detail.PersonId
            }
          }
        )
      } catch (error) {
        console.log(error)
      }
    },
    async clickMe () {
      try {
        PdfTk
          .input('/home/it1/.hisdata/test.pdf')
          .stamp(__static + '/stamp/logo.pdf')
          .output('/home/it1/.hisdata/output.pdf')
          .then(buffer => {
            // Do stuff with the output buffer
          })
          .catch(err => {
            console.log(err)
            // handle errors
          })
      } catch (error) {
        console.log({error: error})
      }
    },
    dataMapper (item) {
      return item
    },
    async closeConnection () {
      if (this.connection !== null && typeof this.connection.close === 'function') {
        console.log('cleaning connection')
        try {
          await this.connection.close()
        } finally {
          this.connection = null
        }
      }
    },
    async transaction (transaction) {
      const { Almamaters, Persons, Employees, JobTitles, Licenses, LicenseTypes, AddressHistories, Villages, Districts, Regencies, Provinces } = this.connection.models
      let data = await Employees.findById(this.employeeId, {
        transaction: transaction,
        raw: false,
        attributes: ['Id'],
        /* where: {
            id: this.employeeId
          }, */
        include: [
          {
            model: Persons,
            attributes: ['Id', 'Name', 'Gender', 'BirthDate', 'Faith', 'BirthPlaceRegencyCode'],
            include: [
              {
                model: Almamaters,
                attributes: ['Name'],
                include: [
                  {
                    model: Regencies,
                    attributes: ['Name']
                  }
                ]
              },
              {
                model: Regencies,
                attributes: ['Name'],
                as: 'BirthPlaceRegency'
              },
              {
                model: Licenses,
                include: [
                  {
                    model: LicenseTypes
                  }
                ]
              },
              {
                model: AddressHistories,
                include: [
                  {
                    model: Villages,
                    as: 'AddressVillage',
                    include: [
                      {
                        model: Districts,
                        include: [
                          {
                            model: Regencies,
                            include:
                              [
                                {
                                  model: Provinces
                                }
                              ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            model: JobTitles,
            attributes: ['Name']
          }
        ]
      })
      return data
    },
    async populate () {
      this.connection = (new this.$orm()).connect()
      try {
        let data = await this.connection.transaction(this.transaction)
        let { JobTitle, Person } = data
        this.Person = Person
        let { AddressHistories, BirthPlaceRegency, BirthDate } = Person
        // console.log(AddressHistories[0].AddressVillage.Name)
        AddressHistories = AddressHistories[0]
        let Village = AddressHistories.AddressVillage.Name
        let District = AddressHistories.AddressVillage.District.Name
        let Regency = AddressHistories.AddressVillage.District.Regency.Name
        let Province = AddressHistories.AddressVillage.District.Regency.Province.Name
        let disp = `${Village}, ${District}, ${Regency}, ${Province}`
        // disp = startCase(toLower(disp))
        this.OfficialAddress = disp
        this.JobTitle = JobTitle.Name
        this.BirthPlaceRegency = BirthPlaceRegency.Name
        this.BirthDate = BirthDate
      } catch (error) {
        console.log(error)
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  padding: 20px;
}
.big {
  height: 1000px;
}
.mo:hover {
  text-decoration: underline;
}
</style>
