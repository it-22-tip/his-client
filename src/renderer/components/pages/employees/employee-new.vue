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
        <md-field>
          <label>Nama</label>
          <md-input v-model="saved.Person.Name"/>
        </md-field>


    <md-list>
      <md-subheader>Ringtone</md-subheader>

      <md-list-item>
        <md-radio v-model="saved.Person.Gender" value="P" />
        <span class="md-list-item-text">Perempuan</span>
      </md-list-item>

      <md-list-item>
        <md-radio v-model="saved.Person.Gender" value="L" />
        <span class="md-list-item-text">Laki - Laki</span>
      </md-list-item>
      </md-list>

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
          }
        }
      }
    },
    mounted () {

    },
    methods: {
      save () {
        this.saving()
      },
      async transaction (transaction) {
        const { Persons, Employees, JobTitles } = this.connection.models
        let data = await Employees.create(this.saved, {
          transaction: transaction,
          include: [
            {
              model: Persons
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
</style>

