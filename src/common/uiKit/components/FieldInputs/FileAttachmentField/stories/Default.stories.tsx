import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/FieldInputs/FileAttachmentField/Default',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  disabledArgs,
  errorArgs,
  sizeFlexArgs,
  sizeLargeArgs,
  sizeSmallArgs,
} = stories

export const SizeFlex = Template.bind({})
SizeFlex.args = {
  ...defaultArgs,
  ...sizeFlexArgs,
}

export const SizeLarge = Template.bind({})
SizeLarge.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
}

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  ...defaultArgs,
  ...sizeSmallArgs,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...defaultArgs,
  ...disabledArgs,
}

export const Error = Template.bind({})
Error.args = {
  ...defaultArgs,
  ...errorArgs,
}
