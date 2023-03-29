import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/ToggleButtonGroup/Primary',
  ...storyBookConfig,
}

const { Template, primary, primaryDisabled, primaryLong, primaryFullWidth } =
  stories

export const Default = Template.bind({})
Default.args = {
  ...primary,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...primaryDisabled,
}

export const Long = Template.bind({})
Long.args = {
  ...primaryLong,
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  ...primaryFullWidth,
}
