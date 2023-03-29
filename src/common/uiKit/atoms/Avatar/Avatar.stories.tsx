import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Avatar } from './Avatar'

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Avatar>

const Template = makeStoryTemplate(Avatar)

const commonArgs = {
  children: 'A',
  size: 'large',
  variant: 'circular',
} as const

export const Primary = Template.bind({})
Primary.args = {
  ...commonArgs,
  color: 'primary',
}

export const Error = Template.bind({})
Error.args = {
  ...commonArgs,
  color: 'error',
}
