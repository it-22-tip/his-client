import mountTemplate from 'test/utils/mountTemplate'
import mockConsole from 'test/utils/mockConsole'
import MdCard from './MdCard.vue'

test('should render slot content', async () => {
  const template = '<md-card>Lorem ipsum</md-card>'
  const wrapper = await mountTemplate(MdCard, template)

  expect(wrapper.classes()).toContain('md-card')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-card md-theme="alt">Lorem ipsum</md-card>'
  const wrapper = await mountTemplate(MdCard, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})
