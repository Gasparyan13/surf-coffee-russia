import { stories, storyBookConfig } from './main'

export default {
  title:
    'Components/FieldInputs/FileAttachmentField/FileAttachmentFieldWithHelperText',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  disabledArgs,
  helperTextArgs,
  errorArgs,
  sizeFlexArgs,
  sizeLargeArgs,
  sizeSmallArgs,
} = stories

const commonArgs = {
  ...defaultArgs,
  ...helperTextArgs,
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
