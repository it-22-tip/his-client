import mountTemplate from 'test/utils/mountTemplate'
import MdCard from '../MdCard.vue'
import MdCardArea from './MdCardArea.vue'

const cardComponents = {
  components: { MdCardArea }
}

test('should render the area', async () => {
  const template = `
    <md-card>
      <md-card-area></md-card-area>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const area = wrapper.find(MdCardArea)[0]

  expect(area.classes('md-card-area')).toContain('md-card-area')
  expect(area.classes('md-inset')).toContain('md-inset')
})

test('should inset class', async () => {
  const template = `
    <md-card>
      <md-card-area md-inset></md-card-area>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const area = wrapper.find(MdCardArea)[0]

  expect(area.classes('md-card-area')).toContain('md-card-area')
  expect(area.classes('md-inset')).toContain('md-inset')
})
