import { Grid, Popover, Typography } from '@mui/material'
import React from 'react'

import { SvgCloseIcon } from '../../IconComponents/SvgCloseIcon'
import * as T from './MuiPopover.types'
import { Styled, titleStyleCSS } from './PopoverShift.styled'

export const MuiPopover: React.FC<T.Props> = ({
  onClose,
  title,
  open,
  children,
  anchorEl,
}) => (
  <Popover
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    onClose={onClose}>
    <Styled.Root>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={10}>
          <Typography css={titleStyleCSS}>{title}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Styled.CloseButton
            aria-label="close"
            color="primary"
            onClick={onClose}>
            <SvgCloseIcon />
          </Styled.CloseButton>
        </Grid>
      </Grid>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Root>
  </Popover>
)
