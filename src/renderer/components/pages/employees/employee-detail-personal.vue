<template>
    <md-content>
    <h1>{{ detail.Name }}</h1>
    <p class="mo" @click="showDialog = !showDialog">{{ detail.Address }}</p>
    <employee-edit :show-dialog="showDialog"/>

    </md-content>
</template>

<script>
  import readline from 'readline'
  import PrinceXML from '@/extras/PrinceXML'
  import PdfTk from '@/extras/PdfTk'
  import orm from '@/mixins/orm'
  import { map, startCase, toLower } from 'lodash'
  import licenseListVue from './license-list.vue';
  export default {
    name: 'EmployeeDetail',
    mixins: [
      orm
    ],
    props: [
      'employeeId'
    ],
    data () {
      return {
        model: {},
        connection: null,
        detail: {
          Name: '',
          Address: ''
        },
        showDialog: false
      }
    },
    components: {
      'layout-one': () => import('@partials/layout-one'),
      'employee-edit': () => import('@partials/employee-edit')
    },
    mounted () {
      this.populate()
    },
    methods: {
      editAddress () {
        try {
          this.$router.push(
            {
              name: 'employees.edit.address',
              attributes: {
                employeeId: this.employeeId
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
        // console.log(test)
      },
      dataMapper (item) {
        // console.log(item)

        let Provinces =  item['Person.AddressHistories.AddressVillage.District.Regency.Province.Name'] ? ', ' + startCase(toLower(item['Person.AddressHistories.AddressVillage.District.Regency.Province.Name'])) : ''
        let Regencies =  item['Person.AddressHistories.AddressVillage.District.Regency.Name'] ? ', ' + startCase(toLower(item['Person.AddressHistories.AddressVillage.District.Regency.Name'])) : ''
        let Districts =  item['Person.AddressHistories.AddressVillage.District.Name'] ? ', ' + startCase(toLower(item['Person.AddressHistories.AddressVillage.District.Name'])) : ''
        let Villages =  item['Person.AddressHistories.AddressVillage.Name'] ? ', ' + startCase(toLower(item['Person.AddressHistories.AddressVillage.Name'])) : ''
        let Address = item['Person.AddressHistories.Address']
        let Rt = item['Person.AddressHistories.Rt'] ? ', rt:' + item['Person.AddressHistories.Rt'] : ''
        let Rw = item['Person.AddressHistories.Rw'] ? ', rw:' + item['Person.AddressHistories.Rw'] : ''

        console.log(item)

        item.Address = Address + Rt + Rw + Villages + Districts + Regencies + Provinces

        console.log(item)

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
        const { Persons, Employees, JobTitles, Licenses, LicenseTypes, AddressHistories, Villages, Districts, Regencies, Provinces } = this.connection.models
        console.log(this.connection)
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
              attributes: ['Name', 'Gender', 'BirthDate'],
              include: [
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
          //let model = data.slice()
          let model
          model = map(data, this.dataMapper)
          let first = model.slice()
          console.log(first)
          first = first[0]
          this.detail.Name = first['Person.Name']
          this.detail.Address = first['Address']
          // first = first[0]
          // console.log({a:first['Person.Name']})
          // console.log(first)
          // this.detail = first

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
.mo:hover {
  text-decoration: underline;
}
</style>


