import React, { forwardRef } from 'react'

import { FileUploaderWrapper } from '../../../../../wrappers/FileUploaderWrapper'
import { Tooltip } from '../../../../Tooltip'
import { tooltipAnchorCSS } from './FileAttachmentInputWithTooltip.styled'
import * as T from './FileAttachmentInputWithTooltip.types'

export const FileAttachmentInputWithTooltip = forwardRef<
  HTMLInputElement,
  T.Props
>(
  (
    {
      value,
      onDropFile,
      fileAttachmentInputTestId,
      tooltipPlacement = 'below-center',
      disabled,
      ...rest
    },
    ref,
  ) => (
    <Tooltip
      disableFocusListener
      anchorCss={tooltipAnchorCSS}
      placement={tooltipPlacement}
      title={value}>
      <FileUploaderWrapper
        useDefaultFormats
        useDefaultOptions
        testId={fileAttachmentInputTestId}
        uploadOptions={{
          onDrop: onDropFile,
          disabled,
        }}>
        <input {...rest} ref={ref} disabled={disabled} value={value} />
      </FileUploaderWrapper>
    </Tooltip>
  ),
)
