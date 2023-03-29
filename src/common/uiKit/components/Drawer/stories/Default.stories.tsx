import { storyBookConfig, stories } from './main'

export default {
  title: 'Templates/Drawer',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  footerDefaultArgs,
  headerBackButtonArgs,
  headerCloseButtonArgs,
  footerSubmitButtonOnlyArgs,
  footerCancelButtonOnlyArgs,
  footerCustomContentOnlyArgs,
} = stories

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
}

export const WithBackButton = Template.bind({})
WithBackButton.args = {
  ...defaultArgs,
  ...headerBackButtonArgs,
}

export const WithCloseButton = Template.bind({})
WithCloseButton.args = {
  ...defaultArgs,
  ...headerCloseButtonArgs,
}

export const DefaultFooter = Template.bind({})
DefaultFooter.args = {
  ...defaultArgs,
  ...footerDefaultArgs,
}

export const OnlySubmit = Template.bind({})
OnlySubmit.args = {
  ...defaultArgs,
  ...footerSubmitButtonOnlyArgs,
}

export const OnlyCancel = Template.bind({})
OnlyCancel.args = {
  ...defaultArgs,
  ...footerCancelButtonOnlyArgs,
}

export const CustomFooter = Template.bind({})
CustomFooter.args = {
  ...defaultArgs,
  ...footerCustomContentOnlyArgs,
}
