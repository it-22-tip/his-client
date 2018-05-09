<template>
  <layout-one>
    <md-content class="dp">
      <md-toolbar
        class="md-dense md-primary"
        md-elevation="0">
        <md-button
          class="md-icon-button"
          @click="$router.go(-1)">
          <md-icon>close</md-icon>
        </md-button>
      </md-toolbar>
      <md-content class="fc">
        <md-content class="scr md-scrollbar">
          <div class="hi">
            <div>
              <div>
                <md-subheader>Data Personal</md-subheader>
                <md-field>
                  <label>Nama</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>Kota Lahir</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>Tanggal Lahir</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>Tempat Tinggal Lahir</label>
                  <md-input/>
                </md-field>
              </div>
              <div>
                <md-subheader>Alamat Resmi</md-subheader>
                <md-field>
                  <label>Provinsi</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>Kota/Kabupaten</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>Kecamatan</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>Desa</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>RT</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>RW</label>
                  <md-input/>
                </md-field>
                <md-field>
                  <label>Nama Dusun/Perumahan/Jalan dan Nomor</label>
                  <md-input/>
                </md-field>
              </div>
              <div>
                <md-subheader>Data Pekerjaan</md-subheader>
                <md-field>
                  <label>Posisi</label>
                  <md-input/>
                </md-field>
              </div>
            </div>
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
import moment from 'moment'
import orm from '@/mixins/orm'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'date-picker': () => import('@partials/picker/date-picker')
  },
  mixins: [
    orm
  ],
  data () {
    return {
      pageTitle: null,
      birthDatePlace: {
        BirthDate: '',
        BirthPlaceRegency: ''
      },
      saved: {
        Person: {
          Name: '',
          Gender: 'P',
          BirthDate: moment().format('YYYY-MM-DD'),
          BirthPlaceRegencyCode: ''
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
  watch: {
    'birthDatePlace.BirthDate': {
      handler: function (val) {
        console.log(val)
      }
    },
    'birthDatePlace.BirthPlaceRegency': {
      handler: function (val) {
        this.saved.Person.BirthPlaceRegencyCode = val
      }
    }
  },
  methods: {
    save () {
      this.saving()
    },
    openPosition () {
      this.connection = (new this.$orm()).connect()
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
      console.log(Persons)
      let data
      try {
        data = await Employees.create(this.saved, {
          transaction: transaction,
          logging: console.log,
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
      this.connection = (new this.$orm()).connect()
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
