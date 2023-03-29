import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/Autocomplete/AutocompleteWithHelperText',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  disabledArgs,
  helperTextArgs,
  errorArgs,
  sizeLargeArgs,
  sizeFlexArgs,
  sizeSmallArgs,
} = stories

const commonArgs = {
  ...defaultArgs,
  ...helperTextArgs,
}

export const Flex = Template.bind({})
Flex.args = {
  ...commonArgs,
  ...sizeFlexArgs,
}

export const LargeSize = Template.bind({})
LargeSize.args = {
  ...commonArgs,
  ...sizeLargeArgs,
}

export const SmallSize = Template.bind({})
SmallSize.args = {
  ...commonArgs,
  ...sizeSmallArgs,
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
