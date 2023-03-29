import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { DaysType } from '../../components/CalendarTable/CalendarTable.types'
import { CalendarCell } from './CalendarCell'

const day: DaysType = {
  id: 1,
  dayNumber: 1,
  hours: '9.50',
  money: '9500.00',
}

const emptyDay = {
  dayNumber: 1,
  id: 1,
}

export default {
  title: 'Atoms/CalendarTable/CalendarCell',
  component: CalendarCell,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof CalendarCell>

const Template = makeStoryTemplate(CalendarCell)

export const Salaries = Template.bind({})
Salaries.args = {
  day,
  index: 1,
}
export const Default = Template.bind({})
Default.args = {
  day: emptyDay,
  index: 2,
}
