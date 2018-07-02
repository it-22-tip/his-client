import mountTemplate from 'test/utils/mountTemplate'
import MdChips from './MdChips.vue'

test('should render the chips', async () => {
  const template = '<md-chips></md-chips>'
  const wrapper = await mountTemplate(MdChips, template)

  expect(wrapper.classes()).toContain('md-chips')
})

test('should render the theme class', async () => {
  const template = '<md-chips md-theme="alt"></md-chips>'
  const wrapper = await mountTemplate(MdChips, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})
