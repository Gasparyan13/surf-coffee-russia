import Grid from '@mui/material/Grid'
import React from 'react'

import { SvgWarningIcon } from '@common/IconComponents/SvgWarningIcon'
import { MuiTooltip } from '@common/newUi/MuiTooltip'

import { theme } from '@providers/ThemeProvider/theme'

import { Typography } from '@uiKit'

import * as Styled from './InfoTooltip.styled'
import * as T from './InfoTooltip.types'

export const InfoTooltip: React.FC<T.Props> = ({
  title,
  isFirstLevel,
  items,
}) => {
  const offset = isFirstLevel ? [0, -15] : [0, -5]

  return (
    <MuiTooltip
      disableInteractive
      PopperProps={{ modifiers: [{ name: 'offset', options: { offset } }] }}
      componentsProps={{
        tooltip: {
          sx: { maxWidth: 355 },
        },
      }}
      title={
        <Grid container>
          <Grid item xs={12}>
            <Typography css={Styled.tooltipTitleCSS} variant="Small">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Styled.EmptyRow />
          </Grid>
          <Grid item xs={12}>
            <Typography css={Styled.tooltipContentCSS} variant="Small">
              Сумма формируется с учетом разности по статьям:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Styled.EmptyRow />
          </Grid>
          {items?.map((item) => (
            <Grid key={item.name} item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography css={Styled.tooltipContentCSS} variant="Small">
                    – {item.name}
                  </Typography>
                  <Grid item xs={12}>
                    <Styled.EmptyRow />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      }>
      <Styled.InfoIcon
        $color={theme.colors.pencil}
        $hoverColor={theme.colors.white}
        $isFirstLevel={isFirstLevel}>
        <SvgWarningIcon />
      </Styled.InfoIcon>
    </MuiTooltip>
  )
}
