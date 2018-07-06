import mountStringSlot from 'test/utils/mountStringSlot'
import mountTemplate from 'test/utils/mountTemplate'
import MdCheckbox from './MdCheckbox.vue'

test('should render the checkbox', async () => {
  const template = '<md-checkbox></md-checkbox>'
  const wrapper = await mountTemplate(MdCheckbox, template)

  expect(wrapper.classes()).toContain('md-checkbox')
})

test('should render the theme class', async () => {
  const template = '<md-checkbox md-theme="alt"></md-checkbox>'
  const wrapper = await mountTemplate(MdCheckbox, template)

  expect(wrapper.classes()).toContain('md-theme-alt')
})

test('should add id and for on input and label', async () => {
  const myId = 'my-id'
  const template = `<md-checkbox id="${myId}">Label</md-checkbox>`
  const wrapper = await mountTemplate(MdCheckbox, template)
  const input = wrapper.findAll('input').at(0)
  const label = wrapper.findAll('label').at(0)

  expect(Object.keys(input.attributes())).toContain('id')
  expect(input.attributes().id).toBe(myId)

  expect(Object.keys(label.attributes())).toContain('for')
  expect(label.attributes().for).toBe(myId)
})

test('should create a fallback id if not given', async () => {
  const wrapper = await mountStringSlot(MdCheckbox, 'Label')
  const createdId = wrapper.vm.$props.id
  const input = wrapper.findAll('input').at(0)
  const label = wrapper.findAll('label').at(0)

  expect(Object.keys(input.attributes())).toContain('id')
  expect(input.attributes().id).toBe(createdId)

  expect(Object.keys(label.attributes())).toContain('for')
  expect(label.attributes().for).toBe(createdId)
})

test('should create disabled and required classes', async () => {
  const wrapper = await mountStringSlot(MdCheckbox, 'Label', {
    propsData: {
      disabled: true,
      required: true
    }
  })

  expect(wrapper.classes()).toContain('md-disabled')
  expect(wrapper.classes()).toContain('md-required')
})

test('should bind id, name, disabled and required to the inner input', async () => {
  const wrapper = await mountStringSlot(MdCheckbox, 'Label', {
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

test('should add and remove a value from model when model is an array by clicking on container', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model" value="2"></md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: ['1']
    })
  })
  const checkbox = wrapper.findAll(MdCheckbox).at(0)
  const container = wrapper.findAll('.md-checkbox-container').at(0)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toEqual(['1', '2'])

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toEqual(['1'])
})

/* test('should add and remove a value from model when model is an array by clicking on label', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model" value="1">Label</md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: []
    })
  })
  const label = wrapper.findAll('label').at(0)

  label.trigger('click')
  expect(wrapper.vm.model).toEqual(['1'])

  label.trigger('click')
  expect(wrapper.vm.model).toEqual([])
}) */

test('should toggle a checked class when checked', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model" value="1">Label</md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: ['1']
    })
  })
  const checkbox = wrapper.findAll(MdCheckbox).at(0)
  const label = wrapper.findAll('label').at(0)

  expect(checkbox.classes()).toContain('md-checked')

  /* label.trigger('click')
  await checkbox.vm.$nextTick()
  expect(checkbox.classes()).not.toContain('md-checked') */
})

/* test('should bind true / false when no value attribute is given', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model"></md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: null
    })
  })
  const checkbox = wrapper.findAll(MdCheckbox).at(0)
  const container = wrapper.findAll('.md-checkbox-container').at(0)

  expect(checkbox.vm.isSelected).toBe(false)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe(true)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe(false)
}) */

test('true-value / false-value should works', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model" true-value="true" false-value="false"></md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: null
    })
  })
  const checkbox = wrapper.findAll(MdCheckbox).at(0)
  const container = wrapper.findAll('.md-checkbox-container').at(0)

  expect(checkbox.vm.isSelected).toBe(false)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe('true')

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe('false')
})

test('should toggle string values on model', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model" value="1"></md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: '1'
    })
  })
  const checkbox = wrapper.findAll(MdCheckbox).at(0)
  const container = wrapper.findAll('.md-checkbox-container').at(0)

  expect(checkbox.vm.isSelected).toBe(true)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe(null)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe('1')
})

test('should toggle boolean model when checkbox do not have a value', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model"></md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: false
    })
  })
  const checkbox = wrapper.findAll(MdCheckbox).at(0)
  const container = wrapper.findAll('.md-checkbox-container').at(0)

  await checkbox.vm.$nextTick()

  expect(checkbox.vm.isSelected).toBe(false)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe(true)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe(false)
})

test('should toggle null / value while checkbox has been set value', async () => {
  const template = `
    <div>
      <md-checkbox v-model="model" value="val"></md-checkbox>
    </div>
  `
  const wrapper = await mountTemplate(MdCheckbox, template, {
    data:  () => ({
      model: false
    })
  })
  const checkbox = wrapper.findAll(MdCheckbox).at(0)
  const container = wrapper.findAll('.md-checkbox-container').at(0)

  await checkbox.vm.$nextTick()

  expect(checkbox.vm.isSelected).toBe(false)

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(true)
  expect(wrapper.vm.model).toBe('val')

  container.trigger('click')
  expect(checkbox.vm.isSelected).toBe(false)
  expect(wrapper.vm.model).toBe(null)
})
