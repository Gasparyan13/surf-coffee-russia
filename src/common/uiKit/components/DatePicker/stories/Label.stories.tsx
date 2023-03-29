import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/DatePicker/Label',
  ...storyBookConfig,
}

const { Template, commonArgs, labelText } = stories

export const Label = Template.bind({})
Label.args = {
  ...commonArgs,
  ...labelText,
}
