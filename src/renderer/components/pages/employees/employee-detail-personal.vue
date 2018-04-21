<template>
  <layout-one>
    <md-content class="dp">
      <md-toolbar class="md-dense md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="$router.go(-1)">
          <md-icon>close</md-icon>
        </md-button>
      </md-toolbar>
      <md-content class="fc">
        <md-content class="scr md-scrollbar">
          <div class="hi">
            <h1>{{ detail.Name }}</h1>
            <h2>{{ detail.JobTitle }}</h2>
            <p>{{ detail.BirthDate.age }} Tahun</p>
            <p class="mo" @click="modalProvince = true">{{ detail.Address }}</p>
            <calendar v-model="detail.BirthDate.dateObj" :attributes='attrs'>
              <div slot-scope="props">
                <md-icon>date</md-icon>{{ detail.BirthDate.human }}
              </div>
            </calendar>
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
  import PrinceXML from '@/extras/PrinceXML'
  import PdfTk from '@/extras/PdfTk'
  import orm from '@/mixins/orm'
  import { map, startCase, toLower } from 'lodash'
  import licenseListVue from './license-list.vue'
  import {setupCalendar, Calendar as cal, DatePicker as dp} from 'v-calendar'
  import 'v-calendar/lib/v-calendar.min.css'
  import moment from 'moment'
  import ModalProvince from '@partials/modal-province'
  console.log(ModalProvince)
  Vue.component('modal-province', ModalProvince)
setupCalendar({
  locale: 'id-ID'
  // firstDayOfWeek: 2 // Monday,
})
  Vue.component('calendar', dp)
  export default {
    name: 'EmployeeDetail',
    mixins: [
      orm
    ],
    components: {
      // 'layout-one': () => import('@partials/layout-one'),
      // 'test-comp': ModalProvince
    },
    props: [
      'employeeId'
    ],
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
        modalProvince: false
      }
    },
    components: {
      'layout-one': () => import('@partials/layout-one')
    },
    mounted () {
      this.populate()
    },
    watch: {
      'detail.BirthDate.dateObj': {
        handler: function (val) {
          let today = moment()
          this.detail.BirthDate.human = moment(val).format('DD MMMM YYYY')
          this.detail.BirthDate.age = Math.abs(parseInt(moment(val).diff(moment(), 'years')))
        }
      }
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
        let test

        try {
          PdfTk
            .input('/home/it1/.hisdata/test.pdf')
            .stamp(__static + '/stamp/logo.pdf')
            .output('/home/it1/.hisdata/output.pdf')
            .then(buffer => {
                // Do stuff with the output buffer
            })
            .catch(err => {
                // handle errors
            })
        } catch (error) {
          console.log({error:error})
        }
      },
      dataMapper (item) {
        let Provinces =  item['Person.AddressHistories.AddressVillage.District.Regency.Province.Name'] ? startCase(toLower(item['Person.AddressHistories.AddressVillage.District.Regency.Province.Name'])) : ''
        let Regencies =  item['Person.AddressHistories.AddressVillage.District.Regency.Name'] ? startCase(toLower(item['Person.AddressHistories.AddressVillage.District.Regency.Name'])) : ''
        let Districts =  item['Person.AddressHistories.AddressVillage.District.Name'] ? startCase(toLower(item['Person.AddressHistories.AddressVillage.District.Name'])) : ''
        let Villages =  item['Person.AddressHistories.AddressVillage.Name'] ? startCase(toLower(item['Person.AddressHistories.AddressVillage.Name'])) : ''
        let Address = item['Person.AddressHistories.Address']
        let Rt = item['Person.AddressHistories.Rt'] ? item['Person.AddressHistories.Rt'] : ''
        let Rw = item['Person.AddressHistories.Rw'] ? item['Person.AddressHistories.Rw'] : ''
        item.Address = `${Address}, RT/W:${Rt}/${Rw}, ${Villages}, ${Districts}, ${Regencies}, ${Provinces}`
        // item.BirthDate = ['Person.BirthDate']
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
        const { Almamaters, EducationHistories, Persons, Employees, JobTitles, Licenses, LicenseTypes, AddressHistories, Villages, Districts, Regencies, Provinces } = this.connection.models
        let data = await Employees.findAll({
          transaction: transaction,
          raw: true,
          attributes: ['Id'],
          where: {
            id: this.employeeId
          },
          include: [
            {
              model: Persons,
              attributes: ['Id', 'Name', 'Gender', 'BirthDate'],
              include: [
                {
                  model: EducationHistories,
                  include: [
                    {
                      model: Almamaters,
                      include: [
                        {
                          model: Regencies
                        }
                      ]
                    }
                  ]
                },
                {
                  model: Regencies,
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
        this.connection = (new this.$orm).withOption({
          username: 'his',
          password: 'his',
          database: 'his',
        }).connect()
        try {
          let data = await this.connection.transaction(this.transaction)
          let model
          model = map(data, this.dataMapper)
          let first = model.slice()
          console.log(first)
          first = first[0]
          this.detail.Name = first['Person.Name']
          this.detail.Address = first['Address']
          this.detail.PersonId = first['Person.Id']
          this.detail.JobTitle = first['JobTitle.Name']
          this.detail.BirthDate = {
            dateObj: moment(first['Person.BirthDate']).toDate(),
            orig: first['Person.BirthDate'],
            human: moment(first['Person.BirthDate']).format('DD MM YYYY'),
            age: Math.abs(parseInt(moment(first['Person.BirthDate']).diff(moment(), 'years')))
          }
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


