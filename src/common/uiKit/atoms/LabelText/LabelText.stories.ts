import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { LabelText } from './LabelText'

export default {
  title: 'Atoms/LabelText',
  component: LabelText,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof LabelText>

const Template = makeStoryTemplate(LabelText)

export const Default = Template.bind({})
Default.args = {
  children: 'label text',
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'label text',
  disabled: true,
}
