import { Grid, InputAdornment } from '@mui/material'
import React, { useCallback } from 'react'
import { FileRejection } from 'react-dropzone'

import { SvgAttachIcon } from '@common/IconComponents/SvgAttachIcon'
import { SvgTrashIcon } from '@common/IconComponents/SvgTrashIcon'
import { uploadInputCSS } from '@common/common.styled'

import {
  TEST_ID_ICON_DELETE,
  TEST_ID_ICON_FILE,
} from '@uiKit/components/FieldInputs/FileAttachmentField/constants/testIds'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { TextField } from '../TextField'
import * as T from './FileAttachmentField.types'
import { FileAttachmentInputWithTooltip } from './components/FileAttachmentInputWithTooltip'
import { getFileName } from './utils/getters'

export const FileAttachmentField: React.FC<T.Props> = ({
  value,
  onChange,
  disabled,
  onError = () => {},
  tooltipPlacement = 'below-center',
  testId,
  ...rest
}) => {
  const handleDropFile = useCallback(
    (acceptedFiles: File[], invalidFiles: FileRejection[]) => {
      if (invalidFiles.length) onError(true)
      else {
        onChange(acceptedFiles.at(0) || null)
        onError(false)
      }
    },
    [onChange, onError],
  )

  const handleRemoveFile = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation()
      onChange(null)
      onError(false)
    },
    [onChange, onError],
  )

  return (
    <TextField
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value ? (
              <Grid item onClick={() => handleRemoveFile()}>
                <SvgTrashIcon {...createTestId(TEST_ID_ICON_DELETE)} />
              </Grid>
            ) : (
              <SvgAttachIcon {...createTestId(TEST_ID_ICON_FILE)} />
            )}
          </InputAdornment>
        ),
        inputComponent: FileAttachmentInputWithTooltip,
        inputProps: {
          ...rest.inputProps,
          onDropFile: handleDropFile,
          disabled,
          fileAttachmentInputTestId: testId,
          autoComplete: 'off',
          tooltipPlacement,
        },
      }}
      css={uploadInputCSS}
      disabled={disabled}
      value={getFileName(value)}
    />
  )
}
