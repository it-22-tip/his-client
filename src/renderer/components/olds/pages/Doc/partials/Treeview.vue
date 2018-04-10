<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
      <h3 class="md-title" style="flex: 1">Title</h3>
       <menu-feature></menu-feature>
      </template>
      <div slot="default" class="padding-20">
        <div class="abc">
          <md-toolbar md-elevation="0">Title</md-toolbar>
          <div class="xyz"><v-jstree :data="data" @item-click="itemClick"></v-jstree></div>
        </div>
        <div>
          <h1 style="font-size: 14px;">{{ active }}</h1>
        </div>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
  import VJstree from 'vue-jstree'
  export default {
    data () {
      return {
        active: null,
        data: [
          {
            'text': 'Manajemen',
            'children': [
              {
                'text': 'Pelayanan Kefarmasian dan Penggunaan Obat',
                'selected': true
              },
              {
                'text': 'Peningkatan Mutu dan Keselamatan Pasien'
              },
              {
                'text': 'Tata Kelola Rumah Sakit'
              },
              {
                'text': 'Manajemen Fasilitas dan Keselamatan'
              },
              {
                'text': 'Kompetensi dan Kewenangan Staf'
              }
            ]
          },
          {
            'text': 'Medis',
            'children': [
              {
                'text': 'Akses Ke RS dan Kontinuitas',
                'children': [
                  {
                    'text': 'Proses Penerimaan Pasien Ke Rumah Sakit',
                    'children': [
                      {
                        'text': 'Pasien degan kebutuhan darurat'
                      },
                      {
                        'text': 'Proses Admisi Pasien Rawat Inap'
                      },
                      {
                        'text': 'Kebutuhan Klinis Pasien'
                      }
                    ]
                  },
                  {
                    'text': 'Proses Penerimaan Pasien Rawat Inap dan Pendaftaran Pasien Rawat Jalan',
                    'children': [
                      {
                        'text': 'Pendaftaran Pasien Rawat Jalan dan Rawat Inap'
                      },
                      {
                        'text': 'Penerimaan Langsung dari unit darurat ke unit rawat inap'
                      },
                      {
                        'text': 'Menahan Pasien untuk Observasi'
                      }
                    ]
                  },
                  {
                    'text': 'Kesinambungan Pelayanan'
                  },
                  {
                    'text': 'Pemulangan Dari Rumah Sakit dan Tindak Lanjut'
                  }
                ]
              },
              {
                'text': 'Asesmen Pasien'
              },
              {
                'text': 'Pelayanan Asuhan Pasien'
              },
              {
                'text': 'Pelayanan Anestesi dan Bedah'
              },
              {
                'text': 'Menurunkan Angka Kematian Ibu dan Bayi'
              },
              {
                'text': 'Menurunkan Angka Kesakitan HIV/AIDS'
              },
              {
                'text': 'Menurunkan Angka Kesakitan TB'
              },
              {
                'text': 'Pengendalian Resistensi Anti Mikroba'
              },
              {
                'text': 'Pelayanan Geriatri'
              }
            ]
          },
          {
            'text': 'Perawat',
            'children': [
              {
                'text': 'Hak Pasien dan Keluarga'
              },
              {
                'text': 'Manajemen Komunikasi dan Edukasi'
              },
              {
                'text': 'Pencegahan dan Pengendalian Infeksi'
              },
              {
                'text': 'Sasaran Keselamatan Pasien',
                'children': [
                  {
                    'text': 'Mengindentifikasi Pasien dengan benar'
                  },
                  {
                    'text': 'Meningkatkan Komunikasi yang Efektif'
                  },
                  {
                    'text': 'Meningkatkan keamanan obat-obatan yang harus diwaspadai'
                  },
                  {
                    'text': 'Memastikan lokasi pembedahan yang benar, prosedur yang benar, pembedahan pada pasien yang benar'
                  },
                  {
                    'text': 'Mengurangi resiko infeksi terkait pelayanan kesehatan'
                  },
                  {
                    'text': 'Mengurangi resiko cedera pasien akibat terjatuh'
                  }
                ]
              },
              {
                'text': 'Manajemen Informasi dan Rekam Medis'
              }
            ]
          }
        ]
      }
    },
    methods: {
      itemClick ($event) {
        this.$data.active = $event.model.text
      }
    },
    components: {
      VJstree
    }
  }
</script>


<style lang="scss" scoped>
  .padding-20 {
    padding: 0;
    height: 100%;
    display: flex;
  }
  .abc {
    height: 100%;
    width: 800px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .xyz {
    flex: 1;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
</style>
