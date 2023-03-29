import { Tabs } from '@mui/material'
import React from 'react'

import * as Styled from './ToggleButtonGroup.styled'
import * as T from './ToggleButtonGroup.types'
import { getTabIndicatorSXProps, getTabsSXProps } from './utils/getters'

export const ToggleButtonGroup: React.FC<T.Props> = ({
  tabs,
  color = 'primary',
  currentValue,
  onChange,
  disabled,
  fullWidth,
  ...rest
}) => (
  <Tabs
    TabIndicatorProps={{ sx: getTabIndicatorSXProps(color) }}
    css={Styled.tabsCSS}
    indicatorColor={color}
    sx={getTabsSXProps(fullWidth)}
    value={currentValue}
    onChange={disabled ? undefined : onChange}
    {...rest}>
    {tabs.map(({ value, label, ...tabRest }, index) => {
      const isCurrentTab = (value || index) === currentValue

      return (
        <Styled.MuiTabText
          key={label as string}
          $isCurrentTab={isCurrentTab}
          $isDisabled={disabled}
          className={`MuiButtonBase--${color}`}
          disabled={!isCurrentTab && disabled}
          label={label}
          value={value}
          {...tabRest}
        />
      )
    })}
  </Tabs>
)
