import { shallowMount } from '@vue/test-utils'
import settings from './settings.vue'

test('settings renders a vue instance', () => {
  expect(shallowMount(settings).isVueInstance()).toBe(true)
})

test('renders a vue instance', () => {
  expect(shallowMount(settings).isVueInstance()).toBe(true)
})
