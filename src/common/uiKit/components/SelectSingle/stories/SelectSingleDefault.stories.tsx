import { storyBookConfig, stories } from './main'

export default {
  title: 'Components/SelectSingle/Default',
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
  ...defaultArgs,
  ...sizeLargeArgs,
  ...maxHeightArgs,
}

export const HelperText = Template.bind({})
HelperText.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
  ...helperTextArgs,
}

export const Error = Template.bind({})
Error.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
  ...errorArgs,
}
