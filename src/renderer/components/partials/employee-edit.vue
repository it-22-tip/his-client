<template>
<md-dialog class="test" :md-active.sync="showed">
      <md-dialog-title>Preferences</md-dialog-title>

    <md-content>
      <md-steppers md-linear :md-active-step.sync="active">
        <md-step id="Provinces" md-label="Provinsi" md-description="">
          <md-field>
            <label for="province">Provinsi</label>
            <md-select v-model="province" name="province" id="province">
              <md-option v-for="item in Provinces" :value="item.Code" :key="item.Code">{{ item.Name }}</md-option>
            </md-select>
          </md-field>
          <md-button :disabled="province === null" class="md-primary md-raised" @click="active = 'Regencies'">Selanjutnya</md-button>
        </md-step>
        <md-step id="Regencies" md-label="Kota/Kabupaten" md-description="">
          <md-field>
            <label for="regency">Kota/Kabupaten</label>
            <md-select v-model="regency" name="regency" id="regency">
              <md-option v-for="item in Regencies" :value="item.Code" :key="item.Code">{{ item.Name }}</md-option>
            </md-select>
          </md-field>
          <md-button class="md-primary md-raised" @click="active = 'Provinces'">Kembali</md-button>
          <md-button :disabled="regency === null" class="md-primary md-raised" @click="active = 'Districts'">Selanjutnya</md-button>
        </md-step>
        <md-step id="Districts" md-label="Kecamatan" md-description="">
          <md-field>
            <label for="district">Kecamatan</label>
            <md-select v-model="district" name="district" id="district">
              <md-option v-for="item in Districts" :value="item.Code" :key="item.Code">{{ item.Name }}</md-option>
            </md-select>
          </md-field>
          <md-button class="md-primary md-raised" @click="active = 'Regencies'">Kembali</md-button>
          <md-button :disabled="district === null" class="md-primary md-raised" @click="active = 'Villages'">Selanjutnya</md-button>
        </md-step>
        <md-step id="Villages" md-label="Kelurahan/Desa" md-description="">
          <md-field>
            <label for="village">Kelurahan/Desa</label>
            <md-select v-model="village" name="village" id="village">
              <md-option v-for="item in Villages" :value="item.Code" :key="item.Code">{{ item.Name }}</md-option>
            </md-select>
          </md-field>
          <md-field md-clearable>
            <label>RT</label>
            <md-input v-model="rt" :value="rt" type="number" min="1" max="30"/>
          </md-field>
          <md-field md-clearable>
            <label>RW</label>
            <md-input v-model="rw" :value="rw" type="number" min="1" max="30"/>
          </md-field>
          <md-field>
            <label>Jalan/Dusun</label>
            <md-input v-model="address"/>
          </md-field>
          <md-button class="md-primary md-raised" @click="active = 'Districts'">Kembali</md-button>
          <md-button :disabled="village === null" class="md-primary md-raised" @click="done">Simpan</md-button>
        </md-step>
      </md-steppers>
    </md-content>


      <md-dialog-actions>
        <md-button class="md-primary" @click="showed = false">Close</md-button>
        <md-button class="md-primary" @click="showed = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
</template>

<script>
import Vue from 'vue'
import { default as Promise } from 'bluebird'
import orm from '@/mixins/orm'
export default {
  mixins: [
    orm
  ],
  props: ['showDialog'],
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'select-province': () => import('@partials/select-province')
  },
  data: () => ({
      active: 'Provinces',
      province: '33',
      regency: null,
      district: null,
      village: null,
      rt: null,
      rw: null,
      address: null,
      Provinces: [],
      Regencies: [],
      Districts: [],
      Villages: [],
      connection: null,
      showed: false
  }),
  watch: {
    showDialog (val) {
      this.showed = val
    },
    active (val) {
      if (val === 'Provinces') {
        this.getData(val)
        this.regency = null
      }
      if (val === 'Regencies') {
        this.getData(val, { ProvinceCode: this.province })
        this.district = null
      }
      if (val === 'Districts') {
        this.getData(val, { RegencyCode: this.regency })
        this.village = null
      }
      if (val === 'Villages') {
        this.getData(val, { DistrictCode: this.district })
      }
    },
    rt (val) {
      val = Math.abs(val)
    },
    rw (val) {
      val = Math.abs(val)
    }
  },
  async mounted () {
    // this.province = '33'
      // just example
    this.getData('Provinces')
  },
  methods: {
    done () {
      console.log('done')
    },
    async getPersons() {
      const transaction = async transaction => {
        const Model = this.connection.models[modelName]
        const opt = {
          transaction: transaction,
          raw: true,
          attributes: ['Name', 'Code']
        }
        if (where) opt.where = where
        let data = await Model.findAll(opt)
        return data
      }
      this.connection = (new this.$orm).withOption({
        username: 'his',
        password: 'his',
        database: 'his',
      }).connect()
      try {
        let data = await this.connection.transaction(transaction)
        let model = data.slice()
        this[modelName] = model
        this.$nextTick().then(
          () => {
            this.province = 33
          }
        )
      } catch (error) {
        console.log({error})
      } finally {
        await this.closeConnection()
      }
    },
    async getData(modelName, where = null) {
      const transaction = async transaction => {
        const Model = this.connection.models[modelName]
        const opt = {
          transaction: transaction,
          raw: true,
          attributes: ['Name', 'Code']
        }
        if (where) opt.where = where
        let data = await Model.findAll(opt)
        return data
      }
      this.connection = (new this.$orm).withOption({
        username: 'his',
        password: 'his',
        database: 'his',
      }).connect()
      try {
        let data = await this.connection.transaction(transaction)
        let model = data.slice()
        this[modelName] = model
        this.$nextTick().then(
          () => {
            this.province = 33
          }
        )
      } catch (error) {
        console.log({error})
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  height: 900px;
  width: 700px;
  position: relative;
  z-index: 1;
}
</style>


