import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/DatePicker/Default',
  ...storyBookConfig,
}

const { Template, commonArgs } = stories

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}
