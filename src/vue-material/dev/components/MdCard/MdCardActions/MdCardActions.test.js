import mountTemplate from 'test/utils/mountTemplate'
import mockConsole from 'test/utils/mockConsole'
import MdCard from '../MdCard.vue'
import MdCardActions from './MdCardActions.vue'

const cardComponents = {
  components: { MdCardActions }
}

test('should render the actions', async () => {
  const template = `
    <md-card>
      <md-card-actions></md-card-actions>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const actions = wrapper.findAll(MdCardActions).at(0)

  expect(actions.classes()).toContain('md-card-actions')
  expect(actions.classes()).toContain('md-alignment-right')
})

test('should render the actions with left alignment classes', async () => {
  const template = `
    <md-card>
      <md-card-actions md-alignment="left"></md-card-actions>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const actions = wrapper.findAll(MdCardActions).at(0)

  expect(actions.classes()).toContain('md-card-actions')
  expect(actions.classes()).toContain('md-alignment-left')
})

test('should render the actions with space-between alignment classes', async () => {
  const template = `
    <md-card>
      <md-card-actions md-alignment="space-between"></md-card-actions>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const actions = wrapper.findAll(MdCardActions).at(0)

  expect(actions.classes()).toContain('md-card-actions')
  expect(actions.classes()).toContain('md-alignment-space-between')
})

test('should fail with an unsupported alignment value', async () => {
  const template = `
    <md-card>
      <md-card-actions md-alignment="center"></md-card-actions>
    </md-card>
  `
  const mock = mockConsole()

  await mountTemplate(MdCard, template, cardComponents)

  expect(console.error).toBeCalled()

  mock()
})
