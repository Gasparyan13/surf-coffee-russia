import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/DatePicker/DisabledFutureDate',
  ...storyBookConfig,
}

const { Template, commonArgs, disabledFutureDateArgs } = stories

export const DisabledFutureDate = Template.bind({})
DisabledFutureDate.args = {
  ...commonArgs,
  ...disabledFutureDateArgs,
}
