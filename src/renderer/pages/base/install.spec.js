import { shallowMount } from '@vue/test-utils'
import install from './install.vue'

test('install renders a vue instance', () => {
  expect(shallowMount(install).isVueInstance()).toBe(true)
})
