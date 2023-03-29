import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/FieldInputs/CurrencyField/Default',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  disabledArgs,
  errorArgs,
  sizeLargeArgs,
  sizeFlexArgs,
  sizeSmallArgs,
} = stories

export const Flex = Template.bind({})
Flex.args = {
  ...defaultArgs,
  ...sizeFlexArgs,
}

export const LargeSize = Template.bind({})
LargeSize.args = {
  ...defaultArgs,
  ...sizeLargeArgs,
}

export const SmallSize = Template.bind({})
SmallSize.args = {
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
