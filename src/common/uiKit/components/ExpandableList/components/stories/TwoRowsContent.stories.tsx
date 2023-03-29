import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/ExtendableList/ExtendableListItem/Two Rows Content',
  ...storyBookConfig,
}

const { Template, defaultArgs, twoRowsArgs, parameters } = stories

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
  ...twoRowsArgs,
}
Default.parameters = {
  ...parameters,
}

export const AddOnly = Template.bind({})
AddOnly.args = {
  ...defaultArgs,
  canRemove: false,
  ...twoRowsArgs,
}
AddOnly.parameters = {
  ...parameters,
}

export const RemoveOnly = Template.bind({})
RemoveOnly.args = {
  ...defaultArgs,
  canAdd: false,
  ...twoRowsArgs,
}
RemoveOnly.parameters = {
  ...parameters,
}
