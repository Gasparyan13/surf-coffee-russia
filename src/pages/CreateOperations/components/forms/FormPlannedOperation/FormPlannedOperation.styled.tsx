import styled from '@common/styled'

import { operationFormRootCSS } from '../../../constants/styles'

export const Root = styled.form`
  ${operationFormRootCSS};
  position: relative;
`

export const CheckboxContainer = styled.div`
  display: flex;
  min-height: 57px;
  align-items: flex-end;
`
