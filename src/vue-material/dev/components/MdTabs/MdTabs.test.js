import mountTemplate from 'test/utils/mountTemplate'
import MdTabs from './MdTabs.vue'

test('should render the tabs', async () => {
  const template = '<md-tabs></md-tabs>'
  const wrapper = await mountTemplate(MdTabs, template)

  expect(wrapper.classes('md-tabs')).toContain('md-tabs')
})

test('should render the theme class', async () => {
  const template = '<md-tabs md-theme="alt"></md-tabs>'
  const wrapper = await mountTemplate(MdTabs, template)

  expect(wrapper.classes('md-theme-alt')).toContain('md-theme-alt')
})
