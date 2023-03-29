import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/RadioButtonGroup/Horizontal',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  disabledArgs,
  defaultSelectedArgs,
  errorArgs,
  horizontalArgs,
} = stories

const commonArgs = {
  ...defaultArgs,
  ...horizontalArgs,
}

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}

export const Selected = Template.bind({})
Selected.args = {
  ...commonArgs,
  ...defaultSelectedArgs,
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
