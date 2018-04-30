
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { mount, shallow } from '@vue/test-utils'
import MyTesting from './my-testing.vue'

describe('base-button.vue', () => {
  it('has a text', () => {
    const wrapper = mount(MyTesting)
    wrapper.find('button').trigger('click')
    expect(wrapper.find('div').text()).contains('1')
  })

  it('has a created', () => {
    const wrapper = shallow(MyTesting)
    expect(wrapper).to.be.a('object')
  })

  it('has a methods', () => {
    const wrapper = mount(MyTesting)
    expect(wrapper.vm).to.be.a('object')
  })
})
