import { mount } from '@vue/test-utils'
import provincePicker from './province-picker.vue'
import expect from 'expect'

test('renders a vue instance', () => {
  expect(mount(provincePicker).isVueInstance()).toBe(true)
})
