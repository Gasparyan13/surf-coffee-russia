import React, { useMemo } from 'react'

import { Drawer } from '@uiKit'

import * as Styled from './CreateOperationsDrawer.styled'
import * as T from './CreateOperationsDrawer.types'

export const CreateOperationsDrawer: React.FC<T.Props> = ({
  open,
  onClose,
  onAdd,
  title,
  children,
  disabled,
  isEdit,
}) => {
  const backButtonProps = useMemo(
    () =>
      isEdit
        ? {
            backButtonProps: {
              onClick: onClose,
            },
          }
        : {},
    [isEdit, onClose],
  )

  return (
    <Drawer
      footerProps={{
        cancelButtonProps: {
          onClick: onClose,
          disabled,
          children: 'Отменить',
        },
        successButtonProps: {
          onClick: onAdd,
          disabled,
          children: isEdit ? 'Сохранить' : 'Добавить',
        },
      }}
      headerProps={{
        title,
        ...backButtonProps,
      }}
      open={open}
      onClose={onClose}>
      <Styled.Content>{children}</Styled.Content>
    </Drawer>
  )
}
