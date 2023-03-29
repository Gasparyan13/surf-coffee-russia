import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { HelperText } from './HelperText'

export default {
  title: 'Atoms/HelperText',
  component: HelperText,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof HelperText>

const Template = makeStoryTemplate(HelperText)

export const Default = Template.bind({})
Default.args = {
  children: 'helper text',
}

export const Error = Template.bind({})
Error.args = {
  children: 'helper text',
  error: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'helper text',
  disabled: true,
}
