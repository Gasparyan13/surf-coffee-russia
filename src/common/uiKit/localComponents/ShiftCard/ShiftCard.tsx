import { Grid } from '@mui/material'
import React, { memo } from 'react'

import { SvgKeyIcon } from '@common/IconComponents/SvgKeyIcon'
import { mb, ml, mt } from '@common/common.styled'
import { Typography } from '@common/uiKit'

import { ROLES_RU } from '@constants'

import { theme } from '@providers/ThemeProvider/theme'

import { Avatar } from '@uiKit/atoms'

import { Tooltip } from '../../components/Tooltip'
import * as Styled from './ShiftCard.styled'
import { tooltipCSS } from './ShiftCard.styled'
import * as T from './ShiftCard.types'

const AVATAR_SIZE = 24

export const ShiftCard: React.FC<T.Props> = memo(
  ({
    factHours,
    planHours,
    workerName,
    isOnDuty,
    width,
    height,
    role,
    variant = 'normal',
  }) => {
    const isShortCard = variant === 'short'
    const avatarSizes = {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
    }

    return (
      <Tooltip
        followCursor
        css={tooltipCSS}
        placement="above-left"
        title={
          <Grid
            container
            alignItems="center"
            flexDirection="column"
            justifyContent="center">
            <Grid item>
              <Typography color={theme.colors.white} variant="Small">
                {workerName}
              </Typography>
            </Grid>
            {isOnDuty && (
              <Grid item css={mt(8)}>
                <SvgKeyIcon />
              </Grid>
            )}
            <Grid item css={mt(8)}>
              <Typography color={theme.colors.white} variant="Small">
                {ROLES_RU[role]}
              </Typography>
            </Grid>
          </Grid>
        }>
        <Styled.Root $height={height} $width={width}>
          <Grid container>
            <Grid item css={mb(8)} xs={12}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <Avatar sx={avatarSizes}>
                    <Typography color={theme.colors.white} variant="LabelBold">
                      {planHours}
                    </Typography>
                  </Avatar>
                </Grid>
                {typeof factHours === 'number' && (
                  <Grid item css={ml(4)}>
                    <Avatar color="error" sx={avatarSizes}>
                      <Typography
                        color={theme.colors.white}
                        variant="LabelBold">
                        {factHours}
                      </Typography>
                    </Avatar>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {!isShortCard && (
              <>
                <Grid item css={mb(12)} xs={12}>
                  <Grid container justifyContent="center">
                    <Grid item css={Styled.workerNameWrapperCSS}>
                      <Typography
                        color={theme.colors.white}
                        css={Styled.titleCSS}
                        variant="Small">
                        {workerName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {isOnDuty && (
                  <Grid item css={mb(12)} xs={12}>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <SvgKeyIcon />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography color={theme.colors.white} variant="Small">
                        {ROLES_RU[role]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Styled.Root>
      </Tooltip>
    )
  },
)
