import React from 'react'

import { Styled } from './RequiredField.styled'
import * as T from './RequiredField.types'

export const RequiredField: React.FC<T.Props> = ({ children, disabled }) => {
  return (
    <Styled.Root>
      {!disabled && <Styled.RequiredSymbol>*</Styled.RequiredSymbol>}
      {children}
    </Styled.Root>
  )
}
