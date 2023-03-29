import styled from '@common/styled'

import * as T from './RadioButtonGroup.types'

export const Root = styled.div`
  display: block;
`

export const Fieldset = styled.fieldset<{ $variant: T.Props['variant'] }>`
  display: flex;
  flex-flow: ${({ $variant }) =>
    $variant === 'horizontal' ? 'row' : 'column'};
  margin: 9px 0 0;
  padding: 0;
  border: 0;
  gap: ${({ $variant }) => ($variant === 'horizontal' ? '24px' : '10px')};
`
