import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/Checkbox/MiddleCheckbox',
  ...storyBookConfig,
}

const { Template, defaultArgs, disabledArgs, middleCheckboxArgs, checkedArgs } =
  stories

const commonArgs = {
  ...defaultArgs,
  ...middleCheckboxArgs,
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
