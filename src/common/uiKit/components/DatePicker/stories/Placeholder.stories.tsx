import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/DatePicker/Placeholder',
  ...storyBookConfig,
}

const { Template, commonArgs, placeholderArgs } = stories

export const Placeholder = Template.bind({})
Placeholder.args = {
  ...commonArgs,
  ...placeholderArgs,
}
