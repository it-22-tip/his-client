<template>
  <layout-one>
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
          <md-field>
            <label>RT</label>
            <md-input></md-input>
          </md-field>
          <md-field>
            <label>RW</label>
            <md-input></md-input>
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
      active: 'Provinces',
      province: null,
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
      connection: null
    }
  },
  watch: {
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
    }
  },
  mounted () {
    this.province = '33'
    this.getData('Provinces')
  },
  methods: {
    done () {
      console.log('done')
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
        console.log(data)
        this[modelName] = data
        // console.log(this.connection.models)
        /* let data = await this.connection.transaction(transaction)
        let model = data.slice()
        this.provinces = model
        console.log(this.provinces) */
      } catch (error) {
        console.log({error})
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>

