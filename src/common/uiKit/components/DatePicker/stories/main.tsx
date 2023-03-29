import { ComponentMeta } from '@storybook/react'
import React, { useEffect, useState } from 'react'

import { DEFAULT_DATE_WITH_NAME_FORMAT, MONTH_YEAR_FORMAT } from '@constants'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { DatePicker } from '../DatePicker'
import * as T from '../DatePicker.types'
import { DATE_PICKER_YEAR_FORMAT } from '../constants/format'

const WithState: React.FC<T.Props> = ({
  placeholder,
  labelText,
  views,
  error,
  size,
  disabled,
  disableFuture,
  ...rest
}) => {
  const [value, setValue] = useState<Date | null>(new Date())

  const onChange = (event: Date | null) => {
    setValue(event)
  }

  useEffect(() => {
    if (placeholder) setValue(null)
  }, [])

  if (size === 'flex' || size === 'auto')
    return (
      <div style={{ width: 500, justifyContent: 'center' }}>
        <DatePicker
          {...rest}
          disableFuture={disableFuture}
          disabled={disabled}
          error={error}
          labelText={labelText}
          placeholder={placeholder}
          size={size}
          value={value}
          views={views}
          onChange={onChange}
        />
      </div>
    )

  return (
    <DatePicker
      {...rest}
      disableFuture={disableFuture}
      disabled={disabled}
      error={error}
      labelText={labelText}
      placeholder={placeholder}
      size={size}
      value={value}
      views={views}
      onChange={onChange}
    />
  )
}

export const Template = makeStoryTemplate(WithState)

export const storyBookConfig = {
  component: DatePicker,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof DatePicker>

const commonArgs: Partial<T.Props> = {
  size: 'flex',
} as const

const placeholderArgs: Partial<T.Props> = {
  placeholder: 'Выберете дату',
}

const labelText: Partial<T.Props> = {
  labelText: 'Дата транзакции',
}

const viewsMonthYear: Partial<T.Props> = {
  inputFormat: MONTH_YEAR_FORMAT,
  views: ['month', 'year'],
}

const viewsYearMonth: Partial<T.Props> = {
  inputFormat: MONTH_YEAR_FORMAT,
  views: ['year', 'month'],
}

const viewsDayMonthYear: Partial<T.Props> = {
  inputFormat: DEFAULT_DATE_WITH_NAME_FORMAT,
  views: ['day', 'month', 'year'],
}

const viewsYearMonthDay: Partial<T.Props> = {
  inputFormat: DEFAULT_DATE_WITH_NAME_FORMAT,
  views: ['year', 'month', 'day'],
}

const viewsMonthDay: Partial<T.Props> = {
  inputFormat: DEFAULT_DATE_WITH_NAME_FORMAT,
  views: ['month', 'day'],
}

const viewsDayMonth: Partial<T.Props> = {
  inputFormat: DEFAULT_DATE_WITH_NAME_FORMAT,
  views: ['day', 'month'],
}

const viewsDay: Partial<T.Props> = {
  inputFormat: DEFAULT_DATE_WITH_NAME_FORMAT,
  views: ['day'],
}

const viewsMonth: Partial<T.Props> = {
  inputFormat: MONTH_YEAR_FORMAT,
  views: ['month'],
}

const viewsYear: Partial<T.Props> = {
  inputFormat: DATE_PICKER_YEAR_FORMAT,
  views: ['year'],
}

const errorArgs: Partial<T.Props> = {
  error: true,
}

const disabledArgs: Partial<T.Props> = {
  disabled: true,
}

const disabledFutureDateArgs: Partial<T.Props> = {
  disableFuture: true,
}

export const stories = {
  Template,
  commonArgs,
  placeholderArgs,
  labelText,
  errorArgs,
  disabledArgs,
  disabledFutureDateArgs,
  viewsMonthYear,
  viewsYearMonth,
  viewsDayMonthYear,
  viewsYearMonthDay,
  viewsMonthDay,
  viewsDayMonth,
  viewsDay,
  viewsMonth,
  viewsYear,
}
