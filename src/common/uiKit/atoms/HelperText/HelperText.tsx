import React from 'react'

import * as Styled from './HelperText.styled'
import * as T from './HelperText.types'

export const HelperText: React.FC<T.Props> = ({ error, disabled, ...rest }) => (
  <Styled.HelperText
    {...rest}
    $disabled={disabled}
    $error={error}
    variant="Small"
  />
)
