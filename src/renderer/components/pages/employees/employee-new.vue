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
        <md-field>
          <label>Nama</label>
          <md-input v-model="saved.Person.Name"/>
        </md-field>
        <md-list>
          <md-subheader>Jenis Kelamin</md-subheader>
          <md-list-item>
            <md-radio v-model="saved.Person.Gender" value="P"/>
            <span class="md-list-item-text">Perempuan</span>
          </md-list-item>
          <md-list-item>
            <md-radio v-model="saved.Person.Gender" value="L"/>
            <span class="md-list-item-text">Laki-Laki</span>
          </md-list-item>
        </md-list>
        <md-field>
          <label for="movie">Posisi</label>
            <md-select v-model="saved.JobTitleId" @md-opened="openPosition">
              <md-option v-for="posisi in dbPosisi" :value="posisi.Id" :key="posisi.id">{{ posisi.Name }}</md-option>
            </md-select>
        </md-field>
      </md-content>

    </md-content>
  </layout-one>
</template>

<script>
  import orm from '@/mixins/orm'
  export default {
    mixins: [
      orm
    ],
    components: {
      'layout-one': () => import('@partials/layout-one')
    },
    data () {
      return {
        pageTitle: null,
        saved: {
          Person: {
            Name: '',
            Gender: 'P'
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
    mounted () {

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

