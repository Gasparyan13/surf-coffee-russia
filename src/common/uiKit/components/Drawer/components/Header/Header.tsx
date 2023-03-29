import React from 'react'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'
import { SvgCloseIcon } from '@common/IconComponents/SvgCloseIcon'
import { HEADER_MONTH_YEAR_FORMAT } from '@common/constants/dateFormat'
import { DateHelper } from '@common/helpers'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { Typography } from '../../../Typography'
import * as Styled from './Header.styled'
import * as T from './Header.types'
import { TEST_ID_CLOSE } from './constants/testIds'

export const Header: React.FC<T.Props> = ({
  title,
  date,
  backButtonProps,
  closeButtonProps,
}) => {
  return (
    <Styled.Header>
      {backButtonProps && (
        <Styled.BackButton variant="PBody" onClick={backButtonProps.onClick}>
          <SvgArrowIcon direction="right" />
          Назад
        </Styled.BackButton>
      )}
      <Styled.HeaderRow>
        <div>
          {date && (
            <Typography css={Styled.headerDateCSS} variant="PBody">
              {DateHelper.toLocaleFormat(
                DateHelper.toDate(date),
                HEADER_MONTH_YEAR_FORMAT,
              )}
            </Typography>
          )}
          <Typography variant="H2">{title}</Typography>
        </div>
        {closeButtonProps && (
          <Styled.CloseIcon
            {...createTestId(TEST_ID_CLOSE)}
            $addMargin={!!date}
            onClick={closeButtonProps.onClick}>
            <SvgCloseIcon />
          </Styled.CloseIcon>
        )}
      </Styled.HeaderRow>
    </Styled.Header>
  )
}
