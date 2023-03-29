import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import { createTestId } from '../../../../testEnv/utils/testId/createTestId'
import * as T from './FileUploaderWrapper.types'
import {
  DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS,
  DEFAULT_OPTIONS,
} from './constants/defaultOptions'
import { TEST_ID_FILE_UPLOAD_WRAPPER } from './constants/testIds'

export const FileUploaderWrapper: React.FC<T.Props> = ({
  children,
  uploadOptions,
  useDefaultOptions,
  useDefaultFormats,
  testId = TEST_ID_FILE_UPLOAD_WRAPPER,
}) => {
  const options = useMemo(() => {
    let returnOptions = uploadOptions

    if (useDefaultOptions)
      returnOptions = { ...DEFAULT_OPTIONS, ...returnOptions }

    if (useDefaultFormats)
      returnOptions = {
        ...DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS,
        ...returnOptions,
      }

    return returnOptions
  }, [uploadOptions, useDefaultFormats, useDefaultOptions])

  const { getRootProps, getInputProps } = useDropzone(options)

  return (
    <div {...getRootProps()}>
      {children}
      <input {...createTestId(testId)} {...getInputProps()} />
    </div>
  )
}
