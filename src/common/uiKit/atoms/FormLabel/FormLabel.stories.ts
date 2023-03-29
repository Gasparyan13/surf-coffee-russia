import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { FormLabel } from './FormLabel'

export default {
  title: 'Atoms/FormLabel',
  component: FormLabel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof FormLabel>

const Template = makeStoryTemplate(FormLabel)

export const Default = Template.bind({})
Default.args = {
  text: 'label text',
  children: 'content',
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: 'label text',
  children: 'content',
  disabled: true,
}
