import { stories, storyBookConfig } from './main'

export default {
  title:
    'Components/FieldInputs/FileAttachmentField/FileAttachmentFieldWithTooltip',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  valueArgs,
  disabledArgs,
  errorArgs,
  sizeFlexArgs,
  sizeLargeArgs,
  sizeSmallArgs,
} = stories

const commonArgs = {
  ...defaultArgs,
  ...valueArgs,
}

export const SizeFlex = Template.bind({})
SizeFlex.args = {
  ...commonArgs,
  ...sizeFlexArgs,
}

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  ...commonArgs,
  ...sizeSmallArgs,
}

export const SizeLarge = Template.bind({})
SizeLarge.args = {
  ...commonArgs,
  ...sizeLargeArgs,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...commonArgs,
  ...disabledArgs,
}

export const Error = Template.bind({})
Error.args = {
  ...commonArgs,
  ...errorArgs,
}
