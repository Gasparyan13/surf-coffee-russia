import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/FieldInputs/TextField/Default',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  disabledArgs,
  errorArgs,
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

export const Disabled = Template.bind({})
Disabled.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
  ...disabledArgs,
}

export const Error = Template.bind({})
Error.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
  ...errorArgs,
}
