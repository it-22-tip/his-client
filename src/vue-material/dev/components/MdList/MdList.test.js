import mountTemplate from 'test/utils/mountTemplate'
import MdList from './MdList.vue'

test('should render the list', async () => {
  const template = '<md-list>Lorem ipsum</md-list>'
  const wrapper = await mountTemplate(MdList, template)

  expect(wrapper.classes('md-list')).toContain('md-list')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-list md-theme="alt">Lorem ipsum</md-list>'
  const wrapper = await mountTemplate(MdList, template)

  expect(wrapper.classes('md-theme-alt')).toContain('md-theme-alt')
})
