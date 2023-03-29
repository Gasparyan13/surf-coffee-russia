import React from 'react'

import { SvgPlusIcon } from '@common/IconComponents/SvgPlusIcon'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { CellText } from '../CellText'
import * as Styled from './CellContent.styled'
import * as T from './CellContent.types'
import { TEST_ID_ICON } from './constants/testIds'

export const CellContent: React.FC<T.Props> = ({
  text,
  isNumber,
  type,
  isEditable,
  disabled,
  tableColumnType,
  testId,
}) => {
  const shouldShowPlusIcon = !!isEditable && !text

  if (!text && !shouldShowPlusIcon) return null

  return (
    <Styled.ContentContainer $centered={shouldShowPlusIcon}>
      {text && (
        <CellText
          disabled={disabled}
          isEditable={isEditable}
          isNumber={isNumber}
          tableColumnType={tableColumnType}
          testId={testId}
          text={text}
          type={type}
        />
      )}
      {shouldShowPlusIcon && <SvgPlusIcon {...createTestId(TEST_ID_ICON)} />}
    </Styled.ContentContainer>
  )
}
