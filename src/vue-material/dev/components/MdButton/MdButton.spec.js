import VueRouter from 'vue-router'
import Vue from 'vue'
import mountTemplate from 'test/utils/mountTemplate'
import MdButton from './MdButton.vue'
import MdRipple from 'components/MdRipple/MdRipple.vue'

test('should render the theme class', async () => {
  const template = '<md-button md-theme="alt">Button</md-button>'
  const wrapper = await mountTemplate(MdButton, template)

  expect(wrapper.classes()).toContain('md-button')
  expect(wrapper.classes()).toContain('md-theme-alt')
  expect(wrapper.is('button')).toBe(true)
  expect(Object.keys(wrapper.attributes())).toContain('type')
  expect(wrapper.attributes().type).toBe('button')
})

test('should render tag <button> with type "button"', async () => {
  const template = '<md-button>Button</md-button>'
  const wrapper = await mountTemplate(MdButton, template)

  wrapper.trigger('click')

  expect(wrapper.classes()).toContain('md-button')
  expect(wrapper.is('button')).toBe(true)
  expect(Object.keys(wrapper.attributes())).toContain('type')
  expect(wrapper.attributes().type).toBe('button')
})

test('should render tag <button> with type "submit"', async () => {
  const template = '<md-button type="submit">Button</md-button>'
  const wrapper = await mountTemplate(MdButton, template)

  expect(wrapper.classes()).toContain('md-button')
  expect(wrapper.is('button')).toBe(true)
  expect(Object.keys(wrapper.attributes())).toContain('type')
  expect(wrapper.attributes().type).toBe('submit')
})

test('should render tag <a> when a href is given', async () => {
  const template = '<md-button href="#test">Button</md-button>'
  const wrapper = await mountTemplate(MdButton, template)

  expect(wrapper.classes()).toContain('md-button')
  expect(wrapper.is('a')).toBe(true)
  expect(Object.keys(wrapper.attributes())).not.toContain('type')
  expect(Object.keys(wrapper.attributes())).toContain('href')
  expect(wrapper.attributes().href).toBe('#test')
})

test('should render tag <a> when using "to" prop from vue-router', async () => {
  Vue.use(VueRouter)

  const router = new VueRouter({
    mode: 'history',
    routes: []
  })
  const rootRoute = '<md-button to="/">Root</md-button>'
  const testRoute = '<md-button to="/test">Test</md-button>'
  const rootWrapper = await mountTemplate(MdButton, rootRoute, { router })
  const testWrapper = await mountTemplate(MdButton, testRoute, { router })

  expect(rootWrapper.classes()).toContain('router-link-active')
  expect(testWrapper.classes()).toContain('md-button')
  expect(testWrapper.is('a')).toBe(true)
  expect(Object.keys(testWrapper.attributes())).not.toContain('type')
  expect(Object.keys(rootWrapper.attributes())).toContain('href')
  expect(rootWrapper.attributes().href).toBe('/')
  expect(Object.keys(testWrapper.attributes())).toContain('href')
  expect(testWrapper.attributes().href).toBe('/test')
})

test('should render tag <button> when using "to" prop and vue-router is not configured', async () => {
  const template = '<md-button to="/test">Button</md-button>'
  const wrapper = await mountTemplate(MdButton, template)

  expect(wrapper.classes()).toContain('md-button')
  expect(wrapper.is('button')).toBe(true)
  expect(Object.keys(wrapper.attributes())).toContain('type')
  expect(wrapper.attributes().type).toBe('button')
  expect(Object.keys(wrapper.attributes())).not.toContain('href')
})

test('should not render a ripple element if the button is disabled', async () => {
  const template = '<md-button disabled>Disabled</md-button>'
  const wrapper = await mountTemplate(MdButton, template)
  const ripple = wrapper.findAll(MdRipple).at(0)

  expect(wrapper.classes()).toContain('md-button')
  expect(wrapper.is('button')).toBe(true)
  expect(Object.keys(wrapper.attributes())).toContain('type')
  expect(wrapper.attributes().type).toBe('button')
  expect(Object.keys(wrapper.attributes())).toContain('disabled')
  expect(wrapper.attributes().disabled).toBe('disabled')
  expect(ripple.classes()).toContain('md-disabled')
})

test('should not render a ripple element when md-ripple is false', async () => {
  const template = '<md-button :md-ripple="false">Disabled</md-button>'
  const wrapper = await mountTemplate(MdButton, template)
  const ripple = wrapper.findAll(MdRipple).at(0)

  expect(wrapper.classes()).toContain('md-button')
  expect(wrapper.classes()).toContain('md-ripple-off')
  expect(wrapper.is('button')).toBe(true)
  expect(Object.keys(wrapper.attributes())).toContain('type')
  expect(wrapper.attributes().type).toBe('button')
  expect(ripple.classes()).toContain('md-disabled')
})
