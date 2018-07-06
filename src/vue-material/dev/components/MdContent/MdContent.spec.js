import mountTemplate from 'test/utils/mountTemplate'
import MdContent from './MdContent.vue'

test('should render the content', async () => {
  const template = '<md-content>Lorem ipsum</md-content>'
  const wrapper = await mountTemplate(MdContent, template)

  expect(wrapper.classes()).toContain('md-content')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-content md-theme="alt">Lorem ipsum</md-content>'
  const wrapper = await mountTemplate(MdContent, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})
