import React from 'react'

import * as Styled from './TableCell.styled'
import * as T from './TableCell.types'

export const TableCell: React.FC<T.Props> = ({
  fontStyle = 'normal',
  align = 'left',
  children,
  component,
  variant,
  width,
  colSpan,
  cssStyle,
}) => (
  <Styled.TableCell
    $css={cssStyle}
    $fontStyle={fontStyle}
    $variant={variant}
    align={align}
    colSpan={colSpan}
    component={component}
    variant={variant}
    width={width}>
    {children}
  </Styled.TableCell>
)
