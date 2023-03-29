import styled from '@common/styled'

import { Typography } from '@uiKit'
import { FONT_WEIGHT_BOLD } from '@uiKit/constants/fontWeight'

import { WIDGET_MARGIN, WIDGET_VERTICAL_MARGINS } from './constants/styles'

export const Root = styled.div`
  width: 560px;
  height: 100%;
  max-height: 784px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 24px;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.asphaltSuperLight};
  border-radius: 16px;
`

export const Widget = styled.div`
  width: calc(100% - ${WIDGET_VERTICAL_MARGINS}px);
  margin: 0 ${WIDGET_MARGIN}px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.grey};
  border-radius: 16px;
`

export const WidgetText = styled(Typography)`
  font-weight: ${FONT_WEIGHT_BOLD};
`
