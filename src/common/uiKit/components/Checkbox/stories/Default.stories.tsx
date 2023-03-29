import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/Checkbox/Default',
  ...storyBookConfig,
}

const { Template, defaultArgs, disabledArgs, checkedArgs } = stories

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
}

export const Checked = Template.bind({})
Checked.args = {
  ...defaultArgs,
  ...checkedArgs,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...defaultArgs,
  ...disabledArgs,
}

export const CheckedDisabled = Template.bind({})
CheckedDisabled.args = {
  ...defaultArgs,
  ...checkedArgs,
  ...disabledArgs,
}
