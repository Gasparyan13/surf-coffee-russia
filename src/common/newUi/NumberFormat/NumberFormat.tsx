import React from 'react'
import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from 'react-number-format'

type Props = NumericFormatProps<InputAttributes>

export const NumberFormat: React.FC<Props> = (props) => (
  <NumericFormat
    decimalScale={2}
    displayType="text"
    thousandSeparator=" "
    {...props}
  />
)
