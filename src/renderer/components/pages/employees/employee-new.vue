<template>
  <layout-one>
    <md-toolbar
      class="md-dense md-toolbar md-primary"
      md-elevation="0">
      <md-button
        class="md-icon-button md-dense"
        @click="$router.go(-1)">
        <md-icon>close</md-icon>
      </md-button>
      <md-button
        class="md-icon-button md-dense"
        @click="save">
        <md-icon>save</md-icon>
      </md-button>
    </md-toolbar>
    <md-content class="ctc">

      <md-content class="padding-10">
        <md-steppers class="mstepper">
          <md-step
            id="first"
            md-label="Data Personal">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-25">
                <md-field>
                  <label>Nama</label>
                  <md-input v-model="saved.Person.Name"/>
                </md-field>
                <md-radio
                  v-model="saved.Person.Gender"
                  value="P">Perempuan</md-radio>
                <md-radio
                  v-model="saved.Person.Gender"
                  value="L">Laki - Laki</md-radio>
                <md-field>
                  <label for="movie">Posisi</label>
                  <md-select
                    v-model="saved.JobTitleId"
                    @md-opened="openPosition">
                    <md-option
                      v-for="posisi in dbPosisi"
                      :value="posisi.Id"
                      :key="posisi.id">{{ posisi.Name }}</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-25">
                <date-picker v-model="saved.Person.BirthDate"/>
                <birthplace-picker v-model="saved.Person.BirthPlaceRegencyCode"/>
              </div>
              <div class="md-layout-item md-size-25">
                <address-picker v-model="saved.Person.AddressVillageCode"/>
              </div>
            </div>
          </md-step>
          <md-step
            id="second"
            md-label="Second Step">
            [2]
          </md-step>
        </md-steppers>
      </md-content>

    </md-content>
  </layout-one>
</template>

<script>
import moment from 'moment'
import orm from '@/mixins/orm'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'date-picker': () => import('@partials/picker/date-picker'),
    'birthplace-picker': () => import('@partials/picker/birthplace-picker'),
    'address-picker': () => import('@partials/picker/address-picker')
  },
  mixins: [
    orm
  ],
  data () {
    return {
      pageTitle: null,
      saved: {
        Person: {
          Name: '',
          Gender: 'P',
          BirthDate: moment().format('YYYY-MM-DD'),
          BirthPlaceRegency: ''
        },
        JobTitleId: null
      },
      dbPosisi: [
        {
          Id: 0,
          Name: 'Tidak Ada'
        }
      ]
    }
  },
  methods: {
    save () {
      this.saving()
    },
    openPosition () {
      this.connection = (new this.$orm()).withOption({
        username: 'his',
        password: 'his',
        database: 'his'
      }).connect()
      const { JobTitles } = this.connection.models
      JobTitles.findAll(
        {
          raw: true,
          attributes: ['Id', 'Name']
        }
      ).then(
        data => {
          this.dbPosisi = data
        }
      )
    },
    async transaction (transaction) {
      const { Persons, Employees, JobTitles } = this.connection.models
      let data
      try {
        data = await Employees.create(this.saved, {
          transaction: transaction,
          logging: console.log(),
          include: [
            {
              model: Persons
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
      let data
      this.connection = (new this.$orm()).withOption({
        username: 'his',
        password: 'his',
        database: 'his'
      }).connect()
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

<style lang="scss" scoped>
.ctc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.padding-10 {
  display: flex;
  flex-direction: column;
  flex: 1;
}

</style>

<style lang="scss">
.mstepper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.mstepper>.md-steppers-wrapper {
  flex: 1 !important;
}
</style>
