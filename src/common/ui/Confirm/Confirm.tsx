import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

import { Styled } from './Confirm.styled'
import * as T from './Confirm.types'

const SPACING = 2

export const Confirm: React.FC<T.Props> = ({
  text,
  onSuccess,
  onCancel,
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleSuccess: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setOpen(false)
    if (onSuccess) onSuccess()
  }
  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setOpen(false)
    if (onCancel) onCancel()
  }

  const handleOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setOpen(true)
    setAnchorEl(e.currentTarget)
  }
  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handleCancel}>
        <Styled.Root>
          <Grid container spacing={SPACING}>
            <Grid item xs={12}>
              <Typography>{text}</Typography>
            </Grid>
            <Grid container item justifyContent="flex-end" spacing={1} xs={12}>
              <Grid item>
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={handleSuccess}>
                  Да
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  size="small"
                  variant="contained"
                  onClick={handleCancel}>
                  Нет
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Styled.Root>
      </Popover>
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        React.cloneElement(children, { onClick: handleOpen })
      }
    </>
  )
}
