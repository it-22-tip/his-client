import mountTemplate from 'test/utils/mountTemplate'
import MdProgressBar from './MdProgressBar.vue'

test('should render the progress', async () => {
  const template = '<md-progress-bar md-mode="indeterminate"></md-progress-bar>'
  const wrapper = await mountTemplate(MdProgressBar, template)

  expect(wrapper.classes('md-progress-bar')).toContain('md-progress-bar')
})

test('should render the theme class', async () => {
  const template = '<md-progress-bar md-theme="alt"></md-progress-bar>'
  const wrapper = await mountTemplate(MdProgressBar, template)

  expect(wrapper.classes('md-theme-alt')).toContain('md-theme-alt')
})
