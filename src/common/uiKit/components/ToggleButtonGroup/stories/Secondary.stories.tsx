import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/ToggleButtonGroup/Secondary',
  ...storyBookConfig,
}

const {
  Template,
  secondary,
  secondaryDisabled,
  secondaryLong,
  secondaryFullWidth,
} = stories

export const Default = Template.bind({})
Default.args = {
  ...secondary,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...secondaryDisabled,
}

export const Long = Template.bind({})
Long.args = {
  ...secondaryLong,
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  ...secondaryFullWidth,
}
