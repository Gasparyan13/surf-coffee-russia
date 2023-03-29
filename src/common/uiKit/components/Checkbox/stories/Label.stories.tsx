import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/Checkbox/CheckboxdWithLabel',
  ...storyBookConfig,
}

const { Template, defaultArgs, disabledArgs, labelArgs, checkedArgs } = stories

const commonArgs = {
  ...defaultArgs,
  ...labelArgs,
}

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}

export const Checked = Template.bind({})
Checked.args = {
  ...commonArgs,
  ...checkedArgs,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...commonArgs,
  ...disabledArgs,
}

export const CheckedDisabled = Template.bind({})
CheckedDisabled.args = {
  ...commonArgs,
  ...checkedArgs,
  ...disabledArgs,
}
