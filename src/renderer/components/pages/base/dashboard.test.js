import { shallowMount } from '@vue/test-utils'
import expect from 'expect'
import psg from './psg'

test('', () => {
  expect(shallowMount(psg).isVueInstance()).toBe(true)
})
