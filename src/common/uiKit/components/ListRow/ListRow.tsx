import { Box, Grid } from '@mui/material'
import React from 'react'

import { mr, mt } from '../../../common.styled'
import { Typography } from '../Typography'
import * as Styled from './ListRow.styled'
import { WrapperTextCSS, WrapperTextForRightIconCSS } from './ListRow.styled'
import * as T from './ListRow.types'
import { SELECTED_SELECTOR } from './constants/selectors'

export const ListRow: React.FC<T.Props> = ({
  children,
  text,
  size = 'flex',
  leftIcon,
  rightIcon,
  disabled,
  isSelected,
  ...rest
}) => {
  const justifyContentWrapper = rightIcon ? 'space-between' : 'flex-start'
  const classes = isSelected ? SELECTED_SELECTOR : ''

  return (
    <Styled.MuiMenuItem
      disableRipple
      $disabled={disabled}
      $isSelected={isSelected}
      $selectSize={size}
      {...rest}>
      <Grid
        container
        alignItems="center"
        className={classes}
        flexWrap="nowrap"
        justifyContent={justifyContentWrapper}>
        {leftIcon && (
          <Grid item css={mr(12)}>
            <Box alignItems="center" display="flex" justifyContent="center">
              {leftIcon}
            </Box>
          </Grid>
        )}
        <Grid
          item
          css={rightIcon ? WrapperTextForRightIconCSS : WrapperTextCSS}
          flexGrow={1}>
          {children || (
            <Styled.Text>
              <Typography
                className="list-row-typography"
                css={[mt(1)]}
                variant="PBody">
                {text}
              </Typography>
            </Styled.Text>
          )}
        </Grid>
        {rightIcon && (
          <Grid item>
            <Box alignItems="center" display="flex" justifyContent="center">
              {rightIcon}
            </Box>
          </Grid>
        )}
      </Grid>
    </Styled.MuiMenuItem>
  )
}
