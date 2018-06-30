import mountTemplate from 'test/utils/mountTemplate'
import MdListItem from './MdListItem.vue'

test('should render the list item', async () => {
  const template = '<md-list-item>Lorem ipsum</md-list-item>'
  const wrapper = await mountTemplate(MdListItem, template)

  expect(wrapper.classes('md-list-item')).toContain('md-list-item')
  expect(wrapper.text().trim()).toBe('Lorem ipsum')
})
