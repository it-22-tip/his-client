<template>
  <layout-one>
    <md-toolbar class="md-dense md-toolbar md-primary" md-elevation="0">
        <md-button @click="$router.go(-1)" class="md-icon-button md-dense">
            <md-icon>close</md-icon>
        </md-button>
        <md-button @click="save" class="md-icon-button md-dense">
            <md-icon>save</md-icon>
        </md-button>
    </md-toolbar>
    <md-content class="ctc">

      <md-content class="padding-10">
        <md-steppers>
          <md-step id="first" md-label="First Step">
        <div class="md-layout">
          <div class="md-layout-item md-size-25">
            Nama
          </div>
          <md-field class="md-layout-item md-size-25">
            <label>Nama</label>
            <md-input v-model="saved.Person.Name"/>
          </md-field>
        </div>

        <div class="md-layout">
          <div class="md-layout-item md-size-25">
            Gender
          </div>
          <div class="md-layout-item md-size-25">
            <md-radio v-model="saved.Person.Gender" value="P">Perempuan</md-radio>
            <md-radio v-model="saved.Person.Gender" value="L">Laki - Laki</md-radio>
          </div>
        </div>

        <div class="md-layout">
          <div class="md-layout-item md-size-25">
            Posisi
          </div>
          <md-field class="md-layout-item md-size-25">
            <label for="movie">Posisi</label>
              <md-select v-model="saved.JobTitleId" @md-opened="openPosition">
                <md-option v-for="posisi in dbPosisi" :value="posisi.Id" :key="posisi.id">{{ posisi.Name }}</md-option>
              </md-select>
          </md-field>
        </div>

        <div class="md-layout">
          <div class="md-layout-item md-size-25">
            Tanggal Lahir
          </div>
          <div class="md-layout-item md-size-25">
            <date-picker v-model="saved.Person.BirthDate"/>
          </div>
        </div>
          </md-step>
          <md-step id="second" md-label="Second Step">
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
    mixins: [
      orm
    ],
    components: {
      'layout-one': () => import('@partials/layout-one'),
      'date-picker': () => import('@partials/date-picker')
    },
    data () {
      return {
        pageTitle: null,
        saved: {
          Person: {
            Name: '',
            Gender: 'P',
            BirthDate: moment().toDate()
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
        this.connection = (new this.$orm).withOption({
          username: 'his',
          password: 'his',
          database: 'his',
        }).connect()
        const { JobTitles } = this.connection.models
        JobTitles.findAll(
          {
            raw: true,
            attributes: ['Id', 'Name']
          }
        ).then(
          data => {
            this.dbPosisi= data
          }
        )
      },
      async transaction (transaction) {
        const { Persons, Employees, JobTitles } = this.connection.models
        let data = await Employees.create(this.saved, {
          transaction: transaction,
          include: [
            {
              model: Persons
            },
            {
              model: JobTitles
            }
          ]
        })
        return data
      },
      async saving () {
        let data
        this.connection = (new this.$orm).withOption({
          username: 'his',
          password: 'his',
          database: 'his',
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
  padding: 20px;
}
</style>

