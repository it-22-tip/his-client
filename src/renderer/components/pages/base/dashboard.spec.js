import { shallowMount, mount } from '@vue/test-utils'
import dashboard from './dashboard.vue'
import expect from 'expect'
import psg from './psg'

test('', () => {
  expect(shallowMount(psg).isVueInstance()).toBe(true)
})

describe('Your Component', () => {
  it('renders a vue instance', () => {
    expect(shallowMount(dashboard).isVueInstance()).toBe(true)
  })
})
