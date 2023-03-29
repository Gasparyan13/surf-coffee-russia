import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import * as Styled from './Tooltip.styled'
import * as T from './Tooltip.types'
import { Modifier, sameWidthModifier, TOOLTIP_CONFIG } from './constants'

export const Tooltip: React.FC<T.Props> = ({
  children,
  componentsProps,
  color = theme.colors.black,
  followCursor,
  PopperProps,
  placement,
  anchorCss,
  ...rest
}) => {
  const [height, setHeight] = useState(0)
  const currentPlacementConf = TOOLTIP_CONFIG[placement]

  const offset = useMemo(
    () =>
      followCursor
        ? currentPlacementConf.getOverOffset()
        : currentPlacementConf.getOffset(height),
    [currentPlacementConf, followCursor, height],
  )

  const handleChildrenRef = useCallback(
    (ref: HTMLDivElement) => {
      if (ref?.offsetWidth && ref?.offsetHeight && !height) {
        return setHeight(ref.offsetHeight)
      }
    },
    [height],
  )

  const popperModifiers = useMemo(() => {
    let modifiers: Modifier[] = [
      {
        name: 'offset',
        options: {
          offset,
        },
      },
    ]

    if (placement.includes('center')) {
      modifiers = modifiers.concat(sameWidthModifier)
    }

    return modifiers
  }, [placement, offset])

  return (
    <MuiTooltip
      disableInteractive
      PopperProps={{
        modifiers: popperModifiers,
        ...PopperProps,
      }}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: color,
            color: theme.colors.white,
            borderRadius: currentPlacementConf.borderRadius,
            fontWeight: 'bold',
            padding: '12px 16px',
            ...componentsProps?.tooltip?.sx,
          },
          ...componentsProps?.tooltip,
        },
      }}
      followCursor={followCursor}
      placement={currentPlacementConf.position as TooltipProps['placement']}
      {...rest}>
      <Styled.Anchor ref={handleChildrenRef} $css={anchorCss}>
        {children}
      </Styled.Anchor>
    </MuiTooltip>
  )
}
