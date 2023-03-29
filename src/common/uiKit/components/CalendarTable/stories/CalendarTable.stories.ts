import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { CalendarTable } from '../CalendarTable'
import { DailySalaryType } from '../CalendarTable.types'

const dailyShiftData: DailySalaryType[] | undefined = [
  { id: 238, date: '2022-09-03', hours: '7.50', money: '7500.00' },
  { id: 239, date: '2022-09-02', hours: '8.50', money: '8500.00' },
  { id: 240, date: '2022-09-01', hours: '9.50', money: '9500.00' },
]

const dailyShiftEmptyData: DailySalaryType[] | undefined = []

export default {
  title: 'Components/CalendarTable',
  component: CalendarTable,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof CalendarTable>

const Template = makeStoryTemplate(CalendarTable)

export const Salaries = Template.bind({})
Salaries.args = {
  yearMonth: '2022-09',
  dailyShiftData,
}

export const Default = Template.bind({})
Default.args = {
  yearMonth: '2022-09',
  dailyShiftData: dailyShiftEmptyData,
}
