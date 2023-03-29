import { Dialog, Grid, IconButton } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'

import { SvgCloseIcon } from '../../IconComponents/SvgCloseIcon'
import { Styled, titleDialogCSS } from './MuiModal.styled'

type Props = React.PropsWithChildren & {
  onClose: () => void
  onBack?: () => void
  open: boolean
  title: string
  iconBack: boolean
}

export const MuiModal: React.FC<Props> = ({
  open,
  onClose,
  title,
  onBack,
  children,
  iconBack,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Styled.Root>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          textAlign="center">
          <Grid item xs={1}>
            <IconButton onClick={onBack}>
              {iconBack && <SvgArrowIcon direction="right" />}
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <DialogTitle css={titleDialogCSS}>{title}</DialogTitle>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={onClose}>
              <SvgCloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Styled.Root>
      {children && <Styled.Content> {children}</Styled.Content>}
    </Dialog>
  )
}
