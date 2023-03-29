import { stories, storyBookConfig } from './main'

export default {
  title: 'Atoms/RadioButton/Checked',
  ...storyBookConfig,
}

const { Template, defaultArgs, disabledArgs, checkedArgs } = stories

const commonArgs = {
  ...defaultArgs,
  ...checkedArgs,
}

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...commonArgs,
  ...disabledArgs,
}
