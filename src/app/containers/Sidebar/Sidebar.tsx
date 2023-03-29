import { Grid } from '@mui/material'
import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { SvgAppsIcon } from '@common/IconComponents/SvgAppsIcon'
import { SvgChartIcon } from '@common/IconComponents/SvgChartIcon'
import { SvgDocumentsIcon } from '@common/IconComponents/SvgDocumentsIcon'
import { SvgPeoplesIcon } from '@common/IconComponents/SvgPeoplesIcon'
import { SvgSettingsIcon } from '@common/IconComponents/SvgSettingsIcon'
import SurfLogo from '@common/assets/SurfLogo.png'
import {
  height100CSS,
  mt,
  textDecorationNoneCSS,
  width100CSS,
} from '@common/common.styled'

import { PATHS } from '@constants'

import { theme } from '@providers/ThemeProvider/theme'

import { Typography } from '@uiKit'

import {
  gridActiveChildCSS,
  gridLayoutChildCSS,
  gridLayoutChildTextCSS,
  gridLogoCSS,
  iconHeightCSS,
  Styled,
} from './Sidebar.styled'
import { CreateButton } from './components/CreateButton'

const topItems = [
  {
    icon: () => <SvgAppsIcon />,
    title: 'Дашборд',
    url: PATHS.main,
    paths: [PATHS.main],
  },
  {
    icon: () => <SvgDocumentsIcon />,
    title: 'Операции',
    url: PATHS.operations,
    paths: [PATHS.operations],
  },

  {
    icon: () => <SvgChartIcon />,
    title: 'Отчёты',
    url: PATHS.financialReports.pnl,
    paths: [
      PATHS.financialReports.main,
      PATHS.financialReports.pnl,
      PATHS.financialReports.cashFlow,
      PATHS.financialReports.balance,
    ],
  },
  {
    icon: () => <SvgPeoplesIcon />,
    title: 'Персонал',
    url: PATHS.staff.employeesList,
    paths: Object.values(PATHS.staff),
  },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()

  const getIsActive = useCallback(
    (urls: string[]) => urls?.some((el) => el === location?.pathname),
    [location?.pathname],
  )

  const isActiveSettings = getIsActive([PATHS.spotConfiguration])

  return (
    <Styled.Root>
      <Grid
        container
        alignItems="flex-start"
        css={height100CSS}
        direction="column"
        flexWrap="nowrap"
        justifyContent="space-between">
        <Grid item css={width100CSS} xs={12}>
          <Grid item css={gridLogoCSS} xs={12}>
            <img alt="Logo" src={SurfLogo} />
          </Grid>
          <CreateButton />
          <Grid
            container
            alignItems="flex-start"
            direction="column"
            justifyContent="space-between">
            <Grid
              container
              alignItems="flex-start"
              css={mt(17)}
              direction="column"
              justifyContent="flex-start">
              {topItems.map((topItem) => {
                const isActive = getIsActive(topItem.paths)
                return (
                  <Link
                    key={topItem.url}
                    css={[width100CSS, textDecorationNoneCSS]}
                    to={topItem.url}>
                    <Grid
                      container
                      alignItems="center"
                      css={[
                        isActive ? gridActiveChildCSS : gridLayoutChildTextCSS,
                        gridLayoutChildCSS,
                      ]}
                      direction="row"
                      gap={1}
                      justifyContent="center">
                      <Grid item css={iconHeightCSS}>
                        {topItem.icon()}
                      </Grid>
                      <Grid item xs={7.5}>
                        <Typography
                          color={
                            isActive
                              ? theme.colors.black
                              : theme.colors.wetAsphalt
                          }
                          variant={isActive ? 'LabelBold' : 'Input'}>
                          {topItem.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between">
          <Link
            css={[width100CSS, textDecorationNoneCSS]}
            to={PATHS.spotConfiguration}>
            <Grid
              container
              alignItems="center"
              css={[
                isActiveSettings ? gridActiveChildCSS : gridLayoutChildTextCSS,
                gridLayoutChildCSS,
              ]}
              direction="row"
              gap={1}
              justifyContent="center">
              <Grid item css={iconHeightCSS}>
                <SvgSettingsIcon />
              </Grid>
              <Grid item xs={7.5}>
                <Typography
                  color={
                    isActiveSettings
                      ? theme.colors.black
                      : theme.colors.wetAsphalt
                  }
                  variant={isActiveSettings ? 'LabelBold' : 'Input'}>
                  Настройки
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
