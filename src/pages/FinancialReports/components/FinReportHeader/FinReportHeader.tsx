import { Grid, GridSize } from '@mui/material'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { mr } from '@common/common.styled'

import { PATHS, YEAR_MONTH_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import { useLocationQuery } from '@hooks'

import { theme } from '@providers/ThemeProvider/theme'

import { Button, SelectSingle, ToggleButtonGroup, Typography } from '@uiKit'

import {
  ClosePeriodActionDto,
  useLazyGetAnalyticsBalanceSheetByEnterpriseIdQuery,
} from '@rtkApi/modules/__generated__/analytics'
import { usePostAnalyticsBalanceSheetActionsClosePeriodMutation } from '@rtkApi/modules/enhancements/analytics'

import { useAppSelector } from '@store/rootConfig'

import { useFinancialReportCtx } from '../../containers/FinancialReportCtx'
import { getFinancialReportReqArgs } from '../../redux/financialReport/selectors'
import * as Styled from './FinReportHeader.styled'
import { YearMonthUrlDatePicker } from './components/YearMonthUrlDatePicker'
import { ERROR_MESSAGE_CLOSE_PERIOD } from './constants/messages/error'
import { SUCCESS_MESSAGE_CLOSE_PERIOD } from './constants/messages/success'
import { yearOptions } from './constants/options'
import { options } from './constants/tabs'
import { getTabIndexByPathname, getTabPathnameByIndex } from './utils/getters'

export const FinReportHeader: React.FC = () => {
  const { pathname } = useLocation()
  const { get } = useLocationQuery()
  const navigate = useNavigate()
  const { enterpriseId, year, handleChangeYear, message, handleShowMessage } =
    useFinancialReportCtx()
  const lastReportTableArgs = useAppSelector(getFinancialReportReqArgs)

  const [reportTab, setReportTab] = useState(getTabIndexByPathname(pathname))

  const month = get('month')

  const periodStartDateString = `${year}-${month}-01`
  const isCurrentMonth = DateHelper.isCurrentMonth(periodStartDateString)
  const isPrevMonth = DateHelper.isPreviousMonth(periodStartDateString)
  const shouldShowClosePeriodButton = isCurrentMonth || isPrevMonth

  const [apiClosePeriodRequest, { isLoading: isLoadingClosePeriod }] =
    usePostAnalyticsBalanceSheetActionsClosePeriodMutation()
  const [apiBalanceSheetRequest] =
    useLazyGetAnalyticsBalanceSheetByEnterpriseIdQuery()

  const handleChangeTab = useCallback(
    (_: React.SyntheticEvent<Element, Event>, newTabIndex: number) => {
      setReportTab(newTabIndex)
      handleShowMessage(null)
      navigate(getTabPathnameByIndex(newTabIndex))
    },
    [navigate, handleShowMessage],
  )

  const handleClosePeriod = useCallback(async () => {
    try {
      const period = DateHelper.toFormat(
        `${year}-${month}-01`,
        YEAR_MONTH_FORMAT,
      ) as ClosePeriodActionDto['period']

      await apiClosePeriodRequest({
        closePeriodActionDto: {
          enterpriseId: enterpriseId!,
          period,
        },
      }).unwrap()

      if (lastReportTableArgs) apiBalanceSheetRequest(lastReportTableArgs)

      toast.success(SUCCESS_MESSAGE_CLOSE_PERIOD)
    } catch (error) {
      toast.error(ERROR_MESSAGE_CLOSE_PERIOD)
    }
  }, [
    apiBalanceSheetRequest,
    apiClosePeriodRequest,
    enterpriseId,
    lastReportTableArgs,
    month,
    year,
  ])

  const isBalancePage = pathname === PATHS.financialReports.balance

  useLayoutEffect(() => {
    const newTab = getTabIndexByPathname(pathname)

    if (newTab !== reportTab) setReportTab(newTab)
  }, [pathname])

  return (
    <Styled.Root>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={6.25}>
          <Grid
            container
            alignItems="center"
            flexWrap="nowrap"
            justifyContent="flex-start">
            <Grid item>
              <ToggleButtonGroup
                currentValue={reportTab}
                tabs={options}
                onChange={handleChangeTab}
              />
            </Grid>
            {message && (
              <Grid item margin="0 16px">
                <Typography
                  color={
                    message.type === 'info'
                      ? theme.colors.wetAsphalt
                      : theme.colors.critical
                  }
                  variant="PBody">
                  {message.text}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="flex-end"
          xs={isBalancePage ? 5.75 : (2.56 as GridSize)}>
          {isBalancePage ? (
            <>
              {shouldShowClosePeriodButton && (
                <Button
                  color="primary"
                  css={mr(40)}
                  disabled={isLoadingClosePeriod}
                  size="large"
                  variant="contained"
                  onClick={handleClosePeriod}>
                  Закрыть период
                </Button>
              )}
              <YearMonthUrlDatePicker />
            </>
          ) : (
            <SelectSingle
              menus={yearOptions}
              value={year}
              onChange={handleChangeYear}
            />
          )}
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
