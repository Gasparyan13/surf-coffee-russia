import { InputAdornment, InputBaseComponentProps } from '@mui/material'
import React, { ElementType } from 'react'
import CurrencyInputField from 'react-currency-input-field'

import { SvgRoubleIcon } from '@common/IconComponents/SvgRoubleIcon'

import { currencyInputCSS } from '@uiKit/components/FieldInputs/CurrencyField/CurrencyField.styled'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { TextField } from '../TextField'
import * as T from './CurrencyField.types'
import { TEST_ID_ICON_CURRENCY } from './constants/testIds'

export const CurrencyField: React.FC<T.Props> = ({
  decimalSeparator = '.',
  decimalsLimit = 2,
  integerLimit = 9,
  groupSeparator = ' ',
  autoComplete = 'off',
  onChange,
  inputProps,
  disabled,
  ...rest
}) => {
  const handleValueChange = (value?: string, name?: string) => {
    let formattedValue = value

    if (formattedValue) {
      const [integerPart, decimalsPart] = formattedValue.split(decimalSeparator)

      if (integerPart.length > integerLimit) {
        formattedValue = `${integerPart.substring(0, integerLimit)}${
          decimalsPart ? `.${decimalsPart}` : ''
        }`
      }
    }

    onChange?.(formattedValue, name)
  }

  return (
    <TextField
      css={currencyInputCSS}
      disabled={disabled}
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            {...createTestId(TEST_ID_ICON_CURRENCY)}>
            <SvgRoubleIcon />
          </InputAdornment>
        ),
        inputComponent:
          CurrencyInputField as ElementType<InputBaseComponentProps>,
        inputProps: {
          ...inputProps,
          autoComplete,
          decimalsLimit,
          groupSeparator,
          decimalSeparator,
          onValueChange: handleValueChange,
        },
      }}
    />
  )
}
