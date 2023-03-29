import React from 'react'

import { DateHelper } from '@common/helpers'

import { Typography } from '../../../Typography'
import { TableCellWithTooltip } from '../TableCellWithTooltip'
import * as Styled from './TableCellPaymentDate.styled'
import * as T from './TableCellPaymentDate.types'
import { getPaymentDateTooltipText } from './utils/getters'

export const TableCellPaymentDate: React.FC<T.Props> = ({
  paymentDate,
  receivedDate,
  operationType,
  ...restCellProps
}) => (
  <TableCellWithTooltip
    {...restCellProps}
    tooltipTitle={
      receivedDate ? (
        <Styled.TooltipContent>
          <Styled.TooltipRow>
            <Styled.TooltipBoldText variant="PBody">
              {getPaymentDateTooltipText(operationType)}:
            </Styled.TooltipBoldText>
            <Styled.TooltipText variant="Small">
              {DateHelper.formatServerDateToClient(paymentDate)}
            </Styled.TooltipText>
          </Styled.TooltipRow>
          <Styled.TooltipRow>
            <Styled.TooltipBoldText variant="PBody">
              Дата начисления:
            </Styled.TooltipBoldText>
            <Styled.TooltipText variant="Small">
              {DateHelper.formatServerDateToClient(receivedDate)}
            </Styled.TooltipText>
          </Styled.TooltipRow>
        </Styled.TooltipContent>
      ) : (
        <Styled.TooltipText variant="Small">
          {getPaymentDateTooltipText(operationType)}
        </Styled.TooltipText>
      )
    }>
    <Styled.Content>
      <Typography variant="PBody">
        {DateHelper.formatServerDateToClient(paymentDate)}
      </Typography>
      {receivedDate && (
        <Styled.ReceivedDateText variant="PBody">
          {DateHelper.formatServerDateToClient(receivedDate)}
        </Styled.ReceivedDateText>
      )}
    </Styled.Content>
  </TableCellWithTooltip>
)
