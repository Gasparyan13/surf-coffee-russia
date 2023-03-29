import React from 'react'

import * as Styled from './HierarchicalRow.styled'
import * as T from './HierarchicalRow.types'
import { borderColorByLevel } from './constants/styles'
import { getRowConfig } from './utils/getRowConfig'

export const HierarchicalRow: React.FC<T.Props> = ({
  children,
  index,
  level,
}) => {
  const { hasBorderTop, hasPaddingLeft } = getRowConfig({
    index,
    level,
  })

  return (
    <Styled.Row
      $borderColor={borderColorByLevel[level]}
      $hasBorderTop={hasBorderTop}
      $hasPaddingLeft={hasPaddingLeft}>
      {children}
    </Styled.Row>
  )
}
