import { ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { ToggleButtonGroup } from '@uiKit'

import * as T from '../ToggleButtonGroup.types'

const WithState: React.FC<T.Props> = ({ color, fullWidth, ...rest }) => {
  const [tabsValue, setTabsValue] = useState(0)
  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue)
  }

  if (fullWidth) {
    return (
      <div style={{ width: 392, justifyContent: 'center' }}>
        <ToggleButtonGroup
          color={color}
          fullWidth={fullWidth}
          {...rest}
          currentValue={Number(tabsValue)}
          onChange={handleTabsChange}
        />
      </div>
    )
  }

  return (
    <ToggleButtonGroup
      color={color}
      fullWidth={fullWidth}
      {...rest}
      currentValue={Number(tabsValue)}
      onChange={handleTabsChange}
    />
  )
}

export const storyBookConfig = {
  component: ToggleButtonGroup,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof ToggleButtonGroup>

export const Template = makeStoryTemplate(WithState)

const tabs = [
  { label: 'График работы' },
  { label: 'Табель рабочего времени' },
  { label: 'Список сотрудников' },
]

const manyTabs = [
  { label: 'Some Text 1' },
  { label: 'Some Text 2' },
  { label: 'Some Text 3' },
  { label: 'Some Text 4' },
  { label: 'Some Text 5' },
  { label: 'Some Text 6' },
  { label: 'Some Text 7' },
  { label: 'Some Text 8' },
]

const fullWidthTabs = [
  { label: 'Физическое лицо' },
  { label: 'Юридическое лицо' },
]

export const primary: Partial<T.Props> = {
  color: 'primary',
  tabs,
}

export const primaryDisabled: Partial<T.Props> = {
  color: 'primary',
  disabled: true,
  tabs,
}

export const primaryLong: Partial<T.Props> = {
  color: 'primary',
  tabs: manyTabs,
}

export const primaryFullWidth: Partial<T.Props> = {
  color: 'primary',
  fullWidth: true,
  tabs: fullWidthTabs,
}

export const secondary: Partial<T.Props> = {
  color: 'secondary',
  tabs,
}

export const secondaryDisabled: Partial<T.Props> = {
  color: 'secondary',
  disabled: true,
  tabs,
}

export const secondaryLong: Partial<T.Props> = {
  color: 'secondary',
  tabs: manyTabs,
}

export const secondaryFullWidth: Partial<T.Props> = {
  color: 'secondary',
  fullWidth: true,
  tabs: fullWidthTabs,
}

export const stories = {
  Template,
  primary,
  primaryDisabled,
  primaryLong,
  primaryFullWidth,
  secondary,
  secondaryDisabled,
  secondaryLong,
  secondaryFullWidth,
}
