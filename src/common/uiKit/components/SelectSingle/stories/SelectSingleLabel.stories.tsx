import { storyBookConfig, stories } from './main'

export default {
  title: 'Components/SelectSingle/Label',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  smallOptionListArgs,
  maxHeightArgs,
  helperTextArgs,
  errorArgs,
} = stories

const caseArgs = {
  labelText: 'Label',
}

const commonArgs = { ...caseArgs, ...defaultArgs }

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
  ...sizeLargeArgs,
  disabled: true,
}

export const SmallOptionList = Template.bind({})
SmallOptionList.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
  ...smallOptionListArgs,
}

export const MaxHeight = Template.bind({})
MaxHeight.args = {
  ...commonArgs,
  ...sizeLargeArgs,
  ...maxHeightArgs,
}

export const HelperText = Template.bind({})
HelperText.args = {
  ...commonArgs,
  ...sizeLargeArgs,
  ...helperTextArgs,
}

export const Error = Template.bind({})
Error.args = {
  ...commonArgs,
  ...sizeLargeArgs,
  ...errorArgs,
}
