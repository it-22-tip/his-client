import mountTemplate from 'test/utils/mountTemplate'
import mockConsole from 'test/utils/mockConsole'
import MdCard from '../MdCard.vue'
import MdCardMedia from './MdCardMedia.vue'
import MdCardMediaActions from './MdCardMediaActions.vue'
import MdCardMediaCover from './MdCardMediaCover.vue'

const cardComponents = {
  components: {
    MdCardMedia,
    MdCardMediaActions,
    MdCardMediaCover
  }
}

test('should render the card media with medium size', async () => {
  const template = `
    <md-card>
      <md-card-media md-medium>
      </md-card-media>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const media = wrapper.findAll(MdCardMedia).at(0)

  expect(media.classes()).toContain('md-card-media')
  expect(media.classes()).toContain('md-medium')
})

test('should render the card media with big size', async () => {
  const template = `
    <md-card>
      <md-card-media md-big>
      </md-card-media>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const media = wrapper.findAll(MdCardMedia).at(0)

  expect(media.classes()).toContain('md-card-media')
  expect(media.classes()).toContain('md-big')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="16:9"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-16-9')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="16-9"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-16-9')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="16/9"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-16-9')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="4:3"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-4-3')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="4-3"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-4-3')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="4/3"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-4-3')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="1:1"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-1-1')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="1-1"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-1-1')
})

test('should render the card media with correct ratio', async () => {
  const template = '<md-card-media md-ratio="1/1"></md-card-media>'
  const wrapper = await mountTemplate(MdCardMedia, template, cardComponents)

  expect(wrapper.classes()).toContain('md-ratio-1-1')
})

test('should fail with an unsupported ratio value', async () => {
  const template = `
    <md-card>
      <md-card-media md-ratio="9/16">
      </md-card-media>
    </md-card>
  `
  const mock = mockConsole()

  await mountTemplate(MdCard, template, cardComponents)

  expect(console.error).toBeCalled()

  mock()
})

test('should render the card media actions', async () => {
  const template = `
    <md-card>
      <md-card-media-actions></md-card-media-actions>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const actions = wrapper.findAll(MdCardMediaActions).at(0)

  expect(actions.classes()).toContain('md-card-media-actions')
})

/* test('should render the card media cover', async () => {
  const template = `
    <md-card>
      <md-card-media-cover></md-card-media-cover>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const cover = wrapper.findAll(MdCardMediaCover).at(0)
  const backdrop = wrapper.findAll('.md-card-backdrop').at(0)

  expect(cover.classes()).toContain('md-card-media-cover')
}) */

test('should render the card media cover', async () => {
  const template = `
    <md-card>
      <md-card-media-cover></md-card-media-cover>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const cover = wrapper.findAll(MdCardMediaCover).at(0)
  // const backdrop = wrapper.findAll('.md-card-backdrop').at(0)

  expect(cover.classes()).toContain('md-card-media-cover')
  // expect(cover.classes()).toContain('md-text-scrim')
  // expect(Boolean(backdrop)).toBe(true)
})

test('should render the card media cover with text scrim', async () => {
  const template = `
    <md-card>
      <md-card-media-cover md-text-scrim></md-card-media-cover>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const cover = wrapper.findAll(MdCardMediaCover).at(0)
  const backdrop = wrapper.findAll('.md-card-backdrop').at(0)

  expect(cover.classes()).toContain('md-card-media-cover')
  expect(cover.classes()).toContain('md-text-scrim')
  expect(Boolean(backdrop)).toBe(true)
})

/* test('should render the card media cover with solid background', async () => {
  const template = `
    <md-card>
      <md-card-media-cover md-solid></md-card-media-cover>
    </md-card>
  `
  const wrapper = await mountTemplate(MdCard, template, cardComponents)
  const cover = wrapper.findAll(MdCardMediaCover).at(0)
  const backdrop = wrapper.findAll('.md-card-backdrop').at(0)

  expect(cover.classes()).toContain('md-card-media-cover')
  expect(cover.classes()).toContain('md-solid')
  expect(Boolean(backdrop)).toBe(false)
}) */
