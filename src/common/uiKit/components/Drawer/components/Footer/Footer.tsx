import React from 'react'

import { BASIC_INDENT } from '@common/styled/variables'

import { Button } from '../../../Button'
import * as Styled from './Footer.styled'
import * as T from './Footer.types'

export const Footer: React.FC<T.Props> = ({
  content,
  successButtonProps,
  cancelButtonProps,
}) => {
  const shouldRenderButtons = cancelButtonProps || successButtonProps

  return (
    <Styled.Footer>
      {content}
      {shouldRenderButtons && (
        <Styled.FooterButtonsGroup
          $marginTop={content ? BASIC_INDENT : ''}
          $successButtonOnly={!cancelButtonProps}>
          {cancelButtonProps && (
            <Button
              color="secondary"
              disabled={cancelButtonProps.disabled}
              size="large"
              variant="contained"
              onClick={cancelButtonProps.onClick}>
              {cancelButtonProps.children}
            </Button>
          )}
          {successButtonProps && (
            <Button
              color="primary"
              disabled={successButtonProps.disabled}
              size="large"
              variant="contained"
              onClick={successButtonProps.onClick}>
              {successButtonProps.children}
            </Button>
          )}
        </Styled.FooterButtonsGroup>
      )}
    </Styled.Footer>
  )
}
