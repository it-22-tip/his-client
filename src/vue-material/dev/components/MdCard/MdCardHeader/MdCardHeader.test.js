import mountTemplate from 'test/utils/mountTemplate'
import MdCard from '../MdCard.vue'
import MdCardHeader from './MdCardHeader.vue'
import MdCardHeaderText from './MdCardHeaderText.vue'

const cardComponents = {
  components: {
    MdCardHeader,
    MdCardHeaderText
  }
}

test('should render the header', async () => {
  const template = `
    <md-card>
      <md-card-header></md-card-header>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const header = wrapper.find(MdCardHeader)[0]

  expect(header.classes('md-card-header')).toContain('md-card-header')
})

test('should render the header text', async () => {
  const template = `
    <md-card>
      <md-card-header>
        <md-card-header-text></md-card-header-text>
      </md-card-header>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const header = wrapper.find(MdCardHeader)[0]
  const text = wrapper.find(MdCardHeaderText)[0]

  expect(text.classes('md-card-header-text')).toContain('md-card-header-text')
  expect(header.classes('md-card-header-flex')).toContain('md-card-header-flex')
  text.destroy()
  expect(header.classes('md-card-header-flex')).toContain('md-card-header-flex')
})
