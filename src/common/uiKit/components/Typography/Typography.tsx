import { Theme } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useMemo } from 'react'

import { BREAKPOINTS } from '@constants'

import * as Styled from './Typography.styled'
import * as T from './Typography.types'
import { FontVariant } from './Typography.types'

const SURF_PC_MAP = new Map<FontVariant, StyledComponent<{ theme?: Theme }>>()
SURF_PC_MAP.set('H1', Styled.SURF_PC_H1)
SURF_PC_MAP.set('H2', Styled.SURF_PC_H2)
SURF_PC_MAP.set('H3', Styled.SURF_PC_H3)
SURF_PC_MAP.set('H4', Styled.SURF_PC_H4)
SURF_PC_MAP.set('PBody', Styled.SURF_PC_PBody)
SURF_PC_MAP.set('SUBTextLight', Styled.SURF_PC_SUBTextLight)
SURF_PC_MAP.set('Small', Styled.SURF_PC_Small)
SURF_PC_MAP.set('Button', Styled.SURF_PC_Button)
SURF_PC_MAP.set('Input', Styled.SURF_PC_Input)
SURF_PC_MAP.set('LabelBold', Styled.SURF_PC_LabelBold)

const SURF_MOBILE_MAP = new Map<
  FontVariant,
  StyledComponent<{ theme?: Theme }>
>()
SURF_MOBILE_MAP.set('H1', Styled.SURF_MOBILE_H1)
SURF_MOBILE_MAP.set('H2', Styled.SURF_MOBILE_H2)
SURF_MOBILE_MAP.set('H3', Styled.SURF_MOBILE_H3)
SURF_MOBILE_MAP.set('H4', Styled.SURF_MOBILE_H4)
SURF_MOBILE_MAP.set('PBody', Styled.SURF_MOBILE_PBody)
SURF_MOBILE_MAP.set('SUBTextLight', Styled.SURF_MOBILE_SUBTextLight)
SURF_MOBILE_MAP.set('Small', Styled.SURF_MOBILE_Small)
SURF_MOBILE_MAP.set('Button', Styled.SURF_MOBILE_PBody)
SURF_MOBILE_MAP.set('Input', Styled.SURF_MOBILE_PBody)
SURF_MOBILE_MAP.set('LabelBold', Styled.SURF_MOBILE_LabelBold)

export const Typography: React.FC<T.Props> = ({
  variant,
  children,
  color,
  ...rest
}) => {
  const isMOBILE = useMediaQuery(BREAKPOINTS.sm.query)

  const Component = (
    isMOBILE ? SURF_MOBILE_MAP.get(variant) : SURF_PC_MAP.get(variant)
  ) as React.FC

  const componentProps = useMemo(() => {
    if (color) return { style: { color, ...(rest?.style || {}) }, ...rest }
    return rest
  }, [color, rest])
  return <Component {...componentProps}>{children}</Component>
}
