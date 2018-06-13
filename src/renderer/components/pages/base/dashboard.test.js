import { shallowMount } from '@vue/test-utils'
import expect from 'expect'
import psg from './psg'

test('the best flavor is not coconut', () => {
  expect(shallowMount(psg).isVueInstance()).toBe(true)
})
