import { storyBookConfig, stories } from './main'

export default {
  title: 'Components/ExtendableList/ExtendableList',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  largeComponentArgs,
  smallComponentArgs,
  manyItemsArgs,
} = stories

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
}

export const ManyItems = Template.bind({})
ManyItems.args = {
  ...defaultArgs,
  ...manyItemsArgs,
}

export const LargeComponent = Template.bind({})
LargeComponent.args = {
  ...defaultArgs,
  ...largeComponentArgs,
}

export const SmallComponent = Template.bind({})
SmallComponent.args = {
  ...defaultArgs,
  ...smallComponentArgs,
}
