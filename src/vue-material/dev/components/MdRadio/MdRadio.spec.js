import mountStringSlot from 'test/utils/mountStringSlot'
import mountTemplate from 'test/utils/mountTemplate'
import MdRadio from './MdRadio.vue'

test('should render the radio', async () => {
  const template = '<md-radio></md-radio>'
  const wrapper = await mountTemplate(MdRadio, template)

  expect(wrapper.classes()).toContain('md-radio')
})

test('should render the theme class', async () => {
  const template = '<md-radio md-theme="alt"></md-radio>'
  const wrapper = await mountTemplate(MdRadio, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})

test('should create a fallback id if not given', async () => {
  const wrapper = await mountStringSlot(MdRadio, 'Label')
  const createdId = wrapper.vm.$props.id
  const input = wrapper.findAll('input').at(0)
  const label = wrapper.findAll('label').at(0)

  expect(Object.keys(input.attributes())).toContain('id')
  expect(input.attributes().id).toBe(createdId)

  expect(Object.keys(label.attributes())).toContain('for')
  expect(label.attributes().for).toBe(createdId)
})

test('should create a fallback value if not given', async () => {
  const wrapper = await mountStringSlot(MdRadio, 'Label')
  const createdValue = wrapper.vm.$props.value

  expect(createdValue).toBe('on')
})

test('should create disabled and required classes', async () => {
  const wrapper = await mountStringSlot(MdRadio, 'Label', {
    propsData: {
      disabled: true,
      required: true
    }
  })

  expect(wrapper.classes()).toContain('md-disabled')
  expect(wrapper.classes()).toContain('md-required')
})

test('should bind id, name, disabled and required to the inner input', async () => {
  const wrapper = await mountStringSlot(MdRadio, 'Label', {
    propsData: {
      id: 'test',
      name: 'test',
      disabled: true,
      required: true
    }
  })
  const input = wrapper.findAll('input').at(0)

  expect(Object.keys(input.attributes())).toContain('id')
  expect(input.attributes().id).toBe('test')

  expect(Object.keys(input.attributes())).toContain('name')
  expect(input.attributes().name).toBe('test')

  expect(Object.keys(input.attributes())).toContain('disabled')
  expect(input.attributes().disabled).toBe('disabled')

  expect(Object.keys(input.attributes())).toContain('required')
  expect(input.attributes().required).toBe('required')
})

/* test('should toggle a checked class when checked', async () => {
  const template = `
    <div>
      <md-radio v-model="model" value="1">Label</md-radio>
      <md-radio v-model="model" value="2">Label</md-radio>
    </div>
  `
  const wrapper = await mountTemplate(MdRadio, template, {
    data:  () => ({
      model: '1'
    })
  })
  const radio1 = wrapper.findAll(MdRadio).at(0)
  const radio2 = wrapper.findAll(MdRadio).at(1)
  const label1 = wrapper.findAll('label').at(0)
  const label2 = wrapper.findAll('label').at(1)

  expect(radio1.classes()).toContain('md-checked')
  expect(radio2.classes()).not.toContain('md-checked')

  label2.trigger('click')
  await wrapper.vm.$nextTick()
  expect(radio1.classes()).not.toContain('md-checked')
  expect(radio2.classes()).toContain('md-checked')

  label1.trigger('click')
  await wrapper.vm.$nextTick()
  expect(radio1.classes()).toContain('md-checked')
  expect(radio2.classes()).not.toContain('md-checked')
}) */

/* test('should bind "on" value when no value attribute is given', async () => {
  const template = `
  <div>
    <md-radio v-model="model" value="1">Label</md-radio>
    <md-radio v-model="model">Label</md-radio>
  </div>
  `
  const wrapper = await mountTemplate(MdRadio, template, {
    data:  () => ({
      model: '1'
    })
  })
  const radio1 = wrapper.findAll(MdRadio).at(0)
  const radio2 = wrapper.findAll(MdRadio).at(1)
  const container1 = wrapper.findAll('.md-radio-container').at(0)
  const container2 = wrapper.findAll('.md-radio-container').at(1)

  expect(radio1.vm.isSelected).toBe(true)
  expect(radio2.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe('1')

  container2.trigger('click')
  expect(radio1.vm.isSelected).toBe(false)
  expect(radio2.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe('on')

  container1.trigger('click')
  expect(radio1.vm.isSelected).toBe(true)
  expect(radio2.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe('1')
}) */

/* test('should toggle string values on model', async () => {
  const template = `
    <div>
      <md-radio v-model="model" value="1">Label</md-radio>
      <md-radio v-model="model" value="2">Label</md-radio>
    </div>
  `
  const wrapper = await mountTemplate(MdRadio, template, {
    data:  () => ({
      model: '1'
    })
  })
  const radio1 = wrapper.findAll(MdRadio).at(0)
  const radio2 = wrapper.findAll(MdRadio).at(1)
  const container1 = wrapper.findAll('.md-radio-container').at(0)
  const container2 = wrapper.findAll('.md-radio-container').at(1)

  expect(radio1.vm.isSelected).toBe(true)
  expect(radio2.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe('1')

  container2.trigger('click')
  expect(radio1.vm.isSelected).toBe(false)
  expect(radio2.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe('2')

  container1.trigger('click')
  expect(radio1.vm.isSelected).toBe(true)
  expect(radio2.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe('1')
}) */

/* test('should toggle boolean values on model', async () => {
  const template = `
    <div>
      <md-radio v-model="model" :value="true">Label</md-radio>
      <md-radio v-model="model" :value="false">Label</md-radio>
    </div>
  `
  const wrapper = await mountTemplate(MdRadio, template, {
    data:  () => ({
      model: true
    })
  })
  const radio1 = wrapper.findAll(MdRadio).at(0)
  const radio2 = wrapper.findAll(MdRadio).at(1)
  const container1 = wrapper.findAll('.md-radio-container').at(0)
  const container2 = wrapper.findAll('.md-radio-container').at(1)

  expect(radio1.vm.isSelected).toBe(true)
  expect(radio2.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe(true)

  container2.trigger('click')
  expect(radio1.vm.isSelected).toBe(false)
  expect(radio2.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe(false)

  container1.trigger('click')
  expect(radio1.vm.isSelected).toBe(true)
  expect(radio2.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe(true)
}) */