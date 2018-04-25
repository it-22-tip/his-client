<template>
  <layout-one>
    <md-content>
      <h1>Edit</h1>
      <md-field>
      <md-input/></md-field>
    </md-content>
  </layout-one>
</template>

<script>
import PdfTk from '@/extras/PdfTk'
import orm from '@/mixins/orm'
import { map } from 'lodash'
import licenseListVue from './license-list.vue'
export default {
  name: 'EmployeeDetail',
  components: {
    'layout-one': () => import('@partials/layout-one')
  },
  mixins: [
    orm
  ],
  props: [
    'employeeId'
  ],
  data () {
    return {
      model: {},
      connection: null
    }
  },
  mounted () {
    this.populate()
  },
  methods: {
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
        console.log({error: error})
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
      const { Persons, Employees, JobTitles, Licenses, LicenseTypes } = this.connection.models
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
      this.connection = (new this.$orm()).withOption({
        username: 'his',
        password: 'his',
        database: 'his'
      }).connect()
      try {
        let data = await this.connection.transaction(this.transaction)
        // let model = data.slice()
        console.log(data)
        this.model = map(data, this.dataMapper)
        this.model
      } catch (error) {
        console.log(error)
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>
