<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <div
        slot="default"
        class="padding-20">
        <div>
          <textarea
            v-model="textarea"
            :md-autogrow="false"
            style="height: 100%; width: 100%;"/>
        </div>
        <div>
          <vue-markdown :source="markdown"/>
        </div>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
import { readFile } from '@/helper/file'
export default {
  data () {
    return {
      markdown: '',
      textarea: ''
    }
  },
  watch: {
    textarea (value) {
      this.markdown = value
    }
  },
  mounted () {
    readFile(__static + '/md/' + 'content.md')
      .then(
        (data) => {
          this.textarea = data
          this.markdown = data
        }
      )
  }
}
</script>

<style lang="scss" scoped>
  .padding-20 {
    padding: 20px;
    display: flex;
  }
  .padding-20 > div {
    flex: 1
  }
</style>
