import styled from '@common/styled'
import { BASIC_INDENT } from '@common/styled/variables'

import { APP_ROOT_LAYOUT_PADDING } from '@pages/Dashboard/components/Layout/constants/styles'

import { OPERATIONS_HEADER_HEIGHT } from '../../constants/styles'

export const Root = styled.div`
  height: calc(100vh - ${APP_ROOT_LAYOUT_PADDING}px);
`

export const Content = styled.div`
  height: calc(100% - ${OPERATIONS_HEADER_HEIGHT});
  padding-bottom: ${BASIC_INDENT};
`
