<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <md-card>
        <div class="md-layout">
          <div class="md-layout-item">Nama</div>
          <div class="md-layout-item">{{ edited.name }}</div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">Gender</div>
          <div class="md-layout-item">{{ edited.gender }}</div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">Status Pernikahan</div>
          <div class="md-layout-item">
            {{ edited['marital_status'] }}
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">Religion</div>
          <div class="md-layout-item">
            {{ edited['religion'] }}
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">Posisi</div>
          <div class="md-layout-item">
            {{ edited['job_title.name'] }}
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">Alamat</div>
          <div class="md-layout-item">
            {{ edited['id_address'] }}, RT: {{ edited['id_address_rt'] }}, RW: {{ edited['id_address_rw'] }}, {{ edited['id_address_village.name'] }}, {{ edited['id_address_village.district.name'] }}, {{ edited['id_address_village.district.regency.name'] }}, {{ edited['id_address_village.district.regency.province.name'] }}
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">Tempat Tanggal Lahir</div>
          <div class="md-layout-item">
            {{ edited['birth_place_regency.name'] }}, {{ edited['birth_date'] }}
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">Pendidikan</div>
          <div class="md-layout-item">
            {{ edited['education_almamater.program_of_study'] }}<br>
            {{ edited['education_almamater.name'] }}<br>
            {{ edited['education_almamater.regency.name'] }}
          </div>
        </div>
        <!-- <div>
              <img height="400" width="300" :src="image"/>
            </div> -->
        <!-- <div class="upl">
              <div class="anc">
                <input accept="image/jpg" @drag-over="dropped" @drop="dropped" @change="upl" type="file"/>
              </div>
                <img class="imgs" v-if="editImage" height="400" width="300" :src="editImage"/>
            </div> -->
        <extra-cropper
          :min-container-width="300"
          :min-container-height="400"
          ref="cropper"
          :img-style="{ width: '300px', height: '400px' }"
          :container-style="{ width: '300px', height: '400px' }"
          :data="{ data: null }"
          :crop-box-resizable="false"
          :crop-box-movable="false"
          :min-crop-box-width="300"
          :min-crop-box-height="400"
          :rotatable="false"
          :guides="false"
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            style="font-size: 1.2em; padding: 10px 0;"
            @change="setImage"
          >
        </extra-cropper>

        <div>
          <md-button :to="{ name: 'page.hr.employee.list' }">Back To List</md-button>
          <md-button :to="{ name: 'page.hr.employee.edit', param: { id: id } }">edit</md-button>
        </div>
      </md-card>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<style lang="scss" scoped>
  div.upl {
    height: 400px;
    width: 300px;
    position: relative;
    background: #cccccc;
  }
  .upl .imgs {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  .upl .anc {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
  }
  .anc input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width:100%;
  }
</style>

<script>
import fs from 'fs'
export default {
  components: {
  },
  props: ['id'],
  data () {
    return {
      edited: {},
      image: false,
      editImage: false,
      imgSrc: null
    }
  },
  created () {
    this.getEmp()
  },
  methods: {
    setImage (e) {
      const file = e.target.files[0]

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }

        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    dragover ($event) {
      // console.log($event)
    },
    dropped ($event) {
      // console.log($event)
    },
    upl ($event) {
      let image
      let data
      let { files } = $event.target
      if (files.length < 1) return
      let { name, path, size } = files[0]
      try {
        image = fs.readFileSync(path)
      } catch (error) {
        console.log(error)
      }
      let blob = new Blob([image], { type: 'image/jpg' })
      let r = new FileReader()
      r.addEventListener('loadend', () => {
        this.editImage = r.result
      })
      r.readAsDataURL(blob)
    },
    clickEdit () {
      // this.$router.push({ name: 'page.hr.edit', params: { id: this.id }})
    },
    async getEmp () {
      const findById = require('@/crud/employee/findById').default
      findById(this.id).then(
        data => {
          this.edited = data
          if (data.image !== null) {
            let blob = new Blob([data.image], { type: 'image/jpg' })
            let r = new FileReader()
            r.addEventListener('loadend', () => {
              this.image = r.result
            })
            r.readAsDataURL(blob)
          }
        }
      )
    }
  }
}
</script>
