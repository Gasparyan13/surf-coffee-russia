import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/ExtendableList/ExtendableListItem/One Row Content',
  ...storyBookConfig,
}

const { Template, defaultArgs, oneRowArgs, parameters } = stories

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
  ...oneRowArgs,
}
Default.parameters = {
  ...parameters,
}

export const AddOnly = Template.bind({})
AddOnly.args = {
  ...defaultArgs,
  canRemove: false,
  ...oneRowArgs,
}
AddOnly.parameters = {
  ...parameters,
}

export const RemoveOnly = Template.bind({})
RemoveOnly.args = {
  ...defaultArgs,
  canAdd: false,
  ...oneRowArgs,
}
RemoveOnly.parameters = {
  ...parameters,
}
