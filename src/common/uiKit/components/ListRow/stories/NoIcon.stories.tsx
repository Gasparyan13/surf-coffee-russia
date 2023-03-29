import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/ListRow/No Icon',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  selectedArgs,
} = stories

export const SizeFlex = Template.bind({})
SizeFlex.args = {
  ...defaultArgs,
  ...sizeFlexArgs,
}

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  ...defaultArgs,
  ...sizeSmallArgs,
}

export const SizeLarge = Template.bind({})
SizeLarge.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
}

export const Selected = Template.bind({})
Selected.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
  ...selectedArgs,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
  disabled: true,
}
