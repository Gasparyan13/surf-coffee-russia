import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Button } from './Button'

const Template = makeStoryTemplate(Button)

const commonArgs = {
  children: 'Some text',
  size: 'large',
  variant: 'contained',
} as const

export const Primary = Template.bind({})

Primary.args = {
  ...commonArgs,
  color: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...commonArgs,
  color: 'secondary',
}

export const Context = Template.bind({})
Context.args = {
  ...commonArgs,
  color: 'context',
}

export const Critical = Template.bind({})
Critical.args = {
  ...commonArgs,
  color: 'critical',
}

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Button>
