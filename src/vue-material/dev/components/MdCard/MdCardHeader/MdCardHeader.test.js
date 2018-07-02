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
  const header = wrapper.findAll(MdCardHeader).at(0)

  expect(header.classes()).toContain('md-card-header')
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
  const header = wrapper.findAll(MdCardHeader).at(0)
  const text = wrapper.findAll(MdCardHeaderText).at(0)

  expect(text.classes()).toContain('md-card-header-text')
  expect(header.classes()).toContain('md-card-header-flex')
  text.destroy()
  expect(header.classes()).not.toContain('md-card-header-flex')
})
