import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { ShiftCard } from './ShiftCard'
import * as T from './ShiftCard.types'

export default {
  title: 'Local Components/ShiftCard',
  component: ShiftCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof ShiftCard>

const Template = makeStoryTemplate(ShiftCard)

const commonArgs: Partial<T.Props> = {
  planHours: 8,
  factHours: 10,
  isOnDuty: true,
  workerName: 'Иван Иванов',
  role: 'barista',
}

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}

export const Short = Template.bind({})
Short.args = {
  ...commonArgs,
  width: 72,
  height: 116,
  isOnDuty: false,
  factHours: undefined,
}

export const Long = Template.bind({})
Long.args = {
  ...commonArgs,
  height: 450,
}

export const SmallWidth = Template.bind({})
SmallWidth.args = {
  ...commonArgs,
  width: 72,
  factHours: undefined,
  height: 450,
}

export const WithoutFact = Template.bind({})
WithoutFact.args = {
  ...commonArgs,
  factHours: undefined,
}
