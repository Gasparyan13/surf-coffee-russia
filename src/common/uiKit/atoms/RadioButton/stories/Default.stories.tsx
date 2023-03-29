import { stories, storyBookConfig } from './main'

export default {
  title: 'Atoms/RadioButton/Default',
  ...storyBookConfig,
}

const { Template, defaultArgs, disabledArgs, errorArgs } = stories

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
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
