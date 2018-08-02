<template>
  <layout-one>
    <md-table
      v-model="model"
      class="right-table"
      md-sort="Name"
      md-sort-order="asc"
      md-fixed-header>
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }">
        <md-table-cell
          md-label="ID"
          md-sort-by="Id"
          md-numeric>{{ item.Id }}</md-table-cell>
        <md-table-cell
          md-label="Name"
          md-sort-by="Name">{{ item.Name }}</md-table-cell>
        <md-table-cell md-label="Job Title">{{ item.JobTitle }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-button @click="toXlsx">To XLSX</md-button>
    <md-button @click="fromXlsx">From XLSX</md-button>
  </layout-one>
</template>

<script>
import XLSX from 'xlsx'
import orm from '@/mixins/orm'
import file from '@/mixins/file'
import { map } from 'lodash'
export default {
  components: {
    'layout-one': () => import('@components/layout-one')
  },
  mixins: [
    orm,
    file
  ],
  data () {
    return {
      model: []
    }
  },
  mounted () {
    this.test1()
  },
  methods: {
    toXlsx () {
      let wb = XLSX.utils.book_new()
      let sheet = XLSX.utils.json_to_sheet(this.model)
      XLSX.utils.book_append_sheet(wb, sheet, 'employees')
      XLSX.writeFile(wb, '/home/idnes/.hisdata/test.xlsx')
    },
    async fromXlsx () {
      let path = '/home/idnes/.hisdata/test.xlsx'
      console.log(await this.readXLSX(path, 'employees'))
      /* file = await this.readFile(file)
      // console.log(file)
      let workbook = XLSX.read(file)
      let sheet = XLSX.utils.sheet_to_json(workbook.Sheets.employees)
      console.log(sheet) */
    },
    async test1 ($event) {
      console.clear()
      let b = (new this.$orm()).withOption({
        username: 'his',
        password: 'his',
        database: 'his',
        logging: console.log
      }).connect()
      const { Persons, Employees, JobTitles } = b.models
      try {
        let data = await b.transaction(
          async transaction => {
            let data = await Persons.findAll({
              transaction: transaction,
              raw: true,
              attributes: ['Name'],
              /* where: {
                '$IdAddressVillage.District.Regency.Name$': 'KOTA SURAKARTA'
              }, */
              include: [
                {
                  model: Employees,
                  attributes: ['Id'],
                  include: [
                    {
                      model: JobTitles,
                      attributes: ['Name']
                    }
                  ]
                }
              ]
            })
            return data
          }
        )
        let model = data.slice()
        model = map(model, (item) => {
          item['Id'] = item['Employee.Id']
          delete item['Employee.Id']
          item['JobTitle'] = item['Employee.JobTitle.Name']
          delete item['Employee.JobTitle.Name']
          return item
        })
        this.model = model
      } catch (error) {
        console.log(error)
      } finally {
        b.close()
        b = null
      }
    }
  }
}
</script>
