import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import { Typography } from '../../components/Typography'
import * as Styled from './RadioButton.styled'
import * as T from './RadioButton.types'

export const RadioButton: React.FC<T.Props> = ({
  id,
  label,
  name,
  value,
  disabled,
  error,
  onChange,
  defaultChecked,
}) => {
  return (
    <Styled.Label $disabled={disabled} htmlFor={id}>
      <Typography
        color={disabled ? theme.colors.pencil : theme.colors.black}
        variant="Input">
        {label}
      </Typography>
      <Styled.Input
        className={error ? 'Mui-error' : ''}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
      />
      <Styled.Radio $error={error} />
    </Styled.Label>
  )
}
