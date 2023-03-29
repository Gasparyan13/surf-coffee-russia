import { Grid } from '@mui/material'
import React from 'react'

import { SvgDocIcon } from '@common/IconComponents/SvgDocIcon'
import { centerTextCSS, displayBlockCSS, mb } from '@common/common.styled'

import { Typography } from '@uiKit'

import { statusModalCSS, svgDocStyleCSS } from './EmptyContractors.styled'

export const EmptyContractors: React.FC = () => {
  return (
    <Grid container textAlign="center">
      <Grid item xs={12}>
        <Grid item css={svgDocStyleCSS}>
          <SvgDocIcon />
        </Grid>
        <Grid item xs={12}>
          <Typography css={statusModalCSS} variant="H4">
            Контрагентов нет
          </Typography>
          <Typography
            css={[centerTextCSS, displayBlockCSS, mb(16)]}
            variant="PBody">
            Добавьте контрагента, чтобы создать операцию покупки или продажи
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
