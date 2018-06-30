import Vue from 'vue'
import mountTemplate from 'test/utils/mountTemplate'
import MdSubheader from './MdSubheader.vue'

test('should render the subheader', async () => {
  const template = '<md-subheader>Lorem ipsum</md-subheader>'
  const wrapper = await mountTemplate(MdSubheader, template)

  expect(wrapper.classes('md-subheader')).toContain('md-subheader')
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-subheader md-theme="alt">Lorem ipsum</md-subheader>'
  const wrapper = await mountTemplate(MdSubheader, template)

  expect(wrapper.classes('md-theme-alt')).toContain('md-theme-alt')
})

test('should render a <li> tag when inside lists', async () => {
  Vue.component('MdList', {
    template: '<div><slot /></div>'
  })
  const template = `
    <md-list>
      <md-subheader>Lorem ipsum</md-subheader>
    </md-list>`
  const wrapper = await mountTemplate(MdSubheader, template)
  const subheader = wrapper.find(MdSubheader)[0]

  expect(subheader.vm.$el.tagName.toLowerCase()).toBe('li')
})

test('should render a <div> tag when inside any other element', async () => {
  const template = `<md-subheader>Lorem ipsum</md-subheader>`
  const wrapper = await mountTemplate(MdSubheader, template)
  const subheader = wrapper.find(MdSubheader)[0]

  expect(subheader.vm.$el.tagName.toLowerCase()).toBe('div')
})
