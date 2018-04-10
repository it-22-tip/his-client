<template>
  <layout-one>
    <h1>Tester</h1>
    <p>{{ model }}</p>
  </layout-one>
</template>

<script>
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
        connection: null
      }
    },
    components: {
      'layout-one': () => import('@partials/layout-one')
    },
    mounted () {
      this.populate()
    },
    methods: {
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
        this.connection = (new this.$orm).withOption({
          username: 'his',
          password: 'his',
          database: 'his',
        }).connect()
        try {
          let data = await this.connection.transaction(this.transaction)
          //let model = data.slice()
          console.log(data)
          this.model = map(data, this.dataMapper)
        } catch (error) {
          console.log(error)
        } finally {
          await this.closeConnection()
        }
      }
    }
  }
</script>

