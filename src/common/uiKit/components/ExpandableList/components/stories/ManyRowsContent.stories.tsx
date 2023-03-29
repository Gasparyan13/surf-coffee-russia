import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/ExtendableList/ExtendableListItem/Many Rows Content',
  ...storyBookConfig,
}

const { Template, defaultArgs, manyRowsArgs, parameters } = stories

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
  ...manyRowsArgs,
}
Default.parameters = {
  ...parameters,
}

export const AddOnly = Template.bind({})
AddOnly.args = {
  ...defaultArgs,
  canRemove: false,
  ...manyRowsArgs,
}
AddOnly.parameters = {
  ...parameters,
}

export const RemoveOnly = Template.bind({})
RemoveOnly.args = {
  ...defaultArgs,
  canAdd: false,
  ...manyRowsArgs,
}
RemoveOnly.parameters = {
  ...parameters,
}
