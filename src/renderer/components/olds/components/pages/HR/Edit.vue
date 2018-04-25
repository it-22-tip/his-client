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
            {{ edited['id_address'] }}, RT: {{ edited['id_address_rt'] }}, RW: {{ edited['id_address_rw'] }}, {{ edited['id_address_village.name'] }}, {{ edited['id_address_village.district.name'] }}, {{ edited['id_address_regency'] }}, {{ edited['id_address_province'] }}
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

<script>
import { filter, mapKeys, mapValues } from 'lodash'
import findById from '@/crud/employee/findById'
import { models } from '@/orm'
export default {
  components: {
  },
  props: ['id'],
  data () {
    return {
      edited: {}
    }
  },
  created () {
    findById(this.id).then(
      data => {
        this.edited = {
          'id_address_regency': data.get('id_address_village').get('district').get('regency').get('name'),
          'id_address_province': data.get('id_address_village').get('district').get('regency').get('province').get('name')
        }
      }
    )
  },
  methods: {
  }
}
</script>
