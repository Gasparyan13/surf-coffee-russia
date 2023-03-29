import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/DatePicker/Disabled',
  ...storyBookConfig,
}

const { Template, commonArgs, disabledArgs } = stories

export const Disabled = Template.bind({})
Disabled.args = {
  ...commonArgs,
  ...disabledArgs,
}
