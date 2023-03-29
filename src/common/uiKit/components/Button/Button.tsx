import { SerializedStyles } from '@emotion/react'
import React, { useMemo } from 'react'

import * as Styled from './Button.styled'
import * as T from './Button.types'

export const Button: React.FC<T.Props> = ({
  css,
  size = 'flex',
  color,
  ...rest
}) => {
  const externalCSS = useMemo(() => {
    let cssArr: SerializedStyles[] = []

    if (css) {
      if (Array.isArray(css)) {
        cssArr = [...css]
      } else {
        cssArr = [css]
      }
    }

    return cssArr
  }, [css])

  if (color === 'context')
    return (
      <Styled.MuiButton
        $buttonSize={size}
        css={
          css
            ? [Styled.contextButtonCSS, ...externalCSS]
            : Styled.contextButtonCSS
        }
        {...rest}
      />
    )
  if (color === 'critical')
    return (
      <Styled.MuiButton
        $buttonSize={size}
        css={
          css
            ? [Styled.criticalButtonCSS, ...externalCSS]
            : Styled.criticalButtonCSS
        }
        {...rest}
      />
    )

  return (
    <Styled.MuiButton
      $buttonSize={size}
      color={color}
      css={css ? [Styled.buttonBaseCSS, ...externalCSS] : Styled.buttonBaseCSS}
      {...rest}
    />
  )
}
