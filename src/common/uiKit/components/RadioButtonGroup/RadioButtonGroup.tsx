import React from 'react'

import { mt } from '@common/common.styled'

import { theme } from '@providers/ThemeProvider/theme'

import { RadioButton } from '../../atoms'
import { Typography } from '../Typography'
import * as Styled from './RadioButtonGroup.styled'
import * as T from './RadioButtonGroup.types'

export const RadioButtonGroup: React.FC<T.Props> = ({
  options,
  label: labelRadioButtonGroup,
  error,
  disabled,
  variant = 'horizontal',
  defaultValue,
  name,
  onChange,
}) => {
  return (
    <Styled.Root>
      {labelRadioButtonGroup && (
        <Typography color={theme.colors.wetAsphalt} variant="LabelBold">
          {labelRadioButtonGroup}
        </Typography>
      )}
      <Styled.Fieldset $variant={variant} name={name}>
        {options.map(({ id, label, value }) => (
          <RadioButton
            key={id}
            defaultChecked={defaultValue === id}
            disabled={disabled}
            error={!!error}
            id={id}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
          />
        ))}
      </Styled.Fieldset>
      {error && (
        <Typography color={theme.colors.critical} css={mt(8)} variant="Small">
          {error}
        </Typography>
      )}
    </Styled.Root>
  )
}
