import mountTemplate from 'test/utils/mountTemplate'
import MdAvatar from './MdAvatar.vue'

test('should render the avatar', async () => {
  const template = '<md-avatar>Lorem ipsum</md-avatar>'
  const wrapper = await mountTemplate(MdAvatar, template)

  expect(wrapper.classes()).toContain('md-avatar')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-avatar md-theme="alt">Lorem ipsum</md-avatar>'
  const wrapper = await mountTemplate(MdAvatar, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})
