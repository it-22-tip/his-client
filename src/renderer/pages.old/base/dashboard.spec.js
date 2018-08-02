import { shallowMount } from '@vue/test-utils'
import dashboard from './dashboard.vue'

test('dashboar renders a vue instance', () => {
  expect(shallowMount(dashboard).isVueInstance()).toBe(true)
})

test('renders a vue instance', () => {
  expect(shallowMount(dashboard).isVueInstance()).toBe(true)
})
