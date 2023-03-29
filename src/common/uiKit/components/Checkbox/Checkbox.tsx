import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import { Typography } from '../Typography'
import {
  BasicCheckbox,
  Input,
  Label,
  MiddleCheckbox,
  Root,
} from './Checkbox.styled'
import * as T from './Checkbox.types'

export const Checkbox: React.FC<T.Props> = ({
  value,
  variant = 'basic',
  checked,
  onChange,
  name,
  disabled,
  label,
}) => {
  return (
    <Root>
      <Label>
        <Input
          checked={checked}
          disabled={disabled}
          name={name}
          type="checkbox"
          value={value}
          onChange={onChange}
        />
        {variant === 'middle' ? <MiddleCheckbox /> : <BasicCheckbox />}
      </Label>
      {label && (
        <Typography
          color={disabled ? theme.colors.pencil : theme.colors.black}
          variant="Input">
          {label}
        </Typography>
      )}
    </Root>
  )
}
