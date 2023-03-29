import styled from '@common/styled'

import { FONT_WEIGHT_BOLD } from '@uiKit/constants/fontWeight'

import { Typography } from '../../../Typography'

export const Content = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const ReceivedDateText = styled(Typography)`
  font-size: 11px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.pencil};
`

export const TooltipBoldText = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${FONT_WEIGHT_BOLD};
`

export const TooltipText = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
`

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const TooltipRow = styled.div`
  display: flex;
  flex-direction: column;
`
