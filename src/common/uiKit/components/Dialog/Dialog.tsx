import { Grid } from '@mui/material'
import MuiDialog from '@mui/material/Dialog'
import React from 'react'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'
import { SvgCloseIcon } from '@common/IconComponents/SvgCloseIcon'
import {
  centerTextCSS,
  cursorPointerCSS,
  mt,
  pb,
  pt,
} from '@common/common.styled'

import { theme } from '@providers/ThemeProvider/theme'

import {
  TEST_ID_BACK,
  TEST_ID_CLOSE,
} from '@uiKit/components/Dialog/components/constants/testIds'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { Typography } from '../Typography'
import { borderBottomCSS, Styled } from './Dialog.styled'
import * as T from './Dialog.types'
import { DialogButton } from './components/DialogButton'

export const Dialog: React.FC<T.Props> = ({
  onClose,
  onBack,
  cancelButton,
  children,
  title,
  errorText,
  successButton,
  isOpen,
  size = 'normal',
  hasIconBack,
  hasError,
  hasCloseIcon,
}) => {
  return (
    <MuiDialog
      PaperProps={{
        sx: {
          width: size === 'large' ? '520px' : '440px',
          boxSizing: 'border-box',
        },
      }}
      open={isOpen}
      onClose={onClose}>
      <Styled.Root css={children ? [borderBottomCSS, pb(24)] : [mt(8), pb(24)]}>
        {hasIconBack && (
          <Styled.IconLeft>
            <Grid item css={cursorPointerCSS} onClick={onBack}>
              <SvgArrowIcon direction="right" {...createTestId(TEST_ID_BACK)} />
            </Grid>
          </Styled.IconLeft>
        )}
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          textAlign="center">
          <Grid item>
            <Typography css={centerTextCSS} variant="H3">
              {title}
            </Typography>
          </Grid>
        </Grid>
        {hasCloseIcon && (
          <Styled.IconRight>
            <Grid item css={cursorPointerCSS} onClick={onClose}>
              <SvgCloseIcon {...createTestId(TEST_ID_CLOSE)} />
            </Grid>
          </Styled.IconRight>
        )}
      </Styled.Root>
      {children && <Styled.Content css={[pt(24)]}>{children}</Styled.Content>}
      <Grid container css={children ? mt(40) : mt(16)}>
        <Grid item xs={12}>
          <DialogButton
            color={successButton.color}
            disabled={successButton?.disabled}
            text={successButton.text}
            onClick={successButton?.onClick}
          />
        </Grid>
      </Grid>
      {cancelButton?.isVisible && (
        <Grid item css={mt(16)} xs={12}>
          <DialogButton
            color={cancelButton.color}
            disabled={cancelButton?.disabled}
            text={cancelButton.text}
            onClick={cancelButton?.onClick}
          />
        </Grid>
      )}
      {hasError && (
        <Typography
          color={theme.colors.critical}
          css={[centerTextCSS, mt(24)]}
          variant="PBody">
          {errorText}
        </Typography>
      )}
    </MuiDialog>
  )
}
