<template>
  <layout-one>
    <md-content>
    <h1>Employee Detail</h1>
    <md-field>
      <label>Nama</label>
      <md-input v-model="detail.Name"></md-input>
    </md-field>
    <md-field>
      <label>RT</label>
      <md-input v-model="detail.Rt"></md-input>
    </md-field>
    <md-field>
      <label>RW</label>
      <md-input v-model="detail.Rw"></md-input>
    </md-field>
    <md-field>
      <label>Alamat</label>
      <md-input v-model="detail.Address"></md-input>
    </md-field>
    <md-button @click="edit" class="md-primary md-raised">Click To Edit</md-button>
    </md-content>
  </layout-one>
</template>

<script>
  import readline from 'readline'
  import PrinceXML from '@/extras/PrinceXML'
  import PdfTk from '@/extras/PdfTk'
  import orm from '@/mixins/orm'
  import { map } from 'lodash'
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
          Rt: '',
          Rw: '',
          Address: ''
        }
      }
    },
    components: {
      'layout-one': () => import('@partials/layout-one')
    },
    mounted () {
      this.populate()
    },
    methods: {
      edit () {

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
        console.log(test)
      },
      dataMapper (item) {
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
        const { Persons, Employees, JobTitles, Licenses, LicenseTypes, AddressHistories } = this.connection.models
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
                  model: Licenses,
                  include: [
                    {
                      model: LicenseTypes
                    }
                  ]
                },
                {
                  model: AddressHistories
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
          first = first[0]
          this.detail.Name = first['Person.Name']
          this.detail.Rt = first['Person.Rt']
          this.detail.Rw = first['Person.Rw']
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

