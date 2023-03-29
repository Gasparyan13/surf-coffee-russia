import { Grid } from '@mui/material'
import React from 'react'
import { useOutletContext } from 'react-router'

import { SvgDocIcon } from '@common/IconComponents/SvgDocIcon'
import {
  centerTextCSS,
  displayBlockCSS,
  mt,
  width100CSS,
} from '@common/common.styled'

import { useDimensions } from '@hooks'

import { Button, Typography } from '@uiKit'

import { EmployeesListTable } from '../EmployeesListTable'
import * as Styled from './EmployeesListLayout.styled'
import {
  containerEmployeeAbsentCSS,
  svgDocUnionCSS,
} from './EmployeesListLayout.styled'
import * as T from './EmployeesListLayout.types'

export const EmployeesListLayout: React.FC = () => {
  const [ref, { height }] = useDimensions()
  const context = useOutletContext<T.Props>()

  return (
    <Styled.Root ref={ref}>
      {!context.workersData?.length ? (
        <Grid container css={mt(148)}>
          <Grid item css={containerEmployeeAbsentCSS} xs={4.06}>
            <Grid item css={svgDocUnionCSS} xs={12}>
              <SvgDocIcon />
            </Grid>
            <Grid item xs={12}>
              <Typography css={[centerTextCSS, mt(16)]} variant="H4">
                Нет сотрудников
              </Typography>
              <Typography
                css={[centerTextCSS, mt(16), displayBlockCSS]}
                variant="PBody">
                Пригласите сотрудников, чтобы сформировать команду для работы
                вашего спота
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                css={[width100CSS, mt(28)]}
                variant="contained"
                onClick={context.onOpenModal}>
                Добавить нового сотрудника
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <EmployeesListTable
          maxHeight={height}
          workersData={context.workersData}
        />
      )}
    </Styled.Root>
  )
}
