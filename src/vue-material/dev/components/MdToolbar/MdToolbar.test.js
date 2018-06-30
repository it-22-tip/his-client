import mountTemplate from 'test/utils/mountTemplate'
import MdToolbar from './MdToolbar.vue'

test('should render the content', async () => {
  const template = '<md-toolbar>Lorem ipsum</md-toolbar>'
  const wrapper = await mountTemplate(MdToolbar, template)

  expect(wrapper.classes('md-toolbar')).toContain('md-toolbar')
  expect(wrapper.classes('md-elevation-4')).toContain('md-elevation-4')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should apply elevation', async () => {
  const template = '<md-toolbar md-elevation="2">Lorem ipsum</md-toolbar>'
  const wrapper = await mountTemplate(MdToolbar, template)

  expect(wrapper.classes('md-toolbar')).toContain('md-toolbar')
  expect(wrapper.classes('md-elevation-2')).toContain('md-elevation-2')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-toolbar md-theme="alt">Lorem ipsum</md-toolbar>'
  const wrapper = await mountTemplate(MdToolbar, template)

  expect(wrapper.classes('md-theme-alt')).toContain('md-theme-alt')
})
