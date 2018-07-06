import Vue from 'vue'
import { mount } from '@vue/test-utils'
import mountTemplate from 'test/utils/mountTemplate'
import MdField from './MdField.vue'
import MdInput from './MdInput/MdInput.vue'
import MdTextarea from './MdTextarea/MdTextarea.vue'

let MdLabel = null

beforeEach(() => {
  MdLabel = Vue.component('MdLabel', {
    template: '<label>Label</label>'
  })
})

test('should render the field', async () => {
  const template = '<md-field>Lorem ipsum</md-field>'
  const wrapper = await mountTemplate(MdField, template)

  expect(wrapper.classes()).toContain('md-field')
  expect(wrapper.text().trim()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-field md-theme="alt">Lorem ipsum</md-field>'
  const wrapper = await mountTemplate(MdField, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})

/* test('should create a fallback id if not given', async () => {
  const wrapperWithInput = mount(MdField, {
    slots: {
      default: [MdLabel, MdInput]
    }
  })
  const wrapperWithTextarea = mount(MdField, {
    slots: {
      default: [MdLabel, MdTextarea]
    }
  })
  const input = wrapperWithInput.findAll(MdInput).at(0)
  const inputLabel = wrapperWithInput.findAll('label').at(0)
  const textarea = wrapperWithTextarea.findAll(MdTextarea).at(0)
  const textareaLabel = wrapperWithTextarea.findAll('label').at(0)
  const inputId = input.vm.$props.id
  const textareaId = textarea.vm.$props.id

  expect(Object.keys(input.attributes())).toContain('id')
  expect(input.attributes().id).toBe(inputId)

  expect(Object.keys(inputLabel.attributes())).toContain('for')
  expect(inputLabel.getAttribute('for')).toBe(inputId)

  expect(Object.keys(textarea.attributes())).toContain('id')
  expect(textarea.getAttribute('id')).toBe(textareaId)

  expect(Object.keys(textareaLabel.attributes())).toContain('for')
  expect(textareaLabel.getAttribute('for')).toBe(textareaId)
}) */

/* test('should bind id, name, disabled and required to the inner input', async () => {
  const wrapperWithInput = mount(MdField, {
    slots: {
      default: [MdLabel, MdInput]
    },
    propsData: {
      id: 'test',
      name: 'test',
      disabled: true,
      required: true
    }
  })
  const wrapper = await mountStringSlot(MdRadio, 'Label', {
  })
  const input = wrapper.findAll('input').at(0)

  expect(input.attributes().id).toBe('test')
  expect(input.attributes().name).toBe('test')
  expect(input.attributes().disabled).toBe('disabled')
  expect(input.attributes().required).toBe('required')
})
 */
