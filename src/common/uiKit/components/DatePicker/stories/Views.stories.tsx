import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/DatePicker/Views',
  ...storyBookConfig,
}

const {
  Template,
  commonArgs,
  viewsMonthYear,
  viewsYearMonth,
  viewsDayMonthYear,
  viewsYearMonthDay,
  viewsMonthDay,
  viewsDayMonth,
  viewsDay,
  viewsMonth,
  viewsYear,
} = stories

export const DayMonthYear = Template.bind({})
DayMonthYear.args = {
  ...commonArgs,
  ...viewsDayMonthYear,
}

export const YearMonthDay = Template.bind({})
YearMonthDay.args = {
  ...commonArgs,
  ...viewsYearMonthDay,
}

export const MonthDay = Template.bind({})
MonthDay.args = {
  ...commonArgs,
  ...viewsMonthDay,
}

export const DayMonth = Template.bind({})
DayMonth.args = {
  ...commonArgs,
  ...viewsDayMonth,
}

export const MonthYear = Template.bind({})
MonthYear.args = {
  ...commonArgs,
  ...viewsMonthYear,
}

export const YearMonth = Template.bind({})
YearMonth.args = {
  ...commonArgs,
  ...viewsYearMonth,
}

export const Day = Template.bind({})
Day.args = {
  ...commonArgs,
  ...viewsDay,
}

export const Month = Template.bind({})
Month.args = {
  ...commonArgs,
  ...viewsMonth,
}

export const Year = Template.bind({})
Year.args = {
  ...commonArgs,
  ...viewsYear,
}
