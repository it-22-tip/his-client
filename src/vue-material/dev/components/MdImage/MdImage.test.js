import mountTemplate from 'test/utils/mountTemplate'
import MdImage from './MdImage.vue'

test('should render the content', async () => {
  const template = '<md-image>Lorem ipsum</md-image>'
  const wrapper = await mountTemplate(MdImage, template)

  expect(wrapper.classes()).toContain('md-image')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-image md-theme="alt">Lorem ipsum</md-image>'
  const wrapper = await mountTemplate(MdImage, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})
