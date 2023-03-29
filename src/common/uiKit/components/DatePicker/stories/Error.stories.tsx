import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/DatePicker/Error',
  ...storyBookConfig,
}

const { Template, commonArgs, errorArgs } = stories

export const Error = Template.bind({})
Error.args = {
  ...commonArgs,
  ...errorArgs,
}
