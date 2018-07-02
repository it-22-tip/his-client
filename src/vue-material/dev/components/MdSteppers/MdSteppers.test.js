import mountTemplate from 'test/utils/mountTemplate'
import MdSteppers from './MdSteppers.vue'

test('should render the steppers', async () => {
  const template = '<md-steppers>Lorem ipsum</md-steppers>'
  const wrapper = await mountTemplate(MdSteppers, template)

  expect(wrapper.classes()).toContain('md-steppers')
})

test('should render the theme class', async () => {
  const template = '<md-steppers md-theme="alt">Lorem ipsum</md-steppers>'
  const wrapper = await mountTemplate(MdSteppers, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})
