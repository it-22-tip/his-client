<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
      <h3 class="md-title" style="flex: 1">Title</h3>
       <menu-feature></menu-feature>
      </template>
      <div slot="toolbar">
        [test]
      </div>
      <div slot="default" class="padding-20">
        <pdf-extra
          ref="vuepdf"
          :src="src"
          v-for="i in numPages"
          :key="i"
          :page="i"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @progress="loadedRatio = $event"
          >
        </pdf-extra>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
  import pdf from '@/extra/pdf'
  let loadingTask = pdf.createLoadingTask(`static/mysqljs.pdf`)
  export default {
    data () {
      return {
        markdown: '',
        loadedRation: '',
        src: loadingTask,
        numPages: undefined,
        pageCount: 0,
        currentPage: 0
      }
    },
    mounted () {
      this.src.then(
        pdf => {
          this.numPages = pdf.numPages
          console.log(pdf)
        }
      )
    },
    methods: {
    }
  }
</script>


<style lang="scss" scoped>
  .padding-20 {
    padding: 20px;
  }
</style>
