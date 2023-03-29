import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/RadioButtonGroup/Vertical',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  disabledArgs,
  errorArgs,
  verticalArgs,
  defaultSelectedArgs,
} = stories

const commonArgs = {
  ...defaultArgs,
  ...verticalArgs,
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
